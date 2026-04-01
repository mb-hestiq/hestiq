import * as React from "react";
import { Link, NavLink } from "react-router";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { CaretDownIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import Logo from "../assets/images/logos/logo.svg?react";
import { useServices } from "../utils/servicesCache";
import solutions from "../../shared/solutions.js";
import { companyName } from "../../shared/company.js";

export default function Header() {
	const [openDisclosures, setOpenDisclosures] = React.useState({
		design: false,
		development: false,
		solutions: false,
	});

	const toggleDisclosure = (key) => {
		setOpenDisclosures((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	const { services } = useServices();

	return (
		<header>
			<NavigationMenu.Root className="navigation-menu-root">
				<Link to="/">
					<Logo className="logo h-10 w-auto" />
				</Link>

				<NavigationMenu.List className="navigation-menu-list hidden lg:flex">
					<NavItem to="/about">About</NavItem>
					<NavItem to="/pricing">Pricing</NavItem>

					<NavList to="/solutions" title="Solutions">
						<CallOut to="/solutions">
							<CallOut.Heading>
								Innovative Solutions for Your Business
							</CallOut.Heading>
							<CallOut.Text>
								Helping your business scale with creative and tech-driven
								strategies.
							</CallOut.Text>
						</CallOut>
						{solutions.map((item, idx) => (
							<ListItem title={item.name} to={item.href} key={idx}>
								{item.description}
							</ListItem>
						))}
					</NavList>

					<NavList to="/design" title="Design">
						{services
							.filter((s) => s.category === "Design")
							.map((item, idx) => (
								<ListItem title={item.name} to={item.href} key={idx}>
									{item.description}
								</ListItem>
							))}
					</NavList>

					<NavList to="/development" title="Development">
						{services
							.filter((s) => s.category === "Development")
							.map((item, idx) => (
								<ListItem title={item.name} to={item.href} key={idx}>
									{item.description}
								</ListItem>
							))}
					</NavList>

					<NavItem to="/contact" className="cta">
						Contact Us
					</NavItem>

					<NavigationMenu.Indicator className="navigation-menu-indicator">
						<div className="arrow" />
					</NavigationMenu.Indicator>

					<div className="viewport-position">
						<NavigationMenu.Viewport className="navigation-menu-viewport" />
					</div>
				</NavigationMenu.List>

				<Dialog.Root>
					<Dialog.Trigger asChild>
						<button type="button" className="hamburger flex lg:hidden">
							<span className="sr-only">Open main menu</span>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								aria-hidden="true"
								className="size-6"
							>
								<path
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</Dialog.Trigger>

					<Dialog.Portal>
						<Dialog.Overlay className="mobile-menu-overlay" />
						<Dialog.Content className="mobile-menu-panel">
							<VisuallyHidden.Root>
								<Dialog.Title>Mobile Navigation Menu</Dialog.Title>
								<Dialog.Description>
									Browse our services and contact information
								</Dialog.Description>
							</VisuallyHidden.Root>

							<div className="mobile-menu-header">
								<Link to="/" className="-m-1.5 p-1.5">
									<span className="sr-only">{companyName}</span>
									<Logo className="logo h-10 w-10" />
								</Link>
								<Dialog.Close asChild>
									<button type="button" className="mobile-menu-close">
										<span className="sr-only">Close menu</span>
										<svg
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="1.5"
											aria-hidden="true"
											className="size-6"
										>
											<path
												d="M6 18 18 6M6 6l12 12"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</button>
								</Dialog.Close>
							</div>
							<div className="mobile-menu-content">
								<div className="mobile-menu-inner">
									<div className="mobile-menu-section space-y-2">
										<NavLink to="/about" className="mobile-menu-link">
											About
										</NavLink>
										<NavLink to="/pricing" className="mobile-menu-link">
											Pricing
										</NavLink>

										<div className="mobile-menu-disclosure">
											<button
												type="button"
												onClick={() => toggleDisclosure("solutions")}
												className="mobile-menu-disclosure-button"
												aria-expanded={openDisclosures.solutions}
											>
												Solutions
												<svg
													viewBox="0 0 20 20"
													fill="currentColor"
													aria-hidden="true"
													className="mobile-menu-disclosure-icon"
													style={{
														transform: openDisclosures.design
															? "rotate(180deg)"
															: "rotate(0deg)",
													}}
												>
													<path
														d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
														clipRule="evenodd"
														fillRule="evenodd"
													/>
												</svg>
											</button>
											{openDisclosures.solutions && (
												<div className="mobile-menu-disclosure-content">
													<div className="space-y-2">
														{solutions.map((item, idx) => (
															<NavLink
																to={item.href}
																key={idx}
																className="mobile-menu-disclosure-link"
															>
																{item.name}
															</NavLink>
														))}
													</div>
												</div>
											)}
										</div>

										<div className="mobile-menu-disclosure">
											<button
												type="button"
												onClick={() => toggleDisclosure("design")}
												className="mobile-menu-disclosure-button"
												aria-expanded={openDisclosures.design}
											>
												Design
												<svg
													viewBox="0 0 20 20"
													fill="currentColor"
													aria-hidden="true"
													className="mobile-menu-disclosure-icon"
													style={{
														transform: openDisclosures.design
															? "rotate(180deg)"
															: "rotate(0deg)",
													}}
												>
													<path
														d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
														clipRule="evenodd"
														fillRule="evenodd"
													/>
												</svg>
											</button>
											{openDisclosures.design && (
												<div className="mobile-menu-disclosure-content">
													<div className="space-y-2">
														{services
															.filter((s) => s.category === "Design")
															.map((item, idx) => (
																<NavLink
																	to={item.href}
																	key={idx}
																	className="mobile-menu-disclosure-link"
																>
																	{item.name}
																</NavLink>
															))}
													</div>
												</div>
											)}
										</div>

										<div className="mobile-menu-disclosure">
											<button
												type="button"
												onClick={() => toggleDisclosure("development")}
												className="mobile-menu-disclosure-button"
												aria-expanded={openDisclosures.development}
											>
												Development
												<svg
													viewBox="0 0 20 20"
													fill="currentColor"
													aria-hidden="true"
													className="mobile-menu-disclosure-icon"
													style={{
														transform: openDisclosures.development
															? "rotate(180deg)"
															: "rotate(0deg)",
													}}
												>
													<path
														d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
														clipRule="evenodd"
														fillRule="evenodd"
													/>
												</svg>
											</button>
											{openDisclosures.development && (
												<div className="mobile-menu-disclosure-content">
													<div className="space-y-2">
														{services
															.filter((s) => s.category === "Development")
															.map((item, idx) => (
																<NavLink
																	to={item.href}
																	key={idx}
																	className="mobile-menu-disclosure-link"
																>
																	{item.name}
																</NavLink>
															))}
													</div>
												</div>
											)}
										</div>

										<NavLink to="/contact" className="mobile-menu-link">
											Contact Us
										</NavLink>
									</div>
								</div>
							</div>
						</Dialog.Content>
					</Dialog.Portal>
				</Dialog.Root>
			</NavigationMenu.Root>
		</header>
	);
}

function NavItem({ to, children, className }) {
	return (
		<NavigationMenu.Item className="navigation-menu-item">
			<NavigationMenu.Link asChild>
				<NavLink
					to={to}
					className={classNames("navigation-menu-link", className)}
				>
					{children}
				</NavLink>
			</NavigationMenu.Link>
		</NavigationMenu.Item>
	);
}

function NavList({ to, title, children }) {
	return (
		<NavigationMenu.Item>
			<NavigationMenu.Trigger className="navigation-menu-trigger">
				<NavLink to={to} className="navigation-menu-link">
					{title}{" "}
				</NavLink>
				<CaretDownIcon className="caret-down" aria-hidden />
			</NavigationMenu.Trigger>

			<NavigationMenu.Content className="navigation-menu-content">
				<ul className="list">{children}</ul>
			</NavigationMenu.Content>
		</NavigationMenu.Item>
	);
}

const ListItem = React.forwardRef(
	({ className, children, title, to, ...props }, forwardedRef) => (
		<li>
			<NavigationMenu.Link asChild>
				<Link
					to={to}
					className={classNames("list-item-link", className)}
					{...props}
					ref={forwardedRef}
				>
					<div className="list-item-heading">{title}</div>
					<p className="list-item-text">{children}</p>
				</Link>
			</NavigationMenu.Link>
		</li>
	),
);

function CallOut({ to, children }) {
	return (
		<li style={{ gridRow: "span 3" }}>
			<NavigationMenu.Link asChild>
				<Link className="callout" to={to}>
					{children}
				</Link>
			</NavigationMenu.Link>
		</li>
	);
}

function CallOutHeading({ children }) {
	return <div className="callout-heading">{children}</div>;
}

function CallOutText({ children }) {
	return <p className="callout-text">{children}</p>;
}

CallOut.Heading = CallOutHeading;
CallOut.Text = CallOutText;
