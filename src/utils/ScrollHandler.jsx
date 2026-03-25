import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollHandler() {
	const location = useLocation();

	useEffect(() => {
		const scrollToTop = location.state?.scrollToTop;
		const scrollTo = location.state?.scrollTo;

		if (scrollToTop) {
			window.scrollTo({ top: 0, behavior: "smooth" });
		} else if (scrollTo) {
			const element = document.getElementById(scrollTo);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		}
	}, [location.pathname, location.state]);

	return null;
}
