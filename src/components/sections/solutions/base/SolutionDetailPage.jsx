import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Card from "../../../elements/cards/base/Card";
import PrimaryHeroSection from "../../hero/PrimaryHeroSection";

function renderParagraphs(content, className) {
	if (Array.isArray(content)) {
		return content.map((paragraph) => (
			<p key={paragraph} className={className}>
				{paragraph}
			</p>
		));
	}

	return <p className={className}>{content}</p>;
}

export default function SolutionDetailPage({
	heroId,
	heroEyebrow,
	heroTitle,
	heroSubtitle,
	heroAction,
	heroVariant = "default",
	problemId,
	problemTitle,
	problemDescription,
	painPoints,
	painPointsAriaLabel,
	painPointVariant = "compact",
	methodologyId,
	methodologyTitle,
	methodologyDescription,
	steps,
	stepsAriaLabel,
	servicesId,
	servicesTitle,
	servicesAriaLabel,
	services,
	servicesCardClassName = "card-surface-muted",
	benefitsId,
	benefitsTitle,
	benefitsDescription,
	benefitsAriaLabel,
	benefits,
	benefitsVariant = "stacked",
	benefitsAction,
	ctaId,
	ctaTitle,
	ctaSubtitle,
	ctaAction,
}) {
	const heroClassName = [
		"solution-hero",
		heroVariant === "wide-title" ? "solution-hero-wide-title" : "",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<>
			<Header />
			<main className="solution-page">
				<PrimaryHeroSection
					id={heroId}
					className={heroClassName}
					patternClassName="solution-hero-pattern"
					eyebrow={heroEyebrow}
					title={heroTitle}
					subtitle={heroSubtitle}
					actions={heroAction}
				/>

				<section
					className="solution-section solution-problem"
					aria-labelledby={problemId}
				>
					<div className="solution-shell">
						<div className="solution-problem-grid">
							<div className="solution-problem-content">
								<p className="solution-section-eyebrow">The Challenge</p>
								<h2 id={problemId} className="solution-section-title">
									{problemTitle}
								</h2>
								{renderParagraphs(
									problemDescription,
									"solution-section-description",
								)}
							</div>
							<div
								className="solution-pain-points"
								data-variant={painPointVariant}
								aria-label={painPointsAriaLabel}
							>
								{painPoints.map(({ icon: Icon, label, description }) => (
									<div className="solution-pain-point" key={label}>
										<div
											className="solution-pain-point-icon"
											aria-hidden="true"
										>
											<Icon />
										</div>
										<div className="solution-pain-point-body">
											<span className="solution-pain-point-label">{label}</span>
											{description ? (
												<span className="solution-pain-point-description">
													{description}
												</span>
											) : null}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<section
					className="solution-section solution-section-alt"
					aria-labelledby={methodologyId}
				>
					<div className="solution-shell">
						<div className="solution-section-header solution-section-header-centered">
							<p className="solution-section-eyebrow">Our Methodology</p>
							<h2 id={methodologyId} className="solution-section-title">
								{methodologyTitle}
							</h2>
							{methodologyDescription ? (
								<p className="solution-section-description">
									{methodologyDescription}
								</p>
							) : null}
						</div>
						<ol
							className="solution-steps-grid"
							data-columns={steps.length}
							aria-label={stepsAriaLabel}
						>
							{steps.map(({ number, icon: Icon, title, description }) => (
								<Card
									as="li"
									className="solution-step card-surface-muted"
									key={number}
								>
									<div className="solution-step-head">
										<span className="solution-step-number" aria-hidden="true">
											{number}
										</span>
										<div
											className="solution-step-icon-wrapper"
											aria-hidden="true"
										>
											<Icon />
										</div>
									</div>
									<div className="solution-step-body">
										<h3 className="solution-step-title">{title}</h3>
										<p className="solution-step-description">{description}</p>
									</div>
								</Card>
							))}
						</ol>
					</div>
				</section>

				<section className="solution-section" aria-labelledby={servicesId}>
					<div className="solution-shell">
						<div className="solution-section-header solution-section-header-centered">
							<p className="solution-section-eyebrow">What We Deliver</p>
							<h2 id={servicesId} className="solution-section-title">
								{servicesTitle}
							</h2>
						</div>
						<ul
							className="solution-services-grid"
							aria-label={servicesAriaLabel}
						>
							{services.map(({ icon: Icon, title, description }) => (
								<Card
									as="li"
									className={`solution-service-card ${servicesCardClassName}`.trim()}
									key={title}
								>
									<div
										className="solution-service-icon-wrapper"
										aria-hidden="true"
									>
										<Icon />
									</div>
									<h3 className="solution-service-title">{title}</h3>
									<p className="solution-service-description">{description}</p>
								</Card>
							))}
						</ul>
					</div>
				</section>

				<section
					className={`solution-section ${benefitsVariant === "split" ? "solution-benefits" : "solution-section-alt"}`}
					aria-labelledby={benefitsId}
				>
					<div className="solution-shell">
						{benefitsVariant === "split" ? (
							<div className="solution-benefits-grid" data-variant="split">
								<div className="solution-benefits-intro">
									<p className="solution-section-eyebrow">Why HestiQ</p>
									<h2 id={benefitsId} className="solution-section-title">
										{benefitsTitle}
									</h2>
									{renderParagraphs(
										benefitsDescription,
										"solution-section-description",
									)}
									{benefitsAction}
								</div>
								<ul
									className="solution-benefits-list"
									aria-label={benefitsAriaLabel}
								>
									{benefits.map(({ icon: Icon, title, description }) => (
										<li className="solution-benefit" key={title}>
											<div
												className="solution-benefit-icon-wrapper"
												aria-hidden="true"
											>
												<Icon />
											</div>
											<div className="solution-benefit-content">
												<h3 className="solution-benefit-title">{title}</h3>
												<p className="solution-benefit-description">
													{description}
												</p>
											</div>
										</li>
									))}
								</ul>
							</div>
						) : (
							<>
								<div className="solution-section-header solution-section-header-centered">
									<p className="solution-section-eyebrow">Why HestiQ</p>
									<h2 id={benefitsId} className="solution-section-title">
										{benefitsTitle}
									</h2>
									{benefitsDescription ? (
										<p className="solution-section-description">
											{benefitsDescription}
										</p>
									) : null}
								</div>
								<ul
									className="solution-benefits-grid"
									data-variant="stacked"
									aria-label={benefitsAriaLabel}
								>
									{benefits.map(({ icon: Icon, title, description }) => (
										<li className="solution-benefit" key={title}>
											<div
												className="solution-benefit-icon-wrapper"
												aria-hidden="true"
											>
												<Icon />
											</div>
											<div className="solution-benefit-content">
												<h3 className="solution-benefit-title">{title}</h3>
												<p className="solution-benefit-description">
													{description}
												</p>
											</div>
										</li>
									))}
								</ul>
								{benefitsAction ? (
									<div className="solution-benefits-action-row">
										{benefitsAction}
									</div>
								) : null}
							</>
						)}
					</div>
				</section>

				<section className="solution-cta-section" aria-labelledby={ctaId}>
					<div className="solution-shell solution-cta-content">
						<h2 id={ctaId} className="solution-cta-title">
							{ctaTitle}
						</h2>
						<p className="solution-cta-subtitle">{ctaSubtitle}</p>
						{ctaAction}
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
