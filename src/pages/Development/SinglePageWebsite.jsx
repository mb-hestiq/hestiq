import { useMemo } from "react";
import { Link } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useServices } from "../../utils/servicesCache";
import examplePage from "../../assets/example/example-page.png";
import {
	FaCircleCheck,
	FaFileCode,
	FaMobileScreenButton,
	FaGauge,
	FaMagnifyingGlass,
	FaPenRuler,
	FaArrowDown,
	FaArrowRight,
	FaBolt,
	FaRocket,
	FaChartLine,
	FaHandshake,
} from "react-icons/fa6";
import "../../styles/services.css";

const FEATURES = [
	{
		icon: FaPenRuler,
		title: "Custom Section Design",
		description:
			"Each section, from hero to testimonials and CTA, is designed individually to guide the visitor's eye and drive action.",
	},
	{
		icon: FaMobileScreenButton,
		title: "Fully Responsive",
		description:
			"The layout adapts perfectly from widescreen desktop to the smallest mobile viewport without compromise.",
	},
	{
		icon: FaGauge,
		title: "Optimised Performance",
		description:
			"Minimal dependencies, optimised assets, and efficient rendering deliver near-instant load times.",
	},
	{
		icon: FaMagnifyingGlass,
		title: "SEO Foundations",
		description:
			"Semantic markup, meta configuration, and Open Graph setup included so the page is discoverable from day one.",
	},
	{
		icon: FaArrowDown,
		title: "Smooth Scroll Navigation",
		description:
			"Anchor-based navigation and scroll animations create a polished journey through the page.",
	},
	{
		icon: FaFileCode,
		title: "Contact & Form Integration",
		description:
			"Lead capture forms, contact sections, and third-party integrations configured and tested before delivery.",
	},
];

const USE_CASES = [
	{
		label: "Product Launch",
		title: "A focused page for a single launch",
		description:
			"New products and campaigns get a dedicated landing page designed to communicate value and capture leads without distraction.",
	},
	{
		label: "Freelancers & Creatives",
		title: "A professional online presence",
		description:
			"Consultants, designers, and creatives who need to present their work and contact information in a polished single destination.",
	},
	{
		label: "Event & Conference",
		title: "Everything about the event, one scroll away",
		description:
			"Event details, speakers, schedule, and registration forms presented in a single scrollable layout built for conversions.",
	},
	{
		label: "MVP Validation",
		title: "Testing a concept before building the product",
		description:
			"Startups validate demand with a landing page before investing in a full application. Fast to build, fast to iterate.",
	},
];

const BENEFITS = [
	{
		icon: FaRocket,
		title: "Launch in Days, Not Weeks",
		description:
			"A single-page site has a tightly scoped build. You get a production-ready result on a fast, predictable timeline.",
	},
	{
		icon: FaBolt,
		title: "Maximum Load Speed",
		description:
			"Without the overhead of multi-page routing and complex state management, single-page sites load faster and score higher on Core Web Vitals.",
	},
	{
		icon: FaChartLine,
		title: "Focused Conversion Path",
		description:
			"One page means one narrative. Visitors move through a deliberate story with every scroll, increasing the likelihood of action.",
	},
	{
		icon: FaHandshake,
		title: "Expert-Led Execution",
		description:
			"Strategy, design, and development delivered by a single team that understands conversion-focused web design.",
	},
];

const OVERVIEW_POINTS = [
	"Complete in a single scrollable page",
	"Optimised for conversion from structure to copy",
	"Responsive across every viewport",
	"Delivered faster than a multi-page site",
];

const ONBOARDING_URL =
	"/onboarding?category=programming&service=single-page-website";

export default function SinglePageWebsite() {
	const { services } = useServices();

	const relatedServices = useMemo(
		() =>
			services
				.filter(
					(s) =>
						s.category === "Development" && s.name !== "Single Page Website",
				)
				.slice(0, 4),
		[services],
	);

	return (
		<>
			<Header />
			<main className="SvcPage">
				<section
					id="overview"
					className="SvcSection"
					aria-labelledby="sp-overview-title"
				>
					<div className="SvcShell">
						<div className="SvcOverviewGrid">
							<div className="SvcOverviewContent">
								<p className="SvcEyebrow">The Problem We Solve</p>
								<h2 id="sp-overview-title" className="SvcSectionTitle">
									One page. One message. One action.
								</h2>
								<p className="SvcSectionDescription">
									Multi-page sites often scatter the visitor's attention across
									navigation menus, competing calls to action, and information
									that belongs elsewhere. For campaigns, products, and personal
									brands, that friction kills conversions.
								</p>
								<p className="SvcSectionDescription">
									We build single-page websites with a deliberate narrative
									structure, guiding the visitor from first impression to
									contact without a single unnecessary click.
								</p>
								<ul
									className="SvcOverviewPoints"
									aria-label="Core value points"
								>
									{OVERVIEW_POINTS.map((point) => (
										<li key={point} className="SvcOverviewPoint">
											<FaCircleCheck
												className="SvcOverviewPointIcon"
												aria-hidden="true"
											/>
											<span>{point}</span>
										</li>
									))}
								</ul>
							</div>
							<div className="SvcOverviewVisual">
								<div className="SvcOverviewImageFrame">
									<img
										src={examplePage}
										alt="Single page website example"
										loading="lazy"
									/>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section
					className="SvcSection SvcSectionAlt"
					aria-labelledby="sp-features-title"
				>
					<div className="SvcShell">
						<div className="SvcSectionHeader SvcSectionHeaderCentered">
							<p className="SvcEyebrow">What's Included</p>
							<h2 id="sp-features-title" className="SvcSectionTitle">
								Every build covers
							</h2>
							<p className="SvcSectionDescription">
								A focused, high-performance page with every element needed to
								present, persuade, and convert.
							</p>
						</div>
						<ul className="SvcFeaturesGrid" aria-label="Service features">
							{FEATURES.map(({ icon: Icon, title, description }) => (
								<li key={title} className="SvcFeatureCard">
									<div className="SvcFeatureIconWrapper" aria-hidden="true">
										<Icon />
									</div>
									<h3 className="SvcFeatureTitle">{title}</h3>
									<p className="SvcFeatureDescription">{description}</p>
								</li>
							))}
						</ul>
					</div>
				</section>

				<section className="SvcSection" aria-labelledby="sp-usecases-title">
					<div className="SvcShell">
						<div className="SvcSectionHeader">
							<p className="SvcEyebrow">Applications</p>
							<h2 id="sp-usecases-title" className="SvcSectionTitle">
								Where single-page sites excel
							</h2>
							<p className="SvcSectionDescription">
								Anywhere a single, focused destination with no distractions will
								outperform a complex multi-page site.
							</p>
						</div>
						<ul className="SvcUseCasesGrid" aria-label="Use cases">
							{USE_CASES.map(({ label, title, description }) => (
								<li key={label} className="SvcUseCaseCard">
									<span className="SvcUseCaseLabel">{label}</span>
									<h3 className="SvcUseCaseTitle">{title}</h3>
									<p className="SvcUseCaseDescription">{description}</p>
								</li>
							))}
						</ul>
					</div>
				</section>

				<section className="SvcSection" aria-labelledby="sp-benefits-title">
					<div className="SvcShell">
						<div className="SvcBenefitsGrid">
							<div className="SvcBenefitsIntro">
								<p className="SvcEyebrow">Why HestiQ</p>
								<h2 id="sp-benefits-title" className="SvcSectionTitle">
									What you gain
								</h2>
								<p className="SvcSectionDescription">
									Speed to market, focused messaging, and a conversion-first
									structure that gets out of its own way.
								</p>
								<Link
									to={ONBOARDING_URL}
									state={{ scrollToTop: true }}
									className="CTA SvcBenefitsCTA"
								>
									Get Started <FaArrowRight aria-hidden="true" />
								</Link>
							</div>
							<ul className="SvcBenefitsList" aria-label="Benefits">
								{BENEFITS.map(({ icon: Icon, title, description }) => (
									<li key={title} className="SvcBenefit">
										<div className="SvcBenefitIconWrapper" aria-hidden="true">
											<Icon />
										</div>
										<div className="SvcBenefitContent">
											<h3 className="SvcBenefitTitle">{title}</h3>
											<p className="SvcBenefitDescription">{description}</p>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</section>

				{relatedServices.length > 0 && (
					<section
						className="SvcSection SvcSectionAlt"
						aria-labelledby="sp-related-title"
					>
						<div className="SvcShell">
							<div className="SvcSectionHeader SvcSectionHeaderCentered">
								<p className="SvcEyebrow">Explore More</p>
								<h2 id="sp-related-title" className="SvcSectionTitle">
									Related services
								</h2>
								<p className="SvcSectionDescription">
									Once your single-page site is established, these services help
									you grow the digital presence further.
								</p>
							</div>
							<ul
								className="SvcRelatedGrid"
								aria-label="Related development services"
							>
								{relatedServices.map((s) => (
									<li key={s.name}>
										<Link
											to={s.href}
											state={{ scrollToTop: true }}
											className="SvcRelatedCard"
										>
											<div className="SvcRelatedCardTop">
												<span className="SvcRelatedCardCategory">
													{s.category}
												</span>
											</div>
											<h3 className="SvcRelatedCardTitle">{s.name}</h3>
											<p className="SvcRelatedCardDescription">
												{s.description}
											</p>
											<span className="SvcRelatedCardLink">
												View service <FaArrowRight aria-hidden="true" />
											</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</section>
				)}

				<section className="SvcCTASection" aria-labelledby="sp-cta-title">
					<div className="SvcCTAPattern" aria-hidden="true" />
					<div className="SvcShell SvcCTAContent">
						<h2 id="sp-cta-title" className="SvcCTATitle">
							Ready to go live with a page that converts?
						</h2>
						<p className="SvcCTASubtitle">
							Tell us what you're launching and we'll build a single-page site
							that delivers the message and drives the action.
						</p>
						<Link
							to={ONBOARDING_URL}
							state={{ scrollToTop: true }}
							className="CTA SvcCTAButton"
						>
							Get Started <FaArrowRight aria-hidden="true" />
						</Link>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
