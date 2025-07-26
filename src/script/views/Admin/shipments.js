import { supabase } from "../../utils/supabaseClient";
import Navbar from "./components/navbar.js";
import { reset } from "../../utils/reset.js";
import dayjs from "dayjs";
import toastr from "../../utils/toastr";
import { sendEmail } from "../../utils/send-email";
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { transform, transformExtent } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import LineString from 'ol/geom/LineString';
import { Stroke } from 'ol/style';
import packageIcon from "../../../images/package-icon.png";

// --- Geocoding Helper ---
async function reverseGeocode(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.display_name) {
            return data.display_name;
        }
    } catch (err) {}
    return `${lat},${lon}`;
}

// --- Geocode Helper: Convert location name to lat/lon ---
async function geocodeLocation(locationName) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}&limit=1`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.length > 0) {
            return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        }
    } catch (err) {}
    return null;
}

function parseLatLon(location) {
    let [a, b] = location.split(',').map(Number);
    return [a, b];
}

// --- Spinner ---
function showSpinner() {
    if (document.getElementById("spinnerOverlay")) return;
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

// --- Data Fetch ---
async function fetchShipments(status = "") {
    let query = supabase
        .from("shipments")
        .select("*")
        .order("created_at", { ascending: false });
    if (status) query = query.eq("status", status);
    const { data, error } = await query;
    if (error) {
        toastr.error("Failed to fetch shipments: " + error.message);
        return [];
    }
    return data || [];
}

async function fetchShipmentDetails(id) {
    showSpinner();
    const { data: shipment, error } = await supabase
        .from("shipments")
        .select("*")
        .eq("id", id)
        .single();
    const { data: updates } = await supabase
        .from("tracking_updates")
        .select("*")
        .eq("shipment_id", id)
        .order("updated_at", { ascending: true });
    // Get sender and receiver profiles for email
    let sender = null, receiver = null;
    if (shipment?.sender_id) {
        const { data: profile } = await supabase
            .from("profiles")
            .select("email, full_name")
            .eq("id", shipment.sender_id)
            .single();
        sender = profile;
    }
    if (shipment?.receiver_id) {
        const { data: profile } = await supabase
            .from("profiles")
            .select("email, full_name")
            .eq("id", shipment.receiver_id)
            .single();
        receiver = profile;
    }
    hideSpinner();
    return { shipment, updates: updates || [], sender, receiver };
}

// --- Map Logic (OpenLayers) ---
const WAREHOUSE_LOCATION = [40.7127281, -74.0060152];

async function renderTrackingMap(containerId, updates) {
    const points = [
        WAREHOUSE_LOCATION,
        ...updates
            .map(u => parseLatLon(u.location))
            .filter(([lat, lon]) => !isNaN(lat) && !isNaN(lon))
    ];

    const center = points.length > 1 ? points[points.length - 1] : WAREHOUSE_LOCATION;
    const centerWebMercator = transform([center[1], center[0]], 'EPSG:4326', 'EPSG:3857');

    document.getElementById(containerId).innerHTML = "";

    const map = new Map({
        target: containerId,
        layers: [
            new TileLayer({ source: new OSM() })
        ],
        view: new View({
            center: centerWebMercator,
            zoom: 10
        })
    });

    if (points.length > 1) {
        const lineCoords = points.map(([lat, lon]) => transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
        const line = new Feature({
            geometry: new LineString(lineCoords)
        });
        line.setStyle(new Style({
            stroke: new Stroke({ color: '#4285f4', width: 3 })
        }));
        const vectorSource = new VectorSource({ features: [line] });
        const vectorLayer = new VectorLayer({ source: vectorSource });
        map.addLayer(vectorLayer);
    }

    for (let idx = 0; idx < points.length; idx++) {
        const pt = points[idx];
        let popupText = idx === 0 ? "Warehouse (New York)" : `Checkpoint #${idx}`;
        let locationName = popupText;
        if (idx > 0) {
            locationName = await reverseGeocode(pt[0], pt[1]);
            popupText = `Update: ${locationName}`;
        }
        const marker = new Feature({
            geometry: new Point(transform([pt[1], pt[0]], 'EPSG:4326', 'EPSG:3857'))
        });
        marker.setStyle(new Style({
            image: new Icon({
                src: idx === 0
                    ? "https://cdn-icons-png.flaticon.com/512/684/684908.png"
                    : "https://cdn.jsdelivr.net/npm/ol@v7.4.0/examples/data/icon.png",
                scale: idx === 0 ? 0.08 : 0.07,
                anchor: [0.5, 1]
            })
        }));
        marker.set('popup', popupText);
        const vectorSource = new VectorSource({ features: [marker] });
        const vectorLayer = new VectorLayer({ source: vectorSource });
        map.addLayer(vectorLayer);

        map.on('singleclick', function (evt) {
            map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                const popup = document.createElement('div');
                popup.className = 'ol-popup';
                popup.style.background = '#fff';
                popup.style.padding = '8px 12px';
                popup.style.borderRadius = '8px';
                popup.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
                popup.innerHTML = feature.get('popup');
                const overlay = document.createElement('div');
                overlay.style.position = 'absolute';
                overlay.style.left = evt.pixel[0] + 'px';
                overlay.style.top = evt.pixel[1] + 'px';
                overlay.appendChild(popup);
                document.getElementById(containerId).appendChild(overlay);
                setTimeout(() => overlay.remove(), 2500);
            });
        });
    }

    if (points.length > 1) {
        const extent = [
            Math.min(...points.map(pt => pt[1])),
            Math.min(...points.map(pt => pt[0])),
            Math.max(...points.map(pt => pt[1])),
            Math.max(...points.map(pt => pt[0]))
        ];
        map.getView().fit(transformExtent(extent, 'EPSG:4326', 'EPSG:3857'), { padding: [40, 40, 40, 40] });
    }
}

// --- Email Map Helper ---
function generateMapImageUrl(lat, lon) {
    return `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lon}&zoom=13&size=600x300&markers=${lat},${lon},red-pushpin`;
}

// --- Add Tracking Update and Send Email to Sender & Receiver ---
async function addLiveTrackingUpdateAndNotify(shipmentId, location, status, note) {
    showSpinner();
    await supabase.from("tracking_updates").insert([{
        shipment_id: shipmentId,
        location,
        status,
        note,
    }]);
    const { shipment, updates, sender, receiver } = await fetchShipmentDetails(shipmentId);
    hideSpinner();

    // Prepare email details
    let locationDisplay = location;
    let mapImg = "";
    let lat = null, lon = null;
    if (location.match(/^-?\d+\.\d+,-?\d+\.\d+$/)) {
        [lat, lon] = parseLatLon(location);
        locationDisplay = await reverseGeocode(lat, lon);
        mapImg = `<img src="${generateMapImageUrl(lat, lon)}" alt="Location Map" style="width:100%;max-width:600px;border-radius:8px;margin-top:12px;" />`;
    }
    const subject = `Package Update: ${shipment.tracking_code}`;
    const html = `
        <div style="font-family:Arial,sans-serif;">
            <h2 style="color:#2d3748;">Swift Edge Logistics - Package Update</h2>
            <p>Hello,</p>
            <p>Your package <b>${shipment.tracking_code}</b> (${shipment.package_description}) has a new update:</p>
            <ul>
                <li><b>Status:</b> ${status}</li>
                <li><b>Location:</b> ${locationDisplay}</li>
                <li><b>Note:</b> ${note || "No note"}</li>
                <li><b>Time:</b> ${dayjs().format("MMM D, YYYY HH:mm")}</li>
                <li><b>Receiver:</b> ${shipment.receiver_name} (${shipment.receiver_address})</li>
            </ul>
            ${mapImg}
            <p>Track your package anytime at <a href="https://www.swiftedgelogistics.com/track">SwiftEdge Logistics</a>.</p>
            <p style="margin-top:24px;color:#718096;">Swift Edge Logistics Team</p>
        </div>
    `;
    // Send to sender
    if (sender?.email) {
        try {
            await sendEmail({ to: sender.email, subject, html });
            toastr.success("Email notification sent to sender!");
        } catch (err) {
            toastr.error("Failed to send email to sender.");
        }
    }
    // Send to receiver
    if (receiver?.email) {
        try {
            await sendEmail({ to: receiver.email, subject, html });
            toastr.success("Email notification sent to receiver!");
        } catch (err) {
            toastr.error("Failed to send email to receiver.");
        }
    }
    toastr.success("Live tracking updated!");
}

// --- Main UI ---
const shipments = async () => {
    reset("Delivery Management");
    const { html: navbarHtml, pageEvents: navbarEvents } = Navbar();

    let shipmentsList = await fetchShipments();

    function renderMain() {
        const html = `
      <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex">
        ${navbarHtml}
        <div class="flex-1 ml-0 sm:ml-64 h-screen overflow-y-auto transition-all duration-300">
          <main class="p-4 md:p-8 max-w-7xl mx-auto animate-fadeIn">
            <div class="flex items-center justify-between mb-8 animate-slideDown">
              <h1 class="text-3xl font-bold text-white">🚚 Delivery Management</h1>
              <button id="createShipmentBtn" class="px-4 py-2 rounded bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:scale-105 transition-all">
                Create Shipment
              </button>
            </div>
            <div class="mb-6 flex gap-4">
              <select id="statusFilter" class="input input-bordered max-w-xs py-2 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all">
                <option value="">All Status</option>
                <option value="processing">Processing</option>
                <option value="approved">Approved</option>
                <option value="in-transit">In-Transit</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <input type="text" id="searchInput" class="input input-bordered max-w-xs py-2 px-4 rounded-lg" placeholder="Search by tracking code..." />
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full bg-white/10 rounded-xl border border-white/20 text-white shadow-lg">
                <thead>
                  <tr>
                    <th class="px-4 py-2">Tracking</th>
                    <th class="px-4 py-2">Receiver</th>
                    <th class="px-4 py-2">Status</th>
                    <th class="px-4 py-2">Location</th>
                    <th class="px-4 py-2">Cost</th>
                    <th class="px-4 py-2">Created</th>
                    <th class="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody id="shipmentsTableBody">
                  ${shipmentsList.map(s => `
                    <tr class="hover:bg-white/20 transition-all cursor-pointer" data-shipment-id="${s.id}">
                      <td class="px-4 py-2 font-bold">${s.tracking_code}</td>
                      <td class="px-4 py-2">${s.receiver_name}</td>
                      <td class="px-4 py-2">
                        <span class="status-badge px-2 py-1 rounded-full text-xs font-medium
                          ${s.status === "delivered" ? "bg-green-500/20 text-green-400" :
                s.status === "in-transit" ? "bg-blue-500/20 text-blue-400" :
                    s.status === "processing" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-red-500/20 text-red-400"}">
                          ${s.status}
                        </span>
                      </td>
                      <td class="px-4 py-2">${s.destination}</td>
                      <td class="px-4 py-2">$${s.cost}</td>
                      <td class="px-4 py-2">${dayjs(s.created_at).format("MMM D, YYYY")}</td>
                      <td class="px-4 py-2 flex gap-2">
                        <button class="detailsShipmentBtn px-2 py-1 rounded bg-blue-600 text-white transition-all hover:bg-blue-700" title="Details">Details</button>
                        <button class="editShipmentBtn px-2 py-1 rounded bg-yellow-600 text-white transition-all hover:bg-yellow-700" title="Edit">Edit</button>
                        <button class="approveShipmentBtn px-2 py-1 rounded bg-green-600 text-white transition-all hover:bg-green-700" title="Approve">Approve</button>
                        <button class="trackShipmentBtn px-2 py-1 rounded bg-purple-600 text-white transition-all hover:bg-purple-700" title="Track">Track</button>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
            <div id="createShipmentModal" class="fixed inset-0 bg-black/60 hidden items-center justify-center z-50 flex">
              <div class="bg-white rounded-xl p-8 w-full max-w-md shadow-lg relative animate-slideIn overflow-auto" style="max-height:90vh;">
                <button id="closeModalBtn" class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl">×</button>
                <h2 class="text-2xl font-bold mb-4 text-gray-800">Create Shipment</h2>
                <form id="createShipmentForm" class="space-y-4">
                  <input type="text" name="sender_id" placeholder="Sender User ID" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
                  <input type="text" name="receiver_id" placeholder="Receiver User ID" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
                  <input type="text" name="receiver_name" placeholder="Receiver Name" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
                  <input type="text" name="receiver_address" placeholder="Receiver Address" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
                  <input type="tel" name="receiver_phone" placeholder="Receiver Phone" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
                  <input type="text" name="origin" placeholder="Origin" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
                  <input type="text" name="destination" placeholder="Destination" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
                  <input type="text" name="package_description" placeholder="Package Description" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
                  <input type="number" name="weight" placeholder="Weight (kg)" class="input input-bordered w-full py-2 px-4 rounded-lg" />
                  <input type="number" name="cost" placeholder="Cost ($)" class="input input-bordered w-full py-2 px-4 rounded-lg" />
                  <input type="text" name="image_url" placeholder="Image URL" class="input input-bordered w-full py-2 px-4 rounded-lg" />
                  <button type="submit" class="btn btn-primary w-full py-2 font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white">Create Shipment</button>
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
        .ol-popup { font-size: 1rem; pointer-events: none; z-index: 1000; }
      </style>
    `;
        document.querySelector("#app").innerHTML = html;
        mainEvents();
    }

    // --- Modals ---
    async function renderEditShipmentModal(shipmentId) {
        showSpinner();
        const { shipment } = await fetchShipmentDetails(shipmentId);
        hideSpinner();
        const modalHtml = `
      <div id="editShipmentModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-8 w-full max-w-md shadow-lg relative animate-slideIn overflow-auto" style="max-height:90vh;">
          <button id="closeEditModalBtn" class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl">×</button>
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Edit Shipment</h2>
          <form id="editShipmentForm" class="space-y-4">
            <input type="text" name="receiver_name" value="${shipment.receiver_name}" placeholder="Receiver Name" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
            <input type="text" name="receiver_address" value="${shipment.receiver_address}" placeholder="Receiver Address" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
            <input type="tel" name="receiver_phone" value="${shipment.receiver_phone}" placeholder="Receiver Phone" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
            <input type="text" name="origin" value="${shipment.origin}" placeholder="Origin" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
            <input type="text" name="destination" value="${shipment.destination}" placeholder="Destination" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
            <input type="text" name="package_description" value="${shipment.package_description}" placeholder="Package Description" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
            <input type="number" name="weight" value="${shipment.weight || ""}" placeholder="Weight (kg)" class="input input-bordered w-full py-2 px-4 rounded-lg" />
            <input type="number" name="cost" value="${shipment.cost || ""}" placeholder="Cost ($)" class="input input-bordered w-full py-2 px-4 rounded-lg" />
            <input type="text" name="image_url" value="${shipment.image_url || ""}" placeholder="Image URL" class="input input-bordered w-full py-2 px-4 rounded-lg" />
            <button type="submit" class="btn btn-primary w-full py-2 font-bold bg-gradient-to-r from-yellow-500 to-yellow-700 text-white">Update Shipment</button>
          </form>
        </div>
      </div>
    `;
        document.body.insertAdjacentHTML("beforeend", modalHtml);

        document.getElementById("closeEditModalBtn")?.addEventListener("click", () => {
            document.getElementById("editShipmentModal")?.remove();
        });

        document.getElementById("editShipmentForm")?.addEventListener("submit", async (e) => {
            e.preventDefault();
            const form = e.target;
            const success = await editShipment(form, shipmentId);
            if (success) {
                document.getElementById("editShipmentModal")?.remove();
                shipmentsList = await fetchShipments();
                renderMain();
            }
        });
    }

    async function renderLiveTrackingModal(shipmentId) {
        showSpinner();
        const { shipment, updates } = await fetchShipmentDetails(shipmentId);
        hideSpinner();

        async function getLocationDisplay(location) {
            if (location && location.match(/^-?\d+\.\d+,-?\d+\.\d+$/)) {
                const [lat, lon] = parseLatLon(location);
                return await reverseGeocode(lat, lon);
            }
            return location;
        }

        let historyHtml = "";
        for (const u of updates) {
            const locationDisplay = await getLocationDisplay(u.location);
            historyHtml += `
                <div class="p-2 rounded bg-gray-100 text-gray-800 flex justify-between items-center mb-1">
                  <span>${locationDisplay}</span>
                  <span class="text-blue-600">${u.status}</span>
                  <span class="text-xs text-gray-400">${dayjs(u.updated_at).format("MMM D, HH:mm")}</span>
                </div>
            `;
        }

        const modalHtml = `
      <div id="liveTrackingModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-8 w-full max-w-lg shadow-lg relative animate-slideIn overflow-auto" style="max-height:90vh;">
          <button id="closeLiveTrackingModalBtn" class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl">×</button>
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Live Tracking - ${shipment.tracking_code}</h2>
          <div id="liveMapContainer" style="height: 300px;" class="mb-4 rounded-lg overflow-hidden"></div>
          <form id="liveTrackingForm" class="space-y-4">
            <input type="text" name="location" placeholder="Current Location (name or lat,lon)" class="input input-bordered w-full py-2 px-4 rounded-lg" required />
            <select name="status" class="input input-bordered w-full py-2 px-4 rounded-lg" required>
              <option value="processing" ${shipment.status === "processing" ? "selected" : ""}>Processing</option>
              <option value="in-transit" ${shipment.status === "in-transit" ? "selected" : ""}>In-Transit</option>
              <option value="delivered" ${shipment.status === "delivered" ? "selected" : ""}>Delivered</option>
              <option value="cancelled" ${shipment.status === "cancelled" ? "selected" : ""}>Cancelled</option>
            </select>
            <input type="text" name="note" placeholder="Note (optional)" class="input input-bordered w-full py-2 px-4 rounded-lg" />
            <button type="submit" class="btn btn-primary w-full py-2 font-bold bg-gradient-to-r from-purple-600 to-purple-700 text-white">Update Tracking</button>
          </form>
          <div class="mt-6">
            <h3 class="text-lg font-bold mb-2 text-gray-800">Tracking History</h3>
            <div class="tracking-history overflow-y-auto max-h-32">
              ${historyHtml || "<div class='text-gray-400'>No updates.</div>"}
            </div>
          </div>
        </div>
      </div>
    `;
        document.body.insertAdjacentHTML("beforeend", modalHtml);

        setTimeout(() => {
            renderTrackingMap('liveMapContainer', updates);
        }, 100);

        document.getElementById("closeLiveTrackingModalBtn")?.addEventListener("click", () => {
            document.getElementById("liveTrackingModal")?.remove();
        });

        document.getElementById("liveTrackingForm")?.addEventListener("submit", async (e) => {
            e.preventDefault();
            const form = e.target;
            let locationInput = form.location.value.trim();
            let coords;
            if (!locationInput.match(/^-?\d+\.\d+,-?\d+\.\d+$/)) {
                coords = await geocodeLocation(locationInput);
                if (!coords) {
                    toastr.error("Location not found!");
                    return;
                }
                locationInput = `${coords[0]},${coords[1]}`;
            }
            const status = form.status.value;
            const note = form.note.value.trim();
            await addLiveTrackingUpdateAndNotify(shipmentId, locationInput, status, note);
            document.getElementById("liveTrackingModal")?.remove();
            shipmentsList = await fetchShipments();
            renderMain();
        });
    }

    async function renderShipmentDetails(shipmentId) {
        showSpinner();
        const { shipment, updates } = await fetchShipmentDetails(shipmentId);
        hideSpinner();

        async function getLocationDisplay(location) {
            if (location && location.match(/^-?\d+\.\d+,-?\d+\.\d+$/)) {
                const [lat, lon] = parseLatLon(location);
                return await reverseGeocode(lat, lon);
            }
            return location;
        }

        let historyHtml = "";
        for (const u of updates) {
            const locationDisplay = await getLocationDisplay(u.location);
            historyHtml += `
                <div class="p-3 rounded bg-white/5 text-white flex justify-between items-center">
                    <span>${locationDisplay}</span>
                    <span class="text-blue-400">${u.status}</span>
                    <span class="text-xs text-gray-400">${dayjs(u.updated_at).format("MMM D, HH:mm")}</span>
                </div>
            `;
        }

        const html = `
      <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex">
        ${navbarHtml}
        <div class="flex-1 ml-0 sm:ml-64 h-screen overflow-y-auto transition-all duration-300">
          <main class="p-4 md:p-8 max-w-5xl mx-auto animate-fadeIn">
            <button id="backToShipments" class="mb-6 px-4 py-2 rounded bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow hover:scale-105 transition-all">
              Back to Shipments
            </button>
            <div class="flex items-center gap-6 mb-8">
              <img src="${shipment.image_url || packageIcon}" class="w-20 h-20 rounded-full border-4 border-blue-500 bg-white" alt="Package" />
              <div>
                <h2 class="text-2xl font-bold text-white">${shipment.receiver_name}</h2>
                <p class="text-blue-300">Tracking: ${shipment.tracking_code}</p>
                <p class="text-gray-400">Status: ${shipment.status}</p>
                <span class="ml-2 text-xs text-gray-400">Created: ${dayjs(shipment.created_at).format("MMM D, YYYY")}</span>
              </div>
            </div>
            <div class="mb-8">
              <h3 class="text-lg font-bold text-white mb-4">Tracking Updates</h3>
              <div class="space-y-2">
                ${historyHtml || "<div class='text-gray-400'>No updates.</div>"}
              </div>
            </div>
            <div id="detailsMapContainer" style="height: 300px;" class="mb-8 rounded-lg overflow-hidden"></div>
            <div class="flex gap-2">
              <button id="editShipmentBtnDetails" class="px-4 py-2 rounded bg-yellow-600 text-white font-bold shadow hover:bg-yellow-700 transition-all">
                Edit Shipment
              </button>
              <button id="trackLiveBtnDetails" class="px-4 py-2 rounded bg-purple-600 text-white font-bold shadow hover:bg-purple-700 transition-all">
                Live Tracking
              </button>
            </div>
          </main>
        </div>
      </div>
    `;
        document.querySelector("#app").innerHTML = html;
        setTimeout(() => {
            renderTrackingMap('detailsMapContainer', updates);
        }, 100);

        document.getElementById("backToShipments")?.addEventListener("click", () => {
            renderMain();
        });
        document.getElementById("editShipmentBtnDetails")?.addEventListener("click", () => {
            renderEditShipmentModal(shipmentId);
        });
        document.getElementById("trackLiveBtnDetails")?.addEventListener("click", () => {
            renderLiveTrackingModal(shipmentId);
        });
        navbarEvents();
    }

    async function createShipment(form) {
        showSpinner();
        const data = {
            sender_id: form.sender_id.value.trim(),
            receiver_id: form.receiver_id.value.trim(),
            receiver_name: form.receiver_name.value.trim(),
            receiver_address: form.receiver_address.value.trim(),
            receiver_phone: form.receiver_phone.value.trim(),
            origin: form.origin.value.trim(),
            destination: form.destination.value.trim(),
            package_description: form.package_description.value.trim(),
            weight: Number(form.weight.value),
            cost: Number(form.cost.value),
            image_url: form.image_url.value.trim(),
            status: "processing",
            tracking_code: "TRK" + Math.floor(Math.random() * 1000000)
        };
        const { error } = await supabase.from("shipments").insert([data]);
        hideSpinner();
        if (error) {
            toastr.error("Failed to create shipment.");
            return false;
        }
        toastr.success("Shipment created!");
        return true;
    }

    async function editShipment(form, shipmentId) {
        showSpinner();
        const data = {
            receiver_name: form.receiver_name.value.trim(),
            receiver_address: form.receiver_address.value.trim(),
            receiver_phone: form.receiver_phone.value.trim(),
            origin: form.origin.value.trim(),
            destination: form.destination.value.trim(),
            package_description: form.package_description.value.trim(),
            weight: Number(form.weight.value),
            cost: Number(form.cost.value),
            image_url: form.image_url.value.trim()
        };
        const { error } = await supabase.from("shipments").update(data).eq("id", shipmentId);
        hideSpinner();
        if (error) {
            toastr.error("Failed to update shipment.");
            return false;
        }
        toastr.success("Shipment updated!");
        return true;
    }

    function mainEvents() {
        navbarEvents();

        document.getElementById("statusFilter")?.addEventListener("change", async (e) => {
            const status = e.target.value;
            shipmentsList = await fetchShipments(status);
            renderMain();
        });

        document.getElementById("searchInput")?.addEventListener("input", async (e) => {
            const search = e.target.value.trim().toUpperCase();
            if (!search) {
                shipmentsList = await fetchShipments();
            } else {
                shipmentsList = shipmentsList.filter(s => (s.tracking_code || "").toUpperCase().includes(search));
            }
            renderMain();
        });

        document.querySelectorAll("#shipmentsTableBody tr").forEach(row => {
            const shipmentId = row.getAttribute("data-shipment-id");
            row.querySelector(".detailsShipmentBtn")?.addEventListener("click", (e) => {
                e.stopPropagation();
                renderShipmentDetails(shipmentId);
            });
            row.querySelector(".editShipmentBtn")?.addEventListener("click", (e) => {
                e.stopPropagation();
                renderEditShipmentModal(shipmentId);
            });
            row.querySelector(".approveShipmentBtn")?.addEventListener("click", async (e) => {
                e.stopPropagation();
                await addLiveTrackingUpdateAndNotify(shipmentId, `${WAREHOUSE_LOCATION[0]},${WAREHOUSE_LOCATION[1]}`, "approved", "Approved by admin");
                shipmentsList = await fetchShipments();
                renderMain();
            });
            row.querySelector(".trackShipmentBtn")?.addEventListener("click", (e) => {
                e.stopPropagation();
                renderLiveTrackingModal(shipmentId);
            });
        });

        // Modal logic
        const modal = document.getElementById("createShipmentModal");
        document.getElementById("createShipmentBtn")?.addEventListener("click", () => {
            modal.classList.remove("hidden");
        });
        document.getElementById("closeModalBtn")?.addEventListener("click", () => {
            modal.classList.add("hidden");
        });

        document.getElementById("createShipmentForm")?.addEventListener("submit", async (e) => {
            e.preventDefault();
            const form = e.target;
            const success = await createShipment(form);
            if (success) {
                modal.classList.add("hidden");
                shipmentsList = await fetchShipments();
                renderMain();
            }
        });
    }

    renderMain();
    return ({ html: "", pageEvents: () => renderMain() });
};

export default shipments;