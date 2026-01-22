import React from "react";
import { useRouter } from "next/navigation";
import { Modal, Button } from "@/components";
import { useModal } from "@/hooks";
import { useSnackbar } from "@/contexts";
import { useProductDetail } from "../../../context";
import { useDeleteProduct } from "../../../hooks/api";
import { useProductsContext } from "@/app/(protected)/supply/supplier/products/_shared/contexts";

/**
 * Sil butonu ve onay modal'ı
 */
const DeleteButton: React.FC = () => {
  const { isOpen, open: openModal, close: closeModal } = useModal();
  const router = useRouter();
  const { productId } = useProductDetail();
  const { showSnackbar } = useSnackbar();
  const { refetch: refetchProducts } = useProductsContext();

  const { deleteProduct, isLoading: isDeleting } = useDeleteProduct({
    productId: Number(productId),
    onSuccess: () => {
      showSnackbar("Ürün başarıyla silindi", "success");
      closeModal();
      refetchProducts();
      router.push("/supply/supplier/products");
    },
    onError: (error) => {
      console.error("Ürün silme hatası:", error);
      showSnackbar("Ürün silinirken bir hata oluştu", "error");
    },
  });

  const handleDelete = async () => {
    if (!productId) return;
    await deleteProduct();
  };

  return (
    <>
      <button
        className="product-detail-page__back-button"
        onClick={openModal}
        style={{ color: "#dc3545" }}
      >
        <i className="ph ph-trash"></i>
        <span>Sil</span>
      </button>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        size="sm"
        variant="danger"
        closeOnEscape={!isDeleting}
        closeOnBackdropClick={!isDeleting}
      >
        <Modal.Header onClose={closeModal}>
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
            <h5 className="mb-0 fw-semibold text-heading">Ürünü Sil</h5>
          </div>
        </Modal.Header>

        <Modal.Body>
          <div className="d-flex flex-column gap-16">
            <p className="text-body mb-0">
              Bu ürünü silmek istediğinize emin misiniz? Bu işlem geri alınamaz
              ve aşağıdaki veriler kalıcı olarak silinecektir:
            </p>

            <div className="bg-danger-25 rounded-8 p-16">
              <ul className="mb-0 ps-20">
                <li className="text-danger-700 mb-8">Tüm ürün bilgileri</li>
                <li className="text-danger-700 mb-8">Ürün görselleri</li>
                <li className="text-danger-700 mb-8">Ürün varyantları</li>
                <li className="text-danger-700 mb-0">Ürün indirimleri</li>
              </ul>
            </div>

            <div className="d-flex align-items-start gap-8 bg-warning-25 rounded-8 p-12">
              <i
                className="ph ph-warning text-warning-700 flex-shrink-0"
                style={{ fontSize: "18px", marginTop: "2px" }}
              ></i>
              <small className="text-warning-700 mb-0">
                <strong>Uyarı:</strong> Bu eylem kalıcıdır ve geri alınamaz.
                Silme işleminden sonra bu ürüne ait hiçbir veri kurtarılamaz.
              </small>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div className="d-flex justify-content-end gap-12 w-100">
            <Button
              variant="outline"
              onClick={closeModal}
              disabled={isDeleting}
              size="md"
            >
              <i className="ph ph-x me-8"></i>
              İptal
            </Button>
            <Button
              variant="error"
              onClick={handleDelete}
              loading={isDeleting}
              disabled={isDeleting}
              size="md"
            >
              <i className="ph ph-trash me-8"></i>
              Evet, Kalıcı Olarak Sil
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { DeleteButton };
