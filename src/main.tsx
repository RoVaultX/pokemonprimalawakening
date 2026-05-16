import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/site.css";
import faviconUrl from "./assets/favicon.png?url";

function applyFaviconPng(href: string): void {
  const rels: [string, string][] = [
    ["icon", "image/png"],
    ["shortcut icon", "image/png"],
  ];
  for (const [rel, type] of rels) {
    let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement("link");
      el.rel = rel;
      el.type = type;
      document.head.appendChild(el);
    }
    el.href = href;
  }
}

applyFaviconPng(faviconUrl);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || undefined}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
