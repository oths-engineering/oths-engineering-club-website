export type Meeting = {
  _id: string;
  title: string;
  slug: string;
  date: string;
  summary?: string;
  slidesUrl?: string;
  thumb?: any;
  gallery?: any[];
  upcoming?: boolean;
};

export type NavItem = { title: string; slug: string; date: string };
