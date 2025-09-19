export interface HeaderState {
  scroll: boolean;
  isMenuActive: boolean;
  activeSubmenu: number | null;
  windowWidth: number;
}

export interface HeaderProps {
  className?: string;
}
