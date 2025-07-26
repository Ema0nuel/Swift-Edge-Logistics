import{s as l}from"./supabaseClient-CMz3Pz_I.js";import{n as $}from"./navbar-CHt86diH.js";import{r as I}from"./reset-W7AGB0Zm.js";import{t as d}from"./toastr-ToYgTeRl.js";import{s as f}from"./send-email-D3sSQfLx.js";import{d as r}from"./dayjs.min-Cbbdfn5l.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";import"./auth-CiIyiIsG.js";const Y=async()=>{I("Notifications");const{html:g,pageEvents:v}=$();async function p(){const[{data:e},{data:a},{data:t}]=await Promise.all([l.from("notifications").select("*").order("created_at",{ascending:!1}),l.from("payments").select("*").order("created_at",{ascending:!1}),l.from("profiles").select("id, full_name, email, avatar_url")]);return{notifications:e||[],invoices:a||[],profiles:t||[]}}function b(e,a){return`
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4 text-white">User Notifications</h2>
        <div class="space-y-4">
          ${e.length?e.map(t=>{const i=a.find(o=>o.id===t.user_id)||{};return`
              <div class="bg-white rounded-lg shadow p-4 flex items-start gap-4">
                <img src="${i.avatar_url||"/src/images/avatar-default.png"}" class="w-10 h-10 rounded-full" alt="User" />
                <div class="flex-1">
                  <div class="flex justify-between items-center">
                    <span class="font-bold text-indigo-700">${i.full_name||"Unknown"}</span>
                    <span class="text-xs text-gray-400">${r(t.created_at).format("MMM D, HH:mm")}</span>
                  </div>
                  <div class="font-semibold text-lg text-gray-800">${t.title}</div>
                  <div class="text-gray-600 mb-2">${t.message}</div>
                  <div class="flex gap-2">
                    <button class="editNotifBtn px-3 py-1 rounded bg-yellow-500 text-white text-xs" data-id="${t.id}">Edit</button>
                    <button class="deleteNotifBtn px-3 py-1 rounded bg-red-500 text-white text-xs" data-id="${t.id}">Delete</button>
                    <button class="emailNotifBtn px-3 py-1 rounded bg-blue-600 text-white text-xs" data-id="${t.id}" data-email="${i.email}">Send Email</button>
                  </div>
                </div>
              </div>
            `}).join(""):'<div class="text-gray-400">No notifications found.</div>'}
        </div>
      </div>
      <div class="mb-8">
        <h2 class="text-xl font-bold mb-4 text-white">Send Direct Message to User</h2>
        <form id="adminSendEmailForm" class="flex flex-col md:flex-row gap-4 items-center">
          <select id="adminUserSelect" class="input input-bordered py-2 px-4 rounded-lg" required>
            <option value="">Select User</option>
            ${a.map(t=>`<option value="${t.email}">${t.full_name||t.email}</option>`).join("")}
          </select>
          <input type="text" id="adminEmailTitle" placeholder="Subject" class="input input-bordered py-2 px-4 rounded-lg" required />
          <input type="text" id="adminEmailMessage" placeholder="Message" class="input input-bordered py-2 px-4 rounded-lg" required />
          <button type="submit" class="btn btn-primary py-2 px-6 font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white">Send</button>
        </form>
      </div>
    `}function x(e,a){return`
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4 text-white">Invoices & Receipts</h2>
        <div class="space-y-4">
          ${e.length?e.map(t=>{const i=a.find(o=>o.id===t.user_id)||{};return`
              <div class="bg-white rounded-lg shadow p-4 flex items-start gap-4">
                <img src="${i.avatar_url||"/src/images/avatar-default.png"}" class="w-10 h-10 rounded-full" alt="User" />
                <div class="flex-1">
                  <div class="flex justify-between items-center">
                    <span class="font-bold text-indigo-700">${i.full_name||"Unknown"}</span>
                    <span class="text-xs text-gray-400">${r(t.created_at).format("MMM D, YYYY")}</span>
                  </div>
                  <div class="font-semibold text-lg text-gray-800">Invoice #${t.id}</div>
                  <div class="text-gray-600 mb-2">Amount: $${t.amount} | Status: ${t.status} | Method: ${t.method}</div>
                  <div class="flex gap-2">
                    <button class="viewInvoiceBtn px-3 py-1 rounded bg-green-600 text-white text-xs" data-id="${t.id}">View</button>
                    <button class="emailInvoiceBtn px-3 py-1 rounded bg-blue-600 text-white text-xs" data-id="${t.id}" data-email="${i.email}">Resend Receipt</button>
                    <button class="downloadInvoiceBtn px-3 py-1 rounded bg-indigo-600 text-white text-xs" data-id="${t.id}">Download</button>
                  </div>
                </div>
              </div>
            `}).join(""):'<div class="text-gray-400">No invoices found.</div>'}
        </div>
      </div>
    `}async function c(){const{notifications:e,invoices:a,profiles:t}=await p(),i=`
      <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex">
        ${g}
        <div class="flex-1 ml-0 sm:ml-64 h-screen overflow-y-auto transition-all duration-300">
          <main class="p-4 md:p-8 max-w-5xl mx-auto animate-fadeIn">
            ${b(e,t)}
            ${x(a,t)}
          </main>
        </div>
      </div>
    `;document.querySelector("#app").innerHTML=i,E(e,a,t)}function y(e){const a=`
      <div id="editNotifModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-8 w-full max-w-md shadow-lg relative animate-slideIn">
          <button id="closeEditNotifModalBtn" class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl">×</button>
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Edit Notification</h2>
          <form id="editNotifForm" class="space-y-4">
            <input type="text" name="title" value="${e.title}" placeholder="Title" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
            <textarea name="message" placeholder="Message" class="input input-bordered w-full py-2 px-4 rounded-lg" required>${e.message}</textarea>
            <button type="submit" class="btn btn-primary w-full py-2 font-bold bg-gradient-to-r from-yellow-500 to-yellow-700 text-white">Update</button>
          </form>
        </div>
      </div>
    `;document.body.insertAdjacentHTML("beforeend",a),document.getElementById("closeEditNotifModalBtn")?.addEventListener("click",()=>{document.getElementById("editNotifModal")?.remove()}),document.getElementById("editNotifForm")?.addEventListener("submit",async t=>{t.preventDefault();const i=t.target,o=i.title.value.trim(),n=i.message.value.trim();await l.from("notifications").update({title:o,message:n}).eq("id",e.id),d.success("Notification updated!"),document.getElementById("editNotifModal")?.remove(),c()})}function h(e,a){const t=`
      <div id="viewInvoiceModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-8 w-full max-w-lg shadow-lg relative animate-slideIn">
          <button id="closeViewInvoiceModalBtn" class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl">×</button>
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Invoice Details</h2>
          <div class="mb-4">
            <strong>Invoice #${e.id}</strong><br/>
            <strong>User:</strong> ${a.full_name||"Unknown"}<br/>
            <strong>Email:</strong> ${a.email||"N/A"}<br/>
            <strong>Amount:</strong> $${e.amount}<br/>
            <strong>Status:</strong> ${e.status}<br/>
            <strong>Method:</strong> ${e.method}<br/>
            <strong>Date:</strong> ${r(e.created_at).format("MMM D, YYYY")}
          </div>
          <button id="downloadInvoiceBtnModal" class="btn btn-primary w-full py-2 font-bold bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">Download Invoice</button>
        </div>
      </div>
    `;document.body.insertAdjacentHTML("beforeend",t),document.getElementById("closeViewInvoiceModalBtn")?.addEventListener("click",()=>{document.getElementById("viewInvoiceModal")?.remove()}),document.getElementById("downloadInvoiceBtnModal")?.addEventListener("click",()=>{m(e,a)})}function m(e,a){const t=`
      <html>
      <head>
        <title>Invoice #${e.id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 2em; }
          .header { font-size: 2em; font-weight: bold; margin-bottom: 1em; }
          .section { margin-bottom: 1em; }
        </style>
      </head>
      <body>
        <div class="header">Swift Edge Logistics - Invoice</div>
        <div class="section"><strong>Invoice #:</strong> ${e.id}</div>
        <div class="section"><strong>User:</strong> ${a.full_name||"Unknown"}</div>
        <div class="section"><strong>Email:</strong> ${a.email||"N/A"}</div>
        <div class="section"><strong>Amount:</strong> $${e.amount}</div>
        <div class="section"><strong>Status:</strong> ${e.status}</div>
        <div class="section"><strong>Method:</strong> ${e.method}</div>
        <div class="section"><strong>Date:</strong> ${r(e.created_at).format("MMM D, YYYY")}</div>
      </body>
      </html>
    `,i=new Blob([t],{type:"text/html"}),o=URL.createObjectURL(i),n=document.createElement("a");n.href=o,n.download=`Invoice_${e.id}.html`,document.body.appendChild(n),n.click(),setTimeout(()=>{n.remove(),URL.revokeObjectURL(o)},1e3)}async function u(e,a,t){try{await f({to:e,subject:a,html:`<h2>${a}</h2><p>${t}</p>`}),d.success("Email sent to user!")}catch{d.error("Failed to send email.")}}async function w(e,a,t){try{await f({to:e,subject:"Your Invoice from Swift Edge Logistics",html:`
          <h2>Invoice #${a.id}</h2>
          <p>Dear ${t.full_name||"Customer"},</p>
          <p>Thank you for your payment. Here is your receipt:</p>
          <ul>
            <li><strong>Amount:</strong> $${a.amount}</li>
            <li><strong>Status:</strong> ${a.status}</li>
            <li><strong>Method:</strong> ${a.method}</li>
            <li><strong>Date:</strong> ${r(a.created_at).format("MMM D, YYYY")}</li>
          </ul>
          <p>Swift Edge Logistics Team</p>
        `}),d.success("Receipt sent to customer!")}catch{d.error("Failed to send receipt.")}}function E(e,a,t){v(),document.querySelectorAll(".editNotifBtn").forEach(i=>{i.addEventListener("click",()=>{const o=e.find(n=>n.id===i.dataset.id);y(o)})}),document.querySelectorAll(".deleteNotifBtn").forEach(i=>{i.addEventListener("click",async()=>{await l.from("notifications").delete().eq("id",i.dataset.id),d.success("Notification deleted!"),c()})}),document.querySelectorAll(".emailNotifBtn").forEach(i=>{i.addEventListener("click",async()=>{const o=e.find(s=>s.id===i.dataset.id),n=t.find(s=>s.id===o.user_id);n?.email?await u(n.email,o.title,o.message):d.error("User email not found.")})}),document.querySelectorAll(".viewInvoiceBtn").forEach(i=>{i.addEventListener("click",()=>{const o=a.find(s=>s.id===i.dataset.id),n=t.find(s=>s.id===o.user_id)||{};h(o,n)})}),document.querySelectorAll(".emailInvoiceBtn").forEach(i=>{i.addEventListener("click",async()=>{const o=a.find(s=>s.id===i.dataset.id),n=t.find(s=>s.id===o.user_id)||{};n?.email?await w(n.email,o,n):d.error("User email not found.")})}),document.querySelectorAll(".downloadInvoiceBtn").forEach(i=>{i.addEventListener("click",()=>{const o=a.find(s=>s.id===i.dataset.id),n=t.find(s=>s.id===o.user_id)||{};m(o,n)})}),document.getElementById("adminSendEmailForm")?.addEventListener("submit",async i=>{i.preventDefault();const o=document.getElementById("adminUserSelect").value,n=document.getElementById("adminEmailTitle").value.trim(),s=document.getElementById("adminEmailMessage").value.trim();if(!o||!n||!s){d.error("Please fill all fields.");return}await u(o,n,s),document.getElementById("adminEmailTitle").value="",document.getElementById("adminEmailMessage").value=""})}return{html:"",pageEvents:async()=>await c()}};export{Y as default};
//# sourceMappingURL=notifications-CEq2u5DG.js.map
