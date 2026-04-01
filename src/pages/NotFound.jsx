import { Link } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function NotFound() {
	return (
		<>
			<Header />
			<main className="flex flex-col items-center justify-center flex-1 px-6 py-24 text-center gap-6">
				<p
					className="font-bold leading-none select-none"
					style={{
						fontSize: "clamp(6rem, 20vw, 12rem)",
						color: "var(--color-primary)",
						opacity: 0.08,
					}}
					aria-hidden="true"
				>
					404
				</p>
				<div className="flex flex-col items-center gap-3 -mt-16">
					<h1
						className="font-bold text-3xl md:text-4xl"
						style={{ color: "var(--color-primary)" }}
					>
						Page not found
					</h1>
					<p
						className="max-w-md text-base"
						style={{ color: "var(--color-text-muted)" }}
					>
						The page you're looking for doesn't exist or has been moved.
					</p>
				</div>
				<Link className="cta px-6 py-2.5 font-semibold text-sm" to="/">
					Back to Home
				</Link>
			</main>
		</>
	);
}
