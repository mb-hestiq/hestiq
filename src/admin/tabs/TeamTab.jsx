import { useState, useCallback, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import DataGrid from "../components/DataGrid";
import CrudModal from "../components/CrudModal";
import backendUrl from "../../utils/backend";

const TAG_OPTIONS = [
	{ value: "management", label: "Management" },
	{ value: "design", label: "Design" },
	{ value: "development", label: "Development" },
	{ value: "marketing", label: "Marketing" },
];

const TEAM_FIELDS = [
	{
		name: "name",
		label: "Name",
		type: "text",
		required: true,
		placeholder: "Jane Doe",
	},
	{
		name: "email",
		label: "Email",
		type: "email",
		required: true,
		placeholder: "jane@example.com",
	},
	{ name: "title", label: "Title", type: "text", placeholder: "Lead Designer" },
	{ name: "image", label: "Photo", type: "file" },
	{
		name: "tags",
		label: "Tags",
		type: "multiselect",
		options: TAG_OPTIONS,
		defaultValue: [],
	},
];

const COLUMNS = [
	{
		accessorKey: "image",
		header: "Photo",
		cell: (info) =>
			info.getValue() ? (
				<img
					src={`${backendUrl}${info.getValue()}`}
					alt="team"
					className="w-8 h-8 rounded-full object-cover border border-border"
				/>
			) : (
				<div className="w-8 h-8 rounded-full bg-gray-100 border border-border flex items-center justify-center text-xs text-text-muted">
					?
				</div>
			),
	},
	{ accessorKey: "name", header: "Name", cell: (info) => info.getValue() },
	{ accessorKey: "email", header: "Email", cell: (info) => info.getValue() },
	{
		accessorKey: "title",
		header: "Title",
		cell: (info) => info.getValue() || "—",
	},
	{
		accessorKey: "tags",
		header: "Tags",
		cell: (info) => {
			const tags = info.getValue();
			if (!Array.isArray(tags) || tags.length === 0) return "—";
			return (
				<div className="flex flex-wrap gap-1">
					{tags.map((tag) => (
						<span
							key={tag}
							className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-[#342937]"
						>
							{tag}
						</span>
					))}
				</div>
			);
		},
	},
];

export default function TeamTab() {
	const { token } = useAuth();
	const [members, setMembers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [fetched, setFetched] = useState(false);
	const [modal, setModal] = useState({
		open: false,
		mode: "create",
		target: null,
	});

	const fetchMembers = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch(`${backendUrl}/team`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await res.json();
			if (data.success) setMembers(data.members);
		} finally {
			setLoading(false);
			setFetched(true);
		}
	}, [token]);

	useEffect(() => {
		if (!fetched) fetchMembers();
	}, [fetched, fetchMembers]);

	const uploadImage = useCallback(
		async (file) => {
			const formData = new FormData();
			formData.append("file", file);
			const res = await fetch(`${backendUrl}/files`, {
				method: "POST",
				headers: { Authorization: `Bearer ${token}` },
				body: formData,
			});
			const data = await res.json();
			if (!data.success) throw new Error(data.error || "Upload failed");
			return `${backendUrl}${data.url}`;
		},
		[token],
	);

	const handleCreate = useCallback(
		async (form) => {
			const res = await fetch(`${backendUrl}/team`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(form),
			});
			const data = await res.json();
			if (!data.success)
				throw new Error(data.error || "Failed to create team member");
			await fetchMembers();
		},
		[token, fetchMembers],
	);

	const handleEdit = useCallback(
		async (form) => {
			const res = await fetch(`${backendUrl}/team/${modal.target._id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(form),
			});
			const data = await res.json();
			if (!data.success)
				throw new Error(data.error || "Failed to update team member");
			await fetchMembers();
		},
		[token, modal.target, fetchMembers],
	);

	const handleDelete = useCallback(
		async (id) => {
			const res = await fetch(`${backendUrl}/team/${id}`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await res.json();
			if (!data.success)
				throw new Error(data.error || "Failed to delete team member");
			setMembers((prev) => prev.filter((m) => m._id !== id));
		},
		[token],
	);

	const handleBulkDelete = useCallback(
		async (ids) => {
			const res = await fetch(`${backendUrl}/team`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ ids }),
			});
			const data = await res.json();
			if (!data.success)
				throw new Error(data.error || "Failed to delete team members");
			setMembers((prev) => prev.filter((m) => !ids.includes(m._id)));
		},
		[token],
	);

	const modalInitialValues = modal.target
		? {
				...modal.target,
				image: modal.target.image ? `${backendUrl}${modal.target.image}` : "",
			}
		: {};

	const handleSubmit = useCallback(
		async (form) => {
			const normalized = { ...form };
			if (normalized.image && normalized.image.startsWith(backendUrl)) {
				normalized.image = normalized.image.slice(backendUrl.length);
			}
			if (modal.mode === "create") {
				await handleCreate(normalized);
			} else {
				await handleEdit(normalized);
			}
		},
		[modal.mode, handleCreate, handleEdit],
	);

	return (
		<div>
			<h2 className="text-xl font-semibold text-[#342937] tab-title">Team</h2>
			<div className="bg-white rounded-xl border border-border p-4">
				<DataGrid
					data={members}
					columns={COLUMNS}
					loading={loading}
					onEdit={(row) => setModal({ open: true, mode: "edit", target: row })}
					onDelete={handleDelete}
					onBulkDelete={handleBulkDelete}
					onCreate={() =>
						setModal({ open: true, mode: "create", target: null })
					}
					createLabel="Add Member"
				/>
			</div>

			<CrudModal
				isOpen={modal.open}
				title={modal.mode === "create" ? "Add Team Member" : "Edit Team Member"}
				fields={TEAM_FIELDS}
				initialValues={modalInitialValues}
				onSubmit={handleSubmit}
				onClose={() => setModal({ open: false, mode: "create", target: null })}
				uploadHandlers={{ image: uploadImage }}
			/>
		</div>
	);
}
