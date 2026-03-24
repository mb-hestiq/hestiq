import { useState, useMemo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTeam } from "../utils/teamCache";
import { backendUrl } from "../../shared/company";

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

export default function TeamPage() {
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
			<main className="TeamPage">
				<section className="TeamHero" aria-labelledby="team-page-title">
					<div className="TeamShell">
						<p className="ContactPageEyebrow">Our Team</p>
						<h1 id="team-page-title" className="TeamHeroTitle">
							The people behind the work.
						</h1>
						<p className="TeamHeroDescription">
							A focused team of designers, developers, and strategists who care
							deeply about craft and outcomes.
						</p>
					</div>
				</section>

				<section className="TeamBody" aria-label="Team members">
					<div className="TeamShell">
						{availableTags.length > 1 && (
							<div
								className="TeamFilterTabs"
								role="tablist"
								aria-label="Filter by department"
							>
								{availableTags.map((tag) => (
									<button
										key={tag}
										role="tab"
										aria-selected={activeTag === tag}
										className={`TeamFilterTab${activeTag === tag ? " TeamFilterTabActive" : ""}`}
										onClick={() => setActiveTag(tag)}
									>
										{TAG_LABELS[tag]}
									</button>
								))}
							</div>
						)}

						<div className="TeamGrid">
							{loading
								? Array.from({ length: 6 }).map((_, i) => (
										<SkeletonCard key={i} />
									))
								: filtered.map((member) => (
										<MemberCard key={member._id} member={member} />
									))}
						</div>

						{!loading && filtered.length === 0 && (
							<p className="TeamEmpty">
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
