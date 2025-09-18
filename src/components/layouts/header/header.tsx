"use client";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useHeader } from "./context";
import { Logo, Menu, UserMenu, MobileMenu } from "./sections";
import { menuItems } from "./config";
import { classNames } from "./utils";

const Header = () => {
  const { user, logout, currentRole } = useAuth();
  const pathname = usePathname();
  const { scroll, isMenuActive, toggleMenu } = useHeader();

  return (
    <>
      <div className={classNames("side-overlay", isMenuActive && "show")}></div>
      <header className={classNames("header", scroll && "fixed-header")}>
        <div className="container container--xl">
          <nav className="header-inner flex-between gap-8">
            <div className="header-content-wrapper flex-align flex-grow-1">
              {/* Logo Start */}
              <Logo />
              {/* Logo End  */}

              {/* Menu Start  */}

              {/* Menu End  */}
            </div>
            {/* Header Right start */}
            <div className="header-right flex-align">
              {/* <SearchForm /> */}
              <Menu menuItems={menuItems} pathname={pathname} />
              <UserMenu user={user} currentRole={currentRole} logout={logout} />
              <button
                type="button"
                className="toggle-mobileMenu d-lg-none text-neutral-200 flex-center"
                onClick={toggleMenu}
              >
                <i className="ph ph-list" />
              </button>
            </div>
            {/* Header Right End  */}
          </nav>
        </div>
      </header>

      <MobileMenu menuItems={menuItems} pathname={pathname} />
    </>
  );
};

export default Header;
