export type SiteNavItem = {
  id: string;
  label: string;
  path: string;
  showInHeader: boolean;
};

export const siteNavItems: SiteNavItem[] = [
  { id: "home", label: "Home", path: "/home", showInHeader: true },
  { id: "about", label: "About", path: "/about", showInHeader: true },
  { id: "join", label: "Join", path: "/join", showInHeader: true },
  { id: "faq", label: "FAQ", path: "/faq", showInHeader: true },
  { id: "shop", label: "Shop", path: "/shop", showInHeader: true },
];
