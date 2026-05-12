import type { CSSProperties } from "react";
import { showdownAniGifUrl } from "../lib/showdownSprites";
import type { ShowcaseSprite } from "../config/showcaseSprites";

type SpriteMarqueeProps = {
  sprites: ShowcaseSprite[];
  /** Full loop duration (larger list = can use longer duration) */
  durationSec?: number;
};

export function SpriteMarquee({ sprites, durationSec = 55 }: SpriteMarqueeProps) {
  if (sprites.length === 0) {
    return null;
  }
  const loop = [...sprites, ...sprites];

  return (
    <div className="sprite-marquee" role="presentation">
      <div
        className="sprite-marquee-track"
        style={{ "--marquee-duration": `${durationSec}s` } as CSSProperties}
      >
        {loop.map((s, index) => (
          <div key={`${s.species}-${index}`} className="sprite-marquee-cell">
            <img
              src={showdownAniGifUrl(s.species)}
              alt=""
              className="sprite-marquee-img"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
