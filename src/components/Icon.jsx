import * as FaIcons from "react-icons/fa6";

export default function Icon({ name, ...props }) {
	const IconComponent = FaIcons[name] || FaIcons.FaCircleQuestion;

	return <IconComponent {...props} />;
}
