export interface MenuLink {
  href: string;
  label: string;
}

export interface MenuItem {
  label: string;
  href?: string;
  links?: MenuLink[];
}
