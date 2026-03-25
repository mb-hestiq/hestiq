import { useState, useCallback, useEffect, useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";
import DataGrid from "../components/DataGrid";
import CrudModal from "../components/CrudModal";
import ConfirmDialog from "../components/ConfirmDialog";
import backendUrl from "../../utils/backend";
import { RiDownloadLine, RiEditLine, RiDeleteBinLine } from "react-icons/ri";

const JOB_TYPE_OPTIONS = [
	{ value: "Full-time", label: "Full-time" },
	{ value: "Part-time", label: "Part-time" },
	{ value: "Contract", label: "Contract" },
	{ value: "Internship", label: "Internship" },
];

const JOB_STATUS_OPTIONS = [
	{ value: "active", label: "Active" },
	{ value: "closed", label: "Closed" },
];

const APPLICANT_STATUS_OPTIONS = [
	{ value: "pending", label: "Pending" },
	{ value: "reviewing", label: "Reviewing" },
	{ value: "accepted", label: "Accepted" },
	{ value: "rejected", label: "Rejected" },
];

const JOB_FIELDS = [
	{
		name: "title",
		label: "Title",
		type: "text",
		required: true,
		placeholder: "Frontend Developer",
	},
	{
		name: "description",
		label: "Description",
		type: "textarea",
		placeholder: "Role overview...",
	},
	{
		name: "location",
		label: "Location",
		type: "text",
		placeholder: "Remote",
		defaultValue: "Remote",
	},
	{
		name: "type",
		label: "Type",
		type: "select",
		options: JOB_TYPE_OPTIONS,
		defaultValue: "Full-time",
	},
	{
		name: "salaryMin",
		label: "Salary Min",
		type: "number",
		placeholder: "3000",
	},
	{
		name: "salaryMax",
		label: "Salary Max",
		type: "number",
		placeholder: "6000",
	},
	{
		name: "salaryCurrency",
		label: "Currency",
		type: "text",
		placeholder: "USD",
		defaultValue: "USD",
	},
	{
		name: "skills",
		label: "Skills (comma-separated)",
		type: "text",
		placeholder: "React, Node.js, MongoDB",
	},
	{
		name: "status",
		label: "Status",
		type: "select",
		options: JOB_STATUS_OPTIONS,
		defaultValue: "active",
	},
];

const APPLICANT_FIELDS = [
	{ name: "firstName", label: "First Name", type: "text", required: true },
	{ name: "lastName", label: "Last Name", type: "text", required: true },
	{
		name: "email",
		label: "Email",
		type: "email",
		required: true,
		placeholder: "applicant@example.com",
	},
	{
		name: "phone",
		label: "Phone",
		type: "text",
		placeholder: "+1 555 000 0000",
	},
	{ name: "message", label: "Message", type: "textarea" },
	{
		name: "status",
		label: "Status",
		type: "select",
		options: APPLICANT_STATUS_OPTIONS,
		defaultValue: "pending",
	},
];

const STATUS_COLORS = {
	active: "bg-green-100 text-green-800",
	closed: "bg-gray-100 text-gray-600",
	pending: "bg-yellow-100 text-yellow-800",
	reviewing: "bg-blue-100 text-blue-800",
	accepted: "bg-green-100 text-green-800",
	rejected: "bg-red-100 text-red-600",
};

const JOB_COLUMNS = [
	{ accessorKey: "title", header: "Title", cell: (i) => i.getValue() },
	{
		accessorKey: "type",
		header: "Type",
		cell: (i) => i.getValue() || "—",
	},
	{
		accessorKey: "location",
		header: "Location",
		cell: (i) => i.getValue() || "Remote",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: (i) => (
			<span
				className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[i.getValue()] ?? "bg-gray-100 text-gray-600"}`}
			>
				{i.getValue()}
			</span>
		),
	},
	{
		accessorKey: "applicants",
		header: "Applicants",
		cell: (i) => (Array.isArray(i.getValue()) ? i.getValue().length : 0),
	},
	{
		accessorKey: "postedAt",
		header: "Posted",
		cell: (i) => {
			const v = i.getValue();
			return v ? new Date(v).toLocaleDateString() : "—";
		},
	},
];

function formToJob(form) {
	const skills = form.skills
		? form.skills
				.split(",")
				.map((s) => s.trim())
				.filter(Boolean)
		: [];
	return {
		title: form.title,
		description: form.description,
		location: form.location,
		type: form.type,
		salary: {
			min: form.salaryMin ? Number(form.salaryMin) : undefined,
			max: form.salaryMax ? Number(form.salaryMax) : undefined,
			currency: form.salaryCurrency || "USD",
		},
		skills,
		status: form.status,
	};
}

function jobToForm(job) {
	return {
		title: job.title ?? "",
		description: job.description ?? "",
		location: job.location ?? "Remote",
		type: job.type ?? "Full-time",
		salaryMin: job.salary?.min ?? "",
		salaryMax: job.salary?.max ?? "",
		salaryCurrency: job.salary?.currency ?? "USD",
		skills: Array.isArray(job.skills) ? job.skills.join(", ") : "",
		status: job.status ?? "active",
	};
}

function ApplicantsTable({ job, token, onJobUpdate }) {
	const [modal, setModal] = useState({ open: false, target: null });
	const [deleteTarget, setDeleteTarget] = useState(null);
	const [downloading, setDownloading] = useState(null);

	const handleDownloadCv = useCallback(
		async (applicant) => {
			if (downloading === applicant._id) return;
			setDownloading(applicant._id);
			try {
				const res = await fetch(`${backendUrl}${applicant.resumeUrl}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				if (!res.ok) throw new Error("Download failed");
				const blob = await res.blob();
				const url = URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				const disposition = res.headers.get("Content-Disposition") ?? "";
				const nameMatch = disposition.match(/filename="?([^"\s;]+)"?/);
				if (nameMatch) {
					a.download = nameMatch[1];
				} else {
					const MIME_EXT = {
						"application/pdf": ".pdf",
						"application/msword": ".doc",
						"application/vnd.openxmlformats-officedocument.wordprocessingml.document":
							".docx",
					};
					const ext = MIME_EXT[blob.type] ?? "";
					a.download = `cv-${applicant.firstName}-${applicant.lastName}${ext}`;
				}
				a.click();
				URL.revokeObjectURL(url);
			} finally {
				setDownloading(null);
			}
		},
		[token, downloading],
	);

	const handleEdit = useCallback(
		async (form) => {
			const res = await fetch(
				`${backendUrl}/jobs/${job._id}/applicants/${modal.target._id}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(form),
				},
			);
			const data = await res.json();
			if (!data.success)
				throw new Error(data.error || "Failed to update applicant");
			onJobUpdate();
		},
		[job._id, modal.target, token, onJobUpdate],
	);

	const handleDelete = useCallback(async () => {
		if (!deleteTarget) return;
		const res = await fetch(
			`${backendUrl}/jobs/${job._id}/applicants/${deleteTarget._id}`,
			{
				method: "DELETE",
				headers: { Authorization: `Bearer ${token}` },
			},
		);
		const data = await res.json();
		if (!data.success)
			throw new Error(data.error || "Failed to delete applicant");
		setDeleteTarget(null);
		onJobUpdate();
	}, [job._id, deleteTarget, token, onJobUpdate]);

	const columns = useMemo(
		() => [
			{
				accessorKey: "firstName",
				header: "First Name",
				cell: (i) => i.getValue(),
			},
			{
				accessorKey: "lastName",
				header: "Last Name",
				cell: (i) => i.getValue(),
			},
			{
				accessorKey: "email",
				header: "Email",
				cell: (i) => (
					<a
						href={`mailto:${i.getValue()}`}
						className="text-[#342937] underline underline-offset-2 hover:opacity-70"
					>
						{i.getValue()}
					</a>
				),
			},
			{
				accessorKey: "phone",
				header: "Phone",
				cell: (i) => i.getValue() || "—",
			},
			{
				accessorKey: "status",
				header: "Status",
				cell: (i) => (
					<span
						className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[i.getValue()] ?? "bg-gray-100 text-gray-600"}`}
					>
						{i.getValue()}
					</span>
				),
			},
			{
				accessorKey: "appliedAt",
				header: "Applied",
				cell: (i) =>
					i.getValue() ? new Date(i.getValue()).toLocaleDateString() : "—",
			},
			{
				id: "actions",
				header: "Actions",
				cell: ({ row }) => (
					<div
						className="flex items-center gap-1"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={() => setModal({ open: true, target: row.original })}
							className="admin-icon-btn text-[#342937]"
							title="Edit"
						>
							<RiEditLine size={16} />
						</button>
						{row.original.resumeUrl && (
							<button
								onClick={() => handleDownloadCv(row.original)}
								className="admin-icon-btn text-[#342937]"
								title="Download CV"
								disabled={downloading === row.original._id}
							>
								<RiDownloadLine size={16} />
							</button>
						)}
						<button
							onClick={() => setDeleteTarget(row.original)}
							className="admin-icon-btn text-red-500"
							title="Delete"
						>
							<RiDeleteBinLine size={16} />
						</button>
					</div>
				),
				enableSorting: false,
				enableColumnFilter: false,
				size: 100,
			},
		],
		[downloading, handleDownloadCv],
	);

	const applicants = Array.isArray(job.applicants) ? job.applicants : [];

	return (
		<div>
			<h4 className="text-sm font-semibold text-[#342937] mb-3">
				Applicants ({applicants.length})
			</h4>
			{applicants.length === 0 ? (
				<p className="text-sm text-text-muted">No applicants yet.</p>
			) : (
				<div className="overflow-x-auto rounded-lg border border-border">
					<table className="w-full text-sm">
						<thead className="bg-bg text-primary">
							<tr>
								{columns.map((col) => (
									<th
										key={col.id ?? col.accessorKey}
										className="px-3 py-2 text-left font-medium whitespace-nowrap"
									>
										{col.header}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{applicants.map((applicant) => (
								<tr
									key={applicant._id}
									className="border-t border-border bg-white hover:bg-bg transition-colors"
								>
									{columns.map((col) => (
										<td key={col.id ?? col.accessorKey} className="px-3 py-2">
											{col.cell
												? col.cell({
														getValue: () =>
															col.accessorKey
																? applicant[col.accessorKey]
																: undefined,
														row: { original: applicant },
													})
												: applicant[col.accessorKey]}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			<CrudModal
				isOpen={modal.open}
				title="Edit Applicant"
				fields={APPLICANT_FIELDS}
				initialValues={modal.target ?? {}}
				onSubmit={handleEdit}
				onClose={() => setModal({ open: false, target: null })}
			/>

			<ConfirmDialog
				isOpen={!!deleteTarget}
				title="Delete Applicant"
				message={
					deleteTarget
						? `Remove ${deleteTarget.firstName} ${deleteTarget.lastName} from this job?`
						: ""
				}
				onConfirm={handleDelete}
				onClose={() => setDeleteTarget(null)}
			/>
		</div>
	);
}

export default function JobsTab() {
	const { token } = useAuth();
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [fetched, setFetched] = useState(false);
	const [modal, setModal] = useState({
		open: false,
		mode: "create",
		target: null,
	});

	const fetchJobs = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch(`${backendUrl}/jobs`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await res.json();
			if (data.success) setJobs(data.jobs);
		} finally {
			setLoading(false);
			setFetched(true);
		}
	}, [token]);

	useEffect(() => {
		if (!fetched) fetchJobs();
	}, [fetched, fetchJobs]);

	const handleCreate = useCallback(
		async (form) => {
			const res = await fetch(`${backendUrl}/jobs`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(formToJob(form)),
			});
			const data = await res.json();
			if (!data.success) throw new Error(data.error || "Failed to create job");
			await fetchJobs();
		},
		[token, fetchJobs],
	);

	const handleEdit = useCallback(
		async (form) => {
			const res = await fetch(`${backendUrl}/jobs/${modal.target._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(formToJob(form)),
			});
			const data = await res.json();
			if (!data.success) throw new Error(data.error || "Failed to update job");
			await fetchJobs();
		},
		[token, modal.target, fetchJobs],
	);

	const handleDelete = useCallback(
		async (id) => {
			const res = await fetch(`${backendUrl}/jobs/${id}`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await res.json();
			if (!data.success) throw new Error(data.error || "Failed to delete job");
			setJobs((prev) => prev.filter((j) => j._id !== id));
		},
		[token],
	);

	const handleBulkDelete = useCallback(
		async (ids) => {
			const res = await fetch(`${backendUrl}/jobs`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ ids }),
			});
			const data = await res.json();
			if (!data.success) throw new Error(data.error || "Failed to delete jobs");
			setJobs((prev) => prev.filter((j) => !ids.includes(j._id)));
		},
		[token],
	);

	const handleSubmit = useCallback(
		async (form) => {
			if (modal.mode === "create") {
				await handleCreate(form);
			} else {
				await handleEdit(form);
			}
		},
		[modal.mode, handleCreate, handleEdit],
	);

	const modalInitialValues = modal.target ? jobToForm(modal.target) : {};

	return (
		<div>
			<h2 className="text-xl font-semibold text-[#342937] tab-title">Jobs</h2>
			<div className="bg-white rounded-xl border border-border p-4">
				<DataGrid
					data={jobs}
					columns={JOB_COLUMNS}
					loading={loading}
					expandedContent={(job) => (
						<ApplicantsTable job={job} token={token} onJobUpdate={fetchJobs} />
					)}
					onEdit={(row) => setModal({ open: true, mode: "edit", target: row })}
					onDelete={handleDelete}
					onBulkDelete={handleBulkDelete}
					onCreate={() =>
						setModal({ open: true, mode: "create", target: null })
					}
					createLabel="Post Job"
				/>
			</div>

			<CrudModal
				isOpen={modal.open}
				title={modal.mode === "create" ? "Post New Job" : "Edit Job"}
				fields={JOB_FIELDS}
				initialValues={modalInitialValues}
				onSubmit={handleSubmit}
				onClose={() => setModal({ open: false, mode: "create", target: null })}
			/>
		</div>
	);
}
