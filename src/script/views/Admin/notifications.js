import { supabase } from "../../utils/supabaseClient";
import Navbar from "./components/navbar";
import { reset } from "../../utils/reset";
import toastr from "../../utils/toastr";
import { sendEmail } from "../../utils/send-email";
import dayjs from "dayjs";

// --- Spinner ---
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

const notifications = async () => {
  reset("Notifications");
  const { html: navbarHtml, pageEvents: navbarEvents } = Navbar();

  // Fetch notifications, invoices, and profiles
  async function fetchAll() {
    const [{ data: notifications }, { data: invoices }, { data: profiles }] = await Promise.all([
      supabase.from("notifications").select("*").order("created_at", { ascending: false }),
      supabase.from("payments").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("id, full_name, email, avatar_url")
    ]);
    return { notifications: notifications || [], invoices: invoices || [], profiles: profiles || [] };
  }

  // Render notification list
  function renderNotifications(notifications, profiles) {
    return `
      <div class="mb-8">
        <h2 class="text-3xl font-bold mb-4 text-white">User Notifications</h2>
        <div class="space-y-4">
          ${notifications.length ? notifications.map(n => {
            const user = profiles.find(p => p.id === n.user_id) || {};
            return `
              <div class="bg-white/90 rounded-xl shadow-lg p-5 flex items-start gap-4 border border-indigo-100 hover:shadow-xl transition-all">
                <img src="${user.avatar_url || '/src/images/avatar-default.png'}" class="w-12 h-12 rounded-full border-2 border-indigo-400" alt="User" />
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
                    <button class="emailNotifBtn px-3 py-1 rounded bg-blue-600 text-white text-xs shadow hover:bg-blue-700" data-id="${n.id}" data-email="${user.email}">Send Email</button>
                  </div>
                </div>
              </div>
            `;
          }).join("") : `<div class="text-gray-400">No notifications found.</div>`}
        </div>
      </div>
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4 text-white">Send Email Notification</h2>
        <form id="adminSendEmailForm" class="flex flex-col md:flex-row gap-4 items-center bg-white/90 rounded-xl shadow-lg p-6 border border-indigo-100">
          <input type="email" id="adminEmailTo" placeholder="Recipient Email" class="input input-bordered py-2 px-4 rounded-lg flex-1" required />
          <input type="text" id="adminEmailTitle" placeholder="Subject" class="input input-bordered py-2 px-4 rounded-lg flex-1" required />
          <textarea id="adminEmailMessage" placeholder="Message" class="input input-bordered py-2 px-4 rounded-lg flex-1" required></textarea>
          <button type="submit" class="btn btn-primary py-2 px-6 font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow hover:scale-105 transition-all">Send Email</button>
        </form>
      </div>
    `;
  }

  // Render invoices/receipts
  function renderInvoices(invoices, profiles) {
    return `
      <div class="mb-8">
        <h2 class="text-3xl font-bold mb-4 text-white">Invoices & Receipts</h2>
        <div class="space-y-4">
          ${invoices.length ? invoices.map(inv => {
            const user = profiles.find(p => p.id === inv.user_id) || {};
            return `
              <div class="bg-white/90 rounded-xl shadow-lg p-5 flex items-start gap-4 border border-indigo-100 hover:shadow-xl transition-all">
                <img src="${user.avatar_url || '/src/images/avatar-default.png'}" class="w-12 h-12 rounded-full border-2 border-indigo-400" alt="User" />
                <div class="flex-1">
                  <div class="flex justify-between items-center mb-1">
                    <span class="font-bold text-indigo-700 text-lg">${user.full_name || "Unknown"}</span>
                    <span class="text-xs text-gray-400">${dayjs(inv.created_at).format("MMM D, YYYY")}</span>
                  </div>
                  <div class="font-semibold text-lg text-gray-800 mb-1">Invoice #${inv.id}</div>
                  <div class="text-gray-600 mb-2">Amount: $${inv.amount} | Status: ${inv.status} | Method: ${inv.method}</div>
                  <div class="flex gap-2 mt-2">
                    <button class="viewInvoiceBtn px-3 py-1 rounded bg-green-600 text-white text-xs shadow hover:bg-green-700" data-id="${inv.id}">View</button>
                    <button class="emailInvoiceBtn px-3 py-1 rounded bg-blue-600 text-white text-xs shadow hover:bg-blue-700" data-id="${inv.id}" data-email="${user.email}">Resend Receipt</button>
                    <button class="downloadInvoiceBtn px-3 py-1 rounded bg-indigo-600 text-white text-xs shadow hover:bg-indigo-700" data-id="${inv.id}">Download</button>
                  </div>
                </div>
              </div>
            `;
          }).join("") : `<div class="text-gray-400">No invoices found.</div>`}
        </div>
      </div>
    `;
  }

  // Edit notification modal
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

  // View invoice modal
  function showInvoiceModal(invoice, user) {
    const modalHtml = `
      <div id="viewInvoiceModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-8 w-full max-w-lg shadow-lg relative animate-slideIn">
          <button id="closeViewInvoiceModalBtn" class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl">×</button>
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Invoice Details</h2>
          <div class="mb-4">
            <strong>Invoice #${invoice.id}</strong><br/>
            <strong>User:</strong> ${user.full_name || "Unknown"}<br/>
            <strong>Email:</strong> ${user.email || "N/A"}<br/>
            <strong>Amount:</strong> $${invoice.amount}<br/>
            <strong>Status:</strong> ${invoice.status}<br/>
            <strong>Method:</strong> ${invoice.method}<br/>
            <strong>Date:</strong> ${dayjs(invoice.created_at).format("MMM D, YYYY")}
          </div>
          <button id="downloadInvoiceBtnModal" class="btn btn-primary w-full py-2 font-bold bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">Download Invoice</button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHtml);
    document.getElementById("closeViewInvoiceModalBtn")?.addEventListener("click", () => {
      document.getElementById("viewInvoiceModal")?.remove();
    });
    document.getElementById("downloadInvoiceBtnModal")?.addEventListener("click", () => {
      exportInvoice(invoice, user);
    });
  }

  // Export/download invoice as PDF (simple HTML to PDF)
  function exportInvoice(invoice, user) {
    const html = `
      <html>
      <head>
        <title>Invoice #${invoice.id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 2em; }
          .header { font-size: 2em; font-weight: bold; margin-bottom: 1em; }
          .section { margin-bottom: 1em; }
        </style>
      </head>
      <body>
        <div class="header">Swift Edge Logistics - Invoice</div>
        <div class="section"><strong>Invoice #:</strong> ${invoice.id}</div>
        <div class="section"><strong>User:</strong> ${user.full_name || "Unknown"}</div>
        <div class="section"><strong>Email:</strong> ${user.email || "N/A"}</div>
        <div class="section"><strong>Amount:</strong> $${invoice.amount}</div>
        <div class="section"><strong>Status:</strong> ${invoice.status}</div>
        <div class="section"><strong>Method:</strong> ${invoice.method}</div>
        <div class="section"><strong>Date:</strong> ${dayjs(invoice.created_at).format("MMM D, YYYY")}</div>
      </body>
      </html>
    `;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Invoice_${invoice.id}.html`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      a.remove();
      URL.revokeObjectURL(url);
    }, 1000);
  }

  // Send email to any address
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

  // Send invoice/receipt email
  async function sendInvoiceEmail(email, invoice, user) {
    showSpinner();
    try {
      await sendEmail({
        to: email,
        subject: `Your Invoice from Swift Edge Logistics`,
        html: `
          <h2>Invoice #${invoice.id}</h2>
          <p>Dear ${user.full_name || "Customer"},</p>
          <p>Thank you for your payment. Here is your receipt:</p>
          <ul>
            <li><strong>Amount:</strong> $${invoice.amount}</li>
            <li><strong>Status:</strong> ${invoice.status}</li>
            <li><strong>Method:</strong> ${invoice.method}</li>
            <li><strong>Date:</strong> ${dayjs(invoice.created_at).format("MMM D, YYYY")}</li>
          </ul>
          <p>Swift Edge Logistics Team</p>
        `
      });
      toastr.success("Receipt sent to customer!");
    } catch (err) {
      toastr.error("Failed to send receipt.");
    }
    hideSpinner();
  }

  // Main event handlers
  function mainEvents(notifications, invoices, profiles) {
    navbarEvents();

    // Edit notification
    document.querySelectorAll(".editNotifBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        const notif = notifications.find(n => n.id === btn.dataset.id);
        showEditModal(notif);
      });
    });

    // Delete notification
    document.querySelectorAll(".deleteNotifBtn").forEach(btn => {
      btn.addEventListener("click", async () => {
        await supabase.from("notifications").delete().eq("id", btn.dataset.id);
        toastr.success("Notification deleted!");
        renderMain();
      });
    });

    // Send notification email (from notification card)
    document.querySelectorAll(".emailNotifBtn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const notif = notifications.find(n => n.id === btn.dataset.id);
        const email = btn.dataset.email;
        if (email) {
          await sendNotificationEmail(email, notif.title, notif.message);
        } else {
          toastr.error("User email not found.");
        }
      });
    });

    // View invoice
    document.querySelectorAll(".viewInvoiceBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        const invoice = invoices.find(i => i.id === btn.dataset.id);
        const user = profiles.find(p => p.id === invoice.user_id) || {};
        showInvoiceModal(invoice, user);
      });
    });

    // Resend invoice/receipt
    document.querySelectorAll(".emailInvoiceBtn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const invoice = invoices.find(i => i.id === btn.dataset.id);
        const user = profiles.find(p => p.id === invoice.user_id) || {};
        if (user?.email) {
          await sendInvoiceEmail(user.email, invoice, user);
        } else {
          toastr.error("User email not found.");
        }
      });
    });

    // Download invoice
    document.querySelectorAll(".downloadInvoiceBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        const invoice = invoices.find(i => i.id === btn.dataset.id);
        const user = profiles.find(p => p.id === invoice.user_id) || {};
        exportInvoice(invoice, user);
      });
    });

    // Admin direct email form (send to any email)
    document.getElementById("adminSendEmailForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("adminEmailTo").value.trim();
      const title = document.getElementById("adminEmailTitle").value.trim();
      const message = document.getElementById("adminEmailMessage").value.trim();
      if (!email || !title || !message) {
        toastr.error("Please fill all fields.");
        return;
      }
      await sendNotificationEmail(email, title, message);
      document.getElementById("adminEmailTo").value = "";
      document.getElementById("adminEmailTitle").value = "";
      document.getElementById("adminEmailMessage").value = "";
    });
  }

  // Render main UI
  async function renderMain() {
    showSpinner();
    const { notifications, invoices, profiles } = await fetchAll();
    hideSpinner();
    const html = `
      <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex">
        ${navbarHtml}
        <div class="flex-1 ml-0 sm:ml-64 h-screen overflow-y-auto transition-all duration-300">
          <main class="p-4 md:p-8 max-w-5xl mx-auto animate-fadeIn">
            ${renderNotifications(notifications, profiles)}
            ${renderInvoices(invoices, profiles)}
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
    mainEvents(notifications, invoices, profiles);
  }

  return { html: "", pageEvents: async () => await renderMain() }
};

export default notifications;