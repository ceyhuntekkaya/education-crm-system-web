import { MenuItem } from "../types";

export const menuItems: MenuItem[] = [
  { href: "/appointments", label: "Randevularım" }, // count dinamik olarak eklenecek
  { href: "/surveys", label: "Anketlerim" }, // count dinamik olarak eklenecek
  {
    label: "Listelerim",
    links: [], // Dinamik olarak doldurulacak
  },
  {
    label: "Favori Aramalarım",
    links: [], // Dinamik olarak doldurulacak
  },
  { href: "/messages", label: "Mesajlarım" }, // count dinamik olarak eklenecek
];
