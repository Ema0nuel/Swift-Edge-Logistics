export function startPreloader() {
    if (document.getElementById("page-preloader")) return;

    const preloader = document.createElement("div");
    preloader.id = "page-preloader";
    preloader.className = `
      fixed inset-0 z-50 flex items-center justify-center
      bg-background-light/90 text-primary dark:bg-background-dark/90 dark:text-accent
      transition-opacity duration-500 opacity-100
    `;

    preloader.innerHTML = `
      <div class="relative flex flex-col items-center">
        <div class="animate-spin-slow rounded-full border-8 border-accent border-t-primary dark:border-accent-dark dark:border-t-accent w-16 h-16 mb-4 shadow-lg"></div>
        <span class="text-lg font-semibold animate-pulse-slow">Loading...</span>
      </div>
    `;

    document.body.append(preloader);
}

export function endPreloader(duration = 500) {
    const preloader = document.getElementById("page-preloader");
    if (preloader) {
        preloader.classList.add("opacity-0");
        setTimeout(() => preloader.remove(), duration);
    }
}