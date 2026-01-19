import type {
  ProductDto,
  ProductCreateDto,
  ProductUpdateDto,
  ProductImageDto,
  ProductImageCreateDto,
} from "@/types";

/**
 * ProductAddEditContext type
 * RFQ yapısı ile aynı mimari
 */
export interface ProductAddEditContextType {
  // Supplier ID
  supplierId: number;

  // Current Product data
  product: ProductDto | null;
  productDetailLoading: boolean; // Sadece veri çekerken
  productSubmitLoading: boolean; // Form submit edilirken
  productError: string | null;

  // Edit mode state
  isEditing: boolean;
  productId: string | null;

  // Category options
  categoryOptions: { value: string; label: string }[];
  categoriesLoading: boolean;

  // Actions
  fetchProduct: (() => void) | undefined;
  postProduct: (data: ProductCreateDto) => Promise<ProductDto | null>;
  putProduct: (data: ProductUpdateDto) => Promise<ProductDto | null>;

  // Product Images
  productImages: ProductImageDto[];
  productImagesLoading: boolean;
  refetchProductImages: () => void;
  createProductImage: (data: ProductImageCreateDto) => Promise<void>;
  createProductImageLoading: boolean;
  deleteProductImage: (imageId: number) => Promise<void>;
  deleteProductImageLoading: boolean;
}
