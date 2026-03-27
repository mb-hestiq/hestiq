import React from "react";
import { Outlet } from "react-router";

export default function Designer() {
	return (
		<main>
			<section className="steps">
				<header>
					<div>
						<h2>Steps</h2>
						<span>10/10 Completed</span>
					</div>
					<div className="progress-bar"></div>
				</header>

				<div className="step-list-container"></div>
			</section>
			<section className="designs">
				<header>
					<span className="step-count">Step 1 out of 10</span>
					<h2>Choose a Header</h2>
					<span>Select a header style that matches your brand.</span>
				</header>
				<Outlet />
				<footer>
					<button className="back"></button>
					<div className="group">
						<button className="skip"></button>
						<button className="add"></button>
					</div>
				</footer>
			</section>
			<section className="review">
				<h3>Review & Recommendations</h3>
				<section className="overall-score"></section>
				<section className="recommendations"></section>
				<section className="included"></section>
			</section>
		</main>
	);
}

//#region Designs
export function HeaderDesigns() {}
export function HeroDesigns() {}
export function FooterDesigns() {}
export function ContactFormDesigns() {}
export function CTADesigns() {}
export function AccordionDesigns() {}
export function ContentCardDesigns() {}
export function GalleryDesigns() {}
export function PricingDesigns() {}
export function TestimonialDesigns() {}
//#endregion
