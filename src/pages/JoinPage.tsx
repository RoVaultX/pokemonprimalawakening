import { DISCORD_INVITE_URL, discordChannelUrl, DISCORD_CHANNELS } from "../config/discord";
import { heroArt } from "../config/heroArt";

const ROBLOX_GROUP =
  "https://www.roblox.com/communities/445752211/Project-Primal-Awakening#!/about";
const WIDGET_ID = "1203364790400057354";

const art = heroArt.join;

export function JoinPage() {
  return (
    <>
      <section className="page-hero">
        {art.file ? <div className="page-hero-bg" style={{ backgroundImage: `url(${art.file})` }} aria-hidden /> : null}
        <div className="page-hero-inner">
          <h1>Join the community</h1>
          <p className="lede">
            Join the community Discord and Roblox group and receive exclusive in-game rewards.
          </p>
          <div className="cta-row">
            <a className="btn btn-discord" href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
              Join Discord Server
            </a>
            <a className="btn btn-roblox" href={ROBLOX_GROUP} target="_blank" rel="noreferrer">
              Roblox Community Group
            </a>
          </div>
        </div>
      </section>
      <section className="page-section page-section-tight">
        <div className="join-stack">
          <div className="join-grid">
            <div className="panel">
              <h2>Community Group Rewards</h2>
              <p className="panel-muted">Join the Roblox group for exclusive rewards:</p>
              <ul className="perk-list">
                <li>Extra PC storage</li>
                <li>Exp. Share and charms</li>
                <li>Increased shiny &amp; legendary chances</li>
              </ul>
              <p className="panel-muted panel-muted-spaced">
                Group link and pins:{" "}
                <a href={discordChannelUrl(DISCORD_CHANNELS.groupAndLinks)}>Discord channel</a>.
              </p>
            </div>
            <div className="panel">
              <h2>Discord Server Perks</h2>
              <p className="panel-muted">Join the Discord for even more bonuses:</p>
              <ul className="perk-list">
                <li>Redeem exclusive codes</li>
                <li>Giveaways and events</li>
                <li>Bug reports &amp; updates</li>
              </ul>
            </div>
          </div>
          <div className="panel panel-widget">
            <h2>Discord</h2>
            <iframe
              className="discord-widget-frame"
              src={`https://discord.com/widget?id=${WIDGET_ID}&theme=dark`}
              width={350}
              height={500}
              allowTransparency
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              title="Discord widget"
            />
          </div>
        </div>
      </section>
    </>
  );
}
