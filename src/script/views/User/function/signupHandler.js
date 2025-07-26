import { supabase } from "../../../utils/supabaseClient.js";
import toastr from "../../../utils/toastr.js";
import { sendEmail } from "../../../utils/send-email.js";

export function signupHandler() {
  const form = document.getElementById("signupForm");
  const spinner = document.getElementById("spinner");
  const signupBtn = document.getElementById("signupBtn");
  const otpSection = document.getElementById("otpSection");
  let userId = null,
    email = "";

  form.onsubmit = async (e) => {
    e.preventDefault();
    signupBtn.disabled = true;
    spinner.style.display = "inline-block";
    const full_name = form.full_name.value.trim();
    email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const password = form.password.value;
    const confirm_password = form.confirm_password.value;
    const role = form.role.value;
    const terms = form.terms.checked;

    // Client-side validation
    if (
      !full_name ||
      !email ||
      !phone ||
      !password ||
      !confirm_password ||
      !role
    ) {
      toastr.error("Please fill in all fields.");
      signupBtn.disabled = false;
      spinner.style.display = "none";
      return;
    }
    if (!terms) {
      toastr.error("You must agree to the Terms & Privacy.");
      signupBtn.disabled = false;
      spinner.style.display = "none";
      return;
    }
    if (password !== confirm_password) {
      toastr.error("Passwords do not match.");
      signupBtn.disabled = false;
      spinner.style.display = "none";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toastr.error("Invalid email format.");
      signupBtn.disabled = false;
      spinner.style.display = "none";
      return;
    }

    // Supabase Auth signup
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toastr.error(error.message || "Signup failed.");
      signupBtn.disabled = false;
      spinner.style.display = "none";
      return;
    }
    userId = data.user.id;

    // Insert profile
    await supabase.from("profiles").insert([
      {
        id: userId,
        full_name,
        phone,
        role,
        avatar_url: "",
        email,
      },
    ]);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    await supabase.from("otps").insert([
      {
        user_id: userId,
        code: otp,
        type: "signup",
        expires_at: expires,
      },
    ]);

    // Send welcome email with OTP
    await sendEmail({
      to: email,
      subject: "Welcome to SwiftEdge Logistics! Verify your account",
      html: `<h2>Welcome to SwiftEdge Logistics</h2>
        <p>Hi ${full_name},</p>
        <p>Your OTP code is: <b>${otp}</b></p>
        <p>This code expires in 10 minutes.</p>
        <p>Contact: Swiftedgelogistics01@gmail.com | +15022095647</p>`,
    });

    toastr.success("Signup successful! OTP sent to your email.");
    form.style.display = "none";
    otpSection.classList.remove("hidden");
    signupBtn.disabled = false;
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
      .eq("type", "signup")
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

    toastr.success("Account verified! Redirecting...");
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
        type: "signup",
        expires_at: expires,
      },
    ]);
    await sendEmail({
      to: email,
      subject: "Your SwiftEdge Logistics Signup OTP",
      html: `<h2>SwiftEdge Logistics</h2>
        <p>Your new OTP code is: <b>${otp}</b></p>
        <p>This code expires in 10 minutes.</p>`,
    });
    toastr.info("OTP resent to your email.");
  };
}
