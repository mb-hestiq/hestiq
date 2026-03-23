import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

export default function AdminPage() {
	const { token } = useAuth();
	const [status, setStatus] = useState("loading");

	useEffect(() => {
		if (!token) {
			setStatus("denied");
			return;
		}
		fetch("/api/auth/admin", {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => {
				setStatus(res.ok ? "authorized" : "denied");
			})
			.catch(() => setStatus("denied"));
	}, [token]);

	return (
		<>
			<Header />
			<main className="AdminPage">
				{status === "loading" && <p>Verifying access…</p>}
				{status === "denied" && <p>Access denied.</p>}
				{status === "authorized" && <h1>Admin Dashboard</h1>}
			</main>
			<Footer />
		</>
	);
}
