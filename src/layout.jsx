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
import NotFound from "./pages/NotFound.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import Refunds from "./pages/Refunds.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import Contact from "./pages/Contact.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import FAQ from "./pages/FAQ.jsx";
import Team from "./pages/Team.jsx";
import Career from "./pages/Career.jsx";
import Pricing from "./pages/Pricing.jsx";
import About from "./pages/About.jsx";
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
					<Route path="/terms" element={<Terms />} />
					<Route path="/privacy" element={<Privacy />} />
					<Route path="/refunds" element={<Refunds />} />
					<Route path="/onboarding" element={<Onboarding />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/faq" element={<FAQ />} />
					<Route path="/team" element={<Team />} />
					<Route path="/career" element={<Career />} />
					<Route path="/pricing" element={<Pricing />} />
					<Route path="/about" element={<About />} />
					<Route path="/designer" element={<Designer />} />

					<Route
						path="/admin"
						element={
							<ProtectedRoute requiredRole="admin">
								<AdminLayout />
							</ProtectedRoute>
						}
					/>
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
					<Route path="/services/logo" element={<LogoService />} />
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

					<Route path="*" element={<NotFound />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>,
);
