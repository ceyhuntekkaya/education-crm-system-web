import { MenuItem } from "@/types";

export const companyLayoutNavigation: MenuItem[] = [
  {
    href: "/company",
    label: "Giriş",
    icon: "ph-squares-four",
    // Bu menü tüm kullanıcılar için görünür (departments/permissions yok)
  },
  //
  {
    href: "/company/school-list",
    label: "Okul Listesi *",
    icon: "ph-buildings",
  },
  {
    href: "/company/school",
    label: "Okul Bilgileri",
    icon: "ph-graduation-cap",
  },
  {
    href: "/company/pricing",
    label: "Fiyat Bilgileri *",
    icon: "ph-coins",
  },
  {
    href: "/company/campaigns",
    label: "Kampanyalar *",
    icon: "ph-megaphone",
  },
  {
    href: "/company/appointment",
    label: "Randevu Bilgileri",
    icon: "ph-calendar",
  },
  {
    href: "/company/gallery",
    label: "Galeri *",
    icon: "ph-image",
  },
  {
    href: "/company/social-media",
    label: "Sosyal Medya *",
    icon: "ph-share-network",
  },
  {
    href: "/company/messages",
    label: "Mesajlar *",
    icon: "ph-chat-circle",
  },
  {
    href: "/company/survey",
    label: "Anketler",
    icon: "ph-clipboard",
  },
  {
    href: "/company/reports",
    label: "Analitik Raporları",
    icon: "ph-chart-bar",
  },
  {
    href: "/company/users",
    label: "Kullanıcılar",
    icon: "ph-users",
  },
  {
    href: "/company/subscription",
    label: "Üyelik Planları",
    icon: "ph-crown",
  },
  {
    href: "/company/brand",
    label: "Marka Bilgileri",
    icon: "ph-tag",
  },
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
