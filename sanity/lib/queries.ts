import { defineQuery } from "next-sanity";

const MEETING_FIELDS = `_id, title, "slug": slug.current, date, summary, slidesUrl, "thumb": gallery[0]`;

export const UPCOMING_MEETINGS_QUERY = defineQuery(
  `*[_type == "meeting" && date >= now()] | order(date asc){${MEETING_FIELDS}}`
);
export const PAST_MEETINGS_QUERY = defineQuery(
  `*[_type == "meeting" && date < now()] | order(date desc){${MEETING_FIELDS}}`
);
export const MEETING_QUERY = defineQuery(
  `*[_type == "meeting" && slug.current == $slug][0]{${MEETING_FIELDS}, body, gallery}`
);
export const MEETING_SLUGS_QUERY = defineQuery(
  `*[_type == "meeting" && defined(slug.current)]{"slug": slug.current, "updated": _updatedAt}`
);
