# Register System - Visual Flow

```
                                  /auth/register
                                       |
                    ┌──────────────────┴──────────────────┐
                    |                                      |
                    v                                      v
          ┌──────────────────┐                  ┌──────────────────┐
          │  🏢 Kurum Kaydı  │                  │ 👨‍👩‍👧‍👦 Veli Kaydı  │
          │                  │                  │                  │
          │  - Mavi tema     │                  │  - Kırmızı tema  │
          │  - Building icon │                  │  - Parent icon   │
          │  - 4 özellik     │                  │  - 4 özellik     │
          └────────┬─────────┘                  └────────┬─────────┘
                   |                                      |
                   v                                      v
         /register/institution                  /register/user
                   |                                      |
                   v                                      v
          ┌─────────────────┐                  ┌─────────────────┐
          │  6 Adımlı Form  │                  │ Coming Soon Page│
          ├─────────────────┤                  ├─────────────────┤
          │ 1. Kişisel      │                  │ - Geliştirme    │
          │ 2. Doğrulama    │                  │   aşamasında    │
          │ 3. Kampüs       │                  │ - Özellikler    │
          │ 4. Paket        │                  │   listesi       │
          │ 5. Ödeme        │                  │ - Geri dönüş    │
          │ 6. Giriş        │                  │   linkleri      │
          └─────────────────┘                  └─────────────────┘
```

## Dosya Yapısı

```
src/app/auth/register/
│
├── 📄 page.tsx                    ← Seçim sayfası (ANA)
├── 📄 layout.tsx                  ← Auth wrapper
├── 📄 register-selection.scss     ← Stiller
│
├── 📁 institution/                ← Kurum kayıt klasörü
│   ├── 📄 page.tsx               → 6 adımlı form
│   ├── 📄 layout.tsx             → Layout
│   └── 📄 index.ts               → Export
│
├── 📁 user/                       ← Veli kayıt klasörü
│   ├── 📄 page.tsx               → Geçici sayfa
│   ├── 📄 layout.tsx             → Layout
│   └── 📄 index.ts               → Export
│
└── 📁 _shared/                    ← Paylaşılan componentler
    ├── 📄 register-form.tsx      → Ana form
    ├── 📁 components/            → Form parts
    ├── 📁 constants/             → Config
    ├── 📁 context/               → State
    ├── 📁 hooks/                 → Custom hooks
    ├── 📁 schemas/               → Validation
    ├── 📁 sections/              → Steps
    └── 📁 types/                 → TypeScript
```

## Component Hierarchy

```
RegisterPage (ana seçim)
└── Container
    ├── Header
    └── SelectionCards
        ├── InstitutionCard
        │   ├── Icon
        │   ├── Title
        │   ├── Description
        │   └── FeatureList
        │       ├── Feature 1
        │       ├── Feature 2
        │       ├── Feature 3
        │       └── Feature 4
        │
        └── UserCard
            ├── Icon
            ├── Title
            ├── Description
            └── FeatureList
                ├── Feature 1
                ├── Feature 2
                ├── Feature 3
                └── Feature 4

InstitutionRegisterPage
└── Container
    ├── Header (with icon)
    ├── RegisterForm (mevcut)
    │   └── [6 Steps...]
    └── Footer
        ├── Back to selection
        └── Login link

UserRegisterPage (geçici)
└── Container
    ├── Header (with icon)
    ├── ComingSoonCard
    │   ├── AnimatedIcon
    │   ├── Title
    │   ├── Description
    │   ├── FeatureList
    │   └── CTAButtons
    └── Footer
        └── Login link
```

## State Flow

```
                          Initial Load
                               |
                               v
                      ┌────────────────┐
                      │  Route: /auth/ │
                      │    register    │
                      └────────┬───────┘
                               |
                ┌──────────────┴──────────────┐
                |                             |
          User clicks                   User clicks
         Institution                       User
                |                             |
                v                             v
    ┌─────────────────────┐       ┌─────────────────────┐
    │ Navigate to:        │       │ Navigate to:        │
    │ /register/          │       │ /register/user      │
    │ institution         │       │                     │
    └──────────┬──────────┘       └──────────┬──────────┘
               |                              |
               v                              v
    ┌─────────────────────┐       ┌─────────────────────┐
    │ RegisterContext     │       │ Show coming soon    │
    │ initialized         │       │ page                │
    └──────────┬──────────┘       └─────────────────────┘
               |
               v
    ┌─────────────────────┐
    │ 6-step form         │
    │ renders             │
    └─────────────────────┘
```

## Interaction Flow

```
User Journey: Kurum Kaydı
═══════════════════════════

1. Land on /auth/register
   ↓
2. See two cards (hover effects active)
   ↓
3. Hover over "Kurum Kaydı" card
   - Border: #E5E7EB → #487FFF
   - Transform: translateY(-4px)
   - Shadow: appears
   ↓
4. Click on card
   ↓
5. Navigate to /auth/register/institution
   ↓
6. See institution icon + title
   ↓
7. Complete 6-step form
   ↓
8. Success → Dashboard


User Journey: Veli Kaydı
════════════════════════

1. Land on /auth/register
   ↓
2. See two cards (hover effects active)
   ↓
3. Hover over "Veli Kaydı" card
   - Border: #E5E7EB → #487FFF
   - Transform: translateY(-4px)
   - Shadow: appears
   ↓
4. Click on card
   ↓
5. Navigate to /auth/register/user
   ↓
6. See coming soon page
   ↓
7. Options:
   - Go back to selection
   - Go to institution register
   - Go to login
```

## CSS Classes Used

```css
Main Selection Page:
- .register-selection-page
- .hover-card
- .cursor-pointer
- .d-inline-flex
- .text-center
- .card-body
- .list-unstyled

Institution Page:
- .register-page
- .container
- .text-center
- .border-top
- .pt-24, .mt-32, etc.

User Page:
- .register-page
- .card
- .coming-soon-icon
- .d-flex
- .btn-outline-main
- .btn-main
```

## Icons Used (RemixIcon)

- `ri-building-line` - Kurum (mavi)
- `ri-parent-line` - Veli (kırmızı)
- `ri-check-line` - Feature checkmarks (yeşil)
- `ri-tools-line` - Coming soon (kırmızı)
- `ri-arrow-left-line` - Geri dönüş
- `ri-arrow-right-line` - İleri gitme
- `ri-checkbox-circle-line` - Gelecek özellikler

---

**Legend:**
- 📄 = File
- 📁 = Folder
- ← = Current/Active
- → = Points to
- ✨ = New
- ✅ = Preserved
