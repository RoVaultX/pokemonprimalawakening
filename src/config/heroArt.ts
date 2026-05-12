/**
 * Full-bleed fan art backgrounds: add files under public/art/ and list them here with credits.
 * If `file` is missing from /public/art/, pages fall back to CSS gradients only.
 */
export type HeroArtEntry = {
  id: string;
  /** path under public, e.g. /art/legendary-mural.webp */
  file: string | null;
  artist: string;
  sourceUrl?: string;
  license: string;
  alt: string;
};

export const heroArt: Record<"home" | "join" | "about", HeroArtEntry> = {
  home: {
    id: "home-hero",
    file: null,
    artist: "—",
    license: "Add commissioned or licensed art to public/art/",
    alt: "Primal Awakening atmospheric background",
  },
  join: {
    id: "join-hero",
    file: null,
    artist: "—",
    license: "Add commissioned or licensed art to public/art/",
    alt: "Community background",
  },
  about: {
    id: "about-hero",
    file: null,
    artist: "—",
    license: "Add commissioned or licensed art to public/art/",
    alt: "Project background",
  },
};
