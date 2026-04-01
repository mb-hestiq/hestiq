import React from "react";
import HeroSection from "./base/HeroSection";

export default function FullHeroSection(props) {
	const { className = "", ...rest } = props;
	return (
		<HeroSection
			{...rest}
			className={`full-hero-section ${className}`.trim()}
		/>
	);
}
