"use client";

import React from "react";
import { Modal, Button } from "@/components";

interface DeleteProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

/**
 * Öğretmen profili silme onay modal'ı
 */
export const DeleteProfileModal: React.FC<DeleteProfileModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}) => {
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
          <h5 className="mb-0 fw-semibold text-heading">Profili Sil</h5>
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="d-flex flex-column gap-16">
          <p className="text-body mb-0">
            Profilinizi silmek istediğinize emin misiniz? Bu işlem geri alınamaz
            ve tüm profil bilgileriniz kalıcı olarak silinecektir.
          </p>

          <div className="bg-danger-25 rounded-8 p-16">
            <ul className="mb-0 ps-20">
              <li className="text-danger-600 mb-8">Kişisel bilgileriniz</li>
              <li className="text-danger-600 mb-8">
                Eğitim ve deneyim bilgileri
              </li>
              <li className="text-danger-600 mb-8">
                Yüklediğiniz belgeler ve medya
              </li>
              <li className="text-danger-600">İş başvurularınız</li>
            </ul>
          </div>

          <div className="alert alert-warning-50 border border-warning-300 rounded-8 p-16 mb-0">
            <div className="d-flex gap-12">
              <i className="ph ph-warning text-warning-600 flex-shrink-0 mt-4"></i>
              <p className="text-warning-700 mb-0 text-sm">
                <strong>Dikkat:</strong> Bu işlem geri alınamaz. Silindikten
                sonra profil verileriniz kurtarılamaz.
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
            Evet, Profili Sil
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
