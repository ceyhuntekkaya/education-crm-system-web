import { SocialLink } from "../types";

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://www.egitimiste.com",
    icon: "ph-bold ph-facebook-logo",
    label: "Facebook",
  },
  {
    href: "https://www.egitimiste.com",
    icon: "ph-bold ph-twitter-logo",
    label: "Twitter",
  },
  {
    href: "https://www.egitimiste.com",
    icon: "ph-bold ph-instagram-logo",
    label: "Instagram",
  },
  {
    href: "https://www.egitimiste.com",
    icon: "ph-bold ph-linkedin-logo",
    label: "LinkedIn",
  },
];

export const FOOTER_CONFIG = {
  companyName: "Eğitimİste",
  logoSrc: "/assets/images/logo/logo.png",
  logoWidth: 100,
  logoHeight: 32,
  copyrightYear: new Date().getFullYear(),
} as const;
