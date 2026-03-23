import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [feedback, setFeedback] = useState({ type: "idle", message: "" });

	const { login, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const next = location.state?.next || "/";

	useEffect(() => {
		if (isAuthenticated) navigate(next, { replace: true });
	}, [isAuthenticated, navigate, next]);

	const handleSubmit = useCallback(
		async (event) => {
			event.preventDefault();
			setFeedback({ type: "idle", message: "" });

			if (!EMAIL_RE.test(email)) {
				setFeedback({ type: "error", message: "Invalid email address." });
				return;
			}
			if (!password) {
				setFeedback({ type: "error", message: "Password is required." });
				return;
			}

			setIsLoading(true);
			try {
				await login(email, password);
				navigate(next, { replace: true });
			} catch (error) {
				setFeedback({ type: "error", message: error.message });
			} finally {
				setIsLoading(false);
			}
		},
		[email, password, login, navigate, next],
	);

	return (
		<>
			<Header />
			<main className="AuthPage">
				<Form className="AuthForm">
					<Form.Header>
						<Form.Title>Sign in to your account</Form.Title>
						<Form.Description>
							Enter your credentials to access your account.
						</Form.Description>
					</Form.Header>

					<Form.Body onSubmit={handleSubmit}>
						<Form.EmailInput
							label="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<Form.PasswordInput
							label="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<Form.SubmitButton label="Sign in" isLoading={isLoading} />
						<Form.Feedback type={feedback.type} message={feedback.message} />
					</Form.Body>
				</Form>
			</main>
			<Footer />
		</>
	);
}
