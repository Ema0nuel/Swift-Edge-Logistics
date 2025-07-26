import{N as c}from"./navbar-ZPK2fscr.js";import{s as o}from"./supabaseClient-CMz3Pz_I.js";import{r as d}from"./reset-W7AGB0Zm.js";import"./logo-BSIuJKwo.js";import"./toastr-ToYgTeRl.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";async function m(){const{data:t,error:a}=await o.auth.getUser();return a||!t?.user?.id?null:t.user.id}const y=async()=>{d("View Courier Products");const{html:t,pageEvents:a}=c("view-courier"),i=await m();let s="";if(!i)s='<div class="text-center text-gray-600 mt-8">You must be logged in to view your shipments.</div>';else{const{data:n}=await o.from("shipments").select("*").eq("sender_id",i).in("status",["in-transit","delivered","processing"]).order("created_at",{ascending:!1});!n||n.length===0?s='<p class="text-center text-gray-600 mt-8">No products currently in transit.</p>':s=n.map(e=>{let r;return e.status==="delivered"?r="bg-green-200 text-green-800":e.status==="in-transit"?r="bg-blue-200 text-blue-800":r="bg-yellow-200 text-yellow-800",`
          <div class="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 pb-16 relative">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">${e.receiver_name}</h3>
            <p class="text-sm text-gray-600 mb-3">Tracking ID: <span class="font-mono">${e.tracking_code}</span></p>
            <div class="flex items-center mb-2">
              <span class="px-3 py-1 rounded-full text-xs font-semibold ${r}">
                ${e.status.charAt(0).toUpperCase()+e.status.slice(1)}
              </span>
            </div>
            <p class="text-gray-700"><strong>Origin:</strong> ${e.origin}</p>
            <p class="text-gray-700"><strong>Destination:</strong> ${e.destination}</p>
            <p class="text-gray-700"><strong>Receiver:</strong> ${e.receiver_name} (${e.receiver_phone})</p>
            <p class="text-gray-700"><strong>ETA:</strong> ${e.delivery_datetime?new Date(e.delivery_datetime).toLocaleString():"N/A"}</p>
          </div>
        `}).join("")}const l=`
    <div class="min-h-screen bg-[#1e293b]">
      ${t}
      <main class="container mx-auto px-4 py-8 max-w-5xl">
        <h2 class="text-3xl font-bold text-indigo-700 mb-6 text-center">Products in Transit</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${s}
        </div>
      </main>
    </div>
  `;function g(){a()}return{html:l,pageEvents:g}};export{y as default};
//# sourceMappingURL=viewCourier-ak4i8UCQ.js.map
