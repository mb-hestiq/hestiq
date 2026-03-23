import React from "react";
import Form from "./Form";

const INITIAL_FORM = { name: "", email: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({
	endpoint,
	payload = {},
	title = "Tell us more about your project",
	description = "Share the details so we can respond with the right approach.",
	submitLabel = "Submit request",
	successMessage = "Your request has been submitted successfully.",
	className = "",
	onSuccess,
}) {
	const [formData, setFormData] = React.useState(INITIAL_FORM);
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [feedback, setFeedback] = React.useState({ type: "idle", message: "" });

	const handleChange = React.useCallback((event) => {
		const { name, value } = event.target;
		setFormData((current) => ({ ...current, [name]: value }));
	}, []);

	const handleSubmit = React.useCallback(
		async (event) => {
			event.preventDefault();
			setFeedback({ type: "idle", message: "" });

			if (!formData.name.trim()) {
				setFeedback({ type: "error", message: "Name is required." });
				return;
			}
			if (!EMAIL_RE.test(formData.email)) {
				setFeedback({ type: "error", message: "Invalid email address." });
				return;
			}
			if (!formData.message.trim()) {
				setFeedback({ type: "error", message: "Message is required." });
				return;
			}

			setIsSubmitting(true);
			try {
				const response = await fetch(endpoint, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ ...formData, ...payload }),
				});

				let responseData = null;
				try {
					responseData = await response.json();
				} catch {
					responseData = null;
				}

				if (!response.ok || responseData?.success === false) {
					throw new Error(
						responseData?.error ||
							"We couldn't submit your request. Please try again.",
					);
				}

				setFeedback({ type: "success", message: successMessage });
				setFormData(INITIAL_FORM);
				onSuccess?.(responseData);
			} catch (error) {
				setFeedback({
					type: "error",
					message:
						error instanceof Error
							? error.message
							: "We couldn't submit your request. Please try again.",
				});
			} finally {
				setIsSubmitting(false);
			}
		},
		[endpoint, formData, onSuccess, payload, successMessage],
	);

	return (
		<Form className={className}>
			<Form.Header>
				<Form.Title>{title}</Form.Title>
				<Form.Description>{description}</Form.Description>
			</Form.Header>
			<Form.Body onSubmit={handleSubmit}>
				<Form.NameInput
					label="Name"
					value={formData.name}
					onChange={handleChange}
					required
				/>
				<Form.EmailInput
					label="Email"
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<Form.MessageInput
					label="Message"
					value={formData.message}
					onChange={handleChange}
					required
				/>
				<Form.SubmitButton label={submitLabel} isLoading={isSubmitting} />
				<Form.Feedback type={feedback.type} message={feedback.message} />
			</Form.Body>
		</Form>
	);
}
