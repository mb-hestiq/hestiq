import Logo from "../assets/logo.svg?react";
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
	return (
		<footer role="contentinfo">
			<div className="FooterMainContainer">
				<div className="FooterBrandContainer">
					<div className="BrandLogo">
						<span className="sr-only">{companyName}</span>
						<Link to="/">
							<Logo className="Logo h-10 w-auto" />
						</Link>
					</div>

					<p className="CompanyMission">{companyMission}</p>

					<div className="SocialLinks">
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
				<div className="FooterLinksContainer">
					<nav aria-label="Footer navigation">
						<ul>
							<span>Solutions</span>
							{solutions.map((item, idx) => (
								<li key={idx}>
									<Link to={item.href}>{item.name}</Link>
								</li>
							))}
						</ul>

						<ul>
							<span>Company</span>
							<li>
								<Link to="/">About</Link>
							</li>
							<li>
								<Link to="/">FAQ</Link>
							</li>
							<li>
								<Link to="/">Team</Link>
							</li>
							<li>
								<Link to="/">Career</Link>
							</li>
							<li>
								<Link to="/">Contact Us</Link>
							</li>
						</ul>

						<ul>
							<span>Legal</span>
							<li>
								<Link to="/terms">Terms of service</Link>
							</li>
							<li>
								<Link to="/privacy">Privacy policy</Link>
							</li>
							<li>
								<Link to="/refunds">Refund Policy</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<div className="FooterCopyrightContainer">
				<small>
					© {new Date().getFullYear()} {companyName}, All rights reserved.
				</small>
			</div>
		</footer>
	);
}
