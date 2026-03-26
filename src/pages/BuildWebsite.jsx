import {
	HeaderV1,
	HeaderV2,
	HeaderV3,
	HeaderV4,
	HeaderV5,
	HeaderV6,
	HeaderV7,
	HeaderV8,
	HeaderV9,
	HeaderV10,
} from "../templates/header/header";

//#region Company Info
const companyName = "HestiQ";

const links = [
	{ label: "Home", to: "#" },
	{ label: "About", to: "#" },
	{
		label: "Resources",
		dropdown: [
			{ label: "Blog", to: "#" },
			{ label: "Case Studies", to: "#" },
			{ label: "Guides", to: "#" },
		],
	},
	{ label: "Blog", to: "#" },
	{ label: "Contact", to: "#" },
];

const cta = "Get Started";
//#endregion

export default function BuildWebsite() {
	return (
		<>
			<div className="template-container">
				<HeaderV1 companyName={companyName} links={links} />
				<HeaderV2 companyName={companyName} links={links} cta={cta} />
				<HeaderV3 companyName={companyName} links={links} />
				<HeaderV4
					companyName={companyName}
					linksLeft={links.slice(0, 2)}
					linksRight={links.slice(2)}
				/>
				<HeaderV5 companyName={companyName} links={links} cta={cta} />
				<HeaderV6 companyName={companyName} />
				<HeaderV7 companyName={companyName} links={links} cta={cta} />
				<HeaderV8 companyName={companyName} links={links} cta={cta} />
				<HeaderV9 companyName={companyName} links={links} />
				<HeaderV10 companyName={companyName} links={links} cta={cta} />
			</div>
		</>
	);
}
