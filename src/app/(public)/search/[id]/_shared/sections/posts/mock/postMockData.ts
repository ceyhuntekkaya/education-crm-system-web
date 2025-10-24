import { PostDto } from "@/types/dto/content";
import { PostType, PostStatus } from "@/enums";

export const postMockData: PostDto[] = [
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
      fullName: "Okul Yönetimi",
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
      <p>Bu başarı, hem öğrencimiz hem de okulumutz için büyük bir gurur kaynağıdır.</p>
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
];
