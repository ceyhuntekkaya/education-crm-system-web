"use client";

import { usePageTitle } from "@/hooks";
import Link from "next/link";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { useState } from "react";

/* ── Veri ── */
const jobCategories = [
  {
    icon: "ph-bold ph-chalkboard-teacher",
    label: "Öğretmen Kadroları",
    count: "CV Havuzu",
    desc: "Matematik, Fen, Yabancı Dil ve Sınıf Öğretmenliği branşlarında nitelikli adaylara ulaşın.",
    color: "var(--main-600)",
    bg: "var(--main-50)",
    href: "/auth/register",
  },
  {
    icon: "ph-bold ph-user-circle-gear",
    label: "Rehberlik & PDR",
    count: "Uzmanlar",
    desc: "Kurum kültürünüze uygun, deneyimli rehber öğretmen ve eğitim koçlarını keşfedin.",
    color: "var(--main-two-600)",
    bg: "var(--main-two-50)",
    href: "/auth/register",
  },
  {
    icon: "ph-bold ph-crown",
    label: "Yönetici Pozisyonları",
    count: "Liderler",
    desc: "Okul müdürü, eğitim koordinatörü ve zümre başkanı gibi lider kadrolar için ilan verin.",
    color: "var(--main-three-600)",
    bg: "var(--main-three-50)",
    href: "/auth/register",
  },
  {
    icon: "ph-bold ph-clipboard-text",
    label: "Destek Personeli",
    count: "Operasyon",
    desc: "Öğrenci işleri, muhasebe, güvenlik ve hizmetli kadrolarınızı hızla tamamlayın.",
    color: "#7c3aed",
    bg: "#f5f3ff",
    href: "/auth/register",
  },
];

const stats = [
  { end: 2400, suffix: "+", label: "Kayıtlı CV", icon: "ph-bold ph-users" },
  {
    end: 12,
    suffix: "Saat",
    label: "Ort. İlan Onayı",
    icon: "ph-bold ph-clock",
  },
  { end: 150, suffix: "+", label: "Mutlu Kurum", icon: "ph-bold ph-buildings" },
  {
    end: 94,
    suffix: "%",
    label: "Pozisyon Kapama",
    icon: "ph-bold ph-handshake",
  },
];

const forEmployers = [
  {
    icon: "ph-bold ph-megaphone",
    title: "İş İlanı Yayınlama",
    desc: "Eğitim sektörüne özel iş ilanınızı dakikalar içinde yayınlayın ve nitelikli adaylara ulaşın.",
  },
  {
    icon: "ph-bold ph-funnel",
    title: "Aday Filtreleme",
    desc: "Deneyim, branş, sertifika ve lokasyona göre adayları otomatik filtreleyin.",
  },
  {
    icon: "ph-bold ph-chart-line-up",
    title: "Performans Takibi",
    desc: "Çalışanlarınızın gelişimini izleyin, bireysel eğitim ihtiyaçlarını tespit edin.",
  },
  {
    icon: "ph-bold ph-shield-check",
    title: "MEB Uyumlu Süreçler",
    desc: "MEB mevzuatına uygun belgeleme ve işe alım süreci yönetimi.",
  },
];

const forCandidates = [
  {
    icon: "ph-bold ph-user-focus",
    title: "Yetenek Tarama",
    desc: "Aday havuzumuzdaki binlerce güncel CV arasında yetkinlik bazlı arama yapın.",
  },
  {
    icon: "ph-bold ph-bell-ringing",
    title: "Otomatik Eşleşme",
    desc: "İlan kriterlerinize uyan adaylar sisteme eklendiğinde anında bildirim alın.",
  },
  {
    icon: "ph-bold ph-chat-circle-dots",
    title: "Mülakat Yönetimi",
    desc: "Mülakat davetlerini sistem üzerinden gönderin, aday notlarını dijital olarak tutun.",
  },
  {
    icon: "ph-bold ph-certificate",
    title: "Referans Kontrolü",
    desc: "Adayların geçmiş deneyimlerini ve referanslarını doğrulanmış verilerle inceleyin.",
  },
];

const faqs = [
  {
    q: "İş ilanı yayınlamak ücretli mi?",
    a: "Temel iş ilanı yayınlama ücretsizdir. Öne çıkan ilanlar ve ek özellikler için kurumsal paketlerimizi inceleyebilirsiniz.",
  },
  {
    q: "Eğitimci olarak nasıl başvurabilirim?",
    a: "Ücretsiz hesap oluşturup profilinizi tamamladıktan sonra ilgi duyduğunuz iş ilanlarına doğrudan başvurabilirsiniz.",
  },
  {
    q: "MEB onaylı belgeler gerekli mi?",
    a: "Pozisyona göre değişir. Öğretmenlik pozisyonları için genellikle MEB onaylı belgeler istenmektedir. İlan detaylarında gerekli belgeler belirtilmektedir.",
  },
  {
    q: "Ne kadar sürede geri dönüş alabilirim?",
    a: "Kurumlar genellikle 3–7 iş günü içinde başvurulara geri dönüş yapmaktadır. Platform üzerinden başvuru durumunuzu takip edebilirsiniz.",
  },
];

export default function HrEducationPage() {
  usePageTitle("İnsan Kaynakları");
  const [viewed, setViewed] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"employer" | "candidate">(
    "candidate",
  );

  return (
    <div className="category-detail-page category-detail-page--dark-gradient">
      <div className="container">
        {/* Hero Section */}
        <div className="category-hero category-hero--hr" data-aos="fade-up">
          <div className="category-hero__badge category-hero__badge--dark">
            <i className="ph-bold ph-briefcase" />
            İnsan Kaynakları
          </div>
          <h1
            className="category-hero__title"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Eğitim Kurumunuza{" "}
            <span style={{ color: "var(--main-200)" }}>En İyi Eğitmenleri</span>{" "}
            Bulun
          </h1>
          <p
            className="category-hero__desc"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            niteliğindeki eğitmen kadronuzu genişletin. İlan yayınlayın,
            başvuruları yönetin ve aday havuzumuzdan kurum kültürünüze en uygun
            öğretmenleri seçin.
          </p>
          <div
            className="category-hero__actions"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <Link
              href="/auth/register"
              className="btn btn-white rounded-pill flex-align gap-8 d-inline-flex shimmer-btn"
            >
              <i className="ph-bold ph-briefcase d-flex text-lg" />
              İlan Yayınla
            </Link>
            <Link
              href="/auth/register"
              className="btn btn-outline-white rounded-pill flex-align gap-8 d-inline-flex"
            >
              <i className="ph-bold ph-buildings d-flex text-lg" />
              Kurum Olarak Kaydol
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

        {/* Job Categories Grid */}
        <div className="category-grid-section">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">Pozisyon Kategorileri</h2>
            <p className="section-header__subtitle">
              Aradığınız pozisyon türünü seçin ve uygun ilanları bulun
            </p>
          </div>
          <div className="category-grid">
            {jobCategories.map((cat, i) => (
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
                  <span>İlanları Gör</span>
                  <i className="ph-bold ph-arrow-right" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tab Section — Kurumlar / Adaylar */}
        <div className="category-tabs">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">Size Özel Çözümler</h2>
            <p className="section-header__subtitle">
              Kurum veya aday olarak platformdan nasıl faydalanabilirsiniz
            </p>
          </div>
          <div className="category-tabs__nav" data-aos="fade-up">
            <button
              className={`category-tabs__btn ${activeTab === "candidate" ? "category-tabs__btn--active" : ""}`}
              onClick={() => setActiveTab("candidate")}
            >
              <i className="ph-bold ph-user" />
              Eğitimciler İçin
            </button>
            <button
              className={`category-tabs__btn ${activeTab === "employer" ? "category-tabs__btn--active" : ""}`}
              onClick={() => setActiveTab("employer")}
            >
              <i className="ph-bold ph-buildings" />
              Kurumlar İçin
            </button>
          </div>
          <div className="category-advantages">
            <div className="category-advantages__grid">
              {(activeTab === "employer" ? forEmployers : forCandidates).map(
                (item, i) => (
                  <div
                    key={i}
                    className="category-advantages__card"
                    data-aos="fade-up"
                    data-aos-delay={i * 80}
                  >
                    <div className="category-advantages__card-icon">
                      <i className={item.icon} />
                    </div>
                    <h5 className="category-advantages__card-title">
                      {item.title}
                    </h5>
                    <p className="category-advantages__card-desc">
                      {item.desc}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="category-faq">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">Sıkça Sorulan Sorular</h2>
            <p className="section-header__subtitle">
              İK platformu hakkında merak ettikleriniz
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
          <div className="category-cta__inner category-cta__inner--hr">
            <div className="category-cta__gradient" />
            <div className="category-cta__content">
              <div className="category-cta__icon">
                <i className="ph-fill ph-briefcase" />
              </div>
              <h3 className="category-cta__title">
                Eğitim Kariyerinizde Yeni Bir Sayfa
              </h3>
              <p className="category-cta__desc">
                2.400&apos;den fazla eğitimci ve 150+ kurum ile Türkiye&apos;nin
                en büyük eğitim İK platformu.
              </p>
              <div className="category-cta__buttons">
                <Link
                  href="/search"
                  className="btn btn-white btn-lg rounded-pill flex-align gap-8 d-inline-flex"
                >
                  <i className="ph-bold ph-briefcase d-flex text-lg" />
                  İş İlanlarını Gör
                  <i className="ph-bold ph-arrow-right d-flex text-lg" />
                </Link>
                <Link
                  href="/auth/register"
                  className="btn btn-outline-white btn-lg rounded-pill flex-align gap-8 d-inline-flex"
                >
                  <i className="ph-bold ph-buildings d-flex text-lg" />
                  Kurum Kaydı
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
