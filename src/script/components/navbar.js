import toggleTheme from "./toggleTheme.js";
import logoLight from "/src/images/logo.png";
import logoDark from "/src/images/logo.jpg";

const Navbar = () => {
  const themeToggle = toggleTheme();

  function pageEvents() {
    // Desktop Products Dropdown: open on hover, close on mouseleave, close on outside click
    const desktopBtn = document.getElementById("desktop-products-btn");
    const desktopMenu = document.getElementById("desktop-products-menu");
    const desktopChevron = document.getElementById("desktop-products-chevron");

    if (desktopBtn && desktopMenu) {
      let dropdownTimeout;

      function openDropdown() {
        desktopMenu.classList.remove(
          "opacity-0",
          "invisible",
          "pointer-events-none",
          "translate-y-2"
        );
        desktopMenu.classList.add(
          "opacity-100",
          "visible",
          "pointer-events-auto",
          "translate-y-0"
        );
        desktopChevron?.classList.add("rotate-180");
      }
      function closeDropdown() {
        desktopMenu.classList.remove(
          "opacity-100",
          "visible",
          "pointer-events-auto",
          "translate-y-0"
        );
        desktopMenu.classList.add(
          "opacity-0",
          "invisible",
          "pointer-events-none",
          "translate-y-2"
        );
        desktopChevron?.classList.remove("rotate-180");
      }

      // Open dropdown on hover
      desktopBtn.addEventListener("mouseenter", () => {
        clearTimeout(dropdownTimeout);
        openDropdown();
      });
      desktopBtn.addEventListener("focus", openDropdown);

      // Keep open if mouse enters menu
      desktopMenu.addEventListener("mouseenter", () => {
        clearTimeout(dropdownTimeout);
        openDropdown();
      });

      // Close dropdown when mouse leaves button or menu
      desktopBtn.addEventListener("mouseleave", () => {
        dropdownTimeout = setTimeout(closeDropdown, 120);
      });
      desktopMenu.addEventListener("mouseleave", () => {
        dropdownTimeout = setTimeout(closeDropdown, 120);
      });

      // Close dropdown on outside click
      document.addEventListener("click", (e) => {
        if (!desktopBtn.contains(e.target) && !desktopMenu.contains(e.target)) {
          closeDropdown();
        }
      });

      // Keyboard accessibility: close on Escape
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeDropdown();
      });
    }

    // Mobile Menu logic unchanged
    const menuBtn = document.getElementById("mobile-menu-btn");
    const menuDialog = document.getElementById("mobile-menu");
    const menuOverlay = document.getElementById("mobile-menu-overlay");
    const hamburger = document.getElementById("hamburger-icon");
    const dropdownBtn = document.getElementById("mobile-products-btn");
    const dropdownMenu = document.getElementById("mobile-products-menu");
    const dropdownChevron = document.getElementById("mobile-products-chevron");

    function openMenu() {
      menuOverlay.classList.remove("hidden");
      requestAnimationFrame(() => {
        menuOverlay.classList.add("opacity-60");
        menuOverlay.classList.remove("opacity-0");
        menuDialog.classList.remove("-translate-y-full", "opacity-0");
        menuDialog.classList.add("translate-y-0", "opacity-100");
        hamburger.classList.add("open");
        document.body.classList.add("overflow-hidden");
      });
    }
    function closeMenu() {
      menuDialog.classList.remove("translate-y-0", "opacity-100");
      menuDialog.classList.add("-translate-y-full", "opacity-0");
      menuOverlay.classList.remove("opacity-60");
      menuOverlay.classList.add("opacity-0");
      hamburger.classList.remove("open");
      setTimeout(() => {
        menuOverlay.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
        // Reset dropdown
        if (dropdownMenu) {
          dropdownMenu.style.height = "0px";
          dropdownMenu.classList.remove("h-auto", "opacity-100", "mt-2");
          dropdownChevron?.classList.remove("rotate-180");
        }
      }, 300);
    }

    if (menuBtn && menuDialog && menuOverlay && hamburger) {
      menuBtn.addEventListener("click", () => {
        if (menuDialog.classList.contains("translate-y-0")) closeMenu();
        else openMenu();
      });
      menuOverlay.addEventListener("click", closeMenu);
      menuDialog.querySelectorAll("[data-nav]").forEach((link) => {
        link.addEventListener("click", closeMenu);
      });
    }

    // Mobile Products Dropdown
    if (dropdownBtn && dropdownMenu && dropdownChevron) {
      dropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = dropdownMenu.classList.contains("h-auto");
        if (isOpen) {
          dropdownMenu.style.height = "0px";
          dropdownMenu.classList.remove("h-auto", "opacity-100", "mt-2");
          dropdownChevron.classList.remove("rotate-180");
        } else {
          dropdownMenu.classList.add("h-auto");
          const height = dropdownMenu.scrollHeight;
          dropdownMenu.style.height = height + "px";
          dropdownMenu.classList.add("opacity-100", "mt-2");
          dropdownChevron.classList.add("rotate-180");
        }
      });
    }

    // Mobile Theme Toggle
    const mobileThemeBtn = document.getElementById("mobile-theme-toggle");
    if (mobileThemeBtn) {
      mobileThemeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isDark = document.documentElement.classList.contains("dark");
        if (isDark) {
          document.documentElement.classList.remove("dark");
          document.documentElement.classList.add("light");
          localStorage.setItem("theme", "light");
        } else {
          document.documentElement.classList.add("dark");
          document.documentElement.classList.remove("light");
          localStorage.setItem("theme", "dark");
        }
      });
    }

    // Desktop theme toggle
    if (themeToggle.pageEvents) themeToggle.pageEvents();
  }

  const html = /* html */ `
    <header class="sticky top-0 left-0 right-0 z-[99999]">
      <nav class="relative bg-peach dark:bg-primary border-b border-accent dark:border-accent-dark shadow-sm transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="relative flex items-center justify-between h-16">
            <!-- Logo -->
            <a href="/" data-nav class="flex-shrink-0">
              <picture class="block h-10 w-auto">
                <source srcset="${logoDark}" media="(prefers-color-scheme: dark)">
                <img src="${logoLight}" alt="SwiftEdge Logistics" class="h-full w-auto">
              </picture>
            </a>
            <!-- Desktop Navigation -->
            <div class="hidden md:flex md:items-center md:space-x-6">
              <a href="/" data-nav class="text-primary dark:text-peach hover:text-accent dark:hover:text-accent-soft transition-colors">Home</a>
              <div class="relative group">
                <button id="desktop-products-btn" type="button" class="text-primary dark:text-peach hover:text-accent dark:hover:text-accent-soft transition-colors inline-flex items-center focus:outline-none" aria-haspopup="true" aria-expanded="false" tabindex="0">
                  Products
                  <svg id="desktop-products-chevron" class="ml-1 h-4 w-4 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                <div id="desktop-products-menu" class="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-peach dark:bg-primary border border-accent dark:border-accent-dark transition-all duration-200 transform opacity-0 invisible pointer-events-none translate-y-2 z-50">
                  <a href="/plans" data-nav class="block px-4 py-2 text-primary dark:text-peach hover:bg-peach-soft dark:hover:bg-primary-light transition-colors">Plans</a>
                  <a href="/track" data-nav class="block px-4 py-2 text-primary dark:text-peach hover:bg-peach-soft dark:hover:bg-primary-light transition-colors">Track Products</a>
                  <a href="/careers" data-nav class="block px-4 py-2 text-primary dark:text-peach hover:bg-peach-soft dark:hover:bg-primary-light transition-colors">Careers</a>
                  <a href="/security" data-nav class="block px-4 py-2 text-primary dark:text-peach hover:bg-peach-soft dark:hover:bg-primary-light transition-colors">Security</a>
                </div>
              </div>
              <a href="/about" data-nav class="text-primary dark:text-peach hover:text-accent dark:hover:text-accent-soft transition-colors">About</a>
              <a href="/services" data-nav class="text-primary dark:text-peach hover:text-accent dark:hover:text-accent-soft transition-colors">Services</a>
              <a href="/contact" data-nav class="text-primary dark:text-peach hover:text-accent dark:hover:text-accent-soft transition-colors">Contact</a>
            </div>
            <!-- Desktop Auth & Theme -->
            <div class="hidden md:flex md:items-center md:space-x-4">
              <a href="/login" data-nav class="text-primary dark:text-peach hover:text-accent dark:hover:text-accent-soft transition-colors">Login</a>
              <a href="/signup" data-nav class="px-4 py-2 rounded-md bg-accent text-primary hover:bg-accent-soft dark:hover:bg-accent-dark transition-colors">Sign up</a>
              ${themeToggle.html}
            </div>
            <!-- Mobile Menu Button -->
            <button id="mobile-menu-btn" class="z-[9999] md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-peach-soft dark:hover:bg-primary-light transition-colors">
              <div id="hamburger-icon" class="relative w-6 h-5">
                <span class="hamburger-line top"></span>
                <span class="hamburger-line middle"></span>
                <span class="hamburger-line bottom"></span>
              </div>
            </button>
          </div>
        </div>
        <div id="mobile-menu-overlay"
  class="md:hidden fixed inset-0 bg-black opacity-0 hidden transition-opacity duration-300 z-[996]"
  aria-hidden="true"
></div>

<div
  id="mobile-menu"
  class="h-fit bg-peach md:hidden absolute inset-x-0 top-16 bottom-0 z-[999] dark:bg-primary transition-all transform -translate-y-full opacity-0 duration-300 ease-out"
  role="dialog"
  aria-modal="true"
  aria-labelledby="mobile-menu-title"
>
  <nav
    class="container mx-auto px-4 py-6 space-y-2"
    aria-label="Mobile Navigation"
  >
    <h2 id="mobile-menu-title" class="sr-only">Main Mobile Navigation</h2>
    <a
      href="/"
      data-nav
      class="block p-4 rounded-md text-primary dark:text-peach hover:bg-peach-soft dark:hover:bg-primary-light transition-colors"
      >Home</a
    >

    <div class="rounded-md">
      <button
        id="mobile-products-btn"
        type="button"
        class="w-full p-4 flex items-center justify-between text-primary dark:text-peach hover:bg-peach-soft dark:hover:bg-primary-light rounded-md transition-colors"
        aria-expanded="false"
        aria-controls="mobile-products-menu"
      >
        <span>Products</span>
        <svg
          id="mobile-products-chevron"
          class="h-5 w-5 transition-transform duration-200"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <div
        id="mobile-products-menu"
        class="h-0 opacity-0 overflow-hidden transition-all duration-300 ease-out"
        role="menu"
        aria-labelledby="mobile-products-btn"
      >
        <div
          class="py-2 px-4 bg-peach-soft dark:bg-primary-light rounded-md mt-0 transition-all"
        >
          <a
            href="/plans"
            data-nav
            class="block p-3 text-primary dark:text-peach hover:bg-peach dark:hover:bg-primary rounded-md transition-colors"
            role="menuitem"
            >Plans</a
          >
          <a
            href="/track"
            data-nav
            class="block p-3 text-primary dark:text-peach hover:bg-peach dark:hover:bg-primary rounded-md transition-colors"
            role="menuitem"
            >Track Products</a
          >
          <a
            href="/careers"
            data-nav
            class="block p-3 text-primary dark:text-peach hover:bg-peach dark:hover:bg-primary rounded-md transition-colors"
            role="menuitem"
            >Careers</a
          >
          <a
            href="/security"
            data-nav
            class="block p-3 text-primary dark:text-peach hover:bg-peach dark:hover:bg-primary rounded-md transition-colors"
            role="menuitem"
            >Security</a
          >
        </div>
      </div>
    </div>

    <a
      href="/about"
      data-nav
      class="block p-4 rounded-md text-primary dark:text-peach hover:bg-peach-soft dark:hover:bg-primary-light transition-colors"
      >About</a
    >
    <a
      href="/services"
      data-nav
      class="block p-4 rounded-md text-primary dark:text-peach hover:bg-peach-soft dark:hover:bg-primary-light transition-colors"
      >Services</a
    >
    <a
      href="/contact"
      data-nav
      class="block p-4 rounded-md text-primary dark:text-peach hover:bg-peach-soft dark:hover:bg-primary-light transition-colors"
      >Contact</a
    >

    <div
      class="pt-6 mt-6 border-t border-accent dark:border-accent-dark space-y-4"
    >
      <a
        href="/login"
        data-nav
        class="block w-full p-4 text-center rounded-md text-primary dark:text-peach hover:bg-peach-soft dark:hover:bg-primary-light transition-colors"
        >Login</a
      >
      <a
        href="/signup"
        data-nav
        class="block w-full p-4 text-center rounded-md bg-accent text-primary hover:bg-accent-soft dark:hover:bg-accent-dark transition-colors"
        >Sign up</a
      >
      <button
        id="mobile-theme-toggle"
        type="button"
        class="w-full flex items-center justify-center p-4 rounded-md border border-accent dark:border-accent-dark text-primary dark:text-peach hover:bg-peach-soft dark:hover:bg-primary-light transition-colors"
        aria-label="Toggle Theme"
      >
        <svg
          class="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
        Toggle Theme
      </button>
    </div>
  </nav>
</div>
      </nav>
    </header>
  `;

  return { html, pageEvents };
};

export default Navbar;
