import { Link } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
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
import "./DigitalTransformation.css";

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

const CASES = [
	{
		company: "RetailCo",
		industry: "Retail",
		outcome:
			"Reduced order processing time through end-to-end workflow automation and real-time inventory sync.",
		metrics: [
			{ label: "Efficiency Gain", value: "+68%" },
			{ label: "Cost Reduction", value: "42%" },
		],
	},
	{
		company: "FinServe Group",
		industry: "Financial Services",
		outcome:
			"Migrated four legacy platforms to a unified cloud infrastructure in under six months with zero data loss.",
		metrics: [
			{ label: "Systems Consolidated", value: "4 → 1" },
			{ label: "Downtime Reduction", value: "91%" },
		],
	},
	{
		company: "MediTrack",
		industry: "Healthcare",
		outcome:
			"Deployed an AI-driven patient data platform, cutting reporting overhead and improving data accuracy.",
		metrics: [
			{ label: "Reporting Time", value: "−55%" },
			{ label: "Data Accuracy", value: "99.7%" },
		],
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
		<>
			<Header />
			<main className="DTPage">
				<section className="DTHero" aria-labelledby="dt-hero-title">
					<div className="DTHeroPattern" aria-hidden="true" />
					<div className="DTHeroContent">
						<p className="DTHeroEyebrow">Digital Transformation</p>
						<h1 id="dt-hero-title" className="DTHeroTitle">
							Transform Your Business for the Digital Age
						</h1>
						<p className="DTHeroSubtitle">
							Helping businesses modernize processes and go digital
						</p>
						<Link to="/onboarding" className="CTA DTHeroCTA">
							Explore Solutions
						</Link>
					</div>
				</section>

				<section
					className="DTSection DTProblem"
					aria-labelledby="dt-problem-title"
				>
					<div className="DTShell">
						<div className="DTProblemGrid">
							<div className="DTProblemContent">
								<p className="DTSectionEyebrow">The Challenge</p>
								<h2 id="dt-problem-title" className="DTSectionTitle">
									The cost of staying analog
								</h2>
								<p className="DTSectionDescription">
									Businesses today face mounting pressure from every direction.
									Legacy systems slow decision-making, disconnected processes
									create inefficiency, and customers expect seamless digital
									experiences that older infrastructure simply cannot deliver.
									Without a clear transformation roadmap, organisations fall
									further behind with every passing quarter.
								</p>
							</div>
							<div
								className="DTPainPoints"
								aria-label="Common digital transformation pain points"
							>
								{PAIN_POINTS.map(({ icon: Icon, label }) => (
									<div className="DTPainPoint" key={label}>
										<div className="DTPainPointIcon" aria-hidden="true">
											<Icon />
										</div>
										<span className="DTPainPointLabel">{label}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<section
					className="DTSection DTApproach DTSectionAlt"
					aria-labelledby="dt-approach-title"
				>
					<div className="DTShell">
						<div className="DTSectionHeader DTSectionHeaderCentered">
							<p className="DTSectionEyebrow">Our Methodology</p>
							<h2 id="dt-approach-title" className="DTSectionTitle">
								The HestiQ approach
							</h2>
							<p className="DTSectionDescription">
								A structured, iterative framework that turns transformation from
								an abstract goal into a concrete, measurable outcome.
							</p>
						</div>
						<ol
							className="DTStepsGrid"
							aria-label="Transformation methodology steps"
						>
							{STEPS.map(({ number, icon: Icon, title, description }) => (
								<li className="DTStep" key={number}>
									<div className="DTStepHead">
										<span className="DTStepNumber" aria-hidden="true">
											{number}
										</span>
										<div className="DTStepIconWrapper" aria-hidden="true">
											<Icon />
										</div>
									</div>
									<div className="DTStepBody">
										<h3 className="DTStepTitle">{title}</h3>
										<p className="DTStepDescription">{description}</p>
									</div>
								</li>
							))}
						</ol>
					</div>
				</section>

				<section
					className="DTSection DTServices"
					aria-labelledby="dt-services-title"
				>
					<div className="DTShell">
						<div className="DTSectionHeader DTSectionHeaderCentered">
							<p className="DTSectionEyebrow">What We Deliver</p>
							<h2 id="dt-services-title" className="DTSectionTitle">
								Key capabilities
							</h2>
						</div>
						<ul
							className="DTServicesGrid"
							aria-label="Key services and capabilities"
						>
							{SERVICES.map(({ icon: Icon, title, description }) => (
								<li className="DTServiceCard" key={title}>
									<div className="DTServiceIconWrapper" aria-hidden="true">
										<Icon />
									</div>
									<h3 className="DTServiceTitle">{title}</h3>
									<p className="DTServiceDescription">{description}</p>
								</li>
							))}
						</ul>
					</div>
				</section>

				{/* <section
					className="DTSection DTCaseStudies DTSectionAlt"
					aria-labelledby="dt-cases-title"
				>
					<div className="DTShell">
						<div className="DTSectionHeader DTSectionHeaderCentered">
							<p className="DTSectionEyebrow">Proven Results</p>
							<h2 id="dt-cases-title" className="DTSectionTitle">
								Success stories
							</h2>
						</div>
					</div>
					<div
						className="DTCasesScrollWrapper"
						role="region"
						aria-label="Case studies horizontal scroll"
					>
						<ul className="DTCasesScroll">
							{CASES.map(({ company, industry, outcome, metrics }) => (
								<li className="DTCaseCard" key={company}>
									<div className="DTCaseCardHeader">
										<span className="DTCaseIndustry">{industry}</span>
										<span className="DTCaseCompany">{company}</span>
									</div>
									<p className="DTCaseOutcome">{outcome}</p>
									<div className="DTCaseMetrics">
										{metrics.map(({ label, value }) => (
											<div className="DTCaseMetric" key={label}>
												<span className="DTCaseMetricValue">{value}</span>
												<span className="DTCaseMetricLabel">{label}</span>
											</div>
										))}
									</div>
								</li>
							))}
						</ul>
					</div>
				</section> */}

				<section
					className="DTSection DTBenefits"
					aria-labelledby="dt-benefits-title"
				>
					<div className="DTShell">
						<div className="DTBenefitsGrid">
							<div className="DTBenefitsIntro">
								<p className="DTSectionEyebrow">Why HestiQ</p>
								<h2 id="dt-benefits-title" className="DTSectionTitle">
									What you gain
								</h2>
								<p className="DTSectionDescription">
									Transformation is not just about technology. It is about
									building the operational foundation that lets your business
									adapt, compete, and grow at pace.
								</p>
								<Link to="/onboarding" className="CTA DTBenefitsCTA">
									Get Started <FaArrowRight aria-hidden="true" />
								</Link>
							</div>
							<ul
								className="DTBenefitsList"
								aria-label="Benefits of working with HestiQ"
							>
								{BENEFITS.map(({ icon: Icon, title, description }) => (
									<li className="DTBenefit" key={title}>
										<div className="DTBenefitIconWrapper" aria-hidden="true">
											<Icon />
										</div>
										<div className="DTBenefitContent">
											<h3 className="DTBenefitTitle">{title}</h3>
											<p className="DTBenefitDescription">{description}</p>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</section>

				<section className="DTCTASection" aria-labelledby="dt-cta-title">
					<div className="DTShell DTCTAContent">
						<h2 id="dt-cta-title" className="DTCTATitle">
							Ready to Start Your Digital Transformation?
						</h2>
						<p className="DTCTASubtitle">
							Partner with HestiQ to modernise your operations, unlock new
							efficiencies, and build for the future.
						</p>
						<Link
							to="/contact"
							state={{ scrollToTop: true }}
							className="CTA DTCTAButton"
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
