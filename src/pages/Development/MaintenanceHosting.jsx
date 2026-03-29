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
			<main className="SvcPage">
				<section
					id="overview"
					className="SvcSection"
					aria-labelledby="mh-overview-title"
				>
					<div className="SvcShell">
						<div className="SvcOverviewGrid">
							<div className="SvcOverviewContent">
								<p className="SvcEyebrow">The Problem We Solve</p>
								<h2 id="mh-overview-title" className="SvcSectionTitle">
									Your site, running. Always.
								</h2>
								<p className="SvcSectionDescription">
									Most websites are launched and promptly forgotten. Plugins go
									unpatched, dependencies age, backups are never verified, and
									performance gradually degrades until something breaks at the
									worst possible time.
								</p>
								<p className="SvcSectionDescription">
									We take full ownership of your hosting and maintenance:
									monitoring infrastructure, applying updates, verifying
									backups, and resolving issues before they reach your users or
									your inbox.
								</p>
								<ul
									className="SvcOverviewPoints"
									aria-label="Core value points"
								>
									{OVERVIEW_POINTS.map((point) => (
										<li key={point} className="SvcOverviewPoint">
											<FaCircleCheck
												className="SvcOverviewPointIcon"
												aria-hidden="true"
											/>
											<span>{point}</span>
										</li>
									))}
								</ul>
							</div>
							<div className="SvcOverviewMeta" aria-label="Service highlights">
								<div className="SvcOverviewMetric">
									<span className="SvcOverviewMetricLabel">Uptime target</span>
									<strong className="SvcOverviewMetricValue">
										99.9% with continuous monitoring and proactive alerts
									</strong>
								</div>
								<div className="SvcOverviewMetric">
									<span className="SvcOverviewMetricLabel">
										Backup frequency
									</span>
									<strong className="SvcOverviewMetricValue">
										Daily encrypted backups with verified restore capability
									</strong>
								</div>
								<div className="SvcOverviewMetric">
									<span className="SvcOverviewMetricLabel">Support access</span>
									<strong className="SvcOverviewMetricValue">
										Direct contact with your dedicated technical owner
									</strong>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section
					className="SvcSection SvcSectionAlt"
					aria-labelledby="mh-features-title"
				>
					<div className="SvcShell">
						<div className="SvcSectionHeader SvcSectionHeaderCentered">
							<p className="SvcEyebrow">What's Included</p>
							<h2 id="mh-features-title" className="SvcSectionTitle">
								Every plan covers
							</h2>
							<p className="SvcSectionDescription">
								A complete managed infrastructure service covering hosting,
								security, updates, and support in a single engagement.
							</p>
						</div>
						<ul className="SvcFeaturesGrid" aria-label="Service features">
							{FEATURES.map(({ icon: Icon, title, description }) => (
								<li key={title} className="SvcFeatureCard">
									<div className="SvcFeatureIconWrapper" aria-hidden="true">
										<Icon />
									</div>
									<h3 className="SvcFeatureTitle">{title}</h3>
									<p className="SvcFeatureDescription">{description}</p>
								</li>
							))}
						</ul>
					</div>
				</section>

				<section className="SvcSection" aria-labelledby="mh-usecases-title">
					<div className="SvcShell">
						<div className="SvcSectionHeader">
							<p className="SvcEyebrow">Applications</p>
							<h2 id="mh-usecases-title" className="SvcSectionTitle">
								Who needs managed maintenance
							</h2>
							<p className="SvcSectionDescription">
								Any online presence that drives revenue or serves customers
								professionally needs reliable infrastructure behind it.
							</p>
						</div>
						<ul className="SvcUseCasesGrid" aria-label="Use cases">
							{USE_CASES.map(({ label, title, description }) => (
								<li key={label} className="SvcUseCaseCard">
									<span className="SvcUseCaseLabel">{label}</span>
									<h3 className="SvcUseCaseTitle">{title}</h3>
									<p className="SvcUseCaseDescription">{description}</p>
								</li>
							))}
						</ul>
					</div>
				</section>

				<section className="SvcSection" aria-labelledby="mh-benefits-title">
					<div className="SvcShell">
						<div className="SvcBenefitsGrid">
							<div className="SvcBenefitsIntro">
								<p className="SvcEyebrow">Why HestiQ</p>
								<h2 id="mh-benefits-title" className="SvcSectionTitle">
									What you gain
								</h2>
								<p className="SvcSectionDescription">
									Technical accountability that lets you focus on your business,
									not your infrastructure.
								</p>
								<Link
									to={ONBOARDING_URL}
									state={{ scrollToTop: true }}
									className="CTA SvcBenefitsCTA"
								>
									Get Started <FaArrowRight aria-hidden="true" />
								</Link>
							</div>
							<ul className="SvcBenefitsList" aria-label="Benefits">
								{BENEFITS.map(({ icon: Icon, title, description }) => (
									<li key={title} className="SvcBenefit">
										<div className="SvcBenefitIconWrapper" aria-hidden="true">
											<Icon />
										</div>
										<div className="SvcBenefitContent">
											<h3 className="SvcBenefitTitle">{title}</h3>
											<p className="SvcBenefitDescription">{description}</p>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</section>

				{relatedServices.length > 0 && (
					<section
						className="SvcSection SvcSectionAlt"
						aria-labelledby="mh-related-title"
					>
						<div className="SvcShell">
							<div className="SvcSectionHeader SvcSectionHeaderCentered">
								<p className="SvcEyebrow">Explore More</p>
								<h2 id="mh-related-title" className="SvcSectionTitle">
									Related services
								</h2>
								<p className="SvcSectionDescription">
									Maintenance is most valuable when the site itself is built to
									a high standard. These services ensure the foundation is worth
									protecting.
								</p>
							</div>
							<ul
								className="SvcRelatedGrid"
								aria-label="Related development services"
							>
								{relatedServices.map((s) => (
									<li key={s.name}>
										<Link
											to={s.href}
											state={{ scrollToTop: true }}
											className="SvcRelatedCard"
										>
											<div className="SvcRelatedCardTop">
												<span className="SvcRelatedCardCategory">
													{s.category}
												</span>
											</div>
											<h3 className="SvcRelatedCardTitle">{s.name}</h3>
											<p className="SvcRelatedCardDescription">
												{s.description}
											</p>
											<span className="SvcRelatedCardLink">
												View service <FaArrowRight aria-hidden="true" />
											</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</section>
				)}

				<section className="SvcCTASection" aria-labelledby="mh-cta-title">
					<div className="SvcCTAPattern" aria-hidden="true" />
					<div className="SvcShell SvcCTAContent">
						<h2 id="mh-cta-title" className="SvcCTATitle">
							Ready to hand off your infrastructure for good?
						</h2>
						<p className="SvcCTASubtitle">
							Tell us about your current setup and we'll take full ownership of
							keeping it secure, fast, and available.
						</p>
						<Link
							to={ONBOARDING_URL}
							state={{ scrollToTop: true }}
							className="CTA SvcCTAButton"
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
