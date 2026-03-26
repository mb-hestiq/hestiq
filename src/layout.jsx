import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

const params = new URLSearchParams(window.location.search);
const redirect = params.get("redirect");

if (redirect) {
	const decoded = decodeURIComponent(redirect);

	if (
		decoded !==
		window.location.pathname + window.location.search + window.location.hash
	) {
		window.history.replaceState(null, "", decoded);
	}
}

import "./styles/index.css";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import App from "./App.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import RefundsPage from "./pages/RefundsPage.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import FAQ from "./pages/FAQ.jsx";
import TeamPage from "./pages/TeamPage.jsx";
import CareerPage from "./pages/CareerPage.jsx";
import PricingPage from "./pages/PricingPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

import DigitalTransformation from "./pages/Solutions/DigitalTransformation.jsx";

import PageTracker from "./utils/PageTracker.jsx";
import ScrollHandler from "./utils/ScrollHandler.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<PageTracker />
				<ScrollHandler />

				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/terms" element={<TermsPage />} />
					<Route path="/privacy" element={<PrivacyPage />} />
					<Route path="/refunds" element={<RefundsPage />} />
					<Route path="/onboarding" element={<Onboarding />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/faq" element={<FAQ />} />
					<Route path="/team" element={<TeamPage />} />
					<Route path="/career" element={<CareerPage />} />
					<Route path="/pricing" element={<PricingPage />} />
					<Route path="/about" element={<AboutPage />} />

					<Route
						path="/admin"
						element={
							<ProtectedRoute requiredRole="admin">
								<AdminLayout />
							</ProtectedRoute>
						}
					/>

					<Route path="/solutions">
						<Route
							path="digital-transformation"
							element={<DigitalTransformation />}
						/>
					</Route>

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>,
);
