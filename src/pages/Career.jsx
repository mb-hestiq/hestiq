import { useState, useEffect, useRef, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WorkTime from "../assets/images/illustrations/work-time.svg?react";
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
import backendUrl from "../utils/backend";

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
			className="apply-modal"
			onClose={onClose}
			aria-labelledby="apply-modal-title"
		>
			<div className="apply-modal-inner">
				<div className="apply-modal-header">
					<div>
						<h2 id="apply-modal-title" className="apply-modal-title">
							Apply for {job.title}
						</h2>
						<p className="apply-modal-subtitle">
							{job.location} · {job.type}
						</p>
					</div>
					<button
						type="button"
						className="apply-modal-close"
						onClick={handleClose}
						aria-label="Close"
					>
						<RiCloseLine size={20} />
					</button>
				</div>

				{success ? (
					<div className="apply-modal-success">
						<RiCheckboxCircleLine
							size={48}
							className="apply-modal-success-icon"
						/>
						<h3>Application Submitted!</h3>
						<p>
							We will review your application and get back to you within 5
							business days.
						</p>
						<button
							type="button"
							className="apply-modal-submit-btn"
							onClick={handleClose}
						>
							Close
						</button>
					</div>
				) : (
					<form className="apply-modal-form" onSubmit={handleSubmit} noValidate>
						<div className="apply-modal-row">
							<div className="apply-modal-field">
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
							<div className="apply-modal-field">
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

						<div className="apply-modal-row">
							<div className="apply-modal-field">
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
							<div className="apply-modal-field">
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

						<div className="apply-modal-field">
							<label htmlFor="apply-cv">Resume / CV</label>
							<div
								className="apply-modal-file-input"
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

						<div className="apply-modal-field">
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

						{error && <p className="apply-modal-error">{error}</p>}

						<button
							type="submit"
							className="apply-modal-submit-btn"
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
		<article className="job-card">
			<div className="job-card-header">
				<h3 className="job-card-title">{job.title}</h3>
				<button
					type="button"
					className="job-card-apply-btn"
					onClick={() => onApply(job)}
				>
					Apply Now
				</button>
			</div>

			<div className="job-card-meta">
				<span className="job-card-badge job-card-badge-type">{job.type}</span>
				<span className="job-card-badge">
					<RiMapPinLine size={13} />
					{job.location}
				</span>
				{hasSalary && (
					<span className="job-card-badge">
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
				<p className="job-card-description">{job.description}</p>
			)}

			{Array.isArray(job.skills) && job.skills.length > 0 && (
				<div className="job-card-skills">
					{job.skills.map((skill) => (
						<span key={skill} className="job-card-skill">
							{skill}
						</span>
					))}
				</div>
			)}
		</article>
	);
}

export default function Career() {
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
				<section className="career-hero">
					<div className="career-hero-content">
						<div className="career-hero-left">
							<h1 className="career-hero-title">
								Join Our Team
								<br />
								At <span>HestiQ</span>
							</h1>
							<p className="career-hero-description">
								We are a small team of designers and engineers who care deeply
								about craft. If you love building things that matter and working
								with people who push you to grow, this is the place for you.
							</p>
							<button
								type="button"
								className="cta career-hero-cta"
								onClick={scrollToOpenings}
							>
								View Openings
							</button>
						</div>
						<div className="career-hero-right">
							<WorkTime className="career-hero-svg" aria-hidden="true" />
						</div>
					</div>
				</section>

				<section className="why-us-section">
					<div className="why-us-container">
						<div className="why-us-left">
							<div className="why-us-grid">
								{WHY_US.map(({ icon: Icon, title, description }, i) => (
									<div key={i} className="why-us-block">
										<div className="why-us-block-icon">
											<Icon size={22} />
										</div>
										<h3 className="why-us-block-title">{title}</h3>
										<p className="why-us-block-desc">{description}</p>
									</div>
								))}
							</div>
						</div>
						<div className="why-us-right">
							<h2 className="why-us-title">Your Life At HestiQ</h2>
							<p className="why-us-text">
								At HestiQ, we believe the best work comes from people who feel
								trusted, challenged, and respected. We keep the team lean so
								every person has real ownership over what they build. There is
								no micromanagement here - just clear goals, open communication,
								and space to do great work.
							</p>
							<p className="why-us-text">
								We invest in our team's growth through continuous learning,
								knowledge sharing, and honest feedback. Whether you are early in
								your career or have years of experience, you will find room to
								level up here.
							</p>
							<p className="why-us-text">
								Beyond the work itself, we prioritise balance. We know that
								sustainable performance beats burnout every time. Our flexible
								schedule means you can structure your day in a way that makes
								sense for your life.
							</p>
							<button
								type="button"
								className="why-us-cta cta"
								onClick={scrollToOpenings}
							>
								View Openings
							</button>
						</div>
					</div>
				</section>

				<section className="jobs-section" ref={openingsRef} id="openings">
					<div className="jobs-section-inner">
						<div className="jobs-section-header">
							<h2 className="jobs-section-title">Open Positions</h2>
							<p className="jobs-section-desc">
								Browse our current openings. Apply directly - no middlemen, no
								lengthy portals.
							</p>
						</div>

						{loading ? (
							<div className="jobs-loading" aria-live="polite">
								<RiLoader4Line
									size={32}
									className="animate-spin jobs-loading-icon"
								/>
							</div>
						) : jobs.length === 0 ? (
							<div className="jobs-empty">
								<p>No open positions at the moment. Check back soon.</p>
							</div>
						) : (
							<div className="jobs-list">
								{jobs.map((job) => (
									<JobCard key={job._id} job={job} onApply={setApplyJob} />
								))}
							</div>
						)}
					</div>
				</section>

				<section className="recruitment-section">
					<div className="recruitment-inner">
						<h2 className="recruitment-title">Learn Our Recruitment Process</h2>
						<div className="recruitment-steps">
							{RECRUITMENT_STEPS.map(
								({ icon: Icon, title, description }, i) => (
									<div key={i} className="recruitment-step">
										<div className="recruitment-step-number">{i + 1}</div>
										<div className="recruitment-step-icon">
											<Icon size={24} />
										</div>
										<h3 className="recruitment-step-title">{title}</h3>
										<p className="recruitment-step-desc">{description}</p>
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
