import { useState, useMemo } from "react";
import { Link } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useServices } from "../utils/servicesCache";
import SignHere from "../assets/images/illustrations/sign-here.svg?react";
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
	RiFileTextLine,
	RiMoneyDollarCircleLine,
	RiTimeLine,
} from "react-icons/ri";

const MAINTENANCE_FROM_PRICE = 50;

const MAINTENANCE_BENEFITS = [
	"SEO optimization",
	"Maintenance",
	"Hosting setup",
	"Performance optimization",
	"Ongoing support",
];

const MODEL_ITEMS = [
	{
		num: "01",
		icon: RiFileTextLine,
		title: "Scoped per project",
		desc: "Every engagement starts with a discovery call to define deliverables and a fixed estimate.",
	},
	{
		num: "02",
		icon: RiMoneyDollarCircleLine,
		title: "No hidden fees",
		desc: "What we quote is what you pay. Revisions within scope are included at no extra cost.",
	},
	{
		num: "03",
		icon: RiTimeLine,
		title: "Flexible timelines",
		desc: "Rush delivery is available for projects with tight deadlines, with adjusted pricing.",
	},
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
		<div className="pricing-package-card">
			<div className="pricing-package-card-top">
				<div className="pricing-package-card-icon">
					<IconComp size={22} />
				</div>
				<h3 className="pricing-package-card-title">{title}</h3>
				<p className="pricing-package-card-price">
					from <strong>${fromPrice.toLocaleString()}</strong>
					{priceLabel && (
						<span className="pricing-package-price-label">{priceLabel}</span>
					)}
				</p>
			</div>
			<ul className="pricing-package-card-list">
				{items.map((item, i) => (
					<li key={i} className="pricing-package-card-item">
						<RiCheckLine size={14} className="pricing-package-check-icon" />
						<span>{item}</span>
					</li>
				))}
			</ul>
			<Link to={exploreUrl} className="pricing-package-explore-btn">
				Explore
				<RiArrowRightLine size={15} />
			</Link>
		</div>
	);
}

function ComparisonTable({ services }) {
	return (
		<div className="pricing-comparison-table-wrapper">
			<table className="pricing-comparison-table">
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

export default function Pricing() {
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
				<section className="pricing-hero">
					<div className="pricing-hero-content">
						<div className="pricing-hero-left">
							<span className="pricing-hero-badge">Transparent Pricing</span>
							<h1 className="pricing-hero-title">
								Quality Work,
								<br />
								<span>Honest Pricing</span>
							</h1>
							<p className="pricing-hero-description">
								No surprise invoices. No bloated retainers. Every project is
								scoped individually so you pay for exactly what you need —
								nothing more.
							</p>
						</div>
						<div className="pricing-hero-right">
							<SignHere className="pricing-hero-svg" aria-hidden="true" />
						</div>
					</div>
				</section>

				<section className="pricing-model-section">
					<div className="pricing-model-container">
						<div className="pricing-model-left">
							<h2 className="pricing-model-title">How We Charge</h2>
							<p className="pricing-model-text">
								We do not offer rigid monthly plans. Instead, each project is
								scoped individually based on your goals, complexity, and
								timeline. You get a clear estimate before any work begins.
							</p>
							<p className="pricing-model-text">
								Prices listed are starting points. Final quotes depend on scope,
								integrations, and turnaround requirements.
							</p>
						</div>
						<div className="pricing-model-right">
							<div className="pricing-timeline">
								{MODEL_ITEMS.map(({ num, icon: Icon, title, desc }, i) => {
									const side = i % 2 === 0 ? "left" : "right";
									return (
										<div
											key={num}
											className="pricing-timeline-row"
											data-side={side}
										>
											{side === "left" ? (
												<>
													<div className="pricing-timeline-card">
														<span className="pricing-timeline-card-num">
															{num}
														</span>
														<div className="pricing-timeline-card-icon-wrapper">
															<Icon size={18} />
														</div>
														<h4 className="pricing-timeline-card-title">
															{title}
														</h4>
														<p className="pricing-timeline-card-desc">{desc}</p>
													</div>
													<div className="pricing-timeline-dot" />
													<div />
												</>
											) : (
												<>
													<div />
													<div className="pricing-timeline-dot" />
													<div className="pricing-timeline-card">
														<span className="pricing-timeline-card-num">
															{num}
														</span>
														<div className="pricing-timeline-card-icon-wrapper">
															<Icon size={18} />
														</div>
														<h4 className="pricing-timeline-card-title">
															{title}
														</h4>
														<p className="pricing-timeline-card-desc">{desc}</p>
													</div>
												</>
											)}
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</section>

				<section className="pricing-packages-section">
					<div className="pricing-packages-inner">
						<div className="pricing-packages-header">
							<h2 className="pricing-packages-title">Our Packages</h2>
							<p className="pricing-packages-desc">
								Choose the category that fits your needs. Each package includes
								everything listed - and we can bundle services for a better
								deal.
							</p>
						</div>
						<div className="pricing-packages-grid">
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

				<section className="pricing-comparison-section">
					<div className="pricing-comparison-inner">
						<h2 className="pricing-comparison-title">Service Breakdown</h2>
						<div className="pricing-comparison-tabs">
							{COMPARISON_TABS.map((tab) => (
								<button
									key={tab}
									type="button"
									className="pricing-comparison-tab"
									data-active={activeTab === tab ? "true" : "false"}
									onClick={() => setActiveTab(tab)}
								>
									{tab}
								</button>
							))}
						</div>
						{loading ? (
							<p className="pricing-comparison-loading">Loading services…</p>
						) : (
							<ComparisonTable services={comparisonServices} />
						)}
					</div>
				</section>

				<section className="pricing-process-section">
					<div className="pricing-process-inner">
						<h2 className="pricing-process-title">How We Work</h2>
						<div className="pricing-process-steps">
							{PROCESS_STEPS.map(({ icon: Icon, title, description }, i) => (
								<div key={i} className="pricing-process-step">
									<div className="pricing-process-step-number">{i + 1}</div>
									<div className="pricing-process-step-icon">
										<Icon size={24} />
									</div>
									<h3 className="pricing-process-step-title">{title}</h3>
									<p className="pricing-process-step-desc">{description}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className="pricing-philosophy-section">
					<div className="pricing-philosophy-container">
						<div className="pricing-philosophy-left">
							<h2 className="pricing-philosophy-title">Why Pricing Varies</h2>
						</div>
						<div className="pricing-philosophy-right">
							<p className="pricing-philosophy-text">
								Each project is different. A single-page website is not the same
								as a full e-commerce platform — and a logo for a startup does
								not carry the same requirements as a rebrand for an established
								company.
							</p>
							<p className="pricing-philosophy-text">
								Pricing depends on complexity, features, integrations, and
								timeline. We factor in the number of revision rounds, the
								technical stack required, and the level of custom design work
								involved.
							</p>
							<p className="pricing-philosophy-text">
								Our estimates are always transparent. We will never start work
								without agreement on scope and cost.
							</p>
						</div>
					</div>
				</section>

				<section className="pricing-cta-section">
					<div className="pricing-cta-inner">
						<h2 className="pricing-cta-title">Ready to Get Started?</h2>
						<p className="pricing-cta-description">
							Tell us about your project and we will send you a tailored quote
							within one business day.
						</p>
						<Link to="/onboarding" className="pricing-cta-button">
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
