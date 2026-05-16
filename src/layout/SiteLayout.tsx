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
              .map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    `${navClass({ isActive })}${item.id === "shop" ? " site-nav-link-shop" : ""}`
                  }
                  end={item.path === "/home"}
                >
                  {item.id === "shop" ? (
                    <>
                      <span className="shop-pill">RoVaultX</span> Shop
                    </>
                  ) : (
                    item.label
                  )}
                </NavLink>
              ))}
          </nav>
        </div>
      </header>
      <main id="main" className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>
          Pokemon and Pokemon character names are trademarks of Nintendo, Game Freak, and The Pokemon Company.
          Primal Awakening is a <strong>Pokemon Brick Bronze Reimagination</strong> and is not affiliated with those companies or with Roblox
          Corporation.
        </p>
      </footer>
    </div>
  );
}
