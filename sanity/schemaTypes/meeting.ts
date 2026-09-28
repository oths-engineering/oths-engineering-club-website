import { defineField, defineType } from "sanity";

export const meeting = defineType({
  name: "meeting",
  title: "Meeting",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "date", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "summary", type: "text", rows: 4 }),
    defineField({
      name: "slidesUrl",
      title: "Link to Slides",
      type: "url",
      validation: (r) => r.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "gallery",
      title: "Image Gallery",
      type: "array",
      description: "The first image is used as the cover. Drag to reorder.",
      options: { layout: "grid" },
      validation: (r) => r.min(1).warning("Add at least one image. The first one becomes the cover."),
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
        },
      ],
    }),
  ],
  orderings: [{ title: "Date, newest", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { title: "title", date: "date", media: "gallery.0" },
    prepare: ({ title, date, media }) => ({
      title,
      subtitle: date ? new Date(date).toLocaleDateString("en-US") : "No date",
      media,
    }),
  },
});
