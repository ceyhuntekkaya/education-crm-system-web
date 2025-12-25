/**
 * Order DTO - Sipariş detayları
 * API: GET /supply/orders/by-company/{companyId}
 */
export interface OrderDto {
  id?: number;
  orderNumber?: string;
  quotationId?: number;
  companyId?: number;
  companyName?: string;
  supplierId?: number;
  supplierCompanyName?: string;
  supplierName?: string;
  status?: string; // PENDING, CONFIRMED, PREPARING, SHIPPED, DELIVERED, CANCELLED, RETURNED
  subtotal?: number;
  taxAmount?: number;
  totalAmount?: number;
  currency?: string; // TRY, USD, EUR, GBP, SAR, AED, QAR, KWD, BHD
  deliveryAddress?: string;
  expectedDeliveryDate?: string; // ISO 8601
  actualDeliveryDate?: string; // ISO 8601
  notes?: string;
  invoiceNumber?: string;
  trackingNumber?: string;
  createdAt?: string; // ISO 8601
  updatedAt?: string; // ISO 8601
  orderDate?: string; // ISO 8601
  itemCount?: number;
  items?: any[];
}

/**
 * Paginated Order Response
 * Sayfalanmış sipariş listesi
 */
export interface PageOrderDto {
  content?: OrderDto[];
  totalElements?: number;
  totalPages?: number;
  size?: number;
  number?: number; // 0-indexed
  first?: boolean;
  last?: boolean;
}
