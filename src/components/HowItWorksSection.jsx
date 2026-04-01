import React from "react";
import StepLaunchSVG from "../assets/images/process/step-launch.svg?react";
import StepBuildSVG from "../assets/images/process/step-build.svg?react";
import StepDiscoverSVG from "../assets/images/process/step-discover.svg?react";
import StepPlanningSVG from "../assets/images/process/step-planning.svg?react";

export default function HowItWorksSection() {
	return (
		<div className="how-it-works-section">
			<h1 className="section-title">How it Works</h1>
			<div className="step-container">
				<ol className="steps-list">
					<li className="step-item">
						<StepCard
							title="Discovery"
							description="We start by understanding your business goals, target audience, and constraints to ensure we’re solving the right problem from day one."
							image={<StepDiscoverSVG />}
						/>
					</li>
					<li className="step-item">
						<StepCard
							title="Planning"
							description="We define the structure, features, and technical approach, creating a clear roadmap that aligns scope, timeline, and expectations."
							image={<StepPlanningSVG />}
						/>
					</li>
					<li className="step-item">
						<StepCard
							title="Build"
							description="We design and develop the solution iteratively, sharing progress and refining details to deliver a high-quality, scalable result."
							image={<StepBuildSVG />}
						/>
					</li>
					<li className="step-item">
						<StepCard
							title="Launch"
							description="We thoroughly test, deploy, and support the final product, ensuring a smooth release and long-term stability."
							image={<StepLaunchSVG />}
						/>
					</li>
				</ol>
			</div>
		</div>
	);
}

export function StepCard({ title, description, image }) {
	return (
		<div className="step-card">
			<div className="step-card-image hidden md:flex">{image}</div>
			<div className="step-card-text">
				<h3 className="step-card-title">{title}</h3>
				<p className="step-card-description">{description}</p>
			</div>
		</div>
	);
}
