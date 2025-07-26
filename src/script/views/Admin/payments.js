import { supabase } from "../../utils/supabaseClient";
import Navbar from "./components/navbar.js";
import { reset } from "../../utils/reset.js";
import dayjs from "dayjs";
import toastr from "../../utils/toastr";
import { sendEmail } from "../../utils/send-email";
import Chart from "chart.js/auto";

// Spinner utility
function showSpinner() {
  const spinner = document.createElement("div");
  spinner.id = "spinnerOverlay";
  spinner.innerHTML = `
    <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div class="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  `;
  document.body.appendChild(spinner);
}
function hideSpinner() {
  document.getElementById("spinnerOverlay")?.remove();
}

// Fetch all payments
async function fetchPayments(status = "") {
  let query = supabase
    .from("payments")
    .select("*")
    .order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);
  const { data, error } = await query;
  if (error) return [];
  return data || [];
}

// Fetch user full_name from profiles
async function fetchUserFullName(user_id) {
  const { data, error } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user_id)
    .single();
  return data?.full_name || "";
}

// Fetch user email from auth.users
async function fetchUserEmail(user_id) {
  const { data, error } = await supabase.auth.admin.getUserById(user_id);
  if (error || !data?.user?.email) return "";
  return data.user.email;
}

// Approve payment
async function approvePayment(paymentId, referenceId) {
  showSpinner();
  await supabase.from("payments").update({ status: "paid" }).eq("id", paymentId);
  await supabase.from("shipments").update({ status: "approved" }).eq("id", referenceId);
  hideSpinner();
  toastr.success("Payment approved and shipment status updated!");
}

// Send payment email
async function sendPaymentEmail(to, subject, html) {
  showSpinner();
  try {
    await sendEmail({ to, subject, html });
    toastr.success("Email sent!");
  } catch (err) {
    toastr.error("Failed to send email.");
  }
  hideSpinner();
}

// Calculate total cost from shipments
async function calculateTotalCost(shipmentIds) {
  const { data: shipments } = await supabase
    .from('shipments')
    .select('cost')
    .in('id', shipmentIds);
  return shipments?.reduce((sum, s) => sum + (s.cost || 0), 0) || 0;
}

// Generate invoice PDF
function generateInvoice(payment, shipments = []) {
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.text('INVOICE', 105, 20, { align: 'center' });
  doc.setFontSize(12);
  doc.text(`Invoice #: ${payment.id}`, 20, 40);
  doc.text(`Date: ${dayjs(payment.created_at).format('MMM D, YYYY')}`, 20, 50);
  doc.text(`Status: ${payment.status}`, 20, 60);
  let y = 80;
  shipments.forEach(s => {
    doc.text(`Shipment: ${s.tracking_code}`, 20, y);
    doc.text(`$${s.cost}`, 180, y);
    y += 10;
  });
  doc.text(`Total Amount: $${payment.amount}`, 180, y + 20);
  return doc;
}

// Process refund
async function processRefund(paymentId) {
  // Update payment status
  await supabase
    .from('payments')
    .update({ status: 'refunded' })
    .eq('id', paymentId);
  // Create refund record
  const { data: payment } = await supabase
    .from('payments')
    .select('*')
    .eq('id', paymentId)
    .single();
  if (payment) {
    await supabase
      .from('payments')
      .insert([{
        user_id: payment.user_id,
        type: 'refund',
        reference_id: paymentId,
        amount: -payment.amount,
        method: payment.method,
        status: 'paid'
      }]);
  }
}

// Send payment receipt
async function sendReceipt(payment, userEmail) {
  const doc = generateInvoice(payment);
  const pdfBase64 = doc.output('datauristring');
  await sendEmail({
    to: userEmail,
    subject: `Payment Receipt - ${payment.id}`,
    html: `
      <h2>Payment Receipt</h2>
      <p>Amount: $${payment.amount}</p>
      <p>Status: ${payment.status}</p>
      <p>Date: ${dayjs(payment.created_at).format('MMM D, YYYY')}</p>
    `,
    attachments: [{
      filename: 'receipt.pdf',
      content: pdfBase64
    }]
  });
}

// Real-time payment tracking
supabase
  .channel('payments')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'payments' },
    payload => {
      const payment = payload.new;
      if (typeof updatePaymentUI === 'function') {
        updatePaymentUI(payment);
      }
      // Send notifications
      if (payment.status === 'paid') {
        sendReceipt(payment, payment.user_email);
      }
    }
  )
  .subscribe();

// Render main payments view
const payments = async () => {
  reset("Billing & Payments");
  const { html: navbarHtml, pageEvents: navbarEvents } = Navbar();

  let paymentsList = await fetchPayments();

  async function renderMain() {
    // Fetch full_name and email for each payment
    for (let p of paymentsList) {
      p.full_name = await fetchUserFullName(p.user_id);
      p.email = await fetchUserEmail(p.user_id);
    }
    const html = `
      <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex">
        ${navbarHtml}
        <div class="flex-1 ml-0 sm:ml-64 h-screen overflow-y-auto transition-all duration-300">
          <main class="p-4 md:p-8 max-w-7xl mx-auto animate-fadeIn">
            <div class="flex items-center justify-between mb-8 animate-slideDown">
              <h1 class="text-3xl font-bold text-white">💸 Billing & Payments</h1>
            </div>
            <div class="mb-6 flex gap-4">
              <select id="statusFilter" class="input input-bordered max-w-xs py-2 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all">
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
              </select>
              <input type="text" id="searchInput" class="input input-bordered max-w-xs py-2 px-4 rounded-lg" placeholder="Search by reference ID..." />
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full bg-white/10 rounded-xl border border-white/20 text-white shadow-lg">
                <thead>
                  <tr>
                    <th class="px-4 py-2">Reference</th>
                    <th class="px-4 py-2">User</th>
                    <th class="px-4 py-2">Amount</th>
                    <th class="px-4 py-2">Method</th>
                    <th class="px-4 py-2">Status</th>
                    <th class="px-4 py-2">Created</th>
                    <th class="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody id="paymentsTableBody">
                  ${paymentsList.map(p => `
                    <tr class="hover:bg-white/20 transition-all cursor-pointer" data-payment-id="${p.id}" data-reference-id="${p.reference_id}">
                      <td class="px-4 py-2 font-bold">${p.reference_id}</td>
                      <td class="px-4 py-2">${p.full_name}</td>
                      <td class="px-4 py-2">$${p.amount}</td>
                      <td class="px-4 py-2">${p.method}</td>
                      <td class="px-4 py-2">
                        <span class="px-2 py-1 rounded-full text-xs font-medium
                          ${p.status === "paid" ? "bg-green-500/20 text-green-400" :
                          p.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                          "bg-red-500/20 text-red-400"}">
                          ${p.status}
                        </span>
                      </td>
                      <td class="px-4 py-2">${dayjs(p.created_at).format("MMM D, YYYY")}</td>
                      <td class="px-4 py-2">
                        <button class="approvePaymentBtn px-2 py-1 rounded bg-green-600 text-white mr-2 transition-all hover:bg-green-700" title="Approve">Approve</button>
                        <button class="sendEmailBtn px-2 py-1 rounded bg-blue-600 text-white transition-all hover:bg-blue-700" title="Send Email">Send Email</button>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
      <style>
        #admin-sidebar { position: fixed; left: 0; top: 0; height: 100vh; }
        @media (max-width: 640px) {
          #admin-sidebar { width: 100vw; }
          .sm\\:ml-64, .ml-64 { margin-left: 0 !important; }
        }
        .animate-slideIn { animation: slideIn 0.4s cubic-bezier(.4,0,.2,1); }
        @keyframes slideIn {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      </style>
    `;
    document.querySelector("#app").innerHTML = html;
    mainEvents();
  }

  // Main table events
  function mainEvents() {
    navbarEvents();

    // Filter by status
    document.getElementById("statusFilter")?.addEventListener("change", async (e) => {
      const status = e.target.value;
      paymentsList = await fetchPayments(status);
      renderMain();
    });

    // Search by reference ID
    document.getElementById("searchInput")?.addEventListener("input", async (e) => {
      const search = e.target.value.trim().toUpperCase();
      if (!search) {
        paymentsList = await fetchPayments();
      } else {
        paymentsList = paymentsList.filter(p => (p.reference_id || "").toUpperCase().includes(search));
      }
      renderMain();
    });

    // Row actions
    document.querySelectorAll("#paymentsTableBody tr").forEach(row => {
      const paymentId = row.getAttribute("data-payment-id");
      const referenceId = row.getAttribute("data-reference-id");
      row.querySelector(".approvePaymentBtn")?.addEventListener("click", async (e) => {
        e.stopPropagation();
        await approvePayment(paymentId, referenceId);
        paymentsList = await fetchPayments();
        renderMain();
      });
      row.querySelector(".sendEmailBtn")?.addEventListener("click", async (e) => {
        e.stopPropagation();
        // Build modal for email
        const payment = paymentsList.find(p => p.id === paymentId);
        renderEmailModal(payment.email);
      });
    });
  }

  // Email modal
  function renderEmailModal(userEmail) {
    const modalHtml = `
      <div id="emailModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-8 w-full max-w-md shadow-lg relative animate-slideIn">
          <button id="closeEmailModalBtn" class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl">×</button>
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Send Email</h2>
          <form id="sendEmailForm" class="space-y-4">
            <input type="text" name="subject" placeholder="Email Subject" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
            <textarea name="html" placeholder="Email HTML Content" class="input input-bordered w-full py-2 px-4 rounded-lg" rows="6" required></textarea>
            <button type="submit" class="btn btn-primary w-full py-2 font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white">Send Email</button>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHtml);

    document.getElementById("closeEmailModalBtn")?.addEventListener("click", () => {
      document.getElementById("emailModal")?.remove();
    });

    document.getElementById("sendEmailForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      const subject = form.subject.value.trim();
      const html = form.html.value.trim();
      if (subject && html && userEmail) {
        await sendPaymentEmail(userEmail, subject, html);
        document.getElementById("emailModal")?.remove();
      }
    });
  }

  // Return dummy for router compatibility
  return {
    html: "",
    pageEvents: () => {
      renderMain();
    }
  };
};

export default payments;