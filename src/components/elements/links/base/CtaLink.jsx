import React from "react";
import { Link } from "react-router";
import "./CtaLink.css";

export default function CtaLink({ to, children, className = "", ...rest }) {
	return (
		<Link to={to} className={`cta-link-base ${className}`.trim()} {...rest}>
			{children}
		</Link>
	);
}
