import React, { useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import Header from "../components/Header";
import ContactForm from "../components/ContactForm";
import Icon from "../components/Icon";
import { useServices } from "../utils/servicesCache";
import { track } from "../utils/analytics";

import {
	FaCheck,
	FaArrowRight,
	FaArrowLeft,
	FaEnvelope,
} from "react-icons/fa6";
import { backendUrl } from "../../shared/company";

const CATEGORIES = [
	{
		id: "design",
		label: "Design Services",
		description: "Visual, brand & creative solutions",
		icon: "FaBrush",
	},
	{
		id: "programming",
		label: "Programming Services",
		description: "Web, software & tech solutions",
		icon: "FaLaptopCode",
	},
];

const STEPS = ["Choose Category", "Select Services", "Finalize"];
const TOTAL_STEPS = STEPS.length;

export default function Onboarding() {
	const [searchParams] = useSearchParams();
	const initCategory = searchParams.get("category");
	const initService = searchParams.get("service");

	const [step, setStep] = useState(() =>
		initCategory ? (initService ? 3 : 2) : 1,
	);
	const [direction, setDirection] = useState("forward");
	const [stepKey, setStepKey] = useState(0);
	const [category, setCategory] = useState(initCategory);
	const [selectedServices, setSelectedServices] = useState(
		initService ? [initService] : [],
	);

	const { services: allServices } = useServices();

	const SERVICES = useMemo(() => {
		const mapService = (s) => ({
			id: s.name.toLowerCase().replace(/\s+/g, "-"),
			label: s.name,
			price: s.price,
			duration: s.duration,
			icon: s.icon,
		});
		const OTHER = {
			id: "other",
			label: "Other",
			price: null,
			duration: null,
			icon: "FaEllipsis",
		};
		return {
			design: [
				...allServices.filter((s) => s.category === "Design").map(mapService),
				OTHER,
			],
			programming: [
				...allServices
					.filter((s) => s.category === "Development")
					.map(mapService),
				OTHER,
			],
		};
	}, [allServices]);

	const services =
		category && Array.isArray(SERVICES[category]) ? SERVICES[category] : [];

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

	const estimatedPrice = selectedItems.reduce(
		(sum, item) => sum + (item.price || 0),
		0,
	);
	const estimatedDuration = selectedItems.reduce(
		(sum, item) => sum + (item.duration || 0),
		0,
	);

	const handleOrderSuccess = useCallback(() => {
		track("order_created", {
			category: categoryLabel,
			services: selectedItems.map((i) => i.label),
		});
	}, [categoryLabel, selectedItems]);

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
									estimatedPrice={estimatedPrice}
									estimatedDuration={estimatedDuration}
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
				{CATEGORIES.map(({ id, label, description, icon }) => (
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
						<Icon name={icon} className="OnboardingCardIcon" />
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
				{services.map(({ id, label, icon }) => {
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
							<Icon name={icon} className="OnboardingCardIcon" />
							<div className="OnboardingCardLabel">{label}</div>
						</button>
					);
				})}
			</div>
		</>
	);
}

function StepContact({
	categoryLabel,
	selectedItems,
	estimatedPrice,
	estimatedDuration,
	onSuccess,
}) {
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
						{selectedItems.map(({ id, label, icon }, index) => (
							<span
								key={id}
								className="OnboardingSummaryTag"
								style={{ animationDelay: `${index * 0.05}s` }}
							>
								<Icon name={icon} />
								{label}
							</span>
						))}
					</div>
					<div className="OnboardingEstimate">
						<div className="OnboardingEstimateItem">
							<span className="OnboardingEstimateLabel">Estimated Price</span>
							<span className="OnboardingEstimateValue">
								from ${estimatedPrice}
							</span>
						</div>
						<div className="OnboardingEstimateItem">
							<span className="OnboardingEstimateLabel">
								Estimated Duration
							</span>
							<span className="OnboardingEstimateValue">
								{estimatedDuration} days
							</span>
						</div>
					</div>
				</div>
				<ContactForm
					endpoint={`${backendUrl}/orders`}
					payload={{
						category: categoryLabel,
						services: selectedItems.map((item) => item.label),
					}}
					title="Contact details"
					description="Include the details of what you want so we can respond with a tailored recommendation."
					submitLabel="Submit request"
					successMessage="Your order request has been sent. We will reach out soon."
					className="OnboardingContactForm"
					onSuccess={onSuccess}
				/>
			</div>
		</>
	);
}
