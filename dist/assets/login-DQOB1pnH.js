import{r as d}from"./reset-W7AGB0Zm.js";import{v as u,s as c}from"./auth-CiIyiIsG.js";import{t as o}from"./toastr-ToYgTeRl.js";const m="/src/images/logo.jpg",p=()=>{d("Admin Login");function n(t,e){return u(t,e)?(c(),!0):!1}function a(){const t=document.getElementById("loginForm"),e=t?.querySelector('button[type="submit"]');t?.addEventListener("submit",async l=>{l.preventDefault();const r=document.getElementById("email").value,s=document.getElementById("password").value;if(!r||!s){o.warning("Please enter both email and password");return}e.disabled=!0,e.innerHTML=`
        <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Logging in...
      `;try{await new Promise(i=>setTimeout(i,1e3)),n(r,s)?(o.success("Login successful"),window.location.href="/admin/dashboard"):(o.error("Invalid credentials"),e.disabled=!1,e.innerHTML="Login")}catch{o.error("Login failed"),e.disabled=!1,e.innerHTML="Login"}})}return{html:`
      <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 p-4 sm:p-6">
        <div class="bg-white p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-[1.01]">
          <div class="flex justify-center mb-8">
            <img src="${m}" alt="SwiftEdge Logistics Logo" class="h-16 w-auto object-contain rounded-lg shadow-md border border-gray-100">
          </div>
          <h2 class="text-4xl font-extrabold text-center text-gray-900 mb-8">Admin Portal</h2>
          <form id="loginForm" class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input type="email" id="email" name="email" required autocomplete="email"
                class="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 transition duration-150 ease-in-out">
            </div>
            <div>
              <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input type="password" id="password" name="password" required autocomplete="current-password"
                class="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 transition duration-150 ease-in-out">
            </div>
            <button type="submit"
              class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:outline-none focus:ring-3 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white transition duration-200 ease-in-out transform hover:-translate-y-0.5">
              Login
            </button>
          </form>
        </div>
      </div>
    `,pageEvents:a}};export{p as default};
//# sourceMappingURL=login-DQOB1pnH.js.map
