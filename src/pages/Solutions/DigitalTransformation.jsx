import { Link } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FullHeroSection from "../../components/sections/hero/FullHeroSection";
import PrimaryButton from "../../components/elements/buttons/PrimaryButton";
import SecondaryButton from "../../components/elements/buttons/SecondaryButton";
import Card from "../../components/elements/cards/base/Card";
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
import "../../styles/services.css";

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
		<>
			<Header />
			<main className="svc-page">
				<FullHeroSection
					id="dt-hero-title"
					className="dt-hero"
					eyebrow="Digital Transformation"
					title="Transform Your Business for the Digital Age"
					subtitle="Helping businesses modernize processes and go digital without losing sight of what makes you competitive. From legacy modernization to intelligent automation, we chart a clear path forward."
					actions={
						<>
							<PrimaryButton to="#services" state={{ scrollTo: "services" }}>
								Explore Services <FaArrowRight aria-hidden="true" />
							</PrimaryButton>
							<SecondaryButton
								to="/onboarding?category=programming"
								state={{ scrollToTop: true }}
								className="dt-hero-cta-outline"
							>
								Start a Project
							</SecondaryButton>
						</>
					}
				/>

				<section
					className="svc-section svc-section-alt"
					aria-labelledby="dt-approach-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header">
							<p className="svc-eyebrow">The HestiQ Approach</p>
							<h2 id="dt-approach-title" className="svc-section-title">
								A structured, iterative framework that turns transformation from
								abstract goal into concrete outcome
							</h2>
							<p className="svc-section-description">
								Transformation takes planning, execution, and continuous
								refinement across people, process, and technology.
							</p>
						</div>
						<ol
							className="dev-process-grid"
							aria-label="Transformation methodology"
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
					aria-labelledby="dt-services-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header svc-section-header-centered">
							<p className="svc-eyebrow">Key Capabilities</p>
							<h2 id="dt-services-title" className="svc-section-title">
								Digital transformation services
							</h2>
							<p className="svc-section-description">
								Specialised services for every layer of your digital
								infrastructure and operations.
							</p>
						</div>
						<ul
							className="svc-features-grid"
							aria-label="Digital transformation services"
						>
							{SERVICES.map(({ icon: Icon, title, description }) => (
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

				<section
					className="svc-section svc-section-alt"
					aria-labelledby="dt-benefits-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header svc-section-header-centered">
							<p className="svc-eyebrow">What You Gain</p>
							<h2 id="dt-benefits-title" className="svc-section-title">
								The real value of transformation
							</h2>
							<p className="svc-section-description">
								Transformation is not just about technology. It is about
								building the operational foundation that lets your business
								adapt, compete, and grow at pace.
							</p>
						</div>
						<ul
							className="svc-features-grid"
							aria-label="Benefits of digital transformation"
						>
							{BENEFITS.map(({ icon: Icon, title, description }) => (
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

				<section className="svc-cta-section" aria-labelledby="dt-cta-title">
					<div className="svc-cta-pattern" aria-hidden="true" />
					<div className="svc-shell svc-cta-content">
						<h2 id="dt-cta-title" className="svc-cta-title">
							Ready to Start Your Digital Transformation?
						</h2>
						<p className="svc-cta-subtitle">
							Take the first step towards modernizing your operations and
							unlocking growth opportunities through technology.
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
