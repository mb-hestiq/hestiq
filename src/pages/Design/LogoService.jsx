import { useMemo } from "react";
import { Link } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useServices } from "../../utils/servicesCache";
import exampleLogos from "../../assets/example/example_logos.png";
import {
	FaMagnifyingGlass,
	FaLayerGroup,
	FaExpand,
	FaPen,
	FaPalette,
	FaFileArrowDown,
	FaRotate,
	FaArrowRight,
	FaBolt,
	FaCompass,
	FaCircleCheck,
} from "react-icons/fa6";
import "../../styles/services.css";

const FEATURES = [
	{
		icon: FaMagnifyingGlass,
		title: "Research-Led Design",
		description:
			"Competitive landscape analysis and brand positioning completed before any concept is drawn.",
	},
	{
		icon: FaLayerGroup,
		title: "Multiple Concepts",
		description:
			"Several distinct creative directions delivered for your review in the first round.",
	},
	{
		icon: FaExpand,
		title: "Scalable Vector Files",
		description:
			"Formats that hold from favicon to billboard without a single pixel lost.",
	},
	{
		icon: FaPen,
		title: "Custom Typography",
		description:
			"Letterforms crafted or precisely selected to match your brand's voice and tone.",
	},
	{
		icon: FaPalette,
		title: "Colour System",
		description:
			"A cohesive palette: primary, secondary, and support tones, delivered with usage guidelines.",
	},
	{
		icon: FaFileArrowDown,
		title: "Complete File Package",
		description:
			"PNG, SVG, and PDF in every orientation and background variant, ready to deploy.",
	},
];

const USE_CASES = [
	{
		label: "Startup Launch",
		title: "Entering the market with authority",
		description:
			"New businesses need a mark that establishes credibility from day one. We design identities built to scale alongside the company.",
	},
	{
		label: "Business Rebrand",
		title: "Refreshing an outdated identity",
		description:
			"When a company outgrows its original look, we realign the visual identity with where the brand is now and where it's heading.",
	},
	{
		label: "Personal Brand",
		title: "Building a professional presence",
		description:
			"Consultants, creatives, and executives get a distinct mark that travels consistently across every touchpoint.",
	},
	{
		label: "Product Launch",
		title: "Identity for a standalone product",
		description:
			"Sub-brands and product lines that need their own identity. Consistent with the parent, distinct enough to live independently.",
	},
];

const BENEFITS = [
	{
		icon: FaBolt,
		title: "First-Impression Authority",
		description:
			"A professionally designed logo signals credibility before a single word is read.",
	},
	{
		icon: FaExpand,
		title: "Scales Across Every Format",
		description:
			"Vector files ensure the mark looks sharp on a business card or a conference banner.",
	},
	{
		icon: FaRotate,
		title: "Revisions Included",
		description:
			"A fixed number of revision rounds is built into every engagement. No hidden change fees.",
	},
	{
		icon: FaCompass,
		title: "Expert Creative Direction",
		description:
			"A dedicated designer guides strategy, concept, and execution from brief to final delivery.",
	},
];

const OVERVIEW_POINTS = [
	"Build immediate brand credibility",
	"Own your files, no vendor lock-in",
	"Delivered in industry-standard formats",
	"Tailored to your audience and market",
];

const ONBOARDING_URL = "/onboarding?category=design&service=logo-design";

export default function LogoService() {
	const { services } = useServices();

	const service = useMemo(
		() => services.find((s) => s.name === "Logo Design") ?? null,
		[services],
	);

	const relatedServices = useMemo(
		() =>
			services
				.filter((s) => s.category === "Design" && s.name !== "Logo Design")
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
					aria-labelledby="ls-overview-title"
				>
					<div className="SvcShell">
						<div className="SvcOverviewGrid">
							<div className="SvcOverviewContent">
								<p className="SvcEyebrow">The Problem We Solve</p>
								<h2 id="ls-overview-title" className="SvcSectionTitle">
									A logo that works, not just looks.
								</h2>
								<p className="SvcSectionDescription">
									Most businesses launch with a generic mark or a rushed design
									that never quite fits. Over time, that misalignment erodes
									brand trust, complicates marketing materials, and costs more
									to fix than to build right the first time.
								</p>
								<p className="SvcSectionDescription">
									We design logos with brand strategy at the core — researching
									your market, audience, and competitors before pencil meets
									paper. The result is a mark that communicates the right thing
									to the right people, at every scale.
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
									src={exampleLogos}
									alt="Example logo designs"
									className="SvcOverviewImage"
									loading="lazy"
								/>
							</div>
						</div>
					</div>
				</section>

				<section
					className="SvcSection SvcSectionAlt"
					aria-labelledby="ls-features-title"
				>
					<div className="SvcShell">
						<div className="SvcSectionHeader SvcSectionHeaderCentered">
							<p className="SvcEyebrow">What's Included</p>
							<h2 id="ls-features-title" className="SvcSectionTitle">
								Every engagement covers
							</h2>
							<p className="SvcSectionDescription">
								A structured creative process covering research, concept
								development, and every file format you will ever need.
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

				<section className="SvcSection" aria-labelledby="ls-usecases-title">
					<div className="SvcShell">
						<div className="SvcSectionHeader">
							<p className="SvcEyebrow">Applications</p>
							<h2 id="ls-usecases-title" className="SvcSectionTitle">
								Where logo design applies
							</h2>
							<p className="SvcSectionDescription">
								Whether you're launching something new or realigning an existing
								identity, great logo design underpins everything.
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

				<section className="SvcSection" aria-labelledby="ls-benefits-title">
					<div className="SvcShell">
						<div className="SvcBenefitsGrid">
							<div className="SvcBenefitsIntro">
								<p className="SvcEyebrow">Why HestiQ</p>
								<h2 id="ls-benefits-title" className="SvcSectionTitle">
									What you gain
								</h2>
								<p className="SvcSectionDescription">
									Craft that is measurable, strategy that is practical, and a
									final asset that you own entirely.
								</p>
								<Link to={ONBOARDING_URL} className="CTA SvcBenefitsCTA">
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
						aria-labelledby="ls-related-title"
					>
						<div className="SvcShell">
							<div className="SvcSectionHeader SvcSectionHeaderCentered">
								<p className="SvcEyebrow">Explore More</p>
								<h2 id="ls-related-title" className="SvcSectionTitle">
									Related services
								</h2>
								<p className="SvcSectionDescription">
									Logo design works best as the foundation of a full brand
									system. These services complement your new identity.
								</p>
							</div>
							<ul
								className="SvcRelatedGrid"
								aria-label="Related design services"
							>
								{relatedServices.map((s) => (
									<li key={s.name}>
										<Link to={s.href} className="SvcRelatedCard">
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

				<section className="SvcCTASection" aria-labelledby="ls-cta-title">
					<div className="SvcCTAPattern" aria-hidden="true" />
					<div className="SvcShell SvcCTAContent">
						<h2 id="ls-cta-title" className="SvcCTATitle">
							Ready to build a logo that lasts?
						</h2>
						<p className="SvcCTASubtitle">
							Tell us about your brand and we will deliver a mark you are proud
							to put everywhere.
						</p>
						<Link to={ONBOARDING_URL} className="CTA SvcCTAButton">
							Get Started <FaArrowRight aria-hidden="true" />
						</Link>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
