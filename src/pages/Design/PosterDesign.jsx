import { useMemo } from "react";
import { Link } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useServices } from "../../utils/servicesCache";
import posterExample from "../../assets/images/examples/poster-example.png";
import posterFrameMockup from "../../assets/images/examples/poster-frame-mockup.png";
import {
	FaBullhorn,
	FaArrowRight,
	FaCircleCheck,
	FaListCheck,
	FaPalette,
	FaMessage,
	FaFileArrowDown,
	FaRulerCombined,
	FaRankingStar,
	FaClock,
	FaLayerGroup,
	FaHandshake,
} from "react-icons/fa6";
import "../../styles/services.css";

const FEATURES = [
	{
		icon: FaBullhorn,
		title: "Campaign-Led Composition",
		description:
			"Each layout is built around your primary message, ensuring the call-to-action remains the visual anchor.",
	},
	{
		icon: FaPalette,
		title: "Brand-Consistent Styling",
		description:
			"Typography, color, and iconography align with your existing brand system for immediate recognition.",
	},
	{
		icon: FaMessage,
		title: "Clear Information Hierarchy",
		description:
			"Headlines, details, and supporting proof are structured for quick scanning in both print and digital placements.",
	},
	{
		icon: FaRulerCombined,
		title: "Multi-Format Output",
		description:
			"Designed for social feeds, large-format print, and event displays with aspect-ratio-safe compositions.",
	},
	{
		icon: FaFileArrowDown,
		title: "Production-Ready Files",
		description:
			"Delivered in high-resolution export formats with bleed-safe and web-safe variants prepared.",
	},
	{
		icon: FaListCheck,
		title: "Revision-Backed Delivery",
		description:
			"Structured revision rounds keep creative feedback efficient while maintaining quality and deadlines.",
	},
];

const USE_CASES = [
	{
		label: "Event Promotion",
		title: "Drive attendance with high-impact visuals",
		description:
			"Conferences, workshops, and launches use posters to communicate date, value, and urgency in seconds.",
	},
	{
		label: "Retail Campaigns",
		title: "Promote offers in-store and online",
		description:
			"Seasonal campaigns and product pushes get consistent assets for storefront displays and social ads.",
	},
	{
		label: "Corporate Communication",
		title: "Internal and external announcements",
		description:
			"Policy updates, hiring drives, and awareness initiatives are presented clearly for large audiences.",
	},
	{
		label: "Social Campaign Assets",
		title: "Reusable creative for paid and organic channels",
		description:
			"Poster-style layouts adapt cleanly into stories, reels covers, feed posts, and ad placements.",
	},
];

const BENEFITS = [
	{
		icon: FaRankingStar,
		title: "Stronger Visual Recall",
		description:
			"Professionally structured posters make your campaign more memorable in crowded visual spaces.",
	},
	{
		icon: FaClock,
		title: "Faster Campaign Turnarounds",
		description:
			"A repeatable design workflow keeps approvals quick while preserving creative quality.",
	},
	{
		icon: FaLayerGroup,
		title: "Cross-Channel Consistency",
		description:
			"One core visual concept adapts across print, web, social, and on-site placements without dilution.",
	},
	{
		icon: FaHandshake,
		title: "Collaborative Creative Process",
		description:
			"You get a clear feedback cycle, transparent revisions, and production-ready delivery every time.",
	},
];

const OVERVIEW_POINTS = [
	"Message-first visual storytelling",
	"Poster layouts tuned for attention and clarity",
	"Built for both print and digital channels",
	"Delivered with ready-to-publish exports",
];

const ONBOARDING_URL = "/onboarding?category=design&service=poster-design";

export default function PosterDesign() {
	const { services } = useServices();

	const service = useMemo(
		() => services.find((s) => s.name === "Poster Design") ?? null,
		[services],
	);

	const relatedServices = useMemo(
		() =>
			services
				.filter((s) => s.category === "Design" && s.name !== "Poster Design")
				.slice(0, 4),
		[services],
	);

	const priceValue =
		typeof service?.price === "number"
			? `$${service.price}`
			: typeof service?.basePrice === "number"
				? `$${service.basePrice}`
				: "Custom quote";

	const durationValue =
		typeof service?.duration === "number"
			? `${service.duration} ${service.duration === 1 ? "day" : "days"}`
			: "Timeline on brief";

	const revisionsCount =
		typeof service?.revisits === "number"
			? service.revisits
			: typeof service?.revisions === "number"
				? service.revisions
				: null;

	const revisionsValue =
		revisionsCount === null
			? "Includes revision rounds"
			: `${revisionsCount} ${revisionsCount === 1 ? "round" : "rounds"}`;

	return (
		<>
			<Header />
			<main className="svc-page">
				<section
					id="overview"
					className="svc-section"
					aria-labelledby="pd-overview-title"
				>
					<div className="svc-shell">
						<div className="svc-overview-grid">
							<div className="svc-overview-content">
								<p className="svc-eyebrow">The Problem We Solve</p>
								<h2 id="pd-overview-title" className="svc-section-title">
									Posters that attract attention and move people to act.
								</h2>
								<p className="svc-section-description">
									Most posters fail because they try to say everything at once.
									Weak hierarchy, inconsistent typography, and generic visuals
									make key messages disappear in crowded environments.
								</p>
								<p className="svc-section-description">
									We design poster systems around message clarity and campaign
									intent, combining strong composition with brand consistency so
									your audience understands the offer instantly.
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
							<div className="svc-overview-visual">
								<img
									src={posterExample}
									alt="Poster design example"
									className="svc-overview-image"
									loading="lazy"
								/>
							</div>
						</div>
					</div>
				</section>

				<section
					className="svc-section svc-section-alt"
					aria-labelledby="pd-meta-title"
				>
					<div className="svc-shell">
						<div className="svc-overview-grid">
							<div className="svc-overview-content">
								<p className="svc-eyebrow">Service Snapshot</p>
								<h2 id="pd-meta-title" className="svc-section-title">
									What this engagement includes
								</h2>
								<p className="svc-section-description">
									A focused design engagement tailored for campaign posters,
									promotional creatives, and high-visibility communication
									assets.
								</p>
							</div>
							<div className="svc-overview-meta" aria-label="Service metrics">
								<div className="svc-overview-metric">
									<span className="svc-overview-metric-label">
										Starting Price
									</span>
									<strong className="svc-overview-metric-value">
										{priceValue}
									</strong>
								</div>
								<div className="svc-overview-metric">
									<span className="svc-overview-metric-label">
										Estimated Duration
									</span>
									<strong className="svc-overview-metric-value">
										{durationValue}
									</strong>
								</div>
								<div className="svc-overview-metric">
									<span className="svc-overview-metric-label">
										Revision Rounds
									</span>
									<strong className="svc-overview-metric-value">
										{revisionsValue}
									</strong>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="svc-section" aria-labelledby="pd-features-title">
					<div className="svc-shell">
						<div className="svc-section-header svc-section-header-centered">
							<p className="svc-eyebrow">What's Included</p>
							<h2 id="pd-features-title" className="svc-section-title">
								Every poster design package covers
							</h2>
							<p className="svc-section-description">
								From concept and composition to final exports, every stage is
								structured for quality and speed.
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

				<section
					className="svc-section svc-section-alt"
					aria-labelledby="pd-content-title"
				>
					<div className="svc-shell">
						<div className="svc-overview-grid">
							<div className="svc-overview-visual">
								<img
									src={posterFrameMockup}
									alt="Poster frame mockup"
									className="svc-overview-image"
									loading="lazy"
								/>
							</div>
							<div className="svc-overview-content">
								<p className="svc-eyebrow">Content Strategy</p>
								<h2 id="pd-content-title" className="svc-section-title">
									Designed for readability at a glance
								</h2>
								<p className="svc-section-description">
									Poster layouts are engineered around scan patterns. We balance
									headline weight, spacing, contrast, and supporting copy so key
									details remain clear from near and far viewing distances.
								</p>
								<p className="svc-section-description">
									The result is visual communication that performs in busy
									environments, whether printed for venue walls or adapted for
									digital campaign channels.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section className="svc-section" aria-labelledby="pd-usecases-title">
					<div className="svc-shell">
						<div className="svc-section-header">
							<p className="svc-eyebrow">Applications</p>
							<h2 id="pd-usecases-title" className="svc-section-title">
								Where poster design creates impact
							</h2>
							<p className="svc-section-description">
								From physical spaces to digital campaigns, a clear visual poster
								format helps audiences absorb information and act quickly.
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

				<section className="svc-section" aria-labelledby="pd-benefits-title">
					<div className="svc-shell">
						<div className="svc-benefits-grid">
							<div className="svc-benefits-intro">
								<p className="svc-eyebrow">Why HestiQ</p>
								<h2 id="pd-benefits-title" className="svc-section-title">
									What you gain
								</h2>
								<p className="svc-section-description">
									A campaign-ready poster system with clear messaging, faster
									delivery cycles, and files ready for immediate deployment.
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
						aria-labelledby="pd-related-title"
					>
						<div className="svc-shell">
							<div className="svc-section-header svc-section-header-centered">
								<p className="svc-eyebrow">Explore More</p>
								<h2 id="pd-related-title" className="svc-section-title">
									Related services
								</h2>
								<p className="svc-section-description">
									Poster design works best when aligned with broader visual
									branding and campaign assets.
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

				<section className="svc-cta-section" aria-labelledby="pd-cta-title">
					<div className="svc-cta-pattern" aria-hidden="true" />
					<div className="svc-shell svc-cta-content">
						<h2 id="pd-cta-title" className="svc-cta-title">
							Ready to launch your next poster campaign?
						</h2>
						<p className="svc-cta-subtitle">
							Share your campaign objective, audience, and channels. We will
							deliver poster visuals that communicate clearly and convert fast.
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
