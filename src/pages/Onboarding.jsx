import React, { useState, useCallback } from "react";
import Header from "../components/Header";
import ContactForm from "../components/ContactForm";

import {
	FaBrush,
	FaBullhorn,
	FaImage,
	FaServer,
	FaCode,
	FaCheck,
	FaArrowRight,
	FaArrowLeft,
	FaEllipsis,
	FaEnvelope,
} from "react-icons/fa6";
import {
	FaLaptopCode,
	FaFont,
	FaPencilAlt,
	FaPalette,
	FaDesktop,
	FaGlobe,
	FaWindowMaximize,
	FaMobileAlt,
	FaFileCode,
} from "react-icons/fa";

const CATEGORIES = [
	{
		id: "design",
		label: "Design Services",
		description: "Visual, brand & creative solutions",
		Icon: FaBrush,
	},
	{
		id: "programming",
		label: "Programming Services",
		description: "Web, software & tech solutions",
		Icon: FaLaptopCode,
	},
];

const SERVICES = {
	design: [
		{ id: "logo", label: "Logo", Icon: FaFont },
		{ id: "illustration", label: "Illustration", Icon: FaPencilAlt },
		{ id: "brand-identity", label: "Brand Identity", Icon: FaPalette },
		{ id: "advertisement", label: "Advertisement", Icon: FaBullhorn },
		{ id: "poster", label: "Poster", Icon: FaImage },
		{ id: "website-design", label: "Website Design", Icon: FaDesktop },
		{ id: "other", label: "Other", Icon: FaEllipsis },
	],
	programming: [
		{ id: "website-dev", label: "Website Development", Icon: FaGlobe },
		{ id: "web-app", label: "Web Applications", Icon: FaWindowMaximize },
		{ id: "software-dev", label: "Software Development", Icon: FaCode },
		{ id: "api-backend", label: "API & Backend Systems", Icon: FaServer },
		{ id: "mobile-app", label: "Mobile Application", Icon: FaMobileAlt },
		{ id: "single-page", label: "Single Page Website", Icon: FaFileCode },
		{ id: "other", label: "Other", Icon: FaEllipsis },
	],
};

const STEPS = ["Choose Category", "Select Services", "Finalize"];
const TOTAL_STEPS = STEPS.length;

export default function Onboarding() {
	const [step, setStep] = useState(1);
	const [direction, setDirection] = useState("forward");
	const [stepKey, setStepKey] = useState(0);
	const [category, setCategory] = useState(null);
	const [selectedServices, setSelectedServices] = useState([]);

	const services = category ? SERVICES[category] : [];

	const advance = useCallback(() => {
		setDirection("forward");
		setStepKey((k) => k + 1);
		setStep((s) => s + 1);
	}, []);

	const retreat = useCallback(() => {
		if (step === 2) setSelectedServices([]);
		setDirection("back");
		setStepKey((k) => k + 1);
		setStep((s) => s - 1);
	}, [step]);

	const selectCategory = useCallback((id) => {
		setCategory(id);
		setSelectedServices([]);
	}, []);

	const toggleService = useCallback((id) => {
		setSelectedServices((prev) =>
			prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
		);
	}, []);

	const canAdvance =
		step === 1
			? !!category
			: step === 2
				? selectedServices.length > 0
				: step < 4;

	const selectedItems = services.filter((service) =>
		selectedServices.includes(service.id),
	);
	const categoryLabel =
		category === "design" ? "Design Services" : "Programming Services";

	return (
		<>
			<Header />
			<main className="OnboardingMain">
				<div className="OnboardingPage">
					<div className="OnboardingContainer">
						<div className="OnboardingStepTrack">
							{STEPS.map((label, i) => (
								<React.Fragment key={i}>
									<div
										className="OnboardingStepNode"
										data-done={i + 1 < step ? "true" : "false"}
										data-active={i + 1 === step ? "true" : "false"}
									>
										<div className="OnboardingStepNodeDot">
											{i + 1 < step ? <FaCheck /> : i + 1}
										</div>
										<span className="OnboardingStepNodeLabel">{label}</span>
									</div>
									{i < TOTAL_STEPS - 1 && (
										<div
											className="OnboardingStepConnector"
											data-done={i + 1 < step ? "true" : "false"}
										/>
									)}
								</React.Fragment>
							))}
						</div>

						<div
							key={stepKey}
							className="OnboardingStep"
							data-direction={direction}
						>
							{step === 1 && (
								<StepCategory selected={category} onSelect={selectCategory} />
							)}
							{step === 2 && (
								<StepServices
									services={services}
									selected={selectedServices}
									onToggle={toggleService}
									category={category}
								/>
							)}
							{step === 3 && (
								<StepContact
									categoryLabel={categoryLabel}
									selectedItems={selectedItems}
								/>
							)}
						</div>

						<div className="OnboardingNav">
							<div>
								{step > 1 && (
									<button className="OnboardingNavBack" onClick={retreat}>
										<FaArrowLeft />
										Back
									</button>
								)}
							</div>
							<div>
								{step < TOTAL_STEPS ? (
									<button
										type="button"
										className="CTA OnboardingNavContinue"
										onClick={advance}
										disabled={!canAdvance}
									>
										{step === 3 ? "Proceed" : "Continue"}
										<FaArrowRight />
									</button>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

function StepCategory({ selected, onSelect }) {
	return (
		<>
			<div className="OnboardingStepHeader">
				<h1 className="OnboardingStepTitle">What are you looking for?</h1>
				<p className="OnboardingStepDescription">
					Tell us what kind of service you need and we'll guide you from there.
				</p>
			</div>
			<div className="OnboardingCards" data-layout="category">
				{CATEGORIES.map(({ id, label, description, Icon }) => (
					<button
						key={id}
						type="button"
						className="OnboardingCard"
						data-layout="category"
						data-selected={selected === id ? "true" : "false"}
						onClick={() => onSelect(id)}
					>
						{selected === id && (
							<span className="OnboardingCardCheck">
								<FaCheck />
							</span>
						)}
						<Icon className="OnboardingCardIcon" />
						<div>
							<div className="OnboardingCardLabel">{label}</div>
							<div className="OnboardingCardDescription">{description}</div>
						</div>
					</button>
				))}
			</div>
		</>
	);
}

function StepServices({ services, selected, onToggle, category }) {
	return (
		<>
			<div className="OnboardingStepHeader">
				<h1 className="OnboardingStepTitle">
					{category === "design"
						? "Which design services do you need?"
						: "Which development services do you need?"}
				</h1>
				<p className="OnboardingStepDescription">
					Select all that apply - you can choose multiple.
				</p>
			</div>
			<div className="OnboardingCards" data-layout="services">
				{services.map(({ id, label, Icon }) => {
					const isSelected = selected.includes(id);
					return (
						<button
							key={id}
							type="button"
							className="OnboardingCard"
							data-selected={isSelected ? "true" : "false"}
							onClick={() => onToggle(id)}
						>
							{isSelected && (
								<span className="OnboardingCardCheck">
									<FaCheck />
								</span>
							)}
							<Icon className="OnboardingCardIcon" />
							<div className="OnboardingCardLabel">{label}</div>
						</button>
					);
				})}
			</div>
		</>
	);
}

function StepContact({ categoryLabel, selectedItems }) {
	return (
		<>
			<div className="OnboardingStepHeader">
				<h1 className="OnboardingStepTitle">Tell us more about your request</h1>
				<p className="OnboardingStepDescription">
					Send your details here and we&apos;ll follow up with the right plan.
				</p>
			</div>
			<div className="OnboardingContactLayout">
				<div className="OnboardingContactPanel">
					<div className="OnboardingContactSummaryBadge">
						<FaEnvelope />
						<span>{categoryLabel}</span>
					</div>
					<h2 className="OnboardingContactPanelTitle">Project snapshot</h2>
					<p className="OnboardingContactPanelText">
						You selected the services below. Use the message field to add scope,
						goals, timeline, or anything else the team should know.
					</p>
					<div className="OnboardingSummaryTags">
						{selectedItems.map(({ id, label, Icon }, index) => (
							<span
								key={id}
								className="OnboardingSummaryTag"
								style={{ animationDelay: `${index * 0.05}s` }}
							>
								<Icon />
								{label}
							</span>
						))}
					</div>
				</div>
				<ContactForm
					endpoint="/api/order"
					payload={{
						category: categoryLabel,
						services: selectedItems.map((item) => item.label),
					}}
					title="Contact details"
					description="Include the details of what you want so we can respond with a tailored recommendation."
					submitLabel="Submit request"
					successMessage="Your order request has been sent. We will reach out soon."
					className="OnboardingContactForm"
				/>
			</div>
		</>
	);
}
