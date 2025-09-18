import Link from "next/link";
import Image from "next/image";
import { LogoProps } from "../types";
import { HEADER_CONFIG } from "../config";

const Logo = ({ className = "", isMobile = false }: LogoProps) => {
  const logoClass = isMobile ? "mobile-menu__logo" : "logo";
  
  return (
    <div className={`${logoClass} ${className}`}>
      <Link href="/" className={isMobile ? "" : "link"}>
        <Image
          src={HEADER_CONFIG.LOGO_PATH}
          alt="Logo"
          width={HEADER_CONFIG.LOGO_WIDTH}
          height={HEADER_CONFIG.LOGO_HEIGHT}
        />
      </Link>
    </div>
  );
};

export default Logo;