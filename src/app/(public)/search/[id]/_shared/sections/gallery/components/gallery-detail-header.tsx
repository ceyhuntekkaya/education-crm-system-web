import React from "react";
import { CustomImage, Icon } from "@/components/ui";
import { getFileServeUrl } from "@/lib/api/constants";

interface GalleryDetailHeaderProps {
  gallery: any;
  onClose?: () => void;
}

const GalleryDetailHeader: React.FC<GalleryDetailHeaderProps> = ({
  gallery,
  onClose,
}) => {
  if (!gallery) return null;

  // URL helper
  const getFullUrl = (url: string | undefined): string => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return getFileServeUrl(url);
  };

  // Date formatter
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-12">
          <div className="avatar">
            {gallery.coverImageUrl ? (
              <CustomImage
                src={getFullUrl(gallery.coverImageUrl)}
                alt={gallery.title || "Gallery"}
                width={48}
                height={48}
                variant="rounded"
              />
            ) : (
              <div
                className="bg-neutral-100 rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 48, height: 48 }}
              >
                <Icon icon="ph-images" size="lg" className="text-neutral-400" />
              </div>
            )}
          </div>
          <div>
            <h4 className="text-neutral-900 fw-semibold mb-2">
              {gallery.title || "Başlıksız Galeri"}
            </h4>
            <p className="text-neutral-600 mb-0 fs-14">
              {gallery.school?.name || "Kurum Bilgisi Yok"} •{" "}
              {formatDate(gallery.createdAt)}
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            // className="w-40 h-40 d-flex align-items-center justify-content-center rounded-circle bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 border-0"
            type="button"
            aria-label="Kapat"
            style={{ cursor: "pointer" }}
          >
            <Icon icon="ph-x" size="lg" className="ph-bold" />
          </button>
        )}
      </div>
      <span className="d-block border border-neutral-30 my-24 border-dashed" />
    </div>
  );
};

export default GalleryDetailHeader;
