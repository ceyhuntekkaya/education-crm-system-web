"use client";
import { ProtectedGuard } from "@/providers";
import { HeaderProvider, useHeader } from "./context";
import {
  Logo,
  UserNavigation,
  MainNavigation,
  UserMenu,
  MobileMenu,
} from "./sections";
import { classNames } from "./utils";

const HeaderContent = () => {
  const { scroll, isMenuActive, toggleMenu } = useHeader();

  return (
    <>
      <header className={classNames("header", scroll && "fixed-header")}>
        <div className="container container--xl">
          <nav className="header-inner flex-between gap-4">
            <div className="header-content-wrapper flex-align flex-grow-1">
              {/* Logo Start */}

              <Logo />

              {/* Logo End  */}

              {/* Ana Navigasyon (Anasayfa, Kurum Arama) */}
              <MainNavigation />
              {/* Ana Navigasyon End  */}
            </div>
            {/* Header Right start */}
            <div className="header-right flex-align">
              {/* <SearchForm /> */}
              <ProtectedGuard>
                {/* Kullanıcı Navigasyonu (Randevularım, Listelerim, vs.) */}
                <UserNavigation />
              </ProtectedGuard>

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

const Header = () => {
  return (
    <HeaderProvider>
      <HeaderContent />
    </HeaderProvider>
  );
};

export default Header;
