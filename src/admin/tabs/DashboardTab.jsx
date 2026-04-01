import { useState, useCallback, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
	AreaChart,
	Area,
	BarChart,
	Bar,
	PieChart,
	Pie,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";
import {
	RiRefreshLine,
	RiDownloadLine,
	RiUserLine,
	RiEyeLine,
	RiFileList2Line,
	RiShoppingBagLine,
	RiArrowUpLine,
	RiArrowDownLine,
} from "react-icons/ri";
import backendUrl from "../../utils/backend";

const CHART_COLORS = [
	"#342937",
	"#6c757d",
	"#17a2b8",
	"#28a745",
	"#ffc107",
	"#dc3545",
];
const DEVICE_COLORS = {
	desktop: "#342937",
	tablet: "#17a2b8",
	mobile: "#28a745",
};

function formatNumber(n) {
	if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
	if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
	return String(n);
}

function downloadJSON(filename, data) {
	const blob = new Blob([JSON.stringify(data, null, 2)], {
		type: "application/json",
	});
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `${filename}.json`;
	a.click();
	URL.revokeObjectURL(url);
}

function SectionCard({
	title,
	loading,
	onSync,
	onExport,
	exportData,
	exportName,
	children,
}) {
	return (
		<div className="admin-panel admin-panel-spacious">
			<div className="flex items-center justify-between mb-5">
				<h3 className="font-semibold text-primary text-base">{title}</h3>
				<div className="flex items-center gap-2">
					<button
						onClick={onSync}
						disabled={loading}
						title="Sync"
						className="admin-icon-btn text-text-muted hover:text-primary"
					>
						<RiRefreshLine
							size={16}
							className={loading ? "animate-spin" : ""}
						/>
					</button>
					<button
						onClick={() => downloadJSON(exportName, exportData)}
						title="Export JSON"
						className="admin-icon-btn text-text-muted hover:text-primary"
					>
						<RiDownloadLine size={16} />
					</button>
				</div>
			</div>
			{loading ? (
				<div className="h-40 flex items-center justify-center text-sm text-text-muted">
					Loading…
				</div>
			) : (
				children
			)}
		</div>
	);
}

function StatCard({ icon: Icon, label, value, sub, subPositive }) {
	return (
		<div className="admin-panel admin-panel-spacious flex items-start gap-4">
			<div className="admin-stat-icon">
				<Icon size={18} className="text-white" />
			</div>
			<div>
				<div className="admin-stat-value">{value}</div>
				<div className="text-sm text-text-muted">{label}</div>
				{sub !== undefined && (
					<div
						className={`text-xs font-medium flex items-center gap-0.5 mt-0.5 ${subPositive ? "text-green-600" : "text-red-600"}`}
					>
						{subPositive ? (
							<RiArrowUpLine size={12} />
						) : (
							<RiArrowDownLine size={12} />
						)}
						{sub}
					</div>
				)}
			</div>
		</div>
	);
}

export default function DashboardTab() {
	const { token } = useAuth();
	const [period, setPeriod] = useState("month");

	const [trafficData, setTrafficData] = useState(null);
	const [sourceData, setSourceData] = useState(null);
	const [ordersData, setOrdersData] = useState(null);
	const [usersData, setUsersData] = useState(null);

	const [loading, setLoading] = useState({
		traffic: false,
		source: false,
		orders: false,
		users: false,
	});

	const setSection = useCallback(
		(key, value) => setLoading((prev) => ({ ...prev, [key]: value })),
		[],
	);

	const fetchTraffic = useCallback(
		async (p) => {
			setSection("traffic", true);
			try {
				const res = await fetch(`${backendUrl}/analytics/traffic?period=${p}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				const data = await res.json();
				if (data.success) setTrafficData(data.data);
			} finally {
				setSection("traffic", false);
			}
		},
		[token, setSection],
	);

	const fetchSource = useCallback(
		async (p) => {
			setSection("source", true);
			try {
				const res = await fetch(`${backendUrl}/analytics/source?period=${p}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				const data = await res.json();
				if (data.success) setSourceData(data.data);
			} finally {
				setSection("source", false);
			}
		},
		[token, setSection],
	);

	const fetchOrders = useCallback(
		async (p) => {
			setSection("orders", true);
			try {
				const res = await fetch(
					`${backendUrl}/analytics/orders-stats?period=${p}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					},
				);
				const data = await res.json();
				if (data.success) setOrdersData(data.data);
			} finally {
				setSection("orders", false);
			}
		},
		[token, setSection],
	);

	const fetchUsers = useCallback(
		async (p) => {
			setSection("users", true);
			try {
				const res = await fetch(
					`${backendUrl}/analytics/users-stats?period=${p}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					},
				);
				const data = await res.json();
				if (data.success) setUsersData(data.data);
			} finally {
				setSection("users", false);
			}
		},
		[token, setSection],
	);

	useEffect(() => {
		fetchTraffic(period);
		fetchSource(period);
		fetchOrders(period);
		fetchUsers(period);
	}, [period]);

	const devicePieData = sourceData
		? Object.entries(sourceData).map(([name, value]) => ({ name, value }))
		: [];

	const usersPieData = usersData
		? [
				{ name: "New", value: usersData.new },
				{ name: "Returning", value: usersData.returning },
			]
		: [];

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between flex-wrap gap-3">
				<h2 className="admin-section-title">Dashboard</h2>
				<div className="admin-toggle-group">
					{["day", "month", "year"].map((p) => (
						<button
							key={p}
							onClick={() => setPeriod(p)}
							className={`admin-toggle-btn ${period === p ? "admin-toggle-btn-active" : "admin-toggle-btn-idle"}`}
						>
							{p}
						</button>
					))}
				</div>
			</div>

			<SectionCard
				title="Traffic"
				loading={loading.traffic}
				onSync={() => fetchTraffic(period)}
				exportData={trafficData}
				exportName="traffic"
			>
				<div className="grid grid-cols-3 gap-4 mb-6">
					<StatCard
						icon={RiEyeLine}
						label="Visits"
						value={formatNumber(trafficData?.visits ?? 0)}
					/>
					<StatCard
						icon={RiFileList2Line}
						label="Page Views"
						value={formatNumber(trafficData?.pageviews ?? 0)}
					/>
					<StatCard
						icon={RiUserLine}
						label="Unique Visitors"
						value={formatNumber(trafficData?.unique ?? 0)}
					/>
				</div>
				<ResponsiveContainer width="100%" height={200}>
					<AreaChart
						data={trafficData?.trend ?? []}
						margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
					>
						<defs>
							<linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#342937" stopOpacity={0.2} />
								<stop offset="95%" stopColor="#342937" stopOpacity={0} />
							</linearGradient>
						</defs>
						<CartesianGrid strokeDasharray="3 3" stroke="#dee2e6" />
						<XAxis
							dataKey="label"
							tick={{ fontSize: 11 }}
							tickLine={false}
							axisLine={false}
						/>
						<YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
						<Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
						<Area
							type="monotone"
							dataKey="count"
							stroke="#342937"
							fill="url(#trafficGrad)"
							strokeWidth={2}
							dot={false}
							name="Visits"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</SectionCard>

			<SectionCard
				title="Traffic Source"
				loading={loading.source}
				onSync={() => fetchSource(period)}
				exportData={sourceData}
				exportName="traffic-source"
			>
				<div className="flex flex-col sm:flex-row items-center gap-6">
					<ResponsiveContainer width="100%" height={200}>
						<PieChart>
							<Pie
								data={devicePieData}
								cx="50%"
								cy="50%"
								innerRadius={55}
								outerRadius={80}
								paddingAngle={3}
								dataKey="value"
							>
								{devicePieData.map((entry) => (
									<Cell
										key={entry.name}
										fill={DEVICE_COLORS[entry.name] || CHART_COLORS[0]}
									/>
								))}
							</Pie>
							<Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
							<Legend
								iconType="circle"
								iconSize={10}
								formatter={(v) => (
									<span className="text-xs capitalize">{v}</span>
								)}
							/>
						</PieChart>
					</ResponsiveContainer>
					<div className="flex flex-col gap-3 min-w-max">
						{devicePieData.map((d) => (
							<div key={d.name} className="flex items-center gap-3">
								<div
									className="w-3 h-3 rounded-full shrink-0"
									style={{ backgroundColor: DEVICE_COLORS[d.name] }}
								/>
								<span className="text-sm capitalize text-primary font-medium w-16">
									{d.name}
								</span>
								<span className="text-sm text-text-muted">
									{formatNumber(d.value)}
								</span>
							</div>
						))}
					</div>
				</div>
			</SectionCard>

			<SectionCard
				title="Orders Analytics"
				loading={loading.orders}
				onSync={() => fetchOrders(period)}
				exportData={ordersData}
				exportName="orders-analytics"
			>
				<div className="grid grid-cols-2 gap-4 mb-6">
					<StatCard
						icon={RiShoppingBagLine}
						label="This Month"
						value={ordersData?.monthly ?? 0}
						sub={`${Math.abs(ordersData?.change ?? 0)}% from last month`}
						subPositive={(ordersData?.change ?? 0) >= 0}
					/>
					<StatCard
						icon={RiShoppingBagLine}
						label="Total Orders"
						value={formatNumber(ordersData?.total ?? 0)}
					/>
				</div>
				<p className="text-xs text-text-muted font-medium">Orders by Weekday</p>
				<ResponsiveContainer width="100%" height={180} className="mt-5">
					<BarChart
						data={ordersData?.byWeekday ?? []}
						margin={{ top: 0, right: 4, left: -20, bottom: 0 }}
					>
						<CartesianGrid strokeDasharray="3 3" stroke="#dee2e6" />
						<XAxis
							dataKey="day"
							tick={{ fontSize: 11 }}
							tickLine={false}
							axisLine={false}
						/>
						<YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
						<Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
						<Bar
							dataKey="count"
							fill="#342937"
							radius={[4, 4, 0, 0]}
							name="Orders"
						/>
					</BarChart>
				</ResponsiveContainer>
			</SectionCard>

			<SectionCard
				title="Customer Analytics"
				loading={loading.users}
				onSync={() => fetchUsers(period)}
				exportData={usersData}
				exportName="customer-analytics"
			>
				<div className="flex flex-col sm:flex-row gap-6">
					<div className="flex-1">
						<div className="grid grid-cols-2 gap-3 mb-4">
							<div className="admin-metric-tile">
								<div className="admin-metric-value">{usersData?.new ?? 0}</div>
								<div className="admin-metric-caption">New</div>
							</div>
							<div className="admin-metric-tile admin-metric-tile-primary">
								<div className="admin-metric-value">
									{usersData?.returning ?? 0}
								</div>
								<div className="admin-metric-caption">Returning</div>
							</div>
						</div>
						<ResponsiveContainer width="100%" height={160}>
							<PieChart>
								<Pie
									data={usersPieData}
									cx="50%"
									cy="50%"
									outerRadius={65}
									paddingAngle={3}
									dataKey="value"
								>
									<Cell fill="#342937" />
									<Cell fill="#17a2b8" />
								</Pie>
								<Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
								<Legend
									iconType="circle"
									iconSize={10}
									formatter={(v) => <span className="text-xs">{v}</span>}
								/>
							</PieChart>
						</ResponsiveContainer>
					</div>
					<div className="flex-1">
						<p className="text-xs text-text-muted mb-3 font-medium">
							Top Locations
						</p>
						{!usersData?.geo?.length ? (
							<p className="text-sm text-text-muted">
								No geolocation data yet.
							</p>
						) : (
							<div className="flex flex-col gap-2">
								{usersData.geo.map((g, i) => (
									<div
										key={i}
										className="flex items-center justify-between text-sm border-b border-border pb-2"
									>
										<span className="text-primary">
											{[g.city, g.country].filter(Boolean).join(", ") ||
												"Unknown"}
										</span>
										<span className="font-medium text-primary">{g.count}</span>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</SectionCard>
		</div>
	);
}
