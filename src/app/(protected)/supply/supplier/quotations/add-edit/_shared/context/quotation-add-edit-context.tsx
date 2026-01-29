"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
} from "react";
import { useParams, useSearchParams } from "next/navigation";
import { QuotationAddEditContextType } from "../types";
import {
  useQuotationById,
  useAddQuotation,
  useEditQuotation,
  useQuotationItems,
  useAddQuotationItem,
  useEditQuotationItem,
} from "../hooks";
import { isValidEditId, parseEditId } from "../utils";
import { useQuotationsContext } from "../../../_shared/contexts";
import { useRfqItems } from "../../../items/[id]/add-edit/_shared/hooks";

/**
 * QuotationAddEditContext
 */
const QuotationAddEditContext = createContext<
  QuotationAddEditContextType | undefined
>(undefined);

interface QuotationAddEditProviderProps {
  children: ReactNode;
}

export const QuotationAddEditProvider: React.FC<
  QuotationAddEditProviderProps
> = ({ children }) => {
  // Item totals state - Her item form'daki toplam fiyatları takip eder
  const [itemTotals, setItemTotals] = useState<Map<number | string, number>>(
    new Map(),
  );

  // Supplier ID - TODO: Get from auth context
  const supplierId = 1;

  const params = useParams();
  const searchParams = useSearchParams();
  const { id } = params;

  // RFQ ID'yi query string'den al (yeni quotation oluştururken)
  const rfqIdParam = searchParams?.get("rfqId");
  const rfqId = rfqIdParam ? parseInt(rfqIdParam, 10) : null;

  // ID parsing and edit mode determination
  const isEditing = isValidEditId(id);
  const quotationId = parseEditId(id);

  // Quotation data hook
  const {
    quotation,
    isLoading: quotationLoading,
    error: quotationError,
    refetch,
  } = useQuotationById(quotationId);

  // Add Quotation hook
  const {
    postQuotation,
    isLoading: addLoading,
    error: addError,
  } = useAddQuotation();

  // Edit Quotation hook - refetch'i props olarak geçir
  const {
    putQuotation,
    isLoading: editLoading,
    error: editError,
  } = useEditQuotation({
    quotationId: quotationId || 0,
    refetch: isEditing ? refetch : undefined,
  });

  // RFQ Items hook - Quotation'a ait RFQ itemlarını getir
  const {
    rfqItems,
    loading: rfqItemsLoading,
    error: rfqItemsError,
  } = useRfqItems({
    rfqId: rfqId || quotation?.rfqId || undefined,
    enabled: !!(rfqId || quotation?.rfqId),
  });

  // Quotation Items hook - Quotation'a ait quotation itemlarını getir (düzenleme modunda)
  const {
    quotationItems,
    loading: quotationItemsLoading,
    error: quotationItemsError,
    refetch: refetchQuotationItems,
  } = useQuotationItems({
    quotationId: quotationId,
    enabled: isEditing && !!quotationId,
  });

  // Add Quotation Item hook - Context'ten item ekleme fonksiyonu sağla
  const {
    postItem,
    isLoading: addItemLoading,
    error: addItemError,
  } = useAddQuotationItem({
    onSuccess: () => {
      // Not: Teklif verildikten sonra /supply/supplier/quotations'a yönlendirildiği için
      // burada refetch yapmaya gerek yok. Liste sayfası kendi refetch'ini yapacak.
      // refetchQuotationItems();
    },
  });

  // Edit Quotation Item hook - Context'ten item güncelleme fonksiyonu sağla
  const {
    putItem: putQuotationItem,
    isLoading: editItemLoading,
    error: editItemError,
  } = useEditQuotationItem({
    quotationId: quotationId,
    onSuccess: () => {
      refetchQuotationItems();
    },
  });

  // Item total güncelleme fonksiyonu - Her item form'dan çağrılır
  const updateItemTotal = (itemKey: number | string, totalPrice: number) => {
    setItemTotals((prev) => {
      const newMap = new Map(prev);
      newMap.set(itemKey, totalPrice);
      return newMap;
    });
  };

  // Tüm item formlarındaki toplam fiyatları topla
  const totalItemsAmount = useMemo(() => {
    let total = 0;
    itemTotals.forEach((price) => {
      total += price;
    });
    return total;
  }, [itemTotals]);

  const contextValue: QuotationAddEditContextType = {
    // RFQ ID
    rfqId,

    // Supplier ID
    supplierId,

    // Current Quotation data
    quotation: quotation || null,
    quotationDetailLoading: quotationLoading, // Sadece veri çekerken
    quotationSubmitLoading: addLoading || editLoading, // Form submit edilirken
    quotationError:
      quotationError?.toString() ||
      addError?.toString() ||
      editError?.toString() ||
      null,

    // RFQ Items data
    rfqItems: rfqItems || [],
    rfqItemsLoading,
    rfqItemsError: rfqItemsError?.toString() || null,

    // Quotation Items data
    quotationItems: quotationItems || [],
    quotationItemsLoading,
    quotationItemsError: quotationItemsError?.toString() || null,
    quotationItemSubmitLoading: addItemLoading || editItemLoading,
    quotationItemSubmitError:
      addItemError?.toString() || editItemError?.toString() || null,
    totalItemsAmount, // Tüm itemların toplam fiyatı

    // Edit mode state
    isEditing,
    quotationId: quotationId?.toString() || null,

    // Actions
    fetchQuotation: refetch,
    postQuotation,
    putQuotation,
    refetchQuotationItems,
    postQuotationItem: postItem,
    putQuotationItem,
    updateItemTotal, // Item form'lardan toplam fiyat güncellemek için
  };

  return (
    <QuotationAddEditContext.Provider value={contextValue}>
      {children}
    </QuotationAddEditContext.Provider>
  );
};

export const useQuotationAddEdit = () => {
  const context = useContext(QuotationAddEditContext);
  if (context === undefined) {
    throw new Error(
      "useQuotationAddEdit must be used within a QuotationAddEditProvider",
    );
  }
  return context;
};
