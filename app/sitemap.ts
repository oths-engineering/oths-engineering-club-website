import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { staticFetch } from "@/sanity/lib/client";
import { MEETING_SLUGS_QUERY } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const meetings = await staticFetch<{ slug: string; updated: string }[]>(MEETING_SLUGS_QUERY);
  return [
    ...["", "/about", "/join", "/meetings"].map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() })),
    ...meetings.map((m) => ({ url: `${site.url}/meetings/${m.slug}`, lastModified: new Date(m.updated) })),
  ];
}
