import { Link } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
			<main className="SvcPage">
				<section className="DevHero" aria-labelledby="dev-hero-title">
					<div className="SvcShell DevHeroContent">
						<p className="SvcEyebrow">Development Services</p>
						<h1 id="dev-hero-title" className="DevHeroTitle">
							Software built to perform, scale, and last.
						</h1>
						<p className="DevHeroSubtitle">
							From single-page websites to complex web applications and mobile
							platforms, HestiQ engineers production-grade software around your
							users and your goals. Every project is owned end to end by one
							dedicated team.
						</p>
						<div className="DevHeroCTAs">
							<Link
								to="#services"
								state={{ scrollTo: "services" }}
								className="CTA"
							>
								Explore Services <FaArrowRight aria-hidden="true" />
							</Link>
							<Link
								to="/onboarding?category=programming"
								state={{ scrollToTop: true }}
								className="DevHeroCTAOutline"
							>
								Start a Project
							</Link>
						</div>
					</div>
				</section>

				<section
					className="SvcSection SvcSectionAlt"
					aria-labelledby="dev-pillars-title"
				>
					<div className="SvcShell">
						<div className="SvcSectionHeader">
							<p className="SvcEyebrow">How We Build</p>
							<h2 id="dev-pillars-title" className="SvcSectionTitle">
								Engineering principles applied to every project
							</h2>
							<p className="SvcSectionDescription">
								Consistent standards regardless of scope, stack, or timeline.
							</p>
						</div>
						<ul className="SvcFeaturesGrid" aria-label="Engineering principles">
							{PILLARS.map(({ icon: Icon, title, description }) => (
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

				<section
					id="services"
					className="SvcSection"
					aria-labelledby="dev-services-title"
				>
					<div className="SvcShell">
						<div className="SvcSectionHeader SvcSectionHeaderCentered">
							<p className="SvcEyebrow">What We Deliver</p>
							<h2 id="dev-services-title" className="SvcSectionTitle">
								Development services
							</h2>
							<p className="SvcSectionDescription">
								Specialised offerings for every stage of your digital product,
								from initial launch through long-term operation.
							</p>
						</div>
						<ul className="DevServicesGrid" aria-label="Development services">
							{DEV_SERVICES.map((service) => {
								const Icon = ICON_MAP[service.icon];
								return (
									<li key={service.name}>
										<Link
											to={service.href}
											state={{ scrollToTop: true }}
											className="DevServiceCard"
										>
											{Icon && (
												<div className="DevServiceCardIcon" aria-hidden="true">
													<Icon />
												</div>
											)}
											<h3 className="DevServiceCardName">{service.name}</h3>
											<p className="DevServiceCardDescription">
												{service.description}
											</p>
											{(service.price || service.duration) && (
												<div className="DevServiceCardMeta">
													{service.price && (
														<span className="DevServiceCardMetaItem">
															From <strong>${service.price}</strong>
														</span>
													)}
													{service.duration && (
														<span className="DevServiceCardMetaItem">
															<strong>{service.duration}</strong>{" "}
															{service.duration === 1 ? "week" : "weeks"}
														</span>
													)}
												</div>
											)}
											<span className="DevServiceCardLink">
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
					className="SvcSection SvcSectionAlt"
					aria-labelledby="dev-process-title"
				>
					<div className="SvcShell">
						<div className="SvcSectionHeader SvcSectionHeaderCentered">
							<p className="SvcEyebrow">How We Work</p>
							<h2 id="dev-process-title" className="SvcSectionTitle">
								From brief to live in four stages
							</h2>
							<p className="SvcSectionDescription">
								A structured delivery process that keeps every engagement on
								track, on scope, and on budget.
							</p>
						</div>
						<ol className="DevProcessGrid" aria-label="Development process">
							{PROCESS.map(({ num, title, description }) => (
								<li key={num} className="DevProcessCard">
									<div className="DevProcessNum" aria-hidden="true">
										{num}
									</div>
									<h3 className="DevProcessCardTitle">{title}</h3>
									<p className="DevProcessCardDescription">{description}</p>
								</li>
							))}
						</ol>
					</div>
				</section>

				<section className="SvcCTASection" aria-labelledby="dev-cta-title">
					<div className="SvcCTAPattern" aria-hidden="true" />
					<div className="SvcShell SvcCTAContent">
						<h2 id="dev-cta-title" className="SvcCTATitle">
							Ready to build something that works?
						</h2>
						<p className="SvcCTASubtitle">
							Tell us what you need and we will scope a development engagement
							with a clear brief, a fixed estimate, and one team accountable
							from start to finish.
						</p>
						<Link
							to="/onboarding?category=programming"
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
