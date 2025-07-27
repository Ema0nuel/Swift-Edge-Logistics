import Navbar from "./components/navbar";
import { reset } from "../../utils/reset";
import { GlobeSpinner } from "../../components/GlobeSpinner";
import { calculateCost, uploadImage } from "./function/prepareHandler";
import dayjs from "dayjs";
import { supabase } from "../../utils/supabaseClient";
import toastr from "../../utils/toastr";
import { checkSession } from "./function/checkSession";

const heroBg = "https://www.wowtheme7.com/tf/transpro/assets/version-2/img/slide-v3/item-03.png";
const illustrationImg = "https://www.dhl.com/content/experience-fragments/dhl/en/dgf/top_product_teaser/image_right_3_rows/dgf_aspa_euro_dgf_homepage_products_and_solutions/_jcr_content/root/container_copy/container_copy/image.coreimg.80.1197.jpeg/1655732496462/shipping-methods-graphic-0001.jpeg";

function preparePageInputsForDarkTheme() {
  function applyInputStyles() {
    const isDark = document.documentElement.classList.contains('dark') ||
      document.body.classList.contains('dark');
    if (isDark) {
      document.querySelectorAll('input, textarea, select').forEach(el => {
        el.classList.add('dark:text-white');
      });
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyInputStyles);
  } else {
    applyInputStyles();
  }
}

const shipmentTypes = [
  "Air Freight",
  "Ocean Freight",
  "Rail Freight",
  "Road Freight"
];

const courierCompanies = [
  "DHL Express",
  "FedEx",
  "UPS",
  "Maersk",
  "DB Schenker",
  "Kuehne + Nagel",
  "C.H. Robinson",
  "XPO Logistics",
  "Nippon Express",
  "Blue Dart",
  "Aramex",
  "YRC Worldwide"
];

const itemCategories = [
  "Electronics",
  "Documents",
  "Clothing",
  "Food",
  "Automobile",
  "Furniture",
  "Machinery",
  "Other"
];

const deliveryDurations = [
  { value: "24", label: "24 Hours" },
  { value: "72", label: "3 Days" },
  { value: "168", label: "7 Days" },
  { value: "336", label: "2 Weeks" },
  { value: "720", label: "1 Month" },
  { value: "2160", label: "3 Months" }
];

const prepare = async () => {
  if (!(await checkSession())) return;
  const { html: navbarHtml, pageEvents: navbarEvents } = Navbar("prepare");

  const html = /* html */`
    <div class="min-h-screen bg-[#1e293b] dark:bg-background-dark transition-colors duration-300 bg-cover bg-center"
      style="background-image: url('${heroBg}'); background-blend-mode: multiply;">
      ${navbarHtml}
      <main id="prepare-main" class="container mx-auto px-4 py-12 max-w-6xl">
        <section class="relative w-full h-72 md:h-96 flex items-center justify-center overflow-hidden rounded-3xl shadow-2xl mb-12"
          style="background: url('${heroBg}') center/cover no-repeat, #1e293b;">
          <div class="absolute inset-0 bg-gradient-to-b from-black/60 to-background-dark/90"></div>
          <div class="relative z-10 flex flex-col items-center justify-center w-full h-full">
            <img src="${illustrationImg}" alt="Delivery Illustration" class="h-40 w-auto mb-4 rounded-2xl shadow-2xl" />
            <h1 class="text-6xl md:text-7xl font-extrabold text-white drop-shadow-2xl mb-4">Prepare Your Delivery</h1>
            <p class="text-2xl text-accent mt-2 font-semibold">Get a quote, schedule, and track your package</p>
          </div>
        </section>
        <form id="prepare-form" class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 space-y-10">
          <h2 class="text-3xl font-bold text-primary dark:text-accent mb-6 text-center">Sender Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label class="block font-semibold mb-2 text-lg">Your Name/Company</label>
              <input type="text" name="sender_name" class="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-lg" required />
            </div>
            <div>
              <label class="block font-semibold mb-2 text-lg">Your Email</label>
              <input type="email" name="sender_email" class="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-lg" required />
            </div>
            <div>
              <label class="block font-semibold mb-2 text-lg">Your Phone</label>
              <input type="tel" name="sender_phone" class="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-lg" required />
            </div>
            <div>
              <label class="block font-semibold mb-2 text-lg">Pickup Address</label>
              <input type="text" name="origin" id="origin-address" class="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-lg" required />
            </div>
          </div>
          <h2 class="text-3xl font-bold text-primary dark:text-accent mb-6 text-center">Receiver Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label class="block font-semibold mb-2 text-lg">Receiver Name/Company</label>
              <input type="text" name="receiver_name" class="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-lg" required />
            </div>
            <div>
              <label class="block font-semibold mb-2 text-lg">Receiver Phone</label>
              <input type="tel" name="receiver_phone" class="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-lg" required />
            </div>
            <div>
              <label class="block font-semibold mb-2 text-lg">Receiver Email</label>
              <input type="email" name="email" class="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-lg" required />
            </div>
            <div>
              <label class="block font-semibold mb-2 text-lg">Country</label>
              <input type="text" name="country" class="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-lg" required />
            </div>
            <div>
              <label class="block font-semibold mb-2 text-lg">State</label>
              <input type="text" name="state" class="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-lg" required />
            </div>
            <div>
              <label class="block font-semibold mb-2 text-lg">Region</label>
              <input type="text" name="region" class="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-lg" />
            </div>
            <div>
              <label class="block font-semibold mb-2 text-lg">City/Town</label>
              <input type="text" name="city" class="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-lg" required />
            </div>
            <div>
              <label class="block font-semibold mb-2 text-lg">Delivery Address</label>
              <input type="text" name="receiver_address" id="delivery-address" class="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-lg" required />
            </div>
            <div>
              <label class="block font-semibold mb-2 text-lg">Zipcode</label>
              <input type="text" name="zipcode" class="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-lg" required />
            </div>
          </div>
          <h2 class="text-3xl font-bold text-primary dark:text-accent mb-6 text-center">Delivery Details</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label class="block font-semibold mb-2 text-lg">Delivery Duration</label>
              <select name="delivery_duration" class="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-lg">
                ${deliveryDurations.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join("")}
              </select>
            </div>
            <div>
              <label class="block font-semibold mb-2 text-lg">Item Type/Category</label>
              <select name="item_category" class="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-lg">
                ${itemCategories.map(cat => `<option value="${cat.toLowerCase()}">${cat}</option>`).join("")}
              </select>
            </div>
            <div>
              <label class="block font-semibold mb-2 text-lg">Quantity</label>
              <input type="number" name="quantity" min="1" class="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-lg" required />
            </div>
            <div>
              <label class="block font-semibold mb-2 text-lg">Weight (kg)</label>
              <input type="number" name="weight" min="0.1" step="0.1" class="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-lg" />
            </div>
            <div>
              <label class="block font-semibold mb-2 text-lg">Shipment Type</label>
              <select name="shipment_type" class="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-lg">
                ${shipmentTypes.map(type => `<option value="${type}">${type}</option>`).join("")}
              </select>
            </div>
            <div>
              <label class="block font-semibold mb-2 text-lg">Courier Company</label>
              <select name="courier_company" class="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-lg">
                ${courierCompanies.map(comp => `<option value="${comp}">${comp}</option>`).join("")}
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="block font-semibold mb-2 text-lg">Delivery Instructions</label>
              <textarea name="instructions" rows="2" class="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-lg"></textarea>
            </div>
            <div class="md:col-span-2">
              <label class="block font-semibold mb-2 text-lg">Upload Item Image</label>
              <input type="file" name="item_image" accept="image/*" class="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-lg" />
            </div>
          </div>
          <div id="pricing-box" class="bg-peach dark:bg-background-dark rounded-lg p-4 mt-6 text-center text-lg font-bold text-primary dark:text-accent shadow-inner"></div>
          <button type="submit" class="w-full py-4 mt-4 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-accent transition-all duration-300 flex items-center justify-center gap-2">
            <span id="spinner" class="hidden">${GlobeSpinner({ size: 24 })}</span>
            <span id="submit-text">Submit Delivery Request</span>
          </button>
        </form>
        <div id="prepare-modal" class="fixed inset-0 flex items-center justify-center z-[99999] bg-black bg-opacity-50 hidden">
          <div class="bg-white dark:bg-background-dark p-6 rounded-lg shadow-xl max-w-md w-full relative">
            <button id="close-modal-btn" class="absolute top-2 right-2 text-xl text-text-subtle hover:text-accent">&times;</button>
            <h3 class="text-xl font-bold mb-2">Confirm Delivery Request</h3>
            <form id="confirm-form" class="space-y-4">
              <input type="email" name="email" placeholder="Email" required class="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" />
              <input type="password" name="password" placeholder="Password" required class="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" />
              <button type="submit" class="w-full py-3 bg-accent text-primary font-bold rounded-lg shadow-md hover:bg-accent-soft transition-all duration-300">Confirm</button>
            </form>
          </div>
        </div>
        <div id="tracking-modal" class="fixed inset-0 flex items-center justify-center z-[99999] bg-black bg-opacity-50 hidden">
          <div class="bg-white dark:bg-background-dark p-6 rounded-lg shadow-xl max-w-md w-full relative">
            <button id="close-tracking-modal-btn" class="absolute top-2 right-2 text-xl text-text-subtle hover:text-accent">&times;</button>
            <h3 class="text-xl font-bold mb-2">Your Tracking ID</h3>
            <div id="tracking-id-box" class="text-lg font-mono bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4"></div>
            <button id="copy-tracking-btn" class="w-full py-3 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-accent transition-all duration-300">Copy Tracking ID</button>
          </div>
        </div>
      </main>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
      <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
    </div>
  `;

  function pageEvents(onNavigate = () => { }) {
    navbarEvents(onNavigate);
    reset("Prepare Delivery");
    preparePageInputsForDarkTheme();

    // Google Places Autocomplete for both addresses
    if (window.google && window.google.maps) {
      const input1 = document.getElementById('delivery-address');
      const input2 = document.getElementById('origin-address');
      if (input1) {
        new window.google.maps.places.Autocomplete(input1, {
          types: ['geocode'],
          componentRestrictions: { country: 'us' }
        });
      }
      if (input2) {
        new window.google.maps.places.Autocomplete(input2, {
          types: ['geocode'],
          componentRestrictions: { country: 'us' }
        });
      }
    } else {
      window.initGoogleAutocomplete = () => {
        const input1 = document.getElementById('delivery-address');
        const input2 = document.getElementById('origin-address');
        if (input1 && window.google && window.google.maps) {
          new window.google.maps.places.Autocomplete(input1, {
            types: ['geocode'],
            componentRestrictions: { country: 'us' }
          });
        }
        if (input2 && window.google && window.google.maps) {
          new window.google.maps.places.Autocomplete(input2, {
            types: ['geocode'],
            componentRestrictions: { country: 'us' }
          });
        }
      };
      window.addEventListener('load', window.initGoogleAutocomplete);
    }

    const pricingBox = document.getElementById("pricing-box");
    const form = document.getElementById("prepare-form");
    const spinner = document.getElementById("spinner");
    const submitText = document.getElementById("submit-text");

    form.addEventListener("input", async () => {
      const data = Object.fromEntries(new FormData(form));
      const cost = await calculateCost(data);
      pricingBox.innerHTML = `Estimated Delivery Cost: <span class="text-accent font-extrabold">$${cost.toLocaleString()}</span>`;
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      spinner.classList.remove("hidden");
      submitText.classList.add("opacity-50");
      const data = Object.fromEntries(new FormData(form));
      const cost = await calculateCost(data);

      // Upload image to Supabase Storage
      let imageUrl = "";
      const imageFile = form.item_image.files[0];
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // Show modal for email/password confirmation
      document.getElementById("prepare-modal").classList.remove("hidden");
      spinner.classList.add("hidden");
      submitText.classList.remove("opacity-50");

      document.getElementById("confirm-form").onsubmit = async (ev) => {
        ev.preventDefault();
        const email = ev.target.email.value;
        const password = ev.target.password.value;
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
        if (loginError) {
          toastr.error("Authentication failed");
          return;
        }
        // Generate OTP and send email (pseudo)
        const otp = Math.floor(100000 + Math.random() * 900000);
        await supabase.from("otps").insert({
          user_id: loginData.user.id,
          code: otp.toString(),
          type: "transaction",
          expires_at: dayjs().add(10, "minute").toISOString(),
        });
        toastr.success("Receipt sent to your email!");

        // Submit delivery, store receiver_email in shipments.email and receiver_address in shipments.receiver_address
        const shipmentData = {
          sender_id: loginData.user.id,
          receiver_name: data.receiver_name,
          receiver_address: data.receiver_address,
          receiver_phone: data.receiver_phone,
          origin: data.origin,
          destination: data.receiver_address, // destination is receiver_address
          package_description: data.instructions || "",
          weight: data.weight ? Number(data.weight) : null,
          cost,
          status: "processing",
          tracking_code: "TRK" + Math.floor(Math.random() * 1000000),
          email: data.email, // receiver email
          image_url: imageUrl || ""
        };
        const { error: shipmentError } = await supabase.from("shipments").insert([shipmentData]);
        if (shipmentError) {
          toastr.error("Failed to create delivery request");
        } else {
          toastr.success("Delivery request submitted!");
          document.getElementById("prepare-modal").classList.add("hidden");
          form.reset();
          pricingBox.innerHTML = "";
          // Show tracking modal
          document.getElementById("tracking-modal").classList.remove("hidden");
          document.getElementById("tracking-id-box").textContent = shipmentData.tracking_code;
        }
      };

      document.getElementById("close-modal-btn").onclick = () => {
        document.getElementById("prepare-modal").classList.add("hidden");
      };
    });

    // Tracking modal events
    document.getElementById("close-tracking-modal-btn").onclick = () => {
      document.getElementById("tracking-modal").classList.add("hidden");
    };
    document.getElementById("copy-tracking-btn").onclick = () => {
      const trackingId = document.getElementById("tracking-id-box").textContent;
      navigator.clipboard.writeText(trackingId);
      toastr.success("Tracking ID copied!");
    };
  }

  return { html, pageEvents };
};

export default prepare;