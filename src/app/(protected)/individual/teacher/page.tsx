"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts";
import { Badge } from "@/components/ui";
import { formatDate } from "@/utils";
import { useGetTeacherProfileByUserId } from "./teacher-profile/_shared/hooks/api";
import { useGetApplicationsByTeacher } from "./applications/_shared/hooks/api";
import { useGetAllJobPostings } from "./job-postings/_shared/hooks/api";
import {
  getApplicationStatusBadgeVariant,
  getApplicationStatusDisplay,
  getApplicationStatusIcon,
  getEmploymentTypeDisplay,
} from "./applications/_shared/utils";
import type { ApplicationDto } from "./applications/_shared/types";

// ─── Stat Card ─────────────────────────────────────────────────────────────
interface StatCardProps {
  icon: string;
  iconBg: string;
  iconColor: string;
  label: string;
  value: number | string;
  subLabel?: string;
  subLabelColor?: string;
  subIcon?: string;
  loading?: boolean;
  href?: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  subLabel,
  subLabelColor = "text-neutral-500",
  subIcon,
  loading,
  href,
  onClick,
}) => {
  const isClickable = !!(href || onClick);

  const inner = (
    <div
      className={`bg-white rounded-16 p-24 h-100 d-flex flex-column gap-16 stat-card-inner${isClickable ? " cursor-pointer" : ""}`}
    >
      <div className="d-flex align-items-center justify-content-between">
        <div
          className={`rounded-12 d-flex align-items-center justify-content-center stat-card__icon ${iconBg}`}
        >
          <i className={`ph-duotone ${icon} ${iconColor}`} />
        </div>
        {isClickable && <i className="ph ph-arrow-right stat-card-arrow" />}
      </div>
      <div>
        <p className="text-neutral-500 fw-semibold mb-8 stat-card__label">
          {label}
        </p>
        {loading ? (
          <div
            className="rounded-8 skeleton-loader"
            style={{ height: 30, width: 56 }}
          />
        ) : (
          <h3 className="text-neutral-800 fw-bold mb-4 lh-1 stat-card__value">
            {value}
          </h3>
        )}
        {subLabel && (
          <span
            className={`text-xs ${subLabelColor} d-flex align-items-center gap-4`}
          >
            {subIcon && <i className={`ph ${subIcon} stat-card__sub-icon`} />}
            {subLabel}
          </span>
        )}
      </div>
    </div>
  );

  if (href)
    return (
      <Link
        href={href}
        className="text-decoration-none d-block h-100 stat-card-link"
      >
        {inner}
      </Link>
    );
  if (onClick)
    return (
      <button
        onClick={onClick}
        className="d-block w-100 h-100 p-0 bg-transparent border-0 text-start stat-card-link"
      >
        {inner}
      </button>
    );
  return inner;
};

// ─── Recent Application Row ─────────────────────────────────────────────────
const RecentApplicationRow: React.FC<{ application: ApplicationDto }> = ({
  application,
}) => {
  const router = useRouter();
  const badgeVariant = getApplicationStatusBadgeVariant(application.status);

  return (
    <tr
      className="posting-row"
      onClick={() =>
        router.push(`/individual/teacher/applications/detail/${application.id}`)
      }
    >
      <td className="py-12 px-16 align-middle">
        <div className="d-flex align-items-center gap-12">
          <div className="rounded-10 d-flex align-items-center justify-content-center bg-main-25 posting__icon">
            <i className="ph-duotone ph-file-text text-main-600" />
          </div>
          <div>
            <p className="text-neutral-800 fw-semibold text-sm mb-0 lh-1">
              {application.jobPosting?.positionTitle || "—"}
            </p>
            {application.jobPosting?.branch && (
              <p className="text-neutral-400 text-xs mb-0 mt-4">
                {application.jobPosting.branch}
              </p>
            )}
          </div>
        </div>
      </td>
      <td className="py-12 px-16 align-middle">
        <Badge variant={badgeVariant} size="sm">
          {getApplicationStatusDisplay(application.status)}
        </Badge>
      </td>
      <td className="py-12 px-16 align-middle">
        <span className="text-xs text-neutral-600 rounded-8 px-8 py-4 d-inline-block posting__type-badge">
          {getEmploymentTypeDisplay(application.jobPosting?.employmentType) ||
            "—"}
        </span>
      </td>
      <td className="py-12 px-16 align-middle">
        <span className="text-xs text-neutral-400">
          {application.jobPosting?.campus?.name || "—"}
        </span>
      </td>
      <td className="py-12 px-16 align-middle">
        <span className="text-xs text-neutral-400">
          {formatDate(application.createdAt)}
        </span>
      </td>
      <td className="py-12 px-16 align-middle text-end">
        <i className="ph ph-arrow-right row-arrow" />
      </td>
    </tr>
  );
};

// ─── No Profile Alert ──────────────────────────────────────────────────────
const NoProfileBanner: React.FC = () => {
  const router = useRouter();
  return (
    <div className="col-12">
      <div className="rounded-12 px-20 py-14 d-flex align-items-center gap-16 bg-warning-50 border border-warning-200">
        <i
          className="ph-duotone ph-warning text-warning-600 flex-shrink-0"
          style={{ fontSize: 22 }}
        />
        <div className="flex-grow-1">
          <p className="text-warning-800 fw-semibold text-sm mb-0">
            Profiliniz henüz oluşturulmamış.
          </p>
          <p className="text-warning-700 text-xs mb-0 mt-2">
            İş ilanlarına başvurabilmek için önce bir öğretmen profili
            oluşturmanız gerekmektedir.
          </p>
        </div>
        <button
          className="hero-btn-primary flex-shrink-0"
          style={{ whiteSpace: "nowrap" }}
          onClick={() =>
            router.push("/individual/teacher/teacher-profile/add-edit/new")
          }
        >
          <i className="ph-bold ph-plus dash-hero__btn-icon" />
          Profil Oluştur
        </button>
      </div>
    </div>
  );
};

// ─── Main Dashboard Page ────────────────────────────────────────────────────
const TeacherPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  // ── Profile ───────────────────────────────────────────────────────
  const { data: profileData, loading: profileLoading } =
    useGetTeacherProfileByUserId(user?.id || 0, { enabled: !!user?.id });
  const myProfile = profileData?.data || null;

  // ── Applications ──────────────────────────────────────────────────
  const { data: applicationsData, loading: applicationsLoading } =
    useGetApplicationsByTeacher(
      myProfile?.id || 0,
      { page: 0, size: 100, sortBy: "createdAt", sortDir: "DESC" },
      { enabled: !!myProfile?.id },
    );

  const applications = useMemo<ApplicationDto[]>(
    () => applicationsData?.data?.content || [],
    [applicationsData],
  );

  // ── Available job postings ────────────────────────────────────────
  const { data: jobPostingsData, loading: jobPostingsLoading } =
    useGetAllJobPostings(
      { page: 0, size: 1, sortBy: "createdAt", sortDir: "DESC" },
      { enabled: true },
    );

  const activeJobCount = jobPostingsData?.data?.totalElements ?? 0;

  // ── Derived stats ─────────────────────────────────────────────────
  const stats = useMemo(() => {
    const total = applicationsData?.data?.totalElements ?? applications.length;
    const pending = applications.filter(
      (a) => a.status === "RECEIVED" || a.status === "UNDER_REVIEW",
    ).length;
    const interviewing = applications.filter(
      (a) => a.status === "INTERVIEW_SCHEDULED",
    ).length;
    const accepted = applications.filter(
      (a) => a.status === "ACCEPTED" || a.status === "OFFER_MADE",
    ).length;
    const rejected = applications.filter((a) => a.status === "REJECTED").length;
    return { total, pending, interviewing, accepted, rejected };
  }, [applications, applicationsData]);

  // ── Recent applications ───────────────────────────────────────────
  const recentApplications = useMemo(
    () =>
      [...applications]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 6),
    [applications],
  );

  const loading = profileLoading || applicationsLoading;
  const greeting =
    user?.firstName || user?.fullName?.split(" ")[0] || "Öğretmen";

  return (
    <>
      <div className="container container--xl py-32">
        <div className="row g-4">
          {/* ══════════════════════════════════════════════════════════════
              WELCOME HERO
          ══════════════════════════════════════════════════════════════ */}
          <div className="col-12">
            <div className="rounded-16 overflow-hidden position-relative dash-hero">
              <div className="position-absolute top-0 start-0 w-100 h-100 dash-hero__pattern" />
              <div className="position-absolute top-0 end-0 h-100 d-flex align-items-center dash-hero__decor">
                <i className="ph-duotone ph-chalkboard-teacher" />
              </div>

              <div className="p-32 p-md-40 position-relative">
                <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-24">
                  <div>
                    {myProfile && (
                      <div className="d-inline-flex align-items-center gap-6 mb-10 rounded-8 px-10 py-4 dash-hero__campus-badge">
                        <i className="ph ph-graduation-cap" />
                        <span>{myProfile.branch || "Öğretmen"}</span>
                      </div>
                    )}
                    <h1 className="text-white fw-bold mb-6 dash-hero__title">
                      Hoş geldiniz, {greeting} 👋
                    </h1>
                    <p className="mb-0 dash-hero__subtitle">
                      Öğretmen panelinizden başvurularınızı ve iş ilanlarını
                      kolayca takip edin.
                    </p>
                  </div>

                  <div className="d-flex gap-10 flex-wrap flex-shrink-0">
                    <button
                      className="hero-btn-primary"
                      onClick={() =>
                        router.push("/individual/teacher/job-postings")
                      }
                    >
                      <i className="ph-bold ph-briefcase dash-hero__btn-icon" />
                      İş İlanları
                    </button>
                    <button
                      className="hero-btn-secondary"
                      onClick={() =>
                        router.push("/individual/teacher/applications")
                      }
                    >
                      <i className="ph ph-file-text dash-hero__btn-icon" />
                      Başvurularım
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              NO PROFILE WARNING
          ══════════════════════════════════════════════════════════════ */}
          {!profileLoading && !myProfile && <NoProfileBanner />}

          {/* ══════════════════════════════════════════════════════════════
              STAT CARDS
          ══════════════════════════════════════════════════════════════ */}
          <div className="col-6 col-lg-3">
            <StatCard
              icon="ph-file-text"
              iconBg="bg-main-25"
              iconColor="text-main-600"
              label="Toplam Başvuru"
              value={stats.total}
              subLabel="Tüm başvurularım"
              subIcon="ph-list"
              loading={loading}
              href="/individual/teacher/applications"
            />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard
              icon="ph-eye"
              iconBg="bg-warning-50"
              iconColor="text-warning-600"
              label="İncelemede"
              value={stats.pending}
              subLabel="Bekleyen başvurular"
              subLabelColor="text-warning-600"
              subIcon="ph-clock"
              loading={loading}
              href="/individual/teacher/applications"
            />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard
              icon="ph-check-circle"
              iconBg="bg-success-50"
              iconColor="text-success-600"
              label="Kabul Edilen"
              value={stats.accepted}
              subLabel="Teklif / kabul"
              subLabelColor="text-success-600"
              subIcon="ph-trend-up"
              loading={loading}
              href="/individual/teacher/applications"
            />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard
              icon="ph-briefcase"
              iconBg="bg-primary-50"
              iconColor="text-primary-600"
              label="Açık İlanlar"
              value={activeJobCount}
              subLabel="Başvurulabilir ilanlar"
              subIcon="ph-arrow-right"
              loading={jobPostingsLoading}
              href="/individual/teacher/job-postings"
            />
          </div>

          {/* ══════════════════════════════════════════════════════════════
              RECENT APPLICATIONS TABLE
          ══════════════════════════════════════════════════════════════ */}
          <div className="col-12 col-xl-8">
            <div className="dash-panel h-100">
              {/* Header */}
              <div className="dash-panel-header">
                <div className="d-flex align-items-center gap-12">
                  <div className="rounded-10 d-flex align-items-center justify-content-center bg-main-25 dash-panel-icon">
                    <i className="ph-duotone ph-clock-counter-clockwise text-main-600" />
                  </div>
                  <div>
                    <h6 className="text-neutral-800 fw-semibold mb-0 dash-panel-title">
                      Son Başvurular
                    </h6>
                    <p className="text-neutral-400 text-xs mb-0 mt-1">
                      En son yaptığınız başvurular
                    </p>
                  </div>
                </div>
                <Link
                  href="/individual/teacher/applications"
                  className="view-all-link"
                >
                  Tümünü Gör <i className="ph ph-arrow-right" />
                </Link>
              </div>

              {/* Body */}
              {loading ? (
                <div className="p-24 d-flex flex-column gap-12">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="rounded-10 skeleton-loader"
                      style={{ height: 48 }}
                    />
                  ))}
                </div>
              ) : recentApplications.length === 0 ? (
                <div className="p-48 text-center">
                  <div className="rounded-16 d-inline-flex align-items-center justify-content-center mb-16 bg-main-25 dash-empty__icon-wrap">
                    <i className="ph-duotone ph-file-text text-main-600" />
                  </div>
                  <p className="text-neutral-600 fw-medium text-sm mb-4">
                    Henüz başvuru yapmadınız
                  </p>
                  <p className="text-neutral-400 text-xs mb-20">
                    İş ilanlarını inceleyerek ilk başvurunuzu yapabilirsiniz.
                  </p>
                  <button
                    className="hero-btn-primary hero-btn-primary--filled"
                    onClick={() =>
                      router.push("/individual/teacher/job-postings")
                    }
                  >
                    <i className="ph-bold ph-briefcase dash-hero__btn-icon" />
                    İş İlanlarına Bak
                  </button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table mb-0 dash-table">
                    <thead>
                      <tr>
                        <th>Pozisyon</th>
                        <th>Durum</th>
                        <th>Çalışma Tipi</th>
                        <th>Kurum</th>
                        <th>Tarih</th>
                        <th style={{ width: 36 }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentApplications.map((application) => (
                        <RecentApplicationRow
                          key={application.id}
                          application={application}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              SIDEBAR
          ══════════════════════════════════════════════════════════════ */}
          <div className="col-12 col-xl-4 d-flex flex-column gap-24">
            {/* Quick Actions */}
            <div className="dash-panel">
              <div className="dash-panel-header">
                <div className="d-flex align-items-center gap-12">
                  <div className="rounded-10 d-flex align-items-center justify-content-center bg-primary-50 dash-panel-icon">
                    <i className="ph-duotone ph-lightning text-primary-600" />
                  </div>
                  <div>
                    <h6 className="text-neutral-800 fw-semibold mb-0 dash-panel-title">
                      Hızlı İşlemler
                    </h6>
                    <p className="text-neutral-400 text-xs mb-0 mt-1">
                      Sık kullanılan işlemler
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-16 d-flex flex-column gap-10">
                {(
                  [
                    {
                      icon: "ph-briefcase",
                      label: "İş İlanlarını İncele",
                      desc: "Tüm açık ilanları gör",
                      iconColor: "text-main-600",
                      iconBg: "bg-main-25",
                      href: "/individual/teacher/job-postings",
                    },
                    {
                      icon: "ph-file-text",
                      label: "Başvurularım",
                      desc: "Tüm başvurularını listele",
                      iconColor: "text-primary-600",
                      iconBg: "bg-primary-50",
                      href: "/individual/teacher/applications",
                    },
                    {
                      icon: "ph-user-circle",
                      label: "Öğretmen Profilim",
                      desc: "CV ve profil bilgilerini yönet",
                      iconColor: "text-info-600",
                      iconBg: "bg-info-50",
                      href: "/individual/teacher/teacher-profile",
                    },
                  ] as const
                ).map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="quick-action-link"
                  >
                    <div
                      className={`rounded-10 d-flex align-items-center justify-content-center quick-action__icon ${action.iconBg}`}
                    >
                      <i
                        className={`ph-duotone ${action.icon} ${action.iconColor}`}
                      />
                    </div>
                    <div className="flex-grow-1 min-width-0">
                      <p className="text-neutral-800 fw-semibold text-sm mb-0 lh-1">
                        {action.label}
                      </p>
                      <p className="text-neutral-400 text-xs mb-0 mt-4">
                        {action.desc}
                      </p>
                    </div>
                    <i className="ph ph-arrow-right quick-action__arrow" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Application Status Breakdown */}
            <div className="dash-panel flex-fill">
              <div className="dash-panel-header">
                <div className="d-flex align-items-center gap-12">
                  <div className="rounded-10 d-flex align-items-center justify-content-center bg-info-50 dash-panel-icon">
                    <i className="ph-duotone ph-chart-pie text-info-600" />
                  </div>
                  <div>
                    <h6 className="text-neutral-800 fw-semibold mb-0 dash-panel-title">
                      Başvuru Durumu
                    </h6>
                    <p className="text-neutral-400 text-xs mb-0 mt-1">
                      Duruma göre dağılım
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-20 d-flex flex-column gap-16">
                {loading ? (
                  [1, 2, 3, 4].map((i) => (
                    <div key={i} className="d-flex flex-column gap-8">
                      <div
                        className="skeleton-loader rounded-6"
                        style={{ height: 14, width: "55%" }}
                      />
                      <div
                        className="skeleton-loader rounded-8"
                        style={{ height: 7 }}
                      />
                    </div>
                  ))
                ) : (
                  <>
                    {(
                      [
                        {
                          label: "İncelemede",
                          icon: "ph-eye",
                          count: stats.pending,
                          barColor: "#F59E0B",
                          textColor: "#D97706",
                          trackColor: "rgba(245,158,11,0.10)",
                        },
                        {
                          label: "Mülakat Planlandı",
                          icon: "ph-calendar-check",
                          count: stats.interviewing,
                          barColor: "#6366F1",
                          textColor: "#4F46E5",
                          trackColor: "rgba(99,102,241,0.10)",
                        },
                        {
                          label: "Kabul / Teklif",
                          icon: "ph-check-circle",
                          count: stats.accepted,
                          barColor: "#16A34A",
                          textColor: "#15803D",
                          trackColor: "rgba(22,163,74,0.10)",
                        },
                        {
                          label: "Reddedildi",
                          icon: "ph-x-circle",
                          count: stats.rejected,
                          barColor: "#DC2626",
                          textColor: "#B91C1C",
                          trackColor: "rgba(220,38,38,0.10)",
                        },
                      ] as const
                    ).map((row) => {
                      const pct =
                        stats.total > 0
                          ? Math.round((row.count / stats.total) * 100)
                          : 0;
                      return (
                        <div key={row.label}>
                          <div className="d-flex align-items-center justify-content-between mb-8">
                            <div className="d-flex align-items-center gap-6">
                              <i
                                className={`ph-bold ${row.icon} status-bar__icon`}
                                style={{ color: row.barColor }}
                              />
                              <span className="text-xs fw-semibold text-neutral-600">
                                {row.label}
                              </span>
                            </div>
                            <div className="d-flex align-items-center gap-8">
                              <span
                                className="text-xs fw-bold"
                                style={{ color: row.textColor }}
                              >
                                {row.count}
                              </span>
                              <span
                                className="text-xs fw-semibold rounded-6 px-6 py-2 status-bar__count-badge"
                                style={{
                                  background: row.trackColor,
                                  color: row.textColor,
                                }}
                              >
                                {pct}%
                              </span>
                            </div>
                          </div>
                          <div
                            className="rounded-8 overflow-hidden status-bar__track"
                            style={{ background: row.trackColor }}
                          >
                            <div
                              className="status-bar__fill"
                              style={{
                                width: `${pct}%`,
                                background: row.barColor,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}

                    {stats.total === 0 && (
                      <div className="text-center py-16">
                        <i className="ph-duotone ph-chart-pie text-neutral-300 mb-8 d-block dash-empty__chart-icon" />
                        <p className="text-neutral-400 text-xs mb-0">
                          Henüz başvuru bulunmuyor
                        </p>
                      </div>
                    )}

                    {stats.total > 0 && (
                      <div className="d-flex align-items-center justify-content-between rounded-10 px-14 py-10 mt-4 dash-summary-row">
                        <span className="text-xs fw-medium text-neutral-500">
                          Toplam Başvuru
                        </span>
                        <span className="text-sm fw-bold text-neutral-700">
                          {stats.total}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          {/* end sidebar */}
        </div>
      </div>
    </>
  );
};

export default TeacherPage;
