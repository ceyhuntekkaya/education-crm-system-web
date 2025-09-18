import Link from "next/link";
import { MenuProps } from "../types";
import { isActivePage, getMenuItemKey } from "../utils";

const Menu = ({ menuItems, pathname, className = "" }: MenuProps) => {
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
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Menu;
