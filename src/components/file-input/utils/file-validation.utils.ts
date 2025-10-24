import {
  FileInputType,
  FileValidationResult,
  FileValidationOptions,
} from "../types/file.types";

/**
 * Dosya türüne göre accept attribute'ünü döner
 */
export const getAcceptAttribute = (
  type: FileInputType,
  customAccept?: string
): string => {
  if (customAccept) return customAccept;

  switch (type) {
    case "img":
      return "image/*";
    case "video":
      return "video/*";
    case "file":
      return ".pdf,.doc,.docx,.txt,.xlsx,.ppt,.pptx";
    case "all":
    default:
      return "*/*";
  }
};

/**
 * Dosya boyutunu MB cinsinden kontrol eder
 */
export const validateFileSize = (file: File, maxSizeMB: number): boolean => {
  const fileSizeMB = file.size / (1024 * 1024);
  return fileSizeMB <= maxSizeMB;
};

/**
 * Dosya türünü kontrol eder
 */
export const validateFileType = (
  file: File,
  acceptAttribute: string
): boolean => {
  if (acceptAttribute === "*/*") return true;

  const acceptedTypes = acceptAttribute.split(",").map((t) => t.trim());
  return acceptedTypes.some((acceptedType) => {
    // MIME type kontrolü (örn: image/*, video/*, application/pdf)
    if (acceptedType.endsWith("/*")) {
      const baseType = acceptedType.replace("/*", "");
      return file.type.startsWith(baseType);
    }

    // Tam MIME type kontrolü
    if (acceptedType.includes("/")) {
      return file.type === acceptedType;
    }

    // File extension kontrolü (örn: .pdf, .doc, .docx)
    if (acceptedType.startsWith(".")) {
      const fileName = file.name.toLowerCase();
      const extension = acceptedType.toLowerCase();
      return fileName.endsWith(extension);
    }

    // Varsayılan MIME type kontrolü
    return file.type === acceptedType;
  });
};

/**
 * Dosyaları validate eder ve hata listesi döner
 */
export const validateFiles = (
  files: File[] | FileList,
  options: FileValidationOptions
): FileValidationResult => {
  const errors: string[] = [];
  const fileArray = Array.isArray(files) ? files : Array.from(files);

  // Dosya sayısı kontrolü
  if (fileArray.length > options.maxFiles) {
    errors.push(`Maksimum ${options.maxFiles} dosya yükleyebilirsiniz`);
  }

  // Her dosyayı kontrol et
  for (let i = 0; i < fileArray.length; i++) {
    const file = fileArray[i];

    // Boyut kontrolü
    if (!validateFileSize(file, options.maxSize)) {
      errors.push(`Dosya çok büyük: ${file.name} (Max: ${options.maxSize}MB)`);
    }

    // Tür kontrolü
    const acceptAttribute = options.acceptedTypes.join(",");
    if (!validateFileType(file, acceptAttribute)) {
      errors.push(`Desteklenmeyen dosya türü: ${file.name} (${file.type})`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Dosya için önizleme URL'si oluşturur
 */
export const createPreviewUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Dosya okunamadı"));
    reader.readAsDataURL(file);
  });
};

/**
 * Dosya türüne göre ikon sınıfını döner
 */
export const getFileIcon = (type: FileInputType): string => {
  switch (type) {
    case "img":
      return "ph-image";
    case "video":
      return "ph-video";
    case "file":
      return "ph-file-text";
    case "all":
    default:
      return "ph-file";
  }
};

/**
 * Dosya tipine göre spesifik icon döner
 */
export const getFileTypeIcon = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "pdf":
      return "ph-file-pdf";
    case "doc":
    case "docx":
      return "ph-file-doc";
    case "txt":
      return "ph-file-text";
    case "xlsx":
    case "xls":
      return "ph-file-xls";
    case "ppt":
    case "pptx":
      return "ph-file-ppt";
    default:
      return "ph-file";
  }
};

/**
 * Dosya boyutunu formatlar
 */
export const formatFileSize = (bytes: number | undefined): string => {
  // Geçersiz değerler için kontrol
  if (bytes === undefined || bytes === null || bytes === 0 || isNaN(bytes)) {
    return "0 Bytes";
  }

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // i değerinin geçerli aralıkta olduğunu kontrol et
  const safeIndex = Math.max(0, Math.min(i, sizes.length - 1));
  const result = (bytes / Math.pow(k, safeIndex)).toFixed(2);

  return parseFloat(result) + " " + sizes[safeIndex];
};

/**
 * Dosya uzantısını alır
 */
export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};

/**
 * Dosya adından kullanıcı dostu tip ismi döner
 */
export const getFriendlyFileType = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  const typeMap: { [key: string]: string } = {
    // Resim dosyaları
    jpg: "JPEG",
    jpeg: "JPEG",
    png: "PNG",
    gif: "GIF",
    bmp: "BMP",
    webp: "WebP",
    svg: "SVG",

    // Video dosyaları
    mp4: "MP4",
    avi: "AVI",
    mov: "MOV",
    wmv: "WMV",
    flv: "FLV",
    webm: "WebM",
    mkv: "MKV",

    // Ses dosyaları
    mp3: "MP3",
    wav: "WAV",
    flac: "FLAC",
    aac: "AAC",

    // Döküman dosyaları
    pdf: "PDF",
    doc: "Word",
    docx: "Word",
    txt: "Text",
    rtf: "RTF",

    // Spreadsheet dosyaları
    xls: "Excel",
    xlsx: "Excel",
    csv: "CSV",

    // Sunum dosyaları
    ppt: "PowerPoint",
    pptx: "PowerPoint",

    // Arşiv dosyaları
    zip: "ZIP",
    rar: "RAR",
    "7z": "7-Zip",
    tar: "TAR",
    gz: "GZIP",

    // Kod dosyaları
    js: "JavaScript",
    ts: "TypeScript",
    html: "HTML",
    css: "CSS",
    json: "JSON",
    xml: "XML",

    // Diğer
    exe: "Executable",
    msi: "Installer",
  };

  return typeMap[extension || ""] || extension?.toUpperCase() || "FILE";
};

/**
 * Preview URL'lerini temizler
 */
export const cleanupPreviewUrls = (
  files: Array<{ preview?: string }>
): void => {
  files.forEach((file) => {
    if (file.preview && file.preview.startsWith("blob:")) {
      URL.revokeObjectURL(file.preview);
    }
  });
};
