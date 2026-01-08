"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponsePageSupplierDto } from "@/types";

/**
 * Mock tedarikçi datası - Backend hatası durumunda kullanılır
 */
const mockSuppliersData: ApiResponsePageSupplierDto = {
  success: true,
  message: "Mock data - Backend hatası nedeniyle örnek veri gösteriliyor",
  data: {
    content: [
      {
        id: 1,
        companyName: "Teknoloji A.Ş.",
        taxNumber: "1234567890",
        email: "info@teknoloji.com",
        phone: "+90 212 555 1234",
        address: "İstanbul, Türkiye",
        isActive: true,
        description: "Teknoloji ürünleri tedarikçisi",
        averageRating: 4.5,
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-12-01T15:30:00Z",
      },
      {
        id: 2,
        companyName: "Kırtasiye Ltd. Şti.",
        taxNumber: "0987654321",
        email: "satis@kirtasiye.com",
        phone: "+90 312 555 5678",
        address: "Ankara, Türkiye",
        isActive: true,
        description: "Eğitim malzemeleri ve kırtasiye ürünleri",
        averageRating: 4.8,
        createdAt: "2024-02-20T08:30:00Z",
        updatedAt: "2024-11-28T12:15:00Z",
      },
      {
        id: 3,
        companyName: "Mobilya ve Ekipman A.Ş.",
        taxNumber: "1122334455",
        email: "contact@mobilya.com",
        phone: "+90 216 555 9012",
        address: "İzmir, Türkiye",
        isActive: true,
        description: "Eğitim mobilyaları ve sınıf ekipmanları",
        averageRating: 4.2,
        createdAt: "2024-03-10T14:20:00Z",
        updatedAt: "2024-12-05T09:45:00Z",
      },
      {
        id: 4,
        companyName: "Yayınevi Dağıtım",
        taxNumber: "5544332211",
        email: "destek@yayinevi.com",
        phone: "+90 232 555 3456",
        address: "Bursa, Türkiye",
        isActive: false,
        description: "Ders kitapları ve eğitim yayınları",
        averageRating: 3.9,
        createdAt: "2024-04-05T11:00:00Z",
        updatedAt: "2024-10-15T16:20:00Z",
      },
      {
        id: 5,
        companyName: "Dijital Eğitim Çözümleri",
        taxNumber: "9988776655",
        email: "info@dijitelegitim.com",
        phone: "+90 242 555 7890",
        address: "Antalya, Türkiye",
        isActive: true,
        description: "Eğitim yazılımları ve dijital içerik",
        averageRating: 4.7,
        createdAt: "2024-05-12T09:15:00Z",
        updatedAt: "2024-12-03T14:00:00Z",
      },
    ],
    totalElements: 5,
    totalPages: 1,
    size: 10,
    number: 0,
    numberOfElements: 5,
    first: true,
    last: true,
    empty: false,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    pageable: {
      offset: 0,
      pageNumber: 0,
      pageSize: 10,
      paged: true,
      unpaged: false,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
    },
  },
  timestamp: new Date().toISOString(),
  path: "/supply/suppliers",
};

/**
 * Tüm tedarikçileri getirir
 *
 * @param params - Sayfalama parametreleri
 * @returns Tedarikçiler listesi
 *
 * API Endpoint: GET /supply/suppliers
 * Example: https://api.egitimiste.com/api/supply/suppliers
 *
 * Not: Backend hatası durumunda mock data döndürür
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

  // Hata durumunda mock data döndür
  if (result.error) {
    return {
      ...result,
      data: mockSuppliersData,
      error: undefined,
    };
  }

  return result;
};
