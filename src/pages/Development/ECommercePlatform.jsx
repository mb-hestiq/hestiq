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
			<main className="SvcPage">
				<section
					id="overview"
					className="SvcSection"
					aria-labelledby="ec-overview-title"
				>
					<div className="SvcShell">
						<div className="SvcOverviewGrid">
							<div className="SvcOverviewContent">
								<p className="SvcEyebrow">The Problem We Solve</p>
								<h2 id="ec-overview-title" className="SvcSectionTitle">
									An online store built to sell, not just display.
								</h2>
								<p className="SvcSectionDescription">
									Most e-commerce platforms are configured, not engineered.
									Generic themes, over-complicated checkout flows, and poor
									product discovery quietly destroy conversion rates, and most
									store owners never identify the root cause.
								</p>
								<p className="SvcSectionDescription">
									We build e-commerce platforms from the ground up around your
									catalogue, your customers, and your growth targets. Every
									decision from information architecture to payment flow is made
									to maximise revenue.
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
							<div className="SvcOverviewMeta" aria-label="Service highlights">
								<div className="SvcOverviewMetric">
									<span className="SvcOverviewMetricLabel">
										Platform approach
									</span>
									<strong className="SvcOverviewMetricValue">
										Built custom, no cookie-cutter templates or shared
										infrastructure
									</strong>
								</div>
								<div className="SvcOverviewMetric">
									<span className="SvcOverviewMetricLabel">
										Payment coverage
									</span>
									<strong className="SvcOverviewMetricValue">
										Stripe, PayPal, and regional gateways integrated
									</strong>
								</div>
								<div className="SvcOverviewMetric">
									<span className="SvcOverviewMetricLabel">
										Analytics included
									</span>
									<strong className="SvcOverviewMetricValue">
										Revenue dashboards and conversion tracking from day one
									</strong>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section
					className="SvcSection SvcSectionAlt"
					aria-labelledby="ec-features-title"
				>
					<div className="SvcShell">
						<div className="SvcSectionHeader SvcSectionHeaderCentered">
							<p className="SvcEyebrow">What's Included</p>
							<h2 id="ec-features-title" className="SvcSectionTitle">
								Every platform covers
							</h2>
							<p className="SvcSectionDescription">
								A complete commerce stack: storefront, checkout, inventory, and
								analytics, delivered production-ready.
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

				<section className="SvcSection" aria-labelledby="ec-usecases-title">
					<div className="SvcShell">
						<div className="SvcSectionHeader">
							<p className="SvcEyebrow">Applications</p>
							<h2 id="ec-usecases-title" className="SvcSectionTitle">
								Where e-commerce platforms apply
							</h2>
							<p className="SvcSectionDescription">
								Whether you're entering the market or rebuilding for scale, a
								purpose-built platform removes the ceiling on your revenue.
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

				<section className="SvcSection" aria-labelledby="ec-benefits-title">
					<div className="SvcShell">
						<div className="SvcBenefitsGrid">
							<div className="SvcBenefitsIntro">
								<p className="SvcEyebrow">Why HestiQ</p>
								<h2 id="ec-benefits-title" className="SvcSectionTitle">
									What you gain
								</h2>
								<p className="SvcSectionDescription">
									A revenue engine built on solid engineering, not shortcuts,
									with the analytics to prove it.
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
						aria-labelledby="ec-related-title"
					>
						<div className="SvcShell">
							<div className="SvcSectionHeader SvcSectionHeaderCentered">
								<p className="SvcEyebrow">Explore More</p>
								<h2 id="ec-related-title" className="SvcSectionTitle">
									Related services
								</h2>
								<p className="SvcSectionDescription">
									An e-commerce platform performs best when paired with strong
									brand identity and ongoing technical support.
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

				<section className="SvcCTASection" aria-labelledby="ec-cta-title">
					<div className="SvcCTAPattern" aria-hidden="true" />
					<div className="SvcShell SvcCTAContent">
						<h2 id="ec-cta-title" className="SvcCTATitle">
							Ready to build a store that converts?
						</h2>
						<p className="SvcCTASubtitle">
							Tell us about your products and we'll build the commerce platform
							that turns browsers into buyers.
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
