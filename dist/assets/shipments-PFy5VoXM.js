import{s as b}from"./supabaseClient-CMz3Pz_I.js";import{n as q}from"./navbar-CHt86diH.js";import{r as C}from"./reset-W7AGB0Zm.js";import{d as w}from"./dayjs.min-Cbbdfn5l.js";import{t as h}from"./toastr-ToYgTeRl.js";import{t as k,M as P,V as j,T as F,O as H,F as _,L as N,S as L,a as A,b as M,c as $,P as O,I as R,d as U}from"./Vector-DaKR1H9i.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";import"./auth-CiIyiIsG.js";async function Y(i){const a=`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(i)}`,n=await(await fetch(a)).json();return n.length>0?[parseFloat(n[0].lat),parseFloat(n[0].lon)]:null}function m(){if(document.getElementById("spinnerOverlay"))return;const i=document.createElement("div");i.id="spinnerOverlay",i.innerHTML=`
    <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div class="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  `,document.body.appendChild(i)}function g(){document.getElementById("spinnerOverlay")?.remove()}async function u(i=""){let a=b.from("shipments").select("*").order("created_at",{ascending:!1});i&&(a=a.eq("status",i));const{data:e,error:n}=await a;return n?(h.error("Failed to fetch shipments: "+n.message),[]):e||[]}async function E(i){m();const{data:a,error:e}=await b.from("shipments").select("*").eq("id",i).single(),{data:n}=await b.from("tracking_updates").select("*").eq("shipment_id",i).order("updated_at",{ascending:!0});return g(),{shipment:a,updates:n||[]}}async function G(i){m();const a=Object.fromEntries(new FormData(i)),e="TRK"+Date.now(),{error:n}=await b.from("shipments").insert([{sender_id:a.sender_id,receiver_name:a.receiver_name,receiver_address:a.receiver_address,receiver_phone:a.receiver_phone,origin:a.origin,destination:a.destination,package_description:a.package_description,weight:Number(a.weight)||null,cost:Number(a.cost)||null,status:"processing",tracking_code:e,image_url:a.image_url||""}]);return g(),n?(h.error(n.message||"Failed to create shipment."),!1):(h.success("Shipment created!"),!0)}async function z(i,a){m();const e=Object.fromEntries(new FormData(i)),n={};e.receiver_name&&(n.receiver_name=e.receiver_name),e.receiver_address&&(n.receiver_address=e.receiver_address),e.receiver_phone&&(n.receiver_phone=e.receiver_phone),e.origin&&(n.origin=e.origin),e.destination&&(n.destination=e.destination),e.package_description&&(n.package_description=e.package_description),e.weight!==""&&(n.weight=Number(e.weight)),e.cost!==""&&(n.cost=Number(e.cost)),e.image_url&&(n.image_url=e.image_url);const{error:p}=await b.from("shipments").update(n).eq("id",a);return g(),p?(h.error(p.message||"Failed to update shipment."),!1):(h.success("Shipment updated!"),!0)}async function B(i,a,e,n){m(),await b.from("tracking_updates").insert([{shipment_id:i,location:a,status:e,note:n}]),g(),h.success("Live tracking updated!")}const S=[40.7127281,-74.0060152];function V(i){let[a,e]=i.split(",").map(Number);return[a,e]}function T(i,a){const e=[S,...a.map(l=>V(l.location)).filter(([l,d])=>!isNaN(l)&&!isNaN(d))],n=e.length>1?e[e.length-1]:S,p=k([n[1],n[0]],"EPSG:4326","EPSG:3857");document.getElementById(i).innerHTML="";const v=new P({target:i,layers:[new F({source:new H})],view:new j({center:p,zoom:10})});if(e.length>1){const l=e.map(([r,o])=>k([o,r],"EPSG:4326","EPSG:3857")),d=new _({geometry:new N(l)});d.setStyle(new L({stroke:new A({color:"#4285f4",width:3})}));const s=new M({features:[d]}),t=new $({source:s});v.addLayer(t)}if(e.forEach((l,d)=>{const s=new _({geometry:new O(k([l[1],l[0]],"EPSG:4326","EPSG:3857"))});s.setStyle(new L({image:new R({src:d===0?"https://cdn-icons-png.flaticon.com/512/684/684908.png":"https://cdn.jsdelivr.net/npm/ol@v7.4.0/examples/data/icon.png",scale:.1,anchor:[.5,1]})}));const t=new M({features:[s]}),r=new $({source:t});v.addLayer(r)}),e.length>1){const l=[Math.min(...e.map(d=>d[1])),Math.min(...e.map(d=>d[0])),Math.max(...e.map(d=>d[1])),Math.max(...e.map(d=>d[0]))];v.getView().fit(U(l,"EPSG:4326","EPSG:3857"),{padding:[40,40,40,40]})}}const ne=async()=>{C("Delivery Management");const{html:i,pageEvents:a}=q();let e=await u();function n(){const s=`
      <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex">
        ${i}
        <div class="flex-1 ml-0 sm:ml-64 h-screen overflow-y-auto transition-all duration-300">
          <main class="p-4 md:p-8 max-w-7xl mx-auto animate-fadeIn">
            <div class="flex items-center justify-between mb-8 animate-slideDown">
              <h1 class="text-3xl font-bold text-white">🚚 Delivery Management</h1>
              <button id="createShipmentBtn" class="px-4 py-2 rounded bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:scale-105 transition-all">
                Create Shipment
              </button>
            </div>
            <div class="mb-6 flex gap-4">
              <select id="statusFilter" class="input input-bordered max-w-xs py-2 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all">
                <option value="">All Status</option>
                <option value="processing">Processing</option>
                <option value="approved">Approved</option>
                <option value="in-transit">In-Transit</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <input type="text" id="searchInput" class="input input-bordered max-w-xs py-2 px-4 rounded-lg" placeholder="Search by tracking code..." />
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full bg-white/10 rounded-xl border border-white/20 text-white shadow-lg">
                <thead>
                  <tr>
                    <th class="px-4 py-2">Tracking</th>
                    <th class="px-4 py-2">Receiver</th>
                    <th class="px-4 py-2">Status</th>
                    <th class="px-4 py-2">Location</th>
                    <th class="px-4 py-2">Cost</th>
                    <th class="px-4 py-2">Created</th>
                    <th class="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody id="shipmentsTableBody">
                  ${e.map(t=>`
                    <tr class="hover:bg-white/20 transition-all cursor-pointer" data-shipment-id="${t.id}">
                      <td class="px-4 py-2 font-bold">${t.tracking_code}</td>
                      <td class="px-4 py-2">${t.receiver_name}</td>
                      <td class="px-4 py-2">
                        <span class="status-badge px-2 py-1 rounded-full text-xs font-medium
                          ${t.status==="delivered"?"bg-green-500/20 text-green-400":t.status==="in-transit"?"bg-blue-500/20 text-blue-400":t.status==="processing"?"bg-yellow-500/20 text-yellow-400":"bg-red-500/20 text-red-400"}">
                          ${t.status}
                        </span>
                      </td>
                      <td class="px-4 py-2">${t.destination}</td>
                      <td class="px-4 py-2">$${t.cost}</td>
                      <td class="px-4 py-2">${w(t.created_at).format("MMM D, YYYY")}</td>
                      <td class="px-4 py-2 flex gap-2">
                        <button class="detailsShipmentBtn px-2 py-1 rounded bg-blue-600 text-white transition-all hover:bg-blue-700" title="Details">Details</button>
                        <button class="editShipmentBtn px-2 py-1 rounded bg-yellow-600 text-white transition-all hover:bg-yellow-700" title="Edit">Edit</button>
                        <button class="approveShipmentBtn px-2 py-1 rounded bg-green-600 text-white transition-all hover:bg-green-700" title="Approve">Approve</button>
                        <button class="trackShipmentBtn px-2 py-1 rounded bg-purple-600 text-white transition-all hover:bg-purple-700" title="Track">Track</button>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
            <div id="createShipmentModal" class="fixed inset-0 bg-black/60 hidden items-center justify-center z-50 flex">
              <div class="bg-white rounded-xl p-8 w-full max-w-md shadow-lg relative animate-slideIn">
                <button id="closeModalBtn" class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl">×</button>
                <h2 class="text-2xl font-bold mb-4 text-gray-800">Create Shipment</h2>
                <form id="createShipmentForm" class="space-y-4">
                  <input type="text" name="sender_id" placeholder="Sender User ID" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
                  <input type="text" name="receiver_name" placeholder="Receiver Name" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
                  <input type="text" name="receiver_address" placeholder="Receiver Address" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
                  <input type="tel" name="receiver_phone" placeholder="Receiver Phone" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
                  <input type="text" name="origin" placeholder="Origin" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
                  <input type="text" name="destination" placeholder="Destination" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
                  <input type="text" name="package_description" placeholder="Package Description" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
                  <input type="number" name="weight" placeholder="Weight (kg)" class="input input-bordered w-full py-2 px-4 rounded-lg" />
                  <input type="number" name="cost" placeholder="Cost ($)" class="input input-bordered w-full py-2 px-4 rounded-lg" />
                  <input type="text" name="image_url" placeholder="Image URL" class="input input-bordered w-full py-2 px-4 rounded-lg" />
                  <button type="submit" class="btn btn-primary w-full py-2 font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white">Create Shipment</button>
                </form>
              </div>
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
    `;document.querySelector("#app").innerHTML=s,d()}async function p(s){m();const{shipment:t}=await E(s);g();const r=`
      <div id="editShipmentModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-8 w-full max-w-md shadow-lg relative animate-slideIn">
          <button id="closeEditModalBtn" class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl">×</button>
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Edit Shipment</h2>
          <form id="editShipmentForm" class="space-y-4">
            <input type="text" name="receiver_name" value="${t.receiver_name}" placeholder="Receiver Name" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
            <input type="text" name="receiver_address" value="${t.receiver_address}" placeholder="Receiver Address" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
            <input type="tel" name="receiver_phone" value="${t.receiver_phone}" placeholder="Receiver Phone" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
            <input type="text" name="origin" value="${t.origin}" placeholder="Origin" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
            <input type="text" name="destination" value="${t.destination}" placeholder="Destination" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
            <input type="text" name="package_description" value="${t.package_description}" placeholder="Package Description" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
            <input type="number" name="weight" value="${t.weight||""}" placeholder="Weight (kg)" class="input input-bordered w-full py-2 px-4 rounded-lg" />
            <input type="number" name="cost" value="${t.cost||""}" placeholder="Cost ($)" class="input input-bordered w-full py-2 px-4 rounded-lg" />
            <input type="text" name="image_url" value="${t.image_url||""}" placeholder="Image URL" class="input input-bordered w-full py-2 px-4 rounded-lg" />
            <button type="submit" class="btn btn-primary w-full py-2 font-bold bg-gradient-to-r from-yellow-500 to-yellow-700 text-white">Update Shipment</button>
          </form>
        </div>
      </div>
    `;document.body.insertAdjacentHTML("beforeend",r),document.getElementById("closeEditModalBtn")?.addEventListener("click",()=>{document.getElementById("editShipmentModal")?.remove()}),document.getElementById("editShipmentForm")?.addEventListener("submit",async o=>{o.preventDefault();const c=o.target;await z(c,s)&&(document.getElementById("editShipmentModal")?.remove(),e=await u(),n())})}async function v(s){m();const{shipment:t,updates:r}=await E(s);g();const o=`
      <div id="liveTrackingModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-8 w-full max-w-lg shadow-lg relative animate-slideIn">
          <button id="closeLiveTrackingModalBtn" class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl">×</button>
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Live Tracking - ${t.tracking_code}</h2>
          <div id="liveMapContainer" style="height: 300px;" class="mb-4 rounded-lg overflow-hidden"></div>
          <form id="liveTrackingForm" class="space-y-4">
            <input type="text" name="location" placeholder="Current Location (name or lat,lon)" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
            <select name="status" class="input input-bordered w-full py-2 px-4 rounded-lg" required>
              <option value="processing" ${t.status==="processing"?"selected":""}>Processing</option>
              <option value="in-transit" ${t.status==="in-transit"?"selected":""}>In-Transit</option>
              <option value="delivered" ${t.status==="delivered"?"selected":""}>Delivered</option>
              <option value="cancelled" ${t.status==="cancelled"?"selected":""}>Cancelled</option>
            </select>
            <input type="text" name="note" placeholder="Note (optional)" class="input input-bordered w-full py-2 px-4 rounded-lg" />
            <button type="submit" class="btn btn-primary w-full py-2 font-bold bg-gradient-to-r from-purple-600 to-purple-700 text-white">Update Tracking</button>
          </form>
          <div class="mt-6">
            <h3 class="text-lg font-bold mb-2 text-gray-800">Tracking History</h3>
            <div class="tracking-history overflow-y-auto max-h-32">
              ${r.length?r.map(c=>`
                <div class="p-2 rounded bg-gray-100 text-gray-800 flex justify-between items-center mb-1">
                  <span>${c.location}</span>
                  <span class="text-blue-600">${c.status}</span>
                  <span class="text-xs text-gray-400">${w(c.updated_at).format("MMM D, HH:mm")}</span>
                </div>
              `).join(""):"<div class='text-gray-400'>No updates.</div>"}
            </div>
          </div>
        </div>
      </div>
    `;document.body.insertAdjacentHTML("beforeend",o),setTimeout(()=>{T("liveMapContainer",r)},100),document.getElementById("closeLiveTrackingModalBtn")?.addEventListener("click",()=>{document.getElementById("liveTrackingModal")?.remove()}),document.getElementById("liveTrackingForm")?.addEventListener("submit",async c=>{c.preventDefault();const y=c.target;let f=y.location.value.trim(),x;if(!f.match(/^-?\d+\.\d+,-?\d+\.\d+$/)){if(x=await Y(f),!x){h.error("Location not found!");return}f=`${x[0]},${x[1]}`}const I=y.status.value,D=y.note.value.trim();await B(s,f,I,D),document.getElementById("liveTrackingModal")?.remove(),e=await u(),n()})}async function l(s){m();const{shipment:t,updates:r}=await E(s);g();const o=`
      <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex">
        ${i}
        <div class="flex-1 ml-0 sm:ml-64 h-screen overflow-y-auto transition-all duration-300">
          <main class="p-4 md:p-8 max-w-5xl mx-auto animate-fadeIn">
            <button id="backToShipments" class="mb-6 px-4 py-2 rounded bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow hover:scale-105 transition-all">
              Back to Shipments
            </button>
            <div class="flex items-center gap-6 mb-8">
              <img src="${t.image_url||"/src/images/package-icon.png"}" class="w-20 h-20 rounded-full border-4 border-blue-500 bg-white" alt="Package" />
              <div>
                <h2 class="text-2xl font-bold text-white">${t.receiver_name}</h2>
                <p class="text-blue-300">Tracking: ${t.tracking_code}</p>
                <p class="text-gray-400">Status: ${t.status}</p>
                <span class="ml-2 text-xs text-gray-400">Created: ${w(t.created_at).format("MMM D, YYYY")}</span>
              </div>
            </div>
            <div class="mb-8">
              <h3 class="text-lg font-bold text-white mb-4">Tracking Updates</h3>
              <div class="space-y-2">
                ${r.length?r.map(c=>`
                  <div class="p-3 rounded bg-white/5 text-white flex justify-between items-center">
                    <span>${c.location}</span>
                    <span class="text-blue-400">${c.status}</span>
                    <span class="text-xs text-gray-400">${w(c.updated_at).format("MMM D, HH:mm")}</span>
                  </div>
                `).join(""):"<div class='text-gray-400'>No updates.</div>"}
              </div>
            </div>
            <div id="detailsMapContainer" style="height: 300px;" class="mb-8 rounded-lg overflow-hidden"></div>
            <div class="flex gap-2">
              <button id="editShipmentBtnDetails" class="px-4 py-2 rounded bg-yellow-600 text-white font-bold shadow hover:bg-yellow-700 transition-all">
                Edit Shipment
              </button>
              <button id="trackLiveBtnDetails" class="px-4 py-2 rounded bg-purple-600 text-white font-bold shadow hover:bg-purple-700 transition-all">
                Live Tracking
              </button>
            </div>
          </main>
        </div>
      </div>
    `;document.querySelector("#app").innerHTML=o,setTimeout(()=>{T("detailsMapContainer",r)},100),document.getElementById("backToShipments")?.addEventListener("click",()=>{n()}),document.getElementById("editShipmentBtnDetails")?.addEventListener("click",()=>{p(s)}),document.getElementById("trackLiveBtnDetails")?.addEventListener("click",()=>{v(s)})}function d(){a(),document.getElementById("statusFilter")?.addEventListener("change",async t=>{const r=t.target.value;e=await u(r),n()}),document.getElementById("searchInput")?.addEventListener("input",async t=>{const r=t.target.value.trim().toUpperCase();r?e=e.filter(o=>(o.tracking_code||"").toUpperCase().includes(r)):e=await u(),n()}),document.querySelectorAll("#shipmentsTableBody tr").forEach(t=>{const r=t.getAttribute("data-shipment-id");t.querySelector(".detailsShipmentBtn")?.addEventListener("click",o=>{o.stopPropagation(),l(r)}),t.querySelector(".editShipmentBtn")?.addEventListener("click",o=>{o.stopPropagation(),p(r)}),t.querySelector(".approveShipmentBtn")?.addEventListener("click",async o=>{o.stopPropagation(),await B(r,`${S[0]},${S[1]}`,"approved","Approved by admin"),e=await u(),n()}),t.querySelector(".trackShipmentBtn")?.addEventListener("click",o=>{o.stopPropagation(),v(r)})});const s=document.getElementById("createShipmentModal");document.getElementById("createShipmentBtn")?.addEventListener("click",()=>{s.classList.remove("hidden")}),document.getElementById("closeModalBtn")?.addEventListener("click",()=>{s.classList.add("hidden")}),document.getElementById("createShipmentForm")?.addEventListener("submit",async t=>{t.preventDefault();const r=t.target;await G(r)&&(s.classList.add("hidden"),e=await u(),n())})}return n(),{html:"",pageEvents:()=>n()}};export{ne as default};
//# sourceMappingURL=shipments-PFy5VoXM.js.map
