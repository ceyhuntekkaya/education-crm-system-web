import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationProps {
  className?: string;
}

const MainNavigation = ({ className = "" }: NavigationProps) => {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      label: "Anasayfa",
    },
    {
      href: "/search",
      label: "Okul Arama",
    },
  ];

  return (
    <div className={`header-navigation d-lg-block d-none ${className}`}>
      <ul className="nav-menu flex-align">
        {navItems.map((item, index) => (
          <li
            key={`nav-item-${index}`}
            className={`nav-menu__item ${
              pathname === item.href ? "activePage" : ""
            }`}
          >
            <Link href={item.href} className="nav-menu__link">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainNavigation;
