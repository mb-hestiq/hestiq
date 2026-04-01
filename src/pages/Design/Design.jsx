import { useMemo } from "react";
import { Link } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FullHeroSection from "../../components/sections/hero/FullHeroSection";
import PrimaryButton from "../../components/elements/buttons/PrimaryButton";
import SecondaryButton from "../../components/elements/buttons/SecondaryButton";
import Card from "../../components/elements/cards/base/Card";
import PrimaryCtaLink from "../../components/elements/links/PrimaryCtaLink";
import { useServices } from "../../utils/servicesCache";
import {
	FaPalette,
	FaWandMagicSparkles,
	FaLayerGroup,
	FaMagnifyingGlass,
	FaExpand,
	FaPen,
	FaBolt,
	FaCompass,
	FaBullseye,
	FaArrowRight,
} from "react-icons/fa6";
import "../../styles/services.css";

const ICON_MAP = {
	FaPalette,
	FaWandMagicSparkles,
	FaLayerGroup,
	FaMagnifyingGlass,
	FaExpand,
	FaPen,
};

const BENEFITS = [
	{
		icon: FaBolt,
		title: "First-Impression Authority",
		description:
			"Professional design signals credibility and establishes brand presence before a single word is read.",
	},
	{
		icon: FaCompass,
		title: "Strategic Visual Direction",
		description:
			"Design choices anchored to business goals, not aesthetic preferences alone. Every decision moves the needle.",
	},
	{
		icon: FaBullseye,
		title: "Consistency Across Every Touchpoint",
		description:
			"A cohesive design language that scales from digital interfaces to print materials without fragmentation.",
	},
	{
		icon: FaExpand,
		title: "Builds for Growth",
		description:
			"Design systems and component libraries that let your brand grow and adapt without requiring complete redesigns.",
	},
];

const DESIGN_PROBLEMS = [
	{
		icon: FaMagnifyingGlass,
		title: "Unclear Brand Identity",
		description: "No cohesive visual language across products and touchpoints",
	},
	{
		icon: FaLayerGroup,
		title: "Scattered Design Approach",
		description: "Inconsistent interfaces and fragmented brand experience",
	},
	{
		icon: FaPen,
		title: "Design Not Aligned with Goals",
		description: "Beautiful work that doesn't drive business or user outcomes",
	},
	{
		icon: FaWandMagicSparkles,
		title: "Outdated Visual Standards",
		description:
			"Design systems that don't scale or evolve with business needs",
	},
];

export default function Design() {
	const { services } = useServices();

	const designServices = useMemo(
		() => services.filter((s) => s.category === "Design"),
		[services],
	);

	const relatedServices = useMemo(
		() => services.filter((s) => s.category !== "Design").slice(0, 3),
		[services],
	);

	return (
		<>
			<Header />
			<main className="svc-page">
				<FullHeroSection
					id="design-hero-title"
					className="design-hero"
					eyebrow="Design Services"
					title="Design that drives business outcomes, not just aesthetics."
					subtitle="From brand identity and UI/UX to illustrations and marketing collateral, HestiQ creates cohesive, strategic design solutions built around your users and business goals. Every design decision is intentional, tested, and measured."
					actions={
						<>
							<PrimaryButton to="#services" state={{ scrollTo: "services" }}>
								Explore Services <FaArrowRight aria-hidden="true" />
							</PrimaryButton>
							<SecondaryButton
								to="/onboarding?category=design"
								state={{ scrollToTop: true }}
								className="design-hero-cta-outline"
							>
								Start a Project
							</SecondaryButton>
						</>
					}
				/>

				<section
					className="svc-section svc-section-alt"
					aria-labelledby="design-method-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header">
							<p className="svc-eyebrow">Design Philosophy</p>
							<h2 id="design-method-title" className="svc-section-title">
								Strategic design with visible impact
							</h2>
							<p className="svc-section-description">
								We don't designer in a vacuum. Every project starts with
								understanding your business, your users, and what success looks
								like. Then we design for outcomes.
							</p>
						</div>
						<ul
							className="svc-features-grid"
							aria-label="Design approach principles"
						>
							{DESIGN_PROBLEMS.map(({ icon: Icon, title, description }) => (
								<Card
									as="li"
									key={title}
									className="svc-feature-card card-surface-muted"
								>
									<div className="svc-feature-icon-wrapper" aria-hidden="true">
										<Icon />
									</div>
									<h3 className="svc-feature-title">{title}</h3>
									<p className="svc-feature-description">{description}</p>
								</Card>
							))}
						</ul>
					</div>
				</section>

				<section
					id="services"
					className="svc-section"
					aria-labelledby="design-services-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header svc-section-header-centered">
							<p className="svc-eyebrow">What We Deliver</p>
							<h2 id="design-services-title" className="svc-section-title">
								Design services
							</h2>
							<p className="svc-section-description">
								Specialised design offerings for every element of your digital
								and physical brand, from strategy through detailed execution.
							</p>
						</div>
						<ul className="dev-services-grid" aria-label="Design services">
							{designServices.map((service) => {
								const Icon = ICON_MAP[service.icon];
								return (
									<li key={service.name}>
										<Link
											to={service.href}
											state={{ scrollToTop: true }}
											className="dev-service-card"
										>
											{Icon && (
												<div
													className="dev-service-card-icon"
													aria-hidden="true"
												>
													<Icon />
												</div>
											)}
											<h3 className="dev-service-card-name">{service.name}</h3>
											<p className="dev-service-card-description">
												{service.description}
											</p>
											{(service.price || service.duration) && (
												<div className="dev-service-card-meta">
													{service.price && (
														<span className="dev-service-card-meta-item">
															From <strong>${service.price}</strong>
														</span>
													)}
													{service.duration && (
														<span className="dev-service-card-meta-item">
															<strong>{service.duration}</strong>{" "}
															{service.duration === 1 ? "day" : "days"}
														</span>
													)}
												</div>
											)}
											<span className="dev-service-card-link">
												Learn more <FaArrowRight aria-hidden="true" />
											</span>
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				</section>

				<section
					className="svc-section svc-section-alt"
					aria-labelledby="design-benefits-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header svc-section-header-centered">
							<p className="svc-eyebrow">Why Partner With HestiQ</p>
							<h2 id="design-benefits-title" className="svc-section-title">
								Design built to scale with your business
							</h2>
							<p className="svc-section-description">
								Strategic thinking, relentless attention to detail, and a
								commitment to outcomes over aesthetics.
							</p>
						</div>
						<ul className="svc-features-grid" aria-label="Design benefits">
							{BENEFITS.map(({ icon: Icon, title, description }) => (
								<Card
									as="li"
									key={title}
									className="svc-feature-card card-surface-light"
								>
									<div className="svc-feature-icon-wrapper" aria-hidden="true">
										<Icon />
									</div>
									<h3 className="svc-feature-title">{title}</h3>
									<p className="svc-feature-description">{description}</p>
								</Card>
							))}
						</ul>
					</div>
				</section>

				{relatedServices.length > 0 && (
					<section
						className="svc-section"
						aria-labelledby="design-related-title"
					>
						<div className="svc-shell">
							<div className="svc-section-header svc-section-header-centered">
								<p className="svc-eyebrow">Complement Your Design</p>
								<h2 id="design-related-title" className="svc-section-title">
									Related services
								</h2>
								<p className="svc-section-description">
									Design works best when paired with development and strategy.
									Explore services that work alongside design.
								</p>
							</div>
							<ul className="dev-services-grid" aria-label="Related services">
								{relatedServices.map((service) => {
									const Icon = service.icon ? ICON_MAP[service.icon] : null;
									return (
										<li key={service.name}>
											<Link
												to={service.href}
												state={{ scrollToTop: true }}
												className="dev-service-card"
											>
												{Icon && (
													<div
														className="dev-service-card-icon"
														aria-hidden="true"
													>
														<Icon />
													</div>
												)}
												<h3 className="dev-service-card-name">
													{service.name}
												</h3>
												<p className="dev-service-card-description">
													{service.description}
												</p>
												{(service.price || service.duration) && (
													<div className="dev-service-card-meta">
														{service.price && (
															<span className="dev-service-card-meta-item">
																From <strong>${service.price}</strong>
															</span>
														)}
														{service.duration && (
															<span className="dev-service-card-meta-item">
																<strong>{service.duration}</strong>{" "}
																{service.duration === 1 ? "week" : "weeks"}
															</span>
														)}
													</div>
												)}
												<span className="dev-service-card-link">
													Learn more <FaArrowRight aria-hidden="true" />
												</span>
											</Link>
										</li>
									);
								})}
							</ul>
						</div>
					</section>
				)}

				<section className="svc-cta-section" aria-labelledby="design-cta-title">
					<div className="svc-cta-pattern" aria-hidden="true" />
					<div className="svc-shell svc-cta-content">
						<h2 id="design-cta-title" className="svc-cta-title">
							Ready to unlock design that works?
						</h2>
						<p className="svc-cta-subtitle">
							Tell us what you need and we'll scope a design engagement with
							clear deliverables, an honest estimate, and a team that owns the
							work start to finish.
						</p>
						<PrimaryButton
							to="/onboarding?category=design"
							state={{ scrollToTop: true }}
							className="svc-cta-button solution-cta-button"
						>
							Get Started <FaArrowRight aria-hidden="true" />
						</PrimaryButton>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
