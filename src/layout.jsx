import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./styles/index.css";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PageTracker from "./components/PageTracker";
import App from "./App.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import RefundsPage from "./pages/RefundsPage.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<PageTracker />
				<Routes>
					<Route path="/*" element={<App />} />
					<Route path="/terms" element={<TermsPage />} />
					<Route path="/privacy" element={<PrivacyPage />} />
					<Route path="/refunds" element={<RefundsPage />} />
					<Route path="/onboarding" element={<Onboarding />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route
						path="/admin"
						element={
							<ProtectedRoute requiredRole="admin">
								<AdminLayout />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>,
);
