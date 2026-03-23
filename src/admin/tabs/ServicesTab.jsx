import { useState, useCallback, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import DataGrid from "../components/DataGrid";
import CrudModal from "../components/CrudModal";
import { backendUrl } from "../../../shared/company";

const SERVICE_FIELDS = [
	{ name: "name", label: "Name", type: "text", required: true },
	{
		name: "category",
		label: "Category",
		type: "text",
		placeholder: "e.g. Web Design",
	},
	{ name: "price", label: "Price ($)", type: "number", placeholder: "0" },
	{ name: "discount", label: "Discount (%)", type: "number", placeholder: "0" },
	{
		name: "duration",
		label: "Duration (days)",
		type: "number",
		placeholder: "1",
	},
	{ name: "revisits", label: "Revisits", type: "number", placeholder: "0" },
	{ name: "description", label: "Description", type: "textarea" },
	{
		name: "icon",
		label: "Icon",
		type: "text",
		placeholder: "Icon name or URL",
	},
	{
		name: "href",
		label: "URL (href)",
		type: "text",
		placeholder: "/services/example",
	},
];

const COLUMNS = [
	{ accessorKey: "name", header: "Name", cell: (info) => info.getValue() },
	{
		accessorKey: "category",
		header: "Category",
		cell: (info) => info.getValue() || "—",
	},
	{
		accessorKey: "price",
		header: "Price",
		cell: (info) =>
			info.getValue() != null ? `$${Number(info.getValue()).toFixed(2)}` : "—",
	},
	{
		accessorKey: "discount",
		header: "Discount",
		cell: (info) => (info.getValue() ? `${info.getValue()}%` : "—"),
	},
	{
		accessorKey: "duration",
		header: "Duration",
		cell: (info) => (info.getValue() ? `${info.getValue()} days` : "—"),
	},
];

function ExpandedService({ row }) {
	return (
		<div className="grid grid-cols-1 gap-3 text-sm">
			<div>
				<span className="font-medium text-[#342937]">Description:</span>{" "}
				<span className="text-text-muted">{row.description || "—"}</span>
			</div>
			<div>
				<span className="font-medium text-[#342937]">Revisits:</span>{" "}
				<span className="text-text-muted">{row.revisits ?? "—"}</span>
			</div>
			<div>
				<span className="font-medium text-[#342937]">Icon:</span>{" "}
				<span className="text-text-muted">{row.icon || "—"}</span>
			</div>
			<div>
				<span className="font-medium text-[#342937]">URL:</span>{" "}
				<span className="text-text-muted">{row.href || "—"}</span>
			</div>
		</div>
	);
}

export default function ServicesTab() {
	const { token } = useAuth();
	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(false);
	const [fetched, setFetched] = useState(false);
	const [modal, setModal] = useState({
		open: false,
		mode: "create",
		target: null,
	});

	const fetchServices = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch(`${backendUrl}/api/services`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await res.json();
			if (data.success) setServices(data.services);
		} finally {
			setLoading(false);
			setFetched(true);
		}
	}, [token]);

	useEffect(() => {
		if (!fetched) fetchServices();
	}, [fetched, fetchServices]);

	const handleCreate = useCallback(
		async (form) => {
			const res = await fetch(`${backendUrl}/api/services`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(form),
			});
			const data = await res.json();
			if (!data.success)
				throw new Error(data.error || "Failed to create service");
			await fetchServices();
		},
		[token, fetchServices],
	);

	const handleEdit = useCallback(
		async (form) => {
			const res = await fetch(
				`${backendUrl}/api/services/${modal.target._id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(form),
				},
			);
			const data = await res.json();
			if (!data.success)
				throw new Error(data.error || "Failed to update service");
			await fetchServices();
		},
		[token, modal.target, fetchServices],
	);

	const handleDelete = useCallback(
		async (id) => {
			const res = await fetch(`${backendUrl}/api/services/${id}`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await res.json();
			if (!data.success)
				throw new Error(data.error || "Failed to delete service");
			setServices((prev) => prev.filter((s) => s._id !== id));
		},
		[token],
	);

	const handleBulkDelete = useCallback(
		async (ids) => {
			const res = await fetch(`${backendUrl}/api/services`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ ids }),
			});
			const data = await res.json();
			if (!data.success)
				throw new Error(data.error || "Failed to delete services");
			setServices((prev) => prev.filter((s) => !ids.includes(s._id)));
		},
		[token],
	);

	return (
		<div>
			<h2 className="text-xl font-semibold text-[#342937] tab-title">
				Services
			</h2>
			<div className="bg-white rounded-xl border border-border p-4">
				<DataGrid
					data={services}
					columns={COLUMNS}
					expandedContent={(row) => <ExpandedService row={row} />}
					loading={loading}
					onEdit={(row) => setModal({ open: true, mode: "edit", target: row })}
					onDelete={handleDelete}
					onBulkDelete={handleBulkDelete}
					onCreate={() =>
						setModal({ open: true, mode: "create", target: null })
					}
					createLabel="Add Service"
				/>
			</div>

			<CrudModal
				isOpen={modal.open}
				title={modal.mode === "create" ? "Create Service" : "Edit Service"}
				fields={SERVICE_FIELDS}
				initialValues={modal.target || {}}
				onSubmit={modal.mode === "create" ? handleCreate : handleEdit}
				onClose={() => setModal({ open: false, mode: "create", target: null })}
			/>
		</div>
	);
}
