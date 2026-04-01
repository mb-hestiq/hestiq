import { Link } from "react-router";
import SolutionDetailPage from "../../components/sections/solutions/base/SolutionDetailPage";
import {
	FaGears,
	FaCloud,
	FaChartLine,
	FaCode,
	FaBrain,
	FaServer,
	FaBolt,
	FaUsers,
	FaLayerGroup,
	FaCompass,
	FaArrowRight,
	FaMagnifyingGlassChart,
	FaScrewdriverWrench,
	FaRocket,
} from "react-icons/fa6";

const STEPS = [
	{
		number: "01",
		icon: FaMagnifyingGlassChart,
		title: "Assess & Strategize",
		description:
			"Analyze current processes and identify opportunities for digital improvement, automation, and growth.",
	},
	{
		number: "02",
		icon: FaScrewdriverWrench,
		title: "Digital Solutions",
		description:
			"Implement modern tools, automation, and cloud solutions tailored to your business needs and objectives.",
	},
	{
		number: "03",
		icon: FaRocket,
		title: "Optimize & Scale",
		description:
			"Continuously improve workflows and adopt new technologies to keep your operations ahead of the curve.",
	},
];

const SERVICES = [
	{
		icon: FaGears,
		title: "Business Process Automation",
		description:
			"Eliminate manual workflows and reduce operational overhead with intelligent automation pipelines.",
	},
	{
		icon: FaCloud,
		title: "Cloud Integration & Management",
		description:
			"Migrate, integrate, and manage cloud infrastructure that scales reliably with your business.",
	},
	{
		icon: FaChartLine,
		title: "Data Analytics & Insights",
		description:
			"Turn raw data into actionable intelligence with modern analytics platforms and real-time dashboards.",
	},
	{
		icon: FaCode,
		title: "Custom Software & App Development",
		description:
			"Build purpose-built applications that solve your specific challenges and accelerate growth.",
	},
	{
		icon: FaBrain,
		title: "AI & Machine Learning Solutions",
		description:
			"Leverage AI models and ML pipelines to automate decisions and unlock predictive capabilities.",
	},
	{
		icon: FaServer,
		title: "Enterprise System Modernization",
		description:
			"Replace legacy systems with modern architectures that are maintainable, secure, and performant.",
	},
];

const BENEFITS = [
	{
		icon: FaBolt,
		title: "Faster & More Efficient Workflows",
		description:
			"Automate repetitive tasks, reduce bottlenecks, and free your team to focus on high-value work.",
	},
	{
		icon: FaUsers,
		title: "Improved Customer Experience",
		description:
			"Deliver seamless, responsive digital experiences that meet and exceed modern customer expectations.",
	},
	{
		icon: FaLayerGroup,
		title: "Scalable Digital Solutions",
		description:
			"Build on architectures designed to grow with your business, not against it.",
	},
	{
		icon: FaCompass,
		title: "Expert Guidance Every Step",
		description:
			"A dedicated team with deep technical expertise to guide you from strategy through to full deployment.",
	},
];

const PAIN_POINTS = [
	{ icon: FaServer, label: "Legacy Systems" },
	{ icon: FaGears, label: "Operational Inefficiency" },
	{ icon: FaUsers, label: "Rising Customer Expectations" },
	{ icon: FaChartLine, label: "Lack of Data Insights" },
];

export default function DigitalTransformation() {
	return (
		<SolutionDetailPage
			heroId="dt-hero-title"
			heroEyebrow="Digital Transformation"
			heroTitle="Transform Your Business for the Digital Age"
			heroSubtitle="Helping businesses modernize processes and go digital"
			heroAction={
				<Link to="/onboarding" className="cta solution-hero-cta">
					Explore Solutions
				</Link>
			}
			problemId="dt-problem-title"
			problemTitle="The cost of staying analog"
			problemDescription="Businesses today face mounting pressure from every direction. Legacy systems slow decision-making, disconnected processes create inefficiency, and customers expect seamless digital experiences that older infrastructure simply cannot deliver. Without a clear transformation roadmap, organisations fall further behind with every passing quarter."
			painPoints={PAIN_POINTS}
			painPointsAriaLabel="Common digital transformation pain points"
			painPointVariant="compact"
			methodologyId="dt-approach-title"
			methodologyTitle="The HestiQ approach"
			methodologyDescription="A structured, iterative framework that turns transformation from an abstract goal into a concrete, measurable outcome."
			steps={STEPS}
			stepsAriaLabel="Transformation methodology steps"
			servicesId="dt-services-title"
			servicesTitle="Key capabilities"
			servicesAriaLabel="Key services and capabilities"
			services={SERVICES}
			servicesCardClassName="card-surface-light"
			benefitsId="dt-benefits-title"
			benefitsTitle="What you gain"
			benefitsDescription="Transformation is not just about technology. It is about building the operational foundation that lets your business adapt, compete, and grow at pace."
			benefitsAriaLabel="Benefits of working with HestiQ"
			benefits={BENEFITS}
			benefitsVariant="split"
			benefitsAction={
				<Link to="/onboarding" className="cta solution-benefits-cta-button">
					Get Started <FaArrowRight aria-hidden="true" />
				</Link>
			}
			ctaId="dt-cta-title"
			ctaTitle="Ready to Start Your Digital Transformation?"
			ctaSubtitle="Take the first step towards modernizing your operations and unlocking growth opportunities through technology."
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
