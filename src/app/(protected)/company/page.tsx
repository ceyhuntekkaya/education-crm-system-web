"use client";
import React from "react";
import Link from "next/link";

const CompanyPage: React.FC = () => {
  return (
    <div>
      {/* Hero Section - Dashboard Giriş */}
      <section
        className="course-list-view py-40 background-img bg-img"
        data-background-image="assets/images/bg/gradient-bg.png"
      >
        <div className="side-overlay"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="border border-neutral-30 rounded-12 bg-white p-32">
                <div className="mb-24">
                  <i
                    className="ph-bold ph-buildings text-main-600"
                    style={{ fontSize: "48px" }}
                  ></i>
                </div>
                <h2 className="mb-16">Şirket Yönetim Paneli</h2>
                <p className="text-neutral-600 mb-32">
                  Kampanyalarınızı yönetin, performansınızı takip edin ve
                  işletmenizi büyütün
                </p>

                {/* Quick Access Cards */}
                <div className="row g-3">
                  <div className="col-md-6">
                    <Link
                      href="/company/campaigns"
                      className="text-decoration-none"
                    >
                      <div className="border border-neutral-30 rounded-12 bg-main-25 p-24 hover-bg-main-50 transition-all">
                        <div className="d-flex align-items-center justify-content-center mb-16">
                          <i
                            className="ph-bold ph-megaphone text-main-600"
                            style={{ fontSize: "32px" }}
                          ></i>
                        </div>
                        <h5 className="text-main-600 mb-8">
                          Kampanya Yönetimi
                        </h5>
                        <p className="text-neutral-600 mb-0 small">
                          Kampanyalarınızı oluşturun, düzenleyin ve
                          performanslarını takip edin
                        </p>
                      </div>
                    </Link>
                  </div>
                  <div className="col-md-6">
                    <div className="border border-neutral-30 rounded-12 bg-neutral-25 p-24 hover-bg-neutral-50 transition-all cursor-pointer">
                      <div className="d-flex align-items-center justify-content-center mb-16">
                        <i
                          className="ph-bold ph-chart-line text-neutral-600"
                          style={{ fontSize: "32px" }}
                        ></i>
                      </div>
                      <h5 className="text-neutral-600 mb-8">
                        Performans Analizi
                      </h5>
                      <p className="text-neutral-500 mb-0 small">
                        Detaylı raporlar ve analizlerle işletmenizi optimize
                        edin
                      </p>
                      <div className="mt-12">
                        <span className="badge bg-warning text-dark">
                          Yakında
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <span className="d-block border border-neutral-30 my-24 border-dashed" />

                {/* Welcome Message */}
                <div className="text-center">
                  <h6 className="text-neutral-700 mb-8">Hoş Geldiniz! 👋</h6>
                  <p className="text-neutral-500 mb-0">
                    Başlamak için yukarıdaki modüllerden birini seçin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyPage;
