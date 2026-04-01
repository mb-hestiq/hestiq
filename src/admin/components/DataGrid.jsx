import { useState, useCallback, useMemo, memo, Fragment } from "react";
import {
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getExpandedRowModel,
	flexRender,
} from "@tanstack/react-table";
import {
	RiArrowUpSLine,
	RiArrowDownSLine,
	RiExpandUpDownLine,
	RiEditLine,
	RiDeleteBinLine,
	RiArrowDownSFill,
	RiArrowRightSFill,
	RiAddLine,
} from "react-icons/ri";
import ConfirmDialog from "./ConfirmDialog";

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];

function IndeterminateCheckbox({ indeterminate, className = "", ...rest }) {
	const ref = useCallback(
		(el) => {
			if (el) el.indeterminate = indeterminate;
		},
		[indeterminate],
	);

	return (
		<input
			type="checkbox"
			ref={ref}
			className={`w-4 h-4 accent-primary cursor-pointer ${className}`}
			{...rest}
		/>
	);
}

const DataGrid = memo(function DataGrid({
	data,
	columns,
	expandedContent,
	onEdit,
	onDelete,
	onBulkDelete,
	onCreate,
	loading = false,
	createLabel = "Create",
}) {
	const [sorting, setSorting] = useState([]);
	const [columnFilters, setColumnFilters] = useState([]);
	const [rowSelection, setRowSelection] = useState({});
	const [expanded, setExpanded] = useState({});
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
	const [deleteTarget, setDeleteTarget] = useState(null);
	const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

	const selectionColumn = useMemo(
		() => ({
			id: "select",
			header: ({ table }) => (
				<IndeterminateCheckbox
					checked={table.getIsAllPageRowsSelected()}
					indeterminate={table.getIsSomePageRowsSelected()}
					onChange={table.getToggleAllPageRowsSelectedHandler()}
				/>
			),
			cell: ({ row }) => (
				<IndeterminateCheckbox
					checked={row.getIsSelected()}
					onChange={row.getToggleSelectedHandler()}
					onClick={(e) => e.stopPropagation()}
				/>
			),
			enableSorting: false,
			enableColumnFilter: false,
			size: 40,
		}),
		[],
	);

	const actionsColumn = useMemo(
		() => ({
			id: "actions",
			header: "Actions",
			cell: ({ row }) => (
				<div
					className="flex items-center gap-1"
					onClick={(e) => e.stopPropagation()}
				>
					<button
						onClick={() => onEdit?.(row.original)}
						className="admin-icon-btn text-primary"
						title="Edit"
					>
						<RiEditLine size={16} />
					</button>
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
			size: 80,
		}),
		[onEdit],
	);

	const expandColumn = useMemo(
		() => ({
			id: "expand",
			header: "",
			cell: ({ row }) =>
				expandedContent ? (
					<button
						onClick={(e) => {
							e.stopPropagation();
							row.toggleExpanded();
						}}
						className="admin-icon-btn"
					>
						{row.getIsExpanded() ? (
							<RiArrowDownSFill size={16} />
						) : (
							<RiArrowRightSFill size={16} />
						)}
					</button>
				) : null,
			enableSorting: false,
			enableColumnFilter: false,
			size: 36,
		}),
		[expandedContent],
	);

	const tableColumns = useMemo(() => {
		const cols = [selectionColumn];
		if (expandedContent) cols.push(expandColumn);
		cols.push(...columns);
		cols.push(actionsColumn);
		return cols;
	}, [selectionColumn, expandColumn, expandedContent, columns, actionsColumn]);

	const table = useReactTable({
		data,
		columns: tableColumns,
		state: { sorting, columnFilters, rowSelection, expanded, pagination },
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onRowSelectionChange: setRowSelection,
		onExpandedChange: setExpanded,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getRowCanExpand: () => !!expandedContent,
		manualPagination: false,
	});

	const selectedIds = useMemo(
		() => table.getSelectedRowModel().rows.map((r) => r.original._id),
		[table.getSelectedRowModel().rows],
	);

	const handleBulkDelete = useCallback(async () => {
		await onBulkDelete?.(selectedIds);
		setRowSelection({});
		setBulkDeleteOpen(false);
	}, [onBulkDelete, selectedIds]);

	const handleSingleDelete = useCallback(async () => {
		if (!deleteTarget) return;
		await onDelete?.(deleteTarget._id);
		setDeleteTarget(null);
	}, [onDelete, deleteTarget]);

	return (
		<div className="admin-datagrid">
			<div className="flex items-center justify-between mb-4">
				<div className="text-sm text-text-muted">
					{table.getFilteredRowModel().rows.length} record(s)
				</div>
				{onCreate && (
					<button
						onClick={onCreate}
						className="admin-btn-primary flex items-center gap-2"
					>
						<RiAddLine size={16} />
						{createLabel}
					</button>
				)}
			</div>

			<div className="overflow-x-auto rounded-lg border border-border">
				<table className="w-full text-sm">
					<thead className="bg-bg text-primary">
						{table.getHeaderGroups().map((hg) => (
							<tr key={hg.id}>
								{hg.headers.map((header) => (
									<th
										key={header.id}
										style={{
											width:
												header.getSize() !== 150 ? header.getSize() : undefined,
										}}
										className="px-3 py-3 text-left font-medium whitespace-nowrap"
									>
										{header.isPlaceholder ? null : (
											<div className="flex flex-col gap-1">
												<div
													className={`flex items-center gap-1 ${header.column.getCanSort() ? "cursor-pointer select-none" : ""}`}
													onClick={
														header.column.getCanSort()
															? header.column.getToggleSortingHandler()
															: undefined
													}
												>
													{flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
													{header.column.getCanSort() &&
														(header.column.getIsSorted() === "asc" ? (
															<RiArrowUpSLine size={14} />
														) : header.column.getIsSorted() === "desc" ? (
															<RiArrowDownSLine size={14} />
														) : (
															<RiExpandUpDownLine
																size={14}
																className="opacity-50"
															/>
														))}
												</div>
												{header.column.getCanFilter() && (
													<input
														type="text"
														value={header.column.getFilterValue() ?? ""}
														onChange={(e) =>
															header.column.setFilterValue(e.target.value)
														}
														placeholder="Filter…"
														className="admin-input admin-filter-input"
														onClick={(e) => e.stopPropagation()}
													/>
												)}
											</div>
										)}
									</th>
								))}
							</tr>
						))}
					</thead>

					<tbody>
						{loading ? (
							<tr>
								<td
									colSpan={tableColumns.length}
									className="px-4 py-10 text-center text-text-muted"
								>
									Loading…
								</td>
							</tr>
						) : table.getRowModel().rows.length === 0 ? (
							<tr>
								<td
									colSpan={tableColumns.length}
									className="px-4 py-10 text-center text-text-muted"
								>
									No records found.
								</td>
							</tr>
						) : (
							table.getRowModel().rows.map((row) => (
								<Fragment key={row.id}>
									<tr
										className={`border-t border-border hover:bg-bg transition-colors ${row.getIsSelected() ? "bg-bg" : "bg-white"}`}
									>
										{row.getVisibleCells().map((cell) => (
											<td key={cell.id} className="px-3 py-3">
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</td>
										))}
									</tr>
									{row.getIsExpanded() && expandedContent && (
										<tr className="bg-[#f8f9fa] border-t border-border">
											<td colSpan={tableColumns.length} className="px-6 py-4">
												{expandedContent(row.original)}
											</td>
										</tr>
									)}
								</Fragment>
							))
						)}
					</tbody>
				</table>
			</div>

			<div className="flex items-center justify-between mt-4 flex-wrap gap-3">
				<div className="flex items-center gap-2 shrink-0">
					<span className="text-sm text-text-muted whitespace-nowrap">
						Rows per page:
					</span>
					<select
						className="admin-input py-1 px-2 text-sm"
						value={table.getState().pagination.pageSize}
						onChange={(e) => table.setPageSize(Number(e.target.value))}
					>
						{PAGE_SIZE_OPTIONS.map((n) => (
							<option key={n} value={n}>
								{n}
							</option>
						))}
					</select>
				</div>
				<div className="flex items-center gap-2 text-sm text-text-muted">
					<span>
						Page {table.getState().pagination.pageIndex + 1} of{" "}
						{Math.max(1, table.getPageCount())}
					</span>
					<button
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						className="admin-icon-btn disabled:opacity-40"
					>
						‹
					</button>
					<button
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						className="admin-icon-btn disabled:opacity-40"
					>
						›
					</button>
				</div>
			</div>

			{selectedIds.length > 0 && (
				<div className="admin-bulk-bar">
					<span className="text-sm font-medium">
						{selectedIds.length} selected
					</span>
					<button
						onClick={() => setBulkDeleteOpen(true)}
						className="admin-bulk-danger-btn"
					>
						<RiDeleteBinLine size={14} />
						Delete selected
					</button>
					<button
						onClick={() => setRowSelection({})}
						className="text-sm opacity-70 hover:opacity-100"
					>
						Deselect all
					</button>
				</div>
			)}

			<ConfirmDialog
				isOpen={!!deleteTarget}
				title="Delete record"
				message={`Are you sure you want to delete this record? This action cannot be undone.`}
				confirmLabel="Delete"
				onConfirm={handleSingleDelete}
				onClose={() => setDeleteTarget(null)}
			/>

			<ConfirmDialog
				isOpen={bulkDeleteOpen}
				title="Delete selected records"
				message={`Are you sure you want to delete ${selectedIds.length} record(s)? This action cannot be undone.`}
				confirmLabel={`Delete ${selectedIds.length}`}
				onConfirm={handleBulkDelete}
				onClose={() => setBulkDeleteOpen(false)}
			/>
		</div>
	);
});

export default DataGrid;
