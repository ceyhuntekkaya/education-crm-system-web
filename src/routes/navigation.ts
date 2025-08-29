import { MenuItem } from "@/types";
import { PATHS } from "./paths";

export const userLayoutNavigation: MenuItem[] = [
  {
    href: PATHS.PROTECTED.USER.HOME,
    label: "Home",
    icon: "ph-house",
    // Bu menü tüm kullanıcılar için görünür (departments/permissions yok)
  },
  {
    href: "/profile",
    label: "My Profile",
    icon: "ph-user",
    // departments: [Department.AUTHOR_REVIEWER],
    // permissions: [Permission.DELIVERY_OPERATION],
    children: [
      {
        href: "/courses/list",
        label: "Kurs Listesi",
        icon: "ph-list",
        // permissions: ["course_view"], // course_view izni olanlar görebilir
      },
      {
        href: "/courses/add",
        label: "Yeni Kurs",
        icon: "ph-plus",
        // permissions: ["course_create"], // course_create izni olanlar görebilir
      },
      {
        href: "/courses/categories",
        label: "Kategoriler",
        icon: "ph-folder",
        // departments: ["IT"], // Sadece IT departmanındakiler görebilir
      },
    ],
  },
  {
    href: PATHS.PROTECTED.USER.LIST,
    label: "User Listesi",
    icon: "ph-chat",
    // permissions: ["user_view"], // user_view izni olanlar görebilir
    // departments: ["HR"], // Sadece HR departmanındakiler görebilir
  },
];
