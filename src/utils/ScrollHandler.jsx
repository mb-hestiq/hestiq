import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollHandler() {
	const location = useLocation();

	useEffect(() => {
		const scrollToTop = location.state?.scrollToTop;

		if (scrollToTop) {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	}, [location.pathname, location.state]);

	return null;
}
