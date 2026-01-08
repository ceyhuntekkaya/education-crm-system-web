"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponsePageSupplierDto } from "@/types";

// ================== MOCK DATA ==================

const MOCK_SUPPLIERS_DATA: ApiResponsePageSupplierDto = {
  success: true,
  message: "Tedarikçiler başarıyla getirildi (Mock Data)",
  data: {
    totalElements: 15,
    totalPages: 2,
    first: true,
    last: false,
    numberOfElements: 10,
    size: 10,
    number: 0,
    empty: false,
    content: [
      {
        id: 1,
        companyName: "ABC Eğitim Malzemeleri A.Ş.",
        taxNumber: "1234567890",
        email: "info@abcegitim.com",
        phone: "+90 212 555 0101",
        address: "Maslak, İstanbul",
        isActive: true,
        description: "Eğitim malzemeleri ve kırtasiye tedarikçisi",
        averageRating: 4.5,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2025-12-20T14:45:00Z",
      },
      {
        id: 2,
        companyName: "XYZ Teknoloji Ltd. Şti.",
        taxNumber: "9876543210",
        email: "sales@xyztech.com",
        phone: "+90 216 444 2020",
        address: "Kadıköy, İstanbul",
        isActive: true,
        description: "Teknoloji ürünleri ve bilgisayar malzemeleri",
        averageRating: 4.8,
        createdAt: "2024-02-20T09:15:00Z",
        updatedAt: "2026-01-05T11:20:00Z",
      },
      {
        id: 3,
        companyName: "Mega Mobilya San. Tic.",
        taxNumber: "5555444433",
        email: "info@megamobilya.com",
        phone: "+90 312 888 7777",
        address: "Çankaya, Ankara",
        isActive: true,
        description: "Okul mobilyaları ve oturma grupları",
        averageRating: 4.2,
        createdAt: "2024-03-10T13:45:00Z",
        updatedAt: "2025-11-30T16:10:00Z",
      },
      {
        id: 4,
        companyName: "Yıldız Temizlik Ürünleri",
        taxNumber: "3333222211",
        email: "satis@yildiztemizlik.com",
        phone: "+90 232 777 6666",
        address: "Bornova, İzmir",
        isActive: true,
        description: "Temizlik ve hijyen ürünleri tedarikçisi",
        averageRating: 4.0,
        createdAt: "2024-04-05T08:00:00Z",
        updatedAt: "2025-12-15T09:30:00Z",
      },
      {
        id: 5,
        companyName: "Beyaz Kağıt ve Matbaa",
        taxNumber: "7777888899",
        email: "info@beyazkagit.com",
        phone: "+90 224 999 8888",
        address: "Nilüfer, Bursa",
        isActive: false,
        description: "Kağıt ürünleri ve matbaa hizmetleri",
        averageRating: 3.8,
        createdAt: "2024-05-12T10:20:00Z",
        updatedAt: "2025-09-10T12:00:00Z",
      },
      {
        id: 6,
        companyName: "Profesyonel Spor Malzemeleri",
        taxNumber: "1111222233",
        email: "siparis@prosporr.com",
        phone: "+90 242 555 4444",
        address: "Konyaaltı, Antalya",
        isActive: true,
        description: "Spor salonu ve oyun alanı ekipmanları",
        averageRating: 4.6,
        createdAt: "2024-06-18T15:30:00Z",
        updatedAt: "2025-12-28T10:15:00Z",
      },
      {
        id: 7,
        companyName: "Güvenlik Sistemleri A.Ş.",
        taxNumber: "9999888877",
        email: "info@guvenliktekno.com",
        phone: "+90 312 666 5555",
        address: "Yenimahalle, Ankara",
        isActive: true,
        description: "Güvenlik kamera ve alarm sistemleri",
        averageRating: 4.7,
        createdAt: "2024-07-22T11:00:00Z",
        updatedAt: "2026-01-03T14:25:00Z",
      },
      {
        id: 8,
        companyName: "Tasarım Lab Atölye",
        taxNumber: "4444555566",
        email: "hello@tasarimlab.com",
        phone: "+90 216 333 2222",
        address: "Moda, İstanbul",
        isActive: true,
        description: "Eğitim materyalleri ve özel tasarım ürünler",
        averageRating: 4.9,
        createdAt: "2024-08-30T09:45:00Z",
        updatedAt: "2025-12-25T13:50:00Z",
      },
      {
        id: 9,
        companyName: "Bilim ve Deney Malzemeleri",
        taxNumber: "6666777788",
        email: "lab@bilimdeney.com",
        phone: "+90 232 444 3333",
        address: "Karşıyaka, İzmir",
        isActive: true,
        description: "Laboratuvar ve bilim deneyi malzemeleri",
        averageRating: 4.3,
        createdAt: "2024-09-14T12:30:00Z",
        updatedAt: "2025-11-20T15:40:00Z",
      },
      {
        id: 10,
        companyName: "Yeşil Bahçe Peyzaj",
        taxNumber: "2222333344",
        email: "info@yesilbahce.com",
        phone: "+90 242 777 8888",
        address: "Muratpaşa, Antalya",
        isActive: false,
        description: "Bahçe düzenleme ve peyzaj hizmetleri",
        averageRating: 3.9,
        createdAt: "2024-10-08T14:15:00Z",
        updatedAt: "2025-08-30T11:00:00Z",
      },
    ],
  },
  timestamp: new Date().toISOString(),
  path: "/supply/suppliers",
};

// ================== API HOOKS ==================

/**
 * Tüm tedarikçileri getirir
 *
 * @param params - Sayfalama parametreleri
 * @returns Tedarikçiler listesi
 *
 * API Endpoint: GET /supply/suppliers
 */
export const useGetAllSuppliers = (
  params?: Record<string, unknown>,
  options?: { enabled?: boolean }
) => {
  const result = useGet<ApiResponsePageSupplierDto>(
    API_ENDPOINTS.SUPPLY.SUPPLIERS.GET_ALL,
    {
      params,
      enabled: options?.enabled ?? true,
    }
  );

  // API'den hata gelirse sadece data'yı mock data ile değiştir
  // Error state'ini koru ki kullanıcı hata olduğunu bilsin
  if (result.error) {
    return {
      ...result,
      data: MOCK_SUPPLIERS_DATA,
    };
  }

  return result;
};
