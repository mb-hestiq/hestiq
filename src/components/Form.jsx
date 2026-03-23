import React from "react";
import {
	FaArrowRight,
	FaCircleNotch,
	FaEye,
	FaEyeSlash,
} from "react-icons/fa6";

function Form({ className = "", children }) {
	return <div className={`Form ${className}`}>{children}</div>;
}

function Header({ children, className = "" }) {
	return <div className={`FormHeader ${className}`}>{children}</div>;
}

function Title({ children, className = "" }) {
	return <h2 className={`FormTitle ${className}`}>{children}</h2>;
}

function Description({ children, className = "" }) {
	return <p className={`FormDescription ${className}`}>{children}</p>;
}

function Body({ children, onSubmit, className = "" }) {
	return (
		<form className={`FormBody ${className}`} onSubmit={onSubmit}>
			{children}
		</form>
	);
}

function NameInput({
	label,
	value,
	onChange,
	className = "",
	required = false,
}) {
	return (
		<label className={`FormField ${className}`}>
			<span className="FormLabel">{label}</span>
			<input
				className="FormInput"
				type="text"
				name="name"
				value={value}
				onChange={onChange}
				autoComplete="name"
				required={required}
			/>
		</label>
	);
}

function EmailInput({
	label,
	value,
	onChange,
	className = "",
	required = false,
}) {
	return (
		<label className={`FormField ${className}`}>
			<span className="FormLabel">{label}</span>
			<input
				className="FormInput"
				type="email"
				name="email"
				value={value}
				onChange={onChange}
				autoComplete="email"
				required={required}
			/>
		</label>
	);
}

function MessageInput({
	label,
	value,
	onChange,
	className = "",
	required = false,
}) {
	return (
		<label className={`FormField ${className}`}>
			<span className="FormLabel">{label}</span>
			<textarea
				className="FormInput FormTextarea"
				name="message"
				value={value}
				onChange={onChange}
				rows={6}
				required={required}
			/>
		</label>
	);
}

function PasswordInput({
	label,
	value,
	onChange,
	className = "",
	required = false,
}) {
	const [showPassword, setShowPassword] = React.useState(false);

	return (
		<label className={`FormField ${className}`}>
			<span className="FormLabel">{label}</span>
			<div className="FormInputContainer">
				<input
					className="FormInput"
					type={showPassword ? "text" : "password"}
					name="password"
					value={value}
					onChange={onChange}
					autoComplete="current-password"
					required={required}
				/>
				<button
					type="button"
					className="FormPasswordToggle"
					onClick={() => setShowPassword(!showPassword)}
				>
					{showPassword ? <FaEye /> : <FaEyeSlash />}
				</button>
			</div>
		</label>
	);
}

function Feedback({ type, message, className = "" }) {
	if (type === "idle") return null;
	return (
		<p className={`FormFeedback ${className}`} data-type={type}>
			{message}
		</p>
	);
}

function SubmitButton({
	label,
	enabled = true,
	isLoading = false,
	className = "",
}) {
	return (
		<button
			className={`CTA FormSubmit ${className}`}
			type="submit"
			disabled={!enabled}
		>
			{isLoading ? <FaCircleNotch className="FormSpinner" /> : null}
			<span>{isLoading ? "Submitting..." : label}</span>
			{!isLoading ? <FaArrowRight /> : null}
		</button>
	);
}

function InputGroup({ children, className = "" }) {
	return <div className={`FormInputGroup ${className}`}>{children}</div>;
}

Form.Header = Header;
Form.Title = Title;
Form.Description = Description;
Form.Body = Body;
Form.NameInput = NameInput;
Form.EmailInput = EmailInput;
Form.MessageInput = MessageInput;
Form.PasswordInput = PasswordInput;
Form.Feedback = Feedback;
Form.SubmitButton = SubmitButton;
Form.InputGroup = InputGroup;

export default Form;
