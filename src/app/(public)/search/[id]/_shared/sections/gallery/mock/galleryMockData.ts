import { GalleryDto } from "../../../../../../../../types/dto/content/GalleryDto";
import { GalleryType } from "@/enums/GalleryType";
import { GalleryVisibility } from "@/enums/GalleryVisibility";
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
    galleryType: GalleryType.EVENTS,
    visibility: GalleryVisibility.PUBLIC,
    coverImageUrl: "https://picsum.photos/800/600?random=201",
    sortOrder: 1,
    isFeatured: true,
    allowComments: true,
    allowDownloads: false,
    metaTitle: "2024 Bahar Festivali - Bahçeşehir Koleji Beşiktaş",
    metaDescription:
      "Bahçeşehir Koleji Beşiktaş kampüsünde düzenlenen 2024 bahar festivali etkinliklerinin fotoğraf ve videoları.",
    tags: "festival,bahar,etkinlik,sanat,müzik,dans,öğrenci,performans",
    itemCount: 67, // Güncellenmiş item sayısı
    viewCount: 3250, // Güncellenmiş görüntülenme sayısı
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
      galleryItemMockData[13],
      galleryItemMockData[15], // Yeni eklenen Festival Giriş Kapısı
      galleryItemMockData[16], // Öğrenci Resim Sergisi
      galleryItemMockData[17], // Çocuk Korosu Performansı
      galleryItemMockData[18], // Halk Oyunları Gösterisi
      galleryItemMockData[19], // Bilim Fuarı Standları
      galleryItemMockData[20], // Yemek Standları
      galleryItemMockData[21], // Ailelerin Festival Keyfi
      galleryItemMockData[22], // Festival Kapanış Töreni
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
    galleryType: GalleryType.CAMPUS_LIFE,
    visibility: GalleryVisibility.PUBLIC,
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
      galleryItemMockData[14],
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
    galleryType: GalleryType.LABORATORY,
    visibility: GalleryVisibility.REGISTERED_ONLY,
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
    itemCount: 4,
    viewCount: 1890,
    downloadCount: 45,
    totalSizeBytes: 1234567890,
    brand: brandSummaryMockData[2],
    campus: campusSummaryMockData[2],
    school: schoolSummaryMockData[2],
    createdByUser: userSummaryMockData[0],
    items: [
      galleryItemMockData[7],
      galleryItemMockData[23], // Fizik Laboratuvarı
      galleryItemMockData[24], // Biyoloji Mikroskop
      galleryItemMockData[25], // Kimya Güvenlik
    ],
    isActive: true,
    createdAt: "2024-01-10T09:45:00Z",
  },
  {
    id: 4,
    title: "Spor Tesisleri",
    description:
      "Geniş ve modern spor tesislerimiz. Futbol sahası, basketbol kortları, yüzme havuzu ve fitness merkezimiz.",
    slug: "spor-tesisleri",
    galleryType: GalleryType.SPORTS_FACILITIES,
    visibility: GalleryVisibility.PUBLIC,
    coverImageUrl:
      "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=800&h=600&fit=crop",
    sortOrder: 4,
    isFeatured: true,
    allowComments: true,
    allowDownloads: true,
    metaTitle: "Spor Tesisleri - Gazi Üniversitesi",
    metaDescription:
      "Gazi Üniversitesi'nin modern spor tesisleri, futbol sahası, basketbol kortları ve fitness merkezi.",
    tags: "spor,tesis,futbol,basketbol,yüzme,havuz,fitness,sağlık",
    itemCount: 4,
    viewCount: 3120,
    downloadCount: 189,
    totalSizeBytes: 3456789012,
    brand: brandSummaryMockData[3],
    campus: campusSummaryMockData[3],
    school: schoolSummaryMockData[3],
    createdByUser: userSummaryMockData[1],
    items: [
      galleryItemMockData[8],
      galleryItemMockData[26], // Futbol Sahası
      galleryItemMockData[27], // Fitness Merkezi
      galleryItemMockData[28], // Yüzme Havuzu
    ],
    isActive: true,
    createdAt: "2024-03-01T16:20:00Z",
  },
  {
    id: 5,
    title: "Kütüphane",
    description:
      "Geniş koleksiyonu ve modern teknolojisiyle kütüphanemiz. Sessiz çalışma alanları ve grup çalışma odaları.",
    slug: "kutuphane",
    galleryType: GalleryType.LIBRARY,
    visibility: GalleryVisibility.PUBLIC,
    coverImageUrl:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
    sortOrder: 5,
    isFeatured: false,
    allowComments: true,
    allowDownloads: false,
    metaTitle: "Kütüphane - Orta Doğu Teknik Üniversitesi",
    metaDescription:
      "ODTÜ kütüphanesinin geniş koleksiyonu ve modern çalışma alanları.",
    tags: "kütüphane,kitap,çalışma,araştırma,sessiz,grup,ders",
    itemCount: 4,
    viewCount: 1456,
    downloadCount: 34,
    totalSizeBytes: 987654321,
    brand: brandSummaryMockData[4],
    campus: campusSummaryMockData[4],
    school: schoolSummaryMockData[4],
    createdByUser: userSummaryMockData[2],
    items: [
      galleryItemMockData[9],
      galleryItemMockData[29], // Grup Çalışma Odaları
      galleryItemMockData[30], // Kitap Koleksiyonu
      galleryItemMockData[31], // Dijital Okuma Salonu
    ],
    isActive: true,
    createdAt: "2024-02-05T11:10:00Z",
  },
  {
    id: 6,
    title: "Mezuniyet Töreni 2024",
    description:
      "2024 yılı mezuniyet törenimizden unutulmaz anlar. Diploma takdimi, kep atma ve aile sevinçleri.",
    slug: "mezuniyet-toreni-2024",
    galleryType: GalleryType.GRADUATION,
    visibility: GalleryVisibility.PUBLIC,
    coverImageUrl: "https://picsum.photos/800/600?random=206",
    sortOrder: 6,
    isFeatured: true,
    allowComments: true,
    allowDownloads: false,
    metaTitle: "Mezuniyet Töreni 2024 - Hacettepe Üniversitesi",
    metaDescription:
      "Hacettepe Üniversitesi 2024 mezuniyet töreninden fotoğraflar ve videolar.",
    tags: "mezuniyet,tören,diploma,kep,2024,başarı,kutlama",
    itemCount: 4,
    viewCount: 8920,
    downloadCount: 234,
    totalSizeBytes: 8765432109,
    brand: brandSummaryMockData[5],
    campus: campusSummaryMockData[5],
    school: schoolSummaryMockData[5],
    createdByUser: userSummaryMockData[2],
    items: [
      galleryItemMockData[10],
      galleryItemMockData[32], // Diploma Takdim
      galleryItemMockData[33], // Aile Mutluluğu
      galleryItemMockData[34], // Mezuniyet Konuşması
    ],
    isActive: true,
    createdAt: "2024-06-15T18:30:00Z",
  },
  {
    id: 7,
    title: "Sınıflar",
    description:
      "Modern teknoloji ile donatılmış sınıflarımız. Akıllı tahtalar, projeksiyon sistemleri ve konforlu oturma düzeni.",
    slug: "siniflar",
    galleryType: GalleryType.CLASSROOMS,
    visibility: GalleryVisibility.PUBLIC,
    coverImageUrl:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop",
    sortOrder: 7,
    isFeatured: false,
    allowComments: true,
    allowDownloads: true,
    metaTitle: "Sınıflar - Ankara Üniversitesi",
    metaDescription:
      "Ankara Üniversitesi'nin modern teknoloji ile donatılmış sınıfları.",
    tags: "sınıf,teknoloji,akıllı,tahta,modern,eğitim",
    itemCount: 4,
    viewCount: 2340,
    downloadCount: 123,
    totalSizeBytes: 3456789012,
    brand: brandSummaryMockData[6],
    campus: campusSummaryMockData[16],
    school: schoolSummaryMockData[16],
    createdByUser: userSummaryMockData[7],
    items: [
      galleryItemMockData[11],
      galleryItemMockData[35], // Matematik Dersi
      galleryItemMockData[36], // Konferans Salonu
      galleryItemMockData[37], // Bilgisayar Lab
    ],
    isActive: true,
    createdAt: "2024-01-25T08:00:00Z",
  },
  {
    id: 8,
    title: "Kafeterya",
    description:
      "Sağlıklı ve lezzetli yemeklerin servis edildiği kafeteryamız. Geniş menü seçenekleri ve rahat yemek alanı.",
    slug: "kafeterya",
    galleryType: GalleryType.CAFETERIA,
    visibility: GalleryVisibility.PUBLIC,
    coverImageUrl:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",
    sortOrder: 8,
    isFeatured: false,
    allowComments: true,
    allowDownloads: false,
    metaTitle: "Kafeterya - İTÜ Ayazağa Kampüs",
    metaDescription:
      "İTÜ Ayazağa Kampüs kafeteryasından sağlıklı menü seçenekleri.",
    tags: "kafeterya,yemek,menü,sağlıklı,beslenme,lezzetli",
    itemCount: 4,
    viewCount: 1890,
    downloadCount: 67,
    totalSizeBytes: 2345678901,
    brand: brandSummaryMockData[1],
    campus: campusSummaryMockData[1],
    school: schoolSummaryMockData[1],
    createdByUser: userSummaryMockData[8],
    items: [
      galleryItemMockData[12],
      galleryItemMockData[38], // Yemek Servis Alanı
      galleryItemMockData[39], // Oturma Alanları
      galleryItemMockData[40], // Mutfak Ekibi
    ],
    isActive: true,
    createdAt: "2024-02-10T14:20:00Z",
  },
  {
    id: 9,
    title: "Öğrenci Projeleri Sergisi",
    description:
      "Öğrencilerimizin yıl boyunca hazırladığı yaratıcı projeler sergisi. Bilim, teknoloji ve sanat projeleri.",
    slug: "ogrenci-projeleri-sergisi",
    galleryType: GalleryType.STUDENT_WORK,
    visibility: GalleryVisibility.PUBLIC,
    coverImageUrl:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
    sortOrder: 9,
    isFeatured: true,
    allowComments: true,
    allowDownloads: true,
    metaTitle: "Öğrenci Projeleri Sergisi - MEF Okulları",
    metaDescription:
      "MEF Okulları öğrencilerinin yaratıcı proje çalışmaları sergisi.",
    tags: "proje,sergi,öğrenci,yaratıcı,bilim,teknoloji,sanat",
    itemCount: 4,
    viewCount: 3456,
    downloadCount: 156,
    totalSizeBytes: 4567890123,
    brand: brandSummaryMockData[3],
    campus: campusSummaryMockData[3],
    school: schoolSummaryMockData[3],
    createdByUser: userSummaryMockData[3],
    items: [
      galleryItemMockData[4],
      galleryItemMockData[41], // Robotik Proje
      galleryItemMockData[42], // Çevre Teknoloji
      galleryItemMockData[43], // Dijital Sanat
    ],
    isActive: true,
    createdAt: "2024-04-12T16:45:00Z",
  },
  {
    id: 10,
    title: "Öğretmenler Günü Etkinliği",
    description:
      "24 Kasım Öğretmenler Günü'nde düzenlenen özel etkinlik. Öğrencilerin öğretmenlerine hazırladığı sürprizler.",
    slug: "ogretmenler-gunu-etkinligi",
    galleryType: GalleryType.EVENTS,
    visibility: GalleryVisibility.PUBLIC,
    coverImageUrl:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=600&fit=crop",
    sortOrder: 10,
    isFeatured: false,
    allowComments: true,
    allowDownloads: false,
    metaTitle: "Öğretmenler Günü Etkinliği - Bilfen Koleji",
    metaDescription: "Bilfen Koleji'nde 24 Kasım Öğretmenler Günü etkinliği.",
    tags: "öğretmenler,günü,etkinlik,sürpriz,24,kasım",
    itemCount: 3,
    viewCount: 2789,
    downloadCount: 89,
    totalSizeBytes: 3789456123,
    brand: brandSummaryMockData[4],
    campus: campusSummaryMockData[4],
    school: schoolSummaryMockData[4],
    createdByUser: userSummaryMockData[4],
    items: [
      galleryItemMockData[44], // Sürpriz Gösteriler
      galleryItemMockData[45], // Teşekkür Kartları
      galleryItemMockData[46], // Öğretmen-Öğrenci Takdir
    ],
    isActive: true,
    createdAt: "2024-11-24T15:30:00Z",
  },
];

// Galeri türüne göre filtreleme
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
