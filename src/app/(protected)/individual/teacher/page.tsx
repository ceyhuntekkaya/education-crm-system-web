"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts";
import { Button } from "@/components/ui";

const TeacherPage = () => {
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
                  Hoş geldiniz, {user?.fullName || "Öğretmen"}
                </h1>
                <p className="text-neutral-600 mb-0">
                  Öğretmen panelinizden başvurularınızı ve iş ilanlarını takip
                  edebilirsiniz.
                </p>
              </div>
              <Button
                variant="inline"
                size="xxs"
                leftIcon="ph-file-text"
                href="/individual/teacher/applications"
              >
                Başvurularım
              </Button>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6">
          <div className="border border-neutral-30 rounded-12 bg-white p-32 h-100 flex-align gap-4">
            <div className="rounded-12 p-16 flex-shrink-0 bg-main-25">
              <i
                className="ph ph-file-text text-main-600"
                style={{ fontSize: "28px" }}
              />
            </div>
            <div>
              <p className="text-neutral-600 text-sm mb-4">Toplam Başvuru</p>
              <h3 className="text-neutral-700 fw-semibold mb-4">8</h3>
              <span className="text-success-600 text-sm">
                <i className="ph ph-trend-up" /> 3 yeni
              </span>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6">
          <div className="border border-neutral-30 rounded-12 bg-white p-32 h-100 flex-align gap-4">
            <div className="rounded-12 p-16 flex-shrink-0 bg-main-25">
              <i
                className="ph ph-briefcase text-main-600"
                style={{ fontSize: "28px" }}
              />
            </div>
            <div>
              <p className="text-neutral-600 text-sm mb-4">Aktif İlanlar</p>
              <h3 className="text-neutral-700 fw-semibold mb-4">42</h3>
              <span className="text-info-600 text-sm">
                <i className="ph ph-clock" /> 15 yeni ilan
              </span>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="border border-neutral-30 rounded-12 bg-white p-32">
            <h5 className="text-neutral-700 fw-semibold mb-16">Hızlı erişim</h5>
            <p className="text-neutral-600 text-sm mb-0">
              İş ilanlarını incelemek için{" "}
              <Link
                href="/individual/teacher/job-postings"
                className="fw-medium text-main-600"
              >
                İş İlanları
              </Link>{" "}
              sayfasını, başvurularınızı takip etmek için{" "}
              <Link
                href="/individual/teacher/applications"
                className="fw-medium text-main-600"
              >
                Başvurularım
              </Link>{" "}
              sayfasını kullanın.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherPage;
