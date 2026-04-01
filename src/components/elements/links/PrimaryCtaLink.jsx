import React from "react";
import CtaLink from "./base/CtaLink";

export default function PrimaryCtaLink(props) {
	const { className = "", ...rest } = props;
	return (
		<CtaLink {...rest} className={`cta-link-primary ${className}`.trim()} />
	);
}
