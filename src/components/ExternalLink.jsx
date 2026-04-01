import React from "react";
import { Link } from "react-router";
import { LuExternalLink } from "react-icons/lu";

export default function ExternalLink({ href, children }) {
	return (
		<Link
			className="external-link"
			to={href}
			target="_blank"
			rel="noopener noreferrer"
		>
			{children}
			<LuExternalLink className="inline ml-1" />
		</Link>
	);
}
