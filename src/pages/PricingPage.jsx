import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useServices } from "../utils/servicesCache";
import {
	RiPaletteLine,
	RiCodeSSlashLine,
	RiServerLine,
	RiCheckLine,
	RiDiscussLine,
	RiPencilRulerLine,
	RiTerminalBoxLine,
	RiRocketLine,
	RiArrowRightLine,
} from "react-icons/ri";

const MAINTENANCE_FROM_PRICE = 50;

const MAINTENANCE_BENEFITS = [
	"SEO optimization",
	"Maintenance",
	"Hosting setup",
	"Performance optimization",
	"Ongoing support",
];

const PROCESS_STEPS = [
	{
		icon: RiDiscussLine,
		title: "Discovery",
		description:
			"We learn about your goals, audience, and requirements to define a clear scope and avoid surprises later.",
	},
	{
		icon: RiPencilRulerLine,
		title: "Design",
		description:
			"We craft wireframes and high-fidelity designs iteratively, gathering feedback at every stage.",
	},
	{
		icon: RiTerminalBoxLine,
		title: "Development",
		description:
			"Clean, tested code built on modern technologies. Delivered incrementally so you can track progress.",
	},
	{
		icon: RiRocketLine,
		title: "Review & Launch",
		description:
			"Thorough QA, your final sign-off, and a smooth deployment - followed by post-launch support.",
	},
];

const COMPARISON_TABS = ["Design", "Development"];

function packageMinPrice(services) {
	const prices = services
		.map((s) => s.price)
		.filter((p) => typeof p === "number" && p > 0);
	return prices.length > 0 ? Math.min(...prices) : null;
}

function PackageCard({
	title,
	icon: IconComp,
	fromPrice,
	priceLabel,
	items,
	exploreUrl,
}) {
	return (
		<div className="PricingPackageCard">
			<div className="PricingPackageCardTop">
				<div className="PricingPackageCardIcon">
					<IconComp size={22} />
				</div>
				<h3 className="PricingPackageCardTitle">{title}</h3>
				<p className="PricingPackageCardPrice">
					from <strong>${fromPrice.toLocaleString()}</strong>
					{priceLabel && (
						<span className="PricingPackagePriceLabel">{priceLabel}</span>
					)}
				</p>
			</div>
			<ul className="PricingPackageCardList">
				{items.map((item, i) => (
					<li key={i} className="PricingPackageCardItem">
						<RiCheckLine size={14} className="PricingPackageCheckIcon" />
						<span>{item}</span>
					</li>
				))}
			</ul>
			<Link to={exploreUrl} className="PricingPackageExploreBtn">
				Explore
				<RiArrowRightLine size={15} />
			</Link>
		</div>
	);
}

const PILLARS = [
	{
		num: "01",
		title: "Scoped per project",
		desc: "Every engagement starts with a discovery call to define deliverables and a fixed estimate.",
	},
	{
		num: "02",
		title: "No hidden fees",
		desc: "What we quote is what you pay. Revisions within scope are included at no extra cost.",
	},
	{
		num: "03",
		title: "Flexible timelines",
		desc: "Rush delivery is available for projects with tight deadlines, with adjusted pricing.",
	},
];

function PricingPillar({ num, title, desc }) {
	const [open, setOpen] = useState(false);
	const toggle = useCallback(() => setOpen((v) => !v), []);
	return (
		<div className="PricingModelPillar" data-open={open ? "true" : "false"}>
			<button
				type="button"
				className="PricingModelPillarHeader"
				onClick={toggle}
				aria-expanded={open}
			>
				<span className="PricingModelPillarNum">{num}</span>
				<h4 className="PricingModelPillarTitle">{title}</h4>
				<span className="PricingModelPillarToggle" aria-hidden="true">
					{open ? <RiSubtractLine size={16} /> : <RiAddLine size={16} />}
				</span>
			</button>
			{open && <p className="PricingModelPillarDesc">{desc}</p>}
		</div>
	);
}

function ComparisonTable({ services }) {
	return (
		<div className="PricingComparisonTableWrapper">
			<table className="PricingComparisonTable">
				<thead>
					<tr>
						<th>Service</th>
						<th>Estimated Price</th>
						<th>Revisions</th>
						<th>Estimated Duration</th>
					</tr>
				</thead>
				<tbody>
					{services.map((s, i) => (
						<tr key={i}>
							<td>{s.name}</td>
							<td>
								{typeof s.price === "number"
									? `from $${s.price.toLocaleString()}`
									: "—"}
							</td>
							<td>{typeof s.revisits === "number" ? s.revisits : "—"}</td>
							<td>
								{typeof s.duration === "number" ? `${s.duration} days` : "—"}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default function PricingPage() {
	const { services: allServices, loading } = useServices();
	const [activeTab, setActiveTab] = useState("Design");

	const designServices = useMemo(
		() => allServices.filter((s) => s.category === "Design"),
		[allServices],
	);

	const devServices = useMemo(
		() =>
			allServices.filter(
				(s) =>
					s.category === "Development" && s.name !== "Maintenance & Hosting",
			),
		[allServices],
	);

	const designMin = packageMinPrice(designServices);
	const devMin = packageMinPrice(devServices);

	const comparisonServices =
		activeTab === "Design" ? designServices : devServices;

	return (
		<>
			<Header />
			<main>
				<section className="PricingHero">
					<div className="PricingHeroContent">
						<span className="PricingHeroBadge">Transparent Pricing</span>
						<h1 className="PricingHeroTitle">
							Quality Work,
							<br />
							<span>Honest Pricing</span>
						</h1>
						<p className="PricingHeroDescription">
							No surprise invoices. No bloated retainers. Every project is
							scoped individually so you pay for exactly what you need — nothing
							more.
						</p>
					</div>
				</section>

				<section className="PricingModelSection">
					<div className="PricingModelContainer">
						<div className="PricingModelLeft">
							<h2 className="PricingModelTitle">How We Charge</h2>
							<p className="PricingModelText">
								We do not offer rigid monthly plans. Instead, each project is
								scoped individually based on your goals, complexity, and
								timeline. You get a clear estimate before any work begins.
							</p>
							<p className="PricingModelText">
								Prices listed are starting points. Final quotes depend on scope,
								integrations, and turnaround requirements.
							</p>
						</div>
						<div className="PricingModelRight">
							<div className="PricingModelPillars">
								{PILLARS.map((pillar) => (
									<PricingPillar key={pillar.num} {...pillar} />
								))}
							</div>
						</div>
					</div>
				</section>

				<section className="PricingPackagesSection">
					<div className="PricingPackagesInner">
						<div className="PricingPackagesHeader">
							<h2 className="PricingPackagesTitle">Our Packages</h2>
							<p className="PricingPackagesDesc">
								Choose the category that fits your needs. Each package includes
								everything listed - and we can bundle services for a better
								deal.
							</p>
						</div>
						<div className="PricingPackagesGrid">
							<PackageCard
								title="Design"
								icon={RiPaletteLine}
								fromPrice={designMin ?? 50}
								items={designServices.map((s) => s.name)}
								exploreUrl="/onboarding?category=design"
							/>
							<PackageCard
								title="Development"
								icon={RiCodeSSlashLine}
								fromPrice={devMin ?? 100}
								items={devServices.map((s) => s.name)}
								exploreUrl="/onboarding?category=programming"
							/>
							<PackageCard
								title="Maintenance & Hosting"
								icon={RiServerLine}
								fromPrice={MAINTENANCE_FROM_PRICE}
								priceLabel="/mo"
								items={MAINTENANCE_BENEFITS}
								exploreUrl="/onboarding?category=programming&service=maintenance-%26-hosting"
							/>
						</div>
					</div>
				</section>

				<section className="PricingComparisonSection">
					<div className="PricingComparisonInner">
						<h2 className="PricingComparisonTitle">Service Breakdown</h2>
						<div className="PricingComparisonTabs">
							{COMPARISON_TABS.map((tab) => (
								<button
									key={tab}
									type="button"
									className="PricingComparisonTab"
									data-active={activeTab === tab ? "true" : "false"}
									onClick={() => setActiveTab(tab)}
								>
									{tab}
								</button>
							))}
						</div>
						{loading ? (
							<p className="PricingComparisonLoading">Loading services…</p>
						) : (
							<ComparisonTable services={comparisonServices} />
						)}
					</div>
				</section>

				<section className="PricingProcessSection">
					<div className="PricingProcessInner">
						<h2 className="PricingProcessTitle">How We Work</h2>
						<div className="PricingProcessSteps">
							{PROCESS_STEPS.map(({ icon: Icon, title, description }, i) => (
								<div key={i} className="PricingProcessStep">
									<div className="PricingProcessStepNumber">{i + 1}</div>
									<div className="PricingProcessStepIcon">
										<Icon size={24} />
									</div>
									<h3 className="PricingProcessStepTitle">{title}</h3>
									<p className="PricingProcessStepDesc">{description}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className="PricingPhilosophySection">
					<div className="PricingPhilosophyContainer">
						<div className="PricingPhilosophyLeft">
							<h2 className="PricingPhilosophyTitle">Why Pricing Varies</h2>
						</div>
						<div className="PricingPhilosophyRight">
							<p className="PricingPhilosophyText">
								Each project is different. A single-page website is not the same
								as a full e-commerce platform — and a logo for a startup does
								not carry the same requirements as a rebrand for an established
								company.
							</p>
							<p className="PricingPhilosophyText">
								Pricing depends on complexity, features, integrations, and
								timeline. We factor in the number of revision rounds, the
								technical stack required, and the level of custom design work
								involved.
							</p>
							<p className="PricingPhilosophyText">
								Our estimates are always transparent. We will never start work
								without agreement on scope and cost.
							</p>
						</div>
					</div>
				</section>

				<section className="PricingCTASection">
					<div className="PricingCTAInner">
						<h2 className="PricingCTATitle">Ready to Get Started?</h2>
						<p className="PricingCTADescription">
							Tell us about your project and we will send you a tailored quote
							within one business day.
						</p>
						<Link to="/onboarding" className="PricingCTAButton">
							Start Your Project
							<RiArrowRightLine size={18} />
						</Link>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
