import React from "react";
import {
	FaArrowRight,
	FaCircleNotch,
	FaEye,
	FaEyeSlash,
} from "react-icons/fa6";

function Form({ className = "", children }) {
	return <div className={`form-shell ${className}`.trim()}>{children}</div>;
}

function Header({ children, className = "" }) {
	return <div className={`form-header ${className}`.trim()}>{children}</div>;
}

function Title({ children, className = "" }) {
	return <h2 className={`form-title ${className}`.trim()}>{children}</h2>;
}

function Description({ children, className = "" }) {
	return <p className={`form-description ${className}`.trim()}>{children}</p>;
}

function Body({ children, onSubmit, className = "" }) {
	return (
		<form className={`form-body ${className}`.trim()} onSubmit={onSubmit}>
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
		<label className={`form-field ${className}`.trim()}>
			<span className="form-label">{label}</span>
			<input
				className="form-input"
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
		<label className={`form-field ${className}`.trim()}>
			<span className="form-label">{label}</span>
			<input
				className="form-input"
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
		<label className={`form-field ${className}`.trim()}>
			<span className="form-label">{label}</span>
			<textarea
				className="form-input form-textarea"
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
		<label className={`form-field ${className}`.trim()}>
			<span className="form-label">{label}</span>
			<div className="form-input-container">
				<input
					className="form-input"
					type={showPassword ? "text" : "password"}
					name="password"
					value={value}
					onChange={onChange}
					autoComplete="current-password"
					required={required}
				/>
				<button
					type="button"
					className="form-password-toggle"
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
		<p className={`form-feedback ${className}`.trim()} data-type={type}>
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
			className={`cta form-submit ${className}`.trim()}
			type="submit"
			disabled={!enabled}
		>
			{isLoading ? <FaCircleNotch className="form-spinner" /> : null}
			<span>{isLoading ? "Submitting..." : label}</span>
			{!isLoading ? <FaArrowRight /> : null}
		</button>
	);
}

function InputGroup({ children, className = "" }) {
	return (
		<div className={`form-input-group ${className}`.trim()}>{children}</div>
	);
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
