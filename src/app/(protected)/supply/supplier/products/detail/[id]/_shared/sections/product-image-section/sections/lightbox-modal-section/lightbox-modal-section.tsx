import React from "react";
import { Modal, ModalBody } from "@/components/ui";
import { useProductsContext } from "../../../../../../../_shared/contexts";
import { useProductDetail } from "../../../../context";
import {
  LightboxImageSection,
  LightboxNavigationSection,
  LightboxThumbnailsSection,
  LightboxInfoSection,
} from "./sections/index";

export const LightboxModalSection: React.FC = () => {
  const { currentProduct: product } = useProductsContext();
  const { isLightboxOpen, setIsLightboxOpen } = useProductDetail();

  if (!product) return null;

  return (
    <Modal
      isOpen={isLightboxOpen}
      onClose={() => setIsLightboxOpen(false)}
      size="xl"
      closeOnBackdropClick={true}
      className="product-detail-page__lightbox-modal"
      ariaLabel="Ürün Görseli Galerisi"
    >
      <ModalBody noPadding className="product-detail-page__lightbox-body">
        <div className="product-detail-page__lightbox">
          {/* Close Button */}
          <button
            className="product-detail-page__lightbox-close"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Kapat"
          >
            <i className="ph ph-x"></i>
          </button>

          {/* Main Image Container */}
          <div className="product-detail-page__lightbox-content">
            {/* Ana Görsel */}
            <LightboxImageSection />

            {/* Navigasyon Kontrolleri */}
            <LightboxNavigationSection />

            {/* Thumbnail Gallery */}
            <LightboxThumbnailsSection />

            {/* Ürün Bilgi Overlay */}
            <LightboxInfoSection />
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
