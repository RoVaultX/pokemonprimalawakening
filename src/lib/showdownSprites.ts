const SHOWDOWN_ANI = "https://play.pokemonshowdown.com/sprites/ani";

/** Animated front sprites from Pokemon Showdown `/sprites/ani/` (GIF). */
export function showdownAniGifUrl(species: string): string {
  const slug = species.trim().toLowerCase();
  return `${SHOWDOWN_ANI}/${slug}.gif`;
}
