import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import contacts from "../../shared/contacts.js";
import { Link } from "react-router";
import {
	FaArrowRight,
	FaEnvelope,
	FaLocationDot,
	FaPhone,
} from "react-icons/fa6";
import backendUrl from "../utils/backend.js";

const channelIcons = {
	email: FaEnvelope,
	phone: FaPhone,
	address: FaLocationDot,
};

export default function Contact() {
	const address = contacts.find((channel) => channel.id === "address");

	return (
		<>
			<Header />
			<main className="contact-page">
				<section
					className="contact-page-hero"
					aria-labelledby="contact-page-title"
				>
					<div className="contact-page-shell">
						<div className="contact-page-hero-card">
							<div className="contact-page-hero-content">
								<p className="contact-page-eyebrow">Contact</p>
								<h1 id="contact-page-title" className="contact-page-title">
									Start the conversation with the HestiQ team.
								</h1>
								<p className="contact-page-description">
									Reach out directly or send a detailed request through the
									contact form. We handle design, development, and product
									questions from one place.
								</p>
							</div>
							<div
								className="contact-page-hero-meta"
								aria-label="Contact highlights"
							>
								<div className="contact-page-hero-metric">
									<span className="contact-page-hero-metric-label">
										Response window
									</span>
									<strong className="contact-page-hero-metric-value">
										Within an hour
									</strong>
								</div>
								<div className="contact-page-hero-metric">
									<span className="contact-page-hero-metric-label">
										Best fit for
									</span>
									<strong className="contact-page-hero-metric-value">
										Projects, partnerships, and support
									</strong>
								</div>
								<div className="contact-page-hero-metric">
									<span className="contact-page-hero-metric-label">
										Contact channels
									</span>
									<strong className="contact-page-hero-metric-value">
										Email, phone, and guided inquiry form
									</strong>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="contact-page-section">
					<div className="contact-page-shell contact-page-content-grid">
						<InfoPanel
							title="Reach us directly"
							description="Choose the contact method that matches your situation. The form is best for detailed project briefs, while the direct channels work well for quick questions."
							items={contacts}
						/>
						<ContactForm
							endpoint={`${backendUrl}/contact`}
							title="Send a message"
							description="Share your goals, scope, timeline, or any blockers so we can respond with the right next step."
							submitLabel="Send message"
							successMessage="Your message has been sent. We will get back to you soon."
							className="contact-page-form"
						/>
					</div>
				</section>

				{address ? (
					<section className="contact-page-section contact-page-section-secondary">
						<div className="contact-page-shell contact-page-map-grid">
							<MapEmbed title="Find us on the map" src={address.href} />
							<aside className="contact-page-visit-card">
								<h2 className="contact-page-visit-title">
									Visits by appointment
								</h2>
								<p className="contact-page-visit-description">
									If you prefer to meet in person, use the contact form first so
									we can prepare the right people and materials before the
									conversation.
								</p>
								<address className="contact-page-visit-address">
									{address.value}
								</address>
							</aside>
						</div>
					</section>
				) : null}
			</main>
			<Footer />
		</>
	);
}

function MapEmbed({ title, src }) {
	return (
		<section className="contact-map-card" aria-labelledby="contact-map-title">
			<div className="contact-map-header">
				<h2 id="contact-map-title" className="contact-map-title">
					{title}
				</h2>
				<p className="contact-map-description">
					Use the embedded map to get orientation before your appointment.
				</p>
			</div>
			<div className="contact-map-frame">
				<iframe
					title={title}
					src={src + "&output=embed"}
					loading="lazy"
					allowFullScreen
					referrerPolicy="no-referrer-when-downgrade"
				/>
			</div>
		</section>
	);
}

function InfoPanel({ title, description, items }) {
	return (
		<section
			className="contact-info-panel"
			aria-labelledby="contact-info-title"
		>
			<div className="contact-info-panel-header">
				<h2 id="contact-info-title" className="contact-info-panel-title">
					{title}
				</h2>
				<p className="contact-info-panel-description">{description}</p>
			</div>
			<div className="contact-info-list">
				{items.map((item) => (
					<InfoItem key={item.id} item={item} />
				))}
			</div>
			<div className="contact-info-faq-card">
				<div>
					<h3 className="contact-info-faq-title">Prefer a faster answer?</h3>
					<p className="contact-info-faq-text">
						Review the most common questions before reaching out.
					</p>
				</div>
				<Link
					to="/faq"
					state={{ scrollToTop: true }}
					className="cta contact-info-faq-link"
				>
					<span>Go to FAQ</span>
					<FaArrowRight />
				</Link>
			</div>
		</section>
	);
}

function InfoItem({ item }) {
	const Icon = channelIcons[item.id] ?? FaEnvelope;

	return (
		<article className="contact-info-item">
			<div className="contact-info-item-icon" aria-hidden="true">
				<Icon />
			</div>
			<div className="contact-info-item-content">
				<a className="contact-info-item-link" href={item.href}>
					{item.value}
				</a>
				<p className="contact-info-item-description">{item.description}</p>
			</div>
		</article>
	);
}
