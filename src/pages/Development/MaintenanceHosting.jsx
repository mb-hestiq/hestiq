import { useMemo } from "react";
import { Link } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useServices } from "../../utils/servicesCache";
import {
	FaCircleCheck,
	FaServer,
	FaRotate,
	FaShieldHalved,
	FaGauge,
	FaHeadset,
	FaCloudArrowUp,
	FaArrowRight,
	FaLock,
	FaBolt,
	FaClockRotateLeft,
	FaHandshake,
} from "react-icons/fa6";
import "../../styles/services.css";

const FEATURES = [
	{
		icon: FaServer,
		title: "Managed Hosting",
		description:
			"Production-grade server infrastructure configured, monitored, and managed on your behalf with no DevOps expertise required.",
	},
	{
		icon: FaRotate,
		title: "Regular Updates",
		description:
			"CMS, framework, plugin, and dependency updates applied on a scheduled cycle to keep the stack current and secure.",
	},
	{
		icon: FaShieldHalved,
		title: "Security Monitoring",
		description:
			"Continuous vulnerability scanning, intrusion detection, and immediate remediation when threats are identified.",
	},
	{
		icon: FaGauge,
		title: "Performance Monitoring",
		description:
			"Uptime checks, response time tracking, and load analysis with proactive alerts before issues affect users.",
	},
	{
		icon: FaCloudArrowUp,
		title: "Automated Backups",
		description:
			"Daily encrypted backups with verified restore capability. Complete data recovery available within minutes.",
	},
	{
		icon: FaHeadset,
		title: "Priority Support",
		description:
			"Direct access to your dedicated technical contact. No ticket queues, no escalation chains, no waiting.",
	},
];

const USE_CASES = [
	{
		label: "Agency Clients",
		title: "Post-launch care on every project",
		description:
			"Agencies retain us as the technical layer after handoff, ensuring client sites stay updated, secure, and available without stretching internal teams.",
	},
	{
		label: "Business Owners",
		title: "Running the site while you run the business",
		description:
			"Business owners who built a site and need it maintained without dealing with servers, updates, or unexpected failures.",
	},
	{
		label: "Regulated Industries",
		title: "Meeting compliance requirements",
		description:
			"Healthcare, legal, and financial businesses with strict uptime and data security requirements get documented, auditable maintenance schedules.",
	},
	{
		label: "Growing Platforms",
		title: "Scaling infrastructure with demand",
		description:
			"Sites experiencing growth get infrastructure that scales horizontally, with performance tuning applied as load increases.",
	},
];

const BENEFITS = [
	{
		icon: FaLock,
		title: "Risks Eliminated Before They Escalate",
		description:
			"Proactive security patching and dependency management prevents incidents rather than reacting to them.",
	},
	{
		icon: FaBolt,
		title: "Consistent Performance at Every Scale",
		description:
			"Infrastructure is right-sized and tuned continuously, so performance holds under normal and peak load alike.",
	},
	{
		icon: FaClockRotateLeft,
		title: "Guaranteed Recovery",
		description:
			"Verified daily backups mean any incident, however severe, can be reversed. No data loss, no extended downtime.",
	},
	{
		icon: FaHandshake,
		title: "One Expert Contact",
		description:
			"A single technical owner is accountable for your infrastructure. No hand-offs, no confusion, no blame cycles.",
	},
];

const OVERVIEW_POINTS = [
	"Fully managed with no technical involvement required from you",
	"Proactive security patching before vulnerabilities are exploited",
	"99.9% uptime target with active monitoring",
	"Daily backups with guaranteed restore capability",
];

const ONBOARDING_URL =
	"/onboarding?category=programming&service=maintenance-hosting";

export default function MaintenanceHosting() {
	const { services } = useServices();

	const relatedServices = useMemo(
		() =>
			services
				.filter(
					(s) =>
						s.category === "Development" && s.name !== "Maintenance & Hosting",
				)
				.slice(0, 4),
		[services],
	);

	return (
		<>
			<Header />
			<main className="svc-page">
				<section
					id="overview"
					className="svc-section"
					aria-labelledby="mh-overview-title"
				>
					<div className="svc-shell">
						<div className="svc-overview-grid">
							<div className="svc-overview-content">
								<p className="svc-eyebrow">The Problem We Solve</p>
								<h2 id="mh-overview-title" className="svc-section-title">
									Your site, running. Always.
								</h2>
								<p className="svc-section-description">
									Most websites are launched and promptly forgotten. Plugins go
									unpatched, dependencies age, backups are never verified, and
									performance gradually degrades until something breaks at the
									worst possible time.
								</p>
								<p className="svc-section-description">
									We take full ownership of your hosting and maintenance:
									monitoring infrastructure, applying updates, verifying
									backups, and resolving issues before they reach your users or
									your inbox.
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
										Uptime target
									</span>
									<strong className="svc-overview-metric-value">
										99.9% with continuous monitoring and proactive alerts
									</strong>
								</div>
								<div className="svc-overview-metric">
									<span className="svc-overview-metric-label">
										Backup frequency
									</span>
									<strong className="svc-overview-metric-value">
										Daily encrypted backups with verified restore capability
									</strong>
								</div>
								<div className="svc-overview-metric">
									<span className="svc-overview-metric-label">
										Support access
									</span>
									<strong className="svc-overview-metric-value">
										Direct contact with your dedicated technical owner
									</strong>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section
					className="svc-section svc-section-alt"
					aria-labelledby="mh-features-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header svc-section-header-centered">
							<p className="svc-eyebrow">What's Included</p>
							<h2 id="mh-features-title" className="svc-section-title">
								Every plan covers
							</h2>
							<p className="svc-section-description">
								A complete managed infrastructure service covering hosting,
								security, updates, and support in a single engagement.
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

				<section className="svc-section" aria-labelledby="mh-usecases-title">
					<div className="svc-shell">
						<div className="svc-section-header">
							<p className="svc-eyebrow">Applications</p>
							<h2 id="mh-usecases-title" className="svc-section-title">
								Who needs managed maintenance
							</h2>
							<p className="svc-section-description">
								Any online presence that drives revenue or serves customers
								professionally needs reliable infrastructure behind it.
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

				<section className="svc-section" aria-labelledby="mh-benefits-title">
					<div className="svc-shell">
						<div className="svc-benefits-grid">
							<div className="svc-benefits-intro">
								<p className="svc-eyebrow">Why HestiQ</p>
								<h2 id="mh-benefits-title" className="svc-section-title">
									What you gain
								</h2>
								<p className="svc-section-description">
									Technical accountability that lets you focus on your business,
									not your infrastructure.
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
						aria-labelledby="mh-related-title"
					>
						<div className="svc-shell">
							<div className="svc-section-header svc-section-header-centered">
								<p className="svc-eyebrow">Explore More</p>
								<h2 id="mh-related-title" className="svc-section-title">
									Related services
								</h2>
								<p className="svc-section-description">
									Maintenance is most valuable when the site itself is built to
									a high standard. These services ensure the foundation is worth
									protecting.
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

				<section className="svc-cta-section" aria-labelledby="mh-cta-title">
					<div className="svc-cta-pattern" aria-hidden="true" />
					<div className="svc-shell svc-cta-content">
						<h2 id="mh-cta-title" className="svc-cta-title">
							Ready to hand off your infrastructure for good?
						</h2>
						<p className="svc-cta-subtitle">
							Tell us about your current setup and we'll take full ownership of
							keeping it secure, fast, and available.
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
