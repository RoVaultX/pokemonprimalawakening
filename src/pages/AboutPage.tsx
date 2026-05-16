import { heroArt } from "../config/heroArt";
import { homeShowcaseSprites } from "../config/showcaseSprites";
import { SpriteMarquee } from "../components/SpriteMarquee";

const art = heroArt.about;

export function AboutPage() {
  return (
    <>
      <section className="page-hero">
        {art.file ? <div className="page-hero-bg" style={{ backgroundImage: `url(${art.file})` }} aria-hidden /> : null}
        <div className="page-hero-inner">
          <h1>About Primal Awakening</h1>
          <p className="lede">
            Primal Awakening is <strong>Pokemon Brick Bronze Reimagined</strong> on Roblox. The classic Pokemon game brought back to life with new content, community events & codes, and tons more!
          </p>
        </div>
      </section>
      <section className="page-section page-section-tight">
        <div className="panel">
          <h2>What should I expect?</h2>
          <p className="panel-muted">
            If you have played a Pokemon game before then you already know what to expect: trainers, wild encounters, gyms, routes, and more! Now with content updates, community events & codes, Discord perks, and a team working hard on bringing you the best experience possible.
          </p>
        </div>
        <div className="panel">
          <h2>What is Pokemon Brick Bronze?</h2>
          <p className="panel-muted">
            The original Pokemon Brick Bronze was a feature-rich Pokemon game, beloved to many players, but was removed from Roblox in 2018 following intellectual-property enforcement.
            Primal Awakening is a community-led project that seeks to revive the game and bring it back to the community with content updates and more.
          </p>
        </div>
        <div className="panel">
          <h2>What is Primal Awakening?</h2>
          <p className="panel-muted">
            Primal Awakening is a community-led project that seeks to revive the Pokemon Brick Bronze game and bring it back to the community with content updates, community events & codes, and tons more.
          </p>
        </div>
        <SpriteMarquee sprites={homeShowcaseSprites} durationSec={70} />
      </section>
    </>
  );
}
