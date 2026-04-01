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

const EDIT_FIELDS = [
	{ name: "name", label: "Client Name", type: "text", required: true },
	{ name: "email", label: "Client Email", type: "email", required: true },
	{
		name: "category",
		label: "Category",
		type: "text",
		placeholder: "e.g. Web",
	},
	{
		name: "status",
		label: "Status",
		type: "select",
		required: true,
		options: [
			{ value: "pending", label: "Pending" },
			{ value: "completed", label: "Completed" },
		],
		defaultValue: "pending",
	},
	{ name: "total", label: "Total ($)", type: "number", placeholder: "0" },
	{
		name: "details",
		label: "Details",
		type: "textarea",
		placeholder: "Order details…",
	},
];

const COLUMNS = [
	{
		accessorKey: "_id",
		header: "Order ID",
		cell: (info) => (
			<span className="font-mono text-xs">
				{String(info.getValue()).slice(-8)}
			</span>
		),
	},
	{ accessorKey: "name", header: "Client", cell: (info) => info.getValue() },
	{ accessorKey: "email", header: "Email", cell: (info) => info.getValue() },
	{
		accessorKey: "status",
		header: "Status",
		cell: (info) => (
			<span
				className={`admin-badge ${info.getValue() === "completed" ? "admin-badge-success" : "admin-badge-warning"}`}
			>
				{info.getValue()}
			</span>
		),
	},
	{
		accessorKey: "total",
		header: "Total",
		cell: (info) => `$${(Number(info.getValue()) || 0).toFixed(2)}`,
	},
	{
		accessorKey: "createdAt",
		header: "Date",
		cell: (info) => formatDate(info.getValue()),
	},
];

function ExpandedOrder({ row }) {
	return (
		<div className="grid grid-cols-1 gap-3 text-sm">
			<div>
				<span className="admin-detail-label">Category:</span>{" "}
				<span className="text-text-muted">{row.category || "—"}</span>
			</div>
			<div>
				<span className="admin-detail-label">Services:</span>{" "}
				<span className="text-text-muted">
					{row.services?.map((s) => s.name || s).join(", ") || "—"}
				</span>
			</div>
			<div>
				<span className="admin-detail-label">Details:</span>{" "}
				<span className="text-text-muted">{row.details || "—"}</span>
			</div>
		</div>
	);
}

export default function OrdersTab() {
	const { token } = useAuth();
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);
	const [fetched, setFetched] = useState(false);
	const [modal, setModal] = useState({ open: false, target: null });

	const fetchOrders = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch(`${backendUrl}/orders`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await res.json();
			if (data.success) setOrders(data.orders);
		} finally {
			setLoading(false);
			setFetched(true);
		}
	}, [token]);

	useEffect(() => {
		if (!fetched) fetchOrders();
	}, [fetched, fetchOrders]);

	const handleEdit = useCallback(
		async (form) => {
			const res = await fetch(`${backendUrl}/orders/${modal.target._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(form),
			});
			const data = await res.json();
			if (!data.success)
				throw new Error(data.error || "Failed to update order");
			await fetchOrders();
		},
		[token, modal.target, fetchOrders],
	);

	const handleDelete = useCallback(
		async (id) => {
			const res = await fetch(`${backendUrl}/orders/${id}`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await res.json();
			if (!data.success)
				throw new Error(data.error || "Failed to delete order");
			setOrders((prev) => prev.filter((o) => o._id !== id));
		},
		[token],
	);

	const handleBulkDelete = useCallback(
		async (ids) => {
			const res = await fetch(`${backendUrl}/orders`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ ids }),
			});
			const data = await res.json();
			if (!data.success)
				throw new Error(data.error || "Failed to delete orders");
			setOrders((prev) => prev.filter((o) => !ids.includes(o._id)));
		},
		[token],
	);

	return (
		<div>
			<h2 className="admin-section-title tab-title">Orders</h2>
			<div className="admin-panel">
				<DataGrid
					data={orders}
					columns={COLUMNS}
					expandedContent={(row) => <ExpandedOrder row={row} />}
					loading={loading}
					onEdit={(row) => setModal({ open: true, target: row })}
					onDelete={handleDelete}
					onBulkDelete={handleBulkDelete}
				/>
			</div>

			<CrudModal
				isOpen={modal.open}
				title="Edit Order"
				fields={EDIT_FIELDS}
				initialValues={modal.target || {}}
				onSubmit={handleEdit}
				onClose={() => setModal({ open: false, target: null })}
			/>
		</div>
	);
}
