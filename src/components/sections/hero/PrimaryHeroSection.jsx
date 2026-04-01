import React from "react";
import HeroSection from "./base/HeroSection";

export default function PrimaryHeroSection(props) {
	const { className = "", patternClassName = "", pattern, ...rest } = props;
	const patternNode = pattern ?? (
		<div
			className={`primary-hero-pattern ${patternClassName}`.trim()}
			aria-hidden="true"
		/>
	);

	return (
		<HeroSection
			{...rest}
			className={`primary-hero-section ${className}`.trim()}
			pattern={patternNode}
		/>
	);
}
