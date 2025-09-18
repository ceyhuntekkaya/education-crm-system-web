import Link from "next/link";
import { usePathname } from "next/navigation";
import { classNames, isActivePage, getMenuItemKey } from "../utils";
import { categoryOptions } from "../config";
import { useHeader } from "../context";
import Logo from "./logo";

const MobileMenu = () => {
  const {
    isMenuActive,
    closeMenu,
    activeSubmenu,
    handleSubmenuClick,
    menuItems,
  } = useHeader();
  const pathname = usePathname();
  return (
    <div
      className={classNames(
        "mobile-menu scroll-sm d-lg-none d-block",
        isMenuActive && "active"
      )}
    >
      <button type="button" className="close-button" onClick={closeMenu}>
        <i className="ph ph-x" />
      </button>
      <div className="mobile-menu__inner">
        <Logo isMobile />
        <div className="mobile-menu__menu">
          <ul className="nav-menu flex-align nav-menu--mobile">
            {menuItems.map((item, index) =>
              item.links ? (
                <li
                  key={getMenuItemKey("menu-item", index)}
                  className={classNames(
                    "nav-menu__item has-submenu",
                    activeSubmenu === index && "activePage"
                  )}
                  onClick={() => handleSubmenuClick(index)}
                >
                  <Link href={item.href || "#"} className="nav-menu__link">
                    {item.label}
                  </Link>
                  <ul className="nav-submenu scroll-sm">
                    {item.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="nav-submenu__item">
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
                  className={classNames(
                    "nav-menu__item",
                    item.href &&
                      isActivePage(pathname, item.href) &&
                      "activePage"
                  )}
                  key={index}
                >
                  <Link href={item.href || "#"} className="nav-menu__link">
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
          <div className="d-sm-none d-block mt-24">
            <div className="header-select border border-neutral-30 bg-main-25 rounded-pill position-relative">
              <span className="select-icon position-absolute top-50 translate-middle-y inset-inline-start-0 z-1 ms-lg-4 ms-12 text-xl pointer-event-none d-flex">
                <i className="ph-bold ph-squares-four" />
              </span>
              <select
                className="border-0"
                name="state"
                defaultValue="categories"
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
