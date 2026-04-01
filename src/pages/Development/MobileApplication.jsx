import { useMemo } from "react";
import { Link } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useServices } from "../../utils/servicesCache";
import mobileExample1 from "../../assets/images/examples/mobile-app-example-1.png";
import {
	FaCircleCheck,
	FaMobileScreenButton,
	FaCode,
	FaGauge,
	FaBell,
	FaShieldHalved,
	FaCloudArrowUp,
	FaArrowRight,
	FaBolt,
	FaLayerGroup,
	FaChartLine,
	FaHandshake,
} from "react-icons/fa6";
import "../../styles/services.css";

const FEATURES = [
	{
		icon: FaMobileScreenButton,
		title: "Cross-Platform Development",
		description:
			"A single codebase that targets iOS and Android with native-level performance and full access to device APIs.",
	},
	{
		icon: FaCode,
		title: "Native-Feel UI",
		description:
			"Platform-appropriate interactions, gestures, and navigation patterns that feel natural to each operating system.",
	},
	{
		icon: FaGauge,
		title: "Performance Optimisation",
		description:
			"Smooth 60fps animations, efficient state management, and minimal bundle sizes that keep the app responsive under load.",
	},
	{
		icon: FaBell,
		title: "Push Notifications",
		description:
			"Targeted push notification delivery across iOS and Android with rich media, deep linking, and delivery analytics.",
	},
	{
		icon: FaCloudArrowUp,
		title: "API & Backend Integration",
		description:
			"Secure connectivity to your existing backend or new custom APIs, with offline-first data handling built in.",
	},
	{
		icon: FaShieldHalved,
		title: "App Store Submission",
		description:
			"Preparation, review compliance, and submission management for both the Apple App Store and Google Play.",
	},
];

const USE_CASES = [
	{
		label: "Consumer Apps",
		title: "Acquiring and retaining users at scale",
		description:
			"Social, utility, and lifestyle apps built around engagement loops, onboarding optimisation, and long-term retention mechanics.",
	},
	{
		label: "Enterprise Internal Tools",
		title: "Mobilising your workforce",
		description:
			"Field teams, warehouse staff, and remote workers get purpose-built apps that streamline operations without web browser limitations.",
	},
	{
		label: "Marketplace Platforms",
		title: "Connecting buyers and sellers on mobile",
		description:
			"Two-sided and multi-sided marketplace apps with real-time listings, in-app messaging, and secure transaction flows.",
	},
	{
		label: "Service Booking",
		title: "Mobile-first booking experiences",
		description:
			"Appointment scheduling, service discovery, and provider management apps for healthcare, hospitality, and professional services.",
	},
];

const BENEFITS = [
	{
		icon: FaBolt,
		title: "Ship to Both Platforms Simultaneously",
		description:
			"Cross-platform development eliminates the cost and schedule overhead of maintaining two separate native codebases.",
	},
	{
		icon: FaChartLine,
		title: "Engagement You Can Measure",
		description:
			"Session tracking, funnel analytics, and push performance dashboards surface actionable data from launch day.",
	},
	{
		icon: FaLayerGroup,
		title: "Architecture That Scales",
		description:
			"Clean separation of concerns and modular feature organisation supports rapid iteration without technical debt accumulation.",
	},
	{
		icon: FaHandshake,
		title: "Full-Cycle Expert Delivery",
		description:
			"Strategy, design, development, QA, and store submission handled by a single dedicated team.",
	},
];

const OVERVIEW_POINTS = [
	"iOS and Android from a single, maintainable codebase",
	"Native device API access: camera, GPS, biometrics",
	"Offline-capable with background sync",
	"App Store and Google Play submission included",
];

const ONBOARDING_URL =
	"/onboarding?category=programming&service=mobile-application";

export default function MobileApplication() {
	const { services } = useServices();

	const relatedServices = useMemo(
		() =>
			services
				.filter(
					(s) =>
						s.category === "Development" && s.name !== "Mobile Application",
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
					aria-labelledby="ma-overview-title"
				>
					<div className="svc-shell">
						<div className="svc-overview-grid">
							<div className="svc-overview-content">
								<p className="svc-eyebrow">The Problem We Solve</p>
								<h2 id="ma-overview-title" className="svc-section-title">
									A mobile app users actually keep on their phone.
								</h2>
								<p className="svc-section-description">
									Most apps are downloaded once and deleted within a week. Poor
									onboarding, sluggish performance, and interfaces that ignore
									platform conventions create an experience that pushes users
									away rather than building a habit.
								</p>
								<p className="svc-section-description">
									We engineer mobile applications around user behaviour,
									performance targets, and business outcomes, delivering apps on
									iOS and Android that earn their place on the home screen.
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
								<img
									src={mobileExample1}
									alt="Mobile application example"
									className="svc-overview-image-mobile"
									loading="lazy"
								/>
							</div>
						</div>
					</div>
				</section>

				<section
					className="svc-section svc-section-alt"
					aria-labelledby="ma-features-title"
				>
					<div className="svc-shell">
						<div className="svc-section-header svc-section-header-centered">
							<p className="svc-eyebrow">What's Included</p>
							<h2 id="ma-features-title" className="svc-section-title">
								Every build covers
							</h2>
							<p className="svc-section-description">
								End-to-end mobile development from product design through store
								submission, with every technical layer addressed.
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

				<section className="svc-section" aria-labelledby="ma-usecases-title">
					<div className="svc-shell">
						<div className="svc-section-header">
							<p className="svc-eyebrow">Applications</p>
							<h2 id="ma-usecases-title" className="svc-section-title">
								Where mobile apps create value
							</h2>
							<p className="svc-section-description">
								From consumer entertainment to enterprise operations, the right
								mobile experience transforms how people interact with your
								product.
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

				<section className="svc-section" aria-labelledby="ma-benefits-title">
					<div className="svc-shell">
						<div className="svc-benefits-grid">
							<div className="svc-benefits-intro">
								<p className="svc-eyebrow">Why HestiQ</p>
								<h2 id="ma-benefits-title" className="svc-section-title">
									What you gain
								</h2>
								<p className="svc-section-description">
									Two platforms, one team, zero compromise. Shipped with
									performance and analytics from day one.
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
						aria-labelledby="ma-related-title"
					>
						<div className="svc-shell">
							<div className="svc-section-header svc-section-header-centered">
								<p className="svc-eyebrow">Explore More</p>
								<h2 id="ma-related-title" className="svc-section-title">
									Related services
								</h2>
								<p className="svc-section-description">
									Mobile apps need a strong backend, compelling UI design, and
									ongoing infrastructure. These services complement your app
									delivery.
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

				<section className="svc-cta-section" aria-labelledby="ma-cta-title">
					<div className="svc-cta-pattern" aria-hidden="true" />
					<div className="svc-shell svc-cta-content">
						<h2 id="ma-cta-title" className="svc-cta-title">
							Ready to ship an app users keep coming back to?
						</h2>
						<p className="svc-cta-subtitle">
							Tell us about your product and we'll build a mobile experience
							that earns retention on both platforms.
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
