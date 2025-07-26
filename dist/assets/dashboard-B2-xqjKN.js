import{r as C}from"./reset-W7AGB0Zm.js";import{c as $,n as k}from"./navbar-CHt86diH.js";import{s as l}from"./supabaseClient-CMz3Pz_I.js";import{C as x}from"./auto-C8LTT2Eg.js";import{d as w}from"./dayjs.min-Cbbdfn5l.js";import{s as I}from"./logo-BSIuJKwo.js";import"./auth-CiIyiIsG.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";const D="/assets/package-icon-BiKLcOQy.png",d=s=>{const i=Number(s);return isNaN(i)?0:i};function v(s){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2}).format(d(s))}async function Y(){try{const[s,i,u,a,p]=await Promise.all([l.from("profiles").select("id",{count:"exact",head:!0}),l.from("shipments").select("id",{count:"exact",head:!0}),l.from("payments").select("id",{count:"exact",head:!0}),l.from("shipments").select("id, tracking_code, status, cost, created_at, image_url, receiver_name, origin, destination").order("created_at",{ascending:!1}),l.from("payments").select("id, amount, status, created_at, method, type").order("created_at",{ascending:!1})]),h=s?.count??0,t=i?.count??0,o=u?.count??0,r=a?.data??[],n=p?.data??[],f={};let y=0;r.forEach(e=>{f[e.status]=(f[e.status]||0)+1,e.status==="processing"&&e.cost!==null&&e.cost!==void 0&&(y+=d(e.cost))});const g={};return n.forEach(e=>{g[e.status]=(g[e.status]||0)+1}),{userCount:h,shipmentCount:t,paymentCount:o,pendingAmount:y,recentShipments:r.slice(0,5).map(e=>({...e,cost:d(e.cost)})),recentPayments:n.slice(0,5).map(e=>({...e,amount:d(e.amount)})),analytics:{shipments:Object.entries(f).map(([e,b])=>({status:e,count:b})),payments:Object.entries(g).map(([e,b])=>({status:e,count:b}))}}}catch(s){return console.error("Dashboard data fetch error:",s),{userCount:0,shipmentCount:0,paymentCount:0,pendingAmount:0,recentShipments:[],recentPayments:[],analytics:{shipments:[],payments:[]}}}}let c=null,m=null;function _(){c&&(c.destroy(),c=null),m&&(m.destroy(),m=null)}const B=async()=>{const s=$();if(!s)return;C("Admin Dashboard");const{html:i,pageEvents:u}=k(),a=await Y(),p=`
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex">
      ${i}
      <div class="flex-1 ml-0 sm:ml-64 h-screen overflow-y-auto transition-all duration-300">
        <main class="p-4 md:p-8 max-w-7xl mx-auto animate-fadeIn">
          <div class="flex items-center justify-between mb-8 animate-slideDown">
            <div class="flex items-center space-x-4">
              <img src="${I}" alt="Profile" class="w-12 h-12 rounded-full bg-white p-1">
              <div>
                <h1 class="text-3xl font-bold text-white">Welcome back, ${s.user?.full_name||"Admin"}</h1>
                <p class="text-blue-300">Manage your logistics operations</p>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            ${[{icon:"users",label:"Total Users",value:a.userCount,color:"blue"},{icon:"truck",label:"Shipments",value:a.shipmentCount,color:"green"},{icon:"credit-card",label:"Payments",value:a.paymentCount,color:"purple"},{icon:"clock",label:"Pending Amount",value:v(a.pendingAmount),color:"yellow"}].map((t,o)=>`
              <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 transform transition-all duration-300 hover:scale-105 animate-slideIn" 
                   style="animation-delay: ${o*100}ms">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-${t.color}-400 text-sm font-medium">${t.label}</p>
                    <p class="text-2xl font-bold text-white mt-2">${t.value}</p>
                  </div>
                  <div class="bg-${t.color}-500/20 p-3 rounded-lg">
                    <i class="fa fa-${t.icon} text-${t.color}-400 text-xl"></i>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 animate-slideIn"
                 style="animation-delay: 400ms">
              <h3 class="text-lg font-bold text-white mb-4">Shipment Status</h3>
              <div style="height:300px"><canvas id="shipmentsChart"></canvas></div>
            </div>
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 animate-slideIn"
                 style="animation-delay: 500ms">
              <h3 class="text-lg font-bold text-white mb-4">Payment Status</h3>
              <div style="height:300px"><canvas id="paymentsChart"></canvas></div>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 animate-slideIn"
                 style="animation-delay: 600ms">
              <h3 class="text-lg font-bold text-white mb-4">Recent Shipments</h3>
              <div class="space-y-4">
                ${a.recentShipments.map(t=>`
                  <div class="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                    <img src="${t.image_url||D}" 
                         alt="Package" class="w-12 h-12 rounded-lg object-cover">
                    <div class="flex-1">
                      <div class="text-white font-medium">${t.tracking_code}</div>
                      <div class="text-sm text-gray-400">${w(t.created_at).format("MMM D, YYYY")}</div>
                      <div class="text-blue-400 font-medium">${v(t.cost)}</div>
                    </div>
                    <span class="px-3 py-1 rounded-full text-xs font-medium
                      ${t.status==="delivered"?"bg-green-500/20 text-green-400":t.status==="in-transit"?"bg-blue-500/20 text-blue-400":"bg-yellow-500/20 text-yellow-400"}">
                      ${t.status}
                    </span>
                  </div>
                `).join("")}
              </div>
            </div>
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 animate-slideIn"
                 style="animation-delay: 700ms">
              <h3 class="text-lg font-bold text-white mb-4">Recent Payments</h3>
              <div class="space-y-4">
                ${a.recentPayments.map(t=>`
                  <div class="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                    <div class="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <i class="fa fa-credit-card text-purple-400 text-xl"></i>
                    </div>
                    <div class="flex-1">
                      <div class="text-white font-medium">${v(t.amount)}</div>
                      <div class="text-sm text-gray-400">${w(t.created_at).format("MMM D, YYYY")}</div>
                      <div class="text-purple-400 font-medium">${t.method||"Card"}</div>
                    </div>
                    <span class="px-3 py-1 rounded-full text-xs font-medium
                      ${t.status==="paid"?"bg-green-500/20 text-green-400":t.status==="pending"?"bg-yellow-500/20 text-yellow-400":"bg-red-500/20 text-red-400"}">
                      ${t.status}
                    </span>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <style>
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideIn {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes slideDown {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
      .animate-slideIn { animation: slideIn 0.5s ease-out forwards; }
      .animate-slideDown { animation: slideDown 0.5s ease-out; }
      /* Prevent main content from scrolling the sidebar */
      #admin-sidebar { position: fixed; left: 0; top: 0; height: 100vh; }
      @media (max-width: 640px) {
        #admin-sidebar { width: 100vw; }
        .sm\\:ml-64, .ml-64 { margin-left: 0 !important; }
      }
    </style>
  `;function h(){u(),_();const t={shipments:["#22c55e","#3b82f6","#eab308","#ef4444"],payments:["#22c55e","#eab308","#ef4444"]},o=document.getElementById("shipmentsChart");a.analytics.shipments.length&&o&&(c=new x(o,{type:"doughnut",data:{labels:a.analytics.shipments.map(n=>n.status),datasets:[{data:a.analytics.shipments.map(n=>n.count),backgroundColor:t.shipments}]},options:{plugins:{legend:{position:"bottom",labels:{color:"white"}}},responsive:!0,maintainAspectRatio:!1}}));const r=document.getElementById("paymentsChart");a.analytics.payments.length&&r&&(m=new x(r,{type:"doughnut",data:{labels:a.analytics.payments.map(n=>n.status),datasets:[{data:a.analytics.payments.map(n=>n.count),backgroundColor:t.payments}]},options:{plugins:{legend:{position:"bottom",labels:{color:"white"}}},responsive:!0,maintainAspectRatio:!1}}))}return{html:p,pageEvents:h}};export{B as default};
//# sourceMappingURL=dashboard-B2-xqjKN.js.map
