import { NavLink, Outlet } from "react-router-dom";
import { siteNavItems } from "../config/sitePages";
import "../styles/site.css";

function navClass({ isActive }: { isActive: boolean }): string {
  return `site-nav-link${isActive ? " site-nav-link-active" : ""}`;
}

export function SiteLayout() {
  return (
    <div className="site-root">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-topbar">
        <div className="site-topbar-inner">
          <NavLink to="/home" className="site-brand-link">
            <img
              className="site-brand-logo"
              src="/PrimalAwakeningSquare.png"
              width={44}
              height={44}
              alt=""
              decoding="async"
            />
            <span className="site-brand-text">
              <span className="site-brand-title">Primal Awakening</span>
              <span className="site-brand-sub">Roblox · Pokemon Brick Bronze</span>
            </span>
          </NavLink>
          <nav className="site-nav" aria-label="Primary">
            {siteNavItems
              .filter((item) => item.showInHeader)
              .map((item) => {
                const linkClass = `site-nav-link${item.id === "forum" ? " site-nav-link-forum" : ""}${item.id === "shop" ? " site-nav-link-shop" : ""}`;
                const label =
                  item.id === "forum" ? (
                    <>
                      <span className="forum-pill">Community</span> Forum
                    </>
                  ) : item.id === "shop" ? (
                    <>
                      <span className="shop-pill">RoVaultX</span> Shop
                    </>
                  ) : (
                    item.label
                  );

                if (item.external) {
                  return (
                    <a key={item.id} href={item.path} className={linkClass}>
                      {label}
                    </a>
                  );
                }

                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive }) =>
                      `${navClass({ isActive })}${item.id === "forum" ? " site-nav-link-forum" : ""}${item.id === "shop" ? " site-nav-link-shop" : ""}`
                    }
                    end={item.path === "/home"}
                  >
                    {label}
                  </NavLink>
                );
              })}
          </nav>
        </div>
      </header>
      <main id="main" className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>
          Pokemon is a registered trademark of Nintendo, Game Freak, and the Pokemon Company.
          Primal Awakening is a <strong>Pokemon Brick Bronze Reimagination</strong> powered by Roblox and is not affiliated with Pokemon or with the Roblox Corporation.
        </p>
      </footer>
    </div>
  );
}
