import { Link } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import solutions from "../../../shared/solutions.js";
import BrightIdeas from "../../assets/bright-ideas.svg?react";
import {
	FaWandMagicSparkles,
	FaCubesStacked,
	FaPaintbrush,
	FaMagnifyingGlassChart,
	FaCompassDrafting,
	FaGears,
	FaRocket,
	FaBolt,
	FaLayerGroup,
	FaChartLine,
	FaArrowRight,
} from "react-icons/fa6";
import "./Solutions.css";

const SOLUTION_ICONS = [FaWandMagicSparkles, FaCubesStacked, FaPaintbrush];

const FOCUS_AREAS = [
	{ icon: FaWandMagicSparkles, label: "Digital Transformation" },
	{ icon: FaCubesStacked, label: "Technical Scalability" },
	{ icon: FaPaintbrush, label: "Creative Strategy" },
];

const APPROACH_STEPS = [
	{ icon: FaMagnifyingGlassChart, label: "Assess" },
	{ icon: FaCompassDrafting, label: "Plan" },
	{ icon: FaGears, label: "Implement" },
	{ icon: FaRocket, label: "Optimize" },
];

const BENEFITS = [
	{
		icon: FaLayerGroup,
		title: "Integrated Strategy & Execution",
		description:
			"Strategy, design, and engineering work in lockstep — no agency handoffs, no lost context.",
	},
	{
		icon: FaCubesStacked,
		title: "Scalable & Future-Ready Solutions",
		description:
			"Systems and strategies architected to grow with your business, not against it.",
	},
	{
		icon: FaBolt,
		title: "Faster Time-to-Market",
		description:
			"Parallel workflows and clear scope at every phase cut delivery time without sacrificing quality.",
	},
	{
		icon: FaChartLine,
		title: "Measurable Results",
		description:
			"Every engagement is anchored to defined outcomes, tracked from kickoff through optimisation.",
	},
];

export default function Solutions() {
	return (
		<>
			<Header />
			<main className="SolPage">
				<section className="SolHero" aria-labelledby="sol-hero-title">
					<div className="SolHeroPattern" aria-hidden="true" />
					<div className="SolHeroContent">
						<div className="SolHeroLeft">
							<p className="SolHeroEyebrow">Solutions</p>
							<h1 id="sol-hero-title" className="SolHeroTitle">
								Solutions That Drive Business Growth
							</h1>
							<p className="SolHeroSubtitle">
								Helping businesses modernize, scale, and innovate through
								tailored strategies
							</p>
							<Link
								to="#solutions"
								state={{ scrollTo: "solutions" }}
								className="CTA SolHeroCTA"
							>
								Explore Our Solutions
							</Link>
						</div>
						<div className="SolHeroRight">
							<BrightIdeas className="SolHeroSvg" aria-hidden="true" />
						</div>
					</div>
				</section>

				<section
					className="SolSection SolIntro"
					aria-labelledby="sol-intro-title"
				>
					<div className="SolShell">
						<div className="SolIntroGrid">
							<div className="SolIntroContent">
								<p className="SolSectionEyebrow">Our Philosophy</p>
								<h2 id="sol-intro-title" className="SolSectionTitle">
									Strategy, design, and technology — unified
								</h2>
								<p className="SolSectionDescription">
									At HestiQ, every solution begins with a clear understanding of
									your business goals. We combine strategic thinking, purposeful
									design, and robust engineering to deliver outcomes that are
									measurable, scalable, and built to last. No siloed teams. No
									disconnect between vision and execution.
								</p>
							</div>
							<div className="SolFocusAreas" aria-label="Key focus areas">
								{FOCUS_AREAS.map(({ icon: Icon, label }) => (
									<div className="SolFocusArea" key={label}>
										<div className="SolFocusAreaIcon" aria-hidden="true">
											<Icon />
										</div>
										<span className="SolFocusAreaLabel">{label}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<section
					id="solutions"
					className="SolSection SolGrid SolSectionAlt"
					aria-labelledby="sol-grid-title"
				>
					<div className="SolShell">
						<div className="SolSectionHeader SolSectionHeaderCentered">
							<p className="SolSectionEyebrow">What We Do</p>
							<h2 id="sol-grid-title" className="SolSectionTitle">
								Featured solutions
							</h2>
							<p className="SolSectionDescription">
								Three interconnected offerings designed to address the full
								spectrum of business growth challenges.
							</p>
						</div>
						<ul className="SolCardsGrid" aria-label="Featured solutions">
							{solutions.map((solution, idx) => {
								const Icon = SOLUTION_ICONS[idx];
								return (
									<li className="SolCard" key={solution.href}>
										<div className="SolCardIconWrapper" aria-hidden="true">
											<Icon />
										</div>
										<div className="SolCardBody">
											<h3 className="SolCardTitle">{solution.name}</h3>
											<p className="SolCardDescription">
												{solution.description}
											</p>
										</div>
										<Link
											to={solution.href}
											state={{ scrollToTop: true }}
											className="SolCardCTA"
											aria-label={`Learn more about ${solution.name}`}
										>
											Learn More
											<FaArrowRight
												aria-hidden="true"
												className="SolCardCTAIcon"
											/>
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				</section>

				<section
					className="SolSection SolApproach"
					aria-labelledby="sol-approach-title"
				>
					<div className="SolShell">
						<div className="SolSectionHeader SolSectionHeaderCentered">
							<p className="SolSectionEyebrow">How We Work</p>
							<h2 id="sol-approach-title" className="SolSectionTitle">
								Our approach across every solution
							</h2>
						</div>
						<ol className="SolApproachTrack" aria-label="Approach methodology">
							{APPROACH_STEPS.map(({ icon: Icon, label }, idx) => (
								<li className="SolApproachStep" key={label}>
									<div className="SolApproachStepInner">
										<div className="SolApproachIconWrapper" aria-hidden="true">
											<Icon />
										</div>
										<span className="SolApproachLabel">{label}</span>
									</div>
									{idx < APPROACH_STEPS.length - 1 && (
										<div className="SolApproachConnector" aria-hidden="true" />
									)}
								</li>
							))}
						</ol>
					</div>
				</section>

				<section
					className="SolSection SolBenefits SolSectionAlt"
					aria-labelledby="sol-benefits-title"
				>
					<div className="SolShell">
						<div className="SolSectionHeader SolSectionHeaderCentered">
							<p className="SolSectionEyebrow">Why HestiQ</p>
							<h2 id="sol-benefits-title" className="SolSectionTitle">
								What sets us apart
							</h2>
						</div>
						<ul
							className="SolBenefitsGrid"
							aria-label="Benefits of working with HestiQ"
						>
							{BENEFITS.map(({ icon: Icon, title, description }) => (
								<li className="SolBenefit" key={title}>
									<div className="SolBenefitIconWrapper" aria-hidden="true">
										<Icon />
									</div>
									<div className="SolBenefitContent">
										<h3 className="SolBenefitTitle">{title}</h3>
										<p className="SolBenefitDescription">{description}</p>
									</div>
								</li>
							))}
						</ul>
					</div>
				</section>

				<section className="SolCTASection" aria-labelledby="sol-cta-title">
					<div className="SolShell SolCTAContent">
						<h2 id="sol-cta-title" className="SolCTATitle">
							Discover the Right Solution for Your Business
						</h2>
						<p className="SolCTASubtitle">
							Tell us where you are and where you want to go. We'll map the
							right path forward.
						</p>
						<Link
							to="/contact"
							state={{ scrollToTop: true }}
							className="CTA SolCTAButton"
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
