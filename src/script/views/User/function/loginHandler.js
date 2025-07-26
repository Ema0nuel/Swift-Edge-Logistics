import { supabase } from "../../../utils/supabaseClient.js";
import toastr from "../../../utils/toastr.js";
import { sendEmail } from "../../../utils/send-email.js";

export function loginHandler() {
  const form = document.getElementById("loginForm");
  const spinner = document.getElementById("spinner");
  const loginBtn = document.getElementById("loginBtn");
  const otpSection = document.getElementById("otpSection");
  let userId = null,
    email = "";

  form.onsubmit = async (e) => {
    e.preventDefault();
    loginBtn.disabled = true;
    spinner.style.display = "inline-block";
    email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      toastr.error("Please fill in all fields.");
      loginBtn.disabled = false;
      spinner.style.display = "none";
      return;
    }

    // Supabase Auth login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toastr.error(error.message || "Login failed.");
      loginBtn.disabled = false;
      spinner.style.display = "none";
      return;
    }
    userId = data.user.id;

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    await supabase.from("otps").insert([
      {
        user_id: userId,
        code: otp,
        type: "login",
        expires_at: expires,
      },
    ]);

    // Send OTP email
    await sendEmail({
      to: email,
      subject: "Your SwiftEdge Logistics Login OTP",
      html: `<h2>SwiftEdge Logistics</h2>
        <p>Your OTP code is: <b>${otp}</b></p>
        <p>This code expires in 10 minutes.</p>
        <p>If you did not request this, please ignore.</p>`,
    });

    toastr.info("OTP sent to your email.");
    form.style.display = "none";
    otpSection.classList.remove("hidden");
    loginBtn.disabled = false;
    spinner.style.display = "none";
  };

  document.getElementById("verifyOtpBtn").onclick = async () => {
    const otpInput = document.getElementById("otpInput").value.trim();
    if (!otpInput || otpInput.length !== 6) {
      toastr.error("Enter a valid 6-digit OTP.");
      return;
    }
    spinner.style.display = "inline-block";
    // Validate OTP
    const { data, error } = await supabase
      .from("otps")
      .select("*")
      .eq("user_id", userId)
      .eq("code", otpInput)
      .eq("type", "login")
      .eq("is_used", false)
      .gte("expires_at", new Date().toISOString())
      .single();

    if (error || !data) {
      toastr.error("Invalid or expired OTP.");
      spinner.style.display = "none";
      return;
    }
    // Mark OTP as used
    await supabase.from("otps").update({ is_used: true }).eq("id", data.id);

    toastr.success("Login successful!");
    setTimeout(() => (window.location.href = "/dashboard"), 1200);
  };

  document.getElementById("resendOtpBtn").onclick = async () => {
    // Resend OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    await supabase.from("otps").insert([
      {
        user_id: userId,
        code: otp,
        type: "login",
        expires_at: expires,
      },
    ]);
    await sendEmail({
      to: email,
      subject: "Your SwiftEdge Logistics Login OTP",
      html: `<h2>SwiftEdge Logistics</h2>
        <p>Your new OTP code is: <b>${otp}</b></p>
        <p>This code expires in 10 minutes.</p>`,
    });
    toastr.info("OTP resent to your email.");
  };
}
