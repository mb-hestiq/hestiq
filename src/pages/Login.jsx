import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth.js";
import Logo from "../assets/images/logos/logo.svg?react";
import { companyName } from "../../shared/company.js";
import { FaCircleCheck, FaLock, FaShieldHalved } from "react-icons/fa6";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
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
			<main className="auth-page">
				<div className="auth-card">
					<div className="auth-brand-panel">
						<div className="auth-brand-logo">
							<Logo className="auth-brand-logo-mark" />
						</div>
						<div className="auth-brand-content">
							<p className="auth-brand-eyebrow">Welcome back</p>
							<h1 className="auth-brand-title">
								Sign in to your {companyName} account
							</h1>
							<p className="auth-brand-description">
								Access your orders, manage your services, and stay up to date
								with everything happening across your projects.
							</p>
						</div>
						<div className="auth-brand-features">
							<div className="auth-brand-feature">
								<FaCircleCheck className="auth-brand-feature-icon" />
								<span className="auth-brand-feature-text">
									<strong>Track your orders</strong>
									Monitor projects, check delivery timelines, and review all
									active work in one place.
								</span>
							</div>
							<div className="auth-brand-feature">
								<FaShieldHalved className="auth-brand-feature-icon" />
								<span className="auth-brand-feature-text">
									<strong>Secure access</strong>
									Your account and data are protected with industry-standard
									authentication.
								</span>
							</div>
							<div className="auth-brand-feature">
								<FaLock className="auth-brand-feature-icon" />
								<span className="auth-brand-feature-text">
									<strong>Stay in the loop</strong>
									Get updates, notifications, and direct communication from the{" "}
									{companyName} team.
								</span>
							</div>
						</div>
					</div>

					<div className="auth-form-panel">
						<Form className="auth-form">
							<Form.Header>
								<Form.Title>Sign in</Form.Title>
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
								<Form.Feedback
									type={feedback.type}
									message={feedback.message}
								/>
							</Form.Body>
						</Form>
						<p className="auth-switch">
							Don&apos;t have an account? <Link to="/register">Create one</Link>
						</p>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
