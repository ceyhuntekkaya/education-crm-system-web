"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts";
import { Role } from "@/enums/Role";
import { Logo } from "@/components/layouts/header/sections";
import { Button, Popover, CustomImage } from "@/components/ui";

const IndividualHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, currentRole, logout } = useAuth();
  const [scroll, setScroll] = React.useState(false);
  const [isMenuActive, setIsMenuActive] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScroll(window.pageYOffset > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getPanelInfo = () => {
    switch (currentRole) {
      case Role.TEACHER:
        return { name: "Öğretmen Paneli", icon: "ph-chalkboard-teacher" };
      case Role.COMPANY:
        return { name: "Bireysel Şirket Paneli", icon: "ph-briefcase" };
      case Role.INSTRUCTOR:
        return { name: "Eğitmen Paneli", icon: "ph-user-circle-gear" };
      default:
        return { name: "Panel", icon: "ph-square" };
    }
  };

  const getNavigationItems = () => {
    switch (currentRole) {
      case Role.TEACHER:
        return [
          { href: "/individual/teacher", label: "Ana Sayfa", icon: "ph-house" },
          {
            href: "/individual/teacher/teacher-profile",
            label: "Profilim",
            icon: "ph-user-circle",
          },
          {
            href: "/individual/teacher/applications",
            label: "Başvurularım",
            icon: "ph-file-text",
          },
          {
            href: "/individual/teacher/job-postings",
            label: "İş İlanları",
            icon: "ph-briefcase",
          },
        ];
      case Role.COMPANY:
        return [
          { href: "/individual/company", label: "Ana Sayfa", icon: "ph-house" },
          {
            href: "/individual/company/job-postings",
            label: "İlanlarım",
            icon: "ph-briefcase",
          },
        ];
      case Role.INSTRUCTOR:
        return [
          {
            href: "/individual/instructor",
            label: "Ana Sayfa",
            icon: "ph-house",
          },
          {
            href: "/individual/instructor/organizers",
            label: "Organizatörler",
            icon: "ph-buildings",
          },
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();
  const panelInfo = getPanelInfo();

  return (
    <>
      <header className={`header ${scroll ? "fixed-header" : ""}`}>
        <div className="container container--xl">
          <nav className="header-inner flex-between gap-4">
            <div className="header-content-wrapper flex-align flex-grow-1">
              <Logo />

              <div className="header-navigation d-lg-block d-none">
                <ul className="nav-menu flex-align ms-12">
                  {navigationItems.map((item, index) => (
                    <li
                      key={index}
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
            </div>

            <div className="header-right flex-align">
              <div className="d-none d-lg-flex flex-align gap-8 bg-main-25 rounded-8 px-12 py-6 me-12">
                <i
                  className={`ph ${panelInfo.icon} text-main-600`}
                  style={{ fontSize: "18px" }}
                />
                <span className="text-sm fw-medium text-neutral-700">
                  {panelInfo.name}
                </span>
              </div>

              {user && (
                <div className="user-menu-wrapper">
                  <div className="user-menu-popover">
                    <Popover
                      placement="bottom-end"
                      trigger="hover"
                      content={
                        <div className="p-8" style={{ minWidth: "220px" }}>
                          <div className="p-10 mb-4">
                            <div className="fw-semibold text-neutral-900 text-sm mb-2">
                              {user.fullName}
                            </div>
                            <div className="text-neutral-500 text-xs mb-8">
                              {user.email}
                            </div>
                            <span className="d-inline-block px-6 py-2 text-xs fw-semibold bg-main-50 text-main-700 rounded-4 text-uppercase">
                              {String(currentRole)}
                            </span>
                          </div>
                          <span className="d-block border border-neutral-30 my-4" />
                          <div className="d-flex flex-column gap-2">
                            <Button
                              onClick={() => router.push("/")}
                              variant="outline"
                              size="xs"
                              leftIcon="ph ph-house"
                              fullWidth
                              className="justify-content-start mb-4"
                            >
                              Ana Sayfaya Dön
                            </Button>
                            <Button
                              onClick={logout}
                              variant="error"
                              size="xs"
                              leftIcon="ph ph-sign-out"
                              fullWidth
                              className="justify-content-start"
                            >
                              Çıkış Yap
                            </Button>
                          </div>
                        </div>
                      }
                    >
                      <button
                        type="button"
                        className="user-menu-trigger"
                        aria-label="User menu"
                      >
                        <CustomImage
                          src={user?.profileImageUrl}
                          tempImage={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user?.fullName || "User",
                          )}&background=random&color=fff&size=88`}
                          alt={user?.fullName || "Kullanıcı"}
                          width={44}
                          height={44}
                          variant="circle"
                        />
                      </button>
                    </Popover>
                  </div>
                </div>
              )}

              <button
                type="button"
                className="toggle-mobileMenu d-lg-none text-neutral-200 flex-center"
                onClick={() => setIsMenuActive(!isMenuActive)}
              >
                <i className={`ph-bold ${isMenuActive ? "ph-x" : "ph-list"}`} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu d-lg-none ${isMenuActive ? "active" : ""}`}>
        <div
          className="mobile-menu__overlay"
          onClick={() => setIsMenuActive(false)}
        />
        <div className="mobile-menu__wrapper">
          <div className="mobile-menu__header">
            <Logo />
            <button
              type="button"
              className="mobile-menu__close"
              onClick={() => setIsMenuActive(false)}
            >
              <i className="ph-bold ph-x" />
            </button>
          </div>
          <div className="mobile-menu__content">
            <div className="d-flex flex-align gap-8 bg-main-25 rounded-8 px-16 py-12 mx-16 mb-12">
              <i
                className={`ph ${panelInfo.icon} text-main-600`}
                style={{ fontSize: "20px" }}
              />
              <span className="text-sm fw-semibold text-neutral-700">
                {panelInfo.name}
              </span>
            </div>
            <ul className="mobile-menu__list">
              {navigationItems.map((item, index) => (
                <li key={index} className="mobile-menu__item">
                  <Link
                    href={item.href}
                    className={`mobile-menu__link ${
                      pathname === item.href ? "active" : ""
                    }`}
                    onClick={() => setIsMenuActive(false)}
                  >
                    <i className={`ph ${item.icon}`} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndividualHeader;
