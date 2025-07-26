import logoLight from "/src/images/logo.png";
import logoDark from "/src/images/logo.jpg";

const socialLinks = [
  {
    href: "https://www.facebook.com/",
    icon: "fab fa-facebook-f",
    alt: "Facebook"
  },
  {
    href: "https://twitter.com/",
    icon: "fab fa-twitter",
    alt: "Twitter"
  },
  {
    href: "https://www.linkedin.com/",
    icon: "fab fa-linkedin-in",
    alt: "LinkedIn"
  },
  {
    href: "mailto:swiftedgelogistics01@gmail.com",
    icon: "fas fa-envelope",
    alt: "Email"
  }
];

const Footer = () => {
  function pageEvents() {
    // No dynamic events needed for now
  }

  const html = /* html */`
    <footer class="w-full bg-peach dark:bg-primary text-primary dark:text-peach border-t border-accent dark:border-accent-dark pt-10 pb-6 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          <!-- Logo & About -->
          <div class="flex-1 min-w-[220px] mb-6 md:mb-0">
            <div class="flex items-center mb-4">
              <picture>
                <source srcset="${logoDark}" media="(prefers-color-scheme: dark)">
                <img src="${logoLight}" alt="Swift Edge Logistics" class="h-12 w-auto" />
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
            ${socialLinks.map(link => `
              <a href="${link.href}" data-nav target="_blank" rel="noopener" aria-label="${link.alt}">
                <i class="${link.icon} text-xl opacity-80 hover:opacity-100 transition-opacity"></i>
              </a>
            `).join("")}
          </div>
          <p class="text-xs text-primary dark:text-peach text-center md:text-right">&copy; <span id="currentYear">${new Date().getFullYear()}</span> Swift Edge Logistics. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  `;

  return { html, pageEvents };
};

export default Footer;