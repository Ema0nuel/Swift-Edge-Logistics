import dayjs from "dayjs";
import { reset } from "../../utils/reset.js";
import { supabase } from "../../utils/supabaseClient.js";
import Navbar from "./components/navbar.js";
import toastr from '/src/script/utils/toastr.js';

// --- Only for local testing! ---
const SUPABASE_SERVICE_ROLE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_PROJECT_URL = "https://pyslfvzwcmigrryoakpc.supabase.co";
async function deleteSupabaseUser(user_id) {
  const res = await fetch(`${SUPABASE_PROJECT_URL}/auth/v1/admin/users/${user_id}`, {
    method: "DELETE",
    headers: {
      "apikey": SUPABASE_SERVICE_ROLE_KEY,
      "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json"
    }
  });
  return res.ok;
}
// --------------------------------

import defaultAvatar from "../../../images/avatar-default.png";

// Utility: Show spinner overlay
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

// Fetch all users
async function fetchUsers(search = "") {
  let query = supabase
    .from("profiles")
    .select("id, full_name, phone, role, avatar_url, created_at")
    .order("created_at", { ascending: false });

  if (search) {
    query = query.ilike("full_name", `%${search}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }
  return data || [];
}

// Fetch user details, shipments, payments, logs
async function fetchUserDetails(userId) {
  showSpinner();
  const [{ data: profile }, { data: shipments }, { data: payments }, { data: logs }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", userId).single(),
    supabase.from("shipments").select("*").eq("sender_id", userId).order("created_at", { ascending: false }),
    supabase.from("payments").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
    supabase.from("admin_logs").select("*").eq("target_id", userId).order("log_time", { ascending: false }),
  ]);
  hideSpinner();
  return { profile, shipments, payments, logs };
}

// Create user profile
async function createUserProfile(form) {
  showSpinner();
  const full_name = form.full_name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const password = form.password.value;
  const role = form.role.value;

  if (!full_name || !email || !phone || !password || !role) {
    hideSpinner();
    toastr.error("Please fill all fields.");
    return false;
  }

  // Create user using regular sign up (client-side)
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    hideSpinner();
    toastr.error(error.message || "Failed to create user.");
    return false;
  }

  const userId = data.user.id;

  // Insert profile
  const { error: profileError } = await supabase.from("profiles").insert([
    {
      id: userId,
      full_name,
      phone,
      role,
      avatar_url: "",
      email
    },
  ]);

  hideSpinner();
  if (profileError) {
    toastr.error(profileError.message || "Failed to create profile.");
    return false;
  }

  toastr.success("User created successfully!");
  return true;
}

// Edit user profile
async function editUserProfile(form, userId) {
  showSpinner();
  const full_name = form.full_name.value.trim();
  const phone = form.phone.value.trim();
  const role = form.role.value;

  if (!full_name || !phone || !role) {
    hideSpinner();
    toastr.error("Please fill all fields.");
    return false;
  }

  const { error } = await supabase.from("profiles").update({
    full_name,
    phone,
    role,
  }).eq("id", userId);

  hideSpinner();
  if (error) {
    toastr.error(error.message || "Failed to update profile.");
    return false;
  }

  toastr.success("User updated successfully!");
  return true;
}

// Delete user (using service role key for admin API)
async function deleteUser(userId) {
  if (!confirm("Are you sure you want to delete this user?")) return false;
  showSpinner();
  try {
    // Delete from Supabase Auth (admin API)
    const ok = await deleteSupabaseUser(userId);
    // Delete from profiles (cascade deletes other FK rows)
    const { error: profileError } = await supabase.from("profiles").delete().eq("id", userId);
    hideSpinner();
    if (!ok || profileError) {
      toastr.error((profileError?.message) || "Failed to delete user.");
      return false;
    }
    toastr.success("User deleted successfully!");
    return true;
  } catch (err) {
    hideSpinner();
    toastr.error("Failed to delete user: " + err.message);
    return false;
  }
}

const users = async () => {
  reset("User Management");
  const { html: navbarHtml, pageEvents: navbarEvents } = Navbar();

  let usersList = await fetchUsers();
  let selectedUser = null;

  // Render main view
  function renderMain() {
    const html = `
      <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex">
        ${navbarHtml}
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
                  ${usersList.map(user => `
                    <tr class="hover:bg-white/20 transition-all cursor-pointer" data-user-id="${user.id}">
                      <td class="px-4 py-2"><img src="${user.avatar_url || defaultAvatar}" class="w-10 h-10 rounded-full border-2 border-blue-500 bg-white" /></td>
                      <td class="px-4 py-2 font-bold">${user.full_name}</td>
                      <td class="px-4 py-2">${user.phone}</td>
                      <td class="px-4 py-2">
                        <span class="px-2 py-1 rounded-full text-xs font-medium ${user.role === "admin" ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400"}">
                          ${user.role}
                        </span>
                      </td>
                      <td class="px-4 py-2">${dayjs(user.created_at).format("MMM D, YYYY")}</td>
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
    `;
    document.querySelector("#app").innerHTML = html;
    mainEvents();
  }

  // Render user details view
  async function renderUserDetails(userId) {
    selectedUser = userId;
    showSpinner();
    const { profile, shipments, payments, logs } = await fetchUserDetails(userId);
    hideSpinner();
    const html = `
      <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex">
        ${navbarHtml}
        <div class="flex-1 ml-0 sm:ml-64 h-screen overflow-y-auto transition-all duration-300">
          <main class="p-4 md:p-8 max-w-5xl mx-auto animate-fadeIn">
            <button id="backToUsers" class="mb-6 px-4 py-2 rounded bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow hover:scale-105 transition-all">
              <i class="fa fa-arrow-left"></i> Back to Users
            </button>
            <div class="flex items-center gap-6 mb-8">
              <img src="${profile.avatar_url || defaultAvatar}" class="w-20 h-20 rounded-full border-4 border-blue-500 bg-white" alt="Avatar" />
              <div>
                <h2 class="text-2xl font-bold text-white">${profile.full_name}</h2>
                <p class="text-blue-300">${profile.email || ""}</p>
                <p class="text-gray-400">Phone: ${profile.phone}</p>
                <span class="px-3 py-1 rounded-full text-xs font-medium ${profile.role === "admin" ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400"}">
                  ${profile.role}
                </span>
                <span class="ml-2 text-xs text-gray-400">Joined: ${dayjs(profile.created_at).format("MMM D, YYYY")}</span>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 class="text-lg font-bold text-white mb-4">Shipments</h3>
                <div class="space-y-2">
                  ${shipments.length ? shipments.map(s => `
                    <div class="p-3 rounded bg-white/5 text-white flex justify-between items-center">
                      <span>${s.tracking_code}</span>
                      <span class="text-blue-400">${s.status}</span>
                    </div>
                  `).join("") : "<div class='text-gray-400'>No shipments.</div>"}
                </div>
              </div>
              <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 class="text-lg font-bold text-white mb-4">Payments</h3>
                <div class="space-y-2">
                  ${payments.length ? payments.map(p => `
                    <div class="p-3 rounded bg-white/5 text-white flex justify-between items-center">
                      <span>${p.method || "Card"} - ${p.amount}</span>
                      <span class="text-blue-400">${p.status}</span>
                    </div>
                  `).join("") : "<div class='text-gray-400'>No payments.</div>"}
                </div>
              </div>
            </div>
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-8">
              <h3 class="text-lg font-bold text-white mb-4">Activity Logs</h3>
              <div class="space-y-2">
                ${logs.length ? logs.map(l => `
                  <div class="p-3 rounded bg-white/5 text-white flex justify-between items-center">
                    <span>${l.action}</span>
                    <span class="text-gray-400">${dayjs(l.log_time).format("MMM D, YYYY HH:mm")}</span>
                  </div>
                `).join("") : "<div class='text-gray-400'>No logs.</div>"}
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
    `;
    document.querySelector("#app").innerHTML = html;
    detailsEvents(profile.id);
  }

  // Render edit user form
  async function renderEditUser(userId) {
    showSpinner();
    const { profile } = await fetchUserDetails(userId);
    hideSpinner();
    const html = `
      <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex">
        ${navbarHtml}
        <div class="flex-1 ml-0 sm:ml-64 h-screen overflow-y-auto transition-all duration-300">
          <main class="p-4 md:p-8 max-w-md mx-auto animate-fadeIn">
            <button id="backToDetails" class="mb-6 px-4 py-2 rounded bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow hover:scale-105 transition-all">
              <i class="fa fa-arrow-left"></i> Back to Details
            </button>
            <h2 class="text-2xl font-bold mb-4 text-white">Edit User</h2>
            <form id="editUserForm" class="space-y-4">
              <input type="text" name="full_name" value="${profile.full_name}" placeholder="Full Name" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
              <input type="tel" name="phone" value="${profile.phone}" placeholder="Phone" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
              <select name="role" class="input input-bordered w-full py-2 px-4 rounded-lg" required>
                <option value="user" ${profile.role === "user" ? "selected" : ""}>User</option>
                <option value="admin" ${profile.role === "admin" ? "selected" : ""}>Admin</option>
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
    `;
    document.querySelector("#app").innerHTML = html;
    editEvents(profile.id);
  }

  // Main table events
  function mainEvents() {
    navbarEvents();

    // Search/filter users
    document.getElementById("searchInput")?.addEventListener("input", async (e) => {
      showSpinner();
      const search = e.target.value.trim();
      usersList = await fetchUsers(search);
      hideSpinner();
      renderMain();
    });

    // Row actions
    document.querySelectorAll("#usersTableBody tr").forEach(row => {
      const userId = row.getAttribute("data-user-id");
      row.querySelector(".detailsUserBtn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        renderUserDetails(userId);
      });
      row.querySelector(".editUserBtn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        renderEditUser(userId);
      });
      row.querySelector(".deleteUserBtn")?.addEventListener("click", async (e) => {
        e.stopPropagation();
        const success = await deleteUser(userId);
        if (success) {
          usersList = await fetchUsers();
          renderMain();
        }
      });
    });

    // Modal logic
    const modal = document.getElementById("createUserModal");
    document.getElementById("createUserBtn")?.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });
    document.getElementById("closeModalBtn")?.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    // Create user form
    document.getElementById("createUserForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      const success = await createUserProfile(form);
      if (success) {
        modal.classList.add("hidden");
        usersList = await fetchUsers();
        renderMain();
      }
    });
  }

  // Details view events
  function detailsEvents(userId) {
    navbarEvents();
    document.getElementById("backToUsers")?.addEventListener("click", () => {
      selectedUser = null;
      renderMain();
    });
    document.getElementById("editUserBtnDetails")?.addEventListener("click", () => {
      renderEditUser(userId);
    });
    document.getElementById("deleteUserBtnDetails")?.addEventListener("click", async () => {
      const success = await deleteUser(userId);
      if (success) {
        selectedUser = null;
        usersList = await fetchUsers();
        renderMain();
      }
    });
  }

  // Edit view events
  function editEvents(userId) {
    navbarEvents();
    document.getElementById("backToDetails")?.addEventListener("click", () => {
      renderUserDetails(userId);
    });
    document.getElementById("editUserForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      const success = await editUserProfile(form, userId);
      if (success) {
        renderUserDetails(userId);
      }
    });
  }

  // Return dummy for router compatibility
  return {
    html: "",
    pageEvents: () => {
      // Initial render
      renderMain();
    }
  };
};

export default users;