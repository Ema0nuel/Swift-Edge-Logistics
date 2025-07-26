import { renderFlagLanguageToggle } from "./script/components/translateWidget";
import { startPreloader, endPreloader } from "./script/utils/preloader";
import { setActiveNav } from "./script/utils/active";

// --- ROUTE CONFIGURATION ---
const userRoutes = {
  "user/login": () => import("./script/views/User/login"),
  "user/signup": () => import("./script/views/User/signup"),
  "user/dashboard": () => import("./script/views/User/dashboard"),
  prepare: () => import("./script/views/User/prepare"),
  "view-courier": () => import("./script/views/User/viewCourier"),
  // Add more user views as needed
};

// ADMIN ROUTES 
const adminRoutes = {
  "admin-login": () => import('./script/views/Admin/login'),
  "admin/dashboard": () => import('./script/views/Admin/dashboard'),
  "admin/users": () => import('./script/views/Admin/users'),
  "admin/payments": () => import('./script/views/Admin/payments'),
  "admin/shipments": () => import('./script/views/Admin/shipments'),
  "admin/notifications": () => import('./script/views/Admin/notifications'),
}

/// General/legacy routes
const routes = {
  home: () => import("./script/views/Main/home"),
  notfound: () => import("./script/views/Main/notfound"),

  // Main views
  plans: () => import("./script/views/Main/plans"),
  track: () => import("./script/views/Main/trackProducts"),
  careers: () => import("./script/views/Main/careers"),
  security: () => import("./script/views/Main/security"),
  about: () => import("./script/views/Main/about"),
  services: () => import("./script/views/Main/services"),
  contact: () => import("./script/views/Main/contact"),
  business: () => import("./script/views/Main/business"),
  dropoff: () => import("./script/views/Main/dropOff"),
  terms: () => import("./script/views/Main/terms"),
  privacy: () => import("./script/views/Main/privacy"),

  // Industry-specific views
  healthcare: () => import("./script/views/Main/healthcare"),
  retail: () => import("./script/views/Main/retail"),
  industrial: () => import("./script/views/Main/industrial"),

  // Users Routes
  ...userRoutes,
  //Admin Routes
  ...adminRoutes,
};

// Clean path utility
function cleanPath(pathname) {
  return pathname.replace(/^\/+/, "").split(/[?#]/)[0];
}

// --- PATH REWRITE LOGIC ---
function rewriteUserPath(path) {
  // Redirect /login -> /user/login, /signup -> /user/signup, /dashboard -> /user/dashboard
  if (path === "login") return "user/login";
  if (path === "signup") return "user/signup";
  if (path === "dashboard") return "user/dashboard";
  // Any /user/* is valid
  if (path.startsWith("user/")) return path;

  return path;
}

export function parsePathToRoute(pathname) {
  let clean = cleanPath(pathname);

  // --- USER ROUTES ---
  clean = rewriteUserPath(clean);


  // -- ADMIN ROUTES ---
  // --- ADMIN ROUTES ---
  if (clean.startsWith("admin/")) {
    // e.g. /admin/dashboard, /admin/users, /admin/userDetails, etc.
    if (adminRoutes[clean]) return { page: clean };
    // Dynamic admin user details: /admin/user/:id
    if (/^admin\/user\/\w+/.test(clean)) {
      const [, , userId] = clean.split("/");
      return { page: "admin/userDetails", args: [userId] };
    }
    // Admin login
    if (clean === "admin-login") return { page: "admin-login" };
    return { page: "notfound" };
  }

  // --- GENERAL ROUTES ---
  if (clean === "" || clean === "home") return { page: "home" };

  // --- INDUSTRY ROUTES ---
  if (clean.startsWith("industries/")) {
    const industry = clean.split("/")[1];
    if (["healthcare", "retail", "industrial"].includes(industry)) {
      return { page: industry };
    }
  }

  // --- USER ROUTES ---
  if (userRoutes[clean]) return { page: clean };

  // --- MAIN ROUTES ---
  if (routes[clean]) return { page: clean };

  return { page: "notfound" };
}

function getPathForRoute(page, ...args) {
  // --- GENERAL PATHS ---
  switch (page) {
    case "home":
      return "/";
    case "notfound":
      return "/notfound";
  }

  // --- INDUSTRY PATHS ---
  if (["healthcare", "retail", "industrial"].includes(page)) {
    return `/industries/${page}`;
  }

  // --- USER PATHS ---
  if (userRoutes[page]) return `/${page}`;

  //  --- ADMIN PATHS ---
  if (adminRoutes[page]) return `/${page}`;

  // --- MAIN VIEW PATHS ---
  if (routes[page]) return `/${page}`;

  return "/";
}

export async function loadPage(page, ...args) {
  const loadModule = routes[page] || routes["notfound"];
  const path = getPathForRoute(page, ...args);

  if (window.location.pathname !== path) {
    window.history.pushState({ page, args }, "", path);
  }

  const app = window.app;
  startPreloader();
  app.style.visibility = "hidden";

  try {
    await new Promise((res) => setTimeout(res, 150));

    const module = await loadModule();
    const render = module.default || module;
    const { html, pageEvents } = await render(...args);

    const wrapper = document.createElement("div");
    wrapper.id = "page-transition-wrapper";
    wrapper.style.transform = "translateY(40px) scale(0.98)";
    wrapper.style.transition = "transform 0.5s cubic-bezier(0.4,0,0.2,1)";
    wrapper.innerHTML = html;
    app.innerHTML = "";
    app.appendChild(wrapper);

    endPreloader(500);
    setTimeout(() => {
      app.style.visibility = "visible";
      requestAnimationFrame(() => {
        wrapper.style.transform = "translateY(0) scale(1)";
      });
    }, 500);

    setActiveNav(page);
    pageEvents?.();
  } catch (err) {
    console.error("[Router Error]", err);
    const fallbackModule = await routes["notfound"]();
    const fallbackRender = fallbackModule.default || fallbackModule;
    const fallback = await fallbackRender();
    app.innerHTML = fallback.html;
    app.style.visibility = "visible";
  }
}

// Handle browser navigation (back/forward)
window.addEventListener("popstate", async (e) => {
  const { page, args } = e.state || parsePathToRoute(window.location.pathname);
  await loadPage(page, ...(args || []));
});

// Initial page load
window.addEventListener("DOMContentLoaded", async () => {
  // Ensure #app exists before rendering
  if (!window.app) {
    const appDiv = document.createElement("div");
    appDiv.id = "app";
    document.body.prepend(appDiv);
    window.app = appDiv;
  }
  const { page, args } = parsePathToRoute(window.location.pathname);
  await loadPage(page, ...(args || []));


  if (!page.startsWith("admin/") && page !== "admin-login") {
    document.body.appendChild(renderFlagLanguageToggle());
  }
});