import { supabase } from "../../utils/supabaseClient";
import Navbar from "./components/navbar";
import { reset } from "../../utils/reset";
import toastr from "../../utils/toastr";
import { sendEmail } from "../../utils/send-email";
import dayjs from "dayjs";
import userIcon from '../../../images/avatar-default.png';

function showSpinner() {
  if (document.getElementById("notifSpinner")) return;
  const spinner = document.createElement("div");
  spinner.id = "notifSpinner";
  spinner.innerHTML = `
    <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
    </div>
  `;
  document.body.appendChild(spinner);
}
function hideSpinner() {
  document.getElementById("notifSpinner")?.remove();
}

function showEmailModal({ to, email, title = "", message = "", onSend }) {
  const modalId = "customEmailModal";
  document.getElementById(modalId)?.remove();
  const html = `
    <div id="${modalId}" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-8 w-full max-w-lg shadow-lg relative animate-slideIn">
        <button id="closeCustomEmailModalBtn" class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl">×</button>
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Send Email to ${to}</h2>
        <form id="customEmailForm" class="space-y-4">
          <input type="email" name="email" value="${email}" placeholder="Recipient Email" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
          <input type="text" name="title" value="${title}" placeholder="Subject" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
          <textarea name="message" placeholder="Message" class="input input-bordered w-full py-2 px-4 rounded-lg" required>${message}</textarea>
          <button type="submit" class="btn btn-primary w-full py-2 font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white">Send Email</button>
        </form>
      </div>
    </div>
    <style>
      .animate-slideIn { animation: slideIn 0.4s cubic-bezier(.4,0,.2,1); }
      @keyframes slideIn { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    </style>
  `;
  document.body.insertAdjacentHTML("beforeend", html);
  document.getElementById("closeCustomEmailModalBtn")?.addEventListener("click", () => {
    document.getElementById(modalId)?.remove();
  });
  document.getElementById("customEmailForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const emailVal = form.email.value.trim();
    const titleVal = form.title.value.trim();
    const messageVal = form.message.value.trim();
    if (!emailVal || !titleVal || !messageVal) {
      toastr.error("Please fill all fields.");
      return;
    }
    await onSend(emailVal, titleVal, messageVal);
    document.getElementById(modalId)?.remove();
  });
}

const notifications = async () => {
  reset("Notifications");
  const { html: navbarHtml, pageEvents: navbarEvents } = Navbar();

  async function fetchAll() {
    const [{ data: notifications }, { data: profiles }, { data: shipments }] = await Promise.all([
      supabase.from("notifications").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("id, full_name, email, avatar_url"),
      supabase.from("shipments").select("id, receiver_name, receiver_address, receiver_phone, email")
    ]);
    return {
      notifications: notifications || [],
      profiles: profiles || [],
      shipments: shipments || []
    };
  }

  function renderNotifications(notifications, profiles, shipments) {
    return `
      <div class="mb-8">
        <h2 class="text-3xl font-bold mb-4 text-white">User Notifications</h2>
        <div class="space-y-4">
          ${notifications.length ? notifications.map(n => {
            const user = profiles.find(p => p.id === n.user_id) || {};
            return `
              <div class="bg-white/90 rounded-xl shadow-lg p-5 flex items-start gap-4 border border-indigo-100 hover:shadow-xl transition-all">
                <img src="${user.avatar_url || userIcon}" class="w-12 h-12 rounded-full border-2 border-indigo-400" alt="User" />
                <div class="flex-1">
                  <div class="flex justify-between items-center mb-1">
                    <span class="font-bold text-indigo-700 text-lg">${user.full_name || "Unknown"}</span>
                    <span class="text-xs text-gray-400">${dayjs(n.created_at).format("MMM D, HH:mm")}</span>
                  </div>
                  <div class="font-semibold text-lg text-gray-800 mb-1">${n.title}</div>
                  <div class="text-gray-600 mb-2">${n.message}</div>
                  <div class="flex gap-2 mt-2">
                    <button class="editNotifBtn px-3 py-1 rounded bg-yellow-500 text-white text-xs shadow hover:bg-yellow-600" data-id="${n.id}">Edit</button>
                    <button class="deleteNotifBtn px-3 py-1 rounded bg-red-500 text-white text-xs shadow hover:bg-red-600" data-id="${n.id}">Delete</button>
                    <button class="emailNotifBtn px-3 py-1 rounded bg-blue-600 text-white text-xs shadow hover:bg-blue-700" data-id="${n.id}" data-email="${user.email}" data-name="${user.full_name || "User"}">Send Custom Email</button>
                  </div>
                </div>
              </div>
            `;
          }).join("") : `<div class="text-gray-400">No notifications found.</div>`}
        </div>
      </div>
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4 text-white">All Receivers Info</h2>
        <div class="space-y-4">
          ${shipments.length ? shipments.map(rs => `
            <div class="bg-indigo-50 rounded-lg p-4 mb-2 border border-indigo-100">
              <div class="font-bold text-indigo-700 mb-2">Receiver Details</div>
              <div><b>Name:</b> ${rs.receiver_name}</div>
              <div><b>Address:</b> ${rs.receiver_address}</div>
              <div><b>Phone:</b> ${rs.receiver_phone}</div>
              <div><b>Email:</b> ${rs.email}</div>
              <button class="emailReceiverBtn px-3 py-1 mt-2 rounded bg-blue-600 text-white text-xs shadow hover:bg-blue-700"
                data-email="${rs.email}" data-name="${rs.receiver_name}">Send Custom Email</button>
            </div>
          `).join("") : `<div class="text-gray-400">No receiver info found.</div>`}
        </div>
      </div>
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4 text-white">Send Email Notification</h2>
        <button id="openAdminEmailModalBtn" class="btn btn-primary py-2 px-6 font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow hover:scale-105 transition-all">Send Custom Email</button>
      </div>
    `;
  }

  function showEditModal(notif) {
    const modalHtml = `
      <div id="editNotifModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-8 w-full max-w-md shadow-lg relative animate-slideIn">
          <button id="closeEditNotifModalBtn" class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl">×</button>
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Edit Notification</h2>
          <form id="editNotifForm" class="space-y-4">
            <input type="text" name="title" value="${notif.title}" placeholder="Title" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
            <textarea name="message" placeholder="Message" class="input input-bordered w-full py-2 px-4 rounded-lg" required>${notif.message}</textarea>
            <button type="submit" class="btn btn-primary w-full py-2 font-bold bg-gradient-to-r from-yellow-500 to-yellow-700 text-white">Update</button>
          </form>
        </div>
      </div>
      <style>
        .animate-slideIn { animation: slideIn 0.4s cubic-bezier(.4,0,.2,1); }
        @keyframes slideIn {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      </style>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHtml);
    document.getElementById("closeEditNotifModalBtn")?.addEventListener("click", () => {
      document.getElementById("editNotifModal")?.remove();
    });
    document.getElementById("editNotifForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      const title = form.title.value.trim();
      const message = form.message.trim();
      await supabase.from("notifications").update({ title, message }).eq("id", notif.id);
      toastr.success("Notification updated!");
      document.getElementById("editNotifModal")?.remove();
      renderMain();
    });
  }

  async function sendNotificationEmail(email, title, message) {
    showSpinner();
    try {
      await sendEmail({
        to: email,
        subject: title,
        html: `
          <div style="font-family:Arial,sans-serif;">
            <h2 style="color:#2d3748;">${title}</h2>
            <p>${message}</p>
            <p style="margin-top:24px;color:#718096;">Swift Edge Logistics Team</p>
          </div>
        `
      });
      toastr.success("Email sent!");
    } catch (err) {
      toastr.error("Failed to send email.");
    }
    hideSpinner();
  }

  function mainEvents(notifications, profiles, shipments) {
    navbarEvents();

    document.querySelectorAll(".editNotifBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        const notif = notifications.find(n => n.id === btn.dataset.id);
        showEditModal(notif);
      });
    });

    document.querySelectorAll(".deleteNotifBtn").forEach(btn => {
      btn.addEventListener("click", async () => {
        await supabase.from("notifications").delete().eq("id", btn.dataset.id);
        toastr.success("Notification deleted!");
        renderMain();
      });
    });

    document.querySelectorAll(".emailNotifBtn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const notif = notifications.find(n => n.id === btn.dataset.id);
        const email = btn.dataset.email;
        const name = btn.dataset.name || "User";
        showEmailModal({
          to: name,
          email: email,
          title: notif.title,
          message: notif.message,
          onSend: sendNotificationEmail
        });
      });
    });

    document.querySelectorAll(".emailReceiverBtn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const email = btn.dataset.email;
        const name = btn.dataset.name || "Receiver";
        showEmailModal({
          to: name,
          email: email,
          title: "",
          message: "",
          onSend: sendNotificationEmail
        });
      });
    });

    document.getElementById("openAdminEmailModalBtn")?.addEventListener("click", () => {
      showEmailModal({
        to: "Custom Recipient",
        email: "",
        title: "",
        message: "",
        onSend: sendNotificationEmail
      });
    });
  }

  async function renderMain() {
    showSpinner();
    const { notifications, profiles, shipments } = await fetchAll();
    hideSpinner();
    const html = `
      <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex">
        ${navbarHtml}
        <div class="flex-1 ml-0 sm:ml-64 h-screen overflow-y-auto transition-all duration-300">
          <main class="p-4 md:p-8 max-w-5xl mx-auto animate-fadeIn">
            ${renderNotifications(notifications, profiles, shipments)}
          </main>
        </div>
      </div>
      <style>
        .input.input-bordered { border: 1px solid #cbd5e1; background: #f8fafc; }
        .input:focus { outline: none; border-color: #6366f1; }
        .btn.btn-primary { background: linear-gradient(to right, #2563eb, #6366f1); }
        .btn:focus { outline: none; }
        textarea.input { min-height: 48px; }
      </style>
    `;
    document.querySelector("#app").innerHTML = html;
    mainEvents(notifications, profiles, shipments);
  }

  return { html: "", pageEvents: async () => await renderMain() }
};

export default notifications;