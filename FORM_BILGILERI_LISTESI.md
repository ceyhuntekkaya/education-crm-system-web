# 🎯 EĞİTİM CRM SİSTEMİ - FORM BİLGİLERİ LİSTESİ

---

## 📋 **1. KURUM KAYDI (Register)**

**Sayfa:** `/auth/register/institution`  
**Açıklama:** Yeni kurum kaydı oluşturmak için çok adımlı kayıt formu

---

### **ADIM 1: GİRİŞ BİLGİLERİ**

**İçerik:** Sisteme giriş için kullanılacak email ve şifre belirleme

#### Zorunlu Bilgiler:

- ✅ **E-posta Adresi** _(Zorunlu, Geçerli email formatı)_
  - Bu email sisteme giriş için kullanılacak
- ✅ **Şifre** _(Zorunlu, Min 8 karakter)_
  - En az bir büyük harf, bir küçük harf
  - En az bir rakam ve bir özel karakter içermeli
- ✅ **Şifre Onay** _(Zorunlu, Şifrelerle eşleşmeli)_

---

### **ADIM 2: KİŞİSEL BİLGİLER**

**İçerik:** İletişim bilgileri

#### Zorunlu Bilgiler:

- ✅ **Ad** _(Zorunlu, Min 2, Max 50 karakter)_
- ✅ **Soyad** _(Zorunlu, Min 2, Max 50 karakter)_
- ✅ **E-posta Adresi** _(Otomatik gelir, Adım 1'den)_
- ✅ **Telefon Numarası** _(Zorunlu, 10 hane)_

**Not:** E-posta adresi Adım 1'de kaydedildiği için bu adımda değiştirilemez.

---

### **ADIM 3: DOĞRULAMA**

**İçerik:** E-posta doğrulama kodu girişi

#### Zorunlu Bilgiler:

- ✅ **4 Haneli Doğrulama Kodu** _(Zorunlu, Sadece rakam)_
  - Kod e-posta adresinize gönderilir
  - Her hane için bir kutu bulunur (code1, code2, code3, code4)

---

### **ADIM 4: KAMPÜS BİLGİLERİ**

**İçerik:** Kampüs marka ve lokasyon bilgileri

#### Temel Bilgiler:

- ✅ **Marka** _(Zorunlu, Listeden arama yaparak seçim)_
- ✅ **Kampüs Adı** _(Zorunlu, Min 2, Max 100 karakter)_

#### Lokasyon Bilgileri:

- ✅ **İl** _(Zorunlu, Listeden arama yaparak seçim)_
- ✅ **İlçe** _(Zorunlu, Listeden arama yaparak seçim - İl seçildikten sonra aktif olur)_
- ✅ **Mahalle** _(Zorunlu, Listeden arama yaparak seçim - İlçe seçildikten sonra aktif olur)_
- ✅ **Adres Detayı (1. Satır)** _(Zorunlu, Min 5, Max 200 karakter)_
  - Cadde, sokak, bina no
- ✅ **Adres Detayı (2. Satır)** _(Zorunlu, Max 200 karakter)_
  - Daire no, blok, kat
- ✅ **Posta Kodu** _(Zorunlu, 5 haneli)_

**Not:** Ülke seçimi Türkiye olarak otomatik belirlenir.

---

### **ADIM 5: PAKET SEÇİMİ**

**İçerik:** Üyelik paket seçimi

#### Zorunlu Bilgiler:

- ✅ **Paket Seçimi** _(Zorunlu)_
  - Farklı paket seçenekleri kartlar halinde gösterilir
  - Her pakette:
    - Paket Adı (Örn: Basic, Professional, Enterprise)
    - Fiyat bilgisi (Aylık/Üç Aylık/Yıllık)
    - Özellik listesi
    - İndirim oranı (varsa)
    - Deneme süresi (varsa)

#### Otomatik Kaydedilenler:

- ⚪ Plan Adı
- ⚪ Faturalama Periyodu (monthly/quarterly/yearly)
- ⚪ Fiyat
- ⚪ İndirim Yüzdesi
- ⚪ Deneme Günü Sayısı

---

### **ADIM 6: TAMAMLANDI**

**İçerik:** Kayıt başarıyla tamamlandı mesajı ve yönlendirme

**Not:** Ödeme bilgileri adımı şu anda devre dışıdır.

---

## 📋 **2. KULLANICI EKLE/DÜZENLE**

**Sayfa:** `/company/users/add-edit`

### **Temel Bilgiler**

- ✅ **Ad** _(Zorunlu)_
- ✅ **Soyad** _(Zorunlu)_
- ✅ **E-posta** _(Zorunlu, Geçerli email formatı)_
- ✅ **Telefon** _(Zorunlu)_

### **Şifre Bilgileri** _(Sadece yeni kullanıcı eklerken)_

- ✅ **Şifre** _(Zorunlu, Min 8 karakter)_
- ✅ **Şifre Onayı** _(Zorunlu, Şifrelerle eşleşmeli)_

### **Profil Resmi** _(Sadece düzenleme modunda)_

- ⚪ Profil Resmi URL

### **Bildirim Tercihleri**

- ⚪ E-posta bildirimleri almak istiyorum
- ⚪ SMS bildirimleri almak istiyorum
- ⚪ Pazarlama e-postaları almak istiyorum

### **Kullanım Koşulları** _(Sadece yeni kullanıcı eklerken)_

- ✅ **Kullanım koşullarını kabul ediyorum** _(Zorunlu)_
- ✅ **Gizlilik politikasını kabul ediyorum** _(Zorunlu)_
- ⚪ Pazarlama iletişimlerine izin veriyorum

---

## 📋 **3. KAMPÜS BİLGİSİ DÜZENLE**

**Sayfa:** `/company/campus-detail/add-edit`  
**Açıklama:** Kampüs bilgileri kayıt sırasında (Adım 4) oluşturulur. Bu formda sadece mevcut kampüs bilgileri düzenlenebilir.

### **Temel Bilgiler**

- ✅ **Kampüs Adı** _(Zorunlu)_
- ✅ **Kuruluş Yılı** _(Zorunlu)_
- ⚪ Açıklama

### **İletişim Bilgileri**

- ✅ **E-posta** _(Zorunlu, Geçerli email formatı)_
- ✅ **Telefon** _(Zorunlu)_
- ⚪ Fax
- ⚪ Website URL

### **Adres Bilgileri**

- ✅ **Ülke** _(Zorunlu, Listeden arama yaparak seçim)_
- ✅ **İl** _(Zorunlu, Listeden arama yaparak seçim)_
- ✅ **İlçe** _(Zorunlu, Listeden arama yaparak seçim)_
- ✅ **Mahalle** _(Zorunlu, Listeden arama yaparak seçim)_
- ⚪ Adres Satır 1
- ⚪ Adres Satır 2
- ⚪ Posta Kodu

### **Görsel Bilgiler**

- ⚪ Logo _(Dosya yükleme, Max 5MB)_
- ⚪ Kapak Resmi _(Dosya yükleme, Max 5MB)_

### **Sosyal Medya**

- ⚪ Facebook URL
- ⚪ Twitter URL
- ⚪ Instagram URL
- ⚪ LinkedIn URL
- ⚪ YouTube URL

---

## 📋 **4. KURUM BİLGİSİ EKLE/DÜZENLE**

**Sayfa:** `/company/school-list/add-edit`

### **Temel Bilgiler**

- ✅ **Kurum Adı** _(Zorunlu)_
- ✅ **Kurum Kategorisi** _(Zorunlu, Listeden arama yaparak seçim)_
- ✅ **Kurum Tipi** _(Zorunlu, Listeden arama yaparak seçim - kategoriye göre filtrelenir)_
- ⚪ Açıklama

### **İletişim Bilgileri**

- ⚪ E-posta _(Geçerli email formatı)_
- ⚪ Telefon
- ⚪ Dahili

### **Sosyal Medya Linkleri**

- ⚪ Facebook URL
- ⚪ Twitter URL
- ⚪ Instagram URL
- ⚪ LinkedIn URL
- ⚪ YouTube URL

### **Eğitim Bilgileri**

- ⚪ Minimum Yaş _(0-100)_
- ⚪ Maksimum Yaş _(0-100)_
- ⚪ Kapasite
- ⚪ Mevcut Öğrenci Sayısı
- ⚪ Maksimum Sınıf Mevcudu
- ⚪ Eğitim Dili _(Listeden arama yaparak seçim)_

### **Görsel Bilgiler**

- ⚪ Kurum Logosu _(Dosya yükleme, Max 5MB)_
- ⚪ Kapak Resmi _(Dosya yükleme, Max 5MB)_

### **Özellikler**

- ⚪ **Kurum Tipine Özel Özellikler** _(Çoklu seçim checkbox'ları - kurum tipine göre dinamik)_

---

## 📋 **5. FİYAT BİLGİSİ EKLE/DÜZENLE**

**Sayfa:** `/company/pricing/add-edit`

### **Öğrenim Ücretleri**

- ⚪ Yıllık Öğrenim Ücreti (₺)
- ⚪ Aylık Öğrenim Ücreti (₺)
- ⚪ Dönemlik Öğrenim Ücreti (₺)

### **Ödeme Koşulları**

- ✅ **Ödeme Sıklığı** _(Zorunlu: Tek Seferlik, Aylık, Dönemlik, Yıllık, vb.)_
- ⚪ Taksit Sayısı _(1-60 arası)_

### **İndirimler (Yüzde %)**

- ⚪ Peşinat Yüzdesi _(0-100)_
- ⚪ Erken Ödeme İndirimi _(0-100)_
- ⚪ Kardeş İndirimi _(0-100)_
- ⚪ Çoklu Yıl İndirimi _(0-100)_

### **Ceza ve İadeler (Yüzde %)**

- ⚪ Geç Ödeme Ceza Yüzdesi _(0-100)_

### **Geçerlilik Tarihleri**

- ✅ **Başlangıç Tarihi** _(Zorunlu)_
- ✅ **Bitiş Tarihi** _(Zorunlu, Başlangıç tarihinden sonra olmalı)_

---

## 📋 **6. ÖZEL ÜCRET EKLE/DÜZENLE**

**Sayfa:** `/company/custom-fees/add-edit`

### **Temel Bilgiler**

- ✅ **Ücret Adı** _(Zorunlu, Min 3, Max 200 karakter)_
- ✅ **Ücret Türü** _(Zorunlu, Listeden arama yaparak seçim)_
- ✅ **Ücret Tutarı** _(Zorunlu, Pozitif sayı, ₺)_
- ✅ **Ücret Sıklığı** _(Zorunlu: Tek Seferlik, Aylık, Üç Aylık, Dönemlik, Yıllık, vb.)_
- ⚪ Durum _(Taslak, Onay Bekliyor, Aktif, Pasif, vb.)_
- ⚪ Açıklama _(Max 1000 karakter)_

### **Uygulanma Kuralları**

- ⚪ Zorunlu Ücret
- ⚪ İade Edilebilir
- ⚪ Yeni Öğrencilere Uygulanır
- ⚪ Mevcut Öğrencilere Uygulanır

### **Ödeme Ayarları**

- ⚪ Vade Günü Farkı _(Gün sayısı)_
- ⚪ Gecikme Ücreti Yüzdesi _(%, 0-100 arası)_
- ⚪ Maksimum Taksit Sayısı
- ⚪ Taksit İzni Var
- ⚪ İndirilebilir
- ⚪ Burs Uygulanabilir
- ⚪ Gerekli Dokümanlar _(Metin)_
- ⚪ Ücret Politikası _(Metin)_

---

## 📋 **7. GALERİ EKLE/DÜZENLE**

**Sayfa:** `/company/gallery/add-edit`

### **Temel Bilgiler**

- ✅ **Galeri Tipi** _(Zorunlu, Listeden arama yaparak seçim: Fotoğraf, Video, vb.)_
- ✅ **Başlık** _(Zorunlu, Min 3, Max 200 karakter)_
- ⚪ Açıklama

### **Görsel Bilgiler**

- ⚪ Kapak Görseli _(Dosya yükleme, Max 5MB)_

### **Galeri Öğeleri**

- ⚪ **Galeri Öğeleri** _(Çoklu dosya yükleme, Max 20 dosya, 100MB total)_

### **Görünürlük ve Ayarlar**

- ✅ **Görünürlük** _(Zorunlu: Herkese Açık, Özel, vb.)_
- ⚪ Öne Çıkan

---

## 📋 **8. SOSYAL MEDYA GÖNDERİSİ EKLE/DÜZENLE**

**Sayfa:** `/company/social-media/add-edit`

### **Temel Bilgiler**

- ✅ **Başlık** _(Zorunlu, Min 3, Max 200 karakter)_
- ✅ **Gönderi Tipi** _(Zorunlu, Listeden arama yaparak seçim)_
- ✅ **İçerik** _(Zorunlu)_

### **Durum ve Zamanlama**

- ✅ **Durum** _(Zorunlu: Taslak, Yayında, Zamanlanmış, vb.)_
- ⚪ Zamanlanmış Tarih _(Tarih ve saat)_
- ⚪ Son Kullanma Tarihi _(Tarih ve saat)_

### **Medya İçeriği**

- ⚪ Kapak Görseli _(Dosya yükleme, Max 5MB)_
- ⚪ **Medya Ekleri** _(Çoklu dosya yükleme, Max 20 dosya, 100MB total)_

---

## 📋 **9. KAMPANYA EKLE/DÜZENLE**

**Sayfa:** `/company/campaigns/add-edit`

### **Temel Bilgiler**

- ✅ **Kampanya Başlığı** _(Zorunlu, Min 3, Max 200 karakter)_
- ✅ **Kampanya Tipi** _(Zorunlu, Listeden arama yaparak seçim)_
- ✅ **İndirim Tipi** _(Zorunlu, Listeden arama yaparak seçim)_
- ⚪ Kısa Açıklama
- ⚪ Açıklama

### **İndirim Bilgileri**

- ⚪ İndirim Miktarı (TL)
- ⚪ İndirim Yüzdesi (%)

### **Kampanya Dönemi**

- ✅ **Başlangıç Tarihi** _(Zorunlu)_
- ✅ **Bitiş Tarihi** _(Zorunlu, Başlangıç tarihinden sonra olmalı)_

### **Kampanya Ayarları**

- ⚪ Öne Çıkan
- ⚪ Herkese Açık
- ⚪ Onay Gerekli

### **Görsel Bilgiler**

- ⚪ Kapak Görseli _(Dosya yükleme, Max 5MB)_
- ⚪ Küçük Resim _(Dosya yükleme, Max 5MB)_

---

## 📋 **10. RANDEVU YÖNETİMİ**

**Sayfa:** `/company/appointment-availability`

---

### **10.1 - RANDEVU MÜSAİTLİK EKLE/DÜZENLE**

**Sayfa:** `/company/appointment-availability/add-edit`

#### **Randevu Bilgileri**

- ✅ **Personel** _(Zorunlu, Listeden arama yaparak seçim)_
- ✅ **Tarih Seçimi** _(Zorunlu, Çoklu tarih seçimi, Bugünden itibaren)_
- ✅ **Saat Dilimleri** _(Zorunlu, Çoklu saat dilimi seçimi, 09:00-18:00 arası, 30 dakika aralıklar)_

---

### **10.2 - RANDEVU NOTU EKLE**

**Sayfa:** `/company/appointment-availability/detail/[id]`

#### **Not Bilgileri**

- ✅ **Not Türü** _(Zorunlu, Listeden arama yaparak seçim)_
  - Genel
  - Hazırlık
  - Takip
  - Sonuç
  - Şikayet
  - İltifat
  - Teknik Sorun
  - Yeniden Planlama
  - İptal
  - Olumsuzluk Sebebi
  - Hatırlatma
  - Dahili

#### **Not İçeriği**

- ✅ **Not** _(Zorunlu, Min 1, Max 2000 karakter)_
  - "Olumsuzluk Sebebi" seçiliyse listeden seçim olarak gösterilir
  - Diğer durumlarda metin alanı olarak gösterilir

#### **Not Ayarları**

- ⚪ Özel Not _(Checkbox)_
- ⚪ Önemli Not _(Checkbox)_

**Not:** Her randevu için birden fazla not eklenebilir.

---

### **10.3 - ANKET GÖNDERME**

**Sayfa:** `/company/appointment-availability/detail/[id]`

#### **Anket Seçimi**

- ✅ **Anket Seçimi** _(Zorunlu)_
  - Sistemde tanımlı anketler listesinden seçim yapılır
  - Seçilen anket bilgileri:
    - Anket Başlığı
    - Soru Sayısı
    - Tahmini Süre (varsa)

**İşlem:** Seçilen anket randevu katılımcısına gönderilir.

**Not:**

- Her randevu için birden fazla anket gönderilebilir
- Anketler kullanıcının e-posta adresine iletilir
- Anket sonuçları sistem içinde takip edilebilir

---

## 📋 **11. ANKET DEĞERLENDİRME**

**Sayfa:** `/company/survey`

### **Değerlendirme**

- ⚪ **Yıldız Puanlaması** _(Her soru için 0-5 arası puan)_

**Not:** Bu form sadece gönderilmiş anketleri değerlendirmek için kullanılır. Yeni anket oluşturma formu bulunmamaktadır.

---

## 📊 **GENEL ÖZET İSTATİSTİKLER**

- **Toplam Form Kategorisi:** 12
- **Toplam Alt Form Sayısı:** 14 (Randevu yönetiminde 3 alt form)
- **Kurum Kayıt Adım Sayısı:** 6 adım
- **Toplam Zorunlu Alan Sayısı:** ~70+
- **Dosya Yükleme Gerektiren Form Sayısı:** 7
- **Listeden Arama Yaparak Seçim Alanı İçeren Form Sayısı:** 13
- **Tarih/Saat Alanı İçeren Form Sayısı:** 4
- **Çoklu Dosya Yükleme Destekleyen Form:** 2 (Galeri ve Sosyal Medya)
- **E-posta Doğrulama Gerektiren Form:** 1 (Kurum Kayıt)
- **Dinamik Form Alanı İçeren:** 2 (Randevu Notu, Kurum Özellikleri)

---

## ⚠️ **NOTLAR VE UYARILAR**

1. **Kurum Kayıt Süreci:** İlk kayıt için 6 adımlı bir süreç tamamlanmalıdır
2. **E-posta Doğrulama:** Kayıt sırasında e-posta doğrulama zorunludur
3. **Zorunlu Alanlar (✅):** İşaretli alanlar mutlaka doldurulmalıdır
4. **Opsiyonel Alanlar (⚪):** Bu alanlar isteğe bağlıdır
5. **Dosya Yüklemeleri:** Çoğu dosya yüklemesi Max 5MB ile sınırlıdır
6. **Çoklu Dosya Yüklemeleri:** Galeri ve Sosyal Medya formlarında toplamda 100MB ve max 20 dosya yüklenebilir
7. **Tarih Alanları:** Bitiş tarihleri başlangıç tarihlerinden sonra olmalıdır
8. **Email Alanları:** Geçerli email formatında olmalıdır
9. **URL Alanları:** Geçerli URL formatında olmalıdır
10. **Sayısal Alanlar:** Belirtilen min-max aralıklarda olmalıdır
11. **Adım Bazlı Kayıt:** Her adım tamamlandıktan sonra sonraki adıma geçilebilir
12. **Lokasyon Seçimi:** İl, İlçe, Mahalle seçimi sıralı olarak yapılmalıdır (İl seçildikten sonra İlçeler, İlçe seçildikten sonra Mahalleler listelenir)
13. **Randevu Notları:** Her randevu için birden fazla not eklenebilir, not türüne göre form alanları değişir
14. **Anket Gönderimi:** Randevu detayından kullanıcılara anket gönderilebilir, anket seçimi yapıldıktan sonra gönderilir

---

## 📝 **KULLANIM REHBERİ**

### Kurumlara Gönderilecek Hazırlık Listesi

Bu dokümandaki tüm formlar için kurumların önceden hazırlaması gereken bilgiler:

#### **Kayıt Öncesi Hazırlık:**

1. Geçerli bir e-posta adresi
2. Güvenli bir şifre
3. Marka bilgileri (Kayıt sırasında listeden seçilecek)
4. Kampüs adı ve adres detayları (İl, İlçe, Mahalle, Adres, Posta Kodu)

#### **Sistem Kullanımı İçin:**

1. **Kullanıcı Bilgileri:** Tüm personel için ad, soyad, e-posta, telefon
2. **Kampüs Ek Bilgileri (Düzenleme için):** Logo, kapak görseli, kuruluş yılı, fax, website, sosyal medya linkleri
3. **Kurum Bilgileri:** Kurum kategorisi, tipi, eğitim dili, kapasiteler
4. **Fiyatlandırma:** Tüm ücret kalemleri ve ödeme koşulları
5. **Görsel Materyaller:** Logo, kapak görselleri, galeri fotoğrafları
6. **İçerik:** Kampanya metinleri, sosyal medya içerikleri
7. **Paket Bilgileri:** Hangi üyelik paketini seçecekleri

#### **Önerilen Hazırlık Sırası:**

1. İlk olarak kurum kaydını tamamlayın (Bu adımda kampüs temel bilgileri de oluşturulur)
2. Kullanıcıları sisteme ekleyin
3. Kampüs bilgilerini güncelleyin (Logo, görsel, iletişim bilgileri ekleyin)
4. Kurum bilgilerini doldurun
5. Fiyatlandırma ve ücret bilgilerini girin
6. Görsel içerikleri yükleyin (Galeri)
7. Kampanya ve sosyal medya içeriklerini oluşturun
8. Randevu sistemi için müsaitlik ayarlarını yapın

---

**Hazırlayan:** Sistem Yönetimi  
**Son Güncelleme:** 2024  
**Versiyon:** 1.0

---

_Bu dokümanda yer alan tüm bilgiler sistemin mevcut versiyonuna göre hazırlanmıştır. Sistem güncellemeleri ile bazı alanlar değişiklik gösterebilir._

