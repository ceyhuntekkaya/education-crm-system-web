"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts";
import { Button } from "@/components/ui";

const IndividualCompanyPage = () => {
  const { user } = useAuth();

  return (
    <div className="container container--xl py-32">
      <div className="row g-4">
        <div className="col-12">
          <div className="border border-neutral-30 rounded-12 bg-white p-32 position-relative">
            <span className="badge rounded-pill bg-warning-50 text-warning-700 text-xs fw-semibold position-absolute top-0 end-0 mt-24 me-24">
              Geçici içerik
            </span>
            <div className="d-flex flex-column flex-md-row flex-between gap-4 align-items-start align-items-md-center">
              <div>
                <h1 className="text-neutral-700 fw-semibold mb-8 custom-card-title-md">
                  Hoş geldiniz, {user?.fullName || "Şirket"}
                </h1>
                <p className="text-neutral-600 mb-0">
                  Bireysel şirket panelinizden özet bilgileri takip
                  edebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Özet kartlar */}
        <div className="col-12 col-sm-6 col-lg-6">
          <div className="border border-neutral-30 rounded-12 bg-white p-32 h-100 flex-align gap-4">
            <div className="rounded-12 p-16 flex-shrink-0 bg-main-25">
              <i
                className="ph ph-users text-main-600"
                style={{ fontSize: "28px" }}
              />
            </div>
            <div>
              <p className="text-neutral-600 text-sm mb-4">Toplam Öğrenci</p>
              <h3 className="text-neutral-700 fw-semibold mb-4">342</h3>
              <span className="text-success-600 text-sm">
                <i className="ph ph-trend-up" /> %12 artış
              </span>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-6">
          <div className="border border-neutral-30 rounded-12 bg-white p-32 h-100 flex-align gap-4">
            <div className="rounded-12 p-16 flex-shrink-0 bg-primary-25">
              <i
                className="ph ph-briefcase text-primary-600"
                style={{ fontSize: "28px" }}
              />
            </div>
            <div>
              <p className="text-neutral-600 text-sm mb-4">İş İlanları</p>
              <h3 className="text-neutral-700 fw-semibold mb-4">5</h3>
              <Link
                href="/individual/company/job-postings"
                className="text-primary-600 text-sm"
              >
                <i className="ph ph-arrow-right" /> İlanları Görüntüle
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="border border-neutral-30 rounded-12 bg-white p-32">
            <h5 className="text-neutral-700 fw-semibold mb-16">Hızlı erişim</h5>
            <div className="d-flex flex-wrap gap-3">
              <Link
                href="/individual/company/job-postings"
                className="fw-medium text-primary-600"
              >
                <i className="ph ph-briefcase" /> İş İlanları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualCompanyPage;
