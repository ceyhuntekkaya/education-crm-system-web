import {
  ProductDto,
  ProductDtoStatus,
  ProductDtoStockTrackingType,
  ProductDtoCurrency,
} from "@/types";

/**
 * Mock Product Data
 * Test ve development amaçlı örnek ürün verileri
 * Görseller: Unsplash placeholder servisinden alınmıştır
 */

// Tedarikçi ve kategori sabitleri
const SUPPLIERS = {
  TECH_CORP: { id: 101, name: "TechCorp Teknoloji A.Ş." },
  OFFICE_PRO: { id: 102, name: "OfficePro Ofis Çözümleri Ltd." },
  NETWORK_PLUS: { id: 103, name: "NetworkPlus Ağ Sistemleri" },
  MEGA_ELECTRONICS: { id: 104, name: "Mega Elektronik Ticaret" },
  SECURE_TECH: { id: 105, name: "SecureTech Güvenlik Sistemleri" },
  FURNITURE_WORLD: { id: 106, name: "Furniture World Mobilya" },
} as const;

const CATEGORIES = {
  ELECTRONICS: { id: 1, name: "Elektronik" },
  OFFICE_SUPPLIES: { id: 2, name: "Ofis Malzemeleri" },
  NETWORK_EQUIPMENT: { id: 3, name: "Ağ Ekipmanları" },
  SECURITY: { id: 4, name: "Güvenlik Sistemleri" },
  FURNITURE: { id: 5, name: "Mobilya" },
  STATIONERY: { id: 6, name: "Kırtasiye" },
} as const;

// Tarih helper fonksiyonları
const getDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

const getRecentDate = (hoursAgo: number): string => {
  const date = new Date();
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString();
};

export const mockProducts: ProductDto[] = [
  // 1. Aktif - Yüksek Stok
  {
    id: 1,
    supplierId: SUPPLIERS.TECH_CORP.id,
    supplierCompanyName: SUPPLIERS.TECH_CORP.name,
    categoryId: CATEGORIES.ELECTRONICS.id,
    categoryName: CATEGORIES.ELECTRONICS.name,
    name: "Dell XPS 15 Laptop - Intel Core i7",
    sku: "DELL-XPS15-2024",
    description:
      "Profesyonel iş ve içerik üretimi için tasarlanmış premium laptop. 15.6 inç 4K OLED ekran, Intel Core i7-13700H işlemci, 32GB DDR5 RAM ve 1TB NVMe SSD ile donatılmıştır.",
    technicalSpecs:
      "İşlemci: Intel Core i7-13700H (14 çekirdek), RAM: 32GB DDR5, Depolama: 1TB NVMe SSD, Ekran: 15.6' 4K OLED Touch, GPU: NVIDIA RTX 4060 8GB, Pil: 86Wh",
    status: ProductDtoStatus.ACTIVE,
    stockTrackingType: ProductDtoStockTrackingType.LIMITED,
    stockQuantity: 87,
    minStockLevel: 15,
    basePrice: 45999.00,
    currency: ProductDtoCurrency.TRY,
    taxRate: 20,
    minOrderQuantity: 1,
    deliveryDays: 3,
    mainImageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop",
    createdAt: getDate(120),
    updatedAt: getRecentDate(12),
  },

  // 2. Aktif - Normal Stok
  {
    id: 2,
    supplierId: SUPPLIERS.OFFICE_PRO.id,
    supplierCompanyName: SUPPLIERS.OFFICE_PRO.name,
    categoryId: CATEGORIES.FURNITURE.id,
    categoryName: CATEGORIES.FURNITURE.name,
    name: "Ergonomik Ofis Koltuğu - Premium Seri",
    sku: "CHAIR-ERG-PREM-001",
    description:
      "Uzun süreli oturma için tasarlanmış ergonomik ofis koltuğu. Lumbar desteği, ayarlanabilir kol dayamaları, 360° dönebilme ve yükseklik ayarı özelliklerine sahiptir.",
    technicalSpecs:
      "Maksimum Ağırlık: 150kg, Yükseklik Aralığı: 95-115cm, Oturma Derinliği: 50cm, Malzeme: Mesh kumaş + deri, Garanti: 5 yıl",
    status: ProductDtoStatus.ACTIVE,
    stockTrackingType: ProductDtoStockTrackingType.LIMITED,
    stockQuantity: 42,
    minStockLevel: 20,
    basePrice: 3299.00,
    currency: ProductDtoCurrency.TRY,
    taxRate: 20,
    minOrderQuantity: 1,
    deliveryDays: 5,
    mainImageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    createdAt: getDate(90),
    updatedAt: getRecentDate(8),
  },

  // 3. Aktif - Düşük Stok (Uyarı)
  {
    id: 3,
    supplierId: SUPPLIERS.TECH_CORP.id,
    supplierCompanyName: SUPPLIERS.TECH_CORP.name,
    categoryId: CATEGORIES.ELECTRONICS.id,
    categoryName: CATEGORIES.ELECTRONICS.name,
    name: "Logitech MX Master 3S Kablosuz Mouse",
    sku: "LOG-MX3S-BLK",
    description:
      "Profesyonel kullanıcılar için tasarlanmış premium kablosuz mouse. 8000 DPI hassasiyet, 7 programlanabilir tuş, çoklu cihaz desteği ve 70 güne kadar pil ömrü.",
    technicalSpecs:
      "DPI: 200-8000 (ayarlanabilir), Bağlantı: Bluetooth 5.0 / USB-C, Pil Ömrü: 70 gün, Ağırlık: 141g, Boyutlar: 126x84x51mm",
    status: ProductDtoStatus.ACTIVE,
    stockTrackingType: ProductDtoStockTrackingType.LIMITED,
    stockQuantity: 8,
    minStockLevel: 10,
    basePrice: 1499.00,
    currency: ProductDtoCurrency.TRY,
    taxRate: 20,
    minOrderQuantity: 1,
    deliveryDays: 2,
    mainImageUrl: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=600&fit=crop",
    createdAt: getDate(60),
    updatedAt: getRecentDate(4),
  },

  // 4. Aktif - Normal Stok
  {
    id: 4,
    supplierId: SUPPLIERS.NETWORK_PLUS.id,
    supplierCompanyName: SUPPLIERS.NETWORK_PLUS.name,
    categoryId: CATEGORIES.NETWORK_EQUIPMENT.id,
    categoryName: CATEGORIES.NETWORK_EQUIPMENT.name,
    name: "Cisco Catalyst 2960-X 24-Port Switch",
    sku: "CISCO-C2960X-24",
    description:
      "Küçük ve orta ölçekli işletmeler için ideal yönetilebilir Layer 2+ switch. 24 Gigabit Ethernet portu, PoE+ desteği ve gelişmiş güvenlik özellikleri sunar.",
    technicalSpecs:
      "Portlar: 24x 10/100/1000BASE-T, PoE+ Budget: 370W, Throughput: 48 Gbps, Yönetim: Web, CLI, SNMP, Boyutlar: 44x44x4.4cm",
    status: ProductDtoStatus.ACTIVE,
    stockTrackingType: ProductDtoStockTrackingType.LIMITED,
    stockQuantity: 18,
    minStockLevel: 5,
    basePrice: 12499.00,
    currency: ProductDtoCurrency.TRY,
    taxRate: 20,
    minOrderQuantity: 1,
    deliveryDays: 7,
    mainImageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    createdAt: getDate(75),
    updatedAt: getRecentDate(6),
  },

  // 5. Aktif - Sınırsız Stok
  {
    id: 5,
    supplierId: SUPPLIERS.OFFICE_PRO.id,
    supplierCompanyName: SUPPLIERS.OFFICE_PRO.name,
    categoryId: CATEGORIES.STATIONERY.id,
    categoryName: CATEGORIES.STATIONERY.name,
    name: "A4 Fotokopi Kağıdı - 80gr/m² - 500 Sayfa",
    sku: "PAPER-A4-80G-500",
    description:
      "Yüksek kaliteli, parlak beyaz A4 fotokopi kağıdı. Lazer ve mürekkep püskürtmeli yazıcılar için uygundur. 80gr/m² gramajında, 500 sayfalık paket.",
    technicalSpecs:
      "Gramaj: 80g/m², Boyut: 210x297mm (A4), Renk: Parlak Beyaz, Paket: 500 sayfa, Uyumluluk: Tüm yazıcılar",
    status: ProductDtoStatus.ACTIVE,
    stockTrackingType: ProductDtoStockTrackingType.UNLIMITED,
    stockQuantity: 0,
    minStockLevel: 0,
    basePrice: 52.50,
    currency: ProductDtoCurrency.TRY,
    taxRate: 20,
    minOrderQuantity: 10,
    deliveryDays: 1,
    mainImageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop",
    createdAt: getDate(200),
    updatedAt: getRecentDate(2),
  },

  // 6. Stokta Yok
  {
    id: 6,
    supplierId: SUPPLIERS.MEGA_ELECTRONICS.id,
    supplierCompanyName: SUPPLIERS.MEGA_ELECTRONICS.name,
    categoryId: CATEGORIES.ELECTRONICS.id,
    categoryName: CATEGORIES.ELECTRONICS.name,
    name: "HP LaserJet Pro M404dn Yazıcı",
    sku: "HP-LJ-M404DN",
    description:
      "Küçük ofisler için ideal siyah-beyaz lazer yazıcı. Ağ bağlantısı, çift taraflı yazdırma, 38 sayfa/dakika hız ve 250 sayfalık kağıt tepsisi kapasitesi.",
    technicalSpecs:
      "Yazdırma Hızı: 38 sayfa/dk, Çözünürlük: 1200x1200 dpi, Kağıt Kapasitesi: 250 sayfa, Ağ: Ethernet, Boyutlar: 37x38x25cm",
    status: ProductDtoStatus.OUT_OF_STOCK,
    stockTrackingType: ProductDtoStockTrackingType.LIMITED,
    stockQuantity: 0,
    minStockLevel: 5,
    basePrice: 4899.00,
    currency: ProductDtoCurrency.TRY,
    taxRate: 20,
    minOrderQuantity: 1,
    deliveryDays: 14,
    mainImageUrl: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&h=600&fit=crop",
    createdAt: getDate(150),
    updatedAt: getRecentDate(24),
  },

  // 7. Pasif - Düşük Stok
  {
    id: 7,
    supplierId: SUPPLIERS.TECH_CORP.id,
    supplierCompanyName: SUPPLIERS.TECH_CORP.name,
    categoryId: CATEGORIES.ELECTRONICS.id,
    categoryName: CATEGORIES.ELECTRONICS.name,
    name: "Samsung Odyssey G5 27' QHD Monitör",
    sku: "SAMS-OD-G5-27",
    description:
      "Oyun ve profesyonel kullanım için 27 inç QHD monitör. 144Hz yenileme hızı, 1ms yanıt süresi, AMD FreeSync Premium ve eğimli tasarım.",
    technicalSpecs:
      "Ekran: 27' QHD (2560x1440), Yenileme: 144Hz, Yanıt Süresi: 1ms, Panel: VA, Parlaklık: 250 cd/m², Kontrast: 2500:1",
    status: ProductDtoStatus.PASSIVE,
    stockTrackingType: ProductDtoStockTrackingType.LIMITED,
    stockQuantity: 6,
    minStockLevel: 10,
    basePrice: 6999.00,
    currency: ProductDtoCurrency.TRY,
    taxRate: 20,
    minOrderQuantity: 1,
    deliveryDays: 5,
    mainImageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=600&fit=crop",
    createdAt: getDate(180),
    updatedAt: getRecentDate(36),
  },

  // 8. Üretimi Durduruldu
  {
    id: 8,
    supplierId: SUPPLIERS.SECURE_TECH.id,
    supplierCompanyName: SUPPLIERS.SECURE_TECH.name,
    categoryId: CATEGORIES.SECURITY.id,
    categoryName: CATEGORIES.SECURITY.name,
    name: "Hikvision DS-2CD2347G1-LU IP Kamera 4MP",
    sku: "HIK-DS2CD2347G1",
    description:
      "Dış mekan kullanımı için tasarlanmış 4MP IP kamera. Gece görüş, hareket algılama, su geçirmez (IP67) koruma ve 2.8mm lens ile geniş görüş açısı.",
    technicalSpecs:
      "Çözünürlük: 4MP (2688x1520), Lens: 2.8mm, Görüş Açısı: 100°, IR Mesafe: 30m, Koruma: IP67, Güç: PoE",
    status: ProductDtoStatus.DISCONTINUED,
    stockTrackingType: ProductDtoStockTrackingType.LIMITED,
    stockQuantity: 2,
    minStockLevel: 0,
    basePrice: 2199.00,
    currency: ProductDtoCurrency.TRY,
    taxRate: 20,
    minOrderQuantity: 1,
    deliveryDays: 0,
    mainImageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
    createdAt: getDate(300),
    updatedAt: getDate(45),
  },

  // 9. Aktif - Yüksek Stok
  {
    id: 9,
    supplierId: SUPPLIERS.OFFICE_PRO.id,
    supplierCompanyName: SUPPLIERS.OFFICE_PRO.name,
    categoryId: CATEGORIES.OFFICE_SUPPLIES.id,
    categoryName: CATEGORIES.OFFICE_SUPPLIES.name,
    name: "Steelcase Gesture Ofis Koltuğu",
    sku: "STL-GESTURE-BLK",
    description:
      "Modern ofisler için tasarlanmış premium ergonomik koltuk. 360° dönebilme, ayarlanabilir lumbar desteği, çoklu pozisyon desteği ve dayanıklı alüminyum yapı.",
    technicalSpecs:
      "Maksimum Ağırlık: 160kg, Yükseklik: 98-118cm, Oturma Derinliği: 48cm, Malzeme: Alüminyum + Mesh, Garanti: 12 yıl",
    status: ProductDtoStatus.ACTIVE,
    stockTrackingType: ProductDtoStockTrackingType.LIMITED,
    stockQuantity: 156,
    minStockLevel: 30,
    basePrice: 8999.00,
    currency: ProductDtoCurrency.TRY,
    taxRate: 20,
    minOrderQuantity: 1,
    deliveryDays: 7,
    mainImageUrl: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop",
    createdAt: getDate(45),
    updatedAt: getRecentDate(1),
  },

  // 10. Aktif - Normal Stok
  {
    id: 10,
    supplierId: SUPPLIERS.TECH_CORP.id,
    supplierCompanyName: SUPPLIERS.TECH_CORP.name,
    categoryId: CATEGORIES.ELECTRONICS.id,
    categoryName: CATEGORIES.ELECTRONICS.name,
    name: "Apple MacBook Pro 14' M3 Pro",
    sku: "APPLE-MBP14-M3P",
    description:
      "Profesyonel içerik üreticileri için güçlü MacBook Pro. 14.2 inç Liquid Retina XDR ekran, M3 Pro çip, 18GB birleşik bellek ve 512GB SSD depolama.",
    technicalSpecs:
      "İşlemci: Apple M3 Pro (12 çekirdek), RAM: 18GB, Depolama: 512GB SSD, Ekran: 14.2' Liquid Retina XDR, Pil: 70Wh, Ağırlık: 1.6kg",
    status: ProductDtoStatus.ACTIVE,
    stockTrackingType: ProductDtoStockTrackingType.LIMITED,
    stockQuantity: 23,
    minStockLevel: 10,
    basePrice: 69999.00,
    currency: ProductDtoCurrency.TRY,
    taxRate: 20,
    minOrderQuantity: 1,
    deliveryDays: 5,
    mainImageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
    createdAt: getDate(30),
    updatedAt: getRecentDate(3),
  },

  // 11. Aktif - Düşük Stok (Uyarı)
  {
    id: 11,
    supplierId: SUPPLIERS.FURNITURE_WORLD.id,
    supplierCompanyName: SUPPLIERS.FURNITURE_WORLD.name,
    categoryId: CATEGORIES.FURNITURE.id,
    categoryName: CATEGORIES.FURNITURE.name,
    name: "Standing Desk - Ayarlanabilir Yükseklikli Masa",
    sku: "DESK-STAND-120",
    description:
      "Sağlıklı çalışma için elektrikli ayarlanabilir yükseklikli masa. 120x60cm çalışma yüzeyi, 65-125cm yükseklik aralığı, hafıza ayarları ve sessiz motor.",
    technicalSpecs:
      "Boyutlar: 120x60cm, Yükseklik: 65-125cm, Maksimum Yük: 80kg, Motor: Elektrikli (2 motor), Malzeme: MDF + Metal, Garanti: 5 yıl",
    status: ProductDtoStatus.ACTIVE,
    stockTrackingType: ProductDtoStockTrackingType.LIMITED,
    stockQuantity: 7,
    minStockLevel: 10,
    basePrice: 5499.00,
    currency: ProductDtoCurrency.TRY,
    taxRate: 20,
    minOrderQuantity: 1,
    deliveryDays: 10,
    mainImageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    createdAt: getDate(100),
    updatedAt: getRecentDate(5),
  },

  // 12. Aktif - Normal Stok
  {
    id: 12,
    supplierId: SUPPLIERS.NETWORK_PLUS.id,
    supplierCompanyName: SUPPLIERS.NETWORK_PLUS.name,
    categoryId: CATEGORIES.NETWORK_EQUIPMENT.id,
    categoryName: CATEGORIES.NETWORK_EQUIPMENT.name,
    name: "TP-Link Omada EAP660 HD WiFi 6 Access Point",
    sku: "TPL-OMADA-EAP660",
    description:
      "Yüksek performanslı WiFi 6 erişim noktası. 4800 Mbps toplam hız, 8x8 MU-MIMO, PoE+ güç desteği ve merkezi yönetim uyumluluğu.",
    technicalSpecs:
      "WiFi Standardı: 802.11ax (WiFi 6), Hız: 4800 Mbps (2.4GHz + 5GHz), Anten: 8x8 MU-MIMO, Güç: PoE+ (802.3at), Kullanıcı: 200+",
    status: ProductDtoStatus.ACTIVE,
    stockTrackingType: ProductDtoStockTrackingType.LIMITED,
    stockQuantity: 31,
    minStockLevel: 15,
    basePrice: 3499.00,
    currency: ProductDtoCurrency.TRY,
    taxRate: 20,
    minOrderQuantity: 1,
    deliveryDays: 4,
    mainImageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    createdAt: getDate(50),
    updatedAt: getRecentDate(2),
  },
];

/**
 * Mock API Response
 * Sayfalanmış ürün listesi response'u
 */
export const mockProductsApiResponse = {
  success: true,
  message: "Ürünler başarıyla getirildi",
  data: {
    totalElements: mockProducts.length,
    totalPages: 1,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    first: true,
    last: true,
    numberOfElements: mockProducts.length,
    pageable: {
      sort: {
        empty: true,
        sorted: false,
        unsorted: true,
      },
      paged: true,
      pageNumber: 0,
      pageSize: 20,
      unpaged: false,
      offset: 0,
    },
    size: 20,
    content: mockProducts,
    number: 0,
    empty: false,
  },
  errors: [],
  timestamp: new Date().toISOString(),
  path: "/supply/products/search",
};
