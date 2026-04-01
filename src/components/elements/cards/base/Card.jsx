import React from "react";
import "./Card.css";

export default function Card({
	as: Component = "div",
	className = "",
	children,
}) {
	return (
		<Component className={`card-base ${className}`.trim()}>
			{children}
		</Component>
	);
}
