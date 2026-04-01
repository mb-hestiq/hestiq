import { useMemo } from "react";
import { Link } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useServices } from "../../utils/servicesCache";
import examplePage from "../../assets/images/examples/example-page.png";
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
			<main className="svc-page">
				<section
					id="overview"
					className="svc-section"
					aria-labelledby="sp-overview-title"
				>
					<div className="svc-shell">
						<div className="svc-overview-grid">
							<div className="svc-overview-content">
								<p className="svc-eyebrow">The Problem We Solve</p>
								<h2 id="sp-overview-title" className="svc-section-title">
									One page. One message. One action.
								</h2>
								<p className="svc-section-description">
									Multi-page sites often scatter the visitor's attention across
									navigation menus, competing calls to action, and information
									that belongs elsewhere. For campaigns, products, and personal
									brands, that friction kills conversions.
								</p>
								<p className="svc-section-description">
									We build single-page websites with a deliberate narrative
									structure, guiding the visitor from first impression to
									contact without a single unnecessary click.
								</p>
								<ul
									className="svc-overview-points"
									aria-label="Core value points"
								>
									{OVERVIEW_POINTS.map((point) => (
										<li key={point} className="svc-overview-point">
											<FaCircleCheck
												className="svc-overview-point-icon"
												aria-hidden="true"
											/>
											<span>{point}</span>
										</li>
									))}
								</ul>
							</div>
							<div className="svc-overview-visual">
								<div className="svc-overview-image-frame">
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
					className="svc-section svc-section-alt"
					aria-labelledby="sp-features-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header svc-section-header-centered">
							<p className="svc-eyebrow">What's Included</p>
							<h2 id="sp-features-title" className="svc-section-title">
								Every build covers
							</h2>
							<p className="svc-section-description">
								A focused, high-performance page with every element needed to
								present, persuade, and convert.
							</p>
						</div>
						<ul className="svc-features-grid" aria-label="Service features">
							{FEATURES.map(({ icon: Icon, title, description }) => (
								<li key={title} className="svc-feature-card">
									<div className="svc-feature-icon-wrapper" aria-hidden="true">
										<Icon />
									</div>
									<h3 className="svc-feature-title">{title}</h3>
									<p className="svc-feature-description">{description}</p>
								</li>
							))}
						</ul>
					</div>
				</section>

				<section className="svc-section" aria-labelledby="sp-usecases-title">
					<div className="svc-shell">
						<div className="svc-section-header">
							<p className="svc-eyebrow">Applications</p>
							<h2 id="sp-usecases-title" className="svc-section-title">
								Where single-page sites excel
							</h2>
							<p className="svc-section-description">
								Anywhere a single, focused destination with no distractions will
								outperform a complex multi-page site.
							</p>
						</div>
						<ul className="svc-use-cases-grid" aria-label="Use cases">
							{USE_CASES.map(({ label, title, description }) => (
								<li key={label} className="svc-use-case-card">
									<span className="svc-use-case-label">{label}</span>
									<h3 className="svc-use-case-title">{title}</h3>
									<p className="svc-use-case-description">{description}</p>
								</li>
							))}
						</ul>
					</div>
				</section>

				<section className="svc-section" aria-labelledby="sp-benefits-title">
					<div className="svc-shell">
						<div className="svc-benefits-grid">
							<div className="svc-benefits-intro">
								<p className="svc-eyebrow">Why HestiQ</p>
								<h2 id="sp-benefits-title" className="svc-section-title">
									What you gain
								</h2>
								<p className="svc-section-description">
									Speed to market, focused messaging, and a conversion-first
									structure that gets out of its own way.
								</p>
								<Link
									to={ONBOARDING_URL}
									state={{ scrollToTop: true }}
									className="cta svc-benefits-cta"
								>
									Get Started <FaArrowRight aria-hidden="true" />
								</Link>
							</div>
							<ul className="svc-benefits-list" aria-label="Benefits">
								{BENEFITS.map(({ icon: Icon, title, description }) => (
									<li key={title} className="svc-benefit">
										<div
											className="svc-benefit-icon-wrapper"
											aria-hidden="true"
										>
											<Icon />
										</div>
										<div className="svc-benefit-content">
											<h3 className="svc-benefit-title">{title}</h3>
											<p className="svc-benefit-description">{description}</p>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</section>

				{relatedServices.length > 0 && (
					<section
						className="svc-section svc-section-alt"
						aria-labelledby="sp-related-title"
					>
						<div className="svc-shell">
							<div className="svc-section-header svc-section-header-centered">
								<p className="svc-eyebrow">Explore More</p>
								<h2 id="sp-related-title" className="svc-section-title">
									Related services
								</h2>
								<p className="svc-section-description">
									Once your single-page site is established, these services help
									you grow the digital presence further.
								</p>
							</div>
							<ul
								className="svc-related-grid"
								aria-label="Related development services"
							>
								{relatedServices.map((s) => (
									<li key={s.name}>
										<Link
											to={s.href}
											state={{ scrollToTop: true }}
											className="svc-related-card"
										>
											<div className="svc-related-card-top">
												<span className="svc-related-card-category">
													{s.category}
												</span>
											</div>
											<h3 className="svc-related-card-title">{s.name}</h3>
											<p className="svc-related-card-description">
												{s.description}
											</p>
											<span className="svc-related-card-link">
												View service <FaArrowRight aria-hidden="true" />
											</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</section>
				)}

				<section className="svc-cta-section" aria-labelledby="sp-cta-title">
					<div className="svc-cta-pattern" aria-hidden="true" />
					<div className="svc-shell svc-cta-content">
						<h2 id="sp-cta-title" className="svc-cta-title">
							Ready to go live with a page that converts?
						</h2>
						<p className="svc-cta-subtitle">
							Tell us what you're launching and we'll build a single-page site
							that delivers the message and drives the action.
						</p>
						<Link
							to={ONBOARDING_URL}
							state={{ scrollToTop: true }}
							className="cta svc-cta-button"
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
