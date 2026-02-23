"use client";

import React, { useState } from "react";
import { Modal, Button } from "@/components";
import { useSnackbar } from "@/contexts";
import {
  useUpdateRegistrationStatus,
  useMarkAttendance,
  useDeleteRegistration,
} from "../../../_shared/hooks/api/use-event-registrations-api";
import type { EventRegistrationDto, RegistrationStatus } from "@/types";

// ─── Status Update Modal ──────────────────────────────────────────────────────

const STATUS_OPTIONS: {
  value: RegistrationStatus;
  label: string;
  icon: string;
  color: string;
}[] = [
  {
    value: "APPROVED",
    label: "Onayla",
    icon: "ph-check-circle",
    color: "text-success-600",
  },
  {
    value: "REJECTED",
    label: "Reddet",
    icon: "ph-x-circle",
    color: "text-danger-600",
  },
  {
    value: "PENDING",
    label: "Onay Bekliyor",
    icon: "ph-clock",
    color: "text-warning-600",
  },
  {
    value: "CANCELLED",
    label: "İptal Et",
    icon: "ph-prohibit",
    color: "text-neutral-500",
  },
];

interface UpdateStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  registration: EventRegistrationDto | null;
  onSuccess: () => void;
}

export const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({
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
    if (registration)
      setSelectedStatus(registration.status as RegistrationStatus);
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
        onError: () =>
          showSnackbar("Durum güncellenirken hata oluştu", "error"),
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
                {registration.teacherName ||
                  `Öğretmen #${registration.teacherId}`}
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
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSelectedStatus(opt.value)}
                  className={`d-flex align-items-center gap-10 px-14 py-10 rounded-10 text-start border-0 transition-all ${
                    selectedStatus === opt.value
                      ? "bg-primary-50 border border-primary-300"
                      : "bg-neutral-50 hover-bg-neutral-100"
                  }`}
                  style={{
                    outline:
                      selectedStatus === opt.value
                        ? "2px solid rgba(99,102,241,0.3)"
                        : "none",
                  }}
                >
                  <i
                    className={`${opt.icon} ${opt.color}`}
                    style={{ fontSize: 18 }}
                  />
                  <span className="fw-medium text-sm">{opt.label}</span>
                  {selectedStatus === opt.value && (
                    <i className="ph-bold ph-check ms-auto text-primary-600" />
                  )}
                </button>
              ))}
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

export const AttendanceModal: React.FC<AttendanceModalProps> = ({
  isOpen,
  onClose,
  registration,
  onSuccess,
}) => {
  const { showSnackbar } = useSnackbar();
  const [attended, setAttended] = useState(registration?.attended ?? false);
  const { mutate, loading } = useMarkAttendance(registration?.id ?? 0);

  React.useEffect(() => {
    if (registration) setAttended(registration.attended ?? false);
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
        onError: () =>
          showSnackbar("Katılım işaretlenirken hata oluştu", "error"),
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
                {registration.teacherName ||
                  `Öğretmen #${registration.teacherId}`}
              </p>
              {registration.teacherEmail && (
                <p className="mb-0 text-sm text-neutral-500">
                  {registration.teacherEmail}
                </p>
              )}
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
                className={`flex-1 d-flex align-items-center justify-content-center gap-8 px-16 py-12 rounded-10 border-0 transition-all fw-medium text-sm ${
                  attended
                    ? "bg-success-50 text-success-700"
                    : "bg-neutral-50 text-neutral-500 hover-bg-neutral-100"
                }`}
                style={{
                  outline: attended ? "2px solid rgba(16,185,129,0.3)" : "none",
                }}
              >
                <i
                  className="ph-bold ph-check-circle"
                  style={{ fontSize: 18 }}
                />
                Katıldı
              </button>
              <button
                type="button"
                onClick={() => setAttended(false)}
                className={`flex-1 d-flex align-items-center justify-content-center gap-8 px-16 py-12 rounded-10 border-0 transition-all fw-medium text-sm ${
                  !attended
                    ? "bg-danger-50 text-danger-700"
                    : "bg-neutral-50 text-neutral-500 hover-bg-neutral-100"
                }`}
                style={{
                  outline: !attended ? "2px solid rgba(239,68,68,0.3)" : "none",
                }}
              >
                <i className="ph-bold ph-x-circle" style={{ fontSize: 18 }} />
                Katılmadı
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

export const DeleteRegistrationModal: React.FC<
  DeleteRegistrationModalProps
> = ({ isOpen, onClose, registration, onSuccess }) => {
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
      onError: (err: unknown) => {
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
