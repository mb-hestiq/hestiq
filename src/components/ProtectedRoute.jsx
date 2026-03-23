import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
	const { isAuthenticated, user, isLoading } = useAuth();
	const location = useLocation();

	if (isLoading) return null;

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ next: location.pathname }} replace />;
	}

	if (requiredRole && user?.role !== requiredRole) {
		return <Navigate to="/" replace />;
	}

	return children;
}
