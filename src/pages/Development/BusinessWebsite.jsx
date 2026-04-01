import { useMemo } from "react";
import { Link } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useServices } from "../../utils/servicesCache";
import {
	FaArrowRight,
	FaBolt,
	FaBullseye,
	FaCircleCheck,
	FaCode,
	FaGauge,
	FaHandshake,
	FaLayerGroup,
	FaMobileScreen,
	FaShieldHalved,
	FaSitemap,
	FaUsers,
} from "react-icons/fa6";
import "../../styles/services.css";

const FEATURES = [
	{
		icon: FaSitemap,
		title: "Strategic Site Architecture",
		description:
			"Pages, navigation, and content hierarchy are structured around business goals, user intent, and conversion paths.",
	},
	{
		icon: FaCode,
		title: "Custom Development",
		description:
			"Template limitations are removed with clean, maintainable implementation tailored to your brand and operational needs.",
	},
	{
		icon: FaMobileScreen,
		title: "Responsive Across Devices",
		description:
			"Desktop, tablet, and mobile experiences are designed and tested for consistency, readability, and usability.",
	},
	{
		icon: FaGauge,
		title: "Performance-Optimized Build",
		description:
			"Optimized assets, efficient rendering, and lean page delivery keep load times fast and user drop-off low.",
	},
	{
		icon: FaShieldHalved,
		title: "Security and Reliability",
		description:
			"Best-practice security controls, robust form handling, and stable deployment pipelines protect your website and users.",
	},
	{
		icon: FaUsers,
		title: "Business-Aligned Collaboration",
		description:
			"Review cycles are anchored to business outcomes so design and development decisions remain practical and measurable.",
	},
];

const USE_CASES = [
	{
		label: "Service Businesses",
		title: "Turning visitors into qualified leads",
		description:
			"Professional service firms need websites that build trust quickly and direct prospects toward inquiries and consultations.",
	},
	{
		label: "Corporate Presence",
		title: "Presenting a credible digital brand",
		description:
			"Established companies use modern websites to align perception with market positioning and strengthen stakeholder confidence.",
	},
	{
		label: "Growth Campaigns",
		title: "Supporting launches and expansion",
		description:
			"New services, regional rollouts, and campaign pushes need web experiences that can adapt fast without compromising quality.",
	},
	{
		label: "Operations Enablement",
		title: "Reducing manual communication load",
		description:
			"Structured content, clear CTAs, and integrated forms reduce repetitive customer questions and improve internal efficiency.",
	},
];

const BENEFITS = [
	{
		icon: FaBolt,
		title: "Faster Time to Market",
		description:
			"A focused implementation process gets your business website live quickly without sacrificing polish or technical quality.",
	},
	{
		icon: FaBullseye,
		title: "Conversion-Focused Structure",
		description:
			"Content architecture and CTA placement are designed to guide visitors toward measurable business actions.",
	},
	{
		icon: FaLayerGroup,
		title: "Scalable Foundation",
		description:
			"Your site is built to grow with new pages, features, and integrations as your business expands.",
	},
	{
		icon: FaHandshake,
		title: "Reliable Delivery Partnership",
		description:
			"You work with a dedicated team that owns strategy, implementation, and launch readiness end to end.",
	},
];

const OVERVIEW_POINTS = [
	"Website architecture aligned to business goals",
	"Responsive design tuned for trust and clarity",
	"Technical implementation optimized for speed",
	"Launch-ready delivery with scalable structure",
];

const ONBOARDING_URL =
	"/onboarding?category=programming&service=business-website";

export default function BusinessWebsite() {
	const { services } = useServices();

	const service = useMemo(
		() => services.find((s) => s.name === "Business Website") ?? null,
		[services],
	);

	const relatedServices = useMemo(
		() =>
			services
				.filter(
					(s) => s.category === "Development" && s.name !== "Business Website",
				)
				.slice(0, 4),
		[services],
	);

	const servicePrice = useMemo(() => {
		const value = service?.price ?? service?.basePrice;
		return typeof value === "number" ? `$${value}` : "Custom quote";
	}, [service]);

	const serviceDuration = useMemo(() => {
		const value = service?.duration;
		if (typeof value !== "number") return "Timeline scoped to project";
		return value === 1 ? "1 day" : `${value} days`;
	}, [service]);

	const serviceRevisions = useMemo(() => {
		const value = service?.revisits ?? service?.revisions;
		if (typeof value !== "number") return "Includes revision cycles";
		return value === 1 ? "1 revision round" : `${value} revision rounds`;
	}, [service]);

	return (
		<>
			<Header />
			<main className="svc-page">
				<section
					id="overview"
					className="svc-section"
					aria-labelledby="bw-overview-title"
				>
					<div className="svc-shell">
						<div className="svc-overview-grid">
							<div className="svc-overview-content">
								<p className="svc-eyebrow">The Problem We Solve</p>
								<h2 id="bw-overview-title" className="svc-section-title">
									A business website that does more than look professional.
								</h2>
								<p className="svc-section-description">
									Many company websites are visually acceptable but
									operationally ineffective. They fail to communicate value
									quickly, lose users on mobile, and generate low-quality
									inbound leads.
								</p>
								<p className="svc-section-description">
									Our Business Website service combines strategic structure,
									conversion-focused UX, and production-ready development so
									your site becomes a growth asset instead of a brochure.
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
							<div className="svc-overview-meta" aria-label="Service metadata">
								<div className="svc-overview-metric">
									<span className="svc-overview-metric-label">
										Starting Price
									</span>
									<strong className="svc-overview-metric-value">
										{servicePrice}
									</strong>
								</div>
								<div className="svc-overview-metric">
									<span className="svc-overview-metric-label">
										Estimated Duration
									</span>
									<strong className="svc-overview-metric-value">
										{serviceDuration}
									</strong>
								</div>
								<div className="svc-overview-metric">
									<span className="svc-overview-metric-label">
										Revisions Included
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
					aria-labelledby="bw-features-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header svc-section-header-centered">
							<p className="svc-eyebrow">What's Included</p>
							<h2 id="bw-features-title" className="svc-section-title">
								Every implementation covers
							</h2>
							<p className="svc-section-description">
								A business-ready website foundation built for credibility,
								discoverability, and conversion.
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

				<section className="svc-section" aria-labelledby="bw-usecases-title">
					<div className="svc-shell">
						<div className="svc-section-header">
							<p className="svc-eyebrow">Applications</p>
							<h2 id="bw-usecases-title" className="svc-section-title">
								Where business websites create impact
							</h2>
							<p className="svc-section-description">
								From corporate positioning to lead generation, a structured
								website becomes a core operating layer for digital growth.
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

				<section className="svc-section" aria-labelledby="bw-benefits-title">
					<div className="svc-shell">
						<div className="svc-benefits-grid">
							<div className="svc-benefits-intro">
								<p className="svc-eyebrow">Why HestiQ</p>
								<h2 id="bw-benefits-title" className="svc-section-title">
									What you gain
								</h2>
								<p className="svc-section-description">
									A high-trust website delivered with strategic clarity,
									technical quality, and measurable business intent.
								</p>
								<Link
									to={ONBOARDING_URL}
									state={{ scrollToTop: true }}
									className="cta svc-benefits-cta"
								>
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
						aria-labelledby="bw-related-title"
					>
						<div className="svc-shell">
							<div className="svc-section-header svc-section-header-centered">
								<p className="svc-eyebrow">Explore More</p>
								<h2 id="bw-related-title" className="svc-section-title">
									Related services
								</h2>
								<p className="svc-section-description">
									These services complement your business website with platform
									scalability, richer interactions, and ongoing reliability.
								</p>
							</div>
							<ul
								className="svc-related-grid"
								aria-label="Related development services"
							>
								{relatedServices.map((s) => (
									<li key={s.name}>
										<Link
											to={s.href}
											state={{ scrollToTop: true }}
											className="svc-related-card"
										>
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

				<section className="svc-cta-section" aria-labelledby="bw-cta-title">
					<div className="svc-cta-pattern" aria-hidden="true" />
					<div className="svc-shell svc-cta-content">
						<h2 id="bw-cta-title" className="svc-cta-title">
							Ready to launch a business website that drives results?
						</h2>
						<p className="svc-cta-subtitle">
							Tell us your goals and we will deliver a high-performance website
							built for credibility, lead generation, and long-term growth.
						</p>
						<Link
							to={ONBOARDING_URL}
							state={{ scrollToTop: true }}
							className="cta svc-cta-button"
						>
							Get Started <FaArrowRight aria-hidden="true" />
						</Link>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
