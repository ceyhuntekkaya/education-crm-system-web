"use client";

import { usePageTitle } from "@/hooks";
import Link from "next/link";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { useState } from "react";

/* ── Veri ── */
const categories = [
  {
    icon: "ph-bold ph-math-operations",
    label: "LGS Hazırlık",
    count: "120+ kurs",
    desc: "8. sınıf öğrencileri için kapsamlı LGS hazırlık programları. Deneme sınavları, konu anlatımı ve soru çözümü.",
    color: "var(--main-600)",
    bg: "var(--main-50)",
    href: "/search?category=lgs",
  },
  {
    icon: "ph-bold ph-graduation-cap",
    label: "YKS / AYT",
    count: "98+ kurs",
    desc: "TYT ve AYT sınavlarına yönelik kapsamlı hazırlık programları. Alan bazlı uzmanlaşma ve strateji eğitimi.",
    color: "var(--main-two-600)",
    bg: "var(--main-two-50)",
    href: "/search?category=yks",
  },
  {
    icon: "ph-bold ph-book-open",
    label: "Lise Destek",
    count: "76+ kurs",
    desc: "Lise müfredatına paralel destek kursları. Zayıf dersleri güçlendirin, not ortalamanızı yükseltin.",
    color: "var(--main-three-600)",
    bg: "var(--main-three-50)",
    href: "/search?category=lise-destek",
  },
  {
    icon: "ph-bold ph-chalkboard-teacher",
    label: "Birebir Özel Ders",
    count: "210+ ilan",
    desc: "Alanında uzman öğretmenlerle birebir özel ders imkânı. Kişiye özel program ve esnek saat seçenekleri.",
    color: "#7c3aed",
    bg: "#f5f3ff",
    href: "/search?category=ozel-ders",
  },
];

const stats = [
  { end: 420, suffix: "+", label: "Aktif Kurs", icon: "ph-bold ph-book-open" },
  { end: 87, suffix: "%", label: "Başarı Oranı", icon: "ph-bold ph-trophy" },
  { end: 18000, suffix: "+", label: "Öğrenci", icon: "ph-bold ph-student" },
  {
    end: 1200,
    suffix: "+",
    label: "Uzman Eğitmen",
    icon: "ph-bold ph-chalkboard-teacher",
  },
];

const advantages = [
  {
    icon: "ph-bold ph-target",
    title: "Hedefe Odaklı Müfredat",
    desc: "Sınav odaklı, sonuç garantili müfredatlarla hedefinize ulaşın.",
  },
  {
    icon: "ph-bold ph-chart-line-up",
    title: "Gelişim Takibi",
    desc: "Haftalık deneme sınavları ve detaylı analiz raporlarıyla ilerlemenizi izleyin.",
  },
  {
    icon: "ph-bold ph-users-three",
    title: "Küçük Sınıflar",
    desc: "Maksimum 15 kişilik sınıflarda birebir ilgi ve kişisel koçluk.",
  },
  {
    icon: "ph-bold ph-monitor-play",
    title: "Online & Yüz Yüze",
    desc: "Hibrit eğitim modeli ile dilediğiniz formatta katılın.",
  },
  {
    icon: "ph-bold ph-exam",
    title: "Deneme Sınavları",
    desc: "Gerçek sınav formatında haftalık denemeler ve detaylı çözümlemeler.",
  },
  {
    icon: "ph-bold ph-medal",
    title: "Başarı Garantisi",
    desc: "Kanıtlanmış metodoloji ve %87 başarı oranı ile fark yaratın.",
  },
];

const faqs = [
  {
    q: "Hangi sınavlara hazırlık kursları mevcut?",
    a: "LGS, TYT, AYT, YDT ve DGS sınavlarına yönelik kapsamlı hazırlık programları sunulmaktadır.",
  },
  {
    q: "Kurslar online mı yoksa yüz yüze mi?",
    a: "Kurumların büyük çoğunluğu hem online hem yüz yüze seçenekler sunmaktadır. Filtreleme ile tercih ettiğiniz formatı seçebilirsiniz.",
  },
  {
    q: "Birebir özel ders nasıl alabilirim?",
    a: "'Birebir Özel Ders' kategorisinden öğretmen profillerini inceleyebilir ve uygun saatler için randevu oluşturabilirsiniz.",
  },
  {
    q: "Kurs ücretlerini nasıl karşılaştırabilirim?",
    a: "Arama sayfamızda fiyat aralığı filtresiyle bütçenize uygun kursları listeleyebilir ve yan yana karşılaştırabilirsiniz.",
  },
];

export default function EduCoursesPage() {
  usePageTitle("Sınav Hazırlık Kursları");
  const [viewed, setViewed] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="category-detail-page category-detail-page--secondary category-detail-page--edu">
      <div className="container">
        {/* Hero Section */}
        <div className="category-hero category-hero--edu" data-aos="fade-up">
          <div className="category-hero__badge category-hero__badge--secondary">
            <i className="ph-bold ph-graduation-cap" />
            Lise & Üniversite Hazırlık
          </div>
          <h1
            className="category-hero__title"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <span className="text-main-two-600">Sınav Hazırlık</span>{" "}
            Kurslarında Fark Yaratın
          </h1>
          <p
            className="category-hero__desc"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            LGS, YKS, AYT ve üniversite hazırlık programlarında Türkiye
            genelindeki en iyi kurslara ulaşın. Uzman eğitmenler, kanıtlanmış
            müfredat ve garantili başarı.
          </p>
          <div
            className="category-hero__actions"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <Link
              href="/search"
              className="btn btn-orange rounded-pill flex-align gap-8 d-inline-flex shimmer-btn"
            >
              <i className="ph-bold ph-magnifying-glass d-flex text-lg" />
              Kurs Ara
            </Link>
            <Link
              href="/how-it-works"
              className="btn btn-outline-orange rounded-pill flex-align gap-8 d-inline-flex"
            >
              <i className="ph-bold ph-info d-flex text-lg" />
              Nasıl Çalışır?
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <VisibilitySensor
          onChange={(isVisible: boolean) => {
            if (isVisible) setViewed(true);
          }}
          partialVisibility
          delayedCall
        >
          <div className="category-stats" data-aos="fade-up">
            {stats.map((s, i) => (
              <div
                key={i}
                className="category-stats__card"
                data-aos="zoom-in"
                data-aos-delay={i * 100}
              >
                <div className="category-stats__icon category-stats__icon--secondary">
                  <i className={s.icon} />
                </div>
                <span className="category-stats__value">
                  {viewed ? (
                    <CountUp
                      end={s.end}
                      duration={2.4}
                      separator="."
                      suffix={s.suffix}
                    />
                  ) : (
                    `0${s.suffix}`
                  )}
                </span>
                <span className="category-stats__label">{s.label}</span>
              </div>
            ))}
          </div>
        </VisibilitySensor>

        {/* Categories Grid */}
        <div className="category-grid-section">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">Kurs Kategorileri</h2>
            <p className="section-header__subtitle">
              Hedefinize uygun kurs kategorisini seçin ve en iyi programlara
              ulaşın
            </p>
          </div>
          <div className="category-grid">
            {categories.map((cat, i) => (
              <Link
                href={cat.href}
                key={i}
                className="category-grid__card"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div
                  className="category-grid__card-icon"
                  style={{ background: cat.bg, color: cat.color }}
                >
                  <i className={cat.icon} />
                </div>
                <div className="category-grid__card-body">
                  <h4 className="category-grid__card-title">{cat.label}</h4>
                  <span className="category-grid__card-count">{cat.count}</span>
                  <p className="category-grid__card-desc">{cat.desc}</p>
                </div>
                <div className="category-grid__card-action">
                  <span>Kursları Gör</span>
                  <i className="ph-bold ph-arrow-right" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Advantages Section */}
        <div className="category-advantages">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">
              Neden Bizi Tercih Etmelisiniz?
            </h2>
            <p className="section-header__subtitle">
              Sınav hazırlığında doğru adres için 6 güçlü neden
            </p>
          </div>
          <div className="category-advantages__grid">
            {advantages.map((adv, i) => (
              <div
                key={i}
                className="category-advantages__card"
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <div className="category-advantages__card-icon category-advantages__card-icon--secondary">
                  <i className={adv.icon} />
                </div>
                <h5 className="category-advantages__card-title">{adv.title}</h5>
                <p className="category-advantages__card-desc">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="category-faq">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">Sıkça Sorulan Sorular</h2>
            <p className="section-header__subtitle">
              Sınav hazırlık kursları hakkında merak ettikleriniz
            </p>
          </div>
          <div className="category-faq__list">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`category-faq__item ${openFaq === i ? "category-faq__item--open" : ""}`}
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <button
                  className="category-faq__question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <i
                    className={`ph-bold ${openFaq === i ? "ph-minus" : "ph-plus"}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="category-faq__answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="category-cta" data-aos="fade-up">
          <div className="category-cta__inner category-cta__inner--secondary">
            <div className="category-cta__gradient" />
            <div className="category-cta__content">
              <div className="category-cta__icon">
                <i className="ph-fill ph-graduation-cap" />
              </div>
              <h3 className="category-cta__title">
                Hayalinizdeki Üniversiteye Giden Yol
              </h3>
              <p className="category-cta__desc">
                420&apos;den fazla kurs arasından size en uygununu bulun ve
                sınav başarınızı garantileyin.
              </p>
              <div className="category-cta__buttons">
                <Link
                  href="/search"
                  className="btn btn-white btn-lg rounded-pill flex-align gap-8 d-inline-flex"
                >
                  <i className="ph-bold ph-magnifying-glass d-flex text-lg" />
                  Hemen Kurs Ara
                  <i className="ph-bold ph-arrow-right d-flex text-lg" />
                </Link>
                <Link
                  href="/how-it-works"
                  className="btn btn-outline-white btn-lg rounded-pill flex-align gap-8 d-inline-flex"
                >
                  <i className="ph-bold ph-info d-flex text-lg" />
                  Nasıl Çalışır?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
