"use client";

import { usePageTitle } from "@/hooks";
import Link from "next/link";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { useState } from "react";

/* ── Veri ── */
const categories = [
  {
    icon: "ph-bold ph-music-note",
    label: "Müzik",
    count: "120+ kurum",
    desc: "Piyano, gitar, keman, bağlama ve daha fazlası. Her yaş grubuna uygun müzik eğitimi programları.",
    color: "#7c3aed",
    bg: "#f5f3ff",
    href: "/search?category=muzik",
  },
  {
    icon: "ph-bold ph-soccer-ball",
    label: "Spor",
    count: "85+ kurum",
    desc: "Futbol, basketbol, tenis, jimnastik ve daha birçok branşta profesyonel spor eğitimi.",
    color: "#16a34a",
    bg: "#f0fdf4",
    href: "/search?category=spor",
  },
  {
    icon: "ph-bold ph-paint-brush",
    label: "Resim & Sanat",
    count: "94+ kurum",
    desc: "Resim, heykel, seramik ve dijital sanat atölyeleri. Yaratıcılığı keşfetme ve geliştirme.",
    color: "#d97706",
    bg: "#fffbeb",
    href: "/search?category=sanat",
  },
  {
    icon: "ph-bold ph-person-simple-walk",
    label: "Dans",
    count: "67+ kurum",
    desc: "Bale, modern dans, halk dansları ve latin dansları. Ritim ve koordinasyon geliştirme.",
    color: "#db2777",
    bg: "#fdf2f8",
    href: "/search?category=dans",
  },
  {
    icon: "ph-bold ph-crown",
    label: "Satranç",
    count: "51+ kurum",
    desc: "Stratejik düşünme, problem çözme ve konsantrasyon geliştiren satranç eğitimi programları.",
    color: "#0f766e",
    bg: "#f0fdfa",
    href: "/search?category=satranc",
  },
  {
    icon: "ph-bold ph-swimming-pool",
    label: "Yüzme",
    count: "73+ kurum",
    desc: "Bebek yüzme, yetişkin yüzme ve yarışma hazırlık programları. Güvenli havuz ortamlarında eğitim.",
    color: "#0369a1",
    bg: "#eff6ff",
    href: "/search?category=yuzme",
  },
];

const stats = [
  { end: 500, suffix: "+", label: "Aktif Kurum", icon: "ph-bold ph-buildings" },
  { end: 8, suffix: "", label: "Kategori", icon: "ph-bold ph-squares-four" },
  { end: 35000, suffix: "+", label: "Öğrenci", icon: "ph-bold ph-student" },
  { end: 96, suffix: "%", label: "Memnuniyet", icon: "ph-bold ph-smiley" },
];

const ageGroups = [
  {
    range: "3–6 Yaş",
    title: "Erken Çocukluk",
    desc: "Motor beceriler, müzik hissi ve sosyal gelişim odaklı aktiviteler. Oynamayı öğrenirken öğrenin.",
    icon: "ph-bold ph-baby",
    color: "#db2777",
    bg: "#fce7f3",
    href: "/search?age=3-6",
  },
  {
    range: "7–12 Yaş",
    title: "İlkokul Dönemi",
    desc: "Yetenekleri keşfetme, disiplin kazanma ve takım çalışması. Merak ve keşif yaşları.",
    icon: "ph-bold ph-lightning",
    color: "#d97706",
    bg: "#fef3c7",
    href: "/search?age=7-12",
  },
  {
    range: "13–18 Yaş",
    title: "Ergenlik Dönemi",
    desc: "Uzmanlaşma, yarışma hazırlığı ve kariyer yönlendirme. Potansiyeli zirveye taşıma zamanı.",
    icon: "ph-bold ph-rocket",
    color: "#7c3aed",
    bg: "#f5f3ff",
    href: "/search?age=13-18",
  },
  {
    range: "18+ Yaş",
    title: "Yetişkin",
    desc: "Hobi, stres yönetimi ve yeni beceriler kazanma. Yaş sınırı olmadan öğrenme devam eder.",
    icon: "ph-bold ph-user",
    color: "var(--main-three-600)",
    bg: "var(--main-three-50)",
    href: "/search?age=adult",
  },
];

const faqs = [
  {
    q: "Kaç yaşından itibaren aktivite kursuna başlanabilir?",
    a: "Birçok aktivite kursu 3 yaşından itibaren başlamaktadır. Yüzme gibi branşlarda bebek programları 6 aydan itibaren mevcuttur.",
  },
  {
    q: "Deneme dersi imkânı var mı?",
    a: "Kurumların büyük çoğunluğu ücretsiz deneme dersi sunmaktadır. Kurum profilinden deneme dersi talebinde bulunabilirsiniz.",
  },
  {
    q: "Gruplar kaç kişilik oluyor?",
    a: "Aktivite türüne göre değişmekle birlikte, genellikle 6–15 kişilik gruplar halinde eğitim verilmektedir.",
  },
  {
    q: "Hafta sonu programları mevcut mu?",
    a: "Evet, birçok kurum hafta sonu ve akşam saatlerinde de program sunmaktadır. Filtreleme ile uygun saatleri seçebilirsiniz.",
  },
];

export default function ActivityCoursesPage() {
  usePageTitle("Aktivite Kursları");
  const [viewed, setViewed] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="category-detail-page category-detail-page--tertiary category-detail-page--activity">
      <div className="container">
        {/* Hero Section */}
        <div
          className="category-hero category-hero--activity"
          data-aos="fade-up"
        >
          <div className="category-hero__badge category-hero__badge--tertiary">
            <i className="ph-bold ph-sparkle" />
            Aktivite Kursları
          </div>
          <h1
            className="category-hero__title"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <span className="text-main-three-600">Yeteneği Keşfet</span>,
            Tutkuyu Geliştir
          </h1>
          <p
            className="category-hero__desc"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Müzikten spora, sanattan teknolojiye — çocuğunuzun ilgi alanına
            uygun aktivite kurslarını bulun ve yeteneklerini en iyi eğitmenlerle
            geliştirin.
          </p>
          <div
            className="category-hero__actions"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <Link
              href="/search"
              className="btn btn-teal rounded-pill flex-align gap-8 d-inline-flex shimmer-btn"
            >
              <i className="ph-bold ph-magnifying-glass d-flex text-lg" />
              Aktivite Ara
            </Link>
            <Link
              href="/how-it-works"
              className="btn btn-outline-teal rounded-pill flex-align gap-8 d-inline-flex"
            >
              <i className="ph-bold ph-path d-flex text-lg" />
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
                <div className="category-stats__icon category-stats__icon--tertiary">
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
            <h2 className="section-header__title">Aktivite Kategorileri</h2>
            <p className="section-header__subtitle">
              İlgi alanına göre kategori seçin ve en iyi kurumları keşfedin
            </p>
          </div>
          <div className="category-grid category-grid--3col">
            {categories.map((cat, i) => (
              <Link
                href={cat.href}
                key={i}
                className="category-grid__card"
                data-aos="fade-up"
                data-aos-delay={i * 80}
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
                  <span>Kurumları Gör</span>
                  <i className="ph-bold ph-arrow-right" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Age Groups Section */}
        <div className="activity-age-groups">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">Yaş Gruplarına Göre</h2>
            <p className="section-header__subtitle">
              Her yaş grubuna özel tasarlanmış aktivite programları
            </p>
          </div>
          <div className="activity-age-groups__grid">
            {ageGroups.map((ag, i) => (
              <Link
                href={ag.href}
                key={i}
                className="activity-age-groups__card"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div
                  className="activity-age-groups__card-icon"
                  style={{ background: ag.bg, color: ag.color }}
                >
                  <i className={ag.icon} />
                </div>
                <div className="activity-age-groups__card-body">
                  <span
                    className="activity-age-groups__card-range"
                    style={{ background: ag.bg, color: ag.color }}
                  >
                    {ag.range}
                  </span>
                  <h5 className="activity-age-groups__card-title">
                    {ag.title}
                  </h5>
                  <p className="activity-age-groups__card-desc">{ag.desc}</p>
                </div>
                <div className="activity-age-groups__card-action">
                  <span>Aktiviteleri Gör</span>
                  <i className="ph-bold ph-arrow-right" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="category-faq">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">Sıkça Sorulan Sorular</h2>
            <p className="section-header__subtitle">
              Aktivite kursları hakkında merak ettikleriniz
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
          <div className="category-cta__inner category-cta__inner--tertiary">
            <div className="category-cta__gradient" />
            <div className="category-cta__content">
              <div className="category-cta__icon">
                <i className="ph-fill ph-sparkle" />
              </div>
              <h3 className="category-cta__title">
                Yetenekleri Keşfetmeye Başlayın
              </h3>
              <p className="category-cta__desc">
                500&apos;den fazla aktivite kurumu arasından çocuğunuza en uygun
                programı bulun.
              </p>
              <div className="category-cta__buttons">
                <Link
                  href="/search"
                  className="btn btn-white btn-lg rounded-pill flex-align gap-8 d-inline-flex"
                >
                  <i className="ph-bold ph-magnifying-glass d-flex text-lg" />
                  Hemen Aktivite Ara
                  <i className="ph-bold ph-arrow-right d-flex text-lg" />
                </Link>
                <Link
                  href="/how-it-works"
                  className="btn btn-outline-white btn-lg rounded-pill flex-align gap-8 d-inline-flex"
                >
                  <i className="ph-bold ph-path d-flex text-lg" />
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
