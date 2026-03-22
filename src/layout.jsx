import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./styles/index.css";
import App from "./App.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import RefundsPage from "./pages/RefundsPage.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import ContactPage from "./pages/ContactPage.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/*" element={<App />} />
				<Route path="/terms" element={<TermsPage />} />
				<Route path="/privacy" element={<PrivacyPage />} />
				<Route path="/refunds" element={<RefundsPage />} />
				<Route path="/onboarding" element={<Onboarding />} />
				<Route path="/contact" element={<ContactPage />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
