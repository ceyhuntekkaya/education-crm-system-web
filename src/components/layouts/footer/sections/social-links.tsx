import Link from "next/link";
import { SOCIAL_LINKS } from "../config";

export const SocialLinks = () => {
  return (
    <ul className="social-list flex-align gap-16">
      {SOCIAL_LINKS.map((social) => (
        <li key={social.label} className="social-list__item">
          <Link
            href={social.href}
            className="text-main-600 text-xl hover-text-main-two-600"
            aria-label={social.label}
          >
            <i className={social.icon} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
