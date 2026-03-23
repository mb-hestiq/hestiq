import { useState, useCallback } from "react";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Header from "../components/Header";

export default function RegisterPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [feedback, setFeedback] = useState({ type: "idle", message: "" });

	const handleSubmit = useCallback(
		async (event) => {
			event.preventDefault();
			setIsLoading(true);
			setFeedback({ type: "idle", message: "" });

			try {
				const response = await fetch("/api/auth/register", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ name, email, password }),
				});

				let responseData = null;

				try {
					responseData = await response.json();
				} catch {
					responseData = null;
				}

				if (!response.ok || responseData?.success === false) {
					throw new Error(
						responseData?.error || "Registration failed. Please try again.",
					);
				}

				console.log("Registration successful:", responseData);

				setFeedback({ type: "success", message: "Registration successful!" });
				setName("");
				setEmail("");
				setPassword("");
			} catch (error) {
				setFeedback({ type: "error", message: error.message });
			} finally {
				setIsLoading(false);
			}
		},
		[name, email, password],
	);

	return (
		<>
			<Header />
			<main className="RegisterPage">
				<Form>
					<Form.Header>
						<Form.Title>Register for an account</Form.Title>
						<Form.Description>
							Create your account to access our services and stay updated with
							the latest news.
						</Form.Description>
					</Form.Header>

					<Form.Body onSubmit={handleSubmit}>
						<Form.InputGroup>
							<Form.NameInput
								label="Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
							<Form.EmailInput
								label="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</Form.InputGroup>

						<Form.PasswordInput
							label="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<Form.SubmitButton label="Register" isLoading={isLoading} />
						<Form.Feedback type={feedback.type} message={feedback.message} />
					</Form.Body>
				</Form>
			</main>
			<Footer />
		</>
	);
}
