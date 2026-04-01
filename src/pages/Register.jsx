import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth.js";
import Logo from "../assets/images/logos/logo.svg?react";
import { companyName } from "../../shared/company.js";
import { FaBolt, FaCircleCheck, FaListCheck } from "react-icons/fa6";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [feedback, setFeedback] = useState({ type: "idle", message: "" });

	const { register, isAuthenticated } = useAuth();
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

			if (!name.trim()) {
				setFeedback({ type: "error", message: "Name is required." });
				return;
			}
			if (!EMAIL_RE.test(email)) {
				setFeedback({ type: "error", message: "Invalid email address." });
				return;
			}
			if (password.length < 8) {
				setFeedback({
					type: "error",
					message: "Password must be at least 8 characters.",
				});
				return;
			}

			setIsLoading(true);
			try {
				await register(name, email, password);
				navigate(next, { replace: true });
			} catch (error) {
				setFeedback({ type: "error", message: error.message });
			} finally {
				setIsLoading(false);
			}
		},
		[name, email, password, register, navigate, next],
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
							<p className="auth-brand-eyebrow">Get started for free</p>
							<h1 className="auth-brand-title">
								Create your {companyName} account
							</h1>
							<p className="auth-brand-description">
								Join hands with a team that builds things properly. Your account
								gives you access to services, updates, and direct communication.
							</p>
						</div>
						<div className="auth-brand-features">
							<div className="auth-brand-feature">
								<FaBolt className="auth-brand-feature-icon" />
								<span className="auth-brand-feature-text">
									<strong>Instant access</strong>
									Start requesting services immediately after registration — no
									waiting period.
								</span>
							</div>
							<div className="auth-brand-feature">
								<FaListCheck className="auth-brand-feature-icon" />
								<span className="auth-brand-feature-text">
									<strong>Project visibility</strong>
									Track the status of every order and service from a single
									dashboard.
								</span>
							</div>
							<div className="auth-brand-feature">
								<FaCircleCheck className="auth-brand-feature-icon" />
								<span className="auth-brand-feature-text">
									<strong>Trusted by clients</strong>
									We build long-term relationships — your satisfaction is what
									keeps us going.
								</span>
							</div>
						</div>
					</div>

					<div className="auth-form-panel">
						<Form className="auth-form">
							<Form.Header>
								<Form.Title>Create an account</Form.Title>
								<Form.Description>
									Fill in your details to get started in under a minute.
								</Form.Description>
							</Form.Header>
							<Form.Body onSubmit={handleSubmit}>
								<Form.NameInput
									label="Full name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
								<Form.EmailInput
									label="Email address"
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
								<Form.SubmitButton
									label="Create account"
									isLoading={isLoading}
								/>
								<Form.Feedback
									type={feedback.type}
									message={feedback.message}
								/>
							</Form.Body>
						</Form>
						<p className="auth-switch">
							Already have an account? <Link to="/login">Sign in</Link>
						</p>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
