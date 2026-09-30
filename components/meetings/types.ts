import type { SanityImageSource } from "@sanity/image-url";

export type MeetingImage = SanityImageSource & { _key?: string; alt?: string };

export type Meeting = {
  _id: string;
  title: string;
  slug: string;
  date: string;
  summary?: string;
  slidesUrl?: string;
  thumb?: MeetingImage;
  gallery?: MeetingImage[];
  upcoming?: boolean;
};

export type NavItem = { title: string; slug: string; date: string };
