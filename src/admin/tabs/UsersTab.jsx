import { useState, useCallback, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import DataGrid from "../components/DataGrid";
import CrudModal from "../components/CrudModal";
import backendUrl from "../../utils/backend";

function formatDate(d) {
	if (!d) return "—";
	return new Date(d).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

const USER_FIELDS = [
	{
		name: "name",
		label: "Name",
		type: "text",
		required: true,
		placeholder: "Full name",
	},
	{
		name: "email",
		label: "Email",
		type: "email",
		required: true,
		placeholder: "user@email.com",
	},
	{
		name: "role",
		label: "Role",
		type: "select",
		required: true,
		options: [
			{ value: "user", label: "User" },
			{ value: "admin", label: "Admin" },
		],
		defaultValue: "user",
	},
	{
		name: "password",
		label: "Password",
		type: "password",
		placeholder: "Leave blank to keep current",
	},
];

const CREATE_USER_FIELDS = [
	{
		name: "name",
		label: "Name",
		type: "text",
		required: true,
		placeholder: "Full name",
	},
	{
		name: "email",
		label: "Email",
		type: "email",
		required: true,
		placeholder: "user@email.com",
	},
	{
		name: "password",
		label: "Password",
		type: "password",
		required: true,
		placeholder: "Min. 8 characters",
	},
	{
		name: "role",
		label: "Role",
		type: "select",
		required: true,
		options: [
			{ value: "user", label: "User" },
			{ value: "admin", label: "Admin" },
		],
		defaultValue: "user",
	},
];

const COLUMNS = [
	{
		accessorKey: "name",
		header: "Name",
		cell: (info) => info.getValue() || "—",
	},
	{ accessorKey: "email", header: "Email", cell: (info) => info.getValue() },
	{
		accessorKey: "role",
		header: "Role",
		cell: (info) => (
			<span
				className={`admin-badge ${info.getValue() === "admin" ? "admin-badge-primary" : "admin-badge-muted"}`}
			>
				{info.getValue()}
			</span>
		),
	},
	{
		accessorKey: "createdAt",
		header: "Joined",
		cell: (info) => formatDate(info.getValue()),
	},
];

export default function UsersTab() {
	const { token } = useAuth();
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [fetched, setFetched] = useState(false);
	const [modal, setModal] = useState({
		open: false,
		mode: "create",
		target: null,
	});

	const fetchUsers = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch(`${backendUrl}/admin/users`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await res.json();
			if (data.success) setUsers(data.users);
		} finally {
			setLoading(false);
			setFetched(true);
		}
	}, [token]);

	useEffect(() => {
		if (!fetched) fetchUsers();
	}, [fetched, fetchUsers]);

	const handleCreate = useCallback(
		async (form) => {
			const res = await fetch(`${backendUrl}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(form),
			});
			const data = await res.json();
			if (!data.success) throw new Error(data.error || "Failed to create user");
			await fetchUsers();
		},
		[token, fetchUsers],
	);

	const handleEdit = useCallback(
		async (form) => {
			const res = await fetch(`${backendUrl}/admin/users/${modal.target._id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(form),
			});
			const data = await res.json();
			if (!data.success) throw new Error(data.error || "Failed to update user");
			await fetchUsers();
		},
		[token, modal.target, fetchUsers],
	);

	const handleDelete = useCallback(
		async (id) => {
			const res = await fetch(`${backendUrl}/admin/users/${id}`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await res.json();
			if (!data.success) throw new Error(data.error || "Failed to delete user");
			setUsers((prev) => prev.filter((u) => u._id !== id));
		},
		[token],
	);

	const handleBulkDelete = useCallback(
		async (ids) => {
			const res = await fetch(`${backendUrl}/admin/users`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ ids }),
			});
			const data = await res.json();
			if (!data.success)
				throw new Error(data.error || "Failed to delete users");
			setUsers((prev) => prev.filter((u) => !ids.includes(u._id)));
		},
		[token],
	);

	return (
		<div>
			<h2 className="admin-section-title tab-title">Users</h2>
			<div className="admin-panel">
				<DataGrid
					data={users}
					columns={COLUMNS}
					loading={loading}
					onEdit={(row) => setModal({ open: true, mode: "edit", target: row })}
					onDelete={handleDelete}
					onBulkDelete={handleBulkDelete}
					onCreate={() =>
						setModal({ open: true, mode: "create", target: null })
					}
					createLabel="Add User"
				/>
			</div>

			<CrudModal
				isOpen={modal.open}
				title={modal.mode === "create" ? "Create User" : "Edit User"}
				fields={modal.mode === "create" ? CREATE_USER_FIELDS : USER_FIELDS}
				initialValues={modal.target || {}}
				onSubmit={modal.mode === "create" ? handleCreate : handleEdit}
				onClose={() => setModal({ open: false, mode: "create", target: null })}
			/>
		</div>
	);
}
