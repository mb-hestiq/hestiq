import React from "react";
import Button from "./base/Button";

export default function PrimaryButton(props) {
	const { className = "", ...rest } = props;
	return <Button {...rest} className={`button-primary ${className}`.trim()} />;
}
