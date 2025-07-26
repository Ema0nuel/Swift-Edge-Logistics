import{s as k}from"./logo-BSIuJKwo.js";const x="/assets/logo-ByXte2We.png",L=[{href:"https://www.facebook.com/",icon:"fab fa-facebook-f",alt:"Facebook"},{href:"https://twitter.com/",icon:"fab fa-twitter",alt:"Twitter"},{href:"https://www.linkedin.com/",icon:"fab fa-linkedin-in",alt:"LinkedIn"},{href:"mailto:swiftedgelogistics01@gmail.com",icon:"fas fa-envelope",alt:"Email"}],B=()=>{function s(){}return{html:`
    <footer class="w-full bg-peach dark:bg-primary text-primary dark:text-peach border-t border-accent dark:border-accent-dark pt-10 pb-6 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          <!-- Logo & About -->
          <div class="flex-1 min-w-[220px] mb-6 md:mb-0">
            <div class="flex items-center mb-4">
              <picture>
                <source srcset="${k}" media="(prefers-color-scheme: dark)">
                <img src="${x}" alt="Swift Edge Logistics" class="h-12 w-auto" />
              </picture>
            </div>
            <p class="text-sm leading-relaxed max-w-md">
              Swift Edge Logistics is a fast, reliable consignment & courier service providing businesses and individuals nationwide with seamless logistics, tracking, and support.
            </p>
          </div>
          <!-- Footer Navigation -->
          <div class="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h5 class="font-semibold mb-3">Services</h5>
              <ul class="space-y-2">
                <li><a href="/services" data-nav class="hover:text-accent dark:hover:text-accent-soft transition-colors">All Services</a></li>
                <li><a href="/plans" data-nav class="hover:text-accent dark:hover:text-accent-soft transition-colors">Plans</a></li>
                <li><a href="/track" data-nav class="hover:text-accent dark:hover:text-accent-soft transition-colors">Track Products</a></li>
                <li><a href="/dropoff" data-nav class="hover:text-accent dark:hover:text-accent-soft transition-colors">Drop Off</a></li>
              </ul>
            </div>
            <div>
              <h5 class="font-semibold mb-3">Company</h5>
              <ul class="space-y-2">
                <li><a href="/about" data-nav class="hover:text-accent dark:hover:text-accent-soft transition-colors">About Us</a></li>
                <li><a href="/careers" data-nav class="hover:text-accent dark:hover:text-accent-soft transition-colors">Careers</a></li>
                <li><a href="/privacy" data-nav class="hover:text-accent dark:hover:text-accent-soft transition-colors">Privacy</a></li>
                <li><a href="/terms" data-nav class="hover:text-accent dark:hover:text-accent-soft transition-colors">Terms</a></li>
              </ul>
            </div>
            <div>
              <h5 class="font-semibold mb-3">Industries</h5>
              <ul class="space-y-2">
                <li><a href="/industries/healthcare" data-nav class="hover:text-accent dark:hover:text-accent-soft transition-colors">Healthcare</a></li>
                <li><a href="/industries/retail" data-nav class="hover:text-accent dark:hover:text-accent-soft transition-colors">Retail</a></li>
                <li><a href="/industries/industrial" data-nav class="hover:text-accent dark:hover:text-accent-soft transition-colors">Industrial</a></li>
              </ul>
            </div>
            <div>
              <h5 class="font-semibold mb-3">Contact</h5>
              <ul class="space-y-2">
                <li><a href="/contact" data-nav class="hover:text-accent dark:hover:text-accent-soft transition-colors">Contact Form</a></li>
                <li><a href="tel:+15022095647" data-nav class="hover:text-accent dark:hover:text-accent-soft transition-colors">+1 (502) 209-5647</a></li>
              </ul>
            </div>
          </div>
        </div>
        <!-- Social & Copyright -->
        <div class="flex flex-col md:flex-row md:justify-between items-center mt-10 pt-6 border-t border-accent dark:border-accent-dark">
          <div class="flex gap-4 mb-4 md:mb-0">
            ${L.map(c=>`
              <a href="${c.href}" data-nav target="_blank" rel="noopener" aria-label="${c.alt}">
                <i class="${c.icon} text-xl opacity-80 hover:opacity-100 transition-opacity"></i>
              </a>
            `).join("")}
          </div>
          <p class="text-xs text-primary dark:text-peach text-center md:text-right">&copy; <span id="currentYear">${new Date().getFullYear()}</span> Swift Edge Logistics. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  `,pageEvents:s}},w=()=>{function s(){const e=localStorage.getItem("theme");e==="dark"||!e&&window.matchMedia("(prefers-color-scheme: dark)").matches?(document.documentElement.classList.add("dark"),document.documentElement.classList.remove("light")):(document.documentElement.classList.remove("dark"),document.documentElement.classList.add("light"))}function l(){s();const e=document.getElementById("desktop-theme-toggle");e&&e.addEventListener("click",()=>{document.documentElement.classList.contains("dark")?(document.documentElement.classList.remove("dark"),document.documentElement.classList.add("light"),localStorage.setItem("theme","light")):(document.documentElement.classList.add("dark"),document.documentElement.classList.remove("light"),localStorage.setItem("theme","dark"))})}return{html:`
    <button id="desktop-theme-toggle" class="ml-2 p-2 rounded-md border border-accent dark:border-accent-dark text-primary dark:text-peach hover:bg-peach-soft dark:hover:bg-primary-light transition-colors">
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </button>
  `,pageEvents:l}},I=()=>{const s=w();function l(){const e=document.getElementById("desktop-products-btn"),r=document.getElementById("desktop-products-menu"),u=document.getElementById("desktop-products-chevron");if(e&&r){let d=function(){r.classList.remove("opacity-0","invisible","pointer-events-none","translate-y-2"),r.classList.add("opacity-100","visible","pointer-events-auto","translate-y-0"),u?.classList.add("rotate-180")},n=function(){r.classList.remove("opacity-100","visible","pointer-events-auto","translate-y-0"),r.classList.add("opacity-0","invisible","pointer-events-none","translate-y-2"),u?.classList.remove("rotate-180")},a;e.addEventListener("mouseenter",()=>{clearTimeout(a),d()}),e.addEventListener("focus",d),r.addEventListener("mouseenter",()=>{clearTimeout(a),d()}),e.addEventListener("mouseleave",()=>{a=setTimeout(n,120)}),r.addEventListener("mouseleave",()=>{a=setTimeout(n,120)}),document.addEventListener("click",h=>{!e.contains(h.target)&&!r.contains(h.target)&&n()}),document.addEventListener("keydown",h=>{h.key==="Escape"&&n()})}const b=document.getElementById("mobile-menu-btn"),i=document.getElementById("mobile-menu"),o=document.getElementById("mobile-menu-overlay"),p=document.getElementById("hamburger-icon"),g=document.getElementById("mobile-products-btn"),t=document.getElementById("mobile-products-menu"),m=document.getElementById("mobile-products-chevron");function y(){o.classList.remove("hidden"),requestAnimationFrame(()=>{o.classList.add("opacity-60"),o.classList.remove("opacity-0"),i.classList.remove("-translate-y-full","opacity-0"),i.classList.add("translate-y-0","opacity-100"),p.classList.add("open"),document.body.classList.add("overflow-hidden")})}function v(){i.classList.remove("translate-y-0","opacity-100"),i.classList.add("-translate-y-full","opacity-0"),o.classList.remove("opacity-60"),o.classList.add("opacity-0"),p.classList.remove("open"),setTimeout(()=>{o.classList.add("hidden"),document.body.classList.remove("overflow-hidden"),t&&(t.style.height="0px",t.classList.remove("h-auto","opacity-100","mt-2"),m?.classList.remove("rotate-180"))},300)}b&&i&&o&&p&&(b.addEventListener("click",()=>{i.classList.contains("translate-y-0")?v():y()}),o.addEventListener("click",v),i.querySelectorAll("[data-nav]").forEach(a=>{a.addEventListener("click",v)})),g&&t&&m&&g.addEventListener("click",a=>{if(a.stopPropagation(),t.classList.contains("h-auto"))t.style.height="0px",t.classList.remove("h-auto","opacity-100","mt-2"),m.classList.remove("rotate-180");else{t.classList.add("h-auto");const n=t.scrollHeight;t.style.height=n+"px",t.classList.add("opacity-100","mt-2"),m.classList.add("rotate-180")}});const f=document.getElementById("mobile-theme-toggle");f&&f.addEventListener("click",a=>{a.stopPropagation(),document.documentElement.classList.contains("dark")?(document.documentElement.classList.remove("dark"),document.documentElement.classList.add("light"),localStorage.setItem("theme","light")):(document.documentElement.classList.add("dark"),document.documentElement.classList.remove("light"),localStorage.setItem("theme","dark"))}),s.pageEvents&&s.pageEvents()}return{html:`
    <header class="sticky top-0 left-0 right-0 z-[99999]">
      <nav class="relative bg-peach dark:bg-primary border-b border-accent dark:border-accent-dark shadow-sm transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="relative flex items-center justify-between h-16">
            <!-- Logo -->
            <a href="/" data-nav class="flex-shrink-0">
              <picture class="block h-10 w-auto">
                <source srcset="${k}" media="(prefers-color-scheme: dark)">
                <img src="${x}" alt="SwiftEdge Logistics" class="h-full w-auto">
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
              ${s.html}
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
  `,pageEvents:l}};export{B as F,I as N,x as s};
//# sourceMappingURL=navbar-D_OOEgUD.js.map
