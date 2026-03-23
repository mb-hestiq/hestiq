import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/logo.svg?react";
import { companyName } from "../../shared/company.js";
import { FaBolt, FaCircleCheck, FaListCheck } from "react-icons/fa6";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
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
			<main className="AuthPage">
				<div className="AuthCard">
					<div className="AuthBrandPanel">
						<div className="AuthBrandLogo">
							<Logo className="AuthBrandLogoMark" />
						</div>
						<div className="AuthBrandContent">
							<p className="AuthBrandEyebrow">Get started for free</p>
							<h1 className="AuthBrandTitle">
								Create your {companyName} account
							</h1>
							<p className="AuthBrandDescription">
								Join hands with a team that builds things properly. Your account
								gives you access to services, updates, and direct communication.
							</p>
						</div>
						<div className="AuthBrandFeatures">
							<div className="AuthBrandFeature">
								<FaBolt className="AuthBrandFeatureIcon" />
								<span className="AuthBrandFeatureText">
									<strong>Instant access</strong>
									Start requesting services immediately after registration — no
									waiting period.
								</span>
							</div>
							<div className="AuthBrandFeature">
								<FaListCheck className="AuthBrandFeatureIcon" />
								<span className="AuthBrandFeatureText">
									<strong>Project visibility</strong>
									Track the status of every order and service from a single
									dashboard.
								</span>
							</div>
							<div className="AuthBrandFeature">
								<FaCircleCheck className="AuthBrandFeatureIcon" />
								<span className="AuthBrandFeatureText">
									<strong>Trusted by clients</strong>
									We build long-term relationships — your satisfaction is what
									keeps us going.
								</span>
							</div>
						</div>
					</div>

					<div className="AuthFormPanel">
						<Form className="AuthForm">
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
						<p className="AuthSwitch">
							Already have an account? <Link to="/login">Sign in</Link>
						</p>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
