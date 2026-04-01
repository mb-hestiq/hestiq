import { Link } from "react-router";
import SolutionDetailPage from "../../components/sections/solutions/base/SolutionDetailPage";
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
		<SolutionDetailPage
			heroId="etecs-hero-title"
			heroEyebrow="End-to-End Creative Strategy"
			heroTitle="From Concept to Launch: Unified Creative Strategy"
			heroSubtitle="Integrating design and development for cohesive, impactful projects"
			heroAction={
				<Link to="/onboarding" className="cta solution-hero-cta">
					See Our Approach
				</Link>
			}
			heroVariant="wide-title"
			problemId="etecs-problem-title"
			problemTitle="When design and development don't speak the same language"
			problemDescription="Most projects fail not because of a lack of talent, but because design and development operate in silos. Handoffs introduce gaps, goals diverge between teams, and the final product reflects compromises rather than a coherent vision. The result is an inconsistent brand experience and costly rework that could have been avoided from the start."
			painPoints={PAIN_POINTS}
			painPointsAriaLabel="Common creative strategy pain points"
			painPointVariant="detailed"
			methodologyId="etecs-approach-title"
			methodologyTitle="The HestiQ creative process"
			methodologyDescription="A unified workflow where strategy, design, and engineering move together, not in sequence, but in collaboration."
			steps={STEPS}
			stepsAriaLabel="Creative strategy methodology steps"
			servicesId="etecs-services-title"
			servicesTitle="Key capabilities"
			servicesAriaLabel="Key services and capabilities"
			services={SERVICES}
			servicesCardClassName="card-surface-muted"
			benefitsId="etecs-benefits-title"
			benefitsTitle="What you gain"
			benefitsDescription="When strategy, design, and engineering share the same table, the product built is the product that was envisioned."
			benefitsAriaLabel="Benefits of working with HestiQ"
			benefits={BENEFITS}
			benefitsVariant="stacked"
			benefitsAction={
				<Link to="/onboarding" className="cta solution-benefits-cta-button">
					Get Started <FaArrowRight aria-hidden="true" />
				</Link>
			}
			ctaId="etecs-cta-title"
			ctaTitle="Ready to Elevate Your Projects?"
			ctaSubtitle="Partner with HestiQ to bring strategy, design, and engineering under one roof and deliver products that actually land."
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
