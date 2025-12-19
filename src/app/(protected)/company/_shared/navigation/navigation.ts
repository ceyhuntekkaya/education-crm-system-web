import { MenuItem } from "@/types";

export const companyLayoutNavigation: MenuItem[] = [
  {
    href: "/company",
    label: "Giriş",
    icon: "ph-squares-four",
    requiresSchool: false,
    // Bu menü tüm kullanıcılar için görünür (departments/permissions yok)
  },
  //
  {
    href: "/company/school-list",
    label: "Kurum Listesi",
    icon: "ph-buildings",
    requiresSchool: false,
  },
  {
    href: "/company/school-detail",
    label: "Kurum Bilgileri",
    icon: "ph-graduation-cap",
    requiresSchool: true,
  },

  // {
  //   href: "/company/pricing",
  //   label: "Fiyat Bilgileri",
  //   icon: "ph-coins",
  // },
  {
    href: "/company/pricing/detail/school",
    label: "Fiyat Bilgileri",
    icon: "ph-coins",
    requiresSchool: true,
  },
  {
    href: "/company/custom-fees",
    label: "Ek Ücretler",
    icon: "ph-currency-circle-dollar",
    requiresSchool: true,
  },
  {
    href: "/company/campaigns",
    label: "Kampanyalar",
    icon: "ph-megaphone",
    requiresSchool: true,
  },
  // {
  //   href: "/company/appointment",
  //   label: "Randevu Bilgileri",
  //   icon: "ph-calendar",
  // },
  {
    href: "/company/appointment-availability",
    label: "Randevu Bilgileri",
    icon: "ph-calendar-check",
    requiresSchool: true,
  },
  {
    href: "/company/gallery",
    label: "Galeri",
    icon: "ph-image",
    requiresSchool: true,
  },
  {
    href: "/company/social-media",
    label: "Sosyal Medya",
    icon: "ph-share-network",
    requiresSchool: true,
  },
  {
    href: "/company/messages-chat",
    label: "Mesajlar **",
    icon: "ph-chat-circle",
    requiresSchool: true,
  },
  {
    href: "/company/survey",
    label: "Anketler",
    icon: "ph-clipboard",
    requiresSchool: true,
  },
  // {
  //   href: "/company/reports",
  //   label: "Analitik Raporları",
  //   icon: "ph-chart-bar",
  // },
  {
    href: "/company/users",
    label: "Kullanıcılar",
    icon: "ph-users",
    requiresSchool: false,
  },
  // {
  //   href: "/company/subscription",
  //   label: "Üyelik Planları",
  //   icon: "ph-crown",
  // },
  // {
  //   href: "/company/brands",
  //   label: "Markalar",
  //   icon: "ph-tag",
  // },
  {
    href: "/company/campus-detail",
    label: "Kampüs Bilgileri",
    icon: "ph-building",
    requiresSchool: false,
  },
  // Kampüs detayı dinamik route olduğu için hem menüde görünebilir
  // hem de Brand detay sayfasındaki kampüslerden erişilebilir
  // {
  //   href: "/company/campus-detail",
  //   label: "Kampüs Bilgileri",
  //   icon: "ph-school",
  // },
  // {
  //   href: "/profile",
  //   label: "My Profile",
  //   icon: "ph-user",
  //   // departments: [Department.AUTHOR_REVIEWER],
  //   // permissions: [Permission.DELIVERY_OPERATION],
  //   children: [
  //     {
  //       href: "/courses/list",
  //       label: "Kurs Listesi",
  //       icon: "ph-list",
  //       // permissions: ["course_view"], // course_view izni olanlar görebilir
  //     },
  //     {
  //       href: "/courses/add",
  //       label: "Yeni Kurs",
  //       icon: "ph-plus",
  //       // permissions: ["course_create"], // course_create izni olanlar görebilir
  //     },
  //     {
  //       href: "/courses/categories",
  //       label: "Kategoriler",
  //       icon: "ph-folder",
  //       // departments: ["IT"], // Sadece IT departmanındakiler görebilir
  //     },
  //   ],
  // },
];
