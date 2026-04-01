import Logo from "../assets/images/logos/logo.svg?react";
import { Link } from "react-router";
import solutions from "../../shared/solutions.js";
import { companyName, companyMission } from "../../shared/company.js";
import {
	FaFacebook,
	FaInstagram,
	FaXTwitter,
	FaGithub,
	FaTiktok,
} from "react-icons/fa6";

export default function Footer() {
	const linkOptions = { scrollToTop: true };

	return (
		<footer role="contentinfo">
			<div className="footer-main-container">
				<div className="footer-brand-container">
					<div className="brand-logo">
						<span className="sr-only">{companyName}</span>
						<Link to="/">
							<Logo className="logo h-10 w-auto" />
						</Link>
					</div>

					<p className="company-mission">{companyMission}</p>

					<div className="social-links">
						<nav aria-label="Social media">
							<Link
								title="Facebook"
								aria-label="Facebook"
								to="https://www.facebook.com/profile.php?id=61580811435794"
							>
								<FaFacebook />
							</Link>
							<Link
								title="Instagram"
								aria-label="Instagram"
								to="https://www.instagram.com/hestiq_social/"
							>
								<FaInstagram />
							</Link>
							<Link
								title="Twitter"
								aria-label="Twitter"
								to="https://x.com/hestiq_social"
							>
								<FaXTwitter />
							</Link>
							<Link
								title="Github"
								aria-label="Github"
								to="https://github.com/mb-hestiq"
							>
								<FaGithub />
							</Link>
							<Link
								title="Tiktok"
								aria-label="Tiktok"
								to="https://www.tiktok.com/@qhesti"
							>
								<FaTiktok />
							</Link>
						</nav>
					</div>
				</div>
				<div className="footer-links-container">
					<nav aria-label="Footer navigation">
						<ul>
							<span>Solutions</span>
							{solutions.map((item, idx) => (
								<li key={idx}>
									<Link to={item.href} state={linkOptions}>
										{item.name}
									</Link>
								</li>
							))}
						</ul>

						<ul>
							<span>Company</span>
							<li>
								<Link to="/about" state={linkOptions}>
									About
								</Link>
							</li>
							<li>
								<Link to="/faq" state={linkOptions}>
									FAQ
								</Link>
							</li>
							<li>
								<Link to="/team" state={linkOptions}>
									Team
								</Link>
							</li>
							<li>
								<Link to="/career" state={linkOptions}>
									Career
								</Link>
							</li>
							<li>
								<Link to="/contact" state={linkOptions}>
									Contact Us
								</Link>
							</li>
						</ul>

						<ul>
							<span>Legal</span>
							<li>
								<Link to="/terms" state={linkOptions}>
									Terms of service
								</Link>
							</li>
							<li>
								<Link to="/privacy" state={linkOptions}>
									Privacy policy
								</Link>
							</li>
							<li>
								<Link to="/refunds" state={linkOptions}>
									Refund Policy
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<div className="footer-copyright-container">
				<small>
					© {new Date().getFullYear()} {companyName}, All rights reserved.
				</small>
			</div>
		</footer>
	);
}
