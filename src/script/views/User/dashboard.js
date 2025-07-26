import Navbar from "./components/navbar";
import { supabase } from "../../utils/supabaseClient"; // <-- FIX: use named import
import logo from "/src/images/logo.jpg";
import { checkSession } from "./function/checkSession";
import { reset } from "../../utils/reset";

// Fetch user profile and notifications from Supabase
async function fetchUserAndNotifications() {
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { profile: null, notifications: [] };

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Fetch notifications (latest 10)
  const { data: notifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(3);

  return { profile, notifications: notifications || [] };
}

const dashboard = async () => {
  if (!(await checkSession())) return;
  reset("Dashboard");
  // Fetch user and notifications
  const { profile, notifications } = await fetchUserAndNotifications();

  // Navbar
  const { html: navbarHtml, pageEvents: navbarEvents } = Navbar("dashboard");

  // Hero Section
  const hero = `
    <section class="relative w-full h-64 md:h-80 flex items-center justify-center overflow-hidden rounded-b-2xl shadow-lg mb-8"
      style="background: url('https://www.wowtheme7.com/tf/transpro/assets/img/banner/breadcrumb.png') center/cover no-repeat, #1e293b;">
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 to-background-dark/90"></div>
      <div class="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <img src="${logo}" alt="SwiftEdge Logo" class="h-20 w-20 mb-2 rounded-full bg-white shadow-lg" />
        <h1 class="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-2">Welcome${profile?.full_name ? `, ${profile.full_name}` : ""}!</h1>
        <p class="text-lg text-accent mt-2 font-semibold">Your role: <span class="uppercase">${profile?.role || "user"}</span></p>
      </div>
    </section>
  `;

  // Dashboard Quick Links
  const quickLinks = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <a href="/prepare" data-nav class="bg-gradient-to-br from-primary to-accent p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-start">
        <h3 class="text-2xl font-bold text-white mb-3">Prepare a Package</h3>
        <p class="text-white text-opacity-90">Set up your package for delivery and get an instant quote.</p>
        <span class="mt-4 px-5 py-2 bg-white text-primary font-semibold rounded-full shadow-md hover:bg-peach transition-colors duration-200">Get Started</span>
      </a>
      <a href="/track" data-nav class="bg-gradient-to-br from-green-600 to-accent p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-start">
        <h3 class="text-2xl font-bold text-white mb-3">Track Your Product</h3>
        <p class="text-white text-opacity-90">Monitor the real-time status of your shipments.</p>
        <span class="mt-4 px-5 py-2 bg-white text-green-700 font-semibold rounded-full shadow-md hover:bg-peach transition-colors duration-200">Track Now</span>
      </a>
    </div>
  `;

  // Notifications List
  const notificationList = notifications.length
    ? notifications
        .map(
          (n) => `
        <div class="w-full max-w-xl bg-peach dark:bg-background-dark border-l-4 ${
          n.is_read ? "border-accent" : "border-primary"
        } p-4 rounded shadow cursor-pointer notification-item" data-id="${n.id}">
          <div class="flex items-center gap-2 mb-1">
            <i class="fa ${n.title?.toLowerCase().includes("delivered") ? "fa-box" : "fa-bell"} text-primary dark:text-accent"></i>
            <span class="font-semibold">${n.title}</span>
            <span class="ml-auto text-xs text-text-subtle">${new Date(n.created_at).toLocaleString()}</span>
          </div>
          <div class="text-sm text-text-dark dark:text-text-light truncate">${n.message}</div>
        </div>
      `
        )
        .join("")
    : `<div class="text-center text-text-subtle py-8">No notifications yet.</div>`;

  // Modal for notification details
  const modalHtml = `
    <div id="notification-modal" class="fixed inset-0 flex items-center justify-center z-[99999] bg-black bg-opacity-50 hidden">
      <div class="bg-white dark:bg-background-dark p-6 rounded-lg shadow-xl max-w-md w-full relative">
        <button id="close-modal-btn" class="absolute top-2 right-2 text-xl text-text-subtle hover:text-accent">&times;</button>
        <h3 id="modal-title" class="text-xl font-bold mb-2"></h3>
        <p id="modal-message" class="mb-4"></p>
        <div class="text-xs text-text-subtle" id="modal-date"></div>
      </div>
    </div>
  `;

  // Main Dashboard HTML
  const html = `
    <div class="min-h-screen bg-[#1e293b] dark:bg-background-dark transition-colors duration-300 bg-cover bg-center"
      style="background-image: url('https://www.wowtheme7.com/tf/transpro/assets/img/banner/breadcrumb.png'); background-blend-mode: multiply;">
      ${navbarHtml}
      <main id="dashboard-main" class="container mx-auto px-2 py-6 min-h-[80vh]">
        ${hero}
        <div class="flex flex-col md:flex-row gap-8">
          <div class="flex-1">
            <h2 class="text-2xl font-bold mb-4 text-primary dark:text-accent">Quick Actions</h2>
            ${quickLinks}
          </div>
          <aside class="w-full md:w-96">
            <div class="bg-white/90 dark:bg-background-dark/80 rounded-lg shadow-lg p-6 mb-6">
              <div class="flex items-center gap-3 mb-4">
                <img src="${profile?.avatar_url || logo}" alt="Avatar" class="h-12 w-12 rounded-full border-2 border-accent object-cover" />
                <div>
                  <div class="font-bold text-lg text-primary dark:text-accent">${profile?.full_name || "User"}</div>
                  <div class="text-xs text-text-subtle">Role: <span class="uppercase">${profile?.role || "user"}</span></div>
                </div>
              </div>
              <div class="text-sm text-text-subtle">Phone: ${profile?.phone || "N/A"}</div>
              <div class="text-sm text-text-subtle">Joined: ${profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "N/A"}</div>
            </div>
            <div class="bg-white/90 dark:bg-background-dark/80 rounded-lg shadow-lg p-6">
              <h3 class="text-lg font-bold mb-3 text-primary dark:text-accent">Recent Notifications</h3>
              <div class="flex flex-col gap-3">
                ${notificationList}
              </div>
            </div>
          </aside>
        </div>
        <div class="mt-12 text-center">
          <h3 class="text-2xl font-semibold text-text-dark dark:text-text-light mb-4">Our Commitment</h3>
          <p class="text-md text-text-subtle dark:text-text-light max-w-xl mx-auto">
            At SwiftEdge, we are committed to providing unparalleled service, ensuring your packages arrive safely and on time, and helping you sell your valuable items with ease.
          </p>
        </div>
      </main>
      ${modalHtml}
      <footer class="bg-white/80 dark:bg-background-dark/80 shadow-inner mt-12 py-6 text-center text-text-subtle dark:text-text-light transition-colors duration-300">
        <p>&copy; ${new Date().getFullYear()} SwiftEdge Logistics. All rights reserved.</p>
        <p class="text-sm mt-2">Designed for efficient logistics.</p>
      </footer>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    </div>
  `;

  function pageEvents() {
    navbarEvents();

    // Modal logic for notifications
    document.querySelectorAll(".notification-item").forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("data-id");
        const notif = notifications.find((n) => n.id === id);
        if (!notif) return;
        document.getElementById("modal-title").textContent = notif.title;
        document.getElementById("modal-message").textContent = notif.message;
        document.getElementById("modal-date").textContent = new Date(notif.created_at).toLocaleString();
        document.getElementById("notification-modal").classList.remove("hidden");
      });
    });
    const closeBtn = document.getElementById("close-modal-btn");
    if (closeBtn) {
      closeBtn.onclick = () => {
        document.getElementById("notification-modal").classList.add("hidden");
      };
    }
    // Close modal on backdrop click
    document.getElementById("notification-modal")?.addEventListener("click", (e) => {
      if (e.target.id === "notification-modal") {
        document.getElementById("notification-modal").classList.add("hidden");
      }
    });
  }

  return { html, pageEvents };
};

export default dashboard;