export interface MenuLink {
  href: string;
  label: string;
  count?: number;
}

export interface MenuItem {
  label: string;
  href?: string;
  links?: MenuLink[];
  count?: number;
}
