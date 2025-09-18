"use client";
import { useHeader } from "./context";
import { Logo, Menu, UserMenu, MobileMenu } from "./sections";
import { classNames } from "./utils";

const Header = () => {
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
              <Menu />
              <UserMenu />
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

      <MobileMenu />
    </>
  );
};

export default Header;
