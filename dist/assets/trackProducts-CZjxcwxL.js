import{N as M}from"./navbar-ZPK2fscr.js";import{s as k}from"./supabaseClient-CMz3Pz_I.js";import{t as x}from"./toastr-ToYgTeRl.js";import{d as $}from"./dayjs.min-Cbbdfn5l.js";import{r as P}from"./reset-W7AGB0Zm.js";import{t as y,M as I,V as H,T as N,O as D,F as v,L as B,S as w,a as C,b as E,c as T,P as G,I as _,d as j}from"./Vector-DaKR1H9i.js";import"./logo-BSIuJKwo.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";async function b(s,i){const n=`https://nominatim.openstreetmap.org/reverse?format=json&lat=${s}&lon=${i}`;try{const l=await(await fetch(n)).json();if(l&&l.display_name)return l.display_name}catch{}return`${s},${i}`}function h(s){let[i,n]=s.split(",").map(Number);return[i,n]}const S=[40.7127281,-74.0060152];async function O(s,i){const n=[S,...i.map(a=>h(a.location)).filter(([a,t])=>!isNaN(a)&&!isNaN(t))],m=n.length>1?n[n.length-1]:S,l=y([m[1],m[0]],"EPSG:4326","EPSG:3857");document.getElementById(s).innerHTML="";const d=new I({target:s,layers:[new N({source:new D})],view:new H({center:l,zoom:10})});if(n.length>1){const a=n.map(([e,c])=>y([c,e],"EPSG:4326","EPSG:3857")),t=new v({geometry:new B(a)});t.setStyle(new w({stroke:new C({color:"#F59E42",width:4,lineDash:[8,4]})}));const r=new E({features:[t]}),o=new T({source:r});d.addLayer(o)}for(let a=0;a<n.length;a++){const t=n[a];let r=a===0?"Warehouse (New York)":`Checkpoint #${a}`,o=r;a>0&&(o=await b(t[0],t[1]),r=`Update: ${o}`);const e=new v({geometry:new G(y([t[1],t[0]],"EPSG:4326","EPSG:3857"))});e.setStyle(new w({image:new _({src:a===0?"https://cdn-icons-png.flaticon.com/512/684/684908.png":"https://cdn.jsdelivr.net/npm/ol@v7.4.0/examples/data/icon.png",scale:a===0?.08:.07,anchor:[.5,1]})})),e.set("popup",r);const c=new E({features:[e]}),g=new T({source:c});d.addLayer(g),d.on("singleclick",function(f){d.forEachFeatureAtPixel(f.pixel,function(L){const p=document.createElement("div");p.className="ol-popup",p.style.background="#fff",p.style.padding="8px 12px",p.style.borderRadius="8px",p.style.boxShadow="0 2px 8px rgba(0,0,0,0.2)",p.innerHTML=L.get("popup");const u=document.createElement("div");u.style.position="absolute",u.style.left=f.pixel[0]+"px",u.style.top=f.pixel[1]+"px",u.appendChild(p),document.getElementById(s).appendChild(u),setTimeout(()=>u.remove(),2500)})})}if(n.length>1){const a=[Math.min(...n.map(t=>t[1])),Math.min(...n.map(t=>t[0])),Math.max(...n.map(t=>t[1])),Math.max(...n.map(t=>t[0]))];d.getView().fit(j(a,"EPSG:4326","EPSG:3857"),{padding:[40,40,40,40]})}}const Y=()=>{const{html:s,pageEvents:i}=M("track"),n="https://www.wowtheme7.com/tf/transpro/assets/img/portfolio/2.png",m=`
    <div class="min-h-screen bg-[#1e293b] dark:bg-background-dark transition-colors duration-300 bg-cover bg-center"
      style="background-image: url('${n}'); background-blend-mode: multiply;">
      ${s}
      <main id="track-main" class="container mx-auto px-4 py-8 max-w-4xl">
        <section class="relative w-full h-56 md:h-72 flex items-center justify-center overflow-hidden rounded-2xl shadow-lg mb-8"
          style="background: url('${n}') center/cover no-repeat, #1e293b;">
          <div class="absolute inset-0 bg-gradient-to-b from-black/60 to-background-dark/90"></div>
          <div class="relative z-10 flex flex-col items-center justify-center w-full h-full">
            <i class="fa fa-box-open text-5xl text-accent mb-4 animate-pulse"></i>
            <h1 class="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-2">Track Your Package</h1>
            <p class="text-lg text-accent mt-2 font-semibold">Real-time shipment status & location</p>
          </div>
        </section>
        <form id="track-form" class="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            id="tracking-id-input"
            placeholder="Enter Tracking ID (e.g., TRK123456)"
            class="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <button type="submit"
            class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50">
            Track
          </button>
        </form>
        <div id="tracking-result-container"></div>
        <div id="map-container" class="mt-10 rounded-lg overflow-hidden shadow-lg" style="height: 400px;"></div>
      </main>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    </div>
    <style>
      .ol-popup {
        font-size: 1rem;
        pointer-events: none;
        z-index: 1000;
      }
    </style>
  `;async function l(t){try{const{data:r,error:o}=await k.from("shipments").select("*").eq("tracking_code",t).single();if(o||!r)return x.error("Tracking ID not found."),null;const{data:e}=await k.from("tracking_updates").select("*").eq("shipment_id",r.id).order("updated_at",{ascending:!0});return r.updates=e||[],x.success("Product fetched successfully!"),r}catch{return x.error("Error fetching product."),null}}async function d(t){if(!t){document.getElementById("tracking-result-container").innerHTML=`
        <div class="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-md mb-6" role="alert">
          <p class="font-bold">Error!</p>
          <p class="text-sm">Tracking ID not found. Please try again.</p>
        </div>
      `,document.getElementById("map-container").innerHTML="";return}let r="";for(const e of t.updates){let c=e.location;if(e.location&&e.location.match(/^-?\d+\.\d+,-?\d+\.\d+$/)){const[g,f]=h(e.location);c=await b(g,f)}r+=`
        <li class="flex items-start">
          <span class="text-indigo-500 dark:text-indigo-300 mr-3">&#x2022;</span>
          <div>
            <span class="font-medium">${$(e.updated_at).format("MMM D, HH:mm")}:</span> ${e.status} - ${c} <span class="text-xs text-text-subtle">${e.note||""}</span>
          </div>
        </li>
      `}let o=t.origin;if(t.updates.length){const e=t.updates[t.updates.length-1];if(e.location&&e.location.match(/^-?\d+\.\d+,-?\d+\.\d+$/)){const[c,g]=h(e.location);o=await b(c,g)}else e.location&&(o=e.location)}document.getElementById("tracking-result-container").innerHTML=`
      <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-inner mb-4">
        <h3 class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Tracking Details</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
          <p><strong>Status:</strong> <span class="font-semibold">${t.status}</span></p>
          <p><strong>Current Location:</strong> ${o}</p>
          <p><strong>Tracking ID:</strong> <span class="font-mono">${t.tracking_code}</span></p>
        </div>
        <div class="mt-6">
          <h4 class="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">Tracking History</h4>
          <ul class="space-y-2">
            ${r}
          </ul>
        </div>
      </div>
      <div id="productMapContainer" style="height: 400px;" class="mb-8 rounded-lg overflow-hidden"></div>
    `,setTimeout(()=>{O("productMapContainer",t.updates)},100)}function a(t=()=>{}){i(t),P("Track Product"),document.getElementById("track-form").addEventListener("submit",async r=>{r.preventDefault();const o=document.getElementById("tracking-id-input").value.trim().toUpperCase();if(!o){x.warning("Please enter a tracking ID.");return}document.getElementById("tracking-result-container").innerHTML='<div class="text-center py-8 text-accent animate-pulse">Loading...</div>';const e=await l(o);await d(e)})}return{html:m,pageEvents:a}};export{Y as default};
//# sourceMappingURL=trackProducts-CZjxcwxL.js.map
