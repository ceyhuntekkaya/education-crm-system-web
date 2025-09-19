import { MenuItem } from "./menu.types";

export interface MenuProps {
  menuItems: MenuItem[];
  pathname: string;
  className?: string;
}
