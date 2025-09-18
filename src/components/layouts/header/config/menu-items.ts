import { MenuItem } from "../types";

export const menuItems: MenuItem[] = [
  { href: "/appointments", label: "Randevularım" },
  {
    label: "Listelerim",
    href: "/my-lists",
    links: [
      { href: "/my-lists/students", label: "Öğrenci Listesi" },
      { href: "/my-lists/instructors", label: "Eğitmen Listesi" },
      { href: "/my-lists/courses", label: "Kurs Listesi" },
      { href: "/my-lists/classes", label: "Sınıf Listesi" },
      { href: "/my-lists/branches", label: "Şube Listesi" },
    ],
  },
  {
    label: "Favori Aramalarım",
    href: "/fav-searches",
    links: [
      { href: "/fav-searches/students", label: "Öğrenci Arama" },
      { href: "/fav-searches/instructors", label: "Eğitmen Arama" },
      { href: "/fav-searches/courses", label: "Kurs Arama" },
      { href: "/fav-searches/classes", label: "Sınıf Arama" },
      { href: "/fav-searches/income", label: "Gelir Arama" },
    ],
  },
  { href: "/messages", label: "Mesajlarım" },
];
