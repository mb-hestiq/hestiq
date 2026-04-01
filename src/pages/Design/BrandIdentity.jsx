import { useMemo } from "react";
import { Link } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useServices } from "../../utils/servicesCache";
import businessCardBack from "../../assets/images/examples/brand-identity/business-card-back.png";
import businessCardFront from "../../assets/images/examples/brand-identity/business-card-front.png";
import businessCardMockup from "../../assets/images/examples/brand-identity/bussiness-card-mockup.png";
import facebookMockup from "../../assets/images/examples/brand-identity/facebook-mockup.png";
import {
	FaCircleCheck,
	FaMagnifyingGlass,
	FaLayerGroup,
	FaPalette,
	FaFont,
	FaSwatchbook,
	FaFileArrowDown,
	FaArrowRight,
	FaBolt,
	FaBullseye,
	FaHandshake,
	FaExpand,
} from "react-icons/fa6";
import "../../styles/services.css";

const FEATURES = [
	{
		icon: FaMagnifyingGlass,
		title: "Brand Discovery",
		description:
			"Audience, competitor, and positioning analysis completed before visual directions are explored.",
	},
	{
		icon: FaLayerGroup,
		title: "Identity System Design",
		description:
			"Primary and secondary logo lockups with clear structural rules for digital and print usage.",
	},
	{
		icon: FaPalette,
		title: "Colour Architecture",
		description:
			"Primary, secondary, and support palettes defined for consistency across every touchpoint.",
	},
	{
		icon: FaFont,
		title: "Typography Direction",
		description:
			"Headline, body, and accent type pairings selected for readability, hierarchy, and tone.",
	},
	{
		icon: FaSwatchbook,
		title: "Brand Usage Guide",
		description:
			"Practical guidelines covering spacing, color application, typography, and misuse prevention.",
	},
	{
		icon: FaFileArrowDown,
		title: "Ready-to-Use Assets",
		description:
			"Exported files for social profiles, cards, decks, and production workflows delivered in one package.",
	},
];

const USE_CASES = [
	{
		label: "New Venture",
		title: "Launching with a complete visual identity",
		description:
			"Founders need more than a logo. We define the full visual language so early marketing looks consistent and credible.",
	},
	{
		label: "Rebrand",
		title: "Modernizing a dated presence",
		description:
			"Businesses outgrowing their original look get a refined identity system that aligns with current positioning.",
	},
	{
		label: "Multi-Channel Growth",
		title: "Keeping visuals consistent at scale",
		description:
			"As teams expand across web, social, and print, identity rules prevent brand drift and fragmented execution.",
	},
	{
		label: "Agency Support",
		title: "Giving external teams a clear system",
		description:
			"A documented brand identity helps ad partners, designers, and developers build faster without creative misalignment.",
	},
];

const BENEFITS = [
	{
		icon: FaBolt,
		title: "Stronger Market Perception",
		description:
			"Consistent identity signals professionalism and trust from the first interaction.",
	},
	{
		icon: FaBullseye,
		title: "Sharper Brand Positioning",
		description:
			"Visual direction is aligned with audience expectations and business goals, not personal preference.",
	},
	{
		icon: FaExpand,
		title: "Cross-Channel Consistency",
		description:
			"Your brand remains recognisable across social content, sales collateral, and product interfaces.",
	},
	{
		icon: FaHandshake,
		title: "Faster Team Execution",
		description:
			"Defined rules reduce revision loops and speed up approvals for internal and external teams.",
	},
];

const OVERVIEW_POINTS = [
	"Identity built from strategic positioning, not trend templates",
	"Consistent assets for web, social, and print channels",
	"Clear brand rules that reduce creative friction",
	"Delivery package ready for immediate rollout",
];

const CONTENT_POINTS = [
	"Business card mockups to validate legibility and hierarchy in print contexts",
	"Social profile previews to ensure visual consistency in high-frequency channels",
	"Color and typography decisions tested against real communication surfaces",
];

const ONBOARDING_URL = "/onboarding?category=design&service=brand-identity";

export default function BrandIdentity() {
	const { services } = useServices();

	const service = useMemo(
		() => services.find((s) => s.name === "Brand Identity") ?? null,
		[services],
	);

	const relatedServices = useMemo(
		() =>
			services
				.filter((s) => s.category === "Design" && s.name !== "Brand Identity")
				.slice(0, 4),
		[services],
	);

	const priceValue = useMemo(() => {
		const value = service?.price ?? service?.basePrice;
		if (typeof value === "number" && Number.isFinite(value) && value > 0) {
			return `$${value.toLocaleString()}`;
		}
		if (typeof value === "string" && value.trim()) {
			return value;
		}
		return "Custom quote";
	}, [service]);

	const durationValue = useMemo(() => {
		const value = service?.duration;
		if (typeof value === "number" && Number.isFinite(value) && value > 0) {
			return `${value} day${value === 1 ? "" : "s"}`;
		}
		if (typeof value === "string" && value.trim()) {
			return value;
		}
		return "Timeline set after brief";
	}, [service]);

	const revisionsValue = useMemo(() => {
		const value = service?.revisits ?? service?.revisions;
		if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
			return `${value} revision${value === 1 ? "" : "s"}`;
		}
		if (typeof value === "string" && value.trim()) {
			return value;
		}
		return "Revision rounds included";
	}, [service]);

	return (
		<>
			<Header />
			<main className="svc-page">
				<section
					id="overview"
					className="svc-section"
					aria-labelledby="bi-overview-title"
				>
					<div className="svc-shell">
						<div className="svc-overview-grid">
							<div className="svc-overview-content">
								<p className="svc-eyebrow">The Problem We Solve</p>
								<h2 id="bi-overview-title" className="svc-section-title">
									Brands look inconsistent when identity stops at a logo.
								</h2>
								<p className="svc-section-description">
									Many businesses have a decent mark but no unified system for
									colours, typography, and real-world applications. The result
									is a fragmented presence that weakens trust and makes every
									campaign harder to execute.
								</p>
								<p className="svc-section-description">
									We build complete brand identity systems that translate
									strategy into a repeatable visual language, so every customer
									touchpoint feels coherent and unmistakably yours.
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
										{priceValue}
									</strong>
								</div>
								<div className="svc-overview-metric">
									<span className="svc-overview-metric-label">
										Typical duration
									</span>
									<strong className="svc-overview-metric-value">
										{durationValue}
									</strong>
								</div>
								<div className="svc-overview-metric">
									<span className="svc-overview-metric-label">Revisions</span>
									<strong className="svc-overview-metric-value">
										{revisionsValue}
									</strong>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section
					className="svc-section svc-section-alt"
					aria-labelledby="bi-features-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header svc-section-header-centered">
							<p className="svc-eyebrow">What's Included</p>
							<h2 id="bi-features-title" className="svc-section-title">
								Every brand identity engagement covers
							</h2>
							<p className="svc-section-description">
								A complete system from strategic definition to rollout-ready
								assets, built for day-to-day business use.
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

				<section className="svc-section" aria-labelledby="bi-content-title">
					<div className="svc-shell">
						<div className="svc-overview-grid">
							<div className="svc-overview-content">
								<p className="svc-eyebrow">Real-World Application</p>
								<h2 id="bi-content-title" className="svc-section-title">
									Identity decisions proven in context
								</h2>
								<p className="svc-section-description">
									Strong identity systems are tested against actual brand
									touchpoints, not isolated artboards. We validate visual
									choices across customer-facing materials before final
									delivery.
								</p>
								<ul
									className="svc-overview-points"
									aria-label="Identity validation points"
								>
									{CONTENT_POINTS.map((point) => (
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
							<div className="svc-overview-visual">
								<div className="svc-overview-dual-images">
									<img
										src={businessCardMockup}
										alt="Brand identity applied to business card mockup"
										className="svc-overview-dual-img svc-overview-dual-img-back"
										loading="lazy"
									/>
									<img
										src={facebookMockup}
										alt="Brand identity applied to social media mockup"
										className="svc-overview-dual-img svc-overview-dual-img-front"
										loading="lazy"
									/>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="svc-section" aria-labelledby="bi-usecases-title">
					<div className="svc-shell">
						<div className="svc-section-header">
							<p className="svc-eyebrow">Applications</p>
							<h2 id="bi-usecases-title" className="svc-section-title">
								Where brand identity creates leverage
							</h2>
							<p className="svc-section-description">
								From launch-stage businesses to mature teams scaling content
								output, a coherent identity system keeps execution aligned.
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

				<section className="svc-section" aria-labelledby="bi-benefits-title">
					<div className="svc-shell">
						<div className="svc-benefits-grid">
							<div className="svc-benefits-intro">
								<p className="svc-eyebrow">Why HestiQ</p>
								<h2 id="bi-benefits-title" className="svc-section-title">
									What you gain
								</h2>
								<p className="svc-section-description">
									A brand system your team can execute repeatedly, without
									guesswork or visual inconsistency.
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
						aria-labelledby="bi-related-title"
					>
						<div className="svc-shell">
							<div className="svc-section-header svc-section-header-centered">
								<p className="svc-eyebrow">Explore More</p>
								<h2 id="bi-related-title" className="svc-section-title">
									Related services
								</h2>
								<p className="svc-section-description">
									Brand identity performs best when connected to adjacent design
									services across campaigns and product experiences.
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

				<section className="svc-cta-section" aria-labelledby="bi-cta-title">
					<div className="svc-cta-pattern" aria-hidden="true" />
					<div className="svc-shell svc-cta-content">
						<h2 id="bi-cta-title" className="svc-cta-title">
							Ready to unify your brand identity?
						</h2>
						<p className="svc-cta-subtitle">
							Share your goals and we will design a complete identity system
							your team can apply across every channel.
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
