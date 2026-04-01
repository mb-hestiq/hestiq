import { Link } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FullHeroSection from "../../components/sections/hero/FullHeroSection";
import PrimaryButton from "../../components/elements/buttons/PrimaryButton";
import SecondaryButton from "../../components/elements/buttons/SecondaryButton";
import Card from "../../components/elements/cards/base/Card";
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
import "../../styles/services.css";

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
			<main className="svc-page">
				<FullHeroSection
					id="etecs-hero-title"
					className="etecs-hero"
					eyebrow="End-to-End Creative Strategy"
					title="From Concept to Launch: Unified Creative Strategy"
					subtitle="Design thinking and technical excellence working together from day one. Strategy, design, and engineering aligned around shared outcomes to deliver products that actually land."
					actions={
						<>
							<PrimaryButton to="#services" state={{ scrollTo: "services" }}>
								Explore Services <FaArrowRight aria-hidden="true" />
							</PrimaryButton>
							<SecondaryButton
								to="/onboarding?category=programming"
								state={{ scrollToTop: true }}
								className="etecs-hero-cta-outline"
							>
								Start a Project
							</SecondaryButton>
						</>
					}
				/>

				<section
					className="svc-section svc-section-alt"
					aria-labelledby="etecs-approach-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header">
							<p className="svc-eyebrow">The HestiQ Creative Process</p>
							<h2 id="etecs-approach-title" className="svc-section-title">
								A unified workflow where strategy, design, and engineering move
								together
							</h2>
							<p className="svc-section-description">
								Not in sequence. Not in silos. In collaboration from strategy
								through to launch.
							</p>
						</div>
						<ol
							className="dev-process-grid"
							aria-label="Creative strategy methodology"
						>
							{STEPS.map(({ number, icon: Icon, title, description }) => (
								<li key={number} className="dev-process-card">
									<div
										className="dev-process-num"
										aria-hidden="true"
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<Icon style={{ fontSize: "1.5em" }} />
									</div>
									<h3 className="dev-process-card-title">{title}</h3>
									<p className="dev-process-card-description">{description}</p>
								</li>
							))}
						</ol>
					</div>
				</section>

				<section
					id="services"
					className="svc-section"
					aria-labelledby="etecs-services-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header svc-section-header-centered">
							<p className="svc-eyebrow">Key Capabilities</p>
							<h2 id="etecs-services-title" className="svc-section-title">
								End-to-end creative services
							</h2>
							<p className="svc-section-description">
								Integrated strategy, design, and engineering to create cohesive
								digital products.
							</p>
						</div>
						<ul className="svc-features-grid" aria-label="Creative services">
							{SERVICES.map(({ icon: Icon, title, description }) => (
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
					className="svc-section svc-section-alt"
					aria-labelledby="etecs-benefits-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header svc-section-header-centered">
							<p className="svc-eyebrow">What You Gain</p>
							<h2 id="etecs-benefits-title" className="svc-section-title">
								Products that land
							</h2>
							<p className="svc-section-description">
								When strategy, design, and engineering share the same table, the
								product built is the product that was envisioned.
							</p>
						</div>
						<ul
							className="svc-features-grid"
							aria-label="Benefits of end-to-end strategy"
						>
							{BENEFITS.map(({ icon: Icon, title, description }) => (
								<Card
									as="li"
									key={title}
									className="svc-feature-card card-surface-light"
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

				<section className="svc-cta-section" aria-labelledby="etecs-cta-title">
					<div className="svc-cta-pattern" aria-hidden="true" />
					<div className="svc-shell svc-cta-content">
						<h2 id="etecs-cta-title" className="svc-cta-title">
							Ready to Elevate Your Projects?
						</h2>
						<p className="svc-cta-subtitle">
							Partner with HestiQ to bring strategy, design, and engineering
							under one roof and deliver products that actually land.
						</p>
						<PrimaryButton
							to="/contact"
							state={{ scrollToTop: true }}
							className="svc-cta-button solution-cta-button"
						>
							Talk to Our Experts <FaArrowRight aria-hidden="true" />
						</PrimaryButton>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
