import { useMemo } from "react";
import { Link } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookConsultationSection from "../components/BookConsultationSection";
import { useTeam } from "../utils/teamCache";
import backendUrl from "../utils/backend";
import services from "../../shared/services.js";
import {
	FaPaintbrush,
	FaCode,
	FaBullseye,
	FaLightbulb,
	FaHandshake,
	FaStar,
	FaArrowRight,
	FaCircleCheck,
} from "react-icons/fa6";

const VALUES = [
	{
		icon: FaLightbulb,
		title: "Clarity First",
		description:
			"Clear scope and direct communication from kickoff to delivery. No ambiguity, no surprises.",
	},
	{
		icon: FaBullseye,
		title: "Purposeful Craft",
		description:
			"Every design decision and line of code is tied to a specific function or outcome.",
	},
	{
		icon: FaHandshake,
		title: "Honest Collaboration",
		description:
			"Direct feedback, realistic timelines, and no overpromising at any stage of the project.",
	},
	{
		icon: FaStar,
		title: "Ownership Mindset",
		description:
			"We hold ourselves accountable to your goals as if the product were entirely our own.",
	},
];

const DIFFERENTIATORS = [
	"One team, full responsibility. No inter-agency handoffs",
	"Transparent pricing with no hidden costs",
	"Outcome-driven. Focused on results, not just deliverables",
	"Fast iteration with clearly defined scope at every step",
];

function MemberCard({ member }) {
	const imageUrl = member.image ? `${backendUrl}${member.image}` : null;

	return (
		<a
			href={`mailto:${member.email}`}
			className="team-member-card"
			aria-label={`Email ${member.name}`}
		>
			{imageUrl ? (
				<img
					src={imageUrl}
					alt={member.name}
					className="team-member-image"
					loading="lazy"
				/>
			) : (
				<div className="team-member-image-fallback" aria-hidden="true" />
			)}
			<div className="team-member-info">
				<span className="team-member-name">{member.name}</span>
				{member.title && (
					<span className="team-member-title">{member.title}</span>
				)}
			</div>
		</a>
	);
}

function SkeletonCard() {
	return (
		<div
			className="team-member-card team-member-card-skeleton"
			aria-hidden="true"
		/>
	);
}

export default function About() {
	const { members, loading } = useTeam();

	const teamPreview = useMemo(() => {
		if (loading) return [];
		const founders = members.filter(
			(m) => Array.isArray(m.tags) && m.tags.includes("management"),
		);
		return (founders.length > 0 ? founders : members).slice(0, 8);
	}, [loading, members]);

	const designServices = useMemo(
		() => services.filter((s) => s.category === "Design"),
		[],
	);

	const devServices = useMemo(
		() => services.filter((s) => s.category === "Development"),
		[],
	);

	return (
		<>
			<Header />
			<main className="about-page">
				<section className="about-story" aria-labelledby="about-story-title">
					<div className="about-shell">
						<div className="about-story-grid">
							<div className="about-story-content">
								<p className="contact-page-eyebrow">Our Story</p>
								<h2 id="about-story-title" className="about-section-title">
									Why we started.
								</h2>
								<p className="about-body-text">
									HestiQ was founded because too many promising ideas end up
									buried under slow processes, bloated agencies, and misaligned
									priorities. We built HestiQ to be different: small by design,
									precise in execution, and fully accountable to the people we
									work with.
								</p>
								<p className="about-body-text">
									We don't believe in disappearing behind project management
									layers or delegating across multiple vendors. From discovery
									to delivery, you work directly with the people doing the work.
								</p>
							</div>
							<div className="about-story-side">
								<div className="about-stat-card">
									<p className="contact-page-eyebrow">Mission</p>
									<p className="about-stat-card-text">
										We turn ideas into thoughtful digital experiences that feel
										simple, human, and purposeful.
									</p>
								</div>
								<div className="about-stat-card">
									<p className="contact-page-eyebrow">Vision</p>
									<p className="about-stat-card-text">
										A world where every business, regardless of size, has access
										to world-class design and engineering.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="about-offer" aria-labelledby="about-offer-title">
					<div className="about-shell">
						<div className="about-section-header">
							<p className="contact-page-eyebrow">What We Do</p>
							<h2 id="about-offer-title" className="about-section-title">
								Design & development, under one roof.
							</h2>
							<p className="about-section-description">
								We cover the full spectrum: from brand identity and visual
								design to full-stack web and mobile engineering.
							</p>
						</div>

						<div className="about-section-body">
							<div className="right about-section-paragraph">
								<p>
									Our integrated approach means your design and development
									teams are always in sync, working together from day one to
									create a cohesive product that looks great and functions
									flawlessly.
								</p>
								<p>
									We don’t treat design and engineering as separate phases.
									Every decision is made with both aesthetics and performance in
									mind, ensuring that what is envisioned can be built
									efficiently, and what is built delivers a refined user
									experience.
								</p>
								<p>
									From early discovery and wireframing to final deployment, we
									maintain a continuous feedback loop. This reduces friction,
									shortens timelines, and eliminates the common disconnect
									between visual intent and technical execution.
								</p>
								<p>
									Whether it’s crafting a brand identity, designing intuitive
									interfaces, or engineering scalable systems, our focus remains
									the same: delivering products that are not only visually
									compelling, but also robust, maintainable, and ready to grow
									with your business.
								</p>
							</div>
							<div className="left about-differentiators">
								{DIFFERENTIATORS.map((item, i) => (
									<div key={i} className="about-differentiator-item">
										<FaCircleCheck className="about-differentiator-icon" />
										<span>{item}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<section className="about-values" aria-labelledby="about-values-title">
					<div className="about-shell">
						<div className="about-section-header">
							<p className="contact-page-eyebrow">Our Values</p>
							<h2 id="about-values-title" className="about-section-title">
								How we work.
							</h2>
						</div>
						<div className="about-values-grid">
							{VALUES.map(({ icon: Icon, title, description }) => (
								<div key={title} className="about-value-card">
									<div className="about-value-card-icon">
										<Icon />
									</div>
									<h3 className="about-value-card-title">{title}</h3>
									<p className="about-value-card-description">{description}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className="about-team" aria-labelledby="about-team-title">
					<div className="about-shell">
						<div className="about-team-header">
							<div>
								<p className="contact-page-eyebrow">The Team</p>
								<h2 id="about-team-title" className="about-section-title">
									The people behind the work.
								</h2>
							</div>
							<Link to="/team" className="about-team-link">
								View full team <FaArrowRight className="inline-block text-xs" />
							</Link>
						</div>
						<div className="team-grid">
							{loading
								? Array.from({ length: 4 }).map((_, i) => (
										<SkeletonCard key={i} />
									))
								: teamPreview.map((member) => (
										<MemberCard key={member._id} member={member} />
									))}
						</div>
					</div>
				</section>

				<BookConsultationSection />
			</main>
			<Footer />
		</>
	);
}
