import * as React from 'react';
import { Link, NavLink } from 'react-router';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { CaretDownIcon } from '@radix-ui/react-icons';
import classNames from "classnames";
import Logo from '../assets/logo.svg?react';
import { services, solutions } from '../constants/catalog';
import { companyName } from '../constants/company';

/* ===================== HEADER ===================== */

export default function Header() {
  const [openDisclosures, setOpenDisclosures] = React.useState({
    design: false,
    development: false,
    solutions: false,
  });

  const toggleDisclosure = (key) => {
    setOpenDisclosures(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <header>
      <NavigationMenu.Root className="NavigationMenuRoot">
        <Link to="/">
          <Logo className="Logo h-10 w-auto" />
        </Link>

        <NavigationMenu.List className="NavigationMenuList hidden lg:flex">
          <NavItem to="/">About</NavItem>
          <NavItem to="/">Products</NavItem>
          <NavItem to="/">Pricing</NavItem>

          <NavList to="/" title="Solutions">
            {solutions.map((item, idx) => (
              <ListItem title={item.title} to={item.to} key={idx}>{item.description}</ListItem>
            ))}
          </NavList>

          <NavList to="/" title="Design">
            <CallOut to="/">
              <CallOut.Heading>Design Services</CallOut.Heading>
              <CallOut.Text>Visual, brand, and product design tailored for digital-first experiences.</CallOut.Text>
            </CallOut>
            {services.design.map((item, idx) => (
              <ListItem title={item.title} to={item.to} key={idx}>{item.description}</ListItem>
            ))}
          </NavList>  

          <NavList to="/" title="Development">
            {services.development.map((item, idx) => (
              <ListItem title={item.title} to={item.to} key={idx}>{item.description}</ListItem>
            ))}
          </NavList>

          <NavItem to="/" className="CTA">Contacts</NavItem>

          <NavigationMenu.Indicator className="NavigationMenuIndicator">
            <div className="Arrow" />
          </NavigationMenu.Indicator>

          <div className="ViewportPosition">
            <NavigationMenu.Viewport className="NavigationMenuViewport" />
          </div>
        </NavigationMenu.List>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button type="button" className="Hamburger flex lg:hidden">
              <span className="sr-only">Open main menu</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="size-6">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="MobileMenuOverlay" />
            <Dialog.Content className="MobileMenuPanel">
              <VisuallyHidden.Root>
                <Dialog.Title>Mobile Navigation Menu</Dialog.Title>
                <Dialog.Description>Browse our services and contact information</Dialog.Description>
              </VisuallyHidden.Root>
              
              <div className="MobileMenuHeader">
                <Link to="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">{companyName}</span>
                  <Logo className="Logo h-10 w-10" />
                </Link>
                <Dialog.Close asChild>
                  <button type="button" className="MobileMenuClose">
                    <span className="sr-only">Close menu</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="size-6">
                      <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </Dialog.Close>
              </div>
              <div className="MobileMenuContent">
                <div className="MobileMenuInner">
                  <div className="MobileMenuSection space-y-2">
                    <NavLink to="/" className="MobileMenuLink">About</NavLink>
                    <NavLink to="/" className="MobileMenuLink">Products</NavLink>
                    <NavLink to="/" className="MobileMenuLink">Pricing</NavLink>

                    <div className="MobileMenuDisclosure">
                      <button 
                        type="button" 
                        onClick={() => toggleDisclosure('solutions')}
                        className="MobileMenuDisclosureButton"
                        aria-expanded={openDisclosures.solutions}
                      >
                        Solutions
                        <svg 
                          viewBox="0 0 20 20" 
                          fill="currentColor" 
                          aria-hidden="true" 
                          className="MobileMenuDisclosureIcon"
                          style={{ transform: openDisclosures.design ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        >
                          <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
                        </svg>
                      </button>
                      {openDisclosures.solutions && (
                        <div className="MobileMenuDisclosureContent">
                          <div className="space-y-2">
                            {solutions.map((item, idx) => (
                              <NavLink to={item.to} key={idx} className="MobileMenuDisclosureLink">{item.title}</NavLink>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="MobileMenuDisclosure">
                      <button 
                        type="button" 
                        onClick={() => toggleDisclosure('design')}
                        className="MobileMenuDisclosureButton"
                        aria-expanded={openDisclosures.design}
                      >
                        Design
                        <svg 
                          viewBox="0 0 20 20" 
                          fill="currentColor" 
                          aria-hidden="true" 
                          className="MobileMenuDisclosureIcon"
                          style={{ transform: openDisclosures.design ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        >
                          <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
                        </svg>
                      </button>
                      {openDisclosures.design && (
                        <div className="MobileMenuDisclosureContent">
                          <div className="space-y-2">
                            {services.design.map((item, idx) => (
                              <NavLink to={item.to} key={idx} className="MobileMenuDisclosureLink">{item.title}</NavLink>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="MobileMenuDisclosure">
                      <button 
                        type="button" 
                        onClick={() => toggleDisclosure('development')}
                        className="MobileMenuDisclosureButton"
                        aria-expanded={openDisclosures.development}
                      >
                        Development
                        <svg 
                          viewBox="0 0 20 20" 
                          fill="currentColor" 
                          aria-hidden="true" 
                          className="MobileMenuDisclosureIcon"
                          style={{ transform: openDisclosures.development ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        >
                          <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
                        </svg>
                      </button>
                      {openDisclosures.development && (
                        <div className="MobileMenuDisclosureContent">
                          <div className="space-y-2">
                            {services.development.map((item, idx) => (
                              <NavLink to={item.to} key={idx} className="MobileMenuDisclosureLink">{item.title}</NavLink>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <NavLink to="/" className="MobileMenuLink">Contacts</NavLink>
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

/* =================== COMPONENTS =================== */

function NavItem({ to, children, className }) {
  return (
    <NavigationMenu.Item className="NavigationMenuItem">
      <NavigationMenu.Link asChild>
        <NavLink to={to} className={classNames("NavigationMenuLink", className)}>{children}</NavLink>
      </NavigationMenu.Link>
		</NavigationMenu.Item>
  )
}

function NavList({ to, title, children}) {
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Trigger className="NavigationMenuTrigger" >
        <NavLink to={to} className="NavigationMenuLink">{title} </NavLink>
        <CaretDownIcon className="CaretDown" aria-hidden />
      </NavigationMenu.Trigger>

      <NavigationMenu.Content className="NavigationMenuContent">
						<ul className="List">
              {children}
						</ul>
					</NavigationMenu.Content>
		</NavigationMenu.Item>
  )
}

const ListItem = React.forwardRef(
	({ className, children, title, to, ...props }, forwardedRef) => (
		<li>
			<NavigationMenu.Link asChild>
        <Link to={to} className={classNames("ListItemLink", className)} {...props} ref={forwardedRef}>
          <div className="ListItemHeading">{title}</div>
          <p className="ListItemText">{children}</p>
        </Link>
			</NavigationMenu.Link>
		</li>
	),
);

function CallOut({ to, children }) {
  return (
    <li style={{ gridRow: "span 3" }}>
      <NavigationMenu.Link asChild>
        <Link className="Callout" to={to}>
          {children}
        </Link>
      </NavigationMenu.Link>
    </li>
  )
}

function CallOutHeading({ children }) {
  return <div className="CalloutHeading">{children}</div>;
}

function CallOutText({ children }) {
  return <p className="CalloutText">{children}</p>
}

CallOut.Heading = CallOutHeading;
CallOut.Text = CallOutText;