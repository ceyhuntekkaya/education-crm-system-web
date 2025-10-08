import { MenuItem } from "@/types";

export const companyLayoutNavigation: MenuItem[] = [
  {
    href: "/company",
    label: "Dashboard",
    icon: "ph-squares-four",
    // Bu menü tüm kullanıcılar için görünür (departments/permissions yok)
  },
  {
    href: "/company/campaigns",
    label: "Kampanyalar",
    icon: "ph-briefcase",
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
