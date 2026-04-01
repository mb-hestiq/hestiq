import { useMemo } from "react";
import { Link } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useServices } from "../../utils/servicesCache";
import {
	FaCircleCheck,
	FaCartShopping,
	FaCreditCard,
	FaMagnifyingGlass,
	FaBoxesStacked,
	FaChartLine,
	FaShieldHalved,
	FaArrowRight,
	FaBolt,
	FaLayerGroup,
	FaPercent,
	FaHandshake,
} from "react-icons/fa6";
import "../../styles/services.css";

const FEATURES = [
	{
		icon: FaCartShopping,
		title: "Custom Storefront",
		description:
			"Fully branded shopping experiences with no cookie-cutter templates. Every page is designed to guide buyers toward conversion.",
	},
	{
		icon: FaCreditCard,
		title: "Secure Payment Integration",
		description:
			"Stripe, PayPal, and regional payment gateways integrated with PCI-compliant checkout flows.",
	},
	{
		icon: FaBoxesStacked,
		title: "Inventory Management",
		description:
			"Real-time stock tracking, variant management, and low-stock alerts built into the admin experience.",
	},
	{
		icon: FaMagnifyingGlass,
		title: "Product Discovery & SEO",
		description:
			"Structured product data, optimised category pages, and schema markup that improve rankings and click-through rates.",
	},
	{
		icon: FaChartLine,
		title: "Sales Analytics",
		description:
			"Revenue dashboards, conversion funnel tracking, and customer behaviour insights surfaced without third-party complexity.",
	},
	{
		icon: FaShieldHalved,
		title: "Fraud & Security Protections",
		description:
			"Rate limiting, bot detection, and secure session management applied across every customer-facing endpoint.",
	},
];

const USE_CASES = [
	{
		label: "Retail Brands",
		title: "Moving a physical store online",
		description:
			"Brick-and-mortar retailers transitioning to digital get a platform that mirrors in-store experience while capturing search traffic.",
	},
	{
		label: "D2C Product Launch",
		title: "Launching a direct-to-consumer brand",
		description:
			"New product brands need storefronts that tell the brand story, justify pricing, and convert on first visit.",
	},
	{
		label: "B2B Commerce",
		title: "Streamlining wholesale ordering",
		description:
			"Manufacturers and distributors get gated wholesale portals with tiered pricing, bulk ordering, and account management.",
	},
	{
		label: "Subscription Commerce",
		title: "Recurring revenue through subscriptions",
		description:
			"Subscription box brands and SaaS products with physical components get billing infrastructure that handles renewals, pauses, and upgrades.",
	},
];

const BENEFITS = [
	{
		icon: FaBolt,
		title: "Checkout Built to Convert",
		description:
			"Every step of the purchase flow is optimised to reduce abandonment and maximise completed transactions.",
	},
	{
		icon: FaPercent,
		title: "Measurable Revenue Impact",
		description:
			"Performance baselines, A/B testing capability, and revenue attribution give you data to grow with confidence.",
	},
	{
		icon: FaLayerGroup,
		title: "Scales with Demand",
		description:
			"Architecture handles traffic spikes during sales events and product launches without degradation.",
	},
	{
		icon: FaHandshake,
		title: "End-to-End Expert Delivery",
		description:
			"Strategy, design, development, and launch managed by a single team with deep e-commerce experience.",
	},
];

const OVERVIEW_POINTS = [
	"Custom checkout flows built to reduce abandonment",
	"Integrated with your fulfilment and inventory systems",
	"Search-optimised product and category pages",
	"Secure payment processing from day one",
];

const ONBOARDING_URL =
	"/onboarding?category=programming&service=e-commerce-platform";

export default function ECommercePlatform() {
	const { services } = useServices();

	const relatedServices = useMemo(
		() =>
			services
				.filter(
					(s) =>
						s.category === "Development" && s.name !== "E-commerce Platform",
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
					aria-labelledby="ec-overview-title"
				>
					<div className="svc-shell">
						<div className="svc-overview-grid">
							<div className="svc-overview-content">
								<p className="svc-eyebrow">The Problem We Solve</p>
								<h2 id="ec-overview-title" className="svc-section-title">
									An online store built to sell, not just display.
								</h2>
								<p className="svc-section-description">
									Most e-commerce platforms are configured, not engineered.
									Generic themes, over-complicated checkout flows, and poor
									product discovery quietly destroy conversion rates, and most
									store owners never identify the root cause.
								</p>
								<p className="svc-section-description">
									We build e-commerce platforms from the ground up around your
									catalogue, your customers, and your growth targets. Every
									decision from information architecture to payment flow is made
									to maximise revenue.
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
							<div
								className="svc-overview-meta"
								aria-label="Service highlights"
							>
								<div className="svc-overview-metric">
									<span className="svc-overview-metric-label">
										Platform approach
									</span>
									<strong className="svc-overview-metric-value">
										Built custom, no cookie-cutter templates or shared
										infrastructure
									</strong>
								</div>
								<div className="svc-overview-metric">
									<span className="svc-overview-metric-label">
										Payment coverage
									</span>
									<strong className="svc-overview-metric-value">
										Stripe, PayPal, and regional gateways integrated
									</strong>
								</div>
								<div className="svc-overview-metric">
									<span className="svc-overview-metric-label">
										Analytics included
									</span>
									<strong className="svc-overview-metric-value">
										Revenue dashboards and conversion tracking from day one
									</strong>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section
					className="svc-section svc-section-alt"
					aria-labelledby="ec-features-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header svc-section-header-centered">
							<p className="svc-eyebrow">What's Included</p>
							<h2 id="ec-features-title" className="svc-section-title">
								Every platform covers
							</h2>
							<p className="svc-section-description">
								A complete commerce stack: storefront, checkout, inventory, and
								analytics, delivered production-ready.
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

				<section className="svc-section" aria-labelledby="ec-usecases-title">
					<div className="svc-shell">
						<div className="svc-section-header">
							<p className="svc-eyebrow">Applications</p>
							<h2 id="ec-usecases-title" className="svc-section-title">
								Where e-commerce platforms apply
							</h2>
							<p className="svc-section-description">
								Whether you're entering the market or rebuilding for scale, a
								purpose-built platform removes the ceiling on your revenue.
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

				<section className="svc-section" aria-labelledby="ec-benefits-title">
					<div className="svc-shell">
						<div className="svc-benefits-grid">
							<div className="svc-benefits-intro">
								<p className="svc-eyebrow">Why HestiQ</p>
								<h2 id="ec-benefits-title" className="svc-section-title">
									What you gain
								</h2>
								<p className="svc-section-description">
									A revenue engine built on solid engineering, not shortcuts,
									with the analytics to prove it.
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
						aria-labelledby="ec-related-title"
					>
						<div className="svc-shell">
							<div className="svc-section-header svc-section-header-centered">
								<p className="svc-eyebrow">Explore More</p>
								<h2 id="ec-related-title" className="svc-section-title">
									Related services
								</h2>
								<p className="svc-section-description">
									An e-commerce platform performs best when paired with strong
									brand identity and ongoing technical support.
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

				<section className="svc-cta-section" aria-labelledby="ec-cta-title">
					<div className="svc-cta-pattern" aria-hidden="true" />
					<div className="svc-shell svc-cta-content">
						<h2 id="ec-cta-title" className="svc-cta-title">
							Ready to build a store that converts?
						</h2>
						<p className="svc-cta-subtitle">
							Tell us about your products and we'll build the commerce platform
							that turns browsers into buyers.
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
