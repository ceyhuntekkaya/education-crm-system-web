import { MenuItem } from "../types";

export const menuItems: MenuItem[] = [
  { href: "/appointments", label: "Randevularım", count: 3 },
  { href: "/surveys", label: "Anketlerim" },
  {
    label: "Listelerim",
    href: "/my-lists",

    links: [
      { href: "/my-lists/1", label: "Favori Okullarım" },
      { href: "/my-lists/2", label: "Aday Okullarım" },
      { href: "/my-lists/3", label: "Takip Ettiğim Okullar" },
      { href: "/my-lists/4", label: "Başvurduğum Okullar" },
      { href: "/my-lists/5", label: "Gezdiğim Okullar" },
      { href: "/my-lists/6", label: "Önerilen Okullar" },
      { href: "/my-lists/7", label: "Karşılaştırmak İstediğim" },
      { href: "/my-lists/8", label: "Yedek Seçeneklerim" },
    ],
  },
  {
    label: "Favori Aramalarım",
    href: "/fav-searches",
    links: [], // Dinamik olarak doldurulacak
  },
  { href: "/messages", label: "Mesajlarım", count: 7 },
];
