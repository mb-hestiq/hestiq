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
import backendUrl from "../utils/backend";

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
		return {
			design: allServices
				.filter((s) => s.category === "Design")
				.map(mapService),
			programming: allServices
				.filter((s) => s.category === "Development")
				.map(mapService),
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
			<main className="onboarding-main">
				<div className="onboarding-page">
					<div className="onboarding-container">
						<div className="onboarding-step-track">
							{STEPS.map((label, i) => (
								<React.Fragment key={i}>
									<div
										className="onboarding-step-node"
										data-done={i + 1 < step ? "true" : "false"}
										data-active={i + 1 === step ? "true" : "false"}
									>
										<div className="onboarding-step-node-dot">
											{i + 1 < step ? <FaCheck /> : i + 1}
										</div>
										<span className="onboarding-step-node-label">{label}</span>
									</div>
									{i < TOTAL_STEPS - 1 && (
										<div
											className="onboarding-step-connector"
											data-done={i + 1 < step ? "true" : "false"}
										/>
									)}
								</React.Fragment>
							))}
						</div>

						<div
							key={stepKey}
							className="onboarding-step"
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
									onSuccess={handleOrderSuccess}
								/>
							)}
						</div>

						<div className="onboarding-nav">
							<div>
								{step > 1 && (
									<button className="onboarding-nav-back" onClick={retreat}>
										<FaArrowLeft />
										Back
									</button>
								)}
							</div>
							<div>
								{step < TOTAL_STEPS ? (
									<button
										type="button"
										className="cta onboarding-nav-continue"
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
			<div className="onboarding-step-header">
				<h1 className="onboarding-step-title">What are you looking for?</h1>
				<p className="onboarding-step-description">
					Tell us what kind of service you need and we'll guide you from there.
				</p>
			</div>
			<div className="onboarding-cards" data-layout="category">
				{CATEGORIES.map(({ id, label, description, icon }) => (
					<button
						key={id}
						type="button"
						className="onboarding-card"
						data-layout="category"
						data-selected={selected === id ? "true" : "false"}
						onClick={() => onSelect(id)}
					>
						{selected === id && (
							<span className="onboarding-card-check">
								<FaCheck />
							</span>
						)}
						<Icon name={icon} className="onboarding-card-icon" />
						<div>
							<div className="onboarding-card-label">{label}</div>
							<div className="onboarding-card-description">{description}</div>
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
			<div className="onboarding-step-header">
				<h1 className="onboarding-step-title">
					{category === "design"
						? "Which design services do you need?"
						: "Which development services do you need?"}
				</h1>
				<p className="onboarding-step-description">
					Select all that apply - you can choose multiple.
				</p>
			</div>
			<div className="onboarding-cards" data-layout="services">
				{services.map(({ id, label, icon }) => {
					const isSelected = selected.includes(id);
					return (
						<button
							key={id}
							type="button"
							className="onboarding-card"
							data-selected={isSelected ? "true" : "false"}
							onClick={() => onToggle(id)}
						>
							{isSelected && (
								<span className="onboarding-card-check">
									<FaCheck />
								</span>
							)}
							<Icon name={icon} className="onboarding-card-icon" />
							<div className="onboarding-card-label">{label}</div>
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
			<div className="onboarding-step-header">
				<h1 className="onboarding-step-title">
					Tell us more about your request
				</h1>
				<p className="onboarding-step-description">
					Send your details here and we&apos;ll follow up with the right plan.
				</p>
			</div>
			<div className="onboarding-contact-layout">
				<div className="onboarding-contact-panel">
					<div className="onboarding-contact-summary-badge">
						<FaEnvelope />
						<span>{categoryLabel}</span>
					</div>
					<h2 className="onboarding-contact-panel-title">Project snapshot</h2>
					<p className="onboarding-contact-panel-text">
						You selected the services below. Use the message field to add scope,
						goals, timeline, or anything else the team should know.
					</p>
					<div className="onboarding-summary-tags">
						{selectedItems.map(({ id, label, icon }, index) => (
							<span
								key={id}
								className="onboarding-summary-tag"
								style={{ animationDelay: `${index * 0.05}s` }}
							>
								<Icon name={icon} />
								{label}
							</span>
						))}
					</div>
					<div className="onboarding-estimate">
						<div className="onboarding-estimate-item">
							<span className="onboarding-estimate-label">Estimated Price</span>
							<span className="onboarding-estimate-value">
								from ${estimatedPrice}
							</span>
						</div>
						<div className="onboarding-estimate-item">
							<span className="onboarding-estimate-label">
								Estimated Duration
							</span>
							<span className="onboarding-estimate-value">
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
					className="onboarding-contact-form"
					onSuccess={onSuccess}
				/>
			</div>
		</>
	);
}
