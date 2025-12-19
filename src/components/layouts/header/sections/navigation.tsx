import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationItem {
  href: string;
  label: string;
  count?: number;
}

interface NavigationProps {
  className?: string;
  navItems?: NavigationItem[];
}

const MainNavigation = ({ className = "", navItems }: NavigationProps) => {
  const pathname = usePathname();

  const defaultNavItems: NavigationItem[] = [
    {
      href: "/",
      label: "Anasayfa",
    },
    {
      href: "/search",
      label: "Eğitim Ara",
      // count: 12,
    },
    {
      href: "/memberships",
      label: "Kurumsal Üyelik",
    },
  ];

  const items = navItems || defaultNavItems;

  return (
    <div className={`header-navigation d-lg-block d-none ${className}`}>
      <ul className="nav-menu flex-align ms-12">
        {items.map((item, index) => (
          <li
            key={`nav-item-${index}`}
            className={`nav-menu__item ${
              pathname === item.href ? "activePage" : ""
            }`}
          >
            <Link href={item.href} className="nav-menu__link">
              {item.label}
              {item.count !== undefined && item.count > 0 && (
                <span className="nav-badge nav-badge--warning">
                  {item.count > 99 ? "99+" : item.count}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainNavigation;
