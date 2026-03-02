"use client";

import { usePageTitle } from "@/hooks";
import Link from "next/link";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { useState } from "react";

/* ── Veri ── */
const eventTypes = [
  {
    icon: "ph-bold ph-video-camera",
    label: "Online Webinar",
    count: "Dijital",
    desc: "Zoom entegrasyonu ile canlı yayınlarınızı planlayın, kayıt linklerini otomatik gönderin.",
    color: "var(--main-two-600)",
    bg: "var(--main-two-50)",
    href: "/search",
  },
  {
    icon: "ph-bold ph-users-three",
    label: "Tanıtım Günleri",
    count: "Fiziksel",
    desc: "Okulunuzdaki açık kapı günleri için kayıt toplayın ve ziyaretçi listelerini yönetin.",
    color: "var(--main-600)",
    bg: "var(--main-50)",
    href: "/search",
  },
  {
    icon: "ph-bold ph-presentation-chart",
    label: "Seminer & Konferans",
    count: "Hibrit",
    desc: "Büyük ölçekli etkinliklerinizde bilet satışı, check-in ve yaka kartı süreçlerini yönetin.",
    color: "var(--main-three-600)",
    bg: "var(--main-three-50)",
    href: "/search",
  },
  {
    icon: "ph-bold ph-wrench",
    label: "Atölye Çalışması",
    count: "Uygulamalı",
    desc: "Sınırlı kontenjanlı atölyeleriniz için bekleme listesi ve ön ödeme özelliklerini kullanın.",
    color: "#7c3aed",
    bg: "#f5f3ff",
    href: "/search",
  },
];

const stats = [
  {
    end: 120,
    suffix: "+",
    label: "Etkinlik",
    icon: "ph-bold ph-calendar-check",
  },
  { end: 45000, suffix: "+", label: "Katılımcı", icon: "ph-bold ph-users" },
  {
    end: 80,
    suffix: "+",
    label: "Uzman Konuşmacı",
    icon: "ph-bold ph-microphone-stage",
  },
  { end: 98, suffix: "%", label: "Memnuniyet", icon: "ph-bold ph-heart" },
];

const features = [
  {
    icon: "ph-bold ph-wifi-high",
    title: "Online, Yüz Yüze & Hibrit",
    desc: "Dilediğiniz formatta, dilediğiniz yerden katılın. Her format için optimize edilmiş deneyim.",
  },
  {
    icon: "ph-bold ph-calendar-check",
    title: "Takvim Entegrasyonu",
    desc: "Google, Outlook ve Apple takvimlerinize anında ekleyin. Hatırlatma bildirimleri alın.",
  },
  {
    icon: "ph-bold ph-certificate",
    title: "Katılım Sertifikası",
    desc: "Her etkinlik sonrasında dijital katılım sertifikanızı alın ve LinkedIn profilinize ekleyin.",
  },
  {
    icon: "ph-bold ph-video-camera",
    title: "Kayıt & Tekrar İzle",
    desc: "Kaçırdığınız etkinlikleri istediğiniz zaman tekrar izleyin. Sınırsız erişim.",
  },
  {
    icon: "ph-bold ph-chats",
    title: "Soru-Cevap Oturumları",
    desc: "Canlı soru-cevap oturumları ile uzmanlardan doğrudan cevap alma imkânı.",
  },
  {
    icon: "ph-bold ph-download-simple",
    title: "Sunum Materyalleri",
    desc: "Tüm etkinlik materyallerine, sunumlara ve kaynaklara ücretsiz erişim.",
  },
];

const upcomingTopics = [
  {
    topic: "Dijital Çağda Eğitim",
    speaker: "Prof. Dr. Ayşe Yılmaz",
    date: "Yakında",
  },
  {
    topic: "Yapay Zekâ ve Eğitim Teknolojileri",
    speaker: "Doç. Dr. Mehmet Kaya",
    date: "Yakında",
  },
  {
    topic: "Çocuk Psikolojisi ve Okul Başarısı",
    speaker: "Psikolog Zeynep Demir",
    date: "Yakında",
  },
  {
    topic: "STEM Eğitiminde Yeni Yaklaşımlar",
    speaker: "Dr. Can Özkan",
    date: "Yakında",
  },
];

const faqs = [
  {
    q: "Webinarlara nasıl katılabilirim?",
    a: "Etkinlik detay sayfasından 'Kayıt Ol' butonuna tıklayarak ücretsiz kayıt oluşturabilirsiniz. Etkinlik saatinden önce e-posta ile bağlantı linki gönderilecektir.",
  },
  {
    q: "Katılım sertifikası nasıl alınır?",
    a: "Etkinliğe en az %80 oranında katılım sağlamanız durumunda dijital katılım sertifikanız otomatik olarak hesabınıza eklenir.",
  },
  {
    q: "Etkinlik kayıtlarını sonradan izleyebilir miyim?",
    a: "Evet, tüm etkinlik kayıtları etkinlik sonrasında 30 gün boyunca platformumuzda ücretsiz olarak erişilebilir.",
  },
  {
    q: "Etkinlikler ücretli mi?",
    a: "Webinarların büyük çoğunluğu ücretsizdir. Bazı özel atölye çalışmaları ve konferanslar için uygun fiyatlı katılım ücreti uygulanabilir.",
  },
];

export default function WebinarsPage() {
  usePageTitle("Webinar & Etkinlikler");
  const [viewed, setViewed] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="category-detail-page category-detail-page--webinar">
      <div className="container">
        {/* Hero Section */}
        <div
          className="category-hero category-hero--webinar"
          data-aos="fade-up"
        >
          <div className="category-hero__badge category-hero__badge--secondary">
            <i className="ph-bold ph-video-camera" />
            Webinar & Etkinlik
          </div>
          <h1
            className="category-hero__title"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Eğitim Etkinliklerinizi{" "}
            <span className="text-main-two-600">Tek Platformdan</span> Yönetin
          </h1>
          <p
            className="category-hero__desc"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Webinar, seminer ve tanıtım günlerinizi planlayın, kayıt toplayın ve
            katılımcılarınıza otomatik sertifika gönderin. Etkinlik yönetiminde
            profesyonel çözüm.
          </p>
          <div
            className="category-hero__actions"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <Link
              href="/auth/register"
              className="btn btn-orange rounded-pill flex-align gap-8 d-inline-flex"
            >
              <i className="ph-bold ph-rocket-launch d-flex text-lg" />
              Etkinlik Oluştur
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

        {/* Event Types Grid */}
        <div className="category-grid-section">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">Etkinlik Türleri</h2>
            <p className="section-header__subtitle">
              Size en uygun etkinlik formatını seçin
            </p>
          </div>
          <div className="category-grid">
            {eventTypes.map((et, i) => (
              <Link
                href={et.href}
                key={i}
                className="category-grid__card"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div
                  className="category-grid__card-icon"
                  style={{ background: et.bg, color: et.color }}
                >
                  <i className={et.icon} />
                </div>
                <div className="category-grid__card-body">
                  <h4 className="category-grid__card-title">{et.label}</h4>
                  <span className="category-grid__card-count">{et.count}</span>
                  <p className="category-grid__card-desc">{et.desc}</p>
                </div>
                <div className="category-grid__card-action">
                  <span>Etkinlikleri Gör</span>
                  <i className="ph-bold ph-arrow-right" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="category-advantages">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">
              Etkinlik Deneyimi Avantajları
            </h2>
            <p className="section-header__subtitle">
              Eğitim İste etkinliklerinde sizi neler bekliyor
            </p>
          </div>
          <div className="category-advantages__grid">
            {features.map((f, i) => (
              <div
                key={i}
                className="category-advantages__card"
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <div className="category-advantages__card-icon">
                  <i className={f.icon} />
                </div>
                <h5 className="category-advantages__card-title">{f.title}</h5>
                <p className="category-advantages__card-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Topics */}
        <div className="category-upcoming">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">Yaklaşan Konular</h2>
            <p className="section-header__subtitle">
              Eğitim gündemindeki en güncel konularda uzman görüşleri
            </p>
          </div>
          <div className="category-upcoming__grid">
            {upcomingTopics.map((ut, i) => (
              <div
                key={i}
                className="category-upcoming__card"
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <div className="category-upcoming__card-badge">{ut.date}</div>
                <h5 className="category-upcoming__card-topic">{ut.topic}</h5>
                <p className="category-upcoming__card-speaker">
                  <i className="ph ph-microphone-stage" /> {ut.speaker}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="category-faq">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">Sıkça Sorulan Sorular</h2>
            <p className="section-header__subtitle">
              Webinar ve etkinlikler hakkında merak ettikleriniz
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
          <div className="category-cta__inner category-cta__inner--webinar">
            <div className="category-cta__gradient" />
            <div className="category-cta__content">
              <div className="category-cta__icon">
                <i className="ph-fill ph-video-camera" />
              </div>
              <h3 className="category-cta__title">
                Gelişiminize Yatırım Yapın
              </h3>
              <p className="category-cta__desc">
                120&apos;den fazla etkinlik ile kendinizi ve kurumunuzu
                geliştirin.
              </p>
              <div className="category-cta__buttons">
                <Link
                  href="/search"
                  className="btn btn-white btn-lg rounded-pill flex-align gap-8 d-inline-flex"
                >
                  <i className="ph-bold ph-calendar-check d-flex text-lg" />
                  Tüm Etkinlikleri Gör
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
