import { useMemo } from "react";
import { Link } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useServices } from "../../utils/servicesCache";
import webAppDark from "../../assets/images/examples/web-app-example-dark.png";
import webAppLight from "../../assets/images/examples/web-app-example-light.png";
import {
	FaCircleCheck,
	FaGlobe,
	FaDatabase,
	FaShieldHalved,
	FaGauge,
	FaPlugCircleBolt,
	FaUsersGear,
	FaArrowRight,
	FaBolt,
	FaLayerGroup,
	FaChartLine,
	FaHandshake,
} from "react-icons/fa6";
import "../../styles/services.css";

const FEATURES = [
	{
		icon: FaGlobe,
		title: "Full-Stack Development",
		description:
			"Frontend and backend engineered as a unified system with consistent data contracts, clean API boundaries, and no impedance mismatch.",
	},
	{
		icon: FaDatabase,
		title: "Scalable Data Architecture",
		description:
			"Database schema design, query optimisation, and caching strategies that perform under production load from the first deployment.",
	},
	{
		icon: FaShieldHalved,
		title: "Authentication & Authorisation",
		description:
			"Role-based access control, session management, and OAuth integration built to OWASP standards.",
	},
	{
		icon: FaGauge,
		title: "Performance Engineering",
		description:
			"Server-side rendering, lazy loading, and asset optimisation applied throughout the stack for fast, responsive interfaces.",
	},
	{
		icon: FaPlugCircleBolt,
		title: "Third-Party Integrations",
		description:
			"Payment processors, communication APIs, analytics platforms, and enterprise systems connected with resilient, well-tested adapters.",
	},
	{
		icon: FaUsersGear,
		title: "Admin & Dashboard Interfaces",
		description:
			"Internal tools, reporting dashboards, and management interfaces built with the same care as the user-facing product.",
	},
];

const USE_CASES = [
	{
		label: "SaaS Products",
		title: "Building a software business on solid foundations",
		description:
			"From multi-tenant architecture to subscription billing, we build SaaS applications engineered for growth from the first line of code.",
	},
	{
		label: "Internal Tools",
		title: "Replacing spreadsheets and manual processes",
		description:
			"Operations, logistics, and finance teams get purpose-built web applications that automate workflows and centralise data.",
	},
	{
		label: "Client-Facing Portals",
		title: "Giving customers a dedicated digital space",
		description:
			"Professional services firms and agencies deliver client portals with document management, project tracking, and communication in one secure environment.",
	},
	{
		label: "Data Platforms",
		title: "Making complex data accessible",
		description:
			"Analytics products and reporting tools built with query performance and data visualisation at the architectural level.",
	},
];

const BENEFITS = [
	{
		icon: FaBolt,
		title: "Engineered for Production",
		description:
			"Every web application ships with logging, error tracking, and observability configured, not bolted on after the first incident.",
	},
	{
		icon: FaLayerGroup,
		title: "Built to Scale Horizontally",
		description:
			"Stateless services, managed sessions, and infrastructure-as-code mean scaling up is a configuration decision, not a rebuild.",
	},
	{
		icon: FaChartLine,
		title: "Measurable from Launch",
		description:
			"Instrumented from day one: feature usage, error rates, and performance baselines surface the data you need to iterate confidently.",
	},
	{
		icon: FaHandshake,
		title: "Accountable, Dedicated Team",
		description:
			"A product engineer owns your application end to end, with no handoffs between siloed frontend and backend teams.",
	},
];

const OVERVIEW_POINTS = [
	"Custom architecture with no framework lock-in imposed on your product",
	"Authentication, roles, and permissions built to OWASP standards",
	"Deployed to production infrastructure with monitoring from day one",
	"Documentation and handover included as standard",
];

const ONBOARDING_URL =
	"/onboarding?category=programming&service=web-application";

export default function WebApplication() {
	const { services } = useServices();

	const relatedServices = useMemo(
		() =>
			services
				.filter(
					(s) => s.category === "Development" && s.name !== "Web Application",
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
					aria-labelledby="wa-overview-title"
				>
					<div className="svc-shell">
						<div className="svc-overview-grid">
							<div className="svc-overview-content">
								<p className="svc-eyebrow">The Problem We Solve</p>
								<h2 id="wa-overview-title" className="svc-section-title">
									A web application built to run a business, not just impress
									investors.
								</h2>
								<p className="svc-section-description">
									Most web applications are prototypes that outlived their
									welcome. Technical debt accumulates, performance degrades
									under load, and security gaps widen with every unreviewed
									dependency update.
								</p>
								<p className="svc-section-description">
									We build web applications as production systems from the first
									commit: architected to scale, secured against the OWASP Top
									10, and instrumented so you can see exactly how they perform
									in the real world.
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
								<div className="svc-overview-dual-images">
									<img
										src={webAppDark}
										alt="Web application dark theme"
										className="svc-overview-dual-img svc-overview-dual-img-back"
										loading="lazy"
									/>
									<img
										src={webAppLight}
										alt="Web application light theme"
										className="svc-overview-dual-img svc-overview-dual-img-front"
										loading="lazy"
									/>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section
					className="svc-section svc-section-alt"
					aria-labelledby="wa-features-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header svc-section-header-centered">
							<p className="svc-eyebrow">What's Included</p>
							<h2 id="wa-features-title" className="svc-section-title">
								Every build covers
							</h2>
							<p className="svc-section-description">
								Full-stack engineering delivered as a complete, production-ready
								system, not a collection of loosely assembled parts.
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

				<section className="svc-section" aria-labelledby="wa-usecases-title">
					<div className="svc-shell">
						<div className="svc-section-header">
							<p className="svc-eyebrow">Applications</p>
							<h2 id="wa-usecases-title" className="svc-section-title">
								Where web applications create leverage
							</h2>
							<p className="svc-section-description">
								Any process driven by data, multi-user interaction, or
								automation is a candidate for a purpose-built web application.
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

				<section className="svc-section" aria-labelledby="wa-benefits-title">
					<div className="svc-shell">
						<div className="svc-benefits-grid">
							<div className="svc-benefits-intro">
								<p className="svc-eyebrow">Why HestiQ</p>
								<h2 id="wa-benefits-title" className="svc-section-title">
									What you gain
								</h2>
								<p className="svc-section-description">
									A robust, scalable application delivered by engineers who
									treat production quality as a baseline.
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
						aria-labelledby="wa-related-title"
					>
						<div className="svc-shell">
							<div className="svc-section-header svc-section-header-centered">
								<p className="svc-eyebrow">Explore More</p>
								<h2 id="wa-related-title" className="svc-section-title">
									Related services
								</h2>
								<p className="svc-section-description">
									Web applications are most effective when backed by solid
									infrastructure, strong UI design, and ongoing maintenance.
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

				<section className="svc-cta-section" aria-labelledby="wa-cta-title">
					<div className="svc-cta-pattern" aria-hidden="true" />
					<div className="svc-shell svc-cta-content">
						<h2 id="wa-cta-title" className="svc-cta-title">
							Ready to build an application your business can rely on?
						</h2>
						<p className="svc-cta-subtitle">
							Tell us about your product and we'll architect a web application
							built to perform, scale, and last.
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
