import { MenuItem } from "@/types";

export const supplySupplierLayoutNavigation: MenuItem[] = [
  {
    href: "/supply/supplier",
    label: "Dashboard",
    icon: "ph-squares-four",
    requiresSchool: false,
  },
  {
    href: "/supply/supplier/products",
    label: "Ürün Yönetimi",
    icon: "ph-package",
    requiresSchool: false,
  },
  {
    href: "/supply/supplier/quotations",
    label: "Tekliflerim",
    icon: "ph-clipboard-text",
    requiresSchool: false,
  },
  {
    href: "/supply/supplier/messages",
    label: "Mesajlaşma",
    icon: "ph-chat-circle",
    requiresSchool: false,
  },
];
