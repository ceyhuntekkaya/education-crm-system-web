export const classNames = (
  ...classes: (string | boolean | undefined)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

export const isActivePage = (pathname: string, href: string): boolean => {
  return pathname === href;
};

export const getMenuItemKey = (prefix: string, index: number): string => {
  return `${prefix}-${index}`;
};
