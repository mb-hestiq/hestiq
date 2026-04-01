import { useMemo } from "react";
import { Link } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useServices } from "../../utils/servicesCache";
import {
	FaMagnifyingGlass,
	FaLayerGroup,
	FaPen,
	FaPalette,
	FaFileArrowDown,
	FaChartLine,
	FaArrowRight,
	FaBolt,
	FaCompass,
	FaRotate,
	FaCircleCheck,
	FaBullhorn,
} from "react-icons/fa6";
import "../../styles/services.css";

const FEATURES = [
	{
		icon: FaMagnifyingGlass,
		title: "Audience-First Concepting",
		description:
			"Campaign concepts built from audience intent, platform behavior, and market positioning before visual exploration starts.",
	},
	{
		icon: FaLayerGroup,
		title: "Multi-Format Deliverables",
		description:
			"Creative assets prepared for social, display, print, and out-of-home placements with consistent hierarchy and messaging.",
	},
	{
		icon: FaPen,
		title: "Conversion-Focused Copy Pairing",
		description:
			"Headline and body-copy pairings designed to support the visual system and improve click-through and response rates.",
	},
	{
		icon: FaPalette,
		title: "Brand-Consistent Visual Direction",
		description:
			"Typography, color, and layout choices aligned with your brand identity so ads scale without eroding brand trust.",
	},
	{
		icon: FaChartLine,
		title: "Performance-Ready Variations",
		description:
			"Variant-ready compositions for rapid A/B testing so creative decisions can be validated with campaign data.",
	},
	{
		icon: FaFileArrowDown,
		title: "Production Export Package",
		description:
			"Final assets delivered in platform-ready formats with dimensions, safe zones, and export settings included.",
	},
];

const USE_CASES = [
	{
		label: "Product Launch",
		title: "Driving awareness for new offers",
		description:
			"Launch campaigns that need immediate visibility across digital and print channels with cohesive creative messaging.",
	},
	{
		label: "Seasonal Campaigns",
		title: "Maintaining urgency without sacrificing quality",
		description:
			"Time-bound promotions require fast turnaround creative that still protects brand standards and conversion clarity.",
	},
	{
		label: "Retargeting",
		title: "Re-engaging high-intent audiences",
		description:
			"Remarketing creatives tailored to user stage and behavior to recover abandoned journeys and lift return conversions.",
	},
	{
		label: "Local Promotion",
		title: "Converting nearby demand",
		description:
			"Location-aware ad designs that highlight offer value, trust cues, and clear next actions for regional audiences.",
	},
];

const BENEFITS = [
	{
		icon: FaBolt,
		title: "Faster Campaign Execution",
		description:
			"Structured creative workflows reduce bottlenecks so campaigns launch on schedule without quality trade-offs.",
	},
	{
		icon: FaBullhorn,
		title: "Stronger Message Recall",
		description:
			"Visual and copy alignment improves ad comprehension, helping your offer stay memorable beyond the first impression.",
	},
	{
		icon: FaRotate,
		title: "Iterative Improvement",
		description:
			"Revision rounds and variant planning make it easy to refine creatives from campaign feedback and live metrics.",
	},
	{
		icon: FaCompass,
		title: "Creative Direction with Accountability",
		description:
			"A dedicated design lead ensures each ad decision ties back to campaign goals and measurable business outcomes.",
	},
];

const OVERVIEW_POINTS = [
	"Built for campaign performance across digital and print",
	"Brand-consistent visuals across every ad variation",
	"Clear hierarchy focused on action and conversion",
	"Production-ready assets delivered for immediate launch",
];

const ONBOARDING_URL =
	"/onboarding?category=design&service=advertisement-design";

export default function AdvertisementDesign() {
	const { services } = useServices();

	const service = useMemo(
		() => services.find((s) => s.name === "Advertisement Design") ?? null,
		[services],
	);

	const relatedServices = useMemo(
		() =>
			services
				.filter(
					(s) => s.category === "Design" && s.name !== "Advertisement Design",
				)
				.slice(0, 4),
		[services],
	);

	const servicePrice = useMemo(() => {
		const price = service?.price ?? service?.basePrice;
		if (typeof price === "number") {
			return `$${price}`;
		}
		if (typeof price === "string" && price.trim().length > 0) {
			return price;
		}
		return "$50";
	}, [service]);

	const serviceDuration = useMemo(() => {
		const duration = service?.duration;
		if (typeof duration === "number") {
			return `${duration} day${duration === 1 ? "" : "s"}`;
		}
		if (typeof duration === "string" && duration.trim().length > 0) {
			return duration;
		}
		return "1 day";
	}, [service]);

	const serviceRevisions = useMemo(() => {
		const revisions = service?.revisits ?? service?.revisions;
		if (typeof revisions === "number") {
			return `${revisions} revision${revisions === 1 ? "" : "s"}`;
		}
		if (typeof revisions === "string" && revisions.trim().length > 0) {
			return revisions;
		}
		return "3 revisions";
	}, [service]);

	return (
		<>
			<Header />
			<main className="svc-page">
				<section
					id="overview"
					className="svc-section"
					aria-labelledby="ad-overview-title"
				>
					<div className="svc-shell">
						<div className="svc-overview-grid">
							<div className="svc-overview-content">
								<p className="svc-eyebrow">The Problem We Solve</p>
								<h2 id="ad-overview-title" className="svc-section-title">
									Ads that look good but fail to convert.
								</h2>
								<p className="svc-section-description">
									Many campaigns underperform because creative execution is
									treated as decoration instead of strategy. Weak hierarchy,
									unclear offers, and inconsistent branding dilute the message
									before it reaches the right audience.
								</p>
								<p className="svc-section-description">
									We design advertisements around conversion intent and platform
									context, balancing visual impact with clarity so every asset
									moves people toward a concrete next action.
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
										Starting investment
									</span>
									<strong className="svc-overview-metric-value">
										From {servicePrice}
									</strong>
								</div>
								<div className="svc-overview-metric">
									<span className="svc-overview-metric-label">
										Typical delivery
									</span>
									<strong className="svc-overview-metric-value">
										{serviceDuration}
									</strong>
								</div>
								<div className="svc-overview-metric">
									<span className="svc-overview-metric-label">
										Revision coverage
									</span>
									<strong className="svc-overview-metric-value">
										{serviceRevisions}
									</strong>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section
					className="svc-section svc-section-alt"
					aria-labelledby="ad-features-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header svc-section-header-centered">
							<p className="svc-eyebrow">What's Included</p>
							<h2 id="ad-features-title" className="svc-section-title">
								Every engagement covers
							</h2>
							<p className="svc-section-description">
								A complete advertisement design workflow from concept direction
								to launch-ready exports across your active campaign channels.
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

				<section className="svc-section" aria-labelledby="ad-usecases-title">
					<div className="svc-shell">
						<div className="svc-section-header">
							<p className="svc-eyebrow">Applications</p>
							<h2 id="ad-usecases-title" className="svc-section-title">
								Where advertisement design creates impact
							</h2>
							<p className="svc-section-description">
								Any campaign with a specific audience, channel mix, and
								conversion target benefits from dedicated ad creative strategy.
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

				<section className="svc-section" aria-labelledby="ad-benefits-title">
					<div className="svc-shell">
						<div className="svc-benefits-grid">
							<div className="svc-benefits-intro">
								<p className="svc-eyebrow">Why HestiQ</p>
								<h2 id="ad-benefits-title" className="svc-section-title">
									What you gain
								</h2>
								<p className="svc-section-description">
									A campaign-ready creative system built for consistency, speed,
									and measurable advertising performance.
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
						aria-labelledby="ad-related-title"
					>
						<div className="svc-shell">
							<div className="svc-section-header svc-section-header-centered">
								<p className="svc-eyebrow">Explore More</p>
								<h2 id="ad-related-title" className="svc-section-title">
									Related services
								</h2>
								<p className="svc-section-description">
									Advertisement design performs best when supported by broader
									brand and creative assets across your marketing system.
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

				<section className="svc-cta-section" aria-labelledby="ad-cta-title">
					<div className="svc-cta-pattern" aria-hidden="true" />
					<div className="svc-shell svc-cta-content">
						<h2 id="ad-cta-title" className="svc-cta-title">
							Ready to run ad creative that converts more consistently?
						</h2>
						<p className="svc-cta-subtitle">
							Share your campaign goals and we will design advertisement assets
							that are clear, persuasive, and ready to launch.
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
