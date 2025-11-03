# Mesajlar Sayfası - WhatsApp/Instagram DM Tarzı Tasarım

## 📋 Genel Bakış

Mesajlar sayfası, WhatsApp ve Instagram Direct Message'lara benzer modern bir tasarıma sahiptir. Sol tarafta konuşma listesi, sağ tarafta seçilen mesajın detayları gösterilir.

## ✨ Özellikler

### 1. **İstatistik Kartları**
- Toplam Mesaj
- Okunmamış Mesajlar
- Acil Mesajlar
- Hover efektleri ile interaktif kartlar

### 2. **Konuşma Listesi (Sol Panel)**
- Grup başlıkları ile organize edilmiş mesajlar
- Her grup için:
  - Kişi adı
  - Toplam konuşma sayısı
  - Son mesaj tarihi
- Her konuşma için:
  - Avatar ikonu
  - Gönderen adı
  - Konu
  - Mesaj önizlemesi
  - Tarih/saat
  - Öncelik badge'i
  - Okunmamış göstergesi (mavi nokta)
  - Seçili konuşma vurgusu

### 3. **Mesaj Detay Paneli (Sağ Panel)**
- Mesaj başlığı ve durum badge'leri
- Aksiyon butonları (Yanıtla, İlet, Arşivle)
- Gönderen bilgileri kartı
- Mesaj içeriği kartı
- Öğrenci bilgileri (varsa)
- Zaman bilgileri (oluşturma, okunma, yanıt, çözüm)
- Dahili notlar (varsa)
- Memnuniyet değerlendirmesi (varsa)

### 4. **Responsive Tasarım**
- Masaüstü: Yan yana iki panel
- Mobil: Alt alta yerleşim
- Scroll optimizasyonu

## 🎨 Kullanılan Componentler

### CustomCard
Tüm kartlar için standart component kullanıldı:
- İstatistik kartları için custom stil
- Mesaj detay kartları için
- Başlık, padding, border radius, bg color özellikleri

### Icon
Phosphor icon seti kullanıldı:
- Durum ikonları
- Aksiyon butonları
- Bilgi göstergeleri

### Badge
Durum ve öncelik göstergeleri için:
- Primary, Secondary, Success, Danger, Warning, Info, Neutral
- Küçük (sm), Orta (md), Büyük (lg) boyutlar

## 📁 Dosya Yapısı

```
src/app/(public)/messages/
├── page.tsx                          # Ana sayfa - İstatistikler ve layout
├── layout.tsx                        # Layout wrapper
├── messages.css                      # Özel stiller
├── components/
│   ├── conversation-list.tsx         # Sol panel - Konuşma listesi
│   ├── message-pane.tsx              # Sağ panel - Mesaj detayı
│   ├── badge.tsx                     # Badge component (güncellendi)
│   └── index.ts                      # Export barrel
├── context/
│   └── use-messages-context.tsx      # Context (conversationGroups desteği eklendi)
├── hooks/
│   └── use-messages.ts               # API hook
└── types/
    └── message-context-types.ts      # Tip tanımları
```

## 🔧 Yapılan Değişiklikler

### 1. Context Güncellemesi (`use-messages-context.tsx`)
- `conversationGroups` API yanıtı eklendi
- `messages` array'i düzleştirilerek legacy kod uyumluluğu sağlandı
- Context'e `conversationGroups` expose edildi

### 2. ConversationList Component
- Grup başlıkları ile organize liste
- Avatar, badge, tarih formatlaması
- Hover efektleri
- Seçili konuşma vurgusu
- Okunmamış göstergesi
- Loading ve empty state'ler

### 3. MessagePane Component
- CustomCard kullanarak organize edilmiş kartlar
- Tüm mesaj detayları gösterimi
- Conditional rendering (sadece dolu alanlar gösteriliyor)
- Star rating gösterimi
- Aksiyon butonları

### 4. Page Component
- İstatistik kartları eklendi
- CustomCard ile sarmalandı
- Responsive layout
- CSS import

### 5. Badge Component Güncellemesi
- `neutral` variant eklendi
- `size` prop'u eklendi (sm, md, lg)
- Size-based padding/font-size

## 🎯 API Entegrasyonu

Backend'den gelen DTO yapısı:
```typescript
{
  success: boolean;
  message: string;
  data: MessageConversationGroupDto[];
  // Her grup:
  // - groupType
  // - conversations: MessageDto[]
  // - totalConversations
  // - personName
  // - userId
  // - lastMessageDate
}
```

## 📱 Responsive Breakpoints

- Desktop: >= 768px (yan yana)
- Mobile: < 768px (alt alta)

## 🚀 Nasıl Kullanılır

1. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

2. Tarayıcıda `/messages` sayfasına gidin

3. Sol panelden bir konuşma seçin

4. Sağ panelde detayları görüntüleyin

## 🎨 Stil Özellikleri

- Hover efektleri
- Smooth transitions
- Custom scrollbar (webkit)
- Shadow efektleri
- Border vurguları
- Renk temaları (primary, warning, danger, success, neutral)

## 🔮 Gelecek Geliştirmeler

- [ ] Arama fonksiyonu
- [ ] Filtreleme (durum, öncelik, tarih)
- [ ] Grupları collapse/expand
- [ ] Mesaj gönderme
- [ ] Dosya ekleri görüntüleme
- [ ] Real-time güncellemeler
- [ ] Yanıt yazma modal'ı
- [ ] Arşivleme fonksiyonu

## 📝 Notlar

- Tüm tarih formatlamaları Türkçe locale kullanıyor
- Icon'lar Phosphor icon seti'nden
- Bootstrap grid sistemi kullanılıyor
- Typescript ile tip güvenliği sağlanıyor
