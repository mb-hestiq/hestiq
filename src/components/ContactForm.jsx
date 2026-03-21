import React from "react";
import { FaArrowRight, FaCircleNotch } from "react-icons/fa6";

const INITIAL_FORM = {
	name: "",
	email: "",
	message: "",
};

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
	const [status, setStatus] = React.useState({ type: "idle", message: "" });

	const handleChange = React.useCallback((event) => {
		const { name, value } = event.target;
		setFormData((current) => ({
			...current,
			[name]: value,
		}));
	}, []);

	const handleSubmit = React.useCallback(
		async (event) => {
			event.preventDefault();
			setIsSubmitting(true);
			setStatus({ type: "idle", message: "" });

			try {
				const response = await fetch(endpoint, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...formData,
						...payload,
					}),
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

				setStatus({ type: "success", message: successMessage });
				setFormData(INITIAL_FORM);
				onSuccess?.(responseData);
			} catch (error) {
				setStatus({
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
		<div className={`ContactFormCard ${className}`.trim()}>
			<div className="ContactFormHeader">
				<h2 className="ContactFormTitle">{title}</h2>
				<p className="ContactFormDescription">{description}</p>
			</div>
			<form className="ContactForm" onSubmit={handleSubmit}>
				<label className="ContactFormField">
					<span className="ContactFormLabel">Name</span>
					<input
						className="ContactFormInput"
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						autoComplete="name"
						required
					/>
				</label>
				<label className="ContactFormField">
					<span className="ContactFormLabel">Email</span>
					<input
						className="ContactFormInput"
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						autoComplete="email"
						required
					/>
				</label>
				<label className="ContactFormField">
					<span className="ContactFormLabel">Message</span>
					<textarea
						className="ContactFormInput ContactFormTextarea"
						name="message"
						value={formData.message}
						onChange={handleChange}
						rows={6}
						required
					/>
				</label>
				{status.type !== "idle" && (
					<p className="ContactFormStatus" data-status={status.type}>
						{status.message}
					</p>
				)}
				<button
					className="CTA ContactFormSubmit"
					type="submit"
					disabled={isSubmitting}
				>
					{isSubmitting ? (
						<FaCircleNotch className="ContactFormSpinner" />
					) : null}
					<span>{isSubmitting ? "Submitting..." : submitLabel}</span>
					{!isSubmitting ? <FaArrowRight /> : null}
				</button>
			</form>
		</div>
	);
}
