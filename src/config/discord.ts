/** Discord server (guild) id — matches widget `id=` on discord.com/widget */
export const DISCORD_GUILD_ID = "1203364790400057354";

export const DISCORD_INVITE_URL = "https://discord.gg/robloxbrickbronze";

/** #links — game link pinned here (same channel as group-and-links) */
const CHANNEL_LINKS = "1203364791586914389";

export const DISCORD_CHANNELS = {
  links: CHANNEL_LINKS,
  groupAndLinks: CHANNEL_LINKS,
  bugReports: "1230094341092151296",
  updatesAndGameLink: "1225376039866335283",
  encountersInfo: "1497221818451361995",
} as const;

export function discordChannelUrl(channelId: string): string {
  return `https://discord.com/channels/${DISCORD_GUILD_ID}/${channelId}`;
}
