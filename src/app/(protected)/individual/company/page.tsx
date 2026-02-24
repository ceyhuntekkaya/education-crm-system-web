"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts";
import { useGetJobPostingsBySchool } from "./job-postings/_shared/hooks/api";
import {
  getStatusBadgeVariant,
  getStatusDisplay,
  getEmploymentTypeDisplay,
} from "./job-postings/_shared/utils";
import { Badge } from "@/components/ui";
import { formatDate } from "@/utils";
import type { JobPostingDto } from "@/types";

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

// ─── Recent Posting Row ─────────────────────────────────────────────────────
const RecentPostingRow: React.FC<{ posting: JobPostingDto }> = ({
  posting,
}) => {
  const router = useRouter();
  const badgeVariant = getStatusBadgeVariant(posting.status);

  return (
    <tr
      className="posting-row"
      onClick={() =>
        router.push(`/individual/company/job-postings/detail/${posting.id}`)
      }
    >
      <td className="py-12 px-16 align-middle">
        <div className="d-flex align-items-center gap-12">
          <div className="rounded-10 d-flex align-items-center justify-content-center bg-main-25 posting__icon">
            <i className="ph-duotone ph-briefcase text-main-600" />
          </div>
          <div>
            <p className="text-neutral-800 fw-semibold text-sm mb-0 lh-1">
              {posting.positionTitle || "—"}
            </p>
            {posting.branch && (
              <p className="text-neutral-400 text-xs mb-0 mt-4">
                {posting.branch}
              </p>
            )}
          </div>
        </div>
      </td>
      <td className="py-12 px-16 align-middle">
        <Badge variant={badgeVariant} size="sm">
          {getStatusDisplay(posting.status)}
        </Badge>
      </td>
      <td className="py-12 px-16 text-center align-middle">
        <div className="d-inline-flex align-items-center gap-4">
          <i className="ph-bold ph-users text-primary-500 posting__app-icon" />
          <span className="text-sm fw-bold text-primary-700">
            {posting.applicationCount || 0}
          </span>
        </div>
      </td>
      <td className="py-12 px-16 align-middle">
        <span className="text-xs text-neutral-600 rounded-8 px-8 py-4 d-inline-block posting__type-badge">
          {getEmploymentTypeDisplay(posting.employmentType) || "—"}
        </span>
      </td>
      <td className="py-12 px-16 align-middle">
        <span className="text-xs text-neutral-400">
          {formatDate(posting.createdAt)}
        </span>
      </td>
      <td className="py-12 px-16 align-middle text-end">
        <i className="ph ph-arrow-right row-arrow" />
      </td>
    </tr>
  );
};

// ─── Main Dashboard Page ────────────────────────────────────────────────────
const IndividualCompanyPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  const schoolId = user?.institutionAccess?.[0]?.entityId || 0;

  const { data, loading } = useGetJobPostingsBySchool(
    schoolId,
    { page: 0, size: 100, sortBy: "createdAt", sortDir: "DESC" },
    { enabled: !!schoolId },
  );

  const jobPostings = useMemo<JobPostingDto[]>(
    () => data?.data?.content || [],
    [data],
  );

  // ── Derived stats ─────────────────────────────────────────────────
  const stats = useMemo(() => {
    const total = data?.data?.totalElements ?? jobPostings.length;
    const published = jobPostings.filter(
      (j) => j.status === "PUBLISHED",
    ).length;
    const draft = jobPostings.filter((j) => j.status === "DRAFT").length;
    const closed = jobPostings.filter(
      (j) => j.status === "CLOSED" || j.status === "COMPLETED",
    ).length;
    const totalApplications = jobPostings.reduce(
      (acc, j) => acc + (j.applicationCount || 0),
      0,
    );
    return { total, published, draft, closed, totalApplications };
  }, [jobPostings, data]);

  // ── Recent postings ───────────────────────────────────────────────
  const recentPostings = useMemo(
    () =>
      [...jobPostings]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 6),
    [jobPostings],
  );

  const campusName =
    user?.campus?.name || user?.institutionAccess?.[0]?.entityName || null;

  const greeting = user?.firstName || user?.fullName?.split(" ")[0] || "Şirket";

  return (
    <>
      <div className="container container--xl py-32">
        <div className="row g-4">
          {/* ══════════════════════════════════════════════════════════════
              WELCOME HERO
          ══════════════════════════════════════════════════════════════ */}
          <div className="col-12">
            <div className="rounded-16 overflow-hidden position-relative dash-hero">
              {/* subtle dot pattern */}
              <div className="position-absolute top-0 start-0 w-100 h-100 dash-hero__pattern" />
              {/* decorative icon */}
              <div className="position-absolute top-0 end-0 h-100 d-flex align-items-center dash-hero__decor">
                <i className="ph-duotone ph-buildings" />
              </div>

              <div className="p-32 p-md-40 position-relative">
                <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-24">
                  <div>
                    {campusName && (
                      <div className="d-inline-flex align-items-center gap-6 mb-10 rounded-8 px-10 py-4 dash-hero__campus-badge">
                        <i className="ph ph-map-pin" />
                        <span>{campusName}</span>
                      </div>
                    )}
                    <h1 className="text-white fw-bold mb-6 dash-hero__title">
                      Hoş geldiniz, {greeting} 👋
                    </h1>
                    <p className="mb-0 dash-hero__subtitle">
                      İnsan kaynakları panelinizden ilan ve başvurularınızı
                      kolayca yönetin.
                    </p>
                  </div>

                  <div className="d-flex gap-10 flex-wrap flex-shrink-0">
                    <button
                      className="hero-btn-primary"
                      onClick={() =>
                        router.push(
                          "/individual/company/job-postings/add-edit/new",
                        )
                      }
                    >
                      <i className="ph-bold ph-plus dash-hero__btn-icon" />
                      Yeni İlan Oluştur
                    </button>
                    <button
                      className="hero-btn-secondary"
                      onClick={() =>
                        router.push("/individual/company/job-postings")
                      }
                    >
                      <i className="ph ph-briefcase dash-hero__btn-icon" />
                      Tüm İlanlar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              STAT CARDS
          ══════════════════════════════════════════════════════════════ */}
          <div className="col-6 col-lg-3">
            <StatCard
              icon="ph-briefcase"
              iconBg="bg-main-25"
              iconColor="text-main-600"
              label="Toplam İlan"
              value={stats.total}
              subLabel="Tüm ilanlar"
              subIcon="ph-list"
              loading={loading}
              href="/individual/company/job-postings"
            />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard
              icon="ph-check-circle"
              iconBg="bg-success-50"
              iconColor="text-success-600"
              label="Aktif İlan"
              value={stats.published}
              subLabel="Şu an yayında"
              subLabelColor="text-success-600"
              subIcon="ph-dot-outline-fill"
              loading={loading}
              href="/individual/company/job-postings"
            />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard
              icon="ph-pencil-line"
              iconBg="bg-warning-50"
              iconColor="text-warning-600"
              label="Taslak İlan"
              value={stats.draft}
              subLabel="Henüz yayınlanmadı"
              subLabelColor="text-warning-600"
              subIcon="ph-clock"
              loading={loading}
              href="/individual/company/job-postings"
            />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard
              icon="ph-users"
              iconBg="bg-primary-50"
              iconColor="text-primary-600"
              label="Toplam Başvuru"
              value={stats.totalApplications}
              subLabel="Tüm ilanların toplamı"
              subIcon="ph-trend-up"
              loading={loading}
            />
          </div>

          {/* ══════════════════════════════════════════════════════════════
              RECENT JOB POSTINGS TABLE
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
                      Son İlanlar
                    </h6>
                    <p className="text-neutral-400 text-xs mb-0 mt-1">
                      En son oluşturulan ilanlarınız
                    </p>
                  </div>
                </div>
                <Link
                  href="/individual/company/job-postings"
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
              ) : recentPostings.length === 0 ? (
                <div className="p-48 text-center">
                  <div className="rounded-16 d-inline-flex align-items-center justify-content-center mb-16 bg-main-25 dash-empty__icon-wrap">
                    <i className="ph-duotone ph-briefcase text-main-600" />
                  </div>
                  <p className="text-neutral-600 fw-medium text-sm mb-4">
                    Henüz ilan oluşturmadınız
                  </p>
                  <p className="text-neutral-400 text-xs mb-20">
                    İlk ilanınızı oluşturmak için butona tıklayın.
                  </p>
                  <button
                    className="hero-btn-primary hero-btn-primary--filled"
                    onClick={() =>
                      router.push(
                        "/individual/company/job-postings/add-edit/new",
                      )
                    }
                  >
                    <i className="ph-bold ph-plus dash-hero__btn-icon" />
                    İlk İlanı Oluştur
                  </button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table mb-0 dash-table">
                    <thead>
                      <tr>
                        <th>Pozisyon</th>
                        <th>Durum</th>
                        <th className="text-center">Başvuru</th>
                        <th>Çalışma Tipi</th>
                        <th>Tarih</th>
                        <th style={{ width: 36 }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPostings.map((posting) => (
                        <RecentPostingRow key={posting.id} posting={posting} />
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
                      icon: "ph-plus-circle",
                      label: "Yeni İlan Oluştur",
                      desc: "Yeni bir iş ilanı ekle",
                      iconColor: "text-main-600",
                      iconBg: "bg-main-25",
                      href: "/individual/company/job-postings/add-edit/new",
                    },
                    {
                      icon: "ph-briefcase",
                      label: "İlanlarımı Görüntüle",
                      desc: "Tüm ilanları listele",
                      iconColor: "text-primary-600",
                      iconBg: "bg-primary-50",
                      href: "/individual/company/job-postings",
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

            {/* Status Breakdown */}
            <div className="dash-panel flex-fill">
              <div className="dash-panel-header">
                <div className="d-flex align-items-center gap-12">
                  <div className="rounded-10 d-flex align-items-center justify-content-center bg-info-50 dash-panel-icon">
                    <i className="ph-duotone ph-chart-pie text-info-600" />
                  </div>
                  <div>
                    <h6 className="text-neutral-800 fw-semibold mb-0 dash-panel-title">
                      İlan Durumu
                    </h6>
                    <p className="text-neutral-400 text-xs mb-0 mt-1">
                      Duruma göre dağılım
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-20 d-flex flex-column gap-16">
                {loading ? (
                  [1, 2, 3].map((i) => (
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
                          label: "Yayında",
                          icon: "ph-check-circle",
                          count: stats.published,
                          barColor: "#16A34A",
                          textColor: "#15803D",
                          trackColor: "rgba(22,163,74,0.10)",
                        },
                        {
                          label: "Taslak",
                          icon: "ph-pencil-line",
                          count: stats.draft,
                          barColor: "#F59E0B",
                          textColor: "#D97706",
                          trackColor: "rgba(245,158,11,0.10)",
                        },
                        {
                          label: "Kapalı / Tamamlandı",
                          icon: "ph-archive",
                          count: stats.closed,
                          barColor: "#64748B",
                          textColor: "#475569",
                          trackColor: "rgba(100,116,139,0.10)",
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
                          Henüz ilan bulunmuyor
                        </p>
                      </div>
                    )}

                    {stats.total > 0 && (
                      <div className="d-flex align-items-center justify-content-between rounded-10 px-14 py-10 mt-4 dash-summary-row">
                        <span className="text-xs fw-medium text-neutral-500">
                          Toplam İlan
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

export default IndividualCompanyPage;
