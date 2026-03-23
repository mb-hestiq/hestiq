import { memo } from "react";
import {
	RiDashboardLine,
	RiUserLine,
	RiShoppingBagLine,
	RiToolsLine,
	RiCodeSSlashLine,
	RiLogoutBoxLine,
	RiCloseLine,
} from "react-icons/ri";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const NAV_ITEMS = [
	{ id: "dashboard", label: "Dashboard", icon: RiDashboardLine },
	{ id: "users", label: "Users", icon: RiUserLine },
	{ id: "orders", label: "Orders", icon: RiShoppingBagLine },
	{ id: "services", label: "Services", icon: RiToolsLine },
	{ id: "api", label: "API", icon: RiCodeSSlashLine },
];

const AdminSidebar = memo(function AdminSidebar({
	activeTab,
	onTabChange,
	isOpen,
	onClose,
}) {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<aside className="admin-sidebar" data-open={isOpen}>
			<div className="admin-sidebar-logo">
				<div className="flex items-center justify-between">
					<span className="text-white font-bold text-xl tracking-tight">
						HestiQ
					</span>
					<button onClick={onClose} className="admin-sidebar-close">
						<RiCloseLine size={20} />
					</button>
				</div>
				<span className="text-white/40 text-xs font-medium">Admin</span>
			</div>

			<nav className="flex-1 flex flex-col gap-1 py-4 px-3">
				{NAV_ITEMS.map(({ id, label, icon: Icon }) => (
					<button
						key={id}
						onClick={() => {
							onTabChange(id);
							onClose();
						}}
						className={`admin-nav-item ${activeTab === id ? "admin-nav-item-active" : ""}`}
					>
						<Icon size={18} />
						<span>{label}</span>
					</button>
				))}
			</nav>

			<div className="p-4 border-t border-white/10 flex justify-end">
				<button
					onClick={handleLogout}
					title="Logout"
					className="admin-nav-item w-auto"
				>
					<RiLogoutBoxLine size={18} />
					<span>Logout</span>
				</button>
			</div>
		</aside>
	);
});

export default AdminSidebar;
