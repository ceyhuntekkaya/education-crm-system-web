import { MediaType } from "@/enums";

/**
 * Dosya adını backend response'undan veya URL'den çıkarır
 */
export const extractFileName = (metadata: any, url: string): string => {
  // 1. Backend response'undan dosya adını al
  if (metadata?.originalFileName) {
    return metadata.originalFileName;
  }
  if (metadata?.fileName) {
    return metadata.fileName;
  }

  // 2. URL'den dosya adını çıkar
  if (!url) return "Belge";

  const urlParts = url.split("/");
  const fileName = urlParts[urlParts.length - 1];
  const cleanFileName = fileName.split("?")[0];

  return cleanFileName || "Belge";
};

/**
 * MediaType enum'unu backend documentType string'ine çevirir
 */
export const convertMediaTypeToDocumentType = (
  mediaType: MediaType | string | undefined,
): string | undefined => {
  if (!mediaType) return undefined;

  const mediaTypeStr =
    typeof mediaType === "string" ? mediaType : MediaType[mediaType];

  // MediaType enum değerlerini backend'in beklediği formata çevir
  switch (mediaTypeStr) {
    case "IMAGE":
      return "IMAGE";
    case "VIDEO":
      return "VIDEO";
    case "AUDIO":
      return "AUDIO";
    case "DOCUMENT":
      return "DOCUMENT";
    case "ARCHIVE":
      return "ARCHIVE";
    default:
      return "OTHER";
  }
};

/**
 * DocumentType veya dosya URL'sine göre MediaGallery için itemType belirler
 */
export const getMediaItemType = (
  documentType?: string,
  fileUrl?: string,
): "IMAGE" | "VIDEO" | "DOCUMENT" => {
  // 1. DocumentType varsa direkt kullan
  if (documentType) {
    const typeUpper = documentType.toUpperCase();
    if (typeUpper === "IMAGE") return "IMAGE";
    if (typeUpper === "VIDEO") return "VIDEO";
  }

  // 2. Dosya URL'sine göre uzantıdan belirle
  if (fileUrl) {
    const extension = fileUrl.split(".").pop()?.toLowerCase() || "";

    // Resim uzantıları
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"];
    if (imageExtensions.includes(extension)) {
      return "IMAGE";
    }

    // Video uzantıları
    const videoExtensions = ["mp4", "webm", "ogg", "mov", "avi", "mkv"];
    if (videoExtensions.includes(extension)) {
      return "VIDEO";
    }
  }

  // 3. Varsayılan olarak DOCUMENT döndür
  return "DOCUMENT";
};
