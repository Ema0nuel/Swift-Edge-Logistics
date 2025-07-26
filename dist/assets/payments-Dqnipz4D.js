import{s as d}from"./supabaseClient-CMz3Pz_I.js";import{n as g}from"./navbar-CHt86diH.js";import{r as v}from"./reset-W7AGB0Zm.js";import{d as f}from"./dayjs.min-Cbbdfn5l.js";import{t as p}from"./toastr-ToYgTeRl.js";import{s as y}from"./send-email-D3sSQfLx.js";import"./auto-C8LTT2Eg.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";import"./auth-CiIyiIsG.js";function b(){const t=document.createElement("div");t.id="spinnerOverlay",t.innerHTML=`
    <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div class="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  `,document.body.appendChild(t)}function h(){document.getElementById("spinnerOverlay")?.remove()}async function u(t=""){let n=d.from("payments").select("*").order("created_at",{ascending:!1});t&&(n=n.eq("status",t));const{data:e,error:i}=await n;return i?[]:e||[]}async function w(t){const{data:n,error:e}=await d.from("profiles").select("full_name").eq("id",t).single();return n?.full_name||""}async function E(t){const{data:n,error:e}=await d.auth.admin.getUserById(t);return e||!n?.user?.email?"":n.user.email}async function $(t,n){b(),await d.from("payments").update({status:"paid"}).eq("id",t),await d.from("shipments").update({status:"approved"}).eq("id",n),h(),p.success("Payment approved and shipment status updated!")}async function I(t,n,e){b();try{await y({to:t,subject:n,html:e}),p.success("Email sent!")}catch{p.error("Failed to send email.")}h()}function M(t,n=[]){const e=new jsPDF;e.setFontSize(20),e.text("INVOICE",105,20,{align:"center"}),e.setFontSize(12),e.text(`Invoice #: ${t.id}`,20,40),e.text(`Date: ${f(t.created_at).format("MMM D, YYYY")}`,20,50),e.text(`Status: ${t.status}`,20,60);let i=80;return n.forEach(l=>{e.text(`Shipment: ${l.tracking_code}`,20,i),e.text(`$${l.cost}`,180,i),i+=10}),e.text(`Total Amount: $${t.amount}`,180,i+20),e}async function S(t,n){M(t).output("datauristring"),await y({to:n,subject:`Payment Receipt - ${t.id}`,html:`
      <h2>Payment Receipt</h2>
      <p>Amount: $${t.amount}</p>
      <p>Status: ${t.status}</p>
      <p>Date: ${f(t.created_at).format("MMM D, YYYY")}</p>
    `})}d.channel("payments").on("postgres_changes",{event:"*",schema:"public",table:"payments"},t=>{const n=t.new;typeof updatePaymentUI=="function"&&updatePaymentUI(n),n.status==="paid"&&S(n,n.user_email)}).subscribe();const D=async()=>{v("Billing & Payments");const{html:t,pageEvents:n}=g();let e=await u();async function i(){for(let a of e)a.full_name=await w(a.user_id),a.email=await E(a.user_id);const s=`
      <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex">
        ${t}
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
                  ${e.map(a=>`
                    <tr class="hover:bg-white/20 transition-all cursor-pointer" data-payment-id="${a.id}" data-reference-id="${a.reference_id}">
                      <td class="px-4 py-2 font-bold">${a.reference_id}</td>
                      <td class="px-4 py-2">${a.full_name}</td>
                      <td class="px-4 py-2">$${a.amount}</td>
                      <td class="px-4 py-2">${a.method}</td>
                      <td class="px-4 py-2">
                        <span class="px-2 py-1 rounded-full text-xs font-medium
                          ${a.status==="paid"?"bg-green-500/20 text-green-400":a.status==="pending"?"bg-yellow-500/20 text-yellow-400":"bg-red-500/20 text-red-400"}">
                          ${a.status}
                        </span>
                      </td>
                      <td class="px-4 py-2">${f(a.created_at).format("MMM D, YYYY")}</td>
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
    `;document.querySelector("#app").innerHTML=s,l()}function l(){n(),document.getElementById("statusFilter")?.addEventListener("change",async s=>{const a=s.target.value;e=await u(a),i()}),document.getElementById("searchInput")?.addEventListener("input",async s=>{const a=s.target.value.trim().toUpperCase();a?e=e.filter(r=>(r.reference_id||"").toUpperCase().includes(a)):e=await u(),i()}),document.querySelectorAll("#paymentsTableBody tr").forEach(s=>{const a=s.getAttribute("data-payment-id"),r=s.getAttribute("data-reference-id");s.querySelector(".approvePaymentBtn")?.addEventListener("click",async o=>{o.stopPropagation(),await $(a,r),e=await u(),i()}),s.querySelector(".sendEmailBtn")?.addEventListener("click",async o=>{o.stopPropagation();const c=e.find(m=>m.id===a);x(c.email)})})}function x(s){document.body.insertAdjacentHTML("beforeend",`
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
    `),document.getElementById("closeEmailModalBtn")?.addEventListener("click",()=>{document.getElementById("emailModal")?.remove()}),document.getElementById("sendEmailForm")?.addEventListener("submit",async r=>{r.preventDefault();const o=r.target,c=o.subject.value.trim(),m=o.html.value.trim();c&&m&&s&&(await I(s,c,m),document.getElementById("emailModal")?.remove())})}return{html:"",pageEvents:()=>{i()}}};export{D as default};
//# sourceMappingURL=payments-Dqnipz4D.js.map
