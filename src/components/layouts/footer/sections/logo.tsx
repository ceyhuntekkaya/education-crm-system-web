import Link from "next/link";
import Image from "next/image";
import { FOOTER_CONFIG } from "../config";

export const FooterLogo = () => {
  return (
    <div className="footer-logo">
      <Link href="/">
        <Image
          src={FOOTER_CONFIG.logoSrc}
          alt="Logo"
          width={FOOTER_CONFIG.logoWidth}
          height={FOOTER_CONFIG.logoHeight}
        />
      </Link>
    </div>
  );
};
