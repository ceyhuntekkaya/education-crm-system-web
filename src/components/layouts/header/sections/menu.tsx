import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActivePage, getMenuItemKey } from "../utils";
import { useHeader } from "../context";

interface UserNavigationProps {
  className?: string;
}

const UserNavigation = ({ className = "" }: UserNavigationProps) => {
  const { menuItems } = useHeader();
  const pathname = usePathname();
  return (
    <div className={`header-menu d-lg-block d-none ${className}`}>
      <ul className="nav-menu flex-align">
        {menuItems.map((item, index) =>
          item.links ? (
            <li
              key={getMenuItemKey("menu-item", index)}
              className="nav-menu__item has-submenu"
            >
              <Link href={item.href || "#"} className="nav-menu__link">
                {item.label}
                {item.count !== undefined && item.count > 0 && (
                  <span className="nav-badge nav-badge--warning">
                    {item.count > 99 ? "99+" : item.count}
                  </span>
                )}
              </Link>
              <ul className="nav-submenu scroll-sm">
                {item.links.map((link, linkIndex) => (
                  <li
                    key={getMenuItemKey("submenu-item", linkIndex)}
                    className={`nav-submenu__item ${
                      isActivePage(pathname, link.href) ? "activePage" : ""
                    }`}
                  >
                    <Link
                      href={link.href}
                      className="nav-submenu__link hover-bg-neutral-30"
                    >
                      {link.label}
                      {link.count !== undefined && link.count > 0 && (
                        <span className="nav-badge nav-badge--warning">
                          {link.count > 99 ? "99+" : link.count}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li
              key={getMenuItemKey("menu-contact", index)}
              className={`nav-menu__item ${
                item.href && isActivePage(pathname, item.href)
                  ? "activePage"
                  : ""
              }`}
            >
              <Link href={item.href || "#"} className="nav-menu__link">
                {item.label}
                {item.count !== undefined && item.count > 0 && (
                  <span className="nav-badge nav-badge--warning">
                    {item.count > 99 ? "99+" : item.count}
                  </span>
                )}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default UserNavigation;
