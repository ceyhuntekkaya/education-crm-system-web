import { GalleryDto } from "../../../../../../../../types/dto/content/GalleryDto";
import {
  brandSummaryMockData,
  campusSummaryMockData,
  schoolSummaryMockData,
  userSummaryMockData,
  galleryItemMockData,
} from "./supportingMockData";

export const galleryMockData: GalleryDto[] = [
  {
    id: 1,
    title: "2024 Bahar Festivali",
    description:
      "Okulumuzun geleneksel bahar festivali etkinlikleri. Öğrencilerimizin sanat, müzik ve dans performanslarını içeren renkli bir festival.",
    slug: "2024-bahar-festivali",
    galleryType: "EVENTS",
    visibility: "PUBLIC",
    coverImageUrl:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
    sortOrder: 1,
    isFeatured: true,
    allowComments: true,
    allowDownloads: false,
    metaTitle: "2024 Bahar Festivali - Bahçeşehir Koleji Beşiktaş",
    metaDescription:
      "Bahçeşehir Koleji Beşiktaş kampüsünde düzenlenen 2024 bahar festivali etkinliklerinin fotoğraf ve videoları.",
    tags: "festival,bahar,etkinlik,sanat,müzik,dans,öğrenci,performans",
    itemCount: 45,
    viewCount: 2580,
    downloadCount: 156,
    totalSizeBytes: 2567890123,
    brand: brandSummaryMockData[0],
    campus: campusSummaryMockData[0],
    school: schoolSummaryMockData[0],
    createdByUser: userSummaryMockData[0],
    items: [
      galleryItemMockData[0],
      galleryItemMockData[1],
      galleryItemMockData[3],
      galleryItemMockData[4],
    ],
    isActive: true,
    createdAt: "2024-03-15T10:30:00Z",
  },
  {
    id: 2,
    title: "Kampüs Yaşamı",
    description:
      "Öğrencilerimizin günlük kampüs yaşamından kareler. Sınıf içi ve dışı aktiviteler, sosyal alanlar ve arkadaşlık anları.",
    slug: "kampus-yasami",
    galleryType: "CAMPUS_LIFE",
    visibility: "PUBLIC",
    coverImageUrl:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
    sortOrder: 2,
    isFeatured: true,
    allowComments: true,
    allowDownloads: true,
    metaTitle: "Kampüs Yaşamı - İstanbul Teknik Üniversitesi",
    metaDescription:
      "İTÜ kampüsünde öğrenci yaşamından günlük kareler, sosyal aktiviteler ve kampüs ortamı.",
    tags: "kampüs,yaşam,öğrenci,günlük,aktivite,sosyal,arkadaşlık",
    itemCount: 128,
    viewCount: 4250,
    downloadCount: 287,
    totalSizeBytes: 4567890234,
    brand: brandSummaryMockData[1],
    campus: campusSummaryMockData[1],
    school: schoolSummaryMockData[1],
    createdByUser: userSummaryMockData[1],
    items: [
      galleryItemMockData[2],
      galleryItemMockData[5],
      galleryItemMockData[6],
    ],
    isActive: true,
    createdAt: "2024-02-20T14:15:00Z",
  },
  {
    id: 3,
    title: "Fen Laboratuvarları",
    description:
      "Modern fen laboratuvarlarımızda yapılan deneyler ve bilimsel çalışmalar. Öğrencilerimizin hands-on öğrenme deneyimleri.",
    slug: "fen-laboratuvarlari",
    galleryType: "LABORATORY",
    visibility: "REGISTERED_ONLY",
    coverImageUrl:
      "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop",
    sortOrder: 3,
    isFeatured: false,
    allowComments: true,
    allowDownloads: false,
    metaTitle: "Fen Laboratuvarları - Boğaziçi Üniversitesi",
    metaDescription:
      "Boğaziçi Üniversitesi'nin modern fen laboratuvarlarında yapılan deneyler ve bilimsel çalışmalar.",
    tags: "laboratuvar,fen,bilim,deney,kimya,fizik,biyoloji,öğrenci",
    itemCount: 32,
    viewCount: 1890,
    downloadCount: 45,
    totalSizeBytes: 1234567890,
    brand: brandSummaryMockData[2],
    campus: campusSummaryMockData[2],
    school: schoolSummaryMockData[2],
    createdByUser: userSummaryMockData[0],
    items: [],
    isActive: true,
    createdAt: "2024-01-10T09:45:00Z",
  },
  {
    id: 4,
    title: "Spor Tesisleri",
    description:
      "Geniş ve modern spor tesislerimiz. Futbol sahası, basketbol kortları, yüzme havuzu ve fitness merkezimiz.",
    slug: "spor-tesisleri",
    galleryType: "SPORTS_FACILITIES",
    visibility: "PUBLIC",
    coverImageUrl: "https://example.com/images/sports-facilities-cover.jpg",
    sortOrder: 4,
    isFeatured: true,
    allowComments: true,
    allowDownloads: true,
    metaTitle: "Spor Tesisleri - Gazi Üniversitesi",
    metaDescription:
      "Gazi Üniversitesi'nin modern spor tesisleri, futbol sahası, basketbol kortları ve fitness merkezi.",
    tags: "spor,tesis,futbol,basketbol,yüzme,havuz,fitness,sağlık",
    itemCount: 67,
    viewCount: 3120,
    downloadCount: 189,
    totalSizeBytes: 3456789012,
    brand: brandSummaryMockData[0],
    campus: campusSummaryMockData[0],
    school: schoolSummaryMockData[0],
    createdByUser: userSummaryMockData[1],
    items: [],
    isActive: true,
    createdAt: "2024-03-01T16:20:00Z",
  },
  {
    id: 5,
    title: "Kütüphane",
    description:
      "Geniş koleksiyonu ve modern teknolojisiyle kütüphanemiz. Sessiz çalışma alanları ve grup çalışma odaları.",
    slug: "kutuphane",
    galleryType: "LIBRARY",
    visibility: "PUBLIC",
    coverImageUrl: "https://example.com/images/library-cover.jpg",
    sortOrder: 5,
    isFeatured: false,
    allowComments: true,
    allowDownloads: false,
    metaTitle: "Kütüphane - Orta Doğu Teknik Üniversitesi",
    metaDescription:
      "ODTÜ'nün modern kütüphanesi, geniş koleksiyonu ve çalışma alanları.",
    tags: "kütüphane,kitap,çalışma,araştırma,sessiz,teknoloji",
    itemCount: 28,
    viewCount: 1456,
    downloadCount: 67,
    totalSizeBytes: 987654321,
    brand: brandSummaryMockData[1],
    campus: campusSummaryMockData[1],
    school: schoolSummaryMockData[1],
    createdByUser: userSummaryMockData[2],
    items: [],
    isActive: true,
    createdAt: "2024-02-05T11:10:00Z",
  },
  {
    id: 6,
    title: "Mezuniyet Töreni 2024",
    description:
      "2024 yılı mezuniyet töreni anıları. Öğrencilerimizin başarılarını kutladığımız özel gün.",
    slug: "mezuniyet-toreni-2024",
    galleryType: "GRADUATION",
    visibility: "PUBLIC",
    coverImageUrl: "https://example.com/images/graduation-2024-cover.jpg",
    sortOrder: 6,
    isFeatured: true,
    allowComments: true,
    allowDownloads: true,
    metaTitle: "Mezuniyet Töreni 2024 - Hacettepe Üniversitesi",
    metaDescription:
      "Hacettepe Üniversitesi 2024 mezuniyet töreni anıları ve öğrenci başarıları.",
    tags: "mezuniyet,tören,başarı,öğrenci,kutlama,diploma,aile",
    itemCount: 156,
    viewCount: 8920,
    downloadCount: 456,
    totalSizeBytes: 6789012345,
    brand: brandSummaryMockData[2],
    campus: campusSummaryMockData[2],
    school: schoolSummaryMockData[2],
    createdByUser: userSummaryMockData[0],
    items: [],
    isActive: true,
    createdAt: "2024-06-15T18:30:00Z",
  },
  {
    id: 7,
    title: "Sınıflar",
    description:
      "Modern sınıflarımız ve eğitim teknolojileri. Interaktif tahtalar, projeksiyon sistemleri ve konforlu öğrenme ortamları.",
    slug: "siniflar",
    galleryType: "CLASSROOMS",
    visibility: "REGISTERED_ONLY",
    coverImageUrl: "https://example.com/images/classrooms-cover.jpg",
    sortOrder: 7,
    isFeatured: false,
    allowComments: false,
    allowDownloads: false,
    metaTitle: "Sınıflar - Ankara Üniversitesi",
    metaDescription:
      "Ankara Üniversitesi'nin modern sınıfları ve eğitim teknolojileri.",
    tags: "sınıf,eğitim,teknoloji,interaktif,tahta,projeksiyon",
    itemCount: 89,
    viewCount: 2340,
    downloadCount: 123,
    totalSizeBytes: 2345678901,
    brand: brandSummaryMockData[0],
    campus: campusSummaryMockData[0],
    school: schoolSummaryMockData[0],
    createdByUser: userSummaryMockData[1],
    items: [],
    isActive: true,
    createdAt: "2024-01-25T08:00:00Z",
  },
  {
    id: 8,
    title: "Kafeterya",
    description:
      "Geniş ve modern kafeterya alanımız. Sağlıklı yemek seçenekleri ve sosyalleşme alanları.",
    slug: "kafeterya",
    galleryType: "CAFETERIA",
    visibility: "PUBLIC",
    coverImageUrl: "https://example.com/images/cafeteria-cover.jpg",
    sortOrder: 8,
    isFeatured: false,
    allowComments: true,
    allowDownloads: false,
    metaTitle: "Kafeterya - Bilkent Üniversitesi",
    metaDescription:
      "Bilkent Üniversitesi kafeteryası, sağlıklı yemek seçenekleri ve sosyal alanlar.",
    tags: "kafeterya,yemek,beslenme,sağlıklı,sosyal,alan",
    itemCount: 24,
    viewCount: 1678,
    downloadCount: 34,
    totalSizeBytes: 567890123,
    brand: brandSummaryMockData[1],
    campus: campusSummaryMockData[1],
    school: schoolSummaryMockData[1],
    createdByUser: userSummaryMockData[2],
    items: [],
    isActive: true,
    createdAt: "2024-02-12T12:45:00Z",
  },
  {
    id: 9,
    title: "Öğrenci Çalışmaları",
    description:
      "Öğrencilerimizin sanat, teknoloji ve bilim alanlarındaki yaratıcı çalışmaları ve projeleri.",
    slug: "ogrenci-calismalari",
    galleryType: "STUDENT_WORK",
    visibility: "PUBLIC",
    coverImageUrl: "https://example.com/images/student-work-cover.jpg",
    sortOrder: 9,
    isFeatured: true,
    allowComments: true,
    allowDownloads: true,
    metaTitle: "Öğrenci Çalışmaları - Sabancı Üniversitesi",
    metaDescription:
      "Sabancı Üniversitesi öğrencilerinin yaratıcı çalışmaları ve projeleri.",
    tags: "öğrenci,çalışma,proje,sanat,teknoloji,bilim,yaratıcılık",
    itemCount: 73,
    viewCount: 2890,
    downloadCount: 167,
    totalSizeBytes: 1890123456,
    brand: brandSummaryMockData[2],
    campus: campusSummaryMockData[2],
    school: schoolSummaryMockData[2],
    createdByUser: userSummaryMockData[0],
    items: [],
    isActive: true,
    createdAt: "2024-04-08T15:20:00Z",
  },
  {
    id: 10,
    title: "Personel",
    description:
      "Değerli öğretmenlerimiz ve personelimiz. Eğitim kadromuz ve destekleyici personelimizin tanıtımı.",
    slug: "personel",
    galleryType: "STAFF",
    visibility: "PRIVATE",
    coverImageUrl: "https://example.com/images/staff-cover.jpg",
    sortOrder: 10,
    isFeatured: false,
    allowComments: false,
    allowDownloads: false,
    metaTitle: "Personel - Koç Üniversitesi",
    metaDescription: "Koç Üniversitesi öğretmen ve personel kadrosu.",
    tags: "personel,öğretmen,eğitim,kadro,tanıtım,akademik",
    itemCount: 41,
    viewCount: 1234,
    downloadCount: 23,
    totalSizeBytes: 789012345,
    brand: brandSummaryMockData[0],
    campus: campusSummaryMockData[0],
    school: schoolSummaryMockData[0],
    createdByUser: userSummaryMockData[1],
    items: [],
    isActive: true,
    createdAt: "2024-03-10T13:15:00Z",
  },
];

// Galeri tipine göre filtreleme
export const getGalleryByType = (galleryType: string): GalleryDto[] => {
  return galleryMockData.filter(
    (gallery) => gallery.galleryType === galleryType
  );
};

// Görünürlük durumuna göre filtreleme
export const getGalleryByVisibility = (visibility: string): GalleryDto[] => {
  return galleryMockData.filter((gallery) => gallery.visibility === visibility);
};

// Öne çıkan galerileri getirme
export const getFeaturedGalleries = (): GalleryDto[] => {
  return galleryMockData.filter((gallery) => gallery.isFeatured);
};

// En çok görüntülenen galerileri getirme
export const getMostViewedGalleries = (limit: number = 5): GalleryDto[] => {
  return galleryMockData
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, limit);
};

// Marka ID'sine göre galeri getirme
export const getGalleryByBrandId = (brandId: number): GalleryDto[] => {
  return galleryMockData.filter((gallery) => gallery.brand?.id === brandId);
};

// Kampüs ID'sine göre galeri getirme
export const getGalleryByCampusId = (campusId: number): GalleryDto[] => {
  return galleryMockData.filter((gallery) => gallery.campus?.id === campusId);
};

// Okul ID'sine göre galeri getirme
export const getGalleryBySchoolId = (schoolId: number): GalleryDto[] => {
  return galleryMockData.filter((gallery) => gallery.school?.id === schoolId);
};

// Aktif galerileri getirme
export const getActiveGalleries = (): GalleryDto[] => {
  return galleryMockData.filter((gallery) => gallery.isActive);
};

// Yorum ve indirme izinli galerileri getirme
export const getGalleriesWithCommentsAndDownloads = (): GalleryDto[] => {
  return galleryMockData.filter(
    (gallery) => gallery.allowComments && gallery.allowDownloads
  );
};
