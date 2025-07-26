import{N as b}from"./navbar-ZPK2fscr.js";import{s as r}from"./supabaseClient-CMz3Pz_I.js";import{s as l}from"./logo-BSIuJKwo.js";import{c as p}from"./checkSession-8xa7RLL5.js";import{r as h}from"./reset-W7AGB0Zm.js";import"./toastr-ToYgTeRl.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";async function v(){const{data:{user:t}}=await r.auth.getUser();if(!t)return{profile:null,notifications:[]};const{data:a}=await r.from("profiles").select("*").eq("id",t.id).single(),{data:i}=await r.from("notifications").select("*").eq("user_id",t.id).order("created_at",{ascending:!1}).limit(3);return{profile:a,notifications:i||[]}}const A=async()=>{if(!await p())return;h("Dashboard");const{profile:t,notifications:a}=await v(),{html:i,pageEvents:d}=b("dashboard"),n=`
    <section class="relative w-full h-64 md:h-80 flex items-center justify-center overflow-hidden rounded-b-2xl shadow-lg mb-8"
      style="background: url('https://www.wowtheme7.com/tf/transpro/assets/img/banner/breadcrumb.png') center/cover no-repeat, #1e293b;">
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 to-background-dark/90"></div>
      <div class="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <img src="${l}" alt="SwiftEdge Logo" class="h-20 w-20 mb-2 rounded-full bg-white shadow-lg" />
        <h1 class="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-2">Welcome${t?.full_name?`, ${t.full_name}`:""}!</h1>
        <p class="text-lg text-accent mt-2 font-semibold">Your role: <span class="uppercase">${t?.role||"user"}</span></p>
      </div>
    </section>
  `,c=`
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
  `,m=a.length?a.map(e=>`
        <div class="w-full max-w-xl bg-peach dark:bg-background-dark border-l-4 ${e.is_read?"border-accent":"border-primary"} p-4 rounded shadow cursor-pointer notification-item" data-id="${e.id}">
          <div class="flex items-center gap-2 mb-1">
            <i class="fa ${e.title?.toLowerCase().includes("delivered")?"fa-box":"fa-bell"} text-primary dark:text-accent"></i>
            <span class="font-semibold">${e.title}</span>
            <span class="ml-auto text-xs text-text-subtle">${new Date(e.created_at).toLocaleString()}</span>
          </div>
          <div class="text-sm text-text-dark dark:text-text-light truncate">${e.message}</div>
        </div>
      `).join(""):'<div class="text-center text-text-subtle py-8">No notifications yet.</div>',x=`
    <div class="min-h-screen bg-[#1e293b] dark:bg-background-dark transition-colors duration-300 bg-cover bg-center"
      style="background-image: url('https://www.wowtheme7.com/tf/transpro/assets/img/banner/breadcrumb.png'); background-blend-mode: multiply;">
      ${i}
      <main id="dashboard-main" class="container mx-auto px-2 py-6 min-h-[80vh]">
        ${n}
        <div class="flex flex-col md:flex-row gap-8">
          <div class="flex-1">
            <h2 class="text-2xl font-bold mb-4 text-primary dark:text-accent">Quick Actions</h2>
            ${c}
          </div>
          <aside class="w-full md:w-96">
            <div class="bg-white/90 dark:bg-background-dark/80 rounded-lg shadow-lg p-6 mb-6">
              <div class="flex items-center gap-3 mb-4">
                <img src="${t?.avatar_url||l}" alt="Avatar" class="h-12 w-12 rounded-full border-2 border-accent object-cover" />
                <div>
                  <div class="font-bold text-lg text-primary dark:text-accent">${t?.full_name||"User"}</div>
                  <div class="text-xs text-text-subtle">Role: <span class="uppercase">${t?.role||"user"}</span></div>
                </div>
              </div>
              <div class="text-sm text-text-subtle">Phone: ${t?.phone||"N/A"}</div>
              <div class="text-sm text-text-subtle">Joined: ${t?.created_at?new Date(t.created_at).toLocaleDateString():"N/A"}</div>
            </div>
            <div class="bg-white/90 dark:bg-background-dark/80 rounded-lg shadow-lg p-6">
              <h3 class="text-lg font-bold mb-3 text-primary dark:text-accent">Recent Notifications</h3>
              <div class="flex flex-col gap-3">
                ${m}
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
      
    <div id="notification-modal" class="fixed inset-0 flex items-center justify-center z-[99999] bg-black bg-opacity-50 hidden">
      <div class="bg-white dark:bg-background-dark p-6 rounded-lg shadow-xl max-w-md w-full relative">
        <button id="close-modal-btn" class="absolute top-2 right-2 text-xl text-text-subtle hover:text-accent">&times;</button>
        <h3 id="modal-title" class="text-xl font-bold mb-2"></h3>
        <p id="modal-message" class="mb-4"></p>
        <div class="text-xs text-text-subtle" id="modal-date"></div>
      </div>
    </div>
  
      <footer class="bg-white/80 dark:bg-background-dark/80 shadow-inner mt-12 py-6 text-center text-text-subtle dark:text-text-light transition-colors duration-300">
        <p>&copy; ${new Date().getFullYear()} SwiftEdge Logistics. All rights reserved.</p>
        <p class="text-sm mt-2">Designed for efficient logistics.</p>
      </footer>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    </div>
  `;function u(){d(),document.querySelectorAll(".notification-item").forEach(s=>{s.addEventListener("click",()=>{const f=s.getAttribute("data-id"),o=a.find(g=>g.id===f);o&&(document.getElementById("modal-title").textContent=o.title,document.getElementById("modal-message").textContent=o.message,document.getElementById("modal-date").textContent=new Date(o.created_at).toLocaleString(),document.getElementById("notification-modal").classList.remove("hidden"))})});const e=document.getElementById("close-modal-btn");e&&(e.onclick=()=>{document.getElementById("notification-modal").classList.add("hidden")}),document.getElementById("notification-modal")?.addEventListener("click",s=>{s.target.id==="notification-modal"&&document.getElementById("notification-modal").classList.add("hidden")})}return{html:x,pageEvents:u}};export{A as default};
//# sourceMappingURL=dashboard-DhPiGeP_.js.map
