"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts";
import { Badge } from "@/components/ui";
import { formatDate } from "@/utils";
import { useGetEvents } from "./events/_shared/hooks/api";
import { useGetOrganizers } from "./organizers/_shared/hooks/api";
import {
  getEventTypeBadgeVariant,
  getEventTypeDisplay,
  getDeliveryFormatDisplay,
} from "./events/_shared/utils";
import type { EventDto } from "@/types";
import type { EventStatus } from "@/types/dto/webinar/EventDto";

// ─── Stat Card ──────────────────────────────────────────────────────────────
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
      className={`bg-white rounded-16 p-20 h-100 d-flex flex-column gap-12 stat-card-inner${isClickable ? " cursor-pointer" : ""}`}
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

// ─── Recent Event Row ────────────────────────────────────────────────────────
const RecentEventRow: React.FC<{ event: EventDto }> = ({ event }) => {
  const router = useRouter();

  const getStatusBadgeVariant = (
    status: EventStatus,
  ): "success" | "warning" | "secondary" | "danger" => {
    switch (status) {
      case "PUBLISHED":
        return "success";
      case "DRAFT":
        return "warning";
      case "COMPLETED":
        return "secondary";
      case "CANCELLED":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getStatusDisplay = (status: EventStatus): string => {
    switch (status) {
      case "PUBLISHED":
        return "Yayında";
      case "DRAFT":
        return "Taslak";
      case "COMPLETED":
        return "Tamamlandı";
      case "CANCELLED":
        return "İptal";
      default:
        return "Bilinmiyor";
    }
  };

  return (
    <tr
      className="posting-row"
      onClick={() =>
        router.push(`/individual/instructor/events/detail/${event.id}`)
      }
    >
      <td className="py-12 px-16 align-middle">
        <div className="d-flex align-items-center gap-12">
          <div className="rounded-10 d-flex align-items-center justify-content-center bg-main-25 posting__icon">
            <i className="ph-duotone ph-calendar-star text-main-600" />
          </div>
          <div>
            <p className="text-neutral-800 fw-semibold text-sm mb-0 lh-1 dash-table__title">
              {event.title}
            </p>
            {event.organizer?.name && (
              <p className="text-neutral-400 text-xs mb-0 mt-4">
                {event.organizer.name}
              </p>
            )}
          </div>
        </div>
      </td>
      <td className="py-12 px-16 align-middle">
        <Badge variant={getStatusBadgeVariant(event.status)} size="sm">
          {getStatusDisplay(event.status)}
        </Badge>
      </td>
      <td className="py-12 px-16 align-middle">
        <Badge variant={getEventTypeBadgeVariant(event.eventType)} size="sm">
          {getEventTypeDisplay(event.eventType)}
        </Badge>
      </td>
      <td className="py-12 px-16 align-middle">
        <span className="text-xs text-neutral-600 rounded-8 px-8 py-4 d-inline-block posting__type-badge">
          {getDeliveryFormatDisplay(event.deliveryFormat)}
        </span>
      </td>
      <td className="py-12 px-16 align-middle">
        <div className="d-inline-flex align-items-center gap-4">
          <i className="ph-bold ph-users text-primary-500 posting__app-icon" />
          <span className="text-sm fw-bold text-primary-700">
            {event.registrationCount ?? 0}
          </span>
        </div>
      </td>
      <td className="py-12 px-16 align-middle">
        <span className="text-xs text-neutral-400">
          {formatDate(event.createdAt)}
        </span>
      </td>
      <td className="py-12 px-16 align-middle text-end">
        <i className="ph ph-arrow-right row-arrow" />
      </td>
    </tr>
  );
};

// ─── Main Dashboard Page ─────────────────────────────────────────────────────
const InstructorPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  // ── Events ────────────────────────────────────────────────────────
  const { data: eventsData, loading: eventsLoading } = useGetEvents(
    { page: 0, size: 100, sortBy: "createdAt", sortDir: "DESC" },
    { enabled: true },
  );

  const events = useMemo<EventDto[]>(
    () => eventsData?.data?.content || [],
    [eventsData],
  );

  // ── Organizers ────────────────────────────────────────────────────
  const { data: organizersData, loading: organizersLoading } = useGetOrganizers(
    { page: 0, size: 100, sortBy: "createdAt", sortDir: "DESC" },
    { enabled: true },
  );

  const organizers = useMemo(
    () => organizersData?.data?.content || [],
    [organizersData],
  );

  // ── Derived stats ─────────────────────────────────────────────────
  const stats = useMemo(() => {
    const totalEvents = eventsData?.data?.totalElements ?? events.length;
    const published = events.filter((e) => e.status === "PUBLISHED").length;
    const draft = events.filter((e) => e.status === "DRAFT").length;
    const completed = events.filter((e) => e.status === "COMPLETED").length;
    const cancelled = events.filter((e) => e.status === "CANCELLED").length;
    const totalOrganizers =
      organizersData?.data?.totalElements ?? organizers.length;
    const activeOrganizers = organizers.filter((o) => o.isActive).length;
    const totalRegistrations = events.reduce(
      (acc, e) => acc + (e.registrationCount ?? 0),
      0,
    );
    return {
      totalEvents,
      published,
      draft,
      completed,
      cancelled,
      totalOrganizers,
      activeOrganizers,
      totalRegistrations,
    };
  }, [events, eventsData, organizers, organizersData]);

  // ── Recent events ─────────────────────────────────────────────────
  const recentEvents = useMemo(
    () =>
      [...events]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 6),
    [events],
  );

  const loading = eventsLoading;
  const greeting =
    user?.firstName || user?.fullName?.split(" ")[0] || "Eğitmen";

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
                    <h1 className="text-white fw-bold mb-6 dash-hero__title">
                      Hoş geldiniz, {greeting} 👋
                    </h1>
                    <p className="mb-0 dash-hero__subtitle">
                      Eğitmen panelinizden etkinlik ve organizatörlerinizi
                      kolayca yönetin.
                    </p>
                  </div>
                  <div className="d-flex gap-10 flex-wrap flex-shrink-0">
                    <button
                      className="hero-btn-primary"
                      onClick={() =>
                        router.push(
                          "/individual/instructor/events/add-edit/new",
                        )
                      }
                    >
                      <i className="ph-bold ph-plus dash-hero__btn-icon" />
                      Yeni Etkinlik
                    </button>
                    <button
                      className="hero-btn-secondary"
                      onClick={() =>
                        router.push("/individual/instructor/events")
                      }
                    >
                      <i className="ph ph-calendar-star dash-hero__btn-icon" />
                      Tüm Etkinlikler
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
              icon="ph-calendar-star"
              iconBg="bg-main-25"
              iconColor="text-main-600"
              label="Toplam Etkinlik"
              value={stats.totalEvents}
              subLabel="Tüm etkinlikler"
              subIcon="ph-list"
              loading={loading}
              href="/individual/instructor/events"
            />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard
              icon="ph-check-circle"
              iconBg="bg-success-50"
              iconColor="text-success-600"
              label="Yayında"
              value={stats.published}
              subLabel="Aktif etkinlikler"
              subLabelColor="text-success-600"
              subIcon="ph-dot-outline-fill"
              loading={loading}
              href="/individual/instructor/events"
            />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard
              icon="ph-buildings"
              iconBg="bg-primary-50"
              iconColor="text-primary-600"
              label="Organizatör"
              value={stats.totalOrganizers}
              subLabel={`${stats.activeOrganizers} aktif`}
              subIcon="ph-buildings"
              loading={organizersLoading}
              href="/individual/instructor/organizers"
            />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard
              icon="ph-users"
              iconBg="bg-info-50"
              iconColor="text-info-600"
              label="Toplam Kayıt"
              value={stats.totalRegistrations}
              subLabel="Tüm etkinliklerin toplamı"
              subIcon="ph-trend-up"
              loading={loading}
            />
          </div>

          {/* ══════════════════════════════════════════════════════════════
              RECENT EVENTS TABLE
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
                      Son Etkinlikler
                    </h6>
                    <p className="text-neutral-400 text-xs mb-0 mt-1">
                      En son oluşturulan etkinlikleriniz
                    </p>
                  </div>
                </div>
                <Link
                  href="/individual/instructor/events"
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
              ) : recentEvents.length === 0 ? (
                <div className="p-48 text-center">
                  <div className="rounded-16 d-inline-flex align-items-center justify-content-center mb-16 bg-main-25 dash-empty__icon-wrap">
                    <i className="ph-duotone ph-calendar-star text-main-600" />
                  </div>
                  <p className="text-neutral-600 fw-medium text-sm mb-4">
                    Henüz etkinlik oluşturmadınız
                  </p>
                  <p className="text-neutral-400 text-xs mb-20">
                    İlk etkinliğinizi oluşturmak için butona tıklayın.
                  </p>
                  <button
                    className="hero-btn-primary hero-btn-primary--filled"
                    onClick={() =>
                      router.push("/individual/instructor/events/add-edit/new")
                    }
                  >
                    <i className="ph-bold ph-plus dash-hero__btn-icon" />
                    İlk Etkinliği Oluştur
                  </button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table mb-0 dash-table">
                    <thead>
                      <tr>
                        <th>Etkinlik</th>
                        <th>Durum</th>
                        <th>Tür</th>
                        <th>Format</th>
                        <th>Kayıt</th>
                        <th>Tarih</th>
                        <th style={{ width: 36 }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentEvents.map((event) => (
                        <RecentEventRow key={event.id} event={event} />
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
                      label: "Yeni Etkinlik Oluştur",
                      desc: "Yeni bir etkinlik ekle",
                      iconColor: "text-main-600",
                      iconBg: "bg-main-25",
                      href: "/individual/instructor/events/add-edit/new",
                    },
                    {
                      icon: "ph-calendar-star",
                      label: "Etkinliklerimi Görüntüle",
                      desc: "Tüm etkinlikleri listele",
                      iconColor: "text-primary-600",
                      iconBg: "bg-primary-50",
                      href: "/individual/instructor/events",
                    },
                    {
                      icon: "ph-buildings",
                      label: "Organizatörler",
                      desc: "Organizatörleri yönet",
                      iconColor: "text-info-600",
                      iconBg: "bg-info-50",
                      href: "/individual/instructor/organizers",
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
                      Etkinlik Durumu
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
                          label: "Tamamlandı",
                          icon: "ph-check-fat",
                          count: stats.completed,
                          barColor: "#6366F1",
                          textColor: "#4F46E5",
                          trackColor: "rgba(99,102,241,0.10)",
                        },
                        {
                          label: "İptal",
                          icon: "ph-x-circle",
                          count: stats.cancelled,
                          barColor: "#EF4444",
                          textColor: "#DC2626",
                          trackColor: "rgba(239,68,68,0.10)",
                        },
                      ] as const
                    ).map((row) => {
                      const pct =
                        stats.totalEvents > 0
                          ? Math.round((row.count / stats.totalEvents) * 100)
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

                    {stats.totalEvents === 0 && (
                      <div className="text-center py-16">
                        <i className="ph-duotone ph-chart-pie text-neutral-300 mb-8 d-block dash-empty__chart-icon" />
                        <p className="text-neutral-400 text-xs mb-0">
                          Henüz etkinlik bulunmuyor
                        </p>
                      </div>
                    )}

                    {stats.totalEvents > 0 && (
                      <div className="d-flex align-items-center justify-content-between rounded-10 px-14 py-10 mt-4 dash-summary-row">
                        <span className="text-xs fw-medium text-neutral-500">
                          Toplam Etkinlik
                        </span>
                        <span className="text-sm fw-bold text-neutral-700">
                          {stats.totalEvents}
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

export default InstructorPage;
