import { Link } from "react-router";
import SolutionDetailPage from "../../components/sections/solutions/base/SolutionDetailPage";
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
		<SolutionDetailPage
			heroId="sts-hero-title"
			heroEyebrow="Scalable Technical Solutions"
			heroTitle="Robust Solutions for Growing Businesses"
			heroSubtitle="Building scalable technical solutions that evolve with your business"
			heroAction={
				<Link to="/onboarding" className="cta solution-hero-cta">
					Discover Our Approach
				</Link>
			}
			problemId="sts-problem-title"
			problemTitle="Growth exposes what was built to last a year"
			problemDescription="As businesses grow, the technical infrastructure that worked at launch becomes a liability. Performance degrades under load, reliability suffers during peak demand, and tightly coupled systems resist the changes your product needs most. Without a deliberate scaling strategy, technical debt compounds and every new feature costs more than the last."
			painPoints={PAIN_POINTS}
			painPointsAriaLabel="Common scaling pain points"
			painPointVariant="detailed"
			methodologyId="sts-approach-title"
			methodologyTitle="How we build for scale"
			methodologyDescription="A deliberate, phased approach that delivers reliable infrastructure without over-engineering for problems you haven't encountered yet."
			steps={STEPS}
			stepsAriaLabel="Technical methodology steps"
			servicesId="sts-services-title"
			servicesTitle="Key capabilities"
			servicesAriaLabel="Key services and capabilities"
			services={SERVICES}
			servicesCardClassName="card-surface-muted"
			benefitsId="sts-benefits-title"
			benefitsTitle="What you gain"
			benefitsDescription="Technical excellence is not just about the code shipped today. It is about building the foundation that keeps your team moving at speed for years ahead."
			benefitsAriaLabel="Benefits of working with HestiQ"
			benefits={BENEFITS}
			benefitsVariant="stacked"
			benefitsAction={
				<Link to="/onboarding" className="cta solution-benefits-cta-button">
					Get Started <FaArrowRight aria-hidden="true" />
				</Link>
			}
			ctaId="sts-cta-title"
			ctaTitle="Ready to Scale Your Business?"
			ctaSubtitle="Partner with HestiQ to build infrastructure that handles today's demands and tomorrow's growth without compromise."
			ctaAction={
				<Link
					to="/contact"
					state={{ scrollToTop: true }}
					className="cta solution-cta-button"
				>
					Talk to Our Experts
				</Link>
			}
		/>
	);
}
