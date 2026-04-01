import { Link } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FullHeroSection from "../../components/sections/hero/FullHeroSection";
import PrimaryButton from "../../components/elements/buttons/PrimaryButton";
import PrimaryCtaLink from "../../components/elements/links/PrimaryCtaLink";
import Card from "../../components/elements/cards/base/Card";
import solutions from "../../../shared/solutions.js";
import BrightIdeas from "../../assets/images/illustrations/bright-ideas.svg?react";
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
			<main className="sol-page">
				<FullHeroSection
					id="sol-hero-title"
					className="sol-hero"
					eyebrow="Solutions"
					title="Solutions That Drive Business Growth"
					subtitle="Helping businesses modernize, scale, and innovate through tailored strategies"
					actions={
						<PrimaryButton
							to="#solutions"
							className="sol-hero-cta"
							state={{ scrollTo: "solutions" }}
						>
							Explore Our Solutions
						</PrimaryButton>
					}
					media={<BrightIdeas className="sol-hero-svg" aria-hidden="true" />}
				/>

				<section
					className="sol-section sol-intro"
					aria-labelledby="sol-intro-title"
				>
					<div className="sol-shell">
						<div className="sol-intro-grid">
							<div className="sol-intro-content">
								<p className="sol-section-eyebrow">Our Philosophy</p>
								<h2 id="sol-intro-title" className="sol-section-title">
									Strategy, design, and technology — unified
								</h2>
								<p className="sol-section-description">
									At HestiQ, every solution begins with a clear understanding of
									your business goals. We combine strategic thinking, purposeful
									design, and robust engineering to deliver outcomes that are
									measurable, scalable, and built to last. No siloed teams. No
									disconnect between vision and execution.
								</p>
							</div>
							<div className="sol-focus-areas" aria-label="Key focus areas">
								{FOCUS_AREAS.map(({ icon: Icon, label }) => (
									<div className="sol-focus-area" key={label}>
										<div className="sol-focus-area-icon" aria-hidden="true">
											<Icon />
										</div>
										<span className="sol-focus-area-label">{label}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<section
					id="solutions"
					className="sol-section sol-solutions sol-section-alt"
					aria-labelledby="sol-solutions-title"
				>
					<div className="sol-shell">
						<div className="sol-section-header sol-section-header-centered">
							<p className="sol-section-eyebrow">What We Do</p>
							<h2 id="sol-solutions-title" className="sol-section-title">
								Featured Solutions
							</h2>
							<p className="sol-section-description">
								Three interconnected offerings designed to address the full
								spectrum of business growth challenges.
							</p>
						</div>
						<ul className="sol-cards-grid" aria-label="Featured solutions">
							{solutions.map((solution, idx) => {
								const Icon = SOLUTION_ICONS[idx];
								return (
									<Card
										as="li"
										className="sol-card card-surface-muted"
										key={solution.href}
									>
										<div className="sol-card-icon-wrapper" aria-hidden="true">
											<Icon />
										</div>
										<div className="sol-card-body">
											<h3 className="sol-card-title">{solution.name}</h3>
											<p className="sol-card-description">
												{solution.description}
											</p>
										</div>
										<PrimaryCtaLink
											to={solution.href}
											state={{ scrollToTop: true }}
											className="sol-card-cta"
											aria-label={`Learn more about ${solution.name}`}
										>
											Learn More
											<FaArrowRight
												aria-hidden="true"
												className="sol-card-cta-icon"
											/>
										</PrimaryCtaLink>
									</Card>
								);
							})}
						</ul>
					</div>
				</section>

				<section
					className="sol-section sol-approach"
					aria-labelledby="sol-approach-title"
				>
					<div className="sol-shell">
						<div className="sol-section-header sol-section-header-centered">
							<p className="sol-section-eyebrow">How We Work</p>
							<h2 id="sol-approach-title" className="sol-section-title">
								Our Approach Across Every Solution
							</h2>
						</div>
						<ol
							className="sol-approach-track"
							aria-label="Approach methodology"
						>
							{APPROACH_STEPS.map(({ icon: Icon, label }, idx) => (
								<li className="sol-approach-step" key={label}>
									<div className="sol-approach-step-inner">
										<div
											className="sol-approach-icon-wrapper"
											aria-hidden="true"
										>
											<Icon />
										</div>
										<span className="sol-approach-label">{label}</span>
									</div>
									{idx < APPROACH_STEPS.length - 1 && (
										<div
											className="sol-approach-connector"
											aria-hidden="true"
										/>
									)}
								</li>
							))}
						</ol>
					</div>
				</section>

				<section
					className="sol-section sol-benefits sol-section-alt"
					aria-labelledby="sol-benefits-title"
				>
					<div className="sol-shell">
						<div className="sol-section-header sol-section-header-centered">
							<p className="sol-section-eyebrow">Why HestiQ</p>
							<h2 id="sol-benefits-title" className="sol-section-title">
								What Sets Us Apart
							</h2>
						</div>
						<ul
							className="sol-benefits-grid"
							aria-label="Benefits of working with HestiQ"
						>
							{BENEFITS.map(({ icon: Icon, title, description }) => (
								<li className="sol-benefit" key={title}>
									<div className="sol-benefit-icon-wrapper" aria-hidden="true">
										<Icon />
									</div>
									<div className="sol-benefit-content">
										<h3 className="sol-benefit-title">{title}</h3>
										<p className="sol-benefit-description">{description}</p>
									</div>
								</li>
							))}
						</ul>
					</div>
				</section>

				<section className="sol-cta-section" aria-labelledby="sol-cta-title">
					<div className="sol-shell sol-cta-content">
						<h2 id="sol-cta-title" className="sol-cta-title">
							Discover the Right Solution for Your Business
						</h2>
						<p className="sol-cta-subtitle">
							Tell us where you are and where you want to go. We'll map the
							right path forward.
						</p>
						<PrimaryButton
							to="/contact"
							state={{ scrollToTop: true }}
							className="sol-cta-button"
						>
							Talk to Our Experts
						</PrimaryButton>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
