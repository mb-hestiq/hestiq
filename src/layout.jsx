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
import Designer from "./pages/Designer.jsx";

import DigitalTransformation from "./pages/Solutions/DigitalTransformation.jsx";
import ScalableTechnicalSolutions from "./pages/Solutions/ScalableTechnicalSolutions.jsx";
import EndToEndCreativeStrategy from "./pages/Solutions/EndToEndCreativeStrategy.jsx";
import Solutions from "./pages/Solutions/Solutions.jsx";

import LogoService from "./pages/Design/LogoService.jsx";

import WebApplication from "./pages/Development/WebApplication.jsx";
import SinglePageWebsite from "./pages/Development/SinglePageWebsite.jsx";
import MobileApplication from "./pages/Development/MobileApplication.jsx";
import ECommercePlatform from "./pages/Development/ECommercePlatform.jsx";
import MaintenanceHosting from "./pages/Development/MaintenanceHosting.jsx";
import BusinessWebsite from "./pages/Development/BusinessWebsite.jsx";
import Development from "./pages/Development.jsx";

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
					<Route path="/designer" element={<Designer />} />

					<Route
						path="/admin"
						element={
							<ProtectedRoute requiredRole="admin">
								<AdminLayout />
							</ProtectedRoute>
						}
					/>

					{/* Solutions */}
					<Route path="/solutions" element={<Solutions />} />
					<Route
						path="/solutions/digital-transformation"
						element={<DigitalTransformation />}
					/>
					<Route
						path="/solutions/scalable-technical-solutions"
						element={<ScalableTechnicalSolutions />}
					/>
					<Route
						path="/solutions/end-to-end-creative-strategy"
						element={<EndToEndCreativeStrategy />}
					/>

					{/* Design Services */}
					<Route path="/services/logo" element={<LogoService />} />

					{/* Development Services */}
					<Route path="/development" element={<Development />} />
					<Route
						path="/services/web-application"
						element={<WebApplication />}
					/>
					<Route
						path="/services/single-page-website"
						element={<SinglePageWebsite />}
					/>
					<Route
						path="/services/mobile-application"
						element={<MobileApplication />}
					/>
					<Route
						path="/services/e-commerce-platform"
						element={<ECommercePlatform />}
					/>
					<Route
						path="/services/maintenance-hosting"
						element={<MaintenanceHosting />}
					/>
					<Route
						path="/services/business-website"
						element={<BusinessWebsite />}
					/>

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>,
);
