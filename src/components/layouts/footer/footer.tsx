"use client";
import { FooterLogo, SocialLinks, Copyright } from "./sections";
import { FooterProps } from "./types";

const Footer = ({ className = "" }: FooterProps) => {
  return (
    <footer className={`footer bg-main-25 position-relative z-1 ${className}`}>
      <div className="container">
        {/* Minimal Footer */}
        <div className="bottom-footer bg-main-25 border-top border-dashed border-main-100 border-0 py-16">
          <div className="container container-two">
            <div className="bottom-footer__inner flex-between gap-3 flex-wrap">
              <Copyright />
              <div className="right-section flex-align gap-24">
                <FooterLogo />
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
