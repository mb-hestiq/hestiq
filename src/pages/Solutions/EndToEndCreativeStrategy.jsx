import { Link } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
	FaPaintbrush,
	FaCode,
	FaLayerGroup,
	FaWandMagicSparkles,
	FaPalette,
	FaRocket,
	FaBolt,
	FaUsersGear,
	FaChartLine,
	FaLightbulb,
	FaCompassDrafting,
	FaGears,
	FaArrowRight,
	FaLinkSlash,
	FaComments,
	FaObjectUngroup,
	FaServer,
} from "react-icons/fa6";
import "./EndToEndCreativeStrategy.css";

const STEPS = [
	{
		number: "01",
		icon: FaLightbulb,
		title: "Discovery & Ideation",
		description:
			"Deep-dive into your business goals, target audience, and competitive landscape to define a clear strategic direction.",
	},
	{
		number: "02",
		icon: FaCompassDrafting,
		title: "Design & Prototype",
		description:
			"Create high-fidelity visual concepts and interactive prototypes that validate ideas before a single line of code is written.",
	},
	{
		number: "03",
		icon: FaGears,
		title: "Development & Implementation",
		description:
			"Build scalable, performant solutions that translate design intent into fully functional, maintainable products.",
	},
	{
		number: "04",
		icon: FaRocket,
		title: "Launch & Optimize",
		description:
			"Deliver with precision and continuously improve through data-driven iteration post-launch.",
	},
];

const SERVICES = [
	{
		icon: FaPaintbrush,
		title: "UX/UI Design",
		description:
			"Human-centred interfaces crafted for clarity, usability, and a seamless user journey across every touchpoint.",
	},
	{
		icon: FaPalette,
		title: "Branding & Visual Identity",
		description:
			"Cohesive brand systems — logo, colour, typography, and tone — that communicate who you are with consistency.",
	},
	{
		icon: FaCode,
		title: "Front-end & Back-end Development",
		description:
			"Full-stack implementation built to the design spec, performant from the first render to the last API call.",
	},
	{
		icon: FaWandMagicSparkles,
		title: "Interactive Prototypes",
		description:
			"Clickable, high-fidelity prototypes that communicate interaction design before committing to full development.",
	},
	{
		icon: FaLayerGroup,
		title: "Design Systems & Component Libraries",
		description:
			"Scalable design languages and reusable component libraries that keep your product consistent and fast to build.",
	},
	{
		icon: FaChartLine,
		title: "Post-launch Optimization",
		description:
			"Ongoing performance monitoring, A/B testing, and iterative improvements tied directly to business outcomes.",
	},
];

const BENEFITS = [
	{
		icon: FaObjectUngroup,
		title: "Cohesive, End-to-End Delivery",
		description:
			"One team owns design and development. No handoff gaps, no misaligned expectations, no finger-pointing.",
	},
	{
		icon: FaBolt,
		title: "Faster Time-to-Market",
		description:
			"Parallel design and engineering workflows cut cycle time without sacrificing quality or attention to detail.",
	},
	{
		icon: FaUsersGear,
		title: "Aligned Design & Development Teams",
		description:
			"Shared context means decisions get made once and implemented right, not revisited mid-build.",
	},
	{
		icon: FaChartLine,
		title: "Measurable Impact",
		description:
			"Every creative decision is anchored to defined outcomes, tracked from launch through optimisation.",
	},
];

const PAIN_POINTS = [
	{
		icon: FaLinkSlash,
		label: "Disjointed Handoffs",
		description: "Design specs lost in translation",
	},
	{
		icon: FaComments,
		label: "Misaligned Goals",
		description: "Teams pulling in different directions",
	},
	{
		icon: FaObjectUngroup,
		label: "Inconsistent Brand Experience",
		description: "Fragmented look and feel across surfaces",
	},
	{
		icon: FaServer,
		label: "Inefficient Processes",
		description: "Rework that eats time and budget",
	},
];

export default function EndToEndCreativeStrategy() {
	return (
		<>
			<Header />
			<main className="ETECSPage">
				<section className="ETECSHero" aria-labelledby="etecs-hero-title">
					<div className="ETECSHeroPattern" aria-hidden="true" />
					<div className="ETECSHeroContent">
						<p className="ETECSHeroEyebrow">End-to-End Creative Strategy</p>
						<h1 id="etecs-hero-title" className="ETECSHeroTitle">
							From Concept to Launch: Unified Creative Strategy
						</h1>
						<p className="ETECSHeroSubtitle">
							Integrating design and development for cohesive, impactful
							projects
						</p>
						<Link to="/onboarding" className="CTA ETECSHeroCTA">
							See Our Approach
						</Link>
					</div>
				</section>

				<section
					className="ETECSSection ETECSProblem"
					aria-labelledby="etecs-problem-title"
				>
					<div className="ETECSShell">
						<div className="ETECSProblemGrid">
							<div className="ETECSProblemContent">
								<p className="ETECSSectionEyebrow">The Challenge</p>
								<h2 id="etecs-problem-title" className="ETECSSectionTitle">
									When design and development don't speak the same language
								</h2>
								<p className="ETECSSectionDescription">
									Most projects fail not because of a lack of talent, but
									because design and development operate in silos. Handoffs
									introduce gaps, goals diverge between teams, and the final
									product reflects compromises rather than a coherent vision.
									The result is an inconsistent brand experience and costly
									rework that could have been avoided from the start.
								</p>
							</div>
							<div
								className="ETECSPainPoints"
								aria-label="Common creative strategy pain points"
							>
								{PAIN_POINTS.map(({ icon: Icon, label, description }) => (
									<div className="ETECSPainPoint" key={label}>
										<div className="ETECSPainPointIcon" aria-hidden="true">
											<Icon />
										</div>
										<div className="ETECSPainPointText">
											<span className="ETECSPainPointLabel">{label}</span>
											<span className="ETECSPainPointDesc">{description}</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<section
					className="ETECSSection ETECSApproach ETECSSectionAlt"
					aria-labelledby="etecs-approach-title"
				>
					<div className="ETECSShell">
						<div className="ETECSSectionHeader ETECSSectionHeaderCentered">
							<p className="ETECSSectionEyebrow">Our Methodology</p>
							<h2 id="etecs-approach-title" className="ETECSSectionTitle">
								The HestiQ creative process
							</h2>
							<p className="ETECSSectionDescription">
								A unified workflow where strategy, design, and engineering move
								together — not in sequence, but in collaboration.
							</p>
						</div>
						<ol
							className="ETECSStepsGrid"
							aria-label="Creative strategy methodology steps"
						>
							{STEPS.map(({ number, icon: Icon, title, description }) => (
								<li className="ETECSStep" key={number}>
									<div className="ETECSStepHead">
										<span className="ETECSStepNumber" aria-hidden="true">
											{number}
										</span>
										<div className="ETECSStepIconWrapper" aria-hidden="true">
											<Icon />
										</div>
									</div>
									<div className="ETECSStepBody">
										<h3 className="ETECSStepTitle">{title}</h3>
										<p className="ETECSStepDescription">{description}</p>
									</div>
								</li>
							))}
						</ol>
					</div>
				</section>

				<section
					className="ETECSSection ETECSServices"
					aria-labelledby="etecs-services-title"
				>
					<div className="ETECSShell">
						<div className="ETECSSectionHeader ETECSSectionHeaderCentered">
							<p className="ETECSSectionEyebrow">What We Deliver</p>
							<h2 id="etecs-services-title" className="ETECSSectionTitle">
								Key capabilities
							</h2>
						</div>
						<ul
							className="ETECSServicesGrid"
							aria-label="Key services and capabilities"
						>
							{SERVICES.map(({ icon: Icon, title, description }) => (
								<li className="ETECSServiceCard" key={title}>
									<div className="ETECSServiceIconWrapper" aria-hidden="true">
										<Icon />
									</div>
									<h3 className="ETECSServiceTitle">{title}</h3>
									<p className="ETECSServiceDescription">{description}</p>
								</li>
							))}
						</ul>
					</div>
				</section>

				<section
					className="ETECSSection ETECSBenefits ETECSSectionAlt"
					aria-labelledby="etecs-benefits-title"
				>
					<div className="ETECSShell">
						<div className="ETECSSectionHeader ETECSSectionHeaderCentered">
							<p className="ETECSSectionEyebrow">Why HestiQ</p>
							<h2 id="etecs-benefits-title" className="ETECSSectionTitle">
								What you gain
							</h2>
							<p className="ETECSSectionDescription">
								When strategy, design, and engineering share the same table, the
								product built is the product that was envisioned.
							</p>
						</div>
						<ul
							className="ETECSBenefitsGrid"
							aria-label="Benefits of working with HestiQ"
						>
							{BENEFITS.map(({ icon: Icon, title, description }) => (
								<li className="ETECSBenefit" key={title}>
									<div className="ETECSBenefitIconWrapper" aria-hidden="true">
										<Icon />
									</div>
									<div className="ETECSBenefitContent">
										<h3 className="ETECSBenefitTitle">{title}</h3>
										<p className="ETECSBenefitDescription">{description}</p>
									</div>
								</li>
							))}
						</ul>
						<div className="ETECSBenefitsCTA">
							<Link to="/onboarding" className="CTA ETECSBenefitsCTABtn">
								Get Started <FaArrowRight aria-hidden="true" />
							</Link>
						</div>
					</div>
				</section>

				<section className="ETECSCTASection" aria-labelledby="etecs-cta-title">
					<div className="ETECSShell ETECSCTAContent">
						<h2 id="etecs-cta-title" className="ETECSCTATitle">
							Ready to Elevate Your Projects?
						</h2>
						<p className="ETECSCTASubtitle">
							Partner with HestiQ to bring strategy, design, and engineering
							under one roof and deliver products that actually land.
						</p>
						<Link
							to="/contact"
							state={{ scrollToTop: true }}
							className="CTA ETECSCTAButton"
						>
							Talk to Our Experts
						</Link>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
