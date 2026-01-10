import React from 'react';
import Logo from '../assets/logo.svg?react';
import { Link } from 'react-router';
import { solutions } from '../constants/catalog';
import { companyName, companyMission } from '../constants/company';
import { FaFacebook, FaInstagram, FaXTwitter, FaGithub, FaTiktok } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer role='contentinfo'>
      <div className="FooterMainContainer">
        <div className="FooterBrandContainer">
          <div className="BrandLogo">
            <span className="sr-only">{companyName}</span>
            <Link to="/">
              <Logo className="Logo h-10 w-auto" />
            </Link>
          </div>

          <p className='CompanyMission'>{companyMission}</p>

          <div className="SocialLinks">
            <nav aria-label='Social media'>
              <Link title='Facebook' aria-label='Facebook' to="/"><FaFacebook /></Link>
              <Link title='Instagram' aria-label='Instagram' to="/"><FaInstagram /></Link>
              <Link title='Twitter' aria-label='Twitter' to="/"><FaXTwitter /></Link>
              <Link title='Github' aria-label='Github' to="/"><FaGithub /></Link>
              <Link title='Tiktok' aria-label='Tiktok' to="/"><FaTiktok /></Link>
            </nav>
          </div>
        </div>
        <div className="FooterLinksContainer">
          <nav aria-label='Footer navigation'>
            <ul>
              <span>Solutions</span>
              {solutions.map((item, idx) => (
                <li key={idx}><Link to={item.to}>{item.title}</Link></li>
              ))}
            </ul>

            <ul>
              <span>Company</span>
              <li><Link to="/">About</Link></li>
              <li><Link to="/">FAQ</Link></li>
              <li><Link to="/">Team</Link></li>
              <li><Link to="/">Career</Link></li>
              <li><Link to="/">Contact Us</Link></li>
            </ul>

            <ul>
              <span>Legal</span>
              <li><Link to="/">Terms of service</Link></li>
              <li><Link to="/">Privacy policy</Link></li>
              <li><Link to="/">License</Link></li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="FooterCopyrightContainer">
        <small>© 2026 Hestia, All rights reserved.</small>
      </div>
    </footer>
  )
}
