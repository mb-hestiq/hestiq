import { useState } from "react";
import { Link } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { FaArrowRight, FaChevronDown } from "react-icons/fa6";

const faqs = [
	{
		q: "How do you handle project timelines?",
		a: "We provide clear estimates based on project scope and maintain regular communication to ensure deadlines are met.",
	},
	{
		q: "How do you price your services?",
		a: "Pricing depends on project complexity, technology requirements, and scope. We provide detailed proposals before starting. A base or minimum estimated price for each service is also calculated and displayed during ordering or on the Prices page.",
	},
	{
		q: "Can I request changes during development?",
		a: "Yes. We work iteratively, allowing clients to review progress and request adjustments within agreed-upon scope.",
	},
	{
		q: "What is your process for UI/UX design?",
		a: "We start with research, wireframes, and prototypes before final designs, ensuring usability and alignment with goals.",
	},
	{
		q: "Will my product be scalable in the future?",
		a: "Yes. All systems are built with modular, maintainable code to support growth and evolving requirements.",
	},
	{
		q: "Do you provide hosting or deployment services?",
		a: "Yes, we can deploy web and application projects and provide guidance on hosting options.",
	},
	{
		q: "How do you ensure security in your projects?",
		a: "We follow best practices for authentication, data handling, and infrastructure security tailored to each project.",
	},
	{
		q: "Can you integrate third-party tools or APIs?",
		a: "Yes. We can connect your product with existing services, APIs, and other systems as needed.",
	},
	{
		q: "Do you offer ongoing support after launch?",
		a: "Yes. We provide maintenance, updates, and troubleshooting to ensure long-term stability.",
	},
	{
		q: "How do you handle intellectual property?",
		a: "All project IP is transferred to the client unless otherwise agreed, ensuring full ownership of your product.",
	},
	{
		q: "What kind of clients do you work with?",
		a: "We work with startups, growing companies, established businesses, and individual clients across various industries.",
	},
	{
		q: "How do you communicate during a project?",
		a: "Clients receive regular updates via email, calls, or project management tools, depending on preference.",
	},
	{
		q: "Can you improve an existing product?",
		a: "Yes. We analyze existing systems to optimize performance, usability, and maintainability.",
	},
	{
		q: "What technologies do you specialize in?",
		a: "We specialize in modern web and mobile technologies, including React, Vue, Node.js, Electron, and TypeScript, as well as scalable backend solutions like Express and MongoDB. The technology stack is chosen to match project needs, ensuring reliability, performance, and long-term maintainability.",
	},
	{
		q: "How do I get started with HestiQ?",
		a: "Share your project goals and requirements, and we will guide you through planning, design, and development steps.",
	},
];

function FaqItem({ question, answer, index }) {
	const [open, setOpen] = useState(false);

	return (
		<div className={`faq-item${open ? " faq-item-open" : ""}`}>
			<button
				className="faq-item-trigger"
				onClick={() => setOpen((o) => !o)}
				aria-expanded={open}
			>
				<span className="faq-item-index">{String(index).padStart(2, "0")}</span>
				<span className="faq-item-question">{question}</span>
				<FaChevronDown className="faq-item-chevron" aria-hidden="true" />
			</button>
			{open && (
				<div className="faq-item-answer" role="region">
					<p>{answer}</p>
				</div>
			)}
		</div>
	);
}

export default function FAQ() {
	return (
		<>
			<Header />
			<main className="faq-page">
				<div className="contact-page-shell">
					<section className="faq-hero" aria-labelledby="faq-title">
						<p className="contact-page-eyebrow">FAQ</p>
						<h1 id="faq-title" className="faq-hero-title">
							Answers to common questions.
						</h1>
						<p className="faq-hero-description">
							Everything you need to know about working with HestiQ - from
							pricing and timelines to technology and support.
						</p>
					</section>

					<section className="faq-body" aria-label="Frequently asked questions">
						<div className="faq-list">
							{faqs.map((item, i) => (
								<FaqItem
									key={i}
									index={i + 1}
									question={item.q}
									answer={item.a}
								/>
							))}
						</div>

						<div className="contact-info-faq-card faq-cta">
							<div>
								<p className="contact-info-faq-title">Still have questions?</p>
								<p className="contact-info-faq-text">
									Our team is ready to help with anything not covered here.
								</p>
							</div>
							<Link
								to="/contact"
								state={{ scrollToTop: true }}
								className="cta contact-info-faq-link"
							>
								Contact us <FaArrowRight aria-hidden="true" />
							</Link>
						</div>
					</section>
				</div>
			</main>
			<Footer />
		</>
	);
}
