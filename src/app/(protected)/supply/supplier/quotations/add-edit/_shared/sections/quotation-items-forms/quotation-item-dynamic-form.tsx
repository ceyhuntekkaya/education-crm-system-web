"use client";

import React, {
  useEffect,
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { CustomCard } from "@/components";
import { FormProvider } from "@/contexts/form-context";
import {
  Form,
  FormInput,
  FormTextarea,
  FormAutocomplete,
} from "@/components/forms";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import type {
  RFQItemDto,
  QuotationItemCreateDto,
  QuotationItemUpdateDto,
} from "@/types";
import {
  validationSchema,
  initialValues,
} from "../../../../items/[id]/add-edit/_shared/sections/item-form/schemas";
import type { QuotationItemFormData } from "../../../../items/[id]/add-edit/_shared/sections/item-form/types";
import { useQuotationAddEdit } from "../../context";

// Birim seçenekleri - Component dışında tanımla (her render'da yeni referans olmasını önlemek için)
const UNIT_OPTIONS = [
  { value: "ADET", label: "Adet" },
  { value: "KG", label: "Kilogram" },
  { value: "LT", label: "Litre" },
  { value: "M", label: "Metre" },
  { value: "M2", label: "Metrekare" },
  { value: "M3", label: "Metreküp" },
  { value: "PAKET", label: "Paket" },
  { value: "KUTU", label: "Kutu" },
];

interface QuotationItemDynamicFormProps {
  rfqItem: RFQItemDto;
  index: number;
}

/**
 * Quotation Item Dynamic Form - Her RFQ item için bir form
 */
export const QuotationItemDynamicForm = forwardRef<
  QuotationItemFormHandle,
  QuotationItemDynamicFormProps
>(({ rfqItem, index }, ref) => {
  // Context'ten gerekli verileri ve fonksiyonları al
  const {
    quotation,
    isEditing,
    quotationItems,
    quotationItemsLoading,
    quotationItemSubmitLoading,
    quotationItemSubmitError,
    postQuotationItem,
    putQuotationItem,
    updateItemTotal, // Toplam fiyat güncellemek için
  } = useQuotationAddEdit();

  // Bu RFQ item'a karşılık gelen quotation item'ı bul
  const existingItem = useMemo(() => {
    if (!isEditing || !quotationItems || quotationItems.length === 0) {
      return null;
    }
    return quotationItems.find((item) => item.rfqItemId === rfqItem.id) || null;
  }, [isEditing, quotationItems, rfqItem.id]);

  // Initial values - RFQ item'dan veya mevcut quotation item'dan
  const formInitialValues: QuotationItemFormData = existingItem
    ? {
        rfqItemId: existingItem.rfqItemId,
        itemName: existingItem.itemName || "",
        specifications: existingItem.specifications || "",
        quantity: existingItem.quantity || 0,
        unit: existingItem.unit || "",
        unitPrice: existingItem.unitPrice || 0,
        discountAmount: existingItem.discountAmount || 0,
        totalPrice: existingItem.totalPrice || 0,
        deliveryDays: existingItem.deliveryDays || 0,
        notes: existingItem.notes || "",
      }
    : {
        ...initialValues,
        rfqItemId: rfqItem.id,
        itemName: rfqItem.itemName || "",
        specifications: rfqItem.specifications || "",
        quantity: rfqItem.quantity || 0,
        unit: rfqItem.unit || "",
      };

  return (
    <CustomCard
      title={`Kalem ${index + 1}: ${rfqItem.itemName || "İsimsiz Kalem"}`}
      subtitle={rfqItem.specifications || "Özellik bilgisi yok"}
      isLoading={quotationItemsLoading}
    >
      <FormProvider
        initialValues={formInitialValues}
        validationSchema={validationSchema}
      >
        <ItemFormContent
          ref={ref}
          rfqItem={rfqItem}
          quotationId={quotation?.id || null}
          existingItem={existingItem}
          postItem={postQuotationItem}
          putItem={putQuotationItem}
          isSubmitting={quotationItemSubmitLoading}
          submitError={quotationItemSubmitError}
          unitOptions={UNIT_OPTIONS}
          updateItemTotal={updateItemTotal}
          itemKey={existingItem?.id || `rfq-${rfqItem.id}`}
        />
      </FormProvider>
    </CustomCard>
  );
});

QuotationItemDynamicForm.displayName = "QuotationItemDynamicForm";

/**
 * Form content component
 */
export interface QuotationItemFormHandle {
  submitForm: (quotationId: number) => Promise<void>;
}

interface ItemFormContentProps {
  rfqItem: RFQItemDto;
  quotationId: number | null;
  existingItem: any;
  postItem: (quotationId: number, data: QuotationItemCreateDto) => Promise<any>;
  putItem: (itemId: number, data: QuotationItemUpdateDto) => Promise<any>;
  isSubmitting: boolean;
  submitError: string | null;
  unitOptions: Array<{ value: string; label: string }>;
  updateItemTotal: (itemKey: number | string, totalPrice: number) => void;
  itemKey: number | string;
}

const ItemFormContent = forwardRef<
  QuotationItemFormHandle,
  ItemFormContentProps
>(
  (
    {
      rfqItem,
      quotationId,
      existingItem,
      postItem,
      putItem,
      isSubmitting,
      submitError: externalSubmitError,
      unitOptions,
      updateItemTotal,
      itemKey,
    },
    ref,
  ) => {
    const { values, setValue } = useForm();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [priceCalculationText, setPriceCalculationText] =
      useState<string>("");
    const prevTotalPriceRef = React.useRef<number | null>(null);

    // External error'ı internal state'e yansıt
    useEffect(() => {
      if (externalSubmitError) {
        setSubmitError(externalSubmitError);
      }
    }, [externalSubmitError]);

    // Form values'lardan sadece gerekli değerleri al (her render'da aynı referansı kullanmak için)
    const formValues = values as QuotationItemFormData;
    const quantity = formValues.quantity;
    const unitPrice = formValues.unitPrice;
    const discountAmount = formValues.discountAmount;

    // Quantity, unitPrice ve discountAmount değiştiğinde totalPrice'ı hesapla
    useEffect(() => {
      const qty = Number(quantity) || 0;
      const price = Number(unitPrice) || 0;
      const discountPercent = Number(discountAmount) || 0; // Artık yüzde olarak

      // Ara toplam: Miktar x Birim Fiyat
      const subtotal = qty * price;

      // İndirim tutarı: Ara toplam x (İndirim Yüzdesi / 100)
      const discount = subtotal * (discountPercent / 100);

      // Toplam: Ara Toplam - İndirim Tutarı
      const total = Math.max(0, subtotal - discount);

      // Helper text oluştur
      if (qty > 0 && price > 0) {
        const formattedSubtotal = subtotal.toLocaleString("tr-TR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        const formattedDiscountAmount = discount.toLocaleString("tr-TR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        const formattedTotal = total.toLocaleString("tr-TR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        if (discountPercent > 0) {
          setPriceCalculationText(
            `${qty.toLocaleString("tr-TR")} birim x ${price.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} ₺ = ${formattedSubtotal} ₺ - %${discountPercent} indirim (${formattedDiscountAmount} ₺) = ${formattedTotal} ₺`,
          );
        } else {
          setPriceCalculationText(
            `${qty.toLocaleString("tr-TR")} birim x ${price.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} ₺ = ${formattedTotal} ₺`,
          );
        }
      } else {
        setPriceCalculationText("");
      }

      // Sadece total değeri değiştiyse setValue'yu çağır
      if (prevTotalPriceRef.current !== total) {
        prevTotalPriceRef.current = total;
        setValue("totalPrice", total);
      }

      // Context'e bu item'ın toplam fiyatını bildir
      updateItemTotal(itemKey, total);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantity, unitPrice, discountAmount, itemKey]);

    const handleSubmit = async (quotationIdParam: number, values: any) => {
      const formData = values as QuotationItemFormData;
      setSubmitError(null);

      try {
        // API'nin beklediği formata göre sadece gerekli alanları gönder
        const createData: QuotationItemCreateDto = {
          rfqItemId: formData.rfqItemId,
          itemName: formData.itemName?.trim() || rfqItem.itemName || "Ürün Adı",
          quantity: formData.quantity || 0,
          unitPrice: formData.unitPrice || 0,
          discountAmount: formData.discountAmount || undefined,
        };

        console.log("📤 Item POST ediliyor:", {
          quotationId: quotationIdParam,
          data: createData,
        });

        await postItem(quotationIdParam, createData);

        console.log("✅ Item başarıyla eklendi");
      } catch (error) {
        console.error("❌ Item eklenirken hata:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Kaydetme hatası oluştu";
        setSubmitError(errorMessage);
        throw error; // Re-throw to parent
      }
    };

    // Expose submit method to parent
    useImperativeHandle(ref, () => ({
      submitForm: async (quotationIdParam: number) => {
        return handleSubmit(quotationIdParam, values);
      },
    }));

    return (
      <Form onSubmit={() => {}}>
        <div className="row row-gap-24">
          {/* <div className="col-6">
            <FormInput
              name="itemName"
              label="Kalem Adı"
              type="text"
              placeholder="Kalem adını giriniz..."
              isRequired
            />
          </div> */}

          <div className="col-4">
            <FormInput
              name="totalPrice"
              label="Toplam Fiyat (₺)"
              type="number"
              placeholder="Toplam fiyat"
              step="0.01"
              disabled
              helperText={
                priceCalculationText ||
                "Miktar ve birim fiyat girildiğinde otomatik hesaplanır"
              }
            />
          </div>

          <div className="col-2">
            <FormInput
              name="quantity"
              label="Miktar"
              type="number"
              placeholder="Miktar giriniz..."
              isRequired
            />
          </div>

          <div className="col-2">
            <FormAutocomplete
              name="unit"
              label="Birim"
              options={unitOptions}
              placeholder="Birim seçiniz..."
            />
          </div>

          <div className="col-2">
            <FormInput
              name="unitPrice"
              label="Birim Fiyat (₺)"
              type="number"
              placeholder="Birim fiyatı giriniz..."
              step="0.01"
              isRequired
            />
          </div>

          <div className="col-2">
            <FormInput
              name="discountAmount"
              label="İndirim Oranı (%)"
              type="number"
              placeholder="İndirim oranını giriniz..."
              step="0.01"
              min="0"
              max="100"
            />
          </div>

          <div className="col-12">
            <FormTextarea
              name="specifications"
              label="Özellikler"
              placeholder="Kalem özelliklerini giriniz..."
              rows={3}
            />
          </div>

          {/* <div className="col-12">
            <FormInput
              name="deliveryDays"
              label="Teslimat Süresi (Gün)"
              type="number"
              placeholder="Teslimat süresini giriniz..."
            />
          </div>

          <div className="col-12">
            <FormTextarea
              name="notes"
              label="Notlar"
              placeholder="Ek notlarınızı giriniz..."
              rows={3}
            />
          </div> */}

          {/* ERROR MESSAGE */}
          {submitError && (
            <div className="col-12">
              <div className="alert alert-danger">{submitError}</div>
            </div>
          )}
        </div>
      </Form>
    );
  },
);

ItemFormContent.displayName = "ItemFormContent";
