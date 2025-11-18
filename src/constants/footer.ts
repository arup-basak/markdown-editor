export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const footerSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "/pricing" },
      { label: "Integrations", href: "#" },
      { label: "Updates", href: "/changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Guides", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Support", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Partners", href: "#" },
    ],
  },
];

export const footerBottomLinks: FooterLink[] = [
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
];










