import Logo from "/src/images/logo.jpg";
import { supabase } from "../../../utils/supabaseClient";
import toastr from "../../../utils/toastr";

const Navbar = (currentPage = "dashboard") => {
  document.documentElement.style.overflowX = "hidden";
  document.body.style.overflowX = "hidden";

  const navItems = [
    { name: "Dashboard", page: "dashboard" },
    { name: "Prepare Package", page: "prepare" },
    { name: "Track Product", page: "track" },
    { name: "View Courier Products", page: "view-courier" },
  ];

  function getTheme() {
    return localStorage.getItem("theme") || "light";
  }
  function setTheme(theme) {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  // Main HTML
  const html = `
    <header class="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
       <!-- Logo -->
        <div class="flex items-center">
          <img src="${Logo}" alt="SwiftEdge Logo" class="h-20 w-20 mr-4 rounded-full bg-white shadow-2xl border-4 border-indigo-600" />
          <span class="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300 tracking-wide drop-shadow-lg">SwiftEdge</span>
        </div>
        <!-- Desktop Navigation -->
        <nav id="desktop-nav" class="hidden md:flex space-x-6">
          ${navItems
            .map(
              (item) => `
              <a data-nav href="${item.page}" class="px-3 py-2 rounded-md font-medium relative overflow-hidden group transition-all duration-300
                ${currentPage === item.page ? "text-indigo-600 dark:text-indigo-400 bg-gray-100 dark:bg-gray-700" : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"}
              ">
                <span class="relative z-10">${item.name}</span>
                <span class="absolute inset-0 bg-indigo-100 dark:bg-indigo-900 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 ${currentPage === item.page ? "scale-x-100" : ""}"></span>
              </a>
            `
            )
            .join("")}
          <button id="logout-btn" class="px-3 py-2 rounded-md font-medium bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 ml-4">Logout</button>
        </nav>
        <!-- Theme Toggle & Mobile Menu Button -->
        <div class="flex items-center space-x-4">
          <button id="theme-toggle-btn"
            class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle theme">
            ${
              getTheme() === "light"
                ? `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9 9 0 008.354-5.646z"></path></svg>`
                : `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h1M3 12h1m15.325-7.757l-.707.707M5.382 18.325l-.707.707M18.325 5.382l.707-.707M5.382 5.382l.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"></path></svg>`
            }
          </button>
          <button id="mobile-menu-btn"
            class="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 relative z-50"
            aria-label="Toggle mobile navigation">
            <div id="hamburger-line-1" class="block w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transform transition duration-300 ease-in-out"></div>
            <div id="hamburger-line-2" class="block w-6 h-0.5 bg-gray-600 dark:bg-gray-300 my-1 transform transition duration-300 ease-in-out"></div>
            <div id="hamburger-line-3" class="block w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transform transition duration-300 ease-in-out"></div>
          </button>
        </div>
      </div>
      <!-- Mobile Navigation Overlay -->
      <div id="mobile-nav-backdrop" class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden hidden"></div>
      <div id="mobile-nav-sidebar" class="bg-white absolute top-0 right-0 w-64 h-full dark:bg-gray-800 shadow-lg z-[999] transform translate-x-full transition-transform duration-300 ease-in-out md:hidden">
        <nav class="flex flex-col items-start space-y-4 py-8 px-6 bg-gray-300 dark:bg-primary-dark">
          <h3 class="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-4">Menu</h3>
          ${navItems
            .map(
              (item) => `
              <a data-nav href="${item.page}" class="block w-full py-2 px-3 rounded-md text-gray-700 dark:text-gray-200 font-medium transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700
                ${currentPage === item.page ? "text-indigo-600 dark:text-indigo-400 bg-gray-100 dark:bg-gray-700" : ""}
              ">
                ${item.name}
              </a>
            `
            )
            .join("")}
          <button id="mobile-logout-btn" class="block w-full py-2 px-3 rounded-md bg-red-500 text-white font-medium hover:bg-red-600 transition-colors duration-200 mt-4">Logout</button>
        </nav>
      </div>
    </header>
  `;

  function pageEvents(onNavigate = () => {}) {
    // Theme toggle
    document
      .getElementById("theme-toggle-btn")
      ?.addEventListener("click", () => {
        const theme = getTheme() === "light" ? "dark" : "light";
        setTheme(theme);
        // Update icon
        const btn = document.getElementById("theme-toggle-btn");
        if (btn) {
          btn.innerHTML =
            theme === "light"
              ? `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9 9 0 008.354-5.646z"></path></svg>`
              : `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h1M3 12h1m15.325-7.757l-.707.707M5.382 18.325l-.707.707M18.325 5.382l.707-.707M5.382 5.382l.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"></path></svg>`;
        }
      });

    // Desktop nav
    document.querySelectorAll("[data-nav]").forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        const page = btn.getAttribute("data-nav");
        if (page) onNavigate(page);
      };
    });

    // Logout logic
    async function handleLogout() {
      await supabase.auth.signOut();
      toastr.success("Logged out successfully!");
      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    }
    document.getElementById("logout-btn")?.addEventListener("click", handleLogout);
    document.getElementById("mobile-logout-btn")?.addEventListener("click", handleLogout);

    // Hamburger logic
    const hamburgerBtn = document.getElementById("mobile-menu-btn");
    const mobileNavSidebar = document.getElementById("mobile-nav-sidebar");
    const mobileNavBackdrop = document.getElementById("mobile-nav-backdrop");
    const hamburgerLine1 = document.getElementById("hamburger-line-1");
    const hamburgerLine2 = document.getElementById("hamburger-line-2");
    const hamburgerLine3 = document.getElementById("hamburger-line-3");

    function openMobileNav() {
      mobileNavSidebar.classList.remove("translate-x-full");
      mobileNavBackdrop.classList.remove("hidden");
      hamburgerLine1.style.transform = "rotate(45deg) translate(5px, 5px)";
      hamburgerLine2.style.opacity = "0";
      hamburgerLine3.style.transform = "rotate(-45deg) translate(5px, -5px)";
    }
    function closeMobileNav() {
      mobileNavSidebar.classList.add("translate-x-full");
      mobileNavBackdrop.classList.add("hidden");
      hamburgerLine1.style.transform = "";
      hamburgerLine2.style.opacity = "";
      hamburgerLine3.style.transform = "";
    }
    if (hamburgerBtn && mobileNavSidebar && mobileNavBackdrop) {
      hamburgerBtn.onclick = () => {
        if (mobileNavSidebar.classList.contains("translate-x-full"))
          openMobileNav();
        else closeMobileNav();
      };
      mobileNavBackdrop.onclick = closeMobileNav;
      // Also close on nav click
      mobileNavSidebar.querySelectorAll("[data-nav]").forEach((btn) => {
        btn.onclick = (e) => {
          e.preventDefault();
          const page = btn.getAttribute("data-nav");
          if (page) {
            onNavigate(page);
            closeMobileNav();
          }
        };
      });
    }
  }

  // Set theme on load
  setTheme(getTheme());

  return { html, pageEvents };
};

export default Navbar;