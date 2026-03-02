"use client";

import { usePageTitle } from "@/hooks";
import Link from "next/link";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { useState } from "react";

/* ── Veri ── */
const categories = [
  {
    icon: "ph-bold ph-baby",
    label: "Anaokulu & Kreş",
    count: "120+ okul",
    desc: "0-6 yaş grubu için kreş ve anaokulu seçenekleri. Güvenli ortam, uzman kadro ve yaratıcı müfredat.",
    color: "var(--main-three-600)",
    bg: "var(--main-three-50)",
    href: "/search?category=anaokulu",
  },
  {
    icon: "ph-bold ph-book-open-text",
    label: "İlkokul",
    count: "280+ okul",
    desc: "Akademik başarı ve kişisel gelişimi bir arada sunan, modern eğitim anlayışıyla donatılmış ilkokullar.",
    color: "var(--main-600)",
    bg: "var(--main-50)",
    href: "/search?category=ilkokul",
  },
  {
    icon: "ph-bold ph-student",
    label: "Ortaokul",
    count: "210+ okul",
    desc: "LGS hazırlık desteği, STEM eğitimi ve sosyal aktivitelerle öğrencileri geleceğe hazırlayan ortaokullar.",
    color: "var(--main-two-600)",
    bg: "var(--main-two-50)",
    href: "/search?category=ortaokul",
  },
  {
    icon: "ph-bold ph-graduation-cap",
    label: "Lise",
    count: "240+ okul",
    desc: "Üniversite hazırlık, Anadolu, Fen ve uluslararası müfredatlarla donatılmış lise programları.",
    color: "#7c3aed",
    bg: "#f5f3ff",
    href: "/search?category=lise",
  },
];

const stats = [
  {
    end: 850,
    suffix: "+",
    label: "Kayıtlı Okul",
    icon: "ph-bold ph-buildings",
  },
  {
    end: 4.8,
    suffix: "★",
    label: "Ort. Puan",
    icon: "ph-bold ph-star",
    decimals: 1,
  },
  {
    end: 12000,
    suffix: "+",
    label: "Veli Yorumu",
    icon: "ph-bold ph-chat-circle-text",
  },
  { end: 81, suffix: "", label: "İl Kapsamı", icon: "ph-bold ph-map-pin" },
];

const advantages = [
  {
    icon: "ph-bold ph-magnifying-glass",
    title: "Detaylı Filtreleme",
    desc: "Lokasyon, fiyat aralığı, müfredat türü ve daha birçok kritere göre okulları filtreleyin.",
  },
  {
    icon: "ph-bold ph-scales",
    title: "Yan Yana Karşılaştırma",
    desc: "Beğendiğiniz okulları yan yana karşılaştırın, artı ve eksilerini kolayca görün.",
  },
  {
    icon: "ph-bold ph-chat-circle-dots",
    title: "Gerçek Veli Yorumları",
    desc: "Binlerce velinin deneyimlerini okuyun, doğrulanmış yorumlarla güvenle karar verin.",
  },
  {
    icon: "ph-bold ph-calendar-check",
    title: "Online Randevu",
    desc: "Beğendiğiniz okulla hemen tanışma randevusu oluşturun, zaman kaybetmeyin.",
  },
  {
    icon: "ph-bold ph-currency-circle-dollar",
    title: "Şeffaf Fiyatlandırma",
    desc: "Okul ücretlerini, kampanyaları ve burs imkânlarını karşılaştırın.",
  },
  {
    icon: "ph-bold ph-certificate",
    title: "Akreditasyon Bilgisi",
    desc: "Okulların ulusal ve uluslararası akreditasyon durumlarını görün.",
  },
];

const faqs = [
  {
    q: "Özel okul ücretlerini nasıl karşılaştırabilirim?",
    a: "Arama sayfamızda fiyat aralığı filtresi ile bütçenize uygun okulları kolayca bulabilir ve yan yana karşılaştırabilirsiniz.",
  },
  {
    q: "Tanışma randevusu nasıl alınır?",
    a: "Beğendiğiniz okulun profilinde 'Randevu Al' butonuna tıklayarak online veya yüz yüze tanışma randevunuzu oluşturabilirsiniz.",
  },
  {
    q: "Veli yorumları güvenilir mi?",
    a: "Tüm yorumlar doğrulanmış veliler tarafından yazılmaktadır. Sahte yorum tespiti için yapay zekâ destekli filtreleme sistemi kullanıyoruz.",
  },
  {
    q: "Hangi şehirlerdeki okullar listeleniyor?",
    a: "Türkiye genelinde 81 ilde kayıtlı özel okulları platformumuzda bulabilirsiniz.",
  },
];

export default function PrivateSchoolsPage() {
  usePageTitle("Özel Okullar");
  const [viewed, setViewed] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="category-detail-page category-detail-page--schools">
      <div className="container">
        {/* Hero Section */}
        <div
          className="category-hero category-hero--schools"
          data-aos="fade-up"
        >
          <div className="category-hero__badge">
            <i className="ph-bold ph-buildings" />
            Özel Okullar
          </div>
          <h1
            className="category-hero__title"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Türkiye&apos;nin{" "}
            <span className="text-main-600">En İyi Özel Okullarını</span>{" "}
            Keşfedin
          </h1>
          <p
            className="category-hero__desc"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Anaokulu&apos;ndan liseye, Türkiye genelindeki 850&apos;den fazla
            özel okulu keşfedin. Konuma, fiyata ve veli değerlendirmelerine göre
            karşılaştırın, tanışma randevusu alın.
          </p>
          <div
            className="category-hero__actions"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <Link
              href="/search"
              className="btn btn-main rounded-pill flex-align gap-8 d-inline-flex shimmer-btn"
            >
              <i className="ph-bold ph-magnifying-glass d-flex text-lg" />
              Okul Ara
            </Link>
            <Link
              href="/about"
              className="btn btn-outline-main rounded-pill flex-align gap-8 d-inline-flex"
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
                <div className="category-stats__icon">
                  <i className={s.icon} />
                </div>
                <span className="category-stats__value">
                  {viewed ? (
                    <CountUp
                      end={s.end}
                      duration={2.4}
                      separator="."
                      decimals={s.decimals || 0}
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
            <h2 className="section-header__title">Seviyeye Göre Okullar</h2>
            <p className="section-header__subtitle">
              Çocuğunuzun eğitim seviyesine uygun özel okulları detaylıca
              inceleyin
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
                  <span>Okulları Gör</span>
                  <i className="ph-bold ph-arrow-right" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Advantages Section */}
        <div className="category-advantages">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">Neden Eğitim İste?</h2>
            <p className="section-header__subtitle">
              Doğru okulu bulmak için ihtiyacınız olan her şey tek platformda
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
                <div className="category-advantages__card-icon">
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
              Özel okullar hakkında merak ettikleriniz
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
          <div className="category-cta__inner category-cta__inner--schools">
            <div className="category-cta__gradient" />
            <div className="category-cta__content">
              <div className="category-cta__icon">
                <i className="ph-fill ph-buildings" />
              </div>
              <h3 className="category-cta__title">
                Çocuğunuz İçin En İyi Okulu Bulun
              </h3>
              <p className="category-cta__desc">
                850&apos;den fazla özel okul arasından çocuğunuza en uygun okulu
                keşfedin. Konuma, fiyata ve veli yorumlarına göre karşılaştırın.
              </p>
              <div className="category-cta__buttons">
                <Link
                  href="/search"
                  className="btn btn-white btn-lg rounded-pill flex-align gap-8 d-inline-flex"
                >
                  <i className="ph-bold ph-magnifying-glass d-flex text-lg" />
                  Hemen Okul Ara
                  <i className="ph-bold ph-arrow-right d-flex text-lg" />
                </Link>
                <Link
                  href="/about"
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
