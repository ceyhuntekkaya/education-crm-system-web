"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface LegalPageLayoutProps {
  children: React.ReactNode;
  title: string;
  lastUpdated: string;
}

const LegalPageLayout = ({
  children,
  title,
  lastUpdated,
}: LegalPageLayoutProps) => {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/terms",
      label: "Kullanım Koşulları",
      icon: "ph-file-text",
    },
    {
      href: "/privacy",
      label: "Gizlilik Politikası",
      icon: "ph-shield-check",
    },
  ];

  return (
    <div className="legal-page">
      {/* Sidebar */}
      <aside className="legal-sidebar">
        {/* Logo */}
        <div className="legal-sidebar__header">
          <Link href="/" className="legal-sidebar__logo">
            <Image
              src="/assets/images/logo/logo.png"
              alt="Eğitim İste"
              width={140}
              height={40}
              className="legal-sidebar__logo-image"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="legal-sidebar__nav">
          <div className="legal-sidebar__nav-label">Yasal Belgeler</div>
          <ul className="legal-sidebar__menu">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`legal-sidebar__menu-item ${
                    pathname === item.href
                      ? "legal-sidebar__menu-item--active"
                      : ""
                  }`}
                >
                  <i className={`ph ${item.icon}`} />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="legal-sidebar__footer">
          <Link href="/" className="legal-sidebar__back">
            <i className="ph ph-arrow-left" />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="legal-main">
        {/* Page Header */}
        <div className="legal-main__header">
          <h1 className="legal-main__title">{title}</h1>
          <div className="legal-main__meta">
            <i className="ph ph-calendar-blank" />
            <span>Son güncelleme: {lastUpdated}</span>
          </div>
        </div>

        {/* Content */}
        <div className="legal-main__content">{children}</div>

        {/* Footer */}
        {/* <div className="legal-main__footer">
          <p>
            Sorularınız için{" "}
            <Link href="/contact" className="legal-main__footer-link">
              iletişim
            </Link>{" "}
            sayfamızı ziyaret edebilirsiniz.
          </p>
        </div> */}
      </main>
    </div>
  );
};

export default LegalPageLayout;
