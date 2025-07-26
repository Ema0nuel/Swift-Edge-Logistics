import { logout } from '../functions/checkSession.js';
import { reset } from '../../../utils/reset.js';

const logo = "/src/images/logo.jpg";

const adminLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: "fa-chart-bar" },
  { name: "Users", href: "/admin/users", icon: "fa-users" },
  { name: "Shipments", href: "/admin/shipments", icon: "fa-truck" },
  { name: "Payments", href: "/admin/payments", icon: "fa-credit-card" },
  { name: "Notifications", href: "/admin/notifications", icon: "fa-bell" },
];

const navbar = () => {
  const html = `
    <aside id="admin-sidebar" class="fixed left-0 top-0 z-40 h-screen w-64 bg-gray-900 border-r border-gray-800 transition-transform duration-300 ease-in-out sm:translate-x-0 overflow-hidden">
      <div class="flex flex-col h-full px-3 py-4">
        <div class="flex items-center mb-6 pl-2.5">
          <img src="${logo}" class="h-8 w-8 rounded-full mr-3" alt="Logo" />
          <span class="self-center text-xl font-semibold text-white">SwiftEdge</span>
        </div>
        <nav class="flex-1 space-y-2 overflow-y-auto">
          ${adminLinks.map(link => `
            <a href="${link.href}" data-nav 
              class="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-200 group">
              <i class="fa ${link.icon} w-5 h-5 mr-3 transition-transform group-hover:scale-110"></i>
              <span>${link.name}</span>
            </a>
          `).join('')}
        </nav>
        <button id="logoutLink" 
          class="flex items-center px-4 py-3 text-red-400 rounded-lg hover:bg-red-900/50 hover:text-red-300 transition-all duration-200 group mt-4">
          <i class="fa fa-sign-out-alt w-5 h-5 mr-3 transition-transform group-hover:scale-110"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>
    <button id="sidebar-toggle" class="fixed left-4 top-4 z-50 sm:hidden bg-gray-900 text-white p-2 rounded-lg">
      <i class="fa fa-bars"></i>
    </button>
  `;

  function pageEvents() {
    const sidebar = document.getElementById('admin-sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const logoutLink = document.getElementById('logoutLink');

    // Toggle sidebar on mobile
    sidebarToggle?.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-full');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth < 640 && 
          !sidebar?.contains(e.target) && 
          !sidebarToggle?.contains(e.target)) {
        sidebar?.classList.add('-translate-x-full');
      }
    });

    // Handle navigation
    document.querySelectorAll('a[data-nav]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (window.innerWidth < 640) {
          sidebar?.classList.add('-translate-x-full');
        }
        reset(link.textContent.trim());
        window.history.pushState({}, '', href);
      });
    });

    // Handle logout
    logoutLink?.addEventListener('click', logout);
  }

  return { html, pageEvents };
};

export default navbar;