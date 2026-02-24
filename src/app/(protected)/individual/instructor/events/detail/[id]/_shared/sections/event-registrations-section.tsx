"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge, Button, Modal } from "@/components";
import { useModal } from "@/hooks";
import { useSnackbar } from "@/contexts";
import { useEventDetailContext } from "../context/event-detail-context";
import {
  useUpdateRegistrationStatus,
  useMarkAttendance,
  useDeleteRegistration,
} from "../hooks/api/use-event-registrations-api";
import type { EventRegistrationDto, RegistrationStatus } from "@/types";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  RegistrationStatus,
  {
    label: string;
    variant: "success" | "warning" | "danger" | "secondary";
    icon: string;
  }
> = {
  APPROVED: { label: "Onaylandı", variant: "success", icon: "ph-check-circle" },
  PENDING: { label: "Onay Bekliyor", variant: "warning", icon: "ph-clock" },
  REJECTED: { label: "Reddedildi", variant: "danger", icon: "ph-x-circle" },
  CANCELLED: {
    label: "İptal Edildi",
    variant: "secondary",
    icon: "ph-prohibit",
  },
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "-";
  try {
    return new Date(dateStr).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
};

// ─── Status Update Modal ──────────────────────────────────────────────────────

interface UpdateStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  registration: EventRegistrationDto | null;
  onSuccess: () => void;
}

const STATUS_OPTIONS: { value: RegistrationStatus; label: string }[] = [
  { value: "APPROVED", label: "Onayla" },
  { value: "REJECTED", label: "Reddet" },
  { value: "PENDING", label: "Onay Bekliyor" },
  { value: "CANCELLED", label: "İptal Et" },
];

const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({
  isOpen,
  onClose,
  registration,
  onSuccess,
}) => {
  const { showSnackbar } = useSnackbar();
  const [selectedStatus, setSelectedStatus] = useState<RegistrationStatus>(
    (registration?.status as RegistrationStatus) ?? "PENDING",
  );

  const { mutate, loading } = useUpdateRegistrationStatus(
    registration?.id ?? 0,
  );

  React.useEffect(() => {
    if (registration) {
      setSelectedStatus(registration.status as RegistrationStatus);
    }
  }, [registration]);

  const handleSubmit = () => {
    if (!registration) return;
    mutate(
      { status: selectedStatus },
      {
        onSuccess: () => {
          showSnackbar("Kayıt durumu güncellendi", "success");
          onSuccess();
          onClose();
        },
        onError: () => {
          showSnackbar("Durum güncellenirken hata oluştu", "error");
        },
      },
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      closeOnEscape={!loading}
      closeOnBackdropClick={!loading}
    >
      <Modal.Header onClose={onClose}>
        <div className="d-flex align-items-center gap-12">
          <div
            className="d-flex align-items-center justify-content-center bg-primary-50 rounded-circle"
            style={{ width: 40, height: 40 }}
          >
            <i
              className="ph ph-arrows-counter-clockwise text-primary-600"
              style={{ fontSize: 20 }}
            />
          </div>
          <h5 className="mb-0 fw-semibold text-heading">
            Kayıt Durumunu Güncelle
          </h5>
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="d-flex flex-column gap-16">
          {registration && (
            <div className="bg-neutral-50 rounded-8 p-12">
              <p className="mb-4 text-sm text-neutral-500">
                Kayıt yapan öğretmen
              </p>
              <p className="mb-0 fw-semibold">
                {registration.teacherName || `#${registration.teacherId}`}
              </p>
              {registration.teacherEmail && (
                <p className="mb-0 text-sm text-neutral-500">
                  {registration.teacherEmail}
                </p>
              )}
            </div>
          )}

          <div className="d-flex flex-column gap-8">
            <label className="fw-medium text-sm text-heading">Yeni Durum</label>
            <div className="d-flex flex-column gap-8">
              {STATUS_OPTIONS.map((opt) => {
                const config = STATUS_CONFIG[opt.value];
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSelectedStatus(opt.value)}
                    className={`d-flex align-items-center gap-12 p-12 rounded-8 border text-start w-100 ${
                      selectedStatus === opt.value
                        ? "border-primary-500 bg-primary-25"
                        : "border-neutral-200 bg-white hover:bg-neutral-25"
                    }`}
                    style={{ cursor: "pointer", transition: "all 0.15s" }}
                  >
                    <i
                      className={`ph-bold ${config.icon} text-${config.variant}-600`}
                      style={{ fontSize: 18 }}
                    />
                    <span className="fw-medium">{config.label}</span>
                    {selectedStatus === opt.value && (
                      <i className="ph-bold ph-check text-primary-500 ms-auto" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline" onClick={onClose} disabled={loading}>
          İptal
        </Button>
        <Button variant="inline" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <span className="d-flex align-items-center gap-8">
              <i className="ph ph-spinner-gap spin" />
              Güncelleniyor...
            </span>
          ) : (
            "Güncelle"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// ─── Attendance Modal ─────────────────────────────────────────────────────────

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  registration: EventRegistrationDto | null;
  onSuccess: () => void;
}

const AttendanceModal: React.FC<AttendanceModalProps> = ({
  isOpen,
  onClose,
  registration,
  onSuccess,
}) => {
  const { showSnackbar } = useSnackbar();
  const [attended, setAttended] = useState(registration?.attended ?? false);

  const { mutate, loading } = useMarkAttendance(registration?.id ?? 0);

  React.useEffect(() => {
    if (registration) {
      setAttended(registration.attended ?? false);
    }
  }, [registration]);

  const handleSubmit = () => {
    if (!registration) return;
    mutate(
      { attended },
      {
        onSuccess: () => {
          showSnackbar(
            attended ? "Katılım işaretlendi" : "Katılmadı olarak işaretlendi",
            "success",
          );
          onSuccess();
          onClose();
        },
        onError: () => {
          showSnackbar("Katılım işaretlenirken hata oluştu", "error");
        },
      },
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      closeOnEscape={!loading}
      closeOnBackdropClick={!loading}
    >
      <Modal.Header onClose={onClose}>
        <div className="d-flex align-items-center gap-12">
          <div
            className="d-flex align-items-center justify-content-center bg-success-50 rounded-circle"
            style={{ width: 40, height: 40 }}
          >
            <i
              className="ph ph-calendar-check text-success-600"
              style={{ fontSize: 20 }}
            />
          </div>
          <h5 className="mb-0 fw-semibold text-heading">Katılım İşaretle</h5>
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="d-flex flex-column gap-16">
          {registration && (
            <div className="bg-neutral-50 rounded-8 p-12">
              <p className="mb-4 text-sm text-neutral-500">Kayıt</p>
              <p className="mb-0 fw-semibold">
                {registration.teacherName || `#${registration.teacherId}`}
              </p>
            </div>
          )}

          <div className="d-flex flex-column gap-8">
            <label className="fw-medium text-sm text-heading">
              Katılım Durumu
            </label>
            <div className="d-flex gap-12">
              <button
                type="button"
                onClick={() => setAttended(true)}
                className={`d-flex align-items-center gap-8 p-12 rounded-8 border flex-1 justify-content-center ${
                  attended
                    ? "border-success-500 bg-success-25"
                    : "border-neutral-200 bg-white"
                }`}
                style={{ cursor: "pointer", transition: "all 0.15s" }}
              >
                <i
                  className={`ph-bold ph-check-circle ${attended ? "text-success-600" : "text-neutral-400"}`}
                  style={{ fontSize: 20 }}
                />
                <span className="fw-medium">Katıldı</span>
              </button>
              <button
                type="button"
                onClick={() => setAttended(false)}
                className={`d-flex align-items-center gap-8 p-12 rounded-8 border flex-1 justify-content-center ${
                  !attended
                    ? "border-danger-500 bg-danger-25"
                    : "border-neutral-200 bg-white"
                }`}
                style={{ cursor: "pointer", transition: "all 0.15s" }}
              >
                <i
                  className={`ph-bold ph-x-circle ${!attended ? "text-danger-600" : "text-neutral-400"}`}
                  style={{ fontSize: 20 }}
                />
                <span className="fw-medium">Katılmadı</span>
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline" onClick={onClose} disabled={loading}>
          İptal
        </Button>
        <Button
          variant={attended ? "success" : "error"}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <span className="d-flex align-items-center gap-8">
              <i className="ph ph-spinner-gap spin" />
              Kaydediliyor...
            </span>
          ) : (
            "Kaydet"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// ─── Delete Registration Modal ────────────────────────────────────────────────

interface DeleteRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  registration: EventRegistrationDto | null;
  onSuccess: () => void;
}

const DeleteRegistrationModal: React.FC<DeleteRegistrationModalProps> = ({
  isOpen,
  onClose,
  registration,
  onSuccess,
}) => {
  const { showSnackbar } = useSnackbar();
  const { mutate, loading } = useDeleteRegistration(registration?.id ?? 0);

  const handleDelete = () => {
    if (!registration) return;
    mutate(undefined, {
      onSuccess: () => {
        showSnackbar("Kayıt silindi", "success");
        onSuccess();
        onClose();
      },
      onError: (err) => {
        if (err === "API response is empty or null") {
          showSnackbar("Kayıt silindi", "success");
          onSuccess();
          onClose();
        } else {
          showSnackbar("Kayıt silinirken hata oluştu", "error");
        }
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      variant="danger"
      closeOnEscape={!loading}
      closeOnBackdropClick={!loading}
    >
      <Modal.Header onClose={onClose}>
        <div className="d-flex align-items-center gap-12">
          <div
            className="d-flex align-items-center justify-content-center bg-danger-50 rounded-circle"
            style={{ width: 40, height: 40 }}
          >
            <i
              className="ph ph-trash text-danger-600"
              style={{ fontSize: 20 }}
            />
          </div>
          <h5 className="mb-0 fw-semibold text-heading">Kaydı Sil</h5>
        </div>
      </Modal.Header>

      <Modal.Body>
        <p className="text-body mb-0">
          {registration?.teacherName
            ? `${registration.teacherName} adlı öğretmenin kaydını silmek istediğinize emin misiniz?`
            : "Bu kaydı silmek istediğinize emin misiniz?"}{" "}
          Bu işlem geri alınamaz.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline" onClick={onClose} disabled={loading}>
          İptal
        </Button>
        <Button variant="error" onClick={handleDelete} disabled={loading}>
          {loading ? (
            <span className="d-flex align-items-center gap-8">
              <i className="ph ph-spinner-gap spin" />
              Siliniyor...
            </span>
          ) : (
            "Sil"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// ─── Registration Row ─────────────────────────────────────────────────────────

interface RegistrationRowProps {
  registration: EventRegistrationDto;
  onStatusClick: (reg: EventRegistrationDto) => void;
  onAttendanceClick: (reg: EventRegistrationDto) => void;
  onDeleteClick: (reg: EventRegistrationDto) => void;
}

const RegistrationRow: React.FC<RegistrationRowProps> = ({
  registration,
  onStatusClick,
  onAttendanceClick,
  onDeleteClick,
}) => {
  const statusConfig =
    STATUS_CONFIG[registration.status as RegistrationStatus] ||
    STATUS_CONFIG.PENDING;

  return (
    <tr>
      <td className="ps-20 py-12">
        <div className="d-flex flex-column">
          <span className="fw-semibold text-heading">
            {registration.teacherName || `Öğretmen #${registration.teacherId}`}
          </span>
          {registration.teacherEmail && (
            <span className="text-sm text-neutral-500">
              {registration.teacherEmail}
            </span>
          )}
        </div>
      </td>
      <td className="py-12">
        <Badge variant={statusConfig.variant} size="sm">
          <i className={`ph-bold ${statusConfig.icon} me-4`} />
          {statusConfig.label}
        </Badge>
      </td>
      <td className="py-12">
        {registration.attended ? (
          <span className="d-flex align-items-center gap-4 text-success-600 fw-medium text-sm">
            <i className="ph-bold ph-check-circle" />
            Katıldı
          </span>
        ) : (
          <span className="d-flex align-items-center gap-4 text-neutral-400 text-sm">
            <i className="ph-bold ph-minus-circle" />
            Katılmadı
          </span>
        )}
      </td>
      <td className="py-12 text-sm text-neutral-500">
        {formatDate(registration.createdAt)}
      </td>
      {registration.registrationNote && (
        <td
          className="py-12 text-sm text-neutral-600 pe-8"
          style={{ maxWidth: 220 }}
        >
          <span
            title={registration.registrationNote}
            style={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {registration.registrationNote}
          </span>
        </td>
      )}
      {!registration.registrationNote && (
        <td className="py-12 pe-8 text-sm text-neutral-400">-</td>
      )}
      <td className="py-12 pe-20">
        <div className="d-flex align-items-center gap-8 justify-content-end">
          <button
            type="button"
            className="btn btn-sm btn-outline-primary px-8 py-4"
            title="Durum Güncelle"
            onClick={() => onStatusClick(registration)}
          >
            <i className="ph ph-arrows-counter-clockwise" />
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-success px-8 py-4"
            title="Katılım İşaretle"
            onClick={() => onAttendanceClick(registration)}
          >
            <i className="ph ph-calendar-check" />
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger px-8 py-4"
            title="Kaydı Sil"
            onClick={() => onDeleteClick(registration)}
          >
            <i className="ph ph-trash" />
          </button>
        </div>
      </td>
    </tr>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────

/**
 * Etkinlik Kayıtları Bölümü
 * - Kayıt listesi (by-event/{eventId})
 * - Durum güncelleme (APPROVED / REJECTED / CANCELLED / PENDING)
 * - Katılım işaretleme
 * - Kayıt silme
 * - Sayfalama
 */
export const EventRegistrationsSection: React.FC = () => {
  const {
    registrations,
    isLoadingRegistrations,
    registrationsPage,
    setRegistrationsPage,
    refetchRegistrations,
    event,
    eventId,
  } = useEventDetailContext();

  const [selectedRegistration, setSelectedRegistration] =
    useState<EventRegistrationDto | null>(null);

  const {
    isOpen: isStatusModalOpen,
    open: openStatusModal,
    close: closeStatusModal,
  } = useModal();

  const {
    isOpen: isAttendanceModalOpen,
    open: openAttendanceModal,
    close: closeAttendanceModal,
  } = useModal();

  const {
    isOpen: isDeleteModalOpen,
    open: openDeleteModal,
    close: closeDeleteModal,
  } = useModal();

  const handleStatusClick = (reg: EventRegistrationDto) => {
    setSelectedRegistration(reg);
    openStatusModal();
  };

  const handleAttendanceClick = (reg: EventRegistrationDto) => {
    setSelectedRegistration(reg);
    openAttendanceModal();
  };

  const handleDeleteClick = (reg: EventRegistrationDto) => {
    setSelectedRegistration(reg);
    openDeleteModal();
  };

  const handleSuccess = () => {
    refetchRegistrations();
  };

  const items = registrations?.content ?? [];
  const totalElements = registrations?.totalElements ?? 0;
  const totalPages = registrations?.totalPages ?? 0;

  return (
    <>
      {/* Section card */}
      <div
        className="bg-white rounded-16 overflow-hidden"
        style={{
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          border: "1px solid rgba(17,24,39,0.07)",
        }}
      >
        {/* Header */}
        <div
          className="d-flex align-items-center justify-content-between px-20 py-16"
          style={{ borderBottom: "1px solid rgba(17,24,39,0.07)" }}
        >
          <div className="d-flex align-items-center gap-12">
            <div
              className="d-flex align-items-center justify-content-center bg-primary-50 rounded-10"
              style={{ width: 36, height: 36 }}
            >
              <i
                className="ph-duotone ph-users text-primary-600"
                style={{ fontSize: 18 }}
              />
            </div>
            <div>
              <h6 className="mb-0 fw-semibold text-heading">
                Etkinlik Kayıtları
              </h6>
              <p className="mb-0 text-sm text-neutral-500">
                {isLoadingRegistrations
                  ? "Yükleniyor..."
                  : `${totalElements} kayıt`}
              </p>
            </div>
          </div>
          {event && (
            <div className="d-flex align-items-center gap-12">
              <span className="text-sm text-neutral-500">
                Kontenjan:{" "}
                <strong>
                  {event.maxCapacity
                    ? `${event.registrationCount ?? 0}/${event.maxCapacity}`
                    : (event.registrationCount ?? 0)}
                </strong>
              </span>
              <Link
                href={`/individual/instructor/events/detail/${eventId}/registrations`}
                className="d-flex align-items-center gap-6 text-decoration-none text-primary-600 fw-medium text-sm px-10 py-6 rounded-8"
                style={{
                  background: "rgba(99,102,241,0.06)",
                  border: "1px solid rgba(99,102,241,0.18)",
                  transition: "background 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                Tüm Kayıtları Gör
                <i
                  className="ph-bold ph-arrow-right"
                  style={{ fontSize: 12 }}
                />
              </Link>
            </div>
          )}
        </div>

        {/* Content */}
        {isLoadingRegistrations ? (
          <div className="d-flex align-items-center justify-content-center py-40">
            <div className="d-flex flex-column align-items-center gap-12">
              <i
                className="ph ph-spinner-gap text-primary-400 spin"
                style={{ fontSize: 32 }}
              />
              <p className="text-sm text-neutral-500 mb-0">
                Kayıtlar yükleniyor...
              </p>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="d-flex flex-column align-items-center justify-content-center py-40 gap-12">
            <div
              className="d-flex align-items-center justify-content-center bg-neutral-50 rounded-circle"
              style={{ width: 56, height: 56 }}
            >
              <i
                className="ph-duotone ph-users text-neutral-400"
                style={{ fontSize: 28 }}
              />
            </div>
            <p className="mb-0 fw-medium text-neutral-500">Henüz kayıt yok</p>
            <p className="mb-0 text-sm text-neutral-400">
              Bu etkinliğe henüz kayıt yapılmamış.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr style={{ background: "rgba(17,24,39,0.02)" }}>
                  <th className="ps-20 py-10 text-sm fw-semibold text-neutral-600 border-0">
                    Öğretmen
                  </th>
                  <th className="py-10 text-sm fw-semibold text-neutral-600 border-0">
                    Durum
                  </th>
                  <th className="py-10 text-sm fw-semibold text-neutral-600 border-0">
                    Katılım
                  </th>
                  <th className="py-10 text-sm fw-semibold text-neutral-600 border-0">
                    Kayıt Tarihi
                  </th>
                  <th className="py-10 text-sm fw-semibold text-neutral-600 border-0">
                    Not
                  </th>
                  <th className="py-10 pe-20 text-sm fw-semibold text-neutral-600 border-0 text-end">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((reg) => (
                  <RegistrationRow
                    key={reg.id}
                    registration={reg}
                    onStatusClick={handleStatusClick}
                    onAttendanceClick={handleAttendanceClick}
                    onDeleteClick={handleDeleteClick}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            className="d-flex align-items-center justify-content-between px-20 py-12"
            style={{ borderTop: "1px solid rgba(17,24,39,0.07)" }}
          >
            <p className="mb-0 text-sm text-neutral-500">
              Sayfa {registrationsPage + 1} / {totalPages} ({totalElements}{" "}
              kayıt)
            </p>
            <div className="d-flex gap-8">
              <Button
                variant="outline"
                size="sm"
                disabled={registrationsPage === 0}
                onClick={() => setRegistrationsPage(registrationsPage - 1)}
              >
                <i className="ph ph-caret-left me-4" />
                Önceki
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={registrationsPage >= totalPages - 1}
                onClick={() => setRegistrationsPage(registrationsPage + 1)}
              >
                Sonraki
                <i className="ph ph-caret-right ms-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <UpdateStatusModal
        isOpen={isStatusModalOpen}
        onClose={closeStatusModal}
        registration={selectedRegistration}
        onSuccess={handleSuccess}
      />

      <AttendanceModal
        isOpen={isAttendanceModalOpen}
        onClose={closeAttendanceModal}
        registration={selectedRegistration}
        onSuccess={handleSuccess}
      />

      <DeleteRegistrationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        registration={selectedRegistration}
        onSuccess={handleSuccess}
      />
    </>
  );
};
