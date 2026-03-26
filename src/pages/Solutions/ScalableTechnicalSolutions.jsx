import { Link } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
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
import "./ScalableTechnicalSolutions.css";

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
			<main className="STSPage">
				<section className="STSHero" aria-labelledby="sts-hero-title">
					<div className="STSHeroPattern" aria-hidden="true" />
					<div className="STSHeroContent">
						<p className="STSHeroEyebrow">Scalable Technical Solutions</p>
						<h1 id="sts-hero-title" className="STSHeroTitle">
							Robust Solutions for Growing Businesses
						</h1>
						<p className="STSHeroSubtitle">
							Building scalable technical solutions that evolve with your
							business
						</p>
						<Link to="/onboarding" className="CTA STSHeroCTA">
							Discover Our Approach
						</Link>
					</div>
				</section>

				<section
					className="STSSection STSProblem"
					aria-labelledby="sts-problem-title"
				>
					<div className="STSShell">
						<div className="STSProblemGrid">
							<div className="STSProblemContent">
								<p className="STSSectionEyebrow">The Challenge</p>
								<h2 id="sts-problem-title" className="STSSectionTitle">
									Growth exposes what was built to last a year
								</h2>
								<p className="STSSectionDescription">
									As businesses grow, the technical infrastructure that worked
									at launch becomes a liability. Performance degrades under
									load, reliability suffers during peak demand, and tightly
									coupled systems resist the changes your product needs most.
									Without a deliberate scaling strategy, technical debt
									compounds and every new feature costs more than the last.
								</p>
							</div>
							<div
								className="STSPainPoints"
								aria-label="Common scaling pain points"
							>
								{PAIN_POINTS.map(({ icon: Icon, label, description }) => (
									<div className="STSPainPoint" key={label}>
										<div className="STSPainPointIcon" aria-hidden="true">
											<Icon />
										</div>
										<div className="STSPainPointText">
											<span className="STSPainPointLabel">{label}</span>
											<span className="STSPainPointDesc">{description}</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<section
					className="STSSection STSApproach STSSectionAlt"
					aria-labelledby="sts-approach-title"
				>
					<div className="STSShell">
						<div className="STSSectionHeader STSSectionHeaderCentered">
							<p className="STSSectionEyebrow">Our Methodology</p>
							<h2 id="sts-approach-title" className="STSSectionTitle">
								How we build for scale
							</h2>
							<p className="STSSectionDescription">
								A deliberate, phased approach that delivers reliable
								infrastructure without over-engineering for problems you haven't
								encountered yet.
							</p>
						</div>
						<ol
							className="STSStepsGrid"
							aria-label="Technical methodology steps"
						>
							{STEPS.map(({ number, icon: Icon, title, description }) => (
								<li className="STSStep" key={number}>
									<div className="STSStepHead">
										<span className="STSStepNumber" aria-hidden="true">
											{number}
										</span>
										<div className="STSStepIconWrapper" aria-hidden="true">
											<Icon />
										</div>
									</div>
									<div className="STSStepBody">
										<h3 className="STSStepTitle">{title}</h3>
										<p className="STSStepDescription">{description}</p>
									</div>
								</li>
							))}
						</ol>
					</div>
				</section>

				<section
					className="STSSection STSServices"
					aria-labelledby="sts-services-title"
				>
					<div className="STSShell">
						<div className="STSSectionHeader STSSectionHeaderCentered">
							<p className="STSSectionEyebrow">What We Deliver</p>
							<h2 id="sts-services-title" className="STSSectionTitle">
								Key capabilities
							</h2>
						</div>
						<ul
							className="STSServicesGrid"
							aria-label="Key services and capabilities"
						>
							{SERVICES.map(({ icon: Icon, title, description }) => (
								<li className="STSServiceCard" key={title}>
									<div className="STSServiceIconWrapper" aria-hidden="true">
										<Icon />
									</div>
									<h3 className="STSServiceTitle">{title}</h3>
									<p className="STSServiceDescription">{description}</p>
								</li>
							))}
						</ul>
					</div>
				</section>

				<section
					className="STSSection STSBenefits STSSectionAlt"
					aria-labelledby="sts-benefits-title"
				>
					<div className="STSShell">
						<div className="STSSectionHeader STSSectionHeaderCentered">
							<p className="STSSectionEyebrow">Why HestiQ</p>
							<h2 id="sts-benefits-title" className="STSSectionTitle">
								What you gain
							</h2>
							<p className="STSSectionDescription">
								Technical excellence is not just about the code shipped today.
								It is about building the foundation that keeps your team moving
								at speed for years ahead.
							</p>
						</div>
						<ul
							className="STSBenefitsGrid"
							aria-label="Benefits of working with HestiQ"
						>
							{BENEFITS.map(({ icon: Icon, title, description }) => (
								<li className="STSBenefit" key={title}>
									<div className="STSBenefitIconWrapper" aria-hidden="true">
										<Icon />
									</div>
									<div className="STSBenefitContent">
										<h3 className="STSBenefitTitle">{title}</h3>
										<p className="STSBenefitDescription">{description}</p>
									</div>
								</li>
							))}
						</ul>
						<div className="STSBenefitsCTA">
							<Link to="/onboarding" className="CTA STSBenefitsCTABtn">
								Get Started <FaArrowRight aria-hidden="true" />
							</Link>
						</div>
					</div>
				</section>

				<section className="STSCTASection" aria-labelledby="sts-cta-title">
					<div className="STSShell STSCTAContent">
						<h2 id="sts-cta-title" className="STSCTATitle">
							Ready to Scale Your Business?
						</h2>
						<p className="STSCTASubtitle">
							Partner with HestiQ to build infrastructure that handles today's
							demands and tomorrow's growth without compromise.
						</p>
						<Link
							to="/contact"
							state={{ scrollToTop: true }}
							className="CTA STSCTAButton"
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
