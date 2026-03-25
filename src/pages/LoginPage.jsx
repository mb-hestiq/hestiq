import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth.js";
import Logo from "../assets/logo.svg?react";
import { companyName } from "../../shared/company.js";
import { FaCircleCheck, FaLock, FaShieldHalved } from "react-icons/fa6";

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
				<div className="AuthCard">
					<div className="AuthBrandPanel">
						<div className="AuthBrandLogo">
							<Logo className="AuthBrandLogoMark" />
						</div>
						<div className="AuthBrandContent">
							<p className="AuthBrandEyebrow">Welcome back</p>
							<h1 className="AuthBrandTitle">
								Sign in to your {companyName} account
							</h1>
							<p className="AuthBrandDescription">
								Access your orders, manage your services, and stay up to date
								with everything happening across your projects.
							</p>
						</div>
						<div className="AuthBrandFeatures">
							<div className="AuthBrandFeature">
								<FaCircleCheck className="AuthBrandFeatureIcon" />
								<span className="AuthBrandFeatureText">
									<strong>Track your orders</strong>
									Monitor projects, check delivery timelines, and review all
									active work in one place.
								</span>
							</div>
							<div className="AuthBrandFeature">
								<FaShieldHalved className="AuthBrandFeatureIcon" />
								<span className="AuthBrandFeatureText">
									<strong>Secure access</strong>
									Your account and data are protected with industry-standard
									authentication.
								</span>
							</div>
							<div className="AuthBrandFeature">
								<FaLock className="AuthBrandFeatureIcon" />
								<span className="AuthBrandFeatureText">
									<strong>Stay in the loop</strong>
									Get updates, notifications, and direct communication from the{" "}
									{companyName} team.
								</span>
							</div>
						</div>
					</div>

					<div className="AuthFormPanel">
						<Form className="AuthForm">
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
						<p className="AuthSwitch">
							Don&apos;t have an account? <Link to="/register">Create one</Link>
						</p>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
