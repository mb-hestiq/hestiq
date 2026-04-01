import React from "react";
import Button from "./base/Button";

export default function SecondaryButton(props) {
	const { className = "", ...rest } = props;
	return (
		<Button {...rest} className={`button-secondary ${className}`.trim()} />
	);
}
