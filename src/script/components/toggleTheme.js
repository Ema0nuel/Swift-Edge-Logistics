const toggleTheme = () => {
  // Set theme on load from localStorage or system preference
  function setInitialTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }

  function pageEvents() {
    setInitialTheme();
    const themeBtn = document.getElementById("desktop-theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
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
  }

  const html = `
    <button id="desktop-theme-toggle" class="ml-2 p-2 rounded-md border border-accent dark:border-accent-dark text-primary dark:text-peach hover:bg-peach-soft dark:hover:bg-primary-light transition-colors">
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </button>
  `;

  return { html, pageEvents };
};

export default toggleTheme;