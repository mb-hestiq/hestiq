import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Header({ className = "", children, ...props }) {
	return (
		<div
			{...props}
			className={`template-header ${className} ${props.className || ""}`}
		>
			{children}
		</div>
	);
}

const Logo = ({ className = "", children, ...props }) => (
	<div
		{...props}
		className={`template-header-logo ${className} ${props.className || ""}`}
	>
		{children}
	</div>
);

const Links = ({ className = "", children, ...props }) => (
	<nav
		{...props}
		className={`template-header-links ${className} ${props.className || ""}`}
	>
		{children}
	</nav>
);

const Link = ({ className = "", children, to = "#", ...props }) => (
	<a
		href={to}
		{...props}
		className={`template-header-link ${className} ${props.className || ""}`}
	>
		{children}
	</a>
);

const CTA = ({ className = "", children, to = "#", ...props }) => (
	<a
		href={to}
		{...props}
		className={`template-header-cta ${className} ${props.className || ""}`}
	>
		{children}
	</a>
);

const SearchBar = ({ className = "", ...props }) => (
	<label
		{...props}
		className={`template-header-search ${className} ${props.className || ""}`}
	>
		<FaMagnifyingGlass className="template-header-search-icon" />
		<input
			type="text"
			placeholder="Search..."
			className="template-header-search-input"
		/>
	</label>
);

const Button = ({ className = "", children, onClick, ...props }) => (
	<button
		{...props}
		className={`template-header-button ${className} ${props.className || ""}`}
		onClick={onClick}
	>
		{children}
	</button>
);

const Dropdown = ({ className = "", label, children, ...props }) => (
	<div
		{...props}
		className={`template-header-dropdown ${className} ${props.className || ""}`}
	>
		{label}
		<div className="template-header-dropdown-items">{children}</div>
	</div>
);

const DropdownItem = ({ className = "", children, to = "#", ...props }) => (
	<a
		{...props}
		className={`template-header-dropdown-item ${className} ${props.className || ""}`}
		href={to}
	>
		{children}
	</a>
);

Dropdown.Item = DropdownItem;

Header.Logo = Logo;
Header.Links = Links;
Header.Link = Link;
Header.CTA = CTA;
Header.Dropdown = Dropdown;
Header.Button = Button;
Header.SearchBar = SearchBar;
