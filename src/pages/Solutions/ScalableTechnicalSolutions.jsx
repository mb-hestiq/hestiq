import { Link } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FullHeroSection from "../../components/sections/hero/FullHeroSection";
import PrimaryButton from "../../components/elements/buttons/PrimaryButton";
import SecondaryButton from "../../components/elements/buttons/SecondaryButton";
import Card from "../../components/elements/cards/base/Card";
import {
	FaCloud,
	FaCode,
	FaGears,
	FaShieldHalved,
	FaGitAlt,
	FaNetworkWired,
	FaBolt,
	FaUserGear,
	FaCoins,
	FaCubesStacked,
	FaMagnifyingGlassChart,
	FaCompassDrafting,
	FaRocket,
	FaArrowRight,
	FaChartBar,
	FaTriangleExclamation,
	FaLayerGroup,
	FaCircleExclamation,
} from "react-icons/fa6";
import "../../styles/services.css";

const STEPS = [
	{
		number: "01",
		icon: FaMagnifyingGlassChart,
		title: "Analyze & Plan",
		description:
			"Assess current systems architecture, identify scaling bottlenecks, and define a clear technical growth roadmap.",
	},
	{
		number: "02",
		icon: FaCompassDrafting,
		title: "Architect Solutions",
		description:
			"Design scalable, maintainable infrastructure tailored to your load demands, team size, and long-term goals.",
	},
	{
		number: "03",
		icon: FaRocket,
		title: "Implement & Optimize",
		description:
			"Deploy robust systems with precision and continuously optimize for performance, cost, and reliability.",
	},
];

const SERVICES = [
	{
		icon: FaCloud,
		title: "Cloud Architecture & Deployment",
		description:
			"Design and deploy cloud-native infrastructure that scales horizontally and stays resilient under load.",
	},
	{
		icon: FaNetworkWired,
		title: "API & Microservices Development",
		description:
			"Build decoupled, well-documented APIs and microservice architectures that accelerate iteration.",
	},
	{
		icon: FaCode,
		title: "Enterprise Software Engineering",
		description:
			"Develop high-quality, maintainable software systems engineered for long-term reliability and growth.",
	},
	{
		icon: FaBolt,
		title: "Performance Optimization & Monitoring",
		description:
			"Profile, benchmark, and continuously monitor your systems to eliminate bottlenecks at every layer.",
	},
	{
		icon: FaGitAlt,
		title: "DevOps & CI/CD Implementation",
		description:
			"Automate delivery pipelines and infrastructure provisioning to ship faster with full confidence.",
	},
	{
		icon: FaShieldHalved,
		title: "Security & Compliance Solutions",
		description:
			"Embed security at the architectural level and ensure your systems meet regulatory requirements.",
	},
];

const BENEFITS = [
	{
		icon: FaCubesStacked,
		title: "Future-Proof, Scalable Architecture",
		description:
			"Systems designed to handle 10× growth without requiring a full rebuild or painful migrations.",
	},
	{
		icon: FaBolt,
		title: "High Performance & Reliability",
		description:
			"Engineered for low latency, high throughput, and uptime SLAs that keep your users and business moving.",
	},
	{
		icon: FaUserGear,
		title: "Expert Technical Guidance",
		description:
			"A team with deep cross-stack expertise advising on decisions that matter for your infrastructure.",
	},
	{
		icon: FaCoins,
		title: "Cost-Efficient Growth Solutions",
		description:
			"Right-size infrastructure from day one and avoid the expensive over-engineering trap as you scale.",
	},
];

const PAIN_POINTS = [
	{
		icon: FaChartBar,
		label: "Performance Bottlenecks",
		description: "Systems slow under load",
	},
	{
		icon: FaTriangleExclamation,
		label: "Reliability Issues",
		description: "Unplanned downtime and instability",
	},
	{
		icon: FaLayerGroup,
		label: "Technical Complexity",
		description: "Monoliths that resist change",
	},
	{
		icon: FaCircleExclamation,
		label: "Infrastructure Costs",
		description: "Spend that outpaces growth",
	},
];

export default function ScalableTechnicalSolutions() {
	return (
		<>
			<Header />
			<main className="svc-page">
				<FullHeroSection
					id="sts-hero-title"
					className="sts-hero"
					eyebrow="Scalable Technical Solutions"
					title="Robust Solutions for Growing Businesses"
					subtitle="Build infrastructure and systems designed to scale with your business. From cloud architecture to microservices and DevOps, we deliver technical excellence for organizations ready to grow."
					actions={
						<>
							<PrimaryButton to="#services" state={{ scrollTo: "services" }}>
								Explore Services <FaArrowRight aria-hidden="true" />
							</PrimaryButton>
							<SecondaryButton
								to="/onboarding?category=programming"
								state={{ scrollToTop: true }}
								className="sts-hero-cta-outline"
							>
								Start a Project
							</SecondaryButton>
						</>
					}
				/>

				<section
					className="svc-section svc-section-alt"
					aria-labelledby="sts-approach-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header">
							<p className="svc-eyebrow">How We Build for Scale</p>
							<h2 id="sts-approach-title" className="svc-section-title">
								A deliberate, phased approach that delivers reliable
								infrastructure
							</h2>
							<p className="svc-section-description">
								Right-sized solutions without over-engineering for problems you
								haven't encountered yet.
							</p>
						</div>
						<ol className="dev-process-grid" aria-label="Technical methodology">
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
					aria-labelledby="sts-services-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header svc-section-header-centered">
							<p className="svc-eyebrow">Key Capabilities</p>
							<h2 id="sts-services-title" className="svc-section-title">
								Technical excellence services
							</h2>
							<p className="svc-section-description">
								Comprehensive solutions across cloud, infrastructure, security,
								and software engineering.
							</p>
						</div>
						<ul className="svc-features-grid" aria-label="Technical services">
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
					aria-labelledby="sts-benefits-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header svc-section-header-centered">
							<p className="svc-eyebrow">What You Gain</p>
							<h2 id="sts-benefits-title" className="svc-section-title">
								Technical excellence that compounds
							</h2>
							<p className="svc-section-description">
								Technical excellence is not just about the code shipped today.
								It is about building the foundation that keeps your team moving
								at speed for years ahead.
							</p>
						</div>
						<ul
							className="svc-features-grid"
							aria-label="Benefits of scalable solutions"
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

				<section className="svc-cta-section" aria-labelledby="sts-cta-title">
					<div className="svc-cta-pattern" aria-hidden="true" />
					<div className="svc-shell svc-cta-content">
						<h2 id="sts-cta-title" className="svc-cta-title">
							Ready to Scale Your Business?
						</h2>
						<p className="svc-cta-subtitle">
							Partner with HestiQ to build infrastructure that handles today's
							demands and tomorrow's growth without compromise.
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
