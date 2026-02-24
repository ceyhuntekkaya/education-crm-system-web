"use client";

import React from "react";
import { Modal, Button } from "@/components";
import { useEventDetailContext } from "../context/event-detail-context";

interface DeleteEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * 2.7 Etkinlik Sil — onay modal'ı
 */
export const DeleteEventModal: React.FC<DeleteEventModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const { event, isDeleting } = useEventDetailContext();
  const eventTitle = event?.title;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      variant="danger"
      closeOnEscape={!isDeleting}
      closeOnBackdropClick={!isDeleting}
    >
      <Modal.Header onClose={onClose}>
        <div className="d-flex align-items-center gap-12">
          <div
            className="d-flex align-items-center justify-content-center bg-danger-50 rounded-circle"
            style={{ width: "40px", height: "40px" }}
          >
            <i
              className="ph ph-trash text-danger"
              style={{ fontSize: "20px" }}
            ></i>
          </div>
          <h5 className="mb-0 fw-semibold text-heading">Etkinliği Sil</h5>
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="d-flex flex-column gap-16">
          <p className="text-body mb-0">
            {eventTitle ? (
              <>
                <strong>{eventTitle}</strong> adlı etkinliği silmek istediğinize
                emin misiniz? Bu işlem geri alınamaz ve tüm etkinlik bilgileri
                kalıcı olarak silinecektir.
              </>
            ) : (
              <>
                Bu etkinliği silmek istediğinize emin misiniz? Bu işlem geri
                alınamaz ve tüm etkinlik bilgileri kalıcı olarak silinecektir.
              </>
            )}
          </p>

          <div className="bg-danger-25 rounded-8 p-16">
            <ul className="mb-0 ps-20">
              <li className="text-danger-600 mb-8">Tüm etkinlik bilgileri</li>
              <li className="text-danger-600 mb-8">
                Katılımcı ve kayıt verileri
              </li>
              <li className="text-danger-600 mb-8">
                Etkinliğe ait görseller ve dosyalar
              </li>
              <li className="text-danger-600">Tarih ve program bilgileri</li>
            </ul>
          </div>

          <div className="alert alert-warning-50 border border-warning-300 rounded-8 p-16 mb-0">
            <div className="d-flex gap-12">
              <i className="ph ph-warning text-warning-600 flex-shrink-0 mt-4"></i>
              <p className="text-warning-700 mb-0 text-sm">
                <strong>Dikkat:</strong> Bu işlem geri alınamaz. Silindikten
                sonra etkinlik verileri kurtarılamaz.
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <div className="d-flex justify-content-end gap-12 w-100">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            İptal
          </Button>
          <Button
            variant="error"
            onClick={onConfirm}
            loading={isDeleting}
            disabled={isDeleting}
            leftIcon="ph ph-trash"
          >
            Evet, Etkinliği Sil
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
