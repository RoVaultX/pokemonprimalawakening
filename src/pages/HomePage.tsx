import { Link } from "react-router-dom";
import { FORUM_URL } from "../config/forum";
import { heroArt } from "../config/heroArt";
import { homeShowcaseSprites } from "../config/showcaseSprites";
import { SpriteMarquee } from "../components/SpriteMarquee";

const art = heroArt.home;

export function HomePage() {
  return (
    <>
      <section className="page-hero">
        {art.file ? (
          <div className="page-hero-bg" style={{ backgroundImage: `url(${art.file})` }} aria-hidden />
        ) : null}
        <div className="page-hero-inner">
          <h1>Pokemon Primal Awakening</h1>
          <p className="lede">
            A Pokemon Brick Bronze adventure on Roblox. Explore, battle, and build your team with a community that loves the game!
          </p>
          <div className="cta-row">
            <Link to="/join" className="btn btn-primary">
              Join Discord &amp; Group
            </Link>
            <Link to="/about" className="btn btn-secondary">
              About The Project
            </Link>
            <a href={FORUM_URL} className="btn btn-forum">
              Community Forum
            </a>
            <Link to="/shop" className="btn btn-shop">
              RoVaultX Shop
            </Link>
          </div>
          <p className="sprite-marquee-label">Featured Pokemon</p>
          <SpriteMarquee sprites={homeShowcaseSprites} durationSec={60} />
        </div>
      </section>
      <section className="page-section page-section-tight">
        <div className="panel">
          <h2>What you will find here</h2>
          <p className="panel-muted">
            Quick links to our <strong>Discord</strong> (codes, events, updates), the official <strong>Roblox community</strong> for
            group bonuses, the <strong>community forum</strong> (guides and applications), the <strong>RoVaultX</strong> support shop,
            and an <strong>FAQ</strong> for common questions.
          </p>
        </div>
      </section>
    </>
  );
}
