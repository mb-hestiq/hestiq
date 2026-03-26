import React from "react";
import Header from "./template";
import "./template.css";

import {
	FaFacebook,
	FaTwitter,
	FaInstagram,
	FaLinkedin,
	FaYoutube,
	FaBars,
	FaXmark,
	FaMagnifyingGlass,
} from "react-icons/fa6";

function RenderLinks({ links }) {
	return links.map((link, index) =>
		link.dropdown ? (
			<Header.Dropdown key={index} label={link.label}>
				{link.dropdown.map((item, idx) => (
					<Header.Dropdown.Item to={item.to} key={idx}>
						{item.label}
					</Header.Dropdown.Item>
				))}
			</Header.Dropdown>
		) : (
			<Header.Link to={link.to} key={index}>
				{link.label}
			</Header.Link>
		),
	);
}

function RenderMobileLinks({ links }) {
	return links.map((link, index) =>
		link.dropdown ? (
			<details key={index} className="template-header-mobile-accordion">
				<summary className="template-header-mobile-accordion-label">
					{link.label}
				</summary>
				<div className="template-header-mobile-accordion-body">
					<div>
						{link.dropdown.map((item, idx) => (
							<a
								href={item.to}
								key={idx}
								className="template-header-mobile-accordion-item"
							>
								{item.label}
							</a>
						))}
					</div>
				</div>
			</details>
		) : (
			<Header.Link to={link.to} key={index}>
				{link.label}
			</Header.Link>
		),
	);
}

function Mobile({ companyName, links, cta, searchBar, ...props }) {
	const [isOpen, setIsOpen] = React.useState(false);
	const [searchExpanded, setSearchExpanded] = React.useState(false);
	const [searchActive, setSearchActive] = React.useState(false);
	const searchRef = React.useRef(null);
	const inputRef = React.useRef(null);

	const expandSearch = () => {
		if (searchExpanded) return;
		if (searchRef.current) {
			const header = searchRef.current.closest(".template-header-mobile");
			if (header) {
				const headerRect = header.getBoundingClientRect();
				const searchRect = searchRef.current.getBoundingClientRect();
				const paddingLeft = parseFloat(getComputedStyle(header).paddingLeft);
				searchRef.current.style.setProperty(
					"--search-right-offset",
					`${headerRect.right - searchRect.right}px`,
				);
				searchRef.current.style.setProperty(
					"--search-expand-width",
					`${searchRect.right - headerRect.left - paddingLeft}px`,
				);
			}
		}
		setSearchActive(true);
		setSearchExpanded(true);
		requestAnimationFrame(() => inputRef.current?.focus());
	};

	const collapseSearch = (e) => {
		if (e.currentTarget.contains(e.relatedTarget)) return;
		setSearchExpanded(false);
		setTimeout(() => setSearchActive(false), 200);
	};

	const searchClass = [
		"template-header-search",
		searchExpanded ? "expanded" : "",
		searchActive ? "active" : "",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<Header className="template-header-mobile" {...props}>
			<Header.Logo>{companyName}</Header.Logo>
			{searchBar && (
				<div
					ref={searchRef}
					className={searchClass}
					onClick={expandSearch}
					onBlur={collapseSearch}
					tabIndex={-1}
				>
					<FaMagnifyingGlass className="template-header-search-icon" />
					<input
						ref={inputRef}
						type="text"
						placeholder="Search..."
						className="template-header-search-input"
					/>
				</div>
			)}
			<button
				className="template-header-mobile-burger"
				onClick={() => setIsOpen(!isOpen)}
			>
				{isOpen ? <FaXmark /> : <FaBars />}
			</button>

			<Header.Links
				className={`template-header-mobile-links ${isOpen ? "open" : ""}`}
			>
				<RenderMobileLinks links={links} />
				{cta && <Header.CTA>{cta}</Header.CTA>}
			</Header.Links>
		</Header>
	);
}

export function HeaderV1({ companyName, links, ...props }) {
	return (
		<>
			<Header className="v1" {...props}>
				<Header.Logo>{companyName}</Header.Logo>
				<Header.Links>
					<RenderLinks links={links} />
				</Header.Links>
			</Header>
			<Mobile companyName={companyName} links={links} />
		</>
	);
}

export function HeaderV2({ companyName, links, cta, ...props }) {
	return (
		<>
			<Header className="v2" {...props}>
				<Header.Logo>{companyName}</Header.Logo>
				<Header.Links>
					<RenderLinks links={links} />
					<Header.Button>Login</Header.Button>
					<Header.CTA>{cta}</Header.CTA>
				</Header.Links>
			</Header>
			<Mobile companyName={companyName} links={links} cta={cta} />
		</>
	);
}

export function HeaderV3({ companyName, links, ...props }) {
	return (
		<>
			<Header className="v3" {...props}>
				<Header.Logo>{companyName}</Header.Logo>
				<Header.Links>
					<RenderLinks links={links} />
					<Header.SearchBar />
				</Header.Links>
			</Header>
			<Mobile companyName={companyName} links={links} searchBar />
		</>
	);
}

export function HeaderV4({ companyName, linksLeft, linksRight, ...props }) {
	return (
		<>
			<Header className="v4" {...props}>
				<Header.Links>
					<RenderLinks links={linksLeft} />
				</Header.Links>
				<Header.Logo>{companyName}</Header.Logo>
				<Header.Links>
					<RenderLinks links={linksRight} />
				</Header.Links>
			</Header>
			<Mobile companyName={companyName} links={[...linksLeft, ...linksRight]} />
		</>
	);
}

export function HeaderV5({ companyName, links, cta, ...props }) {
	return (
		<>
			<Header className="v5" {...props}>
				<Header.Logo>{companyName}</Header.Logo>
				<Header.Links>
					<RenderLinks links={links} />
				</Header.Links>
				<Header.Links>
					<Header.SearchBar />
					<Header.CTA>{cta}</Header.CTA>
				</Header.Links>
			</Header>
			<Mobile companyName={companyName} links={links} cta={cta} searchBar />
		</>
	);
}

export function HeaderV6({ companyName, ...props }) {
	return (
		<Header className="v6" {...props}>
			<Header.Logo>{companyName}</Header.Logo>
			<Header.Links>
				<Header.Link>
					<FaFacebook />
				</Header.Link>
				<Header.Link>
					<FaTwitter />
				</Header.Link>
				<Header.Link>
					<FaInstagram />
				</Header.Link>
				<Header.Link>
					<FaLinkedin />
				</Header.Link>
				<Header.Link>
					<FaYoutube />
				</Header.Link>
			</Header.Links>
		</Header>
	);
}

export function HeaderV7({ companyName, links, cta, ...props }) {
	return (
		<>
			<Header className="v7" {...props}>
				<Header.Logo>{companyName}</Header.Logo>
				<Header.Links>
					<RenderLinks links={links} />
				</Header.Links>
				<Header.Links>
					<Header.CTA>{cta}</Header.CTA>
				</Header.Links>
			</Header>
			<Mobile companyName={companyName} links={links} cta={cta} />
		</>
	);
}

export function HeaderV8({ companyName, links, cta, ...props }) {
	return (
		<>
			<Header className="v8" {...props}>
				<Header.Links>
					<Header.Logo>{companyName}</Header.Logo>
					<RenderLinks links={links} />
				</Header.Links>
				<Header.Links>
					<Header.CTA>{cta}</Header.CTA>
				</Header.Links>
			</Header>
			<Mobile companyName={companyName} links={links} cta={cta} />
		</>
	);
}

export function HeaderV9({ companyName, links, ...props }) {
	return (
		<>
			<Header className="v9" {...props}>
				<Header.Logo>{companyName}</Header.Logo>
				<Header.Links>
					<RenderLinks links={links} />
				</Header.Links>
			</Header>
			<Mobile companyName={companyName} links={links} />
		</>
	);
}

export function HeaderV10({ companyName, links, cta, ...props }) {
	return (
		<>
			<Header className="v10" {...props}>
				<Header.Logo>{companyName}</Header.Logo>
				<Header.Links>
					<RenderLinks links={links} />
					<Header.CTA>{cta}</Header.CTA>
				</Header.Links>
			</Header>
			<Mobile companyName={companyName} links={links} cta={cta} />
		</>
	);
}
