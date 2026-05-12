# Deploying Primal Awakening + RoVaultX

## Build

```bash
npm ci
npm run build
```

Upload the contents of `dist/` to your IONOS static host (or connect the GitHub repo to IONOS “Deploy now” so it runs this for you).

## SPA fallback (required)

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

Edit `[vars]` **FRONTEND_ORIGIN** in `wrangler.toml` (or override in the Cloudflare dashboard) so it equals your live site origin exactly, e.g. `https://pokemonprimalawakening.com`. Required for CORS and PayPal return URLs (`/thank-you`).

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

## Cloudflare DNS (apex + www)

1. **A/AAAA or CNAME** for `pokemonprimalawakening.com` (and `www` if used) pointing at IONOS.
2. **SSL/TLS:** Full (strict) once the origin certificate is valid.
3. Pick a **canonical host** (apex vs `www`) and add a **Redirect rule** so the other redirects (avoid loops).
4. **Optional vanity hosts:** Bulk Redirects such as `https://shop.pokemonprimalawakening.com/*` → `https://pokemonprimalawakening.com/shop` (301).

## After go-live: `rovaultx.github.io`

Replace the GitHub Pages site with a redirect to `https://pokemonprimalawakening.com/shop` (see that repo’s `index.html`). PayPal “return” and admin flows should use the **new** domain URLs.

## Fan art

Add WebP/JPEG files under `public/art/` and set `file` in [src/config/heroArt.ts](src/config/heroArt.ts) (e.g. `/art/your-hero.webp`) with artist + license strings.
