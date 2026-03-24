import { useEffect } from "react";
import { useLocation } from "react-router";
import { track } from "./analytics";

const SESSION_KEY = "hestiq_session";

export default function PageTracker() {
	const location = useLocation();

	useEffect(() => {
		if (!sessionStorage.getItem(SESSION_KEY)) {
			sessionStorage.setItem(SESSION_KEY, "1");
			track("session_start", { path: location.pathname });
		}
	}, []);

	useEffect(() => {
		track("page_view", {
			path: location.pathname,
			search: location.search || undefined,
		});
	}, [location.pathname]);

	return null;
}
