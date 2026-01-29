"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useParams } from "next/navigation";
import { ProductAddEditContextType } from "../types";
import { useProductsContext } from "../../../_shared/contexts";
import {
  useAddProduct,
  useEditProduct,
  useCategoryOptions,
  useCreateProductImage,
  useDeleteProductImage,
  useAddProductDiscount,
  useEditProductDiscount,
  useDeleteProductDiscount,
  useAddProductVariant,
  useEditProductVariant,
  useDeleteProductVariant,
} from "../hooks";
import { isValidEditId, parseEditId } from "../utils";
import {
  ProductImageCreateDto,
  ProductDiscountCreateDto,
  ProductDiscountUpdateDto,
  ProductVariantCreateDto,
  ProductVariantUpdateDto,
} from "@/types";

/**
 * ProductAddEditContext
 */
const ProductAddEditContext = createContext<
  ProductAddEditContextType | undefined
>(undefined);

interface ProductAddEditProviderProps {
  children: ReactNode;
}

export const ProductAddEditProvider: React.FC<ProductAddEditProviderProps> = ({
  children,
}) => {
  // Supplier ID - TODO: Get from auth context
  const supplierId = 1;
  const params = useParams();
  const { id } = params;

  // Ana products context'ten sadece gerekli verileri al
  const { setCurrentProductId } = useProductsContext();

  // ID parsing and edit mode determination
  const isEditing = isValidEditId(id);
  const productId = parseEditId(id);

  // Current product ID'yi context'e set et
  useEffect(() => {
    setCurrentProductId(productId);
  }, [productId, setCurrentProductId]);

  // Editing Discount ID state - Form için hangi discount düzenleniyor
  const [editingDiscountId, setEditingDiscountId] = useState<number | null>(
    null,
  );

  // Editing Variant ID state - Form için hangi variant düzenleniyor
  const [editingVariantId, setEditingVariantId] = useState<number | null>(null);

  // Add Product hook
  const {
    postProduct,
    isLoading: addLoading,
    error: addError,
  } = useAddProduct();

  // Edit Product hook
  const {
    putProduct,
    isLoading: editLoading,
    error: editError,
  } = useEditProduct();

  // Category options hook
  const { categoryOptions, isLoading: categoriesLoading } =
    useCategoryOptions();

  // Create Product Image hook
  const { createProductImage, isLoading: createProductImageLoading } =
    useCreateProductImage();

  // Delete Product Image hook
  const { deleteProductImage, isLoading: deleteProductImageLoading } =
    useDeleteProductImage();

  // Add Product Discount hook
  const { postProductDiscount, isLoading: addDiscountLoading } =
    useAddProductDiscount();

  // Edit Product Discount hook
  const { updateProductDiscount, isLoading: editDiscountLoading } =
    useEditProductDiscount();

  // Delete Product Discount hook
  const { deleteProductDiscount, isLoading: deleteDiscountLoading } =
    useDeleteProductDiscount();

  // Add Product Variant hook
  const { postProductVariant, isLoading: addVariantLoading } =
    useAddProductVariant();

  // Edit Product Variant hook
  const { updateProductVariant, isLoading: editVariantLoading } =
    useEditProductVariant();

  // Delete Product Variant hook
  const { deleteProductVariant, isLoading: deleteVariantLoading } =
    useDeleteProductVariant();

  const contextValue: ProductAddEditContextType = {
    // Supplier ID
    supplierId,

    // Loading states
    productSubmitLoading: addLoading || editLoading, // Form submit edilirken
    productError: addError?.toString() || editError?.toString() || null,

    // Edit mode state
    isEditing,
    productId: productId?.toString() || null,

    // Category options
    categoryOptions,
    categoriesLoading,

    // Actions
    postProduct,
    putProduct,

    // Product Image Actions
    createProductImage: async (data: ProductImageCreateDto) => {
      const result = await createProductImage(data);
      return result?.data || null;
    },
    createProductImageLoading,
    deleteProductImage: async (imageId: number) => {
      await deleteProductImage(imageId);
    },
    deleteProductImageLoading,

    // Product Discount Actions
    addDiscountLoading,
    editDiscountLoading,
    deleteDiscountLoading,
    editingDiscountId,
    setEditingDiscountId: (id: number | null) => {
      setEditingDiscountId(id);
    },
    postProductDiscount: (data: ProductDiscountCreateDto) =>
      postProductDiscount(data),
    putProductDiscount: (discountId: number, data: ProductDiscountUpdateDto) =>
      updateProductDiscount(discountId, data),
    deleteProductDiscount: (discountId: number) =>
      deleteProductDiscount(discountId),

    // Product Variant Actions
    addVariantLoading,
    editVariantLoading,
    deleteVariantLoading,
    editingVariantId,
    setEditingVariantId: (id: number | null) => {
      setEditingVariantId(id);
    },
    postProductVariant: (data: ProductVariantCreateDto) =>
      postProductVariant(data),
    putProductVariant: (variantId: number, data: ProductVariantUpdateDto) =>
      updateProductVariant(variantId, data),
    deleteProductVariant: (variantId: number) =>
      deleteProductVariant(variantId),
  };

  return (
    <ProductAddEditContext.Provider value={contextValue}>
      {children}
    </ProductAddEditContext.Provider>
  );
};

export const useProductAddEdit = () => {
  const context = useContext(ProductAddEditContext);
  if (context === undefined) {
    throw new Error(
      "useProductAddEdit must be used within a ProductAddEditProvider",
    );
  }
  return context;
};
