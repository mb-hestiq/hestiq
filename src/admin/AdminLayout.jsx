import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import DashboardTab from "./tabs/DashboardTab";
import UsersTab from "./tabs/UsersTab";
import OrdersTab from "./tabs/OrdersTab";
import ServicesTab from "./tabs/ServicesTab";
import TeamTab from "./tabs/TeamTab";
import ProfileTab from "./tabs/ProfileTab";
import ApiTab from "./tabs/ApiTab";
import JobsTab from "./tabs/JobsTab";

const TABS = {
	dashboard: DashboardTab,
	users: UsersTab,
	orders: OrdersTab,
	services: ServicesTab,
	team: TeamTab,
	jobs: JobsTab,
	profile: ProfileTab,
	api: ApiTab,
};

export default function AdminLayout() {
	const [activeTab, setActiveTab] = useState("dashboard");
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const TabContent = TABS[activeTab] ?? DashboardTab;

	const closeSidebar = () => setSidebarOpen(false);

	return (
		<div className="admin-layout">
			{sidebarOpen && (
				<div className="admin-sidebar-overlay" onClick={closeSidebar} />
			)}
			<AdminSidebar
				activeTab={activeTab}
				onTabChange={setActiveTab}
				isOpen={sidebarOpen}
				onClose={closeSidebar}
			/>
			<div className="admin-main">
				<AdminHeader
					onProfileClick={() => {
						setActiveTab("profile");
						closeSidebar();
					}}
					onMenuToggle={() => setSidebarOpen((v) => !v)}
				/>
				<div className="admin-content">
					<TabContent />
				</div>
			</div>
		</div>
	);
}
