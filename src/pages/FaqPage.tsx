import type { ReactNode } from "react";
import { discordChannelUrl, DISCORD_CHANNELS } from "../config/discord";

const ch = {
  main: discordChannelUrl(DISCORD_CHANNELS.groupAndLinks),
  links: discordChannelUrl(DISCORD_CHANNELS.links),
  bugs: discordChannelUrl(DISCORD_CHANNELS.bugReports),
  updates: discordChannelUrl(DISCORD_CHANNELS.updatesAndGameLink),
  info: discordChannelUrl(DISCORD_CHANNELS.encountersInfo),
};

const faqItems: { q: string; a: ReactNode }[] = [
  {
    q: "Where is the group?",
    a: (
      <>
        The group and related pins are in this Discord channel:{" "}
        <a href={ch.main} target="_blank" rel="noreferrer">
          #links
        </a>
      </>
    ),
  },
  {
    q: "How do I get Exp. Share?",
    a: (
      <>
        Join the Roblox group from this website or in{" "}
        <a href={ch.main} target="_blank" rel="noreferrer">
          #links
        </a>
      </>
    ),
  },
  {
    q: "Why is there a black screen?",
    a: (
      <>
        Report it in{" "}
        <a href={ch.bugs} target="_blank" rel="noreferrer">
          #bug-reports
        </a>
        . Include a <strong>video or screenshot</strong>, and run the <strong>/console</strong> command in chat so staff can see what went wrong.
      </>
    ),
  },
  {
    q: "Where is the game link?",
    a: (
      <>
        The game link is pinned in{" "}
        <a href={ch.links} target="_blank" rel="noreferrer">
          #links
        </a>
      </>
    ),
  },
  {
    q: "Is the game down?",
    a: (
      <>
        Sometimes yes—we reupload as fast as possible and your data stays safe. Status and updates are posted in the{" "}
        <a href={ch.updates} target="_blank" rel="noreferrer">
          #announcements
        </a>
      </>
    ),
  },
  {
    q: "Where do I write codes?",
    a: (
      <>
        Open the <strong>RO-POWERS</strong> tab on the <strong>RTD</strong>, then enter codes within the Ro-Powers.
      </>
    ),
  },
  {
    q: "Where is my data?",
    a: (
      <>
        Turn on <strong>autosave</strong> in settings and <strong>save manually</strong> after important story moments. Your data is safe when you follow those habits.
      </>
    ),
  },
  {
    q: "Where do I find encounters / wiki information?",
    a: (
      <>
        You can search Google for <strong>&quot;Pokemon brick bronze wiki&quot;</strong> for general reference. Community guides also posted in{" "}
        <a href={ch.info} target="_blank" rel="noreferrer">
          #documents
        </a>
        . Third-party wikis are community-run and may not match Primal Awakening one-to-one.
      </>
    ),
  },
];

export function FaqPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <h1>FAQ</h1>
          <p className="lede">Quick solutions and answers to common questions. When in doubt feel free to ask a question in the Discord server.</p>
        </div>
      </section>
      <section className="page-section">
        {faqItems.map((item) => (
          <details key={item.q} className="faq-item">
            <summary>{item.q}</summary>
            <div className="faq-body">{item.a}</div>
          </details>
        ))}
      </section>
    </>
  );
}
