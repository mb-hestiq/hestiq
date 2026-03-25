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
import { backendUrl } from "../../shared/company.js";

const channelIcons = {
	email: FaEnvelope,
	phone: FaPhone,
	address: FaLocationDot,
};

export default function ContactPage() {
	const address = contacts.find((channel) => channel.id === "address");

	return (
		<>
			<Header />
			<main className="ContactPage">
				<section
					className="ContactPageHero"
					aria-labelledby="contact-page-title"
				>
					<div className="ContactPageShell">
						<div className="ContactPageHeroCard">
							<div className="ContactPageHeroContent">
								<p className="ContactPageEyebrow">Contact</p>
								<h1 id="contact-page-title" className="ContactPageTitle">
									Start the conversation with the HestiQ team.
								</h1>
								<p className="ContactPageDescription">
									Reach out directly or send a detailed request through the
									contact form. We handle design, development, and product
									questions from one place.
								</p>
							</div>
							<div
								className="ContactPageHeroMeta"
								aria-label="Contact highlights"
							>
								<div className="ContactPageHeroMetric">
									<span className="ContactPageHeroMetricLabel">
										Response window
									</span>
									<strong className="ContactPageHeroMetricValue">
										Within an hour
									</strong>
								</div>
								<div className="ContactPageHeroMetric">
									<span className="ContactPageHeroMetricLabel">
										Best fit for
									</span>
									<strong className="ContactPageHeroMetricValue">
										Projects, partnerships, and support
									</strong>
								</div>
								<div className="ContactPageHeroMetric">
									<span className="ContactPageHeroMetricLabel">
										Contact channels
									</span>
									<strong className="ContactPageHeroMetricValue">
										Email, phone, and guided inquiry form
									</strong>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="ContactPageSection">
					<div className="ContactPageShell ContactPageContentGrid">
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
							className="ContactPageForm"
						/>
					</div>
				</section>

				{address ? (
					<section className="ContactPageSection ContactPageSectionSecondary">
						<div className="ContactPageShell ContactPageMapGrid">
							<MapEmbed title="Find us on the map" src={address.href} />
							<aside className="ContactPageVisitCard">
								<h2 className="ContactPageVisitTitle">Visits by appointment</h2>
								<p className="ContactPageVisitDescription">
									If you prefer to meet in person, use the contact form first so
									we can prepare the right people and materials before the
									conversation.
								</p>
								<address className="ContactPageVisitAddress">
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
		<section className="ContactMapCard" aria-labelledby="contact-map-title">
			<div className="ContactMapHeader">
				<h2 id="contact-map-title" className="ContactMapTitle">
					{title}
				</h2>
				<p className="ContactMapDescription">
					Use the embedded map to get orientation before your appointment.
				</p>
			</div>
			<div className="ContactMapFrame">
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
		<section className="ContactInfoPanel" aria-labelledby="contact-info-title">
			<div className="ContactInfoPanelHeader">
				<h2 id="contact-info-title" className="ContactInfoPanelTitle">
					{title}
				</h2>
				<p className="ContactInfoPanelDescription">{description}</p>
			</div>
			<div className="ContactInfoList">
				{items.map((item) => (
					<InfoItem key={item.id} item={item} />
				))}
			</div>
			<div className="ContactInfoFaqCard">
				<div>
					<h3 className="ContactInfoFaqTitle">Prefer a faster answer?</h3>
					<p className="ContactInfoFaqText">
						Review the most common questions before reaching out.
					</p>
				</div>
				<Link
					to="/faq"
					state={{ scrollToTop: true }}
					className="CTA ContactInfoFaqLink"
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
		<article className="ContactInfoItem">
			<div className="ContactInfoItemIcon" aria-hidden="true">
				<Icon />
			</div>
			<div className="ContactInfoItemContent">
				<a className="ContactInfoItemLink" href={item.href}>
					{item.value}
				</a>
				<p className="ContactInfoItemDescription">{item.description}</p>
			</div>
		</article>
	);
}
