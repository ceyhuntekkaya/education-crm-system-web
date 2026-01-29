import type {
  ProductDto,
  ProductCreateDto,
  ProductUpdateDto,
  ProductImageDto,
  ProductImageCreateDto,
  ProductDiscountDto,
  ProductDiscountCreateDto,
  ProductDiscountUpdateDto,
  ProductVariantDto,
  ProductVariantCreateDto,
  ProductVariantUpdateDto,
} from "@/types";

/**
 * ProductAddEditContext type
 * Gereksiz tekrar eden veriler kaldırıldı - useProductsContext'ten alınıyor
 */
export interface ProductAddEditContextType {
  // Supplier ID
  supplierId: number;

  // Loading and Error States
  productSubmitLoading: boolean; // Form submit edilirken
  productError: string | null;

  // Edit mode state
  isEditing: boolean;
  productId: string | null;

  // Category options
  categoryOptions: { value: string; label: string }[];
  categoriesLoading: boolean;

  // Product Actions
  postProduct: (data: ProductCreateDto) => Promise<ProductDto | null>;
  putProduct: (data: ProductUpdateDto) => Promise<ProductDto | null>;

  // Product Image Actions
  createProductImage: (
    data: ProductImageCreateDto,
  ) => Promise<ProductImageDto | null>;
  createProductImageLoading: boolean;
  deleteProductImage: (imageId: number) => Promise<void | null>;
  deleteProductImageLoading: boolean;

  // Product Discount Actions
  addDiscountLoading: boolean;
  editDiscountLoading: boolean;
  deleteDiscountLoading: boolean;
  editingDiscountId: number | null;
  setEditingDiscountId: (id: number | null) => void;
  postProductDiscount: (
    data: ProductDiscountCreateDto,
  ) => Promise<ProductDiscountDto | null>;
  putProductDiscount: (
    discountId: number,
    data: ProductDiscountUpdateDto,
  ) => Promise<ProductDiscountDto | null>;
  deleteProductDiscount: (discountId: number) => Promise<void | null>;

  // Product Variant Actions
  addVariantLoading: boolean;
  editVariantLoading: boolean;
  deleteVariantLoading: boolean;
  editingVariantId: number | null;
  setEditingVariantId: (id: number | null) => void;
  postProductVariant: (
    data: ProductVariantCreateDto,
  ) => Promise<ProductVariantDto | null>;
  putProductVariant: (
    variantId: number,
    data: ProductVariantUpdateDto,
  ) => Promise<ProductVariantDto | null>;
  deleteProductVariant: (variantId: number) => Promise<void | null>;
}
