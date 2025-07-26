import { GlobeSpinner } from "../../components/GlobeSpinner.js";
import { reset } from "../../utils/reset.js";
import Logo from '/src/images/logo.jpg';
import { signupHandler } from "./function/signupHandler.js";
const bgImage = "https://cdn.sanity.io/images/db3vqx3o/production/c3d52332b79521e3c086ed42d7b9c4c804f3aa40-2000x1334.webp?w=1280&fm=webp";

const signup = () => {
  reset("Sign up");
  const pageEvents = () => {
    document.getElementById("themeToggle")?.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");
    });
    signupHandler();
  };

  return {
    html: `
    <div class="min-h-screen flex items-center justify-center transition-colors"
      style="
        background: url('${bgImage}') center/cover no-repeat;
        position: relative;
      ">
      <div class="absolute inset-0 bg-white/80 dark:bg-background-dark/90 backdrop-blur-md"></div>
      <div class="relative w-full max-w-lg mx-auto bg-white dark:bg-background-dark rounded-2xl shadow-2xl p-8 z-10 border border-primary-dark/10 dark:border-accent-soft/20">
        <button id="themeToggle" class="absolute top-6 right-6 btn btn-circle btn-outline text-xl font-bold" title="Toggle theme">
          <i class="fa-solid fa-moon"></i>
        </button>
        <div class="flex flex-col items-center mb-6">
          <img src="${Logo}" alt="SwiftEdge Logistics Logo" class="h-16 mb-2 rounded-xl shadow-lg border-4 border-primary-dark dark:border-accent-soft bg-white/80 dark:bg-background-dark/80" />
          <h2 class="text-3xl font-extrabold text-primary-dark dark:text-accent-soft mb-1 tracking-tight">Create Your Account</h2>
          <p class="text-lg text-primary-dark dark:text-accent-soft font-semibold mb-2">Join SwiftEdge Logistics</p>
          <span class="text-xs text-gray-500 dark:text-gray-300 mb-2">Your journey to seamless delivery starts here.</span>
        </div>
        <form id="signupForm" class="space-y-5">
          <div class="relative">
            <i class="fa-solid fa-user absolute left-3 top-3 text-primary-dark dark:text-accent-soft"></i>
            <input type="text" name="full_name" autocomplete="name" placeholder="Full Name" class="input input-bordered w-full pl-10 py-3 font-semibold focus:ring-2 focus:ring-accent-soft dark:focus:ring-primary-dark transition-all" required />
          </div>
          <div class="relative">
            <i class="fa-solid fa-envelope absolute left-3 top-3 text-primary-dark dark:text-accent-soft"></i>
            <input type="email" name="email" autocomplete="email" placeholder="Email Address" class="input input-bordered w-full pl-10 py-3 font-semibold focus:ring-2 focus:ring-accent-soft dark:focus:ring-primary-dark transition-all" required />
          </div>
          <div class="relative">
            <i class="fa-solid fa-phone absolute left-3 top-3 text-primary-dark dark:text-accent-soft"></i>
            <input type="tel" name="phone" autocomplete="tel" placeholder="Phone Number" class="input input-bordered w-full pl-10 py-3 font-semibold focus:ring-2 focus:ring-accent-soft dark:focus:ring-primary-dark transition-all" required />
          </div>
          <div class="relative">
            <i class="fa-solid fa-lock absolute left-3 top-3 text-primary-dark dark:text-accent-soft"></i>
            <input type="password" name="password" autocomplete="new-password" placeholder="Password" class="input input-bordered w-full pl-10 py-3 font-semibold focus:ring-2 focus:ring-accent-soft dark:focus:ring-primary-dark transition-all" required />
          </div>
          <div class="relative">
            <i class="fa-solid fa-lock absolute left-3 top-3 text-primary-dark dark:text-accent-soft"></i>
            <input type="password" name="confirm_password" autocomplete="new-password" placeholder="Confirm Password" class="input input-bordered w-full pl-10 py-3 font-semibold focus:ring-2 focus:ring-accent-soft dark:focus:ring-primary-dark transition-all" required />
          </div>
          <div>
            <label class="block text-sm mb-1 font-bold text-primary-dark dark:text-accent-soft">Account Type</label>
            <select name="role" class="input input-bordered w-full py-3 font-semibold focus:ring-2 focus:ring-accent-soft dark:focus:ring-primary-dark transition-all" required>
              <option value="user">Customer</option>
              <option value="trader">Vendor</option>
            </select>
          </div>
          <label class="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" name="terms" class="checkbox accent-primary-dark dark:accent-accent-soft" required />
            <span>I agree to the <a href="/terms" data-nav class="text-accent-dark dark:text-accent-soft hover:underline font-bold">Terms & Privacy</a></span>
          </label>
          <button type="submit" class="btn btn-primary w-full flex items-center justify-center gap-2 text-lg font-bold py-3 bg-gradient-to-r from-primary-dark to-accent-soft text-white shadow-lg hover:scale-105 transition-transform active:scale-95" id="signupBtn">
            <i class="fa-solid fa-user-plus"></i>
            <span>Sign Up</span>
            <span id="spinner" style="display:none;">${GlobeSpinner({ size: 24, color: "#0d9488" })}</span>
          </button>
          <div class="mt-2 text-center">
            <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Already have an account?</span>
            <a href="/user/login" class="text-accent-dark dark:text-accent-soft hover:underline text-sm ml-2 font-bold" data-nav>Login</a>
          </div>
        </form>
        <div id="otpSection" class="hidden mt-6">
          <h3 class="text-lg font-semibold mb-2 text-primary-dark dark:text-accent-soft">Enter OTP</h3>
          <input type="text" id="otpInput" maxlength="6" class="input input-bordered w-full mb-2 py-3 font-semibold focus:ring-2 focus:ring-accent-soft dark:focus:ring-primary-dark" placeholder="6-digit OTP" />
          <button id="verifyOtpBtn" class="btn btn-accent w-full font-bold py-3 bg-gradient-to-r from-accent-soft to-primary-dark text-white">Verify OTP</button>
          <button id="resendOtpBtn" class="btn btn-link w-full mt-2 font-bold text-primary-dark dark:text-accent-soft">Resend OTP</button>
        </div>
        <div class="mt-8 text-center text-xs text-gray-400 dark:text-gray-500">
          <span>SwiftEdge Logistics &copy; ${new Date().getFullYear()} &mdash; Trusted by thousands.</span>
        </div>
      </div>
    </div>
    `,
    pageEvents,
  };
};

export default signup;