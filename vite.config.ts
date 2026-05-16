import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

type OgPage = { path: string; title: string; description: string };

const OG_SITE_NAME = "Pokemon Primal Awakening";

/** OG for `dist/index.html` at site root (`/`). */
const OG_ROOT: OgPage = {
  path: "/",
  title: OG_SITE_NAME,
  description:
    "A Pokemon Brick Bronze adventure. Explore the project, FAQ, community links, and the support shop.",
};

/**
 * Static `dist/<segment>/index.html` per client route so crawlers (Discord, etc.) get HTTP 200
 * and correct `og:url` on GitHub Pages (SPA fallback alone returns 404 for unknown paths).
 */
const OG_STATIC_ROUTES: OgPage[] = [
  {
    path: "/home",
    title: `Home · ${OG_SITE_NAME}`,
    description:
      "A Pokemon Brick Bronze adventure on Roblox—explore, battle, and grow your team with the Primal Awakening community.",
  },
  {
    path: "/join",
    title: `Join the community · ${OG_SITE_NAME}`,
    description:
      "Join the Discord and Roblox group for Pokemon Primal Awakening to receive exclusive rewards, links, and community perks.",
  },
  {
    path: "/faq",
    title: `FAQ · ${OG_SITE_NAME}`,
    description:
      "Frequently asked questions about Discord, the Roblox group, Exp. Share, bugs, updates, and Primal Awakening.",
  },
  {
    path: "/about",
    title: `About · ${OG_SITE_NAME}`,
    description:
      "Pokemon Brick Bronze reimagined on Roblox and what to expect from the project.",
  },
  {
    path: "/shop",
    title: `RoVaultX Shop · ${OG_SITE_NAME}`,
    description:
      "Support Pokemon Primal Awakening by purchasing robux: Support tiers, secure checkout, and exclusive rewards.",
  },
  {
    path: "/admin",
    title: "Admin · RoVaultX",
    description: "Primal Awakening site administration and RoVaultX tools.",
  },
  {
    path: "/thank-you",
    title: "Thank you · RoVaultX",
    description: "Thanks for supporting Pokemon Primal Awakening through RoVaultX.",
  },
];

function escapeHtmlAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

/** Public page URL (used for og:url and canonical). */
function publicPageUrl(siteOrigin: string, viteBase: string, path: string): string {
  const origin = siteOrigin.replace(/\/$/, "");
  const base = !viteBase || viteBase === "/" ? "" : vitePath(viteBase);
  if (path === "/") {
    return `${origin}${base}/`;
  }
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${base}${p}`;
}

/** Absolute URL for a root-hosted asset (e.g. /PrimalAwakeningSquare.png). */
function publicAssetUrl(siteOrigin: string, viteBase: string, file: string): string {
  const origin = siteOrigin.replace(/\/$/, "");
  const base = !viteBase || viteBase === "/" ? "" : vitePath(viteBase);
  const f = file.startsWith("/") ? file : `/${file}`;
  return `${origin}${base}${f}`;
}

function vitePath(base: string): string {
  const withSlash = base.startsWith("/") ? base : `/${base}`;
  return withSlash.replace(/\/$/, "");
}

function buildOgMetaBlock(siteOrigin: string, viteBase: string, page: OgPage, imageFile: string): string {
  const pageUrl = publicPageUrl(siteOrigin, viteBase, page.path);
  const imageUrl = publicAssetUrl(siteOrigin, viteBase, imageFile);
  return [
    `    <meta name="description" content="${escapeHtmlAttr(page.description)}" />`,
    `    <link rel="canonical" href="${escapeHtmlAttr(pageUrl)}" />`,
    `    <meta property="og:type" content="website" />`,
    `    <meta property="og:site_name" content="${escapeHtmlAttr(OG_SITE_NAME)}" />`,
    `    <meta property="og:url" content="${escapeHtmlAttr(pageUrl)}" />`,
    `    <meta property="og:title" content="${escapeHtmlAttr(page.title)}" />`,
    `    <meta property="og:description" content="${escapeHtmlAttr(page.description)}" />`,
    `    <meta property="og:image" content="${escapeHtmlAttr(imageUrl)}" />`,
    `    <meta property="og:image:type" content="image/png" />`,
    `    <meta property="og:locale" content="en_US" />`,
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:title" content="${escapeHtmlAttr(page.title)}" />`,
    `    <meta name="twitter:description" content="${escapeHtmlAttr(page.description)}" />`,
    `    <meta name="twitter:image" content="${escapeHtmlAttr(imageUrl)}" />`,
  ].join("\n");
}

function isSafePathSegment(segment: string): boolean {
  return Boolean(segment && !segment.includes("..") && !segment.includes("/") && /^[\w-]+$/.test(segment));
}

/** Injects root OG tags and writes `dist/<route>/index.html` for each SPA path (Discord / link previews). */
function openGraphStaticRouteHtml(options: { siteOrigin: string; viteBase: string; imageFile: string }): Plugin {
  const { siteOrigin, viteBase, imageFile } = options;
  const rootBlock = buildOgMetaBlock(siteOrigin, viteBase, OG_ROOT, imageFile);
  const viewportLine = '<meta name="viewport" content="width=device-width, initial-scale=1.0" />';
  let outDir = "dist";

  return {
    name: "open-graph-static-route-html",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    transformIndexHtml(html) {
      if (!html.includes(viewportLine)) {
        return html;
      }
      return html.replace(viewportLine, `${viewportLine}\n${rootBlock}`);
    },
    closeBundle() {
      const root = join(process.cwd(), outDir);
      const indexPath = join(root, "index.html");
      let html: string;
      try {
        html = readFileSync(indexPath, "utf8");
      } catch {
        return;
      }
      const normalizedHtml = html.replace(/\r\n/g, "\n");
      const normalizedRootBlock = rootBlock.replace(/\r\n/g, "\n");
      if (!normalizedHtml.includes(normalizedRootBlock)) {
        console.warn("[open-graph] Root OG block missing from dist/index.html; skip static route HTML.");
        return;
      }

      for (const page of OG_STATIC_ROUTES) {
        const segment = page.path.replace(/^\//, "");
        if (!isSafePathSegment(segment)) {
          console.warn(`[open-graph] Skipping unsafe path segment: ${page.path}`);
          continue;
        }
        const pageBlock = buildOgMetaBlock(siteOrigin, viteBase, page, imageFile).replace(/\r\n/g, "\n");
        let pageHtml = normalizedHtml.replace(normalizedRootBlock, pageBlock);
        pageHtml = pageHtml.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtmlAttr(page.title)}</title>`);
        mkdirSync(join(root, segment), { recursive: true });
        writeFileSync(join(root, segment, "index.html"), pageHtml);
      }
    },
  };
}

/** GitHub Pages serves `404.html` for missing paths; copy `index.html` so the SPA loads on refresh/deep links. */
function githubPagesSpaFallback(): Plugin {
  let outDir = "dist";
  return {
    name: "github-pages-spa-fallback",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const root = join(process.cwd(), outDir);
      copyFileSync(join(root, "index.html"), join(root, "404.html"));
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "VITE_");
  const viteBase = env.VITE_BASE_PATH ?? "/";
  const devPort = String(env.VITE_DEV_PORT || "3000");
  const siteOrigin =
    env.VITE_SITE_ORIGIN?.trim() ||
    (mode === "production" ? "https://pokemonprimalawakening.com" : `http://127.0.0.1:${devPort}`);

  return {
    plugins: [
      react(),
      openGraphStaticRouteHtml({
        siteOrigin,
        viteBase,
        imageFile: "/PrimalAwakeningSquare.png",
      }),
      githubPagesSpaFallback(),
    ],
    base: viteBase,
    server: {
      // Avoid Windows reserved/excluded ranges (Hyper-V often blocks 5173 with EACCES).
      host: "localhost",
      port: Number(devPort) || 3000,
      strictPort: false,
    },
  };
});
