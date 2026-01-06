import { MenuItem } from "@/types";

export const supplyCompanyLayoutNavigation: MenuItem[] = [
  {
    href: "/supply/company",
    label: "Giriş",
    icon: "ph-squares-four",
    requiresSchool: false,
  },
  {
    href: "/supply/company/products",
    label: "Ürün Arama",
    icon: "ph-package",
    requiresSchool: false,
  },
  {
    href: "/supply/company/wishlist",
    label: "İstek/Favoriler",
    icon: "ph-heart",
    requiresSchool: false,
  },
  {
    href: "/supply/company/quotations",
    label: "Teklifler",
    icon: "ph-clipboard-text",
    requiresSchool: false,
  },
  {
    href: "/supply/company/rfqs",
    label: "Alım İlanları",
    icon: "ph-file-text",
    requiresSchool: false,
  },
  {
    href: "/supply/company/messages",
    label: "Mesajlar",
    icon: "ph-chat-circle",
    requiresSchool: false,
  },
];
