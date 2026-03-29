import { useMemo } from "react";
import { Link } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useServices } from "../../utils/servicesCache";
import mobileExample1 from "../../assets/example/mobile-app-example-1.png";
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
			<main className="SvcPage">
				<section
					id="overview"
					className="SvcSection"
					aria-labelledby="ma-overview-title"
				>
					<div className="SvcShell">
						<div className="SvcOverviewGrid">
							<div className="SvcOverviewContent">
								<p className="SvcEyebrow">The Problem We Solve</p>
								<h2 id="ma-overview-title" className="SvcSectionTitle">
									A mobile app users actually keep on their phone.
								</h2>
								<p className="SvcSectionDescription">
									Most apps are downloaded once and deleted within a week. Poor
									onboarding, sluggish performance, and interfaces that ignore
									platform conventions create an experience that pushes users
									away rather than building a habit.
								</p>
								<p className="SvcSectionDescription">
									We engineer mobile applications around user behaviour,
									performance targets, and business outcomes, delivering apps on
									iOS and Android that earn their place on the home screen.
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
								<img
									src={mobileExample1}
									alt="Mobile application example"
									className="SvcOverviewImageMobile"
									loading="lazy"
								/>
							</div>
						</div>
					</div>
				</section>

				<section
					className="SvcSection SvcSectionAlt"
					aria-labelledby="ma-features-title"
				>
					<div className="SvcShell">
						<div className="SvcSectionHeader SvcSectionHeaderCentered">
							<p className="SvcEyebrow">What's Included</p>
							<h2 id="ma-features-title" className="SvcSectionTitle">
								Every build covers
							</h2>
							<p className="SvcSectionDescription">
								End-to-end mobile development from product design through store
								submission, with every technical layer addressed.
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

				<section className="SvcSection" aria-labelledby="ma-usecases-title">
					<div className="SvcShell">
						<div className="SvcSectionHeader">
							<p className="SvcEyebrow">Applications</p>
							<h2 id="ma-usecases-title" className="SvcSectionTitle">
								Where mobile apps create value
							</h2>
							<p className="SvcSectionDescription">
								From consumer entertainment to enterprise operations, the right
								mobile experience transforms how people interact with your
								product.
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

				<section className="SvcSection" aria-labelledby="ma-benefits-title">
					<div className="SvcShell">
						<div className="SvcBenefitsGrid">
							<div className="SvcBenefitsIntro">
								<p className="SvcEyebrow">Why HestiQ</p>
								<h2 id="ma-benefits-title" className="SvcSectionTitle">
									What you gain
								</h2>
								<p className="SvcSectionDescription">
									Two platforms, one team, zero compromise. Shipped with
									performance and analytics from day one.
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
						aria-labelledby="ma-related-title"
					>
						<div className="SvcShell">
							<div className="SvcSectionHeader SvcSectionHeaderCentered">
								<p className="SvcEyebrow">Explore More</p>
								<h2 id="ma-related-title" className="SvcSectionTitle">
									Related services
								</h2>
								<p className="SvcSectionDescription">
									Mobile apps need a strong backend, compelling UI design, and
									ongoing infrastructure. These services complement your app
									delivery.
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

				<section className="SvcCTASection" aria-labelledby="ma-cta-title">
					<div className="SvcCTAPattern" aria-hidden="true" />
					<div className="SvcShell SvcCTAContent">
						<h2 id="ma-cta-title" className="SvcCTATitle">
							Ready to ship an app users keep coming back to?
						</h2>
						<p className="SvcCTASubtitle">
							Tell us about your product and we'll build a mobile experience
							that earns retention on both platforms.
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
