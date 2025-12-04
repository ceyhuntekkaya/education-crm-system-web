"use client";

import React from "react";

interface ContactItem {
  icon: string;
  title: string;
  content: string;
  link: { href: string; label: string } | null;
}

const contactItems: ContactItem[] = [
  {
    icon: "ph-map-pin-line",
    title: "Adres",
    content: "İstanbul, Türkiye",
    link: null,
  },
  {
    icon: "ph-envelope-open",
    title: "E-posta Adresi",
    content: "bilgi@egitimsite.com",
    link: {
      href: "mailto:bilgi@egitimsite.com",
      label: "E-posta Gönder",
    },
  },
  {
    icon: "ph-phone-call",
    title: "Telefon Numarası",
    content: "Yakında eklenecek",
    link: null,
  },
];

const iconStyle: React.CSSProperties = {
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  backgroundColor: "var(--main-600)",
  color: "white",
  fontSize: "28px",
};

export const ContactInfoSection: React.FC = () => {
  return (
    <section className="contact py-40">
      <div className="container">
        <div className="section-heading text-center">
          <div className="flex-align d-inline-flex gap-8 mb-16">
            <span className="text-main-600 text-2xl d-flex">
              <i className="ph-bold ph-envelope-simple" />
            </span>
            <h5 className="text-main-600 mb-0">İletişim</h5>
          </div>
          <h2 className="mb-24">Bizimle İletişime Geçin</h2>
          <p className="text-neutral-500">
            Eğitim İste platformu hakkında detaylı bilgi almak, demo talep etmek
            veya sorularınızı iletmek için bizimle iletişime geçebilirsiniz.
          </p>
        </div>
        <div className="row gy-4">
          {contactItems.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-4">
              <div className="contact-item bg-main-25 border border-neutral-30 rounded-12 px-32 py-40 d-flex align-items-center gap-24 hover-bg-main-600 transition-2 hover-border-main-600 h-100">
                <span
                  className="contact-item__icon flex-shrink-0 d-flex align-items-center justify-content-center"
                  style={iconStyle}
                >
                  <i className={`ph ${item.icon}`} />
                </span>
                <div className="flex-grow-1">
                  <h4 className="mb-8">{item.title}</h4>
                  <p className="text-neutral-500 mb-0">{item.content}</p>
                  {item.link && (
                    <a
                      href={item.link.href}
                      className="text-main-600 fw-semibold text-decoration-underline mt-8 d-inline-block"
                    >
                      {item.link.label}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
