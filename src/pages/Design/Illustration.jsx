import { useMemo } from "react";
import { Link } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useServices } from "../../utils/servicesCache";
import {
	FaCircleCheck,
	FaPenNib,
	FaSitemap,
	FaWandMagicSparkles,
	FaPalette,
	FaFileArrowDown,
	FaBolt,
	FaBullseye,
	FaLayerGroup,
	FaRotate,
	FaArrowRight,
} from "react-icons/fa6";
import "../../styles/services.css";

const FEATURES = [
	{
		icon: FaPenNib,
		title: "Custom Visual Direction",
		description:
			"Concept sketches and style exploration aligned to your brand voice before final rendering begins.",
	},
	{
		icon: FaSitemap,
		title: "Narrative-Driven Compositions",
		description:
			"Illustrations are built to communicate a clear story so audiences understand your message instantly.",
	},
	{
		icon: FaWandMagicSparkles,
		title: "Platform-Ready Variants",
		description:
			"Primary, cropped, and simplified compositions prepared for web, social, campaigns, and print placements.",
	},
	{
		icon: FaPalette,
		title: "Color Consistency",
		description:
			"Palette decisions match your brand system to maintain consistency across product, marketing, and editorial use.",
	},
	{
		icon: FaLayerGroup,
		title: "Editable Source Delivery",
		description:
			"Layered files are delivered in production-ready formats so your team can scale and adapt assets over time.",
	},
	{
		icon: FaFileArrowDown,
		title: "Export Package Included",
		description:
			"Final exports provided in high-resolution and web-optimized formats for immediate handoff to execution teams.",
	},
];

const USE_CASES = [
	{
		label: "Product Marketing",
		title: "Explaining complex offerings visually",
		description:
			"SaaS and technical products use illustration to simplify abstract features and improve page clarity.",
	},
	{
		label: "Editorial Content",
		title: "Supporting articles and thought leadership",
		description:
			"Publishers and brands use custom artwork to create distinctive visual language that outperforms stock imagery.",
	},
	{
		label: "Campaign Assets",
		title: "Launching seasonal and promotional campaigns",
		description:
			"Illustration systems power ads, landing pages, and social rollout with a consistent, recognisable campaign look.",
	},
	{
		label: "Brand Systems",
		title: "Building signature brand iconography",
		description:
			"Brands create reusable visual kits that strengthen recognition across onboarding, docs, websites, and presentations.",
	},
];

const BENEFITS = [
	{
		icon: FaBolt,
		title: "Faster Audience Understanding",
		description:
			"Clear visual storytelling helps users grasp your message quickly, reducing friction in sales and onboarding journeys.",
	},
	{
		icon: FaBullseye,
		title: "Brand Distinction",
		description:
			"Original illustration style creates a visual signature that differentiates your brand from template-driven competitors.",
	},
	{
		icon: FaRotate,
		title: "Iterative Refinement",
		description:
			"Structured revision rounds ensure each asset reaches the right balance between aesthetics, clarity, and strategy.",
	},
	{
		icon: FaLayerGroup,
		title: "Long-Term Reusability",
		description:
			"A reusable illustration library reduces ongoing production costs and speeds up future campaign launches.",
	},
];

const OVERVIEW_POINTS = [
	"Custom styles built around your brand tone",
	"Production-ready exports for web and print",
	"Flexible revisions aligned to project scope",
	"Assets designed for long-term reuse",
];

const ONBOARDING_URL = "/onboarding?category=design&service=illustration";

export default function Illustration() {
	const { services } = useServices();

	const service = useMemo(
		() => services.find((s) => s.name === "Illustration") ?? null,
		[services],
	);

	const relatedServices = useMemo(
		() =>
			services
				.filter((s) => s.category === "Design" && s.name !== "Illustration")
				.slice(0, 4),
		[services],
	);

	const priceValue =
		typeof service?.price === "number"
			? service.price
			: typeof service?.basePrice === "number"
				? service.basePrice
				: null;

	const durationValue =
		typeof service?.duration === "number" ? `${service.duration} days` : null;

	const revisionsValueRaw =
		typeof service?.revisits === "number"
			? service.revisits
			: typeof service?.revisions === "number"
				? service.revisions
				: null;

	const revisionsValue =
		typeof revisionsValueRaw === "number"
			? `${revisionsValueRaw} revision${revisionsValueRaw === 1 ? "" : "s"}`
			: null;

	return (
		<>
			<Header />
			<main className="svc-page">
				<section
					id="overview"
					className="svc-section"
					aria-labelledby="il-overview-title"
				>
					<div className="svc-shell">
						<div className="svc-overview-grid">
							<div className="svc-overview-content">
								<p className="svc-eyebrow">The Problem We Solve</p>
								<h2 id="il-overview-title" className="svc-section-title">
									Illustration that communicates, not just decorates.
								</h2>
								<p className="svc-section-description">
									Generic visuals blend in and often fail to explain what makes
									your product or brand different. Stock assets can dilute
									trust, create visual inconsistency, and leave messaging
									unclear across channels.
								</p>
								<p className="svc-section-description">
									We create original illustrations grounded in strategy,
									audience intent, and brand positioning so each visual
									reinforces comprehension, recognition, and conversion.
								</p>
								<ul
									className="svc-overview-points"
									aria-label="Core value points"
								>
									{OVERVIEW_POINTS.map((point) => (
										<li key={point} className="svc-overview-point">
											<FaCircleCheck
												className="svc-overview-point-icon"
												aria-hidden="true"
											/>
											<span>{point}</span>
										</li>
									))}
								</ul>
							</div>
							<div
								className="svc-overview-meta"
								aria-label="Service highlights"
							>
								<div className="svc-overview-metric">
									<span className="svc-overview-metric-label">
										Starting price
									</span>
									<strong className="svc-overview-metric-value">
										{priceValue != null
											? `from $${priceValue.toLocaleString()}`
											: "Custom quote based on scope"}
									</strong>
								</div>
								<div className="svc-overview-metric">
									<span className="svc-overview-metric-label">
										Typical timeline
									</span>
									<strong className="svc-overview-metric-value">
										{durationValue ?? "Defined after creative discovery"}
									</strong>
								</div>
								<div className="svc-overview-metric">
									<span className="svc-overview-metric-label">
										Revisions included
									</span>
									<strong className="svc-overview-metric-value">
										{revisionsValue ?? "Scope-based review rounds"}
									</strong>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section
					className="svc-section svc-section-alt"
					aria-labelledby="il-features-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header svc-section-header-centered">
							<p className="svc-eyebrow">What's Included</p>
							<h2 id="il-features-title" className="svc-section-title">
								Every engagement covers
							</h2>
							<p className="svc-section-description">
								From concept direction to final exports, every deliverable is
								built for clarity, quality, and production readiness.
							</p>
						</div>
						<ul className="svc-features-grid" aria-label="Service features">
							{FEATURES.map(({ icon: Icon, title, description }) => (
								<li key={title} className="svc-feature-card">
									<div className="svc-feature-icon-wrapper" aria-hidden="true">
										<Icon />
									</div>
									<h3 className="svc-feature-title">{title}</h3>
									<p className="svc-feature-description">{description}</p>
								</li>
							))}
						</ul>
					</div>
				</section>

				<section className="svc-section" aria-labelledby="il-usecases-title">
					<div className="svc-shell">
						<div className="svc-section-header">
							<p className="svc-eyebrow">Applications</p>
							<h2 id="il-usecases-title" className="svc-section-title">
								Where illustration creates impact
							</h2>
							<p className="svc-section-description">
								Custom illustration strengthens communication across product,
								marketing, and brand experiences where clarity and memorability
								matter.
							</p>
						</div>
						<ul className="svc-use-cases-grid" aria-label="Use cases">
							{USE_CASES.map(({ label, title, description }) => (
								<li key={label} className="svc-use-case-card">
									<span className="svc-use-case-label">{label}</span>
									<h3 className="svc-use-case-title">{title}</h3>
									<p className="svc-use-case-description">{description}</p>
								</li>
							))}
						</ul>
					</div>
				</section>

				<section className="svc-section" aria-labelledby="il-benefits-title">
					<div className="svc-shell">
						<div className="svc-benefits-grid">
							<div className="svc-benefits-intro">
								<p className="svc-eyebrow">Why HestiQ</p>
								<h2 id="il-benefits-title" className="svc-section-title">
									What you gain
								</h2>
								<p className="svc-section-description">
									Visual systems designed to perform in real campaigns, not just
									look good in isolation.
								</p>
								<Link to={ONBOARDING_URL} className="cta svc-benefits-cta">
									Get Started <FaArrowRight aria-hidden="true" />
								</Link>
							</div>
							<ul className="svc-benefits-list" aria-label="Benefits">
								{BENEFITS.map(({ icon: Icon, title, description }) => (
									<li key={title} className="svc-benefit">
										<div
											className="svc-benefit-icon-wrapper"
											aria-hidden="true"
										>
											<Icon />
										</div>
										<div className="svc-benefit-content">
											<h3 className="svc-benefit-title">{title}</h3>
											<p className="svc-benefit-description">{description}</p>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</section>

				{relatedServices.length > 0 && (
					<section
						className="svc-section svc-section-alt"
						aria-labelledby="il-related-title"
					>
						<div className="svc-shell">
							<div className="svc-section-header svc-section-header-centered">
								<p className="svc-eyebrow">Explore More</p>
								<h2 id="il-related-title" className="svc-section-title">
									Related services
								</h2>
								<p className="svc-section-description">
									Illustration works best when integrated with broader brand and
									design systems. These services pair naturally.
								</p>
							</div>
							<ul
								className="svc-related-grid"
								aria-label="Related design services"
							>
								{relatedServices.map((s) => (
									<li key={s.name}>
										<Link to={s.href} className="svc-related-card">
											<div className="svc-related-card-top">
												<span className="svc-related-card-category">
													{s.category}
												</span>
											</div>
											<h3 className="svc-related-card-title">{s.name}</h3>
											<p className="svc-related-card-description">
												{s.description}
											</p>
											<span className="svc-related-card-link">
												View service <FaArrowRight aria-hidden="true" />
											</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</section>
				)}

				<section className="svc-cta-section" aria-labelledby="il-cta-title">
					<div className="svc-cta-pattern" aria-hidden="true" />
					<div className="svc-shell svc-cta-content">
						<h2 id="il-cta-title" className="svc-cta-title">
							Ready to turn ideas into signature visuals?
						</h2>
						<p className="svc-cta-subtitle">
							Tell us what you need to communicate and we will craft
							illustration assets built for clarity, consistency, and
							conversion.
						</p>
						<Link to={ONBOARDING_URL} className="cta svc-cta-button">
							Get Started <FaArrowRight aria-hidden="true" />
						</Link>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
