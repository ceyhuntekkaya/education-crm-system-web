/**
 * API Configuration Constants
 * Merkezi API URL yönetimi
 */

/**
 * Ana API base URL
 */
export const API_BASE_URL = "https://demo.designexium.co.uk/api";

/**
 * Upload endpoint base URL
 */
export const UPLOAD_API_URL = `${API_BASE_URL}/upload`;

/**
 * Upload serve endpoint base URL
 * Yüklenen dosyaların servis edildiği endpoint
 */
export const UPLOAD_SERVE_URL = `${API_BASE_URL}/upload/serve/`;

/**
 * Upload endpoint'i oluşturur
 * @param schoolId - Kurum ID'si
 * @param uploadType - Upload tipi (logoUrl, coverImageUrl, vb.)
 * @returns Upload endpoint URL'i
 */
export const getUploadUrl = (schoolId: string, uploadType: string): string => {
  return `${UPLOAD_API_URL}/${schoolId}/${uploadType}`;
};

/**
 * Yüklenen dosyanın tam URL'ini oluşturur
 * @param fileUrl - Backend'den dönen dosya URL'i
 * @returns Tam dosya URL'i
 */
export const getFileServeUrl = (fileUrl: string): string => {
  return `${UPLOAD_SERVE_URL}${fileUrl}`;
};
