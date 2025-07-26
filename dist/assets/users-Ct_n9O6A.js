import{d as x}from"./dayjs.min-Cbbdfn5l.js";import{r as _}from"./reset-W7AGB0Zm.js";import{s as p}from"./supabaseClient-CMz3Pz_I.js";import{n as I}from"./navbar-CHt86diH.js";import{t as c}from"./toastr-ToYgTeRl.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";import"./auth-CiIyiIsG.js";const w="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5c2xmdnp3Y21pZ3JyeW9ha3BjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjkyNjM5MCwiZXhwIjoyMDY4NTAyMzkwfQ.2UOKHeg_vpSuGMY-zMmSnb_A9fhoOu643nvp0ZwSOdk",k="https://pyslfvzwcmigrryoakpc.supabase.co";async function M(t){return(await fetch(`${k}/auth/v1/admin/users/${t}`,{method:"DELETE",headers:{apikey:w,Authorization:`Bearer ${w}`,"Content-Type":"application/json"}})).ok}const U="/src/images/avatar-default.png";function f(){const t=document.createElement("div");t.id="spinnerOverlay",t.innerHTML=`
    <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div class="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  `,document.body.appendChild(t)}function o(){document.getElementById("spinnerOverlay")?.remove()}async function b(t=""){let s=p.from("profiles").select("id, full_name, phone, role, avatar_url, created_at").order("created_at",{ascending:!1});t&&(s=s.ilike("full_name",`%${t}%`));const{data:a,error:i}=await s;return i?(console.error("Error fetching users:",i),[]):a||[]}async function E(t){f();const[{data:s},{data:a},{data:i},{data:l}]=await Promise.all([p.from("profiles").select("*").eq("id",t).single(),p.from("shipments").select("*").eq("sender_id",t).order("created_at",{ascending:!1}),p.from("payments").select("*").eq("user_id",t).order("created_at",{ascending:!1}),p.from("admin_logs").select("*").eq("target_id",t).order("log_time",{ascending:!1})]);return o(),{profile:s,shipments:a,payments:i,logs:l}}async function L(t){f();const s=t.full_name.value.trim(),a=t.email.value.trim(),i=t.phone.value.trim(),l=t.password.value,m=t.role.value;if(!s||!a||!i||!l||!m)return o(),c.error("Please fill all fields."),!1;const{data:y,error:h}=await p.auth.signUp({email:a,password:l});if(h)return o(),c.error(h.message||"Failed to create user."),!1;const g=y.user.id,{error:r}=await p.from("profiles").insert([{id:g,full_name:s,phone:i,role:m,avatar_url:"",email:a}]);return o(),r?(c.error(r.message||"Failed to create profile."),!1):(c.success("User created successfully!"),!0)}async function S(t,s){f();const a=t.full_name.value.trim(),i=t.phone.value.trim(),l=t.role.value;if(!a||!i||!l)return o(),c.error("Please fill all fields."),!1;const{error:m}=await p.from("profiles").update({full_name:a,phone:i,role:l}).eq("id",s);return o(),m?(c.error(m.message||"Failed to update profile."),!1):(c.success("User updated successfully!"),!0)}async function $(t){if(!confirm("Are you sure you want to delete this user?"))return!1;f();try{const s=await M(t),{error:a}=await p.from("profiles").delete().eq("id",t);return o(),!s||a?(c.error(a?.message||"Failed to delete user."),!1):(c.success("User deleted successfully!"),!0)}catch(s){return o(),c.error("Failed to delete user: "+s.message),!1}}const C=async()=>{_("User Management");const{html:t,pageEvents:s}=I();let a=await b();function i(){const r=`
      <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex">
        ${t}
        <div class="flex-1 ml-0 sm:ml-64 h-screen overflow-y-auto transition-all duration-300">
          <main class="p-4 md:p-8 max-w-7xl mx-auto animate-fadeIn">
            <div class="flex items-center justify-between mb-8 animate-slideDown">
              <h1 class="text-3xl font-bold text-white">🧑‍💼 User Management</h1>
              <button id="createUserBtn" class="px-4 py-2 rounded bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:scale-105 transition-all">
                <i class="fa fa-user-plus"></i> Create User
              </button>
            </div>
            <div class="mb-6">
              <input type="text" id="searchInput" class="input input-bordered w-full max-w-xs py-2 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Search users by name..." />
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full bg-white/10 rounded-xl border border-white/20 text-white shadow-lg">
                <thead>
                  <tr>
                    <th class="px-4 py-2">Avatar</th>
                    <th class="px-4 py-2">Name</th>
                    <th class="px-4 py-2">Phone</th>
                    <th class="px-4 py-2">Role</th>
                    <th class="px-4 py-2">Joined</th>
                    <th class="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody id="usersTableBody">
                  ${a.map(e=>`
                    <tr class="hover:bg-white/20 transition-all cursor-pointer" data-user-id="${e.id}">
                      <td class="px-4 py-2"><img src="${e.avatar_url||U}" class="w-10 h-10 rounded-full border-2 border-blue-500 bg-white" /></td>
                      <td class="px-4 py-2 font-bold">${e.full_name}</td>
                      <td class="px-4 py-2">${e.phone}</td>
                      <td class="px-4 py-2">
                        <span class="px-2 py-1 rounded-full text-xs font-medium ${e.role==="admin"?"bg-purple-500/20 text-purple-400":"bg-blue-500/20 text-blue-400"}">
                          ${e.role}
                        </span>
                      </td>
                      <td class="px-4 py-2">${x(e.created_at).format("MMM D, YYYY")}</td>
                      <td class="px-4 py-2">
                        <button class="detailsUserBtn px-2 py-1 rounded bg-blue-600 text-white mr-2 transition-all hover:bg-blue-700" title="Details"><i class="fa fa-eye"></i></button>
                        <button class="editUserBtn px-2 py-1 rounded bg-yellow-600 text-white mr-2 transition-all hover:bg-yellow-700" title="Edit"><i class="fa fa-edit"></i></button>
                        <button class="deleteUserBtn px-2 py-1 rounded bg-red-600 text-white transition-all hover:bg-red-700" title="Delete"><i class="fa fa-trash"></i></button>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
            <div id="createUserModal" class="fixed inset-0 bg-black/60 hidden items-center justify-center z-50 flex">
              <div class="bg-white rounded-xl p-8 w-full max-w-md shadow-lg relative animate-slideIn">
                <button id="closeModalBtn" class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"><i class="fa fa-times"></i></button>
                <h2 class="text-2xl font-bold mb-4 text-gray-800">Create New User</h2>
                <form id="createUserForm" class="space-y-4">
                  <input type="text" name="full_name" placeholder="Full Name" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
                  <input type="email" name="email" placeholder="Email" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
                  <input type="tel" name="phone" placeholder="Phone" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
                  <input type="password" name="password" placeholder="Password" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
                  <select name="role" class="input input-bordered w-full py-2 px-4 rounded-lg" required>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button type="submit" class="btn btn-primary w-full py-2 font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white">Create User</button>
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
    `;document.querySelector("#app").innerHTML=r,y()}async function l(r){f();const{profile:e,shipments:n,payments:d,logs:v}=await E(r);o();const B=`
      <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex">
        ${t}
        <div class="flex-1 ml-0 sm:ml-64 h-screen overflow-y-auto transition-all duration-300">
          <main class="p-4 md:p-8 max-w-5xl mx-auto animate-fadeIn">
            <button id="backToUsers" class="mb-6 px-4 py-2 rounded bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow hover:scale-105 transition-all">
              <i class="fa fa-arrow-left"></i> Back to Users
            </button>
            <div class="flex items-center gap-6 mb-8">
              <img src="${e.avatar_url||U}" class="w-20 h-20 rounded-full border-4 border-blue-500 bg-white" alt="Avatar" />
              <div>
                <h2 class="text-2xl font-bold text-white">${e.full_name}</h2>
                <p class="text-blue-300">${e.email||""}</p>
                <p class="text-gray-400">Phone: ${e.phone}</p>
                <span class="px-3 py-1 rounded-full text-xs font-medium ${e.role==="admin"?"bg-purple-500/20 text-purple-400":"bg-blue-500/20 text-blue-400"}">
                  ${e.role}
                </span>
                <span class="ml-2 text-xs text-gray-400">Joined: ${x(e.created_at).format("MMM D, YYYY")}</span>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 class="text-lg font-bold text-white mb-4">Shipments</h3>
                <div class="space-y-2">
                  ${n.length?n.map(u=>`
                    <div class="p-3 rounded bg-white/5 text-white flex justify-between items-center">
                      <span>${u.tracking_code}</span>
                      <span class="text-blue-400">${u.status}</span>
                    </div>
                  `).join(""):"<div class='text-gray-400'>No shipments.</div>"}
                </div>
              </div>
              <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 class="text-lg font-bold text-white mb-4">Payments</h3>
                <div class="space-y-2">
                  ${d.length?d.map(u=>`
                    <div class="p-3 rounded bg-white/5 text-white flex justify-between items-center">
                      <span>${u.method||"Card"} - ${u.amount}</span>
                      <span class="text-blue-400">${u.status}</span>
                    </div>
                  `).join(""):"<div class='text-gray-400'>No payments.</div>"}
                </div>
              </div>
            </div>
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-8">
              <h3 class="text-lg font-bold text-white mb-4">Activity Logs</h3>
              <div class="space-y-2">
                ${v.length?v.map(u=>`
                  <div class="p-3 rounded bg-white/5 text-white flex justify-between items-center">
                    <span>${u.action}</span>
                    <span class="text-gray-400">${x(u.log_time).format("MMM D, YYYY HH:mm")}</span>
                  </div>
                `).join(""):"<div class='text-gray-400'>No logs.</div>"}
              </div>
            </div>
            <button id="editUserBtnDetails" class="px-4 py-2 rounded bg-yellow-600 text-white font-bold shadow hover:bg-yellow-700 transition-all mr-2">
              <i class="fa fa-edit"></i> Edit User
            </button>
            <button id="deleteUserBtnDetails" class="px-4 py-2 rounded bg-red-600 text-white font-bold shadow hover:bg-red-700 transition-all">
              <i class="fa fa-trash"></i> Delete User
            </button>
          </main>
        </div>
      </div>
      <style>
        #admin-sidebar { position: fixed; left: 0; top: 0; height: 100vh; }
        @media (max-width: 640px) {
          #admin-sidebar { width: 100vw; }
          .sm\\:ml-64, .ml-64 { margin-left: 0 !important; }
        }
      </style>
    `;document.querySelector("#app").innerHTML=B,h(e.id)}async function m(r){f();const{profile:e}=await E(r);o();const n=`
      <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex">
        ${t}
        <div class="flex-1 ml-0 sm:ml-64 h-screen overflow-y-auto transition-all duration-300">
          <main class="p-4 md:p-8 max-w-md mx-auto animate-fadeIn">
            <button id="backToDetails" class="mb-6 px-4 py-2 rounded bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow hover:scale-105 transition-all">
              <i class="fa fa-arrow-left"></i> Back to Details
            </button>
            <h2 class="text-2xl font-bold mb-4 text-white">Edit User</h2>
            <form id="editUserForm" class="space-y-4">
              <input type="text" name="full_name" value="${e.full_name}" placeholder="Full Name" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
              <input type="tel" name="phone" value="${e.phone}" placeholder="Phone" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
              <select name="role" class="input input-bordered w-full py-2 px-4 rounded-lg" required>
                <option value="user" ${e.role==="user"?"selected":""}>User</option>
                <option value="admin" ${e.role==="admin"?"selected":""}>Admin</option>
              </select>
              <button type="submit" class="btn btn-primary w-full py-2 font-bold bg-gradient-to-r from-yellow-500 to-yellow-700 text-white">Update User</button>
            </form>
          </main>
        </div>
      </div>
      <style>
        #admin-sidebar { position: fixed; left: 0; top: 0; height: 100vh; }
        @media (max-width: 640px) {
          #admin-sidebar { width: 100vw; }
          .sm\\:ml-64, .ml-64 { margin-left: 0 !important; }
        }
      </style>
    `;document.querySelector("#app").innerHTML=n,g(e.id)}function y(){s(),document.getElementById("searchInput")?.addEventListener("input",async e=>{f();const n=e.target.value.trim();a=await b(n),o(),i()}),document.querySelectorAll("#usersTableBody tr").forEach(e=>{const n=e.getAttribute("data-user-id");e.querySelector(".detailsUserBtn")?.addEventListener("click",d=>{d.stopPropagation(),l(n)}),e.querySelector(".editUserBtn")?.addEventListener("click",d=>{d.stopPropagation(),m(n)}),e.querySelector(".deleteUserBtn")?.addEventListener("click",async d=>{d.stopPropagation(),await $(n)&&(a=await b(),i())})});const r=document.getElementById("createUserModal");document.getElementById("createUserBtn")?.addEventListener("click",()=>{r.classList.remove("hidden")}),document.getElementById("closeModalBtn")?.addEventListener("click",()=>{r.classList.add("hidden")}),document.getElementById("createUserForm")?.addEventListener("submit",async e=>{e.preventDefault();const n=e.target;await L(n)&&(r.classList.add("hidden"),a=await b(),i())})}function h(r){s(),document.getElementById("backToUsers")?.addEventListener("click",()=>{i()}),document.getElementById("editUserBtnDetails")?.addEventListener("click",()=>{m(r)}),document.getElementById("deleteUserBtnDetails")?.addEventListener("click",async()=>{await $(r)&&(a=await b(),i())})}function g(r){s(),document.getElementById("backToDetails")?.addEventListener("click",()=>{l(r)}),document.getElementById("editUserForm")?.addEventListener("submit",async e=>{e.preventDefault();const n=e.target;await S(n,r)&&l(r)})}return{html:"",pageEvents:()=>{i()}}};export{C as default};
//# sourceMappingURL=users-Ct_n9O6A.js.map
