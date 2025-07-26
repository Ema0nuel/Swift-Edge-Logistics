import{G as g}from"./GlobeSpinner-BshKxO8A.js";import{r as b}from"./reset-W7AGB0Zm.js";import{s as y}from"./logo-BSIuJKwo.js";import{s as i}from"./supabaseClient-CMz3Pz_I.js";import{t as s}from"./toastr-ToYgTeRl.js";import{s as m}from"./send-email-D3sSQfLx.js";import{c as x}from"./checkSession-8xa7RLL5.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";function k(){const a=document.getElementById("loginForm"),o=document.getElementById("spinner"),n=document.getElementById("loginBtn"),u=document.getElementById("otpSection");let d=null,r="";a.onsubmit=async t=>{t.preventDefault(),n.disabled=!0,o.style.display="inline-block",r=a.email.value.trim();const e=a.password.value;if(!r||!e){s.error("Please fill in all fields."),n.disabled=!1,o.style.display="none";return}const{data:l,error:c}=await i.auth.signInWithPassword({email:r,password:e});if(c){s.error(c.message||"Login failed."),n.disabled=!1,o.style.display="none";return}d=l.user.id;const p=Math.floor(1e5+Math.random()*9e5).toString(),f=new Date(Date.now()+600*1e3).toISOString();await i.from("otps").insert([{user_id:d,code:p,type:"login",expires_at:f}]),await m({to:r,subject:"Your SwiftEdge Logistics Login OTP",html:`<h2>SwiftEdge Logistics</h2>
        <p>Your OTP code is: <b>${p}</b></p>
        <p>This code expires in 10 minutes.</p>
        <p>If you did not request this, please ignore.</p>`}),s.info("OTP sent to your email."),a.style.display="none",u.classList.remove("hidden"),n.disabled=!1,o.style.display="none"},document.getElementById("verifyOtpBtn").onclick=async()=>{const t=document.getElementById("otpInput").value.trim();if(!t||t.length!==6){s.error("Enter a valid 6-digit OTP.");return}o.style.display="inline-block";const{data:e,error:l}=await i.from("otps").select("*").eq("user_id",d).eq("code",t).eq("type","login").eq("is_used",!1).gte("expires_at",new Date().toISOString()).single();if(l||!e){s.error("Invalid or expired OTP."),o.style.display="none";return}await i.from("otps").update({is_used:!0}).eq("id",e.id),s.success("Login successful!"),setTimeout(()=>window.location.href="/dashboard",1200)},document.getElementById("resendOtpBtn").onclick=async()=>{const t=Math.floor(1e5+Math.random()*9e5).toString(),e=new Date(Date.now()+600*1e3).toISOString();await i.from("otps").insert([{user_id:d,code:t,type:"login",expires_at:e}]),await m({to:r,subject:"Your SwiftEdge Logistics Login OTP",html:`<h2>SwiftEdge Logistics</h2>
        <p>Your new OTP code is: <b>${t}</b></p>
        <p>This code expires in 10 minutes.</p>`}),s.info("OTP resent to your email.")}}const w="https://cdn.sanity.io/images/db3vqx3o/production/c3d52332b79521e3c086ed42d7b9c4c804f3aa40-2000x1334.webp?w=1280&fm=webp",B=async()=>{if(b("Login"),!await x(!0))return;const a=()=>{document.getElementById("themeToggle")?.addEventListener("click",()=>{document.documentElement.classList.toggle("dark")}),k()};return{html:`
    <div class="min-h-screen flex items-center justify-center transition-colors"
      style="
        background: url('${w}') center/cover no-repeat;
        position: relative;
      ">
      <div class="absolute inset-0 bg-white/80 dark:bg-background-dark/90 backdrop-blur-md"></div>
      <div class="relative w-full max-w-md mx-auto bg-white dark:bg-background-dark rounded-2xl shadow-2xl p-8 z-10 border border-primary-dark/10 dark:border-accent-soft/20">
        <button id="themeToggle" class="absolute top-6 right-6 btn btn-circle btn-outline text-xl font-bold" title="Toggle theme">
          <i class="fa-solid fa-moon"></i>
        </button>
        <div class="flex flex-col items-center mb-6">
          <img src="${y}" alt="SwiftEdge Logistics Logo" class="h-16 mb-2 rounded-xl shadow-lg border-4 border-primary-dark dark:border-accent-soft bg-white/80 dark:bg-background-dark/80" />
          <h2 class="text-3xl font-extrabold text-primary-dark dark:text-accent-soft mb-1 tracking-tight">Welcome Back</h2>
          <p class="text-lg text-primary-dark dark:text-accent-soft font-semibold mb-2">Sign in to SwiftEdge Logistics</p>
          <span class="text-xs text-gray-500 dark:text-gray-300 mb-2">Delivering trust, speed & reliability.</span>
        </div>
        <form id="loginForm" class="space-y-5">
          <div class="relative">
            <i class="fa-solid fa-envelope absolute left-3 top-3 text-primary-dark dark:text-accent-soft"></i>
            <input type="email" name="email" autocomplete="username" placeholder="Email Address" class="input input-bordered w-full pl-10 py-3 font-semibold focus:ring-2 focus:ring-accent-soft dark:focus:ring-primary-dark transition-all" required />
          </div>
          <div class="relative">
            <i class="fa-solid fa-lock absolute left-3 top-3 text-primary-dark dark:text-accent-soft"></i>
            <input type="password" name="password" autocomplete="current-password" placeholder="Password" class="input input-bordered w-full pl-10 py-3 font-semibold focus:ring-2 focus:ring-accent-soft dark:focus:ring-primary-dark transition-all" required />
          </div>
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" name="remember" class="checkbox accent-primary-dark dark:accent-accent-soft" />
              <span>Remember me</span>
            </label>
            <a href="/user/forgot-password" class="text-accent-dark dark:text-accent-soft hover:underline text-sm font-bold" data-nav>Forgot password?</a>
          </div>
          <button type="submit" class="btn btn-primary w-full flex items-center justify-center gap-2 text-lg font-bold py-3 bg-gradient-to-r from-primary-dark to-accent-soft text-white shadow-lg hover:scale-105 transition-transform active:scale-95" id="loginBtn">
            <i class="fa-solid fa-right-to-bracket"></i>
            <span>Login</span>
            <span id="spinner" style="display:none;">${g({size:24,color:"#0d9488"})}</span>
          </button>
          <div class="mt-2 text-center">
            <span class="text-sm font-medium text-gray-600 dark:text-gray-300">New to SwiftEdge?</span>
            <a href="/signup" class="text-accent-dark dark:text-accent-soft hover:underline text-sm ml-2 font-bold" data-nav>Create account</a>
          </div>
        </form>
        <div id="otpSection" class="hidden mt-6">
          <h3 class="text-lg font-semibold mb-2 text-primary-dark dark:text-accent-soft">Enter OTP</h3>
          <input type="text" id="otpInput" maxlength="6" class="input input-bordered w-full mb-2 py-3 font-semibold focus:ring-2 focus:ring-accent-soft dark:focus:ring-primary-dark" placeholder="6-digit OTP" />
          <button id="verifyOtpBtn" class="btn btn-accent w-full font-bold py-3 bg-gradient-to-r from-accent-soft to-primary-dark text-white">Verify OTP</button>
          <button id="resendOtpBtn" class="btn btn-link w-full mt-2 font-bold text-primary-dark dark:text-accent-soft">Resend OTP</button>
        </div>
        <div class="mt-8 text-center text-xs text-gray-400 dark:text-gray-500">
          <span>SwiftEdge Logistics &copy; ${new Date().getFullYear()} &mdash; Secure. Fast. Reliable.</span>
        </div>
      </div>
    </div>
    `,pageEvents:a}};export{B as default};
//# sourceMappingURL=login-DOR2P4xD.js.map
