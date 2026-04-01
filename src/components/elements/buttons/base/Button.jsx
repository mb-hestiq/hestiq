import React from "react";
import { Link } from "react-router";
import "./Button.css";

export default function Button({
	to,
	type = "button",
	onClick,
	className = "",
	children,
	disabled = false,
	...rest
}) {
	const sharedClassName = `button-base ${className}`.trim();

	if (to) {
		return (
			<Link
				to={to}
				className={sharedClassName}
				aria-disabled={disabled}
				{...rest}
			>
				{children}
			</Link>
		);
	}

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={sharedClassName}
			{...rest}
		>
			{children}
		</button>
	);
}
