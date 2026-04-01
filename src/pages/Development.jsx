import { Link } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FullHeroSection from "../components/sections/hero/FullHeroSection";
import PrimaryButton from "../components/elements/buttons/PrimaryButton";
import SecondaryButton from "../components/elements/buttons/SecondaryButton";
import Card from "../components/elements/cards/base/Card";
import PrimaryCtaLink from "../components/elements/links/PrimaryCtaLink";
import allServices from "../../shared/services.js";
import {
	FaGlobe,
	FaMobileScreenButton,
	FaCartShopping,
	FaFileCode,
	FaSuitcase,
	FaServer,
	FaBolt,
	FaShieldHalved,
	FaLayerGroup,
	FaHandshake,
	FaArrowRight,
} from "react-icons/fa6";
import "../styles/services.css";
import "../styles/development.css";

const ICON_MAP = {
	FaGlobe,
	FaMobileScreenButton,
	FaCartShopping,
	FaFileCode,
	FaSuitcase,
	FaServer,
};

const DEV_SERVICES = allServices.filter((s) => s.category === "Development");

const PILLARS = [
	{
		icon: FaBolt,
		title: "Performance First",
		description:
			"Load time, memory efficiency, and scalability are architectural requirements, not afterthoughts. Every decision optimises for production load from the first deployment.",
	},
	{
		icon: FaShieldHalved,
		title: "Security by Design",
		description:
			"Authentication, authorisation, input validation, and data handling follow OWASP standards. Security is built in from the start, not layered on at the end.",
	},
	{
		icon: FaLayerGroup,
		title: "Clean Architecture",
		description:
			"Modular, well-structured code that is maintainable, fully documented, and handed over completely. No vendor lock-in. No hidden dependencies.",
	},
	{
		icon: FaHandshake,
		title: "Full-Cycle Delivery",
		description:
			"Discovery, design, development, QA, deployment, and handover from one accountable team. No agency handoffs and no lost context between phases.",
	},
];

const PROCESS = [
	{
		num: "01",
		title: "Discovery",
		description:
			"Requirements, constraints, and architecture decisions are locked before code is written. No surprises mid-build.",
	},
	{
		num: "02",
		title: "Design",
		description:
			"Wireframes, data models, and API contracts established with your input at every stage before implementation begins.",
	},
	{
		num: "03",
		title: "Build & QA",
		description:
			"Iterative delivery with automated testing and code review in every pull request. Issues are caught early.",
	},
	{
		num: "04",
		title: "Deploy & Hand Off",
		description:
			"Production deployment with full documentation and a complete, structured handover to your team.",
	},
];

export default function Development() {
	return (
		<>
			<Header />
			<main className="svc-page">
				<FullHeroSection
					id="dev-hero-title"
					className="dev-hero"
					eyebrow="Development Services"
					title="Software built to perform, scale, and last."
					subtitle="From single-page websites to complex web applications and mobile platforms, HestiQ engineers production-grade software around your users and your goals. Every project is owned end to end by one dedicated team."
					actions={
						<>
							<PrimaryButton to="#services" state={{ scrollTo: "services" }}>
								Explore Services <FaArrowRight aria-hidden="true" />
							</PrimaryButton>
							<SecondaryButton
								to="/onboarding?category=programming"
								state={{ scrollToTop: true }}
								className="dev-hero-cta-outline"
							>
								Start a Project
							</SecondaryButton>
						</>
					}
				/>

				<section
					className="svc-section svc-section-alt"
					aria-labelledby="dev-pillars-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header">
							<p className="svc-eyebrow">How We Build</p>
							<h2 id="dev-pillars-title" className="svc-section-title">
								Engineering principles applied to every project
							</h2>
							<p className="svc-section-description">
								Consistent standards regardless of scope, stack, or timeline.
							</p>
						</div>
						<ul
							className="svc-features-grid"
							aria-label="Engineering principles"
						>
							{PILLARS.map(({ icon: Icon, title, description }) => (
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
					aria-labelledby="dev-services-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header svc-section-header-centered">
							<p className="svc-eyebrow">What We Deliver</p>
							<h2 id="dev-services-title" className="svc-section-title">
								Development services
							</h2>
							<p className="svc-section-description">
								Specialised offerings for every stage of your digital product,
								from initial launch through long-term operation.
							</p>
						</div>
						<ul className="dev-services-grid" aria-label="Development services">
							{DEV_SERVICES.map((service) => {
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

				<section
					className="svc-section svc-section-alt"
					aria-labelledby="dev-process-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header svc-section-header-centered">
							<p className="svc-eyebrow">How We Work</p>
							<h2 id="dev-process-title" className="svc-section-title">
								From brief to live in four stages
							</h2>
							<p className="svc-section-description">
								A structured delivery process that keeps every engagement on
								track, on scope, and on budget.
							</p>
						</div>
						<ol className="dev-process-grid" aria-label="Development process">
							{PROCESS.map(({ num, title, description }) => (
								<li key={num} className="dev-process-card">
									<div className="dev-process-num" aria-hidden="true">
										{num}
									</div>
									<h3 className="dev-process-card-title">{title}</h3>
									<p className="dev-process-card-description">{description}</p>
								</li>
							))}
						</ol>
					</div>
				</section>

				<section className="svc-cta-section" aria-labelledby="dev-cta-title">
					<div className="svc-cta-pattern" aria-hidden="true" />
					<div className="svc-shell svc-cta-content">
						<h2 id="dev-cta-title" className="svc-cta-title">
							Ready to build something that works?
						</h2>
						<p className="svc-cta-subtitle">
							Tell us what you need and we will scope a development engagement
							with a clear brief, a fixed estimate, and one team accountable
							from start to finish.
						</p>
						<PrimaryButton
							to="/onboarding?category=programming"
							state={{ scrollToTop: true }}
							className="svc-cta-button"
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
