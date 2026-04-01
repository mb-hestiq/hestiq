import React from "react";
import { Link } from "react-router";
import DesignerHuman from "../assets/images/illustrations/designer-human.svg?react";
import Wave from "../assets/images/illustrations/wave.svg?react";

export default function HeroSection() {
	return (
		<div className="hero-section-landing">
			<Wave className="hero-wave" />
			<div className="hero-content">
				<div className="hero-left-content">
					<h1 className="hero-title">
						Design & <span>Development</span>, Done Right.
					</h1>
					<p className="hero-description">
						We build clear, scalable digital products by combining thoughtful
						design with solid engineering.
					</p>
					<Link className="cta hero-action" to="/onboarding">
						Get Started
					</Link>
				</div>
				<div className="hero-right-content">
					<DesignerHuman className="hidden md:flex" />
				</div>
			</div>
		</div>
	);
}
