import { useState, useEffect, useRef, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WorkTime from "../assets/work-time.svg?react";
import {
	RiMapPinLine,
	RiTimeLine,
	RiMoneyDollarCircleLine,
	RiCodeSSlashLine,
	RiTeamLine,
	RiGlobalLine,
	RiHeartLine,
	RiAwardLine,
	RiRocketLine,
	RiFileTextLine,
	RiUserSearchLine,
	RiChatSmileLine,
	RiCheckboxCircleLine,
	RiCloseLine,
	RiLoader4Line,
	RiUploadLine,
} from "react-icons/ri";
import { backendUrl } from "../../shared/company";

const WHY_US = [
	{
		icon: RiRocketLine,
		title: "Shape Real Products",
		description:
			"Work on projects shipped to real users. No busywork, just meaningful outcomes.",
	},
	{
		icon: RiTeamLine,
		title: "Tight-Knit Team",
		description:
			"Small enough to know everyone, big enough to tackle ambitious problems.",
	},
	{
		icon: RiGlobalLine,
		title: "Remote First",
		description:
			"Work from anywhere. We care about output, not office attendance.",
	},
	{
		icon: RiCodeSSlashLine,
		title: "Modern Tech Stack",
		description:
			"React, Node.js, MongoDB - tools that align with industry best practices.",
	},
	{
		icon: RiHeartLine,
		title: "Work-Life Balance",
		description:
			"Flexible schedules, transparent expectations, and time off that is actually respected.",
	},
	{
		icon: RiAwardLine,
		title: "Grow With Us",
		description:
			"Mentorship, learning budget, and a culture that rewards curiosity over credentials.",
	},
];

const RECRUITMENT_STEPS = [
	{
		icon: RiFileTextLine,
		title: "Application Review",
		description:
			"We review every application carefully. If your profile is a match, you will hear from us within 5 business days.",
	},
	{
		icon: RiUserSearchLine,
		title: "Intro Call",
		description:
			"A 30-minute conversation with someone from our team to learn more about you and share what we are building.",
	},
	{
		icon: RiChatSmileLine,
		title: "Technical Interview",
		description:
			"A practical session relevant to the role - no trick questions. We want to see how you think and approach problems.",
	},
	{
		icon: RiCheckboxCircleLine,
		title: "Offer & Onboarding",
		description:
			"If it is a great fit on both sides, we move fast. You will get an offer, then a smooth onboarding experience.",
	},
];

const APPLICANT_STATUS_LABELS = {
	pending: "Pending",
	reviewing: "Reviewing",
	accepted: "Accepted",
	rejected: "Rejected",
};

let jobsCache = null;

function useJobs() {
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (jobsCache) {
			setJobs(jobsCache);
			setLoading(false);
			return;
		}
		fetch(`${backendUrl}/jobs`)
			.then((r) => r.json())
			.then((data) => {
				const list = data.success && Array.isArray(data.jobs) ? data.jobs : [];
				jobsCache = list;
				setJobs(list);
			})
			.catch(() => setJobs([]))
			.finally(() => setLoading(false));
	}, []);

	return { jobs, loading };
}

function ApplyModal({ job, onClose }) {
	const dialogRef = useRef(null);
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		message: "",
	});
	const [cvFile, setCvFile] = useState(null);
	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(null);
	const fileInputRef = useRef(null);

	useEffect(() => {
		dialogRef.current?.showModal();
	}, []);

	const handleClose = useCallback(() => {
		dialogRef.current?.close();
		onClose();
	}, [onClose]);

	const handleChange = useCallback((e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	}, []);

	const handleFileChange = useCallback((e) => {
		setCvFile(e.target.files[0] ?? null);
	}, []);

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();
			setSubmitting(true);
			setError(null);
			try {
				const formData = new FormData();
				formData.append("firstName", form.firstName);
				formData.append("lastName", form.lastName);
				formData.append("email", form.email);
				if (form.phone) formData.append("phone", form.phone);
				if (form.message) formData.append("message", form.message);
				if (cvFile) formData.append("resume", cvFile);

				const res = await fetch(`${backendUrl}/jobs/${job._id}/apply`, {
					method: "POST",
					body: formData,
				});
				const data = await res.json();
				if (!data.success) throw new Error(data.error || "Application failed");
				setSuccess(true);
			} catch (err) {
				setError(err.message);
			} finally {
				setSubmitting(false);
			}
		},
		[form, cvFile, job._id],
	);

	return (
		<dialog
			ref={dialogRef}
			className="ApplyModal"
			onClose={onClose}
			aria-labelledby="apply-modal-title"
		>
			<div className="ApplyModalInner">
				<div className="ApplyModalHeader">
					<div>
						<h2 id="apply-modal-title" className="ApplyModalTitle">
							Apply for {job.title}
						</h2>
						<p className="ApplyModalSubtitle">
							{job.location} · {job.type}
						</p>
					</div>
					<button
						type="button"
						className="ApplyModalClose"
						onClick={handleClose}
						aria-label="Close"
					>
						<RiCloseLine size={20} />
					</button>
				</div>

				{success ? (
					<div className="ApplyModalSuccess">
						<RiCheckboxCircleLine size={48} className="ApplyModalSuccessIcon" />
						<h3>Application Submitted!</h3>
						<p>
							We will review your application and get back to you within 5
							business days.
						</p>
						<button
							type="button"
							className="ApplyModalSubmitBtn"
							onClick={handleClose}
						>
							Close
						</button>
					</div>
				) : (
					<form className="ApplyModalForm" onSubmit={handleSubmit} noValidate>
						<div className="ApplyModalRow">
							<div className="ApplyModalField">
								<label htmlFor="apply-firstName">First Name *</label>
								<input
									id="apply-firstName"
									name="firstName"
									type="text"
									value={form.firstName}
									onChange={handleChange}
									required
									placeholder="Jane"
									autoComplete="given-name"
								/>
							</div>
							<div className="ApplyModalField">
								<label htmlFor="apply-lastName">Last Name *</label>
								<input
									id="apply-lastName"
									name="lastName"
									type="text"
									value={form.lastName}
									onChange={handleChange}
									required
									placeholder="Doe"
									autoComplete="family-name"
								/>
							</div>
						</div>

						<div className="ApplyModalRow">
							<div className="ApplyModalField">
								<label htmlFor="apply-email">Email *</label>
								<input
									id="apply-email"
									name="email"
									type="email"
									value={form.email}
									onChange={handleChange}
									required
									placeholder="jane@example.com"
									autoComplete="email"
								/>
							</div>
							<div className="ApplyModalField">
								<label htmlFor="apply-phone">Phone</label>
								<input
									id="apply-phone"
									name="phone"
									type="tel"
									value={form.phone}
									onChange={handleChange}
									placeholder="+1 555 000 0000"
									autoComplete="tel"
								/>
							</div>
						</div>

						<div className="ApplyModalField">
							<label htmlFor="apply-cv">Resume / CV</label>
							<div
								className="ApplyModalFileInput"
								onClick={() => fileInputRef.current?.click()}
							>
								<RiUploadLine size={18} />
								<span>
									{cvFile ? cvFile.name : "PDF or Word document, max 5 MB"}
								</span>
							</div>
							<input
								ref={fileInputRef}
								id="apply-cv"
								type="file"
								accept=".pdf,.doc,.docx"
								onChange={handleFileChange}
								className="sr-only"
							/>
						</div>

						<div className="ApplyModalField">
							<label htmlFor="apply-message">Cover Letter</label>
							<textarea
								id="apply-message"
								name="message"
								value={form.message}
								onChange={handleChange}
								rows={4}
								placeholder="Tell us why you are a great fit..."
							/>
						</div>

						{error && <p className="ApplyModalError">{error}</p>}

						<button
							type="submit"
							className="ApplyModalSubmitBtn"
							disabled={submitting}
						>
							{submitting ? (
								<>
									<RiLoader4Line size={16} className="animate-spin" />
									Submitting…
								</>
							) : (
								"Submit Application"
							)}
						</button>
					</form>
				)}
			</div>
		</dialog>
	);
}

function JobCard({ job, onApply }) {
	const hasSalary = job.salary?.min || job.salary?.max;
	const currency = job.salary?.currency || "USD";

	return (
		<article className="JobCard">
			<div className="JobCardHeader">
				<h3 className="JobCardTitle">{job.title}</h3>
				<button
					type="button"
					className="JobCardApplyBtn"
					onClick={() => onApply(job)}
				>
					Apply Now
				</button>
			</div>

			<div className="JobCardMeta">
				<span className="JobCardBadge JobCardBadgeType">{job.type}</span>
				<span className="JobCardBadge">
					<RiMapPinLine size={13} />
					{job.location}
				</span>
				{hasSalary && (
					<span className="JobCardBadge">
						<RiMoneyDollarCircleLine size={13} />
						{job.salary.min && job.salary.max
							? `${job.salary.min.toLocaleString()}–${job.salary.max.toLocaleString()} ${currency}`
							: job.salary.min
								? `From ${job.salary.min.toLocaleString()} ${currency}`
								: `Up to ${job.salary.max.toLocaleString()} ${currency}`}
					</span>
				)}
			</div>

			{job.description && (
				<p className="JobCardDescription">{job.description}</p>
			)}

			{Array.isArray(job.skills) && job.skills.length > 0 && (
				<div className="JobCardSkills">
					{job.skills.map((skill) => (
						<span key={skill} className="JobCardSkill">
							{skill}
						</span>
					))}
				</div>
			)}
		</article>
	);
}

export default function CareerPage() {
	const { jobs, loading } = useJobs();
	const [applyJob, setApplyJob] = useState(null);
	const openingsRef = useRef(null);

	const scrollToOpenings = useCallback(() => {
		openingsRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	return (
		<>
			<Header />
			<main>
				<section className="CareerHero">
					<div className="CareerHeroContent">
						<div className="CareerHeroLeft">
							<h1 className="CareerHeroTitle">
								Join Our Team
								<br />
								At <span>HestiQ</span>
							</h1>
							<p className="CareerHeroDescription">
								We are a small team of designers and engineers who care deeply
								about craft. If you love building things that matter and working
								with people who push you to grow, this is the place for you.
							</p>
							<button
								type="button"
								className="CTA CareerHeroCTA"
								onClick={scrollToOpenings}
							>
								View Openings
							</button>
						</div>
						<div className="CareerHeroRight">
							<WorkTime className="CareerHeroSvg" aria-hidden="true" />
						</div>
					</div>
				</section>

				<section className="WhyUsSection">
					<div className="WhyUsContainer">
						<div className="WhyUsLeft">
							<div className="WhyUsGrid">
								{WHY_US.map(({ icon: Icon, title, description }, i) => (
									<div key={i} className="WhyUsBlock">
										<div className="WhyUsBlockIcon">
											<Icon size={22} />
										</div>
										<h3 className="WhyUsBlockTitle">{title}</h3>
										<p className="WhyUsBlockDesc">{description}</p>
									</div>
								))}
							</div>
						</div>
						<div className="WhyUsRight">
							<h2 className="WhyUsTitle">Your Life At HestiQ</h2>
							<p className="WhyUsText">
								At HestiQ, we believe the best work comes from people who feel
								trusted, challenged, and respected. We keep the team lean so
								every person has real ownership over what they build. There is
								no micromanagement here - just clear goals, open communication,
								and space to do great work.
							</p>
							<p className="WhyUsText">
								We invest in our team's growth through continuous learning,
								knowledge sharing, and honest feedback. Whether you are early in
								your career or have years of experience, you will find room to
								level up here.
							</p>
							<p className="WhyUsText">
								Beyond the work itself, we prioritise balance. We know that
								sustainable performance beats burnout every time. Our flexible
								schedule means you can structure your day in a way that makes
								sense for your life.
							</p>
							<button
								type="button"
								className="WhyUsCTA CTA"
								onClick={scrollToOpenings}
							>
								View Openings
							</button>
						</div>
					</div>
				</section>

				<section className="JobsSection" ref={openingsRef} id="openings">
					<div className="JobsSectionInner">
						<div className="JobsSectionHeader">
							<h2 className="JobsSectionTitle">Open Positions</h2>
							<p className="JobsSectionDesc">
								Browse our current openings. Apply directly - no middlemen, no
								lengthy portals.
							</p>
						</div>

						{loading ? (
							<div className="JobsLoading" aria-live="polite">
								<RiLoader4Line
									size={32}
									className="animate-spin JobsLoadingIcon"
								/>
							</div>
						) : jobs.length === 0 ? (
							<div className="JobsEmpty">
								<p>No open positions at the moment. Check back soon.</p>
							</div>
						) : (
							<div className="JobsList">
								{jobs.map((job) => (
									<JobCard key={job._id} job={job} onApply={setApplyJob} />
								))}
							</div>
						)}
					</div>
				</section>

				<section className="RecruitmentSection">
					<div className="RecruitmentInner">
						<h2 className="RecruitmentTitle">Learn Our Recruitment Process</h2>
						<div className="RecruitmentSteps">
							{RECRUITMENT_STEPS.map(
								({ icon: Icon, title, description }, i) => (
									<div key={i} className="RecruitmentStep">
										<div className="RecruitmentStepNumber">{i + 1}</div>
										<div className="RecruitmentStepIcon">
											<Icon size={24} />
										</div>
										<h3 className="RecruitmentStepTitle">{title}</h3>
										<p className="RecruitmentStepDesc">{description}</p>
									</div>
								),
							)}
						</div>
					</div>
				</section>
			</main>
			<Footer />

			{applyJob && (
				<ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />
			)}
		</>
	);
}
