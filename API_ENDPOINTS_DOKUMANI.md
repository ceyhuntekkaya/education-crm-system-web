# Eğitim CRM Sistemi API Endpoint'leri Dokümantasyonu

## İçindekiler
1. [Analytics Dashboard](#analytics-dashboard)
2. [Pricing (Fiyatlandırma)](#pricing-fiyatlandırma)
3. [Content (İçerik Yönetimi)](#content-içerik-yönetimi)
4. [Campaigns (Kampanyalar)](#campaigns-kampanyalar)
5. [Appointments (Randevular)](#appointments-randevular)

---

## Analytics Dashboard

### Dashboard Verileri Getir
**Endpoint:** `GET /analytics/dashboard`

**Açıklama:** Belirtilen tarih aralığında dashboard verilerini getirir. Okul, kampüs ve marka filtrelemeleri yapılabilir.

**Parametreler:**
- `startDate` (zorunlu): Başlangıç tarihi (YYYY-MM-DD formatında)
- `endDate` (zorunlu): Bitiş tarihi (YYYY-MM-DD formatında)
- `schoolId` (isteğe bağlı): Okul ID filtresi
- `campusId` (isteğe bağlı): Kampüs ID filtresi
- `brandId` (isteğe bağlı): Marka ID filtresi

**Kullanım Örneği:**
```
GET /analytics/dashboard?startDate=2024-01-01&endDate=2024-12-31&schoolId=123
```

---

## Pricing (Fiyatlandırma)

### Okul Fiyatlandırmaları Listele
**Endpoint:** `GET /pricing/school-pricing/school/{schoolId}`

**Açıklama:** Belirtilen okula ait tüm fiyatlandırma yapılarını getirir.

**Parametreler:**
- `schoolId` (zorunlu): Okul ID'si (path parameter)

**Dönüş Kodları:**
- `200`: Okul fiyatlandırmaları başarıyla getirildi
- `404`: Okul bulunamadı
- `403`: Erişim engellendi

**Kullanım Örneği:**
```
GET /pricing/school-pricing/school/123
```

**Örnek Yanıt:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "schoolId": 123,
      "pricingStructure": "...",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "message": "School pricings retrieved successfully",
  "path": "/pricing/school-pricing/school/123",
  "timestamp": "2024-10-09T12:00:00Z"
}
```

---

## Content (İçerik Yönetimi)

### 1. Okula Ait Gönderi Getir
**Endpoint:** `GET /content/posts/school/{id}`

**Açıklama:** Belirtilen okula ait gönderi detaylarını getirir.

**Parametreler:**
- `id` (zorunlu): Okul ID'si (path parameter)

**Dönüş Kodları:**
- `200`: Gönderi başarıyla getirildi
- `404`: Gönderi bulunamadı
- `403`: Erişim engellendi

### 2. Okula Ait Mesajları Getir
**Endpoint:** `GET /content/messages/school{id}`
> ⚠️ **Not:** URL'de eksik "/" işareti var. Doğrusu: `/content/messages/school/{id}` olmalı.

**Açıklama:** Belirtilen okula ait tüm mesajları getirir.

**Parametreler:**
- `id` (zorunlu): Okul ID'si (path parameter)

**Dönüş Tipi:** `List<MessageDto>`

### 3. Okula Ait Galeri Getir
**Endpoint:** `GET /content/galleries/school/{id}`

**Açıklama:** Belirtilen okula ait galeri içeriklerini getirir.

**Parametreler:**
- `id` (zorunlu): Okul ID'si (path parameter)

**Dönüş Tipi:** `List<GalleryDto>`

**Ortak Özellikler:**
- Tüm endpoint'ler aynı dönüş kodlarını kullanır (200, 404, 403)
- Yanıt formatı standart `ApiResponse` yapısındadır
- Her endpoint request URI ve timestamp bilgisi içerir

---

## Campaigns (Kampanyalar)

### Okula Ait Kampanyaları Getir
**Endpoint:** `GET /campaigns/schools/{schoolId}`

**Açıklama:** Belirtilen okula atanmış tüm kampanyaları getirir.

**Parametreler:**
- `schoolId` (zorunlu): Okul ID'si (path parameter)

**Dönüş Kodları:**
- `200`: Okul kampanyaları başarıyla getirildi
- `403`: Erişim engellendi
- `404`: Okul bulunamadı

**Kullanım Örneği:**
```
GET /campaigns/schools/123
```

**Örnek Yanıt:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "schoolId": 123,
      "campaignName": "Kayıt Kampanyası",
      "status": "ACTIVE",
      "startDate": "2024-01-01",
      "endDate": "2024-12-31"
    }
  ],
  "message": "School campaigns retrieved successfully",
  "path": "/campaigns/schools/123",
  "timestamp": "2024-10-09T12:00:00Z"
}
```

---

## Appointments (Randevular)

### 1. Okul Müsaitlik Durumu Getir
**Endpoint:** `GET /appointments/schools/{schoolId}/availability`

**Açıklama:** Belirtilen okul için belirli bir tarihteki randevu müsaitlik durumunu getirir.

**Parametreler:**
- `schoolId` (zorunlu): Okul ID'si (path parameter)
- `date` (zorunlu): Tarih (YYYY-MM-DD formatında)
- `schoolName` (isteğe bağlı): Okul adı

**Dönüş Kodları:**
- `200`: Müsaitlik durumu başarıyla getirildi
- `404`: Okul bulunamadı

### 2. Okul Müsaitlik Aralığı Getir
**Endpoint:** `GET /appointments/schools/{schoolId}/availability-range`

**Açıklama:** Belirtilen okul için tarih aralığındaki randevu müsaitlik durumunu getirir.

**Parametreler:**
- `schoolId` (zorunlu): Okul ID'si (path parameter)
- `startDate` (zorunlu): Başlangıç tarihi (YYYY-MM-DD)
- `endDate` (zorunlu): Bitiş tarihi (YYYY-MM-DD)
- `schoolName` (isteğe bağlı): Okul adı

**Dönüş Tipi:** `List<AppointmentAvailabilityDto>`

### 3. Randevu İstatistikleri Getir
**Endpoint:** `GET /appointments/schools/{schoolId}/statistics`

**Açıklama:** Belirtilen okul için randevu istatistiklerini getirir.

**Parametreler:**
- `schoolId` (zorunlu): Okul ID'si (path parameter)
- `periodStart` (zorunlu): Dönem başlangıç tarihi (YYYY-MM-DD)
- `periodEnd` (zorunlu): Dönem bitiş tarihi (YYYY-MM-DD)

**Dönüş Kodları:**
- `200`: İstatistikler başarıyla getirildi
- `403`: Erişim engellendi
- `404`: Okul bulunamadı

**Kullanım Örneği:**
```
GET /appointments/schools/123/statistics?periodStart=2024-01-01&periodEnd=2024-12-31
```

> ⚠️ **Not:** Bu endpoint dokümanda iki kez tanımlanmış. Tekrar kontrol edilmesi önerilir.

---

## Genel Özellikler

### Ortak Yanıt Formatı
Tüm endpoint'ler standart `ApiResponse` formatını kullanır:

```json
{
  "success": boolean,
  "data": any,
  "message": string,
  "path": string,
  "timestamp": string
}
```

### Güvenlik
- Tüm endpoint'ler `HttpServletRequest` parametresi alır (yetkilendirme için)
- Çoğu endpoint 403 (Forbidden) yanıtı verebilir
- Kaynak bulunamadığında 404 yanıtı döner

### Tarih Formatı
- Tüm tarih parametreleri ISO tarih formatında (YYYY-MM-DD) beklenir
- `@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)` annotation'ı kullanılır

### Loglama
- Tüm endpoint'lerde debug seviyesinde log kaydı yapılır
- Log mesajları endpoint'in amacını ve parametrelerini içerir

---

## Dikkat Edilmesi Gereken Noktalar

1. **URL Hatası:** `/content/messages/school{id}` endpoint'inde eksik "/" var
2. **Tekrar Eden Endpoint:** Appointment statistics endpoint'i iki kez tanımlanmış
3. **Tutarlılık:** Tüm endpoint'ler aynı response formatını ve error handling yapısını kullanıyor
4. **Documentation:** Her endpoint OpenAPI/Swagger annotations ile dokümante edilmiş

---

## Öneriler

1. **URL Düzeltmesi:** Messages endpoint'inin URL'si düzeltilmeli
2. **Tekrar Eden Kod:** Duplicate appointment statistics endpoint'i kaldırılmalı  
3. **Validasyon:** Tarih aralığı kontrolü (startDate <= endDate) eklenebilir
4. **Pagination:** Liste dönen endpoint'lere sayfalama desteği eklenebilir
5. **Caching:** Sık kullanılan veriler için önbellek mekanizması düşünülebilir

---

*Bu doküman, sistem geliştirme ve entegrasyon süreçlerinde referans olarak kullanılabilir.*