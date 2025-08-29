export enum PerformanceMetricCategory {
  WEB_REQUEST = "WEB_REQUEST", // Web isteği
  DATABASE = "DATABASE", // Veritabanı
  CACHE = "CACHE", // Önbellek
  FILE_SYSTEM = "FILE_SYSTEM", // Dosya sistemi
  NETWORK = "NETWORK", // Ağ
  MEMORY = "MEMORY", // Bellek
  CPU = "CPU", // İşlemci
  EXTERNAL_API = "EXTERNAL_API", // Harici API
  BACKGROUND_JOB = "BACKGROUND_JOB", // Arka plan işi
  SYSTEM = "SYSTEM", // Sistem
  APPLICATION = "APPLICATION", // Uygulama
  SECURITY = "SECURITY", // Güvenlik
  SEARCH = "SEARCH", // Arama
  UPLOAD = "UPLOAD", // Dosya yükleme
  EMAIL = "EMAIL", // E-posta
  SMS = "SMS", // SMS
  PAYMENT = "PAYMENT", // Ödeme
  BUSINESS_LOGIC = "BUSINESS_LOGIC", // İş mantığı
}
