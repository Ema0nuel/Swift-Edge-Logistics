import{g as d}from"./auth-CiIyiIsG.js";import{r as l}from"./reset-W7AGB0Zm.js";const h=()=>{const t=d();return!t||!t.user||t.user.role!=="admin"?(localStorage.removeItem("swiftedge_admin_session"),window.location.href="/admin-login",null):t},c=()=>{localStorage.removeItem("swiftedge_admin_session"),window.location.href="/admin-login"},m="/src/images/logo.jpg",f=[{name:"Dashboard",href:"/admin/dashboard",icon:"fa-chart-bar"},{name:"Users",href:"/admin/users",icon:"fa-users"},{name:"Shipments",href:"/admin/shipments",icon:"fa-truck"},{name:"Payments",href:"/admin/payments",icon:"fa-credit-card"},{name:"Notifications",href:"/admin/notifications",icon:"fa-bell"}],p=()=>{const t=`
    <aside id="admin-sidebar" class="fixed left-0 top-0 z-40 h-screen w-64 bg-gray-900 border-r border-gray-800 transition-transform duration-300 ease-in-out sm:translate-x-0 overflow-hidden">
      <div class="flex flex-col h-full px-3 py-4">
        <div class="flex items-center mb-6 pl-2.5">
          <img src="${m}" class="h-8 w-8 rounded-full mr-3" alt="Logo" />
          <span class="self-center text-xl font-semibold text-white">SwiftEdge</span>
        </div>
        <nav class="flex-1 space-y-2 overflow-y-auto">
          ${f.map(e=>`
            <a href="${e.href}" data-nav 
              class="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-200 group">
              <i class="fa ${e.icon} w-5 h-5 mr-3 transition-transform group-hover:scale-110"></i>
              <span>${e.name}</span>
            </a>
          `).join("")}
        </nav>
        <button id="logoutLink" 
          class="flex items-center px-4 py-3 text-red-400 rounded-lg hover:bg-red-900/50 hover:text-red-300 transition-all duration-200 group mt-4">
          <i class="fa fa-sign-out-alt w-5 h-5 mr-3 transition-transform group-hover:scale-110"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>
    <button id="sidebar-toggle" class="fixed left-4 top-4 z-50 sm:hidden bg-gray-900 text-white p-2 rounded-lg">
      <i class="fa fa-bars"></i>
    </button>
  `;function s(){const e=document.getElementById("admin-sidebar"),a=document.getElementById("sidebar-toggle"),o=document.getElementById("logoutLink");a?.addEventListener("click",()=>{e.classList.toggle("-translate-x-full")}),document.addEventListener("click",n=>{window.innerWidth<640&&!e?.contains(n.target)&&!a?.contains(n.target)&&e?.classList.add("-translate-x-full")}),document.querySelectorAll("a[data-nav]").forEach(n=>{n.addEventListener("click",i=>{i.preventDefault();const r=n.getAttribute("href");window.innerWidth<640&&e?.classList.add("-translate-x-full"),l(n.textContent.trim()),window.history.pushState({},"",r)})}),o?.addEventListener("click",c)}return{html:t,pageEvents:s}};export{h as c,p as n};
//# sourceMappingURL=navbar-CHt86diH.js.map
