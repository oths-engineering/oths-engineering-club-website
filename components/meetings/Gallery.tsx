import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type GalleryImage = {
  asset?: { _ref?: string };
  alt?: string;
};

export default function Gallery({ images }: { images: GalleryImage[] }) {
  if (!images?.length) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((img, i) => {
        const src = img.asset?._ref ? urlFor(img.asset._ref).width(800).url() : null;
        return (
          <div key={i} className="hm-panel overflow-hidden border hm-bd">
            {src ? (
              <Image
                src={src}
                alt={img.alt ?? `Gallery image ${i + 1}`}
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="grid h-48 place-items-center bg-[color:var(--hm-panel)]">
                <span className="font-mono text-xs uppercase tracking-widest hm-mute">
                  No image
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
