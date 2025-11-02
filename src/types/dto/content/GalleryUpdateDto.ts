import { GalleryType, GalleryVisibility } from "@/enums";
import { GalleryItemDto } from "./GalleryItemDto";

export interface GalleryUpdateDto {
  title?: string;
  description?: string;
  galleryType?: GalleryType;
  visibility?: GalleryVisibility;
  coverImageUrl?: string;
  sortOrder?: number;
  isFeatured?: boolean;
  allowComments?: boolean;
  allowDownloads?: boolean;

  // SEO
  metaTitle?: string;
  metaDescription?: string;
  tags?: string;

  // Toplu Item Güncelleme
  items?: GalleryItemDto[];
}

// Tüm items'ları yeniden yolla (toplu güncelleme)
// items: [
//   {
//     itemType: MediaType.IMAGE,
//     fileUrl: "https://cdn.example.com/images/new-photo1.jpg",
//     fileName: "yeni-fotograf-1.jpg",
//     sortOrder: 1
//   },
//   {
//     itemType: MediaType.IMAGE,
//     fileUrl: "https://cdn.example.com/images/new-photo2.jpg",
//     fileName: "yeni-fotograf-2.jpg",
//     sortOrder: 2
//   }
// ]
