# 💬 WhatsApp Web Tarzı Mesajlaşma Sayfası

## 🎨 Tasarım Konsepti

Bu sayfa, **WhatsApp Web**'in görünüm ve hissini tam olarak taklit eder:
- ✅ Sol panel: Konuşma listesi
- ✅ Sağ panel: Mesaj baloncukları (chat bubbles)
- ✅ WhatsApp renk şeması (#25D366 yeşil vb.)
- ✅ Okundu işaretleri (çift tik)
- ✅ Tarih ayırıcılar
- ✅ Sistem mesajları
- ✅ Gelen/Giden mesaj baloncukları

---

## 📸 Ekran Görünümü

```
┌─────────────────────────────────────────────────────────────┐
│  📊 İstatistik Kartları (Üstte)                              │
│  [Toplam Mesaj] [Okunmamış] [Acil]                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    📨 Mesajlarım                              │
│  WhatsApp Web tarzı mesajlaşma arayüzü                       │
├──────────────────────┬──────────────────────────────────────┤
│  SOL PANEL (420px)   │  SAĞ PANEL (Geri kalan alan)         │
│                      │                                        │
│  🔍 Ara veya yeni    │  👤 Kullanıcı Adı                     │
│      sohbet başlat   │  📧 user@email.com                    │
│  ──────────────────  │  ────────────────────────────────────│
│                      │                                        │
│  👤 Fatma Yılmaz     │     📅 24 Ağu 2025                    │
│  Çok parlıyor... 21:25│                                       │
│  ● 1                 │     🏷️ [RESOLVED] [HIGH] #MSG-001    │
│                      │                                        │
│  👤 Ahmet Kaya       │     ┌──────────────────────┐          │
│  Teşekkürler    Dün  │     │ AnaKurumu Kayıt       │ Gelen   │
│                      │     │ Bilgileri            │          │
│  👤 Zeynep...   10:29│     │                 21:25│          │
│  Merhaba        ● 4  │     └──────────────────────┘          │
│                      │                                        │
│  ...                 │     ┌──────────────────────┐          │
│                      │     │ 5 yaşındaki kızım... │ Gelen   │
│                      │     │ için...         21:25│          │
│                      │     └──────────────────────┘          │
│                      │                                        │
│                      │     ┌──────────────────────┐          │
│                      │ ┌───┤ Mesajınız alındı    │ Giden   │
│                      │ │   │ ve yanıtlandı  ✓✓  │          │
│                      │ │   │                16:30│          │
│                      │ │   └──────────────────────┘          │
│                      │                                        │
│                      │  ────────────────────────────────────│
│                      │  😊 📎  Bir mesaj yazın...        ➤  │
└──────────────────────┴──────────────────────────────────────┘
```

---

## 🚀 Özellikler

### 1️⃣ **Sol Panel - Konuşma Listesi**

#### Header
- 📌 "Mesajlar" başlığı
- 🔍 Arama ikonu
- ⋮ Menü ikonu

#### Arama Çubuğu
- 🔍 "Ara veya yeni sohbet başlat" placeholder
- WhatsApp tarzı gri arka plan

#### Konuşma Kartları
Her konuşma için:
- 👤 **Avatar**: Gradient background (yeşil = okunmamış)
- 📝 **İsim**: Bold okunmamışlar için
- 🕒 **Tarih/Saat**: 
  - Bugün → Saat (21:25)
  - Dün → "Dün"
  - Hafta içi → Gün adı (Paz, Pzt, ...)
  - Eskiler → Tarih (24/08/25)
- 💬 **Önizleme**: Son mesaj (50 karakter)
- ⚠️ **Acil ikon**: URGENT/CRITICAL mesajlar için
- 🔵 **Okunmamış badge**: Yeşil zemin, beyaz sayı

#### Seçili Konuşma
- Sol kenarda **4px yeşil border** (#25D366)
- Gri arka plan (#F0F2F5)

---

### 2️⃣ **Sağ Panel - Mesaj Alanı**

#### Boş Durum
- 💬 Büyük chat ikonu
- "Mesajlarınızı Görüntüleyin" başlığı
- "Bir konuşma seçerek mesajlaşmaya başlayın" açıklaması

#### Chat Header
- 👤 Avatar
- 📝 Kullanıcı adı ve email
- 🔍 Arama ikonu
- ⋮ Menü ikonu

#### Mesaj Alanı
WhatsApp desenli arka plan üzerinde:

##### 📅 Tarih Ayırıcı
```
─────────  24 Ağustos 2025  ─────────
```

##### 🏷️ Sistem Mesajı (Durum/Öncelik)
```
┌──────────────────────────────┐
│  [RESOLVED] [HIGH] #MSG-001  │
└──────────────────────────────┘
```

##### 💬 Gelen Mesajlar (Sol - Beyaz)
```
┌─────────────────────────┐
│ Konu: AnaKurumu Kayıt    │
│                    21:25│
└─────────────────────────┘

┌─────────────────────────┐
│ 5 yaşındaki kızım için  │
│ anaKurumu kaydı...       │
│                    21:25│
└─────────────────────────┘
```

##### 📊 Bilgi Mesajları (Sol - Turuncu kenarlı)
```
┌─ 🎓 Öğrenci Bilgileri ───┐
│ İsim: Aylin Yılmaz       │
│ Yaş: 5                   │
│ Sınıf: AnaKurumu          │
│                    21:25│
└─────────────────────────┘

┌─ 📞 İletişim Tercihleri ─┐
│ ✓ Geri arama talebi      │
│ ✓ Randevu talebi         │
│ Saat: 09:00-17:00        │
│                    21:25│
└─────────────────────────┘
```

##### ✉️ Giden Mesajlar (Sağ - Yeşil)
```
                ┌─────────────┐
                │ Mesajınız   │
                │ alındı ve   │
                │ yanıtlandı  │
                │   16:30 ✓✓  │
                └─────────────┘
```

##### 📝 Dahili Notlar (Sağ - Mavi kenarlı)
```
                ┌─────────────┐
                │ 📝 Dahili Not│
                │ Veli çok...  │
                │         Not  │
                └─────────────┘
```

##### ⭐ Memnuniyet Değerlendirmesi
```
┌──────────────────────────────┐
│   ⭐ Memnuniyet: 5/5          │
│   "Çok hızlı yanıt aldık!"   │
└──────────────────────────────┘
```

#### Chat Footer
- 😊 Emoji ikonu
- 📎 Dosya ekleme ikonu
- 💬 "Bir mesaj yazın" input (disabled)
- ➤ Gönder butonu (yeşil, yuvarlak)

---

## 🎨 Renk Paleti

### WhatsApp Renkleri
```css
/* Yeşil - Ana Tema */
--wa-green: #25D366;
--wa-green-dark: #20BD5A;
--wa-teal: #00A884;

/* Arka Planlar */
--wa-bg-panel: #F0F2F5;
--wa-bg-chat: #EFEAE2;
--wa-bg-selected: #F0F2F5;

/* Mesaj Baloncukları */
--wa-bubble-incoming: #FFFFFF;
--wa-bubble-outgoing: #D9FDD3;
--wa-bubble-info: #FFF4E5;
--wa-bubble-admin: #E3F2FD;

/* Metinler */
--wa-text-primary: #111B21;
--wa-text-secondary: #667781;
--wa-text-tertiary: #54656F;

/* Kenarlıklar */
--wa-border: #E9EDEF;
```

---

## 📂 Dosya Yapısı

```
src/app/(public)/messages/
├── page.tsx                                 # Ana sayfa (WhatsApp layout)
├── whatsapp-style.css                       # WhatsApp Web stilleri
├── components/
│   ├── conversation-list-whatsapp.tsx       # Sol panel
│   ├── message-pane-whatsapp.tsx            # Sağ panel (chat bubbles)
│   └── index.ts                             # Exports
├── context/
│   └── use-messages-context.tsx             # State management
└── README-WHATSAPP.md                       # Bu dosya
```

---

## 🔧 Teknik Detaylar

### Bileşenler

#### ConversationListWhatsApp
- Konuşmaları düz liste olarak gösterir (grupları flatten eder)
- Avatar gradient'leri (okunmamış = yeşil)
- WhatsApp tarzı tarih formatı
- Okunmamış badge (yeşil, yuvarlak)
- Seçili vurgu (yeşil sol border)

#### MessagePaneWhatsApp
- WhatsApp desenli arka plan
- Tarih ayırıcılar
- Sistem mesajları (durum/öncelik)
- Gelen mesajlar (sol, beyaz)
- Giden mesajlar (sağ, yeşil)
- Bilgi mesajları (öğrenci, iletişim)
- Dahili notlar (admin view)
- Memnuniyet değerlendirmesi
- Okundu işaretleri (✓✓)
- Disabled mesaj input'u

---

## 🚀 Kullanım

### Development
```bash
npm run dev
```

Tarayıcıda: `http://localhost:3000/messages`

### Özellikler

1. **Sol panelden konuşma seçin** → Sağda mesajlar açılır
2. **Okunmamış mesajlar** → Yeşil avatar ve badge
3. **Mesaj baloncukları** → WhatsApp tarzı
4. **Sistem mesajları** → Durum ve öncelik göstergeleri
5. **Bilgi kartları** → Öğrenci, iletişim bilgileri

---

## 📱 Responsive Tasarım

- **Desktop**: Sol 420px, sağ geri kalan alan
- **Tablet**: Aynı yapı, biraz daha sıkışık
- **Mobile**: Alt alta yerleşim (gelecek güncelleme)

---

## ✨ Animasyonlar

- Mesaj baloncukları: `slideIn` (0.2s)
- Hover efektleri: `0.15s ease`
- Renk geçişleri: `0.2s ease`
- Avatar gradients: Smooth

---

## 🎯 Gelecek Geliştirmeler

- [ ] Gerçek mesaj gönderme
- [ ] Dosya ekleme
- [ ] Emoji picker
- [ ] Arama fonksiyonu
- [ ] Konuşma silme/arşivleme
- [ ] Grup konuşmaları
- [ ] Sesli/görüntülü arama butonları
- [ ] Online/offline durumu
- [ ] Yazıyor... göstergesi
- [ ] Mesaj iletme
- [ ] Mesajı yanıtlama (reply)
- [ ] Real-time güncellemeler (WebSocket)

---

## 🎨 Özelleştirme

### Renkleri Değiştirmek
`whatsapp-style.css` dosyasında:
```css
/* Yeşil yerine mavi tema için */
.unread-badge {
  background-color: #2196F3; /* Mavi */
}

.footer-send {
  background-color: #2196F3; /* Mavi */
}
```

### Panel Genişliğini Ayarlamak
`page.tsx` içinde:
```tsx
<div style={{ width: "500px" }}> {/* 420px yerine */}
```

---

## 📝 Notlar

- ✅ Tüm mesaj tipleri destekleniyor (ENROLLMENT_INQUIRY, GENERAL_INQUIRY, vb.)
- ✅ Öncelik seviyeleri renk kodlu (CRITICAL→Kırmızı, HIGH→Turuncu, vb.)
- ✅ Durum göstergeleri (NEW, READ, IN_PROGRESS, RESOLVED, CLOSED)
- ✅ Otomatik tarih formatlaması (bugün→saat, dün→"Dün", vb.)
- ✅ Okundu işaretleri (çift tik)
- ✅ Avatar gradients (okunmamış→yeşil)
- ✅ WhatsApp background pattern

---

## 🙏 Teşekkürler

WhatsApp Web'den ilham alınarak oluşturuldu. Tasarım ve UX, WhatsApp'ın mükemmel kullanıcı deneyimini taklit eder.

**Keyifli mesajlaşmalar! 💬**
