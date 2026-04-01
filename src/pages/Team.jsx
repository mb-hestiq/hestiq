import { useState, useMemo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTeam } from "../utils/teamCache";
import backendUrl from "../utils/backend";

const ALL_TAGS = ["all", "management", "design", "development", "marketing"];

const TAG_LABELS = {
	all: "All",
	management: "Management",
	design: "Design",
	development: "Development",
	marketing: "Marketing",
};

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

export default function Team() {
	const { members, loading } = useTeam();
	const [activeTag, setActiveTag] = useState("all");

	const availableTags = useMemo(() => {
		const used = new Set(members.flatMap((m) => m.tags ?? []));
		return ALL_TAGS.filter((t) => t === "all" || used.has(t));
	}, [members]);

	const filtered = useMemo(() => {
		if (activeTag === "all") return members;
		return members.filter(
			(m) => Array.isArray(m.tags) && m.tags.includes(activeTag),
		);
	}, [members, activeTag]);

	return (
		<>
			<Header />
			<main className="team-page">
				<section className="team-hero" aria-labelledby="team-page-title">
					<div className="team-shell">
						<p className="contact-page-eyebrow">Our Team</p>
						<h1 id="team-page-title" className="team-hero-title">
							The people behind the work.
						</h1>
						<p className="team-hero-description">
							A focused team of designers, developers, and strategists who care
							deeply about craft and outcomes.
						</p>
					</div>
				</section>

				<section className="team-body" aria-label="Team members">
					<div className="team-shell">
						{availableTags.length > 1 && (
							<div
								className="team-filter-tabs"
								role="tablist"
								aria-label="Filter by department"
							>
								{availableTags.map((tag) => (
									<button
										key={tag}
										role="tab"
										aria-selected={activeTag === tag}
										className={`team-filter-tab${activeTag === tag ? " team-filter-tab-active" : ""}`}
										onClick={() => setActiveTag(tag)}
									>
										{TAG_LABELS[tag]}
									</button>
								))}
							</div>
						)}

						<div className="team-grid">
							{loading
								? Array.from({ length: 6 }).map((_, i) => (
										<SkeletonCard key={i} />
									))
								: filtered.map((member) => (
										<MemberCard key={member._id} member={member} />
									))}
						</div>

						{!loading && filtered.length === 0 && (
							<p className="team-empty">
								No team members found in this category.
							</p>
						)}
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
