import Link from "next/link";
import { usePathname } from "next/navigation";
import { classNames, isActivePage, getMenuItemKey } from "../utils";
import { useHeader } from "../context";
import { useAuth } from "@/contexts";
import { Drawer } from "@/components/ui/drawer";
import Button from "@/components/ui/button";
import Logo from "./logo";

const mainNavItems = [
  {
    href: "/",
    label: "Anasayfa",
    icon: "ph-house",
    iconBg: "mobile-menu__nav-icon--main",
  },
  {
    href: "/search",
    label: "Eğitim Ara",
    icon: "ph-magnifying-glass",
    iconBg: "mobile-menu__nav-icon--primary",
  },
  {
    href: "/memberships",
    label: "Kurumsal Üyelik",
    icon: "ph-crown",
    iconBg: "mobile-menu__nav-icon--warning",
  },
  {
    href: "/how-it-works",
    label: "Nasıl Çalışır",
    icon: "ph-info",
    iconBg: "mobile-menu__nav-icon--info",
  },
  {
    href: "/about",
    label: "Hakkımızda",
    icon: "ph-users",
    iconBg: "mobile-menu__nav-icon--success",
  },
  {
    href: "/contact",
    label: "İletişim",
    icon: "ph-envelope",
    iconBg: "mobile-menu__nav-icon--danger",
  },
];

const quickCategories = [
  {
    href: "/private-schools",
    label: "Özel Okullar",
    icon: "ph-graduation-cap",
  },
  { href: "/edu-courses", label: "Eğitim Kursları", icon: "ph-book-open" },
  { href: "/language-courses", label: "Dil Kursları", icon: "ph-globe" },
  {
    href: "/activity-courses",
    label: "Aktivite Kursları",
    icon: "ph-basketball",
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
    <Drawer
      isOpen={isMenuActive}
      onClose={closeMenu}
      position="left"
      width="320px"
      className="mobile-menu-drawer"
      header={<Logo isMobile onClick={closeMenu} />}
      footer={
        user ? (
          <Button
            variant="error"
            fullWidth
            leftIcon="ph-bold ph-sign-out"
            onClick={handleLogout}
          >
            Çıkış Yap
          </Button>
        ) : undefined
      }
    >
      {/* Ana Navigasyon */}
      <div className="mobile-menu__section mobile-menu__section--first">
        <div className="mobile-menu__section-label">Sayfalar</div>
        <ul className="nav-menu--mobile">
          {mainNavItems.map((item, index) => (
            <li
              className={classNames(
                "nav-menu__item",
                isActivePage(pathname, item.href) && "activePage",
              )}
              key={`main-nav-${index}`}
            >
              <Link
                href={item.href}
                className="nav-menu__link"
                onClick={closeMenu}
              >
                <span className={`mobile-menu__nav-icon ${item.iconBg}`}>
                  <i className={`ph ${item.icon}`} />
                </span>
                <span className="nav-menu__label">{item.label}</span>
                <i className="ph ph-caret-right mobile-menu__arrow" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Hızlı Kategoriler */}
      <div className="mobile-menu__divider" />
      <div className="mobile-menu__section">
        <div className="mobile-menu__section-label">Hızlı Keşfet</div>
        <ul className="nav-menu--mobile">
          {quickCategories.map((cat, i) => (
            <li className="nav-menu__item" key={`cat-${i}`}>
              <Link
                href={cat.href}
                className="nav-menu__link"
                onClick={closeMenu}
              >
                <span className="mobile-menu__nav-icon mobile-menu__nav-icon--main">
                  <i className={`ph ${cat.icon}`} />
                </span>
                <span className="nav-menu__label">{cat.label}</span>
                <i className="ph ph-caret-right mobile-menu__arrow" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Kullanıcı Navigasyonu */}
      {user && menuItems.length > 0 && (
        <>
          <div className="mobile-menu__divider" />
          <div className="mobile-menu__section">
            <div className="mobile-menu__section-label">Hesabım</div>
            <ul className="nav-menu--mobile">
              {menuItems.map((item, index) =>
                item.links ? (
                  <li
                    key={getMenuItemKey("menu-item", index)}
                    className={classNames(
                      "nav-menu__item has-submenu",
                      activeSubmenu === index && "active activePage",
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
                    <ul className="nav-submenu">
                      {item.hasNoData ? (
                        <li className="nav-submenu__item">
                          <div className="nav-submenu__link text-neutral-500 text-center py-12">
                            Henüz liste yok
                          </div>
                        </li>
                      ) : (
                        item.links.map((link, linkIndex) => (
                          <li key={linkIndex} className="nav-submenu__item">
                            <Link
                              href={link.href}
                              className="nav-submenu__link"
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
                        "activePage",
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
                ),
              )}
            </ul>
          </div>
        </>
      )}
    </Drawer>
  );
};

export default MobileMenu;
