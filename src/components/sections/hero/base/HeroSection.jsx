import React from "react";
import "./HeroSection.css";

export default function HeroSection({
	className = "",
	pattern,
	eyebrow,
	title,
	subtitle,
	actions,
	media,
	id,
}) {
	return (
		<section
			className={`hero-section ${className}`.trim()}
			aria-labelledby={id}
		>
			{pattern}
			<div className="hero-section-content">
				<div className="hero-section-left">
					{eyebrow && <p className="hero-section-eyebrow">{eyebrow}</p>}
					<h1 id={id} className="hero-section-title">
						{title}
					</h1>
					{subtitle && <p className="hero-section-subtitle">{subtitle}</p>}
					{actions && <div className="hero-section-actions">{actions}</div>}
				</div>
				{media && <div className="hero-section-right">{media}</div>}
			</div>
		</section>
	);
}
