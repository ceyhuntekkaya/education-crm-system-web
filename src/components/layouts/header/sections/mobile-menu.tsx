import Link from "next/link";
import { usePathname } from "next/navigation";
import { classNames, isActivePage, getMenuItemKey } from "../utils";
import { categoryOptions } from "../config";
import { useHeader } from "../context";
import { useAuth } from "@/contexts";
import Logo from "./logo";

// Ana navigasyon öğeleri
const mainNavItems = [
  {
    href: "/",
    label: "Anasayfa",
    icon: "ph-house",
  },
  {
    href: "/search",
    label: "Eğitim Ara",
    icon: "ph-magnifying-glass",
  },
  {
    href: "/memberships",
    label: "Üyelikler",
    icon: "ph-crown",
  },
];

const MobileMenu = () => {
  const {
    isMenuActive,
    closeMenu,
    activeSubmenu,
    handleSubmenuClick,
    menuItems,
  } = useHeader();
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    closeMenu();
  };

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
        <Logo isMobile onClick={closeMenu} />
        <div className="mobile-menu__menu">
          {/* Ana Navigasyon */}
          <div className="mobile-menu__section">
            <ul className="nav-menu flex-align nav-menu--mobile">
              {mainNavItems.map((item, index) => (
                <li
                  className={classNames(
                    "nav-menu__item",
                    isActivePage(pathname, item.href) && "activePage"
                  )}
                  key={`main-nav-${index}`}
                >
                  <Link
                    href={item.href}
                    className="nav-menu__link"
                    onClick={closeMenu}
                  >
                    <i className={`ph ${item.icon} me-6`} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kullanıcı Navigasyonu - Sadece giriş yapmış kullanıcılar için */}
          {user && menuItems.length > 0 && (
            <>
              <div className="mobile-menu__divider"></div>
              <div className="mobile-menu__section">
                <ul className="nav-menu flex-align nav-menu--mobile">
                  {menuItems.map((item, index) =>
                    item.links ? (
                      <li
                        key={getMenuItemKey("menu-item", index)}
                        className={classNames(
                          "nav-menu__item has-submenu",
                          activeSubmenu === index && "active activePage"
                        )}
                        onClick={() => handleSubmenuClick(index)}
                      >
                        <a
                          href="#"
                          className="nav-menu__link"
                          onClick={(e) => e.preventDefault()}
                        >
                          <span className="nav-menu__label">{item.label}</span>
                          {item.count !== undefined && item.count > 0 && (
                            <span className="nav-menu__badge">
                              {item.count > 99 ? "99+" : item.count}
                            </span>
                          )}
                        </a>
                        <ul className="nav-submenu scroll-sm">
                          {item.hasNoData ? (
                            // Veri yoksa boş mesajı göster
                            <li className="nav-submenu__item">
                              <div className="nav-submenu__link text-neutral-500 text-center py-12">
                                Henüz liste yok
                              </div>
                            </li>
                          ) : (
                            // Veri varsa linkleri göster
                            item.links.map((link, linkIndex) => (
                              <li key={linkIndex} className="nav-submenu__item">
                                <Link
                                  href={link.href}
                                  className="nav-submenu__link hover-bg-neutral-30"
                                  onClick={closeMenu}
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))
                          )}
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
                        <Link
                          href={item.href || "#"}
                          className="nav-menu__link"
                          onClick={closeMenu}
                        >
                          <span className="nav-menu__label">{item.label}</span>
                          {item.count !== undefined && item.count > 0 && (
                            <span className="nav-menu__badge">
                              {item.count > 99 ? "99+" : item.count}
                            </span>
                          )}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Çıkış Yap Butonu - Sadece giriş yapmış kullanıcılar için */}
        {user && (
          <div className="mobile-menu__footer">
            <button
              onClick={handleLogout}
              className="mobile-menu__logout-btn"
              type="button"
            >
              <span className="mobile-menu__logout-icon">
                <i className="ph-bold ph-sign-out" />
              </span>
              <span className="mobile-menu__logout-text">Çıkış Yap</span>
              <span className="mobile-menu__logout-arrow">
                <i className="ph-bold ph-arrow-right" />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
