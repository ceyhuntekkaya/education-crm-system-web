import {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
  RefObject,
} from "react";
import { ProductDto, ProductImageDto } from "@/types";

interface ImageGalleryItem {
  id: number;
  imageUrl: string;
  displayOrder: number;
  isMain: boolean;
}

interface UseProductImageGalleryReturn {
  selectedImageIndex: number;
  setSelectedImageIndex: (index: number) => void;
  isLightboxOpen: boolean;
  setIsLightboxOpen: (isOpen: boolean) => void;
  zoomPosition: { x: number; y: number };
  isZooming: boolean;
  setIsZooming: (isZooming: boolean) => void;
  mainImageRef: RefObject<HTMLDivElement>;
  lightboxImageRef: RefObject<HTMLDivElement>;
  allImages: ImageGalleryItem[];
  selectedImage: ImageGalleryItem | undefined;
  handleNextImage: () => void;
  handlePreviousImage: () => void;
  handleImageMouseMove: (
    e: React.MouseEvent<HTMLDivElement>,
    isLightbox?: boolean,
  ) => void;
}

/**
 * Product image gallery için özel hook
 * Görsel galerisi, zoom, lightbox ve navigasyon işlemlerini yönetir
 */
export const useProductImageGallery = (
  product: ProductDto | null,
  images: ProductImageDto[],
): UseProductImageGalleryReturn => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const lightboxImageRef = useRef<HTMLDivElement>(null);

  // Ana görsel + ek görselleri birleştir
  const allImages = useMemo(() => {
    const imagesList: ImageGalleryItem[] = [];

    // Ana görseli ilk sıraya ekle
    if (product?.mainImageUrl) {
      imagesList.push({
        id: 0,
        imageUrl: product.mainImageUrl,
        displayOrder: 0,
        isMain: true,
      });
    }

    // Ek görselleri ekle (displayOrder'a göre sıralı)
    if (images && images.length > 0) {
      const sortedImages = [...images].sort(
        (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0),
      );
      imagesList.push(
        ...sortedImages.map((img) => ({
          id: img.id || 0,
          imageUrl: img.imageUrl || "",
          displayOrder: img.displayOrder || 0,
          isMain: false,
        })),
      );
    }

    return imagesList;
  }, [product?.mainImageUrl, images]);

  const selectedImage = allImages[selectedImageIndex];

  const handleNextImage = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev < allImages.length - 1 ? prev + 1 : 0,
    );
  }, [allImages.length]);

  const handlePreviousImage = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev > 0 ? prev - 1 : allImages.length - 1,
    );
  }, [allImages.length]);

  const handleImageMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, isLightbox = false) => {
      const container = isLightbox
        ? lightboxImageRef.current
        : mainImageRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setZoomPosition({
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      });
    },
    [],
  );

  // Klavye navigasyonu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePreviousImage();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextImage();
      } else if (e.key === "Escape") {
        e.preventDefault();
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, handleNextImage, handlePreviousImage]);

  return {
    selectedImageIndex,
    setSelectedImageIndex,
    isLightboxOpen,
    setIsLightboxOpen,
    zoomPosition,
    isZooming,
    setIsZooming,
    mainImageRef,
    lightboxImageRef,
    allImages,
    selectedImage,
    handleNextImage,
    handlePreviousImage,
    handleImageMouseMove,
  };
};
