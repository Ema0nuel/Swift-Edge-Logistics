import Navbar from "./components/navbar";
import { supabase } from "../../utils/supabaseClient";
import { reset } from "../../utils/reset";

// Get current user from Supabase Auth (like dashboard.js)
async function getCurrentUserId() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user?.id) return null;
  return data.user.id;
}

const viewCourier = async () => {
  reset("View Courier Products");
  const { html: navbarHtml, pageEvents: navbarEvents } = Navbar("view-courier");

  // Get logged-in user's id
  const userId = await getCurrentUserId();

  let productsHtml = "";
  if (!userId) {
    productsHtml = `<div class="text-center text-gray-600 mt-8">You must be logged in to view your shipments.</div>`;
  } else {
    // Fetch only this user's shipments using sender_id
    const { data: shipments } = await supabase
      .from("shipments")
      .select("*")
      .eq("sender_id", userId)
      .in("status", ["in-transit", "delivered", "processing"])
      .order("created_at", { ascending: false });

    if (!shipments || shipments.length === 0) {
      productsHtml = `<p class="text-center text-gray-600 mt-8">No products currently in transit.</p>`;
    } else {
      productsHtml = shipments.map((product) => {
        let statusColorClass;
        if (product.status === "delivered") {
          statusColorClass = "bg-green-200 text-green-800";
        } else if (product.status === "in-transit") {
          statusColorClass = "bg-blue-200 text-blue-800";
        } else {
          statusColorClass = "bg-yellow-200 text-yellow-800";
        }
        return `
          <div class="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 pb-16 relative">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">${product.receiver_name}</h3>
            <p class="text-sm text-gray-600 mb-3">Tracking ID: <span class="font-mono">${product.tracking_code}</span></p>
            <div class="flex items-center mb-2">
              <span class="px-3 py-1 rounded-full text-xs font-semibold ${statusColorClass}">
                ${product.status.charAt(0).toUpperCase() + product.status.slice(1)}
              </span>
            </div>
            <p class="text-gray-700"><strong>Origin:</strong> ${product.origin}</p>
            <p class="text-gray-700"><strong>Destination:</strong> ${product.destination}</p>
            <p class="text-gray-700"><strong>Receiver:</strong> ${product.receiver_name} (${product.receiver_phone})</p>
            <p class="text-gray-700"><strong>ETA:</strong> ${product.delivery_datetime ? new Date(product.delivery_datetime).toLocaleString() : "N/A"}</p>
          </div>
        `;
      }).join("");
    }
  }

  const html = `
    <div class="min-h-screen bg-[#1e293b]">
      ${navbarHtml}
      <main class="container mx-auto px-4 py-8 max-w-5xl">
        <h2 class="text-3xl font-bold text-indigo-700 mb-6 text-center">Products in Transit</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${productsHtml}
        </div>
      </main>
    </div>
  `;

  function pageEvents() {
    navbarEvents();
  }

  return { html, pageEvents };
};

export default viewCourier;