# Enumaration Type Mapping Document

Aşağıda Java enum dosyalarındaki tüm değerler ve açıklamaları listelenmiştir. TypeScript'e dönüştürmek için referans olarak kullanılabilir.

---

## AccessType
- BRAND // Marka erişimi
- CAMPUS // Kampüs erişimi
- SCHOOL // Kurum erişimi

## AppointmentOutcome
- ENROLLED // Kayıt oldu
- INTERESTED // İlgili
- NOT_INTERESTED // İlgili değil
- NEEDS_MORE_INFO // Daha fazla bilgi gerekiyor
- PRICE_CONCERN // Fiyat endişesi
- TIMING_ISSUE // Zamanlama sorunu
- CONSIDERING_OPTIONS // Seçenekleri değerlendiriyor
- WILL_CALL_BACK // Geri arayacak
- OTHER // Diğer

## AppointmentStatus
- PENDING // Beklemede
- CONFIRMED // Onaylandı
- APPROVED // Onaylandı (manuel onay gerektiren durumlarda)
- REJECTED // Reddedildi
- CANCELLED // İptal edildi
- COMPLETED // Tamamlandı
- NO_SHOW // Gelmedi
- RESCHEDULED // Ertelendi
- IN_PROGRESS // Devam ediyor

## AppointmentType
- INFORMATION_MEETING // Bilgi toplantısı
- SCHOOL_TOUR // Kurum gezisi
- ENROLLMENT_INTERVIEW // Kayıt görüşmesi
- PARENT_MEETING // Veli görüşmesi
- CONSULTATION // Danışmanlık
- ASSESSMENT // Değerlendirme
- ORIENTATION // Oryantasyon
- ONLINE_MEETING // Online görüşme
- PHONE_CALL // Telefon görüşmesi
- GROUP_MEETING // Grup toplantısı
- OTHER // Diğer

## AttendanceStatus
- EXPECTED // Bekleniyor
- CONFIRMED // Onaylandı
- ATTENDED // Katıldı
- NO_SHOW // Gelmedi
- LATE // Geç kaldı
- LEFT_EARLY // Erken ayrıldı

## BillingPeriod
- MONTHLY // Aylık
- QUARTERLY // 3 Aylık
- YEARLY // Yıllık
- ONETIME // Tek seferlik

## CampaignContentType
- BANNER_IMAGE // Banner resmi
- THUMBNAIL_IMAGE // Küçük resim
- HERO_IMAGE // Ana resim
- GALLERY_IMAGE // Galeri resmi
- PROMOTIONAL_VIDEO // Tanıtım videosu
- TESTIMONIAL_VIDEO // Referans videosu
- INFOGRAPHIC // İnfografik
- BROCHURE // Broşür
- FLYER // El ilanı
- POSTER // Poster
- SOCIAL_MEDIA_POST // Sosyal medya gönderisi
- EMAIL_HEADER // E-posta başlığı
- WEB_BANNER // Web banner
- MOBILE_BANNER // Mobil banner
- STORY_TEMPLATE // Story şablonu
- LOGO_VARIATION // Logo varyasyonu
- ICON // İkon
- BACKGROUND_IMAGE // Arkaplan resmi
- PATTERN // Desen
- WATERMARK // Filigran
- AUDIO_AD // Sesli reklam
- JINGLE // Jingle
- PRESENTATION // Sunum
- DOCUMENT // Belge
- CERTIFICATE // Sertifika
- BADGE // Rozet
- STICKER // Çıkartma
- GIF_ANIMATION // GIF animasyon
- INTERACTIVE_CONTENT // İnteraktif içerik
- AR_CONTENT // Artırılmış gerçeklik
- VR_CONTENT // Sanal gerçeklik
- THREE_D_MODEL // 3D model
- OTHER // Diğer

## CampaignSchoolStatus
- PENDING // Beklemede
- ACTIVE // Aktif
- PAUSED // Duraklatıldı
- REJECTED // Reddedildi
- EXPIRED // Süresi doldu
- COMPLETED // Tamamlandı
- REMOVED // Kaldırıldı

## CampaignStatus
- DRAFT // Taslak
- PENDING_APPROVAL // Onay bekliyor
- APPROVED // Onaylandı
- ACTIVE // Aktif
- PAUSED // Duraklatıldı
- EXPIRED // Süresi doldu
- CANCELLED // İptal edildi
- COMPLETED // Tamamlandı
- ARCHIVED // Arşivlendi

## CampaignType
- DISCOUNT // İndirim kampanyası
- FREE_SERVICE // Ücretsiz hizmet
- BONUS_FEATURE // Bonus özellik
- EARLY_BIRD // Erken kayıt
- SUMMER_SCHOOL // Yaz Kurumu
- WINTER_CAMP // Kış kampı
- FREE_TRIAL // Ücretsiz deneme
- SIBLING_DISCOUNT // Kardeş indirimi
- LOYALTY_REWARD // Sadakat ödülü
- REFERRAL_BONUS // Tavsiye bonusu
- NEW_STUDENT // Yeni öğrenci
- SCHOLARSHIP // Burs
- INSTALLMENT // Taksit
- SEASONAL // Mevsimlik
- SPECIAL_EVENT // Özel etkinlik
- BUNDLE_DEAL // Paket anlaşma
- LIMITED_TIME // Sınırlı süre
- FLASH_SALE // Flaş indirim
- OTHER // Diğer

## ContentApprovalStatus
- PENDING // Beklemede
- APPROVED // Onaylandı
- REJECTED // Reddedildi
- NEEDS_REVISION // Revizyon gerekli
- IN_REVIEW // İncelemede
- EXPIRED // Süresi doldu
- ARCHIVED // Arşivlendi

## ConditionType
- EQUALS // Eşittir
- NOT_EQUALS // Eşit değildir
- CONTAINS // İçerir
- NOT_CONTAINS // İçermez
- GREATER_THAN // Büyüktür
- LESS_THAN // Küçüktür
- GREATER_THAN_EQUAL // Büyük eşittir
- LESS_THAN_EQUAL // Küçük eşittir
- IS_EMPTY // Boş
- IS_NOT_EMPTY // Boş değil

## CancelledByType
- PARENT // Veli tarafından
- SCHOOL // Kurum tarafından
- SYSTEM // Sistem tarafından (otomatik)

## CommentStatus
- PUBLISHED // Yayınlanmış
- PENDING // Beklemede
- MODERATION // Moderasyonda
- APPROVED // Onaylanmış
- REJECTED // Reddedilmiş
- DELETED // Silinmiş
- HIDDEN // Gizlenmiş

## CampaignUsageType
- INQUIRY // Bilgi talebi
- APPOINTMENT // Randevu
- ENROLLMENT // Kayıt
- TRIAL_REQUEST // Deneme talebi
- BROCHURE_DOWNLOAD // Broşür indirme
- PHONE_CALL // Telefon görüşmesi
- EMAIL_RESPONSE // E-posta yanıtı
- FORM_SUBMISSION // Form gönderimi
- NEWSLETTER_SIGNUP // Haber bülteni kayıt
- SOCIAL_MEDIA_FOLLOW // Sosyal medya takip
- REFERRAL // Tavsiye
- OTHER // Diğer

## CampaignUsageStatus
- PENDING // Beklemede
- VALIDATED // Doğrulandı
- APPROVED // Onaylandı
- PROCESSED // İşlendi
- COMPLETED // Tamamlandı
- REJECTED // Reddedildi
- EXPIRED // Süresi doldu
- CANCELLED // İptal edildi
- DUPLICATE // Tekrar
- FRAUD_SUSPECTED // Dolandırıcılık şüphesi

## UserType
- INSTITUTION_USER // Kurum kullanıcısı
- PARENT

## TrafficSource
- DIRECT // Doğrudan
- ORGANIC_SEARCH // Organik arama
- PAID_SEARCH // Ücretli arama
- SOCIAL_MEDIA // Sosyal medya
- EMAIL // E-posta
- REFERRAL // Yönlendirme
- AFFILIATE // Affiliate
- DISPLAY_ADS // Display reklam
- VIDEO_ADS // Video reklam
- PUSH_NOTIFICATION // Push bildirim
- SMS // SMS
- QR_CODE // QR kod
- PRINT_MEDIA // Basılı medya
- RADIO // Radyo
- TV // Televizyon
- OUTDOOR // Açık hava reklamı
- WORD_OF_MOUTH // Ağızdan ağıza
- OTHER // Diğer
- UNKNOWN // Bilinmeyen

## TokenType
- BEARER

## TimePeriod
- HOURLY // Saatlik
- DAILY // Günlük
- WEEKLY // Haftalık
- MONTHLY // Aylık
- QUARTERLY // Çeyreklik
- YEARLY // Yıllık
- REAL_TIME // Gerçek zamanlı

## TargetAudience
- ALL // Herkese
- NEW_STUDENTS // Yeni öğrenciler
- EXISTING_STUDENTS // Mevcut öğrenciler
- SIBLINGS // Kardeşler
- EARLY_REGISTRANTS // Erken kayıt olanlar
- LOCAL_RESIDENTS // Yerel sakinler
- REFERRALS // Tavsiye edilenler
- VIP_MEMBERS // VIP üyeler
- SPECIFIC_GRADES // Belirli sınıflar
- SPECIFIC_AGES // Belirli yaşlar
- LOYALTY_MEMBERS // Sadakat üyeleri
- FIRST_TIME_VISITORS // İlk kez gelenler

## SurveyType
- APPOINTMENT_FEEDBACK // Randevu sonrası geri bildirim
- SCHOOL_RATING // Kurum değerlendirme
- SERVICE_QUALITY // Hizmet kalitesi
- ENROLLMENT_FEEDBACK // Kayıt süreci geri bildirimi
- GENERAL_FEEDBACK // Genel geri bildirim
- CUSTOM // Özel anket

## SurveyTriggerEvent
- APPOINTMENT_COMPLETED // Randevu tamamlandıktan sonra
- ENROLLMENT_COMPLETED // Kayıt tamamlandıktan sonra
- MANUAL_SEND // Manuel gönderim
- PERIODIC // Periyodik gönderim
- EVENT_BASED // Olay bazlı

## SubscriptionStatus
- TRIAL // Deneme sürümü
- ACTIVE // Aktif
- PAST_DUE // Gecikmiş ödeme
- CANCELED // İptal edilmiş
- EXPIRED // Süresi dolmuş
- SUSPENDED // Askıya alınmış
- PENDING // Beklemede

## SocioeconomicLevel
- VERY_LOW // Çok düşük
- LOW // Düşük
- LOWER_MIDDLE // Alt orta
- MIDDLE // Orta
- UPPER_MIDDLE // Üst orta
- HIGH // Yüksek
- VERY_HIGH // Çok yüksek

## SearchType
- GENERAL // Genel arama
- SCHOOL_NAME // Kurum ismi
- LOCATION // Konum
- INSTITUTION_TYPE // Kurum türü
- PRICE_RANGE // Fiyat aralığı
- AGE_GROUP // Yaş grubu
- CURRICULUM // Müfredat
- LANGUAGE // Dil
- FACILITIES // Tesisler
- ADVANCED // Gelişmiş arama

## SearchIntent
- INFORMATIONAL // Bilgi arama
- NAVIGATIONAL // Belirli bir Kurumu arama
- TRANSACTIONAL // Randevu alma niyeti
- COMMERCIAL // Karşılaştırma yapma
- LOCAL // Yerel arama
- ACADEMIC // Akademik bilgi
- PRICE_COMPARISON // Fiyat karşılaştırma
- REVIEW_SEEKING // Değerlendirme arama
- CONTACT // İletişim bilgisi
- UNCLEAR // Belirsiz

## RoleLevel
- BRAND // Marka düzeyinde rol (Marka Yöneticisi)
- CAMPUS // Kampüs düzeyinde rol (Kampüs Yöneticisi, Muhasebe vs)
- SCHOOL // Kurum düzeyinde rol (Öğrenci İşleri, Öğretmen vs)
- SYSTEM // Sistem düzeyinde rol (Super Admin vs)

## ReactionType
- LIKE // Beğendim
- LOVE // Harika
- WOW // Vay be
- CONGRATULATIONS // Tebrikler
- THANKS // Teşekkür
- SUPPORT // Destek

## ResponseStatus
- INVITED // Davet gönderildi
- STARTED // Başladı
- IN_PROGRESS // Devam ediyor
- COMPLETED // Tamamlandı
- SUBMITTED // Gönderildi
- EXPIRED // Süresi doldu
- ABANDONED // Terk edildi
- DELETED // Silindi

## PerformanceMetricCategory
- WEB_REQUEST // Web isteği
- DATABASE // Veritabanı
- CACHE // Önbellek
- FILE_SYSTEM // Dosya sistemi
- NETWORK // Ağ
- MEMORY // Bellek
- CPU // İşlemci
- EXTERNAL_API // Harici API
- BACKGROUND_JOB // Arka plan işi
- SYSTEM // Sistem
- APPLICATION // Uygulama
- SECURITY // Güvenlik
- SEARCH // Arama
- UPLOAD // Dosya yükleme
- EMAIL // E-posta
- SMS // SMS
- PAYMENT // Ödeme
- BUSINESS_LOGIC // İş mantığı

## PermissionCategory
- USER_MANAGEMENT // kullanici_olustur, kullanici_duzenle vs
- INSTITUTION_MANAGEMENT // kampus_duzenle, Kurum_olustur vs
- APPOINTMENT_MANAGEMENT // randevu_olustur, randevu_iptal_et vs
- CONTENT_MANAGEMENT // galeri_duzenle, post_olustur vs
- SURVEY_MANAGEMENT // anket_goruntule, anket_duzenle vs
- SUBSCRIPTION_MANAGEMENT // abonelik_goruntule, odeme_yap vs
- ANALYTICS // istatistik_goruntule, rapor_olustur vs

## PostStatus
- DRAFT // Taslak
- SCHEDULED // Zamanlanmış
- PUBLISHED // Yayınlanmış
- ARCHIVED // Arşivlenmiş
- DELETED // Silinmiş
- MODERATION // Moderasyonda
- REJECTED // Reddedilmiş
- EXPIRED // Süresi dolmuş

## PostType
- TEXT // Sadece metin
- IMAGE // Resim
- VIDEO // Video
- GALLERY // Galeri
- LINK // Bağlantı
- EVENT // Etkinlik
- ANNOUNCEMENT // Duyuru
- NEWS // Haber
- ACHIEVEMENT // Başarı
- CELEBRATION // Kutlama
- POLL // Anket
- QUOTE // Alıntı
- TESTIMONIAL // Referans
- BEHIND_SCENES // Kuliste
- LIVE_STREAM // Canlı yayın

## PricingStatus
- DRAFT // Taslak
- PENDING_APPROVAL // Onay bekliyor
- APPROVED // Onaylandı
- ACTIVE // Aktif
- INACTIVE // Pasif
- ARCHIVED // Arşivlendi
- SUPERSEDED // Geçersiz kılındı

## PriceChangeType
- INCREASE // Artış
- DECREASE // Azalış
- NEW_FEE // Yeni ücret
- REMOVED_FEE // Kaldırılan ücret
- RESTRUCTURE // Yeniden yapılandırma
- SEASONAL_ADJUSTMENT // Mevsimsel ayarlama
- INFLATION_ADJUSTMENT // Enflasyon ayarlaması
- MARKET_ADJUSTMENT // Piyasa ayarlaması
- PROMOTION // Promosyon
- CORRECTION // Düzeltme
- POLICY_CHANGE // Politika değişikliği
- COMPETITIVE_RESPONSE // Rekabetçi yanıt
- COST_ADJUSTMENT // Maliyet ayarlaması
- QUALITY_IMPROVEMENT // Kalite artırımı
- SERVICE_ENHANCEMENT // Hizmet geliştirme
- REGULATORY_CHANGE // Yasal değişiklik
- OTHER // Diğer

## ProcessingStatus
- PENDING // Beklemede
- PROCESSING // İşleniyor
- COMPLETED // Tamamlandı
- FAILED // Başarısız
- CANCELLED // İptal edildi

## PropertyDataType
- TEXT // Metin
- TEXTAREA // Uzun metin
- NUMBER // Sayı
- DECIMAL // Ondalıklı sayı
- BOOLEAN // Evet/Hayır
- SELECT // Seçenekli liste
- MULTISELECT // Çoklu seçim
- DATE // Tarih
- TIME // Saat
- DATETIME // Tarih ve saat
- URL // Web adresi
- EMAIL // E-posta
- PHONE // Telefon
- FILE // Dosya
- IMAGE // Resim

## QuestionType
- SINGLE_CHOICE // Tek seçim (radio button)
- MULTIPLE_CHOICE // Çoklu seçim (checkbox)
- DROPDOWN // Açılır liste
- TEXT_SHORT // Kısa metin
- TEXT_LONG // Uzun metin (textarea)
- EMAIL // E-posta
- PHONE // Telefon
- NUMBER // Sayı
- DATE // Tarih
- TIME // Saat
- RATING_STAR // Yıldız değerlendirme
- RATING_SCALE // Ölçek değerlendirme (1-10)
- YES_NO // Evet/Hayır
- LIKERT_SCALE // Likert ölçeği
- MATRIX // Matris sorusu
- FILE_UPLOAD // Dosya yükleme
- SIGNATURE // İmza
- SECTION_HEADER // Bölüm başlığı

## RatingCategory
- OVERALL_SATISFACTION // Genel memnuniyet
- CLEANLINESS // Temizlik
- STAFF_FRIENDLINESS // Personel ilgisi
- FACILITIES // Tesisler
- COMMUNICATION // İletişim
- PROFESSIONALISM // Profesyonellik
- VALUE_FOR_MONEY // Fiyat/performans
- RECOMMENDATION // Tavsiye etme
- ACADEMIC_QUALITY // Akademik kalite
- INFRASTRUCTURE // Altyapı
- EXTRACURRICULAR // Sosyal aktiviteler
- SAFETY // Güvenlik
- TRANSPORTATION // Ulaşım
- CAFETERIA // Kantin
- TECHNOLOGY // Teknoloji
- CUSTOM // Özel kategori

## HousingType
- MIXED // Karma
- APARTMENT // Apartman
- VILLA // Villa
- TOWNHOUSE // Townhouse
- GATED_COMMUNITY // Site
- SOCIAL_HOUSING // Toplu konut
- HISTORICAL // Tarihi yapı
- COMMERCIAL // Ticari
- INDUSTRIAL // Sanayi
- RURAL // Kırsal

## IncomeLevel
- VERY_LOW // Çok düşük
- LOW // Düşük
- LOWER_MIDDLE // Alt orta
- MIDDLE // Orta
- UPPER_MIDDLE // Üst orta
- HIGH // Yüksek
- VERY_HIGH // Çok yüksek
- LUXURY // Lüks

## InvoiceStatus
- DRAFT // Taslak
- SENT // Gönderildi
- VIEWED // Görüntülendi
- PAID // Ödendi
- OVERDUE // Vadesi geçti
- CANCELED // İptal edildi
- REFUNDED // İade edildi
- DISPUTED // Anlaşmazlık

## MediaType
- IMAGE // Resim
- VIDEO // Video
- AUDIO // Ses
- DOCUMENT // Belge
- ARCHIVE // Arşiv
- OTHER // Diğer

## MessagePriority
- LOW // Düşük
- NORMAL // Normal
- HIGH // Yüksek
- URGENT // Acil
- CRITICAL // Kritik

## MessageStatus
- NEW // Yeni
- READ // Okundu
- IN_PROGRESS // İşlemde
- WAITING_RESPONSE // Yanıt bekleniyor
- RESPONDED // Yanıtlandı
- RESOLVED // Çözüldü
- CLOSED // Kapatıldı
- ESCALATED // Üst makama iletildi
- SPAM // Spam
- ARCHIVED // Arşivlendi

## MessageType
- GENERAL_INQUIRY // Genel bilgi
- ENROLLMENT_INQUIRY // Kayıt bilgisi
- APPOINTMENT_REQUEST // Randevu talebi
- COMPLAINT // Şikayet
- SUGGESTION // Öneri
- TECHNICAL_SUPPORT // Teknik destek
- FINANCIAL_INQUIRY // Mali bilgi
- TRANSPORTATION // Ulaşım
- CAFETERIA // Kantin
- EXTRACURRICULAR // Sosyal aktiviteler
- ACADEMIC_INQUIRY // Akademik bilgi
- FACILITIES_INQUIRY // Tesis bilgisi
- CALLBACK_REQUEST // Geri arama talebi
- BROCHURE_REQUEST // Broşür talebi
- PARTNERSHIP // İş birliği
- MEDIA_INQUIRY // Basın
- OTHER // Diğer

## MetricType
- TRAFFIC // Trafik metrikleri
- ENGAGEMENT // Etkileşim metrikleri
- CONVERSION // Dönüşüm metrikleri
- PERFORMANCE // Performans metrikleri
- FINANCIAL // Mali metrikleri
- CONTENT // İçerik metrikleri
- USER_BEHAVIOR // Kullanıcı davranışı
- SEARCH // Arama metrikleri
- APPOINTMENT // Randevu metrikleri
- SURVEY // Anket metrikleri
- SUBSCRIPTION // Abonelik metrikleri
- SYSTEM // Sistem metrikleri

## NeighborhoodType
- MAHALLE // Mahalle
- KOYUNU // Köy
- SEMT // Semt
- VAROS // Varoş
- MERKEZ // Merkez
- OUTER_DISTRICT // Dış mahalle
- INNER_DISTRICT // İç mahalle
- VILLAGE // Village (for international)
- TOWNSHIP // Township (for international)
- WARD // Ward (for international)
- AREA // Area (for international)

## NoteType
- GENERAL // Genel not
- PREPARATION // Hazırlık notu
- FOLLOW_UP // Takip notu
- OUTCOME // Sonuç notu
- COMPLAINT // Şikayet
- COMPLIMENT // Övgü
- TECHNICAL_ISSUE // Teknik sorun
- RESCHEDULING // Erteleme
- CANCELLATION // İptal
- REMINDER // Hatırlatma
- INTERNAL // Dahili not

## ParticipantType
- PARENT // Veli
- STUDENT // Öğrenci
- SCHOOL_STAFF // Kurum personeli
- CONSULTANT // Danışman
- OBSERVER // Gözlemci
- TRANSLATOR // Tercüman
- OTHER // Diğer

## PaymentFrequency
- ONE_TIME // Tek seferlik
- MONTHLY // Aylık
- QUARTERLY // 3 Aylık
- SEMESTER // Dönemlik
- ANNUAL // Yıllık
- BIANNUAL // 6 Aylık
- CUSTOM // Özel

## PaymentMethod
- CREDIT_CARD // Kredi kartı
- DEBIT_CARD // Banka kartı
- BANK_TRANSFER // Havale/EFT
- MOBILE_PAYMENT // Mobil ödeme
- CRYPTOCURRENCY // Kripto para
- CASH // Nakit
- CHECK // Çek
- PAYPAL // PayPal
- STRIPE // Stripe
- IYZICO // Iyzico
- OTHER // Diğer

## PaymentStatus
- PENDING // Beklemede
- PROCESSING // İşleniyor
- COMPLETED // Tamamlandı
- FAILED // Başarısız
- CANCELED // İptal edildi
- REFUNDED // İade edildi

## GalleryType
- MIXED // Karışık (resim ve video)
- PHOTOS // Sadece fotoğraflar
- VIDEOS // Sadece videolar
- SCHOOL_TOUR // Kurum turu
- EVENTS // Etkinlikler
- FACILITIES // Tesisler
- CLASSROOMS // Sınıflar
- OUTDOOR_AREAS // Açık alanlar
- CAFETERIA // Kantin
- LIBRARY // Kütüphane
- LABORATORY // Laboratuvar
- SPORTS_FACILITIES // Spor tesisleri
- TRANSPORTATION // Ulaşım
- ACHIEVEMENTS // Başarılar
- GRADUATION // Mezuniyet
- CEREMONIES // Törenler
- DAILY_ACTIVITIES // Günlük aktiviteler
- STUDENT_WORK // Öğrenci çalışmaları
- STAFF // Personel
- CAMPUS_LIFE // Kampüs yaşamı
- BEFORE_AFTER // Öncesi/sonrası

## GalleryVisibility
- PUBLIC // Herkese açık
- PRIVATE // Sadece Kurum personeli
- REGISTERED_ONLY // Sadece üye veliler
- PASSWORD_PROTECTED // Şifre korumalı
