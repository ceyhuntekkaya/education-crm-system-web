import { PostDto } from "@/types/dto/content/PostDto";
import { PostType } from "@/enums/PostType";
import { PostStatus } from "@/enums/PostStatus";
import {
  getStatusBadgeVariant,
  getPostTypeDisplay,
  formatEngagement,
  calculatePostStats,
} from "../utils/social-media-utils";

// Mock Social Media Data - Adapted from original post mock data
export const mockSocialMediaPosts: PostDto[] = [
  {
    id: 1,
    title: "2024 Mezuniyet Töreni Duyurusu",
    content: `
      <p>Değerli öğrenciler ve aileler,</p>
      <p>2024 mezuniyet törenimiz 15 Haziran 2024 tarihinde Atatürk Kültür Merkezi'nde gerçekleştirilecektir.</p>
      <p>Tören programı:</p>
      <ul>
        <li>09:00 - Kayıt ve karşılama</li>
        <li>10:00 - Açılış konuşması</li>
        <li>10:30 - Diploma tevdii</li>
        <li>12:00 - Kokteyl</li>
      </ul>
      <p>Katılım için lütfen <a href="/registration">kayıt formunu</a> doldurunuz.</p>
    `,
    postType: PostType.ANNOUNCEMENT,
    status: PostStatus.PUBLISHED,
    scheduledAt: "2024-03-15T10:00:00Z",
    publishedAt: "2024-03-15T10:30:00Z",
    featuredImageUrl: "https://picsum.photos/800/600?random=1",
    mediaAttachments: JSON.stringify([
      { type: "image", url: "https://picsum.photos/800/600?random=11" },
      { type: "image", url: "https://picsum.photos/800/600?random=12" },
    ]),
    allowComments: true,
    allowLikes: true,
    isFeatured: true,
    isPinned: true,
    pinExpiresAt: "2024-06-20T00:00:00Z",
    slug: "2024-mezuniyet-toreni-duyurusu",
    metaTitle: "2024 Mezuniyet Töreni Duyurusu | Bahçeşehir Koleji",
    metaDescription:
      "Bahçeşehir Koleji Beşiktaş 2024 mezuniyet töreni detayları ve kayıt bilgileri.",
    tags: "mezuniyet,tören,duyuru,2024",
    hashtags: "#mezuniyet #BahçeşehirKoleji #graduation2024",
    likeCount: 127,
    commentCount: 23,
    viewCount: 3250,
    shareCount: 45,
    engagementScore: 8.5,
    isModerated: true,
    isFlagged: false,
    flagCount: 0,
    reachCount: 5200,
    impressionCount: 12400,
    clickCount: 890,
    averageReadTimeSeconds: 120,
    callToAction: "Kayıt Ol",
    ctaUrl: "/registration",
    locationName: "Atatürk Kültür Merkezi",
    latitude: 41.0082,
    longitude: 28.9784,
    school: {
      id: 1,
      name: "Bahçeşehir Koleji Beşiktaş",
      slug: "bahcesehir-koleji-besiktas",
    },
    author: {
      id: 1,
      fullName: "Kurum Yönetimi",
      email: "yonetim@bahcesehir.edu.tr",
      userType: "INSTITUTION_USER",
    },
    isActive: true,
    createdAt: "2024-03-15T10:30:00Z",
  },
  {
    id: 2,
    title: "Öğrenci Başarı Hikayesi: Uluslararası Olimpiyat",
    content: `
      <p>Öğrencimiz Ahmet Yılmaz, Uluslararası Matematik Olimpiyatı'nda altın madalya kazandı!</p>
      <p>Bu başarı, hem öğrencimiz hem de Kurumumutz için büyük bir gurur kaynağıdır.</p>
      <blockquote>
        "Bu başarı sadece benim değil, bana destek olan öğretmenlerimin ve ailemin de başarısıdır." - Ahmet Yılmaz
      </blockquote>
      <p>Ahmet'in başarı hikayesini videoda izleyebilirsiniz.</p>
    `,
    postType: PostType.ACHIEVEMENT,
    status: PostStatus.PUBLISHED,
    publishedAt: "2024-03-14T14:15:00Z",
    featuredImageUrl: "https://picsum.photos/800/600?random=2",
    videoUrl: "https://www.youtube.com/watch?v=example",
    videoThumbnailUrl: "https://picsum.photos/800/450?random=22",
    videoDurationSeconds: 180,
    allowComments: true,
    allowLikes: true,
    isFeatured: true,
    isPinned: false,
    slug: "ogrenci-basari-hikayesi-uluslararasi-olimpiyat",
    metaTitle:
      "Öğrenci Başarı Hikayesi: Uluslararası Olimpiyat Altın Madalyası",
    metaDescription:
      "İTÜ öğrencisi Ahmet Yılmaz'ın Uluslararası Matematik Olimpiyatı başarı hikayesi.",
    tags: "başarı,olimpiyat,matematik,altın madalya",
    hashtags: "#başarı #olimpiyat #İTÜ #matematik",
    likeCount: 89,
    commentCount: 15,
    viewCount: 2100,
    shareCount: 32,
    engagementScore: 7.8,
    isModerated: true,
    isFlagged: false,
    flagCount: 0,
    reachCount: 3200,
    impressionCount: 8500,
    clickCount: 450,
    averageReadTimeSeconds: 90,
    school: {
      id: 2,
      name: "İstanbul Teknik Üniversitesi",
      slug: "istanbul-teknik-universitesi",
    },
    author: {
      id: 2,
      fullName: "Medya Ekibi",
      email: "medya@itu.edu.tr",
      userType: "INSTITUTION_USER",
    },
    isActive: true,
    createdAt: "2024-03-14T14:15:00Z",
  },
  {
    id: 3,
    title: "Yeni Laboratuvar Açılışı",
    content: `
      <p>Modern teknoloji ile donatılmış yeni laboratuvarımız öğrencilerimizin hizmetinde!</p>
      <p>Laboratuvar özellikleri:</p>
      <ul>
        <li>50 kişilik kapasite</li>
        <li>Son teknoloji ekipmanlar</li>
        <li>Sanal gerçeklik destekli eğitim imkanı</li>
        <li>24/7 erişim imkanı</li>
      </ul>
      <p>Açılış töreni 20 Mart'ta gerçekleştirilecektir.</p>
    `,
    postType: PostType.NEWS,
    status: PostStatus.PUBLISHED,
    publishedAt: "2024-03-13T09:45:00Z",
    featuredImageUrl: "https://picsum.photos/800/600?random=3",
    allowComments: true,
    allowLikes: true,
    isFeatured: false,
    isPinned: false,
    slug: "yeni-laboratuvar-acilisi",
    metaTitle: "Yeni Laboratuvar Açılışı | Boğaziçi Üniversitesi",
    metaDescription:
      "Boğaziçi Üniversitesi'nde modern teknoloji ile donatılmış yeni laboratuvar açılışı.",
    tags: "laboratuvar,teknoloji,açılış,eğitim",
    hashtags: "#laboratuvar #Boğaziçi #teknoloji",
    likeCount: 56,
    commentCount: 8,
    viewCount: 1890,
    shareCount: 12,
    engagementScore: 6.2,
    isModerated: true,
    isFlagged: false,
    flagCount: 0,
    reachCount: 2800,
    impressionCount: 7200,
    clickCount: 380,
    averageReadTimeSeconds: 75,
    school: {
      id: 3,
      name: "Boğaziçi Üniversitesi",
      slug: "bogazici-universitesi",
    },
    author: {
      id: 3,
      fullName: "Halkla İlişkiler",
      email: "pr@boun.edu.tr",
      userType: "INSTITUTION_USER",
    },
    isActive: true,
    createdAt: "2024-03-13T09:45:00Z",
  },
  {
    id: 4,
    title: "Kampüste Bir Gün: Öğrenci Yaşamı",
    content: `
      <p>Kampüsümüzde bir günün nasıl geçtiğini merak ediyor musunuz?</p>
      <p>Sabah 08:00'den akşam 18:00'e kadar öğrencilerimizin yaşadığı deneyimleri sizlerle paylaşıyoruz.</p>
      <p>Bu videoda göreceksiniz:</p>
      <ul>
        <li>Sabah kahvaltısı ve kampüs turu</li>
        <li>Ders saatleri ve laboratuvar çalışmaları</li>
        <li>Öğle arası sosyal aktiviteler</li>
        <li>Akşam spor ve kulüp etkinlikleri</li>
      </ul>
    `,
    postType: PostType.BEHIND_SCENES,
    status: PostStatus.PUBLISHED,
    publishedAt: "2024-03-12T16:20:00Z",
    featuredImageUrl: "https://picsum.photos/800/600?random=4",
    videoUrl: "https://www.youtube.com/watch?v=campus-life",
    videoDurationSeconds: 300,
    allowComments: true,
    allowLikes: true,
    isFeatured: true,
    isPinned: false,
    slug: "kampuste-bir-gun-ogrenci-yasami",
    metaTitle: "Kampüste Bir Gün: Öğrenci Yaşamı | Gazi Üniversitesi",
    metaDescription:
      "Gazi Üniversitesi kampüsünde bir günün nasıl geçtiğini keşfedin.",
    tags: "kampüs,yaşam,öğrenci,günlük,video",
    hashtags: "#kampüsyaşamı #Gazi #öğrencideneyimi",
    likeCount: 145,
    commentCount: 32,
    viewCount: 4200,
    shareCount: 67,
    engagementScore: 9.2,
    isModerated: true,
    isFlagged: false,
    flagCount: 0,
    reachCount: 6100,
    impressionCount: 14500,
    clickCount: 820,
    averageReadTimeSeconds: 180,
    school: {
      id: 4,
      name: "Gazi Üniversitesi",
      slug: "gazi-universitesi",
    },
    author: {
      id: 4,
      fullName: "Öğrenci Medya Grubu",
      email: "medya@gazi.edu.tr",
      userType: "INSTITUTION_USER",
    },
    isActive: true,
    createdAt: "2024-03-12T16:20:00Z",
  },
  {
    id: 5,
    title: "Online Eğitim Platformumuz Yayında!",
    content: `
      <p>Hibrit eğitim modelimizin bir parçası olan online platformumuz artık aktif!</p>
      <p>Platform özellikleri:</p>
      <ul>
        <li>Canlı ders imkanı</li>
        <li>Kayıtlı ders arşivi</li>
        <li>Interaktif ödevler ve sınavlar</li>
        <li>Öğrenci-öğretmen mesajlaşma</li>
        <li>Mobil uygulama desteği</li>
      </ul>
      <p>Platforma erişim için öğrenci numaranız ve şifrenizi kullanabilirsiniz.</p>
    `,
    postType: PostType.EVENT,
    status: PostStatus.PUBLISHED,
    publishedAt: "2024-03-11T11:00:00Z",
    featuredImageUrl: "https://picsum.photos/800/600?random=5",
    allowComments: true,
    allowLikes: true,
    isFeatured: false,
    isPinned: true,
    pinExpiresAt: "2024-04-11T11:00:00Z",
    slug: "online-egitim-platformumuz-yayinda",
    metaTitle: "Online Eğitim Platformu | ODTÜ",
    metaDescription:
      "ODTÜ'nün yeni online eğitim platformu özellikleri ve erişim bilgileri.",
    tags: "online,eğitim,platform,hibrit,teknoloji",
    hashtags: "#onlineeğitim #ODTÜ #dijitaleğitim",
    likeCount: 78,
    commentCount: 19,
    viewCount: 2850,
    shareCount: 23,
    engagementScore: 7.1,
    isModerated: true,
    isFlagged: false,
    flagCount: 0,
    reachCount: 4200,
    impressionCount: 9800,
    clickCount: 560,
    averageReadTimeSeconds: 100,
    callToAction: "Platforma Giriş Yap",
    ctaUrl: "/platform-login",
    school: {
      id: 5,
      name: "ODTÜ",
      slug: "odtu",
    },
    author: {
      id: 5,
      fullName: "Dijital Eğitim Koordinatörü",
      email: "dijital@metu.edu.tr",
      userType: "INSTITUTION_USER",
    },
    isActive: true,
    createdAt: "2024-03-11T11:00:00Z",
  },
  {
    id: 6,
    title: "Öğretmenler Günü Kutlaması",
    content: `
      <p>24 Kasım Öğretmenler Günü'nü coşkuyla kutladık!</p>
      <p>Etkinlik programımız:</p>
      <ul>
        <li>Öğrenci performansları</li>
        <li>Teşekkür konuşmaları</li>
        <li>Hediye takdimleri</li>
        <li>Fotoğraf çekimi</li>
        <li>Kutlama yemeği</li>
      </ul>
      <p>Değerli öğretmenlerimize emekleri için teşekkür ederiz! 👩‍🏫👨‍🏫</p>
    `,
    postType: PostType.CELEBRATION,
    status: PostStatus.PUBLISHED,
    publishedAt: "2024-03-10T13:30:00Z",
    featuredImageUrl: "https://picsum.photos/800/600?random=6",
    allowComments: true,
    allowLikes: true,
    isFeatured: true,
    isPinned: false,
    slug: "ogretmenler-gunu-kutlamasi",
    metaTitle: "Öğretmenler Günü Kutlaması | Bilkent Üniversitesi",
    metaDescription:
      "Bilkent Üniversitesi'nde 24 Kasım Öğretmenler Günü kutlaması.",
    tags: "öğretmenler,günü,kutlama,24,kasım",
    hashtags: "#öğretmenlergünü #Bilkent #teşekkür",
    likeCount: 234,
    commentCount: 45,
    viewCount: 5600,
    shareCount: 89,
    engagementScore: 9.8,
    isModerated: true,
    isFlagged: false,
    flagCount: 0,
    reachCount: 7800,
    impressionCount: 18200,
    clickCount: 1100,
    averageReadTimeSeconds: 85,
    school: {
      id: 6,
      name: "Bilkent Üniversitesi",
      slug: "bilkent-universitesi",
    },
    author: {
      id: 6,
      fullName: "Etkinlik Koordinatörü",
      email: "etkinlik@bilkent.edu.tr",
      userType: "INSTITUTION_USER",
    },
    isActive: true,
    createdAt: "2024-03-10T13:30:00Z",
  },
  {
    id: 7,
    title: "Spor Kompleksi Yenileme Çalışmaları",
    content: `
      <p>Spor kompleksimizin yenileme çalışmaları devam ediyor.</p>
      <p>Yenilenecek alanlar:</p>
      <ul>
        <li>Fitness salonu - yeni ekipmanlar</li>
        <li>Yüzme havuzu - su filtrasyon sistemi</li>
        <li>Basketbol sahası - zemin yenileme</li>
        <li>Soyunma odaları - komple tadilat</li>
      </ul>
      <p>Çalışmalar Nisan ayı sonunda tamamlanacak. Anlayışınız için teşekkürler.</p>
    `,
    postType: PostType.TEXT,
    status: PostStatus.PUBLISHED,
    publishedAt: "2024-03-09T08:15:00Z",
    featuredImageUrl: "https://picsum.photos/800/600?random=7",
    allowComments: true,
    allowLikes: true,
    isFeatured: false,
    isPinned: false,
    slug: "spor-kompleksi-yenileme-calismalari",
    metaTitle: "Spor Kompleksi Yenileme | Koç Üniversitesi",
    metaDescription:
      "Koç Üniversitesi spor kompleksi yenileme çalışmaları hakkında bilgiler.",
    tags: "spor,kompleks,yenileme,tadilat",
    hashtags: "#spor #Koç #yenileme",
    likeCount: 67,
    commentCount: 12,
    viewCount: 1750,
    shareCount: 8,
    engagementScore: 5.4,
    isModerated: true,
    isFlagged: false,
    flagCount: 0,
    reachCount: 2600,
    impressionCount: 6800,
    clickCount: 320,
    averageReadTimeSeconds: 65,
    school: {
      id: 7,
      name: "Koç Üniversitesi",
      slug: "koc-universitesi",
    },
    author: {
      id: 7,
      fullName: "Teknik Ekip",
      email: "teknik@ku.edu.tr",
      userType: "INSTITUTION_USER",
    },
    isActive: true,
    createdAt: "2024-03-09T08:15:00Z",
  },
  {
    id: 8,
    title: "Öğrenci Kulübü Etkinlikleri Takvimi",
    content: `
      <p>Bu ay öğrenci kulüplerimizin düzenlediği etkinlikler:</p>
      <h4>Hafta 1 (1-7 Mart)</h4>
      <ul>
        <li>Fotoğrafçılık Kulübü - Doğa fotoğrafçılığı workshop'u</li>
        <li>Müzik Kulübü - Akustik konser</li>
      </ul>
      <h4>Hafta 2 (8-14 Mart)</h4>
      <ul>
        <li>Tiyatro Kulübü - "Hamlet" oyunu</li>
        <li>Bilim Kulübü - Robotik yarışması</li>
      </ul>
      <h4>Hafta 3 (15-21 Mart)</h4>
      <ul>
        <li>Spor Kulübü - Basketbol turnuvası</li>
        <li>Edebiyat Kulübü - Şiir dinletisi</li>
      </ul>
    `,
    postType: PostType.ANNOUNCEMENT,
    status: PostStatus.PUBLISHED,
    publishedAt: "2024-03-08T15:45:00Z",
    featuredImageUrl: "https://picsum.photos/800/600?random=8",
    allowComments: true,
    allowLikes: true,
    isFeatured: false,
    isPinned: true,
    pinExpiresAt: "2024-03-31T23:59:59Z",
    slug: "ogrenci-kulubu-etkinlikleri-takvimi",
    metaTitle: "Öğrenci Kulübü Etkinlikleri | Sabancı Üniversitesi",
    metaDescription:
      "Sabancı Üniversitesi öğrenci kulüplerinin Mart ayı etkinlik takvimi.",
    tags: "kulüp,etkinlik,takvim,öğrenci,aktivite",
    hashtags: "#kulüpetkinlikleri #Sabancı #öğrencikulüpleri",
    likeCount: 92,
    commentCount: 26,
    viewCount: 3100,
    shareCount: 34,
    engagementScore: 6.8,
    isModerated: true,
    isFlagged: false,
    flagCount: 0,
    reachCount: 4500,
    impressionCount: 10200,
    clickCount: 580,
    averageReadTimeSeconds: 110,
    school: {
      id: 8,
      name: "Sabancı Üniversitesi",
      slug: "sabanci-universitesi",
    },
    author: {
      id: 8,
      fullName: "Öğrenci İşleri",
      email: "ogrenci@sabanciuniv.edu",
      userType: "INSTITUTION_USER",
    },
    isActive: true,
    createdAt: "2024-03-08T15:45:00Z",
  },
  {
    id: 9,
    title: "Yeni Dönem Burs İmkanları",
    content: `
      <p>2024-2025 akademik yılı için burs başvuruları başladı!</p>
      <h4>Burs Türleri:</h4>
      <ul>
        <li><strong>Başarı Bursu:</strong> %25, %50, %75, %100</li>
        <li><strong>İhtiyaç Bursu:</strong> Gelir durumuna göre</li>
        <li><strong>Spor Bursu:</strong> Başarılı sporcular için</li>
        <li><strong>Sanat Bursu:</strong> Sanat alanında yetenekli öğrenciler için</li>
      </ul>
      <p><strong>Başvuru Tarihleri:</strong> 1-30 Nisan 2024</p>
      <p><strong>Gerekli Belgeler:</strong> Transkript, gelir belgesi, başvuru formu</p>
      <p>Detaylı bilgi için öğrenci işleri ile iletişime geçin.</p>
    `,
    postType: PostType.NEWS,
    status: PostStatus.PUBLISHED,
    publishedAt: "2024-03-07T12:00:00Z",
    featuredImageUrl: "https://picsum.photos/800/600?random=9",
    allowComments: true,
    allowLikes: true,
    isFeatured: true,
    isPinned: true,
    pinExpiresAt: "2024-04-30T23:59:59Z",
    slug: "yeni-donem-burs-imkanlari",
    metaTitle: "Burs İmkanları 2024-2025 | İTÜ",
    metaDescription:
      "İTÜ 2024-2025 akademik yılı burs başvuru koşulları ve tarihleri.",
    tags: "burs,başvuru,2024,akademik,yıl",
    hashtags: "#burs #İTÜ #başvuru #2024",
    likeCount: 178,
    commentCount: 58,
    viewCount: 6200,
    shareCount: 95,
    engagementScore: 8.9,
    isModerated: true,
    isFlagged: false,
    flagCount: 0,
    reachCount: 8900,
    impressionCount: 20500,
    clickCount: 1350,
    averageReadTimeSeconds: 150,
    callToAction: "Başvuru Yap",
    ctaUrl: "/burs-basvuru",
    school: {
      id: 9,
      name: "İTÜ",
      slug: "itu",
    },
    author: {
      id: 9,
      fullName: "Mali İşler Koordinatörü",
      email: "mali@itu.edu.tr",
      userType: "INSTITUTION_USER",
    },
    isActive: true,
    createdAt: "2024-03-07T12:00:00Z",
  },
  {
    id: 10,
    title: "Kampüs Hayatından Kareler",
    content: `
      <p>Bu hafta kampüsümüzden çektiğimiz fotoğrafları sizlerle paylaşıyoruz! 📸</p>
      <p>Fotoğraf galerisinde bulacaklarınız:</p>
      <ul>
        <li>Bahar çiçekleri açan kampüs bahçeleri</li>
        <li>Kütüphanede çalışan öğrenciler</li>
        <li>Kafeteryada sohbet eden arkadaşlar</li>
        <li>Spor alanlarında aktivite yapan öğrenciler</li>
        <li>Laboratuvarlarda deney yapan öğrenciler</li>
      </ul>
      <p>Siz de kampüs fotoğraflarınızı #HacettepeKampüs etiketiyle paylaşın!</p>
    `,
    postType: PostType.GALLERY,
    status: PostStatus.PUBLISHED,
    publishedAt: "2024-03-06T10:20:00Z",
    featuredImageUrl: "https://picsum.photos/800/600?random=10",
    mediaAttachments: JSON.stringify([
      { type: "image", url: "https://picsum.photos/800/600?random=101" },
      { type: "image", url: "https://picsum.photos/800/600?random=102" },
      { type: "image", url: "https://picsum.photos/800/600?random=103" },
      { type: "image", url: "https://picsum.photos/800/600?random=104" },
      { type: "image", url: "https://picsum.photos/800/600?random=105" },
    ]),
    allowComments: true,
    allowLikes: true,
    isFeatured: false,
    isPinned: false,
    slug: "kampus-hayatindan-kareler",
    metaTitle: "Kampüs Fotoğrafları | Hacettepe Üniversitesi",
    metaDescription:
      "Hacettepe Üniversitesi kampüsünden günlük yaşam fotoğrafları.",
    tags: "kampüs,fotoğraf,galeri,yaşam,öğrenci",
    hashtags: "#HacettepeKampüs #kampüsyaşamı #fotoğraf",
    likeCount: 156,
    commentCount: 34,
    viewCount: 4800,
    shareCount: 67,
    engagementScore: 7.5,
    isModerated: true,
    isFlagged: false,
    flagCount: 0,
    reachCount: 6800,
    impressionCount: 15600,
    clickCount: 920,
    averageReadTimeSeconds: 95,
    school: {
      id: 10,
      name: "Hacettepe Üniversitesi",
      slug: "hacettepe-universitesi",
    },
    author: {
      id: 10,
      fullName: "Sosyal Medya Ekibi",
      email: "sosyalmedya@hacettepe.edu.tr",
      userType: "INSTITUTION_USER",
    },
    isActive: true,
    createdAt: "2024-03-06T10:20:00Z",
  },
];

// Utility functions for working with mock data
export const getPostsByType = (postType: string): PostDto[] => {
  return mockSocialMediaPosts.filter((post) => post.postType === postType);
};

export const getPostsByStatus = (status: string): PostDto[] => {
  return mockSocialMediaPosts.filter((post) => post.status === status);
};

export const getFeaturedPosts = (): PostDto[] => {
  return mockSocialMediaPosts.filter((post) => post.isFeatured);
};

export const getPinnedPosts = (): PostDto[] => {
  return mockSocialMediaPosts.filter((post) => post.isPinned);
};

export const getActivePosts = (): PostDto[] => {
  return mockSocialMediaPosts.filter((post) => post.isActive);
};

export const getMostEngagedPosts = (limit: number = 5): PostDto[] => {
  return mockSocialMediaPosts
    .sort((a, b) => (b.engagementScore || 0) - (a.engagementScore || 0))
    .slice(0, limit);
};

export const getMostViewedPosts = (limit: number = 5): PostDto[] => {
  return mockSocialMediaPosts
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, limit);
};

export const getPostById = (id: number): PostDto | undefined => {
  return mockSocialMediaPosts.find((post) => post.id === id);
};

// Re-export utility functions that work with mock data
export {
  getStatusBadgeVariant,
  getPostTypeDisplay,
  formatEngagement,
  calculatePostStats,
};
