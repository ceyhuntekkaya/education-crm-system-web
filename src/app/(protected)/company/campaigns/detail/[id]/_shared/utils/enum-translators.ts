/**
 * Campaign enum değerlerini Türkçe'ye çeviren utility fonksiyonlar
 */

/**
 * İndirim türlerini çevirir
 */
export const translateDiscountType = (discountType?: string): string => {
  if (!discountType) return "Belirtilmemiş";

  const translations: Record<string, string> = {
    NO_DISCOUNT: "İndirim Yok",
    FIXED_AMOUNT: "Sabit Tutar",
    PERCENTAGE: "Yüzde",
    FREE_MONTHS: "Ücretsiz Ay",
    BUY_X_GET_Y: "X Al Y Öde",
    TIERED: "Kademeli",
    BUNDLE: "Paket",
  };

  return translations[discountType] || discountType;
};

/**
 * Kampanya türlerini çevirir
 */
export const translateCampaignType = (campaignType?: string): string => {
  if (!campaignType) return "Belirtilmemiş";

  const translations: Record<string, string> = {
    DISCOUNT: "İndirim",
    PROMOTION: "Promosyon",
    SEASONAL: "Sezonsal",
    FLASH_SALE: "Flaş İndirim",
    LOYALTY: "Sadakat",
    REFERRAL: "Referans",
    NEW_CUSTOMER: "Yeni Müşteri",
    BIRTHDAY: "Doğum Günü",
    HOLIDAY: "Tatil",
    BACK_TO_SCHOOL: "Kuruma Dönüş",
    EARLY_BIRD: "Erken Kayıt",
    GROUP: "Grup İndirimi",
    FREE_SERVICE: "Ücretsiz Hizmet",
    FREE_TRIAL: "Ücretsiz Deneme",
    BUNDLE: "Paket Kampanya",
    SCHOLARSHIP: "Burs",
    SIBLING: "Kardeş İndirimi",
  };

  return translations[campaignType] || campaignType;
};

/**
 * Kampanya durumlarını çevirir ve renk sınıfı döndürür
 */
export const translateCampaignStatus = (status?: string) => {
  if (!status) return { text: "Belirtilmemiş", className: "text-muted" };

  const statusMap: Record<string, { text: string; className: string }> = {
    ACTIVE: { text: "Aktif", className: "text-success" },
    DRAFT: { text: "Taslak", className: "text-secondary" },
    PENDING_APPROVAL: { text: "Onay Bekliyor", className: "text-warning" },
    APPROVED: { text: "Onaylandı", className: "text-info" },
    PAUSED: { text: "Duraklatıldı", className: "text-warning" },
    EXPIRED: { text: "Süresi Doldu", className: "text-danger" },
    CANCELLED: { text: "İptal Edildi", className: "text-danger" },
    SCHEDULED: { text: "Planlandı", className: "text-primary" },
  };

  return statusMap[status] || { text: status, className: "text-muted" };
};

/**
 * Cinsiyet türlerini çevirir
 */
export const translateGenderType = (genderType?: string): string => {
  if (!genderType) return "Belirtilmemiş";

  const translations: Record<string, string> = {
    MALE: "Erkek",
    FEMALE: "Kadın",
    OTHER: "Diğer",
    ALL: "Tümü",
  };

  return translations[genderType] || genderType;
};

/**
 * Eğitim seviyelerini çevirir
 */
export const translateEducationLevel = (educationLevel?: string): string => {
  if (!educationLevel) return "Belirtilmemiş";

  const translations: Record<string, string> = {
    PRIMARY_SCHOOL: "İlkKurum",
    MIDDLE_SCHOOL: "OrtaKurum",
    HIGH_SCHOOL: "Lise",
    UNIVERSITY: "Üniversite",
    GRADUATE: "Lisansüstü",
    DOCTORATE: "Doktora",
    ALL: "Tümü",
  };

  return translations[educationLevel] || educationLevel;
};

/**
 * Gelir seviyelerini çevirir
 */
export const translateIncomeLevel = (incomeLevel?: string): string => {
  if (!incomeLevel) return "Belirtilmemiş";

  const translations: Record<string, string> = {
    LOW: "Düşük",
    MEDIUM: "Orta",
    HIGH: "Yüksek",
    VERY_HIGH: "Çok Yüksek",
    ALL: "Tümü",
  };

  return translations[incomeLevel] || incomeLevel;
};

/**
 * Ücretsiz hizmetleri çevirir
 */
export const translateFreeService = (service?: string): string => {
  if (!service) return service || "";

  const translations: Record<string, string> = {
    orientation_program: "Oryantasyon Programı",
    school_supplies_package: "Kurum Malzemeleri Paketi",
    uniform_fitting: "Üniforma Ölçümü",
    transportation_service: "Ulaşım Hizmeti",
    meal_service: "Yemek Hizmeti",
    extended_care: "Uzatılmış Bakım",
    homework_support: "Ödev Desteği",
    library_access: "Kütüphane Erişimi",
    free_orientation: "Ücretsiz Oryantasyon",
    consultation: "Danışmanlık Hizmeti",
    school_tour: "Kurum Turu",
    parent_meeting: "Veli Toplantısı",
    assessment_test: "Değerlendirme Testi",
    language_assessment: "Dil Değerlendirmesi",
    placement_test: "Seviye Belirleme Testi",
    educational_planning: "Eğitim Planlaması",
    career_counseling: "Kariyer Danışmanlığı",
    psychological_support: "Psikolojik Destek",
    academic_support: "Akademik Destek",
  };

  return translations[service] || service;
};

/**
 * Bonus özellikleri çevirir
 */
export const translateBonusFeature = (feature?: string): string => {
  if (!feature) return feature || "";

  const translations: Record<string, string> = {
    free_orientation: "Ücretsiz Oryantasyon",
    free_trial_week: "Ücretsiz Deneme Haftası",
    welcome_package: "Hoş Geldin Paketi",
    extra_tutoring: "Ek Özel Ders",
    priority_enrollment: "Öncelikli Kayıt",
    flexible_payment: "Esnek Ödeme",
    parent_workshops: "Veli Atölyeleri",
    progress_tracking: "Gelişim Takibi",
    sibling_discount: "Kardeş İndirimi",
    loyalty_rewards: "Sadakat Ödülleri",
    referral_bonus: "Referans Bonusu",
    scholarship_opportunity: "Burs İmkanı",
    payment_plan_flexibility: "Esnek Ödeme Planı",
    free_extracurricular: "Ücretsiz Ders Dışı Aktiviteler",
    advanced_placement: "İleri Seviye Yerleşim",
    tutoring_support: "Bireysel Ders Desteği",
    technology_access: "Teknoloji Erişimi",
    library_privileges: "Kütüphane Ayrıcalıkları",
    sports_facilities: "Spor Tesisleri",
    arts_programs: "Sanat Programları",
    language_courses: "Dil Kursları",
    summer_programs: "Yaz Programları",
    international_exchange: "Uluslararası Değişim",
  };

  return translations[feature] || feature;
};

/**
 * Hediye ürünleri çevirir
 */
export const translateGiftItem = (gift?: string): string => {
  if (!gift) return gift || "";

  const translations: Record<string, string> = {
    welcome_bag: "Hoş Geldin Çantası",
    school_calendar: "Kurum Takvimi",
    parent_handbook: "Veli El Kitabı",
    student_planner: "Öğrenci Ajandası",
    branded_notebook: "Markalı Defter",
    water_bottle: "Su Matarası",
    pencil_case: "Kalem Kutusu",
    badge_set: "Rozet Seti",
    school_supplies: "Kurum Malzemeleri",
    uniform_set: "Üniforma Seti",
    backpack: "Kurum Çantası",
    lunch_box: "Beslenme Çantası",
    notebooks: "Defterler",
    art_supplies: "Sanat Malzemeleri",
    gym_clothes: "Beden Eğitimi Kıyafetleri",
    school_shoes: "Kurum Ayakkabıları",
    name_tags: "İsim Etiketleri",
    id_card: "Öğrenci Kartı",
    library_card: "Kütüphane Kartı",
    school_t_shirt: "Kurum Tişörtü",
    school_hoodie: "Kurum Kapüşonlusu",
    graduation_cap: "Mezuniyet Kasketi",
    certificate_holder: "Sertifika Tutucu",
    photo_frame: "Resim Çerçevesi",
    school_mug: "Kurum Kupası",
    keychain: "Anahtarlık",
    stickers: "Çıkartmalar",
  };

  return translations[gift] || gift;
};

/**
 * Array halindeki servisleri, özellikleri veya hediye ürünleri çevirir
 */
export const translateArrayItems = (
  items: string[] | string | undefined,
  translateFunction: (item: string) => string
): string[] => {
  if (!items) return [];

  let itemArray: string[] = [];

  // Eğer string ise parse etmeyi dene
  if (typeof items === "string") {
    try {
      itemArray = JSON.parse(items);
    } catch {
      // JSON değilse comma ile ayır
      itemArray = items
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  } else if (Array.isArray(items)) {
    itemArray = items;
  }

  return itemArray.map(translateFunction).filter(Boolean);
};

/**
 * İçerik türlerini çevirir
 */
export const translateContentType = (contentType?: string): string => {
  if (!contentType) return "Belirtilmemiş";

  const translations: Record<string, string> = {
    BANNER_IMAGE: "Banner Görseli",
    THUMBNAIL_IMAGE: "Küçük Görsel",
    HERO_IMAGE: "Ana Görsel",
    GALLERY_IMAGE: "Galeri Görseli",
    PROMOTIONAL_VIDEO: "Tanıtım Videosu",
    TESTIMONIAL_VIDEO: "Referans Videosu",
    INFOGRAPHIC: "İnfografik",
    BROCHURE: "Broşür",
    FLYER: "El İlanı",
    POSTER: "Poster",
    SOCIAL_MEDIA_POST: "Sosyal Medya Postu",
    EMAIL_HEADER: "E-posta Başlığı",
    WEB_BANNER: "Web Bannerı",
    MOBILE_BANNER: "Mobil Banner",
    STORY_TEMPLATE: "Hikaye Şablonu",
    LOGO_VARIATION: "Logo Varyasyonu",
    ICON: "İkon",
    BACKGROUND_IMAGE: "Arka Plan Görseli",
    PATTERN: "Desen",
    WATERMARK: "Filigran",
    AUDIO_AD: "Sesli Reklam",
    JINGLE: "Jingle",
    PRESENTATION: "Sunum",
    DOCUMENT: "Doküman",
    CERTIFICATE: "Sertifika",
    BADGE: "Rozet",
    STICKER: "Çıkartma",
    GIF_ANIMATION: "GIF Animasyon",
    INTERACTIVE_CONTENT: "Etkileşimli İçerik",
    AR_CONTENT: "AR İçeriği",
    VR_CONTENT: "VR İçeriği",
    THREE_D_MODEL: "3D Model",
    OTHER: "Diğer",
  };

  return translations[contentType] || contentType;
};

/**
 * İçerik onay durumlarını çevirir
 */
export const translateApprovalStatus = (
  approvalStatus?: string
): { text: string; className: string } => {
  if (!approvalStatus) {
    return { text: "Belirtilmemiş", className: "text-neutral-500" };
  }

  const translations: Record<string, { text: string; className: string }> = {
    PENDING: { text: "Beklemede", className: "text-warning-600" },
    APPROVED: { text: "Onaylandı", className: "text-success-600" },
    REJECTED: { text: "Reddedildi", className: "text-danger-600" },
    NEEDS_REVISION: { text: "Revizyon Gerekli", className: "text-warning-600" },
    IN_REVIEW: { text: "İnceleniyor", className: "text-info-600" },
    EXPIRED: { text: "Süresi Doldu", className: "text-danger-600" },
    ARCHIVED: { text: "Arşivlendi", className: "text-neutral-600" },
  };

  return (
    translations[approvalStatus] || {
      text: approvalStatus,
      className: "text-neutral-500",
    }
  );
};

/**
 * Kurum kampanya durumlarını çevirir
 */
export const translateSchoolCampaignStatus = (
  status?: string
): { text: string; className: string } => {
  if (!status) {
    return { text: "Belirtilmemiş", className: "text-neutral-500" };
  }

  const translations: Record<string, { text: string; className: string }> = {
    PENDING: { text: "Beklemede", className: "text-warning-600" },
    ACTIVE: { text: "Aktif", className: "text-success-600" },
    PAUSED: { text: "Duraklatıldı", className: "text-warning-600" },
    REJECTED: { text: "Reddedildi", className: "text-danger-600" },
    EXPIRED: { text: "Süresi Doldu", className: "text-danger-600" },
    COMPLETED: { text: "Tamamlandı", className: "text-success-600" },
    REMOVED: { text: "Kaldırıldı", className: "text-neutral-600" },
  };

  return (
    translations[status] || {
      text: status,
      className: "text-neutral-500",
    }
  );
};

/**
 * Kullanım bağlamlarını çevirir
 */
export const translateUsageContext = (usageContext?: string): string => {
  if (!usageContext) return "Belirtilmemiş";

  const translations: Record<string, string> = {
    WEBSITE_HOMEPAGE: "Web Sitesi Ana Sayfası",
    SCHOOL_PAGE: "Kurum Sayfası",
    CAMPAIGN_PAGE: "Kampanya Sayfası",
    PRICING_PAGE: "Fiyatlandırma Sayfası",
    EMAIL_CAMPAIGN: "E-posta Kampanyası",
    SMS_CAMPAIGN: "SMS Kampanyası",
    SOCIAL_MEDIA: "Sosyal Medya",
    PRINT_MEDIA: "Basılı Medya",
    OUTDOOR_ADVERTISING: "Açık Hava Reklamı",
    RADIO: "Radyo",
    TV: "Televizyon",
    MOBILE_APP: "Mobil Uygulama",
    PUSH_NOTIFICATION: "Push Bildirimi",
    SEARCH_ADS: "Arama Reklamları",
    DISPLAY_ADS: "Görüntülü Reklamlar",
    VIDEO_ADS: "Video Reklamları",
    INFLUENCER_CONTENT: "Influencer İçeriği",
    PARTNERSHIP_CONTENT: "Ortaklık İçeriği",
    EVENT_MATERIAL: "Etkinlik Materyali",
    PRESENTATION: "Sunum",
    BROCHURE: "Broşür",
    NEWSLETTER: "Bülten",
    BLOG_POST: "Blog Yazısı",
    CASE_STUDY: "Vaka Çalışması",
    TESTIMONIAL: "Referans",
    FAQ: "SSS",
    LANDING_PAGE: "İniş Sayfası",
    POPUP: "Popup",
    BANNER: "Banner",
    SIDEBAR: "Kenar Çubuğu",
    FOOTER: "Alt Bilgi",
    OTHER: "Diğer",
  };

  return translations[usageContext] || usageContext;
};
