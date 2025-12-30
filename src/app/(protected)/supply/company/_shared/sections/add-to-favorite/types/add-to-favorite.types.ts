/**
 * AddToFavorite component için tip tanımlamaları
 */

export interface AddToFavoriteProps {
  /**
   * Ürün ID'si
   */
  productId: number;

  /**
   * Wishlist ID'si (ürün zaten favorilerdeyse)
   */
  wishlistId?: number;

  /**
   * Başlangıçta favori durumu
   * @default false
   */
  initialIsFavorite?: boolean;

  /**
   * Buton boyutu
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Icon component variant'ı
   * @default "inline"
   */
  variant?:
    | "inline"
    | "outline"
    | "inline-danger"
    | "inline-success"
    | "inline-warning"
    | "outline-danger"
    | "outline-success"
    | "outline-warning";

  /**
   * Icon boyutu
   * @default 20
   */
  iconSize?: number;

  /**
   * Yalnızca icon göster (text gösterme)
   * @default false
   */
  iconOnly?: boolean;

  /**
   * Buton sınıfı
   */
  className?: string;

  /**
   * Favori durumu değiştiğinde çağrılır
   */
  onFavoriteChange?: (isFavorite: boolean, wishlistId?: number) => void;

  /**
   * Disabled durumu
   * @default false
   */
  disabled?: boolean;
}
