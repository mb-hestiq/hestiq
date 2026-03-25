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
			className="TeamMemberCard"
			aria-label={`Email ${member.name}`}
		>
			{imageUrl ? (
				<img
					src={imageUrl}
					alt={member.name}
					className="TeamMemberImage"
					loading="lazy"
				/>
			) : (
				<div className="TeamMemberImageFallback" aria-hidden="true" />
			)}
			<div className="TeamMemberInfo">
				<span className="TeamMemberName">{member.name}</span>
				{member.title && (
					<span className="TeamMemberTitle">{member.title}</span>
				)}
			</div>
		</a>
	);
}

function SkeletonCard() {
	return (
		<div className="TeamMemberCard TeamMemberCardSkeleton" aria-hidden="true" />
	);
}

export default function AboutPage() {
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
			<main className="AboutPage">
				<section className="AboutStory" aria-labelledby="about-story-title">
					<div className="AboutShell">
						<div className="AboutStoryGrid">
							<div className="AboutStoryContent">
								<p className="ContactPageEyebrow">Our Story</p>
								<h2 id="about-story-title" className="AboutSectionTitle">
									Why we started.
								</h2>
								<p className="AboutBodyText">
									HestiQ was founded because too many promising ideas end up
									buried under slow processes, bloated agencies, and misaligned
									priorities. We built HestiQ to be different: small by design,
									precise in execution, and fully accountable to the people we
									work with.
								</p>
								<p className="AboutBodyText">
									We don't believe in disappearing behind project management
									layers or delegating across multiple vendors. From discovery
									to delivery, you work directly with the people doing the work.
								</p>
							</div>
							<div className="AboutStorySide">
								<div className="AboutStatCard">
									<p className="ContactPageEyebrow">Mission</p>
									<p className="AboutStatCardText">
										We turn ideas into thoughtful digital experiences that feel
										simple, human, and purposeful.
									</p>
								</div>
								<div className="AboutStatCard">
									<p className="ContactPageEyebrow">Vision</p>
									<p className="AboutStatCardText">
										A world where every business, regardless of size, has access
										to world-class design and engineering.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="AboutOffer" aria-labelledby="about-offer-title">
					<div className="AboutShell">
						<div className="AboutSectionHeader">
							<p className="ContactPageEyebrow">What We Do</p>
							<h2 id="about-offer-title" className="AboutSectionTitle">
								Design & development, under one roof.
							</h2>
							<p className="AboutSectionDescription">
								We cover the full spectrum: from brand identity and visual
								design to full-stack web and mobile engineering.
							</p>
						</div>

						<div className="AboutSectionBody">
							<div className="Right AboutSectionParagraph">
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
							<div className="Left AboutDifferentiators">
								{DIFFERENTIATORS.map((item, i) => (
									<div key={i} className="AboutDifferentiatorItem">
										<FaCircleCheck className="AboutDifferentiatorIcon" />
										<span>{item}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<section className="AboutValues" aria-labelledby="about-values-title">
					<div className="AboutShell">
						<div className="AboutSectionHeader">
							<p className="ContactPageEyebrow">Our Values</p>
							<h2 id="about-values-title" className="AboutSectionTitle">
								How we work.
							</h2>
						</div>
						<div className="AboutValuesGrid">
							{VALUES.map(({ icon: Icon, title, description }) => (
								<div key={title} className="AboutValueCard">
									<div className="AboutValueCardIcon">
										<Icon />
									</div>
									<h3 className="AboutValueCardTitle">{title}</h3>
									<p className="AboutValueCardDescription">{description}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className="AboutTeam" aria-labelledby="about-team-title">
					<div className="AboutShell">
						<div className="AboutTeamHeader">
							<div>
								<p className="ContactPageEyebrow">The Team</p>
								<h2 id="about-team-title" className="AboutSectionTitle">
									The people behind the work.
								</h2>
							</div>
							<Link to="/team" className="AboutTeamLink">
								View full team <FaArrowRight className="inline-block text-xs" />
							</Link>
						</div>
						<div className="TeamGrid">
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
