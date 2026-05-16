# Deploying Primal Awakening + RoVaultX

## Build

```bash
npm ci
npm run build
```

## GitHub Pages (recommended) + custom domain

The repo includes [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml): on every push to `main`, it builds and publishes `dist/` to GitHub Pages.

1. **Repository → Settings → Pages**
   - **Build and deployment:** Source = **GitHub Actions** (not “Deploy from a branch”).
2. **Secrets and variables → Actions:** add repository secrets used at build time (same values you would put in `.env.production`):
   - `VITE_WORKER_API_BASE`
   - `VITE_TURNSTILE_SITE_KEY`
3. **Custom domain:** [public/CNAME](public/CNAME) contains `pokemonprimalawakening.com` and is copied into `dist/` on build so Pages keeps the apex host. In **Pages** settings, set **Custom domain** to `pokemonprimalawakening.com` and enable **Enforce HTTPS** after DNS verifies.
4. **DNS (at your DNS host, e.g. Cloudflare):** point the apex at GitHub Pages. GitHub documents current IPs in [Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain). Typically **four A records** for `@` to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`. For `www`, use a **CNAME** to `<your-username>.github.io` (or your org’s `.github.io` host), unless your DNS provider requires flattening.

After DNS propagates, confirm **Pages** shows “DNS check successful.” Update **Cloudflare Worker** `FRONTEND_ORIGIN` / Turnstile / PayPal allowlists to `https://pokemonprimalawakening.com` as today.

### SPA on GitHub Pages

GitHub Pages does not use Apache rewrite rules. The Vite config copies `index.html` to **`404.html`** after each production build so client routes (`/home`, `/shop`, etc.) load the app on refresh or direct links (standard SPA workaround for Pages).

---

## IONOS / other static hosts (optional)

Upload the contents of `dist/` to your static host (or connect the repo to IONOS “Deploy now” so it runs the build for you).

## SPA fallback (Apache and similar)

Client routes include `/home`, `/shop`, `/faq`, `/join`, `/about`, `/admin`, and `/thank-you`. The server must serve `index.html` for unknown paths so refresh/deep links work.

- **Apache (common on IONOS):** the repo includes [public/.htaccess](public/.htaccess) copied into `dist` at build time (Vite copies `public/` as-is). Verify your host allows `.htaccess`.
- **If `.htaccess` is ignored:** use the host control panel to set a “single page application” / default document fallback equivalent.

## Environment (Vite)

Create `.env.production` (do not commit secrets if the repo is public):

- `VITE_WORKER_API_BASE` — full origin of your Cloudflare Worker API, e.g. `https://rovaultx-gateway.<your-subdomain>.workers.dev` (no trailing slash). Deploy the Worker from this repo (`npm run worker:deploy`).
- `VITE_TURNSTILE_SITE_KEY` — Cloudflare Turnstile **site** key used on `/shop`.
- `VITE_BASE_PATH` — leave unset for deploy at domain root (`/`).

## Cloudflare Worker (this repo)

Shop API lives in [worker/index.ts](worker/index.ts). Config: [wrangler.toml](wrangler.toml) (`name = "rovaultx-gateway"` keeps the same Worker name and `*.workers.dev` URL if you already deployed it from the old repo).

### One-time secrets

From this repo root:

```bash
npm install
npx wrangler login
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put PAYPAL_DONATION_URL
npx wrangler secret put STRIPE_DONATION_URL
npx wrangler secret put HANDOFF_SECRET
npx wrangler secret put ADMIN_USERNAME
npx wrangler secret put ADMIN_PASSWORD
```

### Vars

Edit `[vars]` **FRONTEND_ORIGIN** in `wrangler.toml` (or set the same value under the Worker’s **Settings → Variables** in the Cloudflare dashboard). Use a **comma-separated** list of every origin you serve from (scheme + host, no path), e.g. `https://pokemonprimalawakening.com,https://www.pokemonprimalawakening.com`. The **first** entry is used for PayPal return URLs (`/thank-you`). Redeploy the Worker after changing it (`npm run worker:deploy`). CORS allows the browser’s `Origin` when it matches one of these entries.

KV namespace IDs in `wrangler.toml` must match your account; if you create new namespaces:

```bash
npx wrangler kv namespace create PROMOS_KV
npx wrangler kv namespace create STOCK_KV
```

### Deploy

```bash
npm run worker:deploy
```

Local API + Vite: in one terminal `npm run worker:dev` (Worker on `http://127.0.0.1:8787`), in another set `VITE_WORKER_API_BASE=http://127.0.0.1:8787` and `npm run dev`.

### Turnstile + PayPal

1. In **Turnstile**, add your production hostname(s) for the checkout widget.
2. Update **PayPal** return allowlists if needed; returns use `${FRONTEND_ORIGIN}/thank-you`.

## Cloudflare in front of GitHub Pages (optional)

If DNS for `pokemonprimalawakening.com` points at GitHub’s Pages IPs, Cloudflare can still proxy the site (**orange cloud**). Use **SSL/TLS = Full (strict)** and ensure GitHub Pages has completed certificate provisioning for the custom domain. Pick a **canonical host** (apex vs `www`) and add a **Redirect rule** so the other host redirects (avoid loops).

If you use **IONOS** (or another origin) instead of GitHub Pages for the HTML:

1. **A/AAAA or CNAME** for `pokemonprimalawakening.com` (and `www` if used) pointing at the host.
2. **SSL/TLS:** Full (strict) once the origin certificate is valid.
3. Same canonical-host redirect guidance as above.
4. **Optional vanity hosts:** Bulk Redirects such as `https://shop.pokemonprimalawakening.com/*` → `https://pokemonprimalawakening.com/shop` (301).

## After go-live: `rovaultx.github.io`

Replace the GitHub Pages site with a redirect to `https://pokemonprimalawakening.com/shop` (see that repo’s `index.html`). PayPal “return” and admin flows should use the **new** domain URLs.

## Fan art

Add WebP/JPEG files under `public/art/` and set `file` in [src/config/heroArt.ts](src/config/heroArt.ts) (e.g. `/art/your-hero.webp`) with artist + license strings.
