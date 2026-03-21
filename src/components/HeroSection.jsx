import React from "react";
import { Link } from "react-router";
import DesignerHuman from "../assets/designer-human.svg?react";
import Wave from "../assets/wave.svg?react";

export default function HeroSection() {
	return (
		<div className="HeroSection">
			<Wave className="Wave" />
			<div className="HeroContent">
				<div className="HeroLeftContent">
					<h1 className="HeroTitle">
						Design & <span>Development</span>, Done Right.
					</h1>
					<p className="HeroDescription">
						We build clear, scalable digital products by combining thoughtful
						design with solid engineering.
					</p>
					<Link className="CTA HeroAction" to="/onboarding">
						Get Started
					</Link>
				</div>
				<div className="HeroRightContent">
					<DesignerHuman className="hidden md:flex" />
				</div>
			</div>
		</div>
	);
}
