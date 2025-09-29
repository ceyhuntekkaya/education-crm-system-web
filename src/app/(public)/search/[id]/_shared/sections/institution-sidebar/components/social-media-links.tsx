import React from "react";
import { useInstitutionSidebarData } from "../hooks/useInstitutionSidebarData";

export const SocialMediaLinks: React.FC = () => {
  const { socialMediaLinks } = useInstitutionSidebarData();

  return (
    <ul className="social-list flex-center gap-16 mt-28">
      {socialMediaLinks.map((social, index) => (
        <li key={index} className="social-list__item">
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-main-600 text-xl hover-text-white w-40-px h-40-px rounded-circle border border-main-600 hover-bg-main-600 flex-center"
            aria-label={social.platform}
          >
            <i className={`ph-bold ${social.icon}`} />
          </a>
        </li>
      ))}
    </ul>
  );
};
