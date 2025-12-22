import { Role } from "@/enums/Role";
import { MenuItem } from "../types";

export const menuItems: MenuItem[] = [
  {
    href: "/appointments",
    label: "Randevularım",
    allowedRoles: [Role.USER, Role.ADMIN], // Sadece veli ve admin görebilir
  },
  {
    href: "/surveys",
    label: "Anketlerim",
    allowedRoles: [Role.USER, Role.ADMIN], // Sadece veli ve admin görebilir
  },
  {
    label: "Listelerim",
    links: [], // Dinamik olarak doldurulacak
    allowedRoles: [Role.USER, Role.ADMIN], // Sadece veli ve admin görebilir
  },
  {
    label: "Favori Aramalarım",
    links: [], // Dinamik olarak doldurulacak
    allowedRoles: [Role.USER, Role.ADMIN], // Sadece veli ve admin görebilir
  },
  {
    href: "/messages",
    label: "Mesajlarım",
    allowedRoles: [Role.USER, Role.ADMIN], // Sadece veli ve admin görebilir
  },
];
