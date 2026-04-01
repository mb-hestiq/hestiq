import { useMemo } from "react";
import { Link } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useServices } from "../../utils/servicesCache";
import {
	FaArrowRight,
	FaBolt,
	FaCircleCheck,
	FaCompassDrafting,
	FaGaugeHigh,
	FaLayerGroup,
	FaMagnifyingGlassChart,
	FaMobileScreen,
	FaPenRuler,
	FaRepeat,
	FaRoute,
	FaUsers,
	FaWandMagicSparkles,
} from "react-icons/fa6";
import "../../styles/services.css";

const FEATURES = [
	{
		icon: FaMagnifyingGlassChart,
		title: "Research-Driven Flows",
		description:
			"User journeys and friction points are mapped before visual work begins, so every screen solves a real task.",
	},
	{
		icon: FaRoute,
		title: "End-to-End Journey Mapping",
		description:
			"From acquisition to retention, core journeys are designed as connected systems instead of isolated screens.",
	},
	{
		icon: FaPenRuler,
		title: "Wireframes and High-Fidelity UI",
		description:
			"Low-fidelity structure validated first, then elevated into polished interface direction ready for implementation.",
	},
	{
		icon: FaLayerGroup,
		title: "Design System Foundation",
		description:
			"Reusable components and consistent interaction patterns reduce rework and speed up delivery later.",
	},
	{
		icon: FaMobileScreen,
		title: "Responsive by Default",
		description:
			"Layouts are planned across desktop and mobile breakpoints so experiences stay coherent across devices.",
	},
	{
		icon: FaUsers,
		title: "Collaboration in Every Review",
		description:
			"Feedback loops are structured around business goals, user behavior, and technical feasibility.",
	},
];

const USE_CASES = [
	{
		label: "SaaS Product",
		title: "Improve conversion through clearer journeys",
		description:
			"When trial-to-paid conversion stalls, we redesign critical onboarding and activation paths to reduce friction.",
	},
	{
		label: "Mobile App",
		title: "Create intuitive mobile-first interactions",
		description:
			"For products with high mobile usage, we optimize navigation, task completion, and gesture-based interactions.",
	},
	{
		label: "Enterprise Tool",
		title: "Reduce complexity in data-heavy interfaces",
		description:
			"Complex workflows are redesigned into structured, scannable screens that cut training time and errors.",
	},
	{
		label: "Product Redesign",
		title: "Modernize legacy UX without losing users",
		description:
			"Outdated interfaces are refactored incrementally, preserving continuity while introducing modern interaction standards.",
	},
];

const BENEFITS = [
	{
		icon: FaGaugeHigh,
		title: "Higher Task Completion",
		description:
			"Clear interaction patterns reduce abandonment and help users reach outcomes faster.",
	},
	{
		icon: FaRepeat,
		title: "Fewer Revision Loops",
		description:
			"Validated UX decisions up front prevent late-stage redesign cycles during development.",
	},
	{
		icon: FaCompassDrafting,
		title: "Build-Ready Design Direction",
		description:
			"Developers receive structured assets and screen logic that map directly to implementation.",
	},
	{
		icon: FaWandMagicSparkles,
		title: "Premium Product Perception",
		description:
			"A cohesive UI creates trust, supports brand positioning, and increases perceived value.",
	},
];

const OVERVIEW_POINTS = [
	"Eliminate user friction in core flows",
	"Align business goals with user behavior",
	"Define scalable patterns before development",
	"Ship interfaces users can understand instantly",
];

const ONBOARDING_URL = "/onboarding?category=design&service=ui%2Fux-design";
const DESIGNER_URL = "/designer";

export default function UiUxDesign() {
	const { services } = useServices();

	const service = useMemo(
		() => services.find((s) => s.name === "UI/UX Design") ?? null,
		[services],
	);

	const relatedServices = useMemo(
		() =>
			services
				.filter((s) => s.category === "Design" && s.name !== "UI/UX Design")
				.slice(0, 4),
		[services],
	);

	const servicePrice = useMemo(() => {
		const value = service?.price ?? service?.basePrice;
		return typeof value === "number" ? `$${value}` : "Custom quote";
	}, [service]);

	const serviceDuration = useMemo(() => {
		const value = service?.duration;
		if (typeof value !== "number") return "Timeline scoped to project";
		return value === 1 ? "1 day" : `${value} days`;
	}, [service]);

	const serviceRevisions = useMemo(() => {
		const value = service?.revisits ?? service?.revisions;
		if (typeof value !== "number") return "Iterative review cycles";
		return value === 1 ? "1 revision round" : `${value} revision rounds`;
	}, [service]);

	return (
		<>
			<Header />
			<main className="svc-page">
				<section
					id="overview"
					className="svc-section"
					aria-labelledby="ux-overview-title"
				>
					<div className="svc-shell">
						<div className="svc-overview-grid">
							<div className="svc-overview-content">
								<p className="svc-eyebrow">Overview</p>
								<h2 id="ux-overview-title" className="svc-section-title">
									UI/UX that drives product outcomes.
								</h2>
								<p className="svc-section-description">
									Most products lose users not because they lack features, but
									because core tasks feel confusing, slow, or inconsistent. Poor
									UX increases support load, hurts retention, and creates
									expensive rebuild cycles.
								</p>
								<p className="svc-section-description">
									Our UI/UX Design service aligns user behavior, product goals,
									and technical reality into one clear design direction your
									team can execute with confidence.
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
								<div className="svc-benefits-intro">
									<Link to={ONBOARDING_URL} className="cta svc-benefits-cta">
										Start UI/UX Project <FaArrowRight aria-hidden="true" />
									</Link>
									<Link to={DESIGNER_URL} className="cta svc-benefits-cta">
										Try out our design builder{" "}
										<FaArrowRight aria-hidden="true" />
									</Link>
								</div>
							</div>
							<div className="svc-overview-meta" aria-label="Service metadata">
								<div className="svc-overview-metric">
									<span className="svc-overview-metric-label">
										Starting Price
									</span>
									<span className="svc-overview-metric-value">
										{servicePrice}
									</span>
								</div>
								<div className="svc-overview-metric">
									<span className="svc-overview-metric-label">
										Estimated Duration
									</span>
									<span className="svc-overview-metric-value">
										{serviceDuration}
									</span>
								</div>
								<div className="svc-overview-metric">
									<span className="svc-overview-metric-label">
										Revisions Included
									</span>
									<span className="svc-overview-metric-value">
										{serviceRevisions}
									</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section
					className="svc-section svc-section-alt"
					aria-labelledby="ux-features-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header svc-section-header-centered">
							<p className="svc-eyebrow">Features</p>
							<h2 id="ux-features-title" className="svc-section-title">
								What the service includes
							</h2>
							<p className="svc-section-description">
								A complete UI/UX process from discovery to delivery, focused on
								usability, speed, and product growth.
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

				<section className="svc-section" aria-labelledby="ux-usecases-title">
					<div className="svc-shell">
						<div className="svc-section-header">
							<p className="svc-eyebrow">Use Cases</p>
							<h2 id="ux-usecases-title" className="svc-section-title">
								Where UI/UX Design creates impact
							</h2>
							<p className="svc-section-description">
								From early-stage products to enterprise platforms, structured UX
								design lowers friction and improves measurable outcomes.
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
						<div className="svc-benefits-intro">
							<Link to={DESIGNER_URL} className="cta svc-benefits-cta">
								Review UX Scope with a Designer{" "}
								<FaArrowRight aria-hidden="true" />
							</Link>
						</div>
					</div>
				</section>

				<section className="svc-section" aria-labelledby="ux-benefits-title">
					<div className="svc-shell">
						<div className="svc-benefits-grid">
							<div className="svc-benefits-intro">
								<p className="svc-eyebrow">Benefits</p>
								<h2 id="ux-benefits-title" className="svc-section-title">
									What your team gains
								</h2>
								<p className="svc-section-description">
									The output is not just polished screens. You get
									decision-ready UX logic, implementation clarity, and product
									momentum.
								</p>
								<Link to={DESIGNER_URL} className="cta svc-benefits-cta">
									Book UX Strategy Call <FaArrowRight aria-hidden="true" />
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
						aria-labelledby="ux-related-title"
					>
						<div className="svc-shell">
							<div className="svc-section-header svc-section-header-centered">
								<p className="svc-eyebrow">Related Services</p>
								<h2 id="ux-related-title" className="svc-section-title">
									Expand your design scope
								</h2>
								<p className="svc-section-description">
									Pair UI/UX with complementary design services to launch faster
									and maintain a consistent brand experience.
								</p>
							</div>
							<ul
								className="svc-related-grid"
								aria-label="Related design services"
							>
								{relatedServices.map((s) => (
									<li key={s.name}>
										<Link to={s.href} className="svc-related-card">
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

				<section className="svc-cta-section" aria-labelledby="ux-cta-title">
					<div className="svc-cta-pattern" aria-hidden="true" />
					<div className="svc-shell svc-cta-content">
						<h2 id="ux-cta-title" className="svc-cta-title">
							Ready to transform your product experience?
						</h2>
						<p className="svc-cta-subtitle">
							Start with a focused UI/UX engagement or speak with our design
							team today to define your fastest path forward.
						</p>
						<Link to={ONBOARDING_URL} className="cta svc-cta-button">
							Start UI/UX Onboarding <FaArrowRight aria-hidden="true" />
						</Link>
						<Link to={DESIGNER_URL} className="cta svc-cta-button">
							Talk to a Product Designer <FaArrowRight aria-hidden="true" />
						</Link>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
