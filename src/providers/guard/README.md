# Guards Dokümantasyonu

Bu dosya, authentication ve authorization guard'larının nasıl kullanılacağını açıklar.

## İçindekiler

- [Genel Bakış](#genel-bakış)
- [Dosya Yapısı](#dosya-yapısı)
- [ProtectedGuard](#protectedguard)
- [Kullanım Örnekleri](#kullanım-örnekleri)
- [Guard Türleri](#guard-türleri)
- [Yetkilendirme Kontrolleri](#yetkilendirme-kontrolleri)
- [En İyi Uygulamalar](#en-iyi-uygulamalar)

## Genel Bakış

Guards sistemi, uygulamanızda sayfa ve bileşen düzeyinde authentication (kimlik doğrulama) ve authorization (yetkilendirme) kontrolü sağlar. Bu sistem, kullanıcıların sadece yetkili oldukları alanlara erişmesini sağlar.

## Dosya Yapısı

```txt
src/providers/guard/
├── index.ts              # Export barrel dosyası
├── protected-guard.tsx   # Ana guard component'i
└── README.md            # Bu dokümantasyon
```

### index.ts

```typescript
export { default as ProtectedGuard } from "./protected-guard";
```

## ProtectedGuard

Ana guard component'i olan `ProtectedGuard`, farklı türlerde koruma sağlar.

### Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `children` | `React.ReactNode` | - | Korunacak içerik |
| `allowedDepartments` | `string[]` | `undefined` | İzin verilen departmanlar |
| `allowedPermissions` | `string[]` | `undefined` | İzin verilen yetkiler |
| `guardType` | `GuardType` | `GuardType.PUBLIC` | Guard türü |

### Guard Türleri

#### 1. PUBLIC

- Herkese açık alanlar için kullanılır
- Kullanıcı giriş yapmamış olabilir
- Minimum koruma sağlar

```tsx
<ProtectedGuard guardType={GuardType.PUBLIC}>
  <PublicContent />
</ProtectedGuard>
```

#### 2. PROTECTED

- Sadece giriş yapmış kullanıcılar için
- Kullanıcı giriş yapmamışsa login sayfasına yönlendirir
- En yaygın kullanılan guard türü

```tsx
<ProtectedGuard guardType={GuardType.PROTECTED}>
  <PrivateContent />
</ProtectedGuard>
```

#### 3. AUTH

- Authentication işlemleri için özel kullanım
- Gelişmiş kontrol mekanizmaları

```tsx
<ProtectedGuard guardType={GuardType.AUTH}>
  <AuthContent />
</ProtectedGuard>
```

## Kullanım Örnekleri

### 1. Basit Sayfa Koruması

```tsx
// pages/dashboard/page.tsx
import { ProtectedGuard } from "@/providers/guard";
import { GuardType } from "@/enums/GuardType";

export default function DashboardPage() {
  return (
    <ProtectedGuard guardType={GuardType.PROTECTED}>
      <div>
        <h1>Dashboard</h1>
        <p>Sadece giriş yapmış kullanıcılar bu sayfayı görebilir</p>
      </div>
    </ProtectedGuard>
  );
}
```

### 2. Departman Bazlı Koruma

```tsx
// pages/hr/page.tsx
import { ProtectedGuard } from "@/providers/guard";
import { GuardType } from "@/enums/GuardType";

export default function HRPage() {
  return (
    <ProtectedGuard 
      guardType={GuardType.PROTECTED}
      allowedDepartments={["HR", "MANAGEMENT"]}
    >
      <div>
        <h1>İnsan Kaynakları</h1>
        <p>Sadece HR ve Yönetim departmanından kullanıcılar erişebilir</p>
      </div>
    </ProtectedGuard>
  );
}
```

### 3. Yetki Bazlı Koruma

```tsx
// components/AdminPanel.tsx
import { ProtectedGuard } from "@/providers/guard";
import { GuardType } from "@/enums/GuardType";

export default function AdminPanel() {
  return (
    <ProtectedGuard 
      guardType={GuardType.PROTECTED}
      allowedPermissions={["USER_MANAGEMENT", "SYSTEM_SETTINGS"]}
    >
      <div>
        <h1>Admin Panel</h1>
        <p>Sadece belirli yetkilere sahip kullanıcılar erişebilir</p>
      </div>
    </ProtectedGuard>
  );
}
```

### 4. Kombine Koruma

```tsx
// pages/finance/reports/page.tsx
import { ProtectedGuard } from "@/providers/guard";
import { GuardType } from "@/enums/GuardType";

export default function FinanceReportsPage() {
  return (
    <ProtectedGuard 
      guardType={GuardType.PROTECTED}
      allowedDepartments={["FINANCE", "MANAGEMENT"]}
      allowedPermissions={["VIEW_REPORTS", "FINANCIAL_DATA"]}
    >
      <div>
        <h1>Mali Raporlar</h1>
        <p>Hem departman hem de yetki kontrolü</p>
      </div>
    </ProtectedGuard>
  );
}
```

### 5. Layout Düzeyinde Koruma

```tsx
// app/(protected)/layout.tsx
import { ProtectedGuard } from "@/providers/guard";
import { GuardType } from "@/enums/GuardType";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedGuard guardType={GuardType.PROTECTED}>
      <div className="protected-layout">
        <header>Protected Header</header>
        <main>{children}</main>
        <footer>Protected Footer</footer>
      </div>
    </ProtectedGuard>
  );
}
```

### 6. Conditional Rendering

```tsx
// components/ConditionalContent.tsx
import { ProtectedGuard } from "@/providers/guard";
import { GuardType } from "@/enums/GuardType";

export default function ConditionalContent() {
  return (
    <div>
      <h1>Genel İçerik</h1>
      
      <ProtectedGuard guardType={GuardType.PROTECTED}>
        <p>Bu sadece giriş yapmış kullanıcılara gösterilir</p>
      </ProtectedGuard>
      
      <ProtectedGuard 
        guardType={GuardType.PROTECTED}
        allowedPermissions={["ADMIN_ACCESS"]}
      >
        <button>Admin İşlemleri</button>
      </ProtectedGuard>
    </div>
  );
}
```

## Yetkilendirme Kontrolleri

### 1. Authentication Kontrolü

- Kullanıcının giriş yapıp yapmadığını kontrol eder
- `PROTECTED` guard türü için zorunludur
- Giriş yapmamış kullanıcıları login sayfasına yönlendirir

### 2. Departman Kontrolü

- Kullanıcının hangi departmanlara üye olduğunu kontrol eder
- `allowedDepartments` prop'u ile belirtilir
- Array olarak birden fazla departman belirtilebilir

### 3. Yetki Kontrolü

- Kullanıcının sahip olduğu yetkileri kontrol eder
- `allowedPermissions` prop'u ile belirtilir
- Array olarak birden fazla yetki belirtilebilir

### 4. Route Tabanlı Rol Kontrolü

- Kullanıcının rolüne göre erişebileceği route'ları kontrol eder
- `ROUTES` yapılandırmasından otomatik olarak çalışır
- Yetkisiz erişim durumunda `/unauthorized` sayfasına yönlendirir

## Guard'ın Çalışma Mantığı

1. **Loading Kontrolü**: Kullanıcı bilgileri yüklenene kadar loading gösterir
2. **Authentication**: Guard türüne göre kullanıcı girişi kontrol edilir
3. **Department Check**: Eğer departman kısıtı varsa kullanıcının departmanları kontrol edilir
4. **Permission Check**: Eğer yetki kısıtı varsa kullanıcının yetkileri kontrol edilir
5. **Route Role Check**: Kullanıcının mevcut route'a erişim yetkisi kontrol edilir
6. **Render**: Tüm kontroller başarılıysa children render edilir

## En İyi Uygulamalar

### 1. Guard Türü Seçimi

```tsx
// ✅ Doğru - Korumalı sayfa için PROTECTED kullan
<ProtectedGuard guardType={GuardType.PROTECTED}>

// ❌ Yanlış - Korumalı sayfa için PUBLIC kullanma
<ProtectedGuard guardType={GuardType.PUBLIC}>
```

### 2. Gereksiz Guard Kullanımı

```tsx
// ✅ Doğru - Sadece gerekli yerlerde guard kullan
function PublicHomePage() {
  return <div>Public content</div>;
}

// ❌ Yanlış - Public sayfalarda gereksiz guard
function PublicHomePage() {
  return (
    <ProtectedGuard guardType={GuardType.PUBLIC}>
      <div>Public content</div>
    </ProtectedGuard>
  );
}
```

### 3. Layout Düzeyinde Koruma

```tsx
// ✅ Doğru - Layout düzeyinde ortak koruma
// app/(protected)/layout.tsx
<ProtectedGuard guardType={GuardType.PROTECTED}>
  {children}
</ProtectedGuard>

// ❌ Yanlış - Her sayfada ayrı ayrı guard
// Her page.tsx dosyasında tekrar guard kullanma
```

### 4. Granular Koruma

```tsx
// ✅ Doğru - Sadece ihtiyaç olan yere yetki koruması ekle
<div>
  <h1>Sayfa Başlığı</h1>
  <ProtectedGuard allowedPermissions={["DELETE_USER"]}>
    <button>Kullanıcı Sil</button>
  </ProtectedGuard>
</div>

// ❌ Yanlış - Tüm sayfaya yetki koruması
<ProtectedGuard allowedPermissions={["DELETE_USER"]}>
  <div>
    <h1>Sayfa Başlığı</h1>
    <button>Kullanıcı Sil</button>
  </div>
</ProtectedGuard>
```

### 5. Kombinasyon Kullanımı

```tsx
// ✅ Doğru - Gerekli durumlarda birden fazla kısıt
<ProtectedGuard 
  guardType={GuardType.PROTECTED}
  allowedDepartments={["FINANCE"]}
  allowedPermissions={["VIEW_SALARY"]}
>
  <SalaryReport />
</ProtectedGuard>
```

## Hata Durumları

### 1. Yetkisiz Erişim

Kullanıcı yetkisiz bir sayfaya erişmeye çalışırsa `/unauthorized` sayfasına yönlendirilir

### 2. Authentication Başarısızlığı

Giriş yapmamış kullanıcı korumalı sayfaya erişmeye çalışırsa login sayfasına yönlendirilir

### 3. Loading Durumu

Kullanıcı bilgileri yüklenene kadar `<Loading />` component'i gösterilir

## Debugging

Guard'ların çalışıp çalışmadığını kontrol etmek için:

1. **Console Logs**: Auth context'ten kullanıcı bilgilerini kontrol edin
2. **Network Tab**: API çağrılarının başarılı olduğundan emin olun
3. **Route Logs**: Hangi route'larda hangi guard'ların aktif olduğunu takip edin

```tsx
// Debug için geçici log ekleyebilirsiniz
console.log('User:', user);
console.log('Current Role:', currentRole);
console.log('Current Departments:', currentDepartments);
console.log('Current Permissions:', currentPermissions);
```

## Sonuç

Guards sistemi, uygulamanızın güvenliğini sağlamak için kritik bir bileşendir. Doğru kullanıldığında, kullanıcı deneyimini bozmadan etkili bir güvenlik katmanı sağlar. Her zaman en az yetki prensibi (principle of least privilege) ile hareket edin ve sadece gerekli yetkileri verin.