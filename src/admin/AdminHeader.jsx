import { memo } from "react";
import { RiMenuLine } from "react-icons/ri";
import { useAuth } from "../hooks/useAuth";

const AdminHeader = memo(function AdminHeader({
	onProfileClick,
	onMenuToggle,
}) {
	const { user } = useAuth();
	const initial = (user?.name || user?.email || "A").charAt(0).toUpperCase();

	return (
		<div className="admin-topbar">
			<button onClick={onMenuToggle} className="admin-hamburger">
				<RiMenuLine size={20} />
			</button>
			<div className="flex-1" />
			<button
				onClick={onProfileClick}
				className="admin-avatar"
				title={`${user?.name || user?.email} — Profile`}
			>
				{initial}
			</button>
		</div>
	);
});

export default AdminHeader;
