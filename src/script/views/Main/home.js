import Footer from "/src/script/components/footer";
import Navbar from "/src/script/components/navbar";
import swiftLogoLight from "/src/images/logo.png";
import swiftLogoDark from "/src/images/logo.jpg";
import { reset } from "../../utils/reset";
import { supabase } from "../../utils/supabaseClient";
import toastr from "../../utils/toastr";
import dayjs from "dayjs";
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

// --- Logo Wall Images ---
const logoWallImages = [
  "https://www.shipbob.com/wp-content/uploads/2023/10/2f854a399a4d8ac1b7b1aa7a78836549.png",
  "https://www.shipbob.com/wp-content/uploads/2024/11/414d49e28e8fa74ca8e7604493adb78b.svg",
  "https://www.shipbob.com/wp-content/uploads/2024/11/58136c17b9cbdfa9a8d9c4e3e6f597f4.svg",
  "https://www.shipbob.com/wp-content/uploads/2022/04/Chamberlain_Coffee_Logo.png",
  "https://www.shipbob.com/wp-content/uploads/2023/10/72ed96bf6febf9764415855386810276.png",
  "https://www.shipbob.com/wp-content/uploads/2023/10/da85ba7fb0752aeb5d19bd292d70a232.png",
  "https://www.shipbob.com/wp-content/uploads/2022/04/100_Thieveslogo_profile-bw.png",
  "https://www.shipbob.com/wp-content/uploads/2024/11/2afc122e89b8fc6348a4d76fb63d5ef5.svg",
  "https://www.shipbob.com/wp-content/uploads/2024/12/a117347e92ac840408db273df2792a98.png"
];

// --- Testimonials ---
const testimonials = [
  {
    quote: "Swift Logistics has transformed our delivery experience. Our customers are happier and our team is more efficient.",
    name: "Brian Herbstreit",
    position: "Owner, Nothing Bundt Cakes",
    logo: "https://www.dropoff.com/wp-content/uploads/2023/01/Logo_5.png",
    photo: "https://www.dropoff.com/wp-content/uploads/2022/11/S_3.png"
  },
  {
    quote: "We scaled our business with Swift Logistics and saw a 40% reduction in fulfillment costs.",
    name: "Ali Shahid",
    position: "COO, Our Place",
    logo: "https://www.shipbob.com/wp-content/uploads/2024/11/58136c17b9cbdfa9a8d9c4e3e6f597f4.svg",
    photo: "https://www.shipbob.com/wp-content/uploads/2024/11/58136c17b9cbdfa9a8d9c4e3e6f597f4.svg"
  },
  {
    quote: "Swift Logistics offers the best support and reliability for our growing brand.",
    name: "Stephanie Lee",
    position: "COO, PetLab Co.",
    logo: "https://www.shipbob.com/wp-content/uploads/2024/11/2afc122e89b8fc6348a4d76fb63d5ef5-1.svg",
    photo: "https://www.shipbob.com/wp-content/uploads/2024/11/2afc122e89b8fc6348a4d76fb63d5ef5-1.svg"
  }
];

// --- Service Grid ---
const serviceGrid = [
  { icon: "fulfillment", title: "Order Fulfillment", desc: "Fast, accurate, and scalable fulfillment for all your ecommerce needs." },
  { icon: "shipping", title: "Shipping", desc: "Same-day, next-day, and international shipping options." },
  { icon: "returns", title: "Returns Management", desc: "Streamlined returns and reverse logistics." },
  { icon: "inventory", title: "Inventory Management", desc: "Real-time inventory tracking and reporting." }
];

// --- Industry Grid ---
const industryGrid = [
  { title: "Healthcare", img: "healthcare.svg", brands: ["quest.png", "labcorp-2.png"] },
  { title: "Retail", img: "retail.svg", brands: ["neiman.png", "susie-cackes.png"] },
  { title: "Food & Beverage", img: "food.svg", brands: ["sprinkles.png", "holt.png"] },
  { title: "Technology", img: "tech.svg", brands: ["helix.png", "ricon.png"] }
];

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

// --- Parse lat/lon from string ---
function parseLatLon(location) {
  let [a, b] = location.split(',').map(Number);
  return [a, b];
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

// --- Spinner ---
function showSpinner() {
  if (document.getElementById("trackSpinner")) return;
  const spinner = document.createElement("div");
  spinner.id = "trackSpinner";
  spinner.innerHTML = `
    <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
    </div>
  `;
  document.body.appendChild(spinner);
}
function hideSpinner() {
  document.getElementById("trackSpinner")?.remove();
}

// --- Modal ---
async function renderTrackingModal(shipment) {
  hideSpinner();
  document.getElementById("trackingModal")?.remove();
  let historyHtml = "";
  for (const item of shipment.updates) {
    let locationDisplay = item.location;
    if (item.location && item.location.match(/^-?\d+\.\d+,-?\d+\.\d+$/)) {
      const [lat, lon] = parseLatLon(item.location);
      locationDisplay = await reverseGeocode(lat, lon);
    }
    historyHtml += `
      <li class="flex flex-col md:flex-row items-start gap-2 mb-2">
        <div>
          <span class="font-medium">${dayjs(item.updated_at).format("MMM D, HH:mm")}:</span>
          ${item.status} - ${locationDisplay}
          <span class="text-xs text-text-subtle">${item.note || ""}</span>
        </div>
      </li>
    `;
  }
  let currentLocation = shipment.origin;
  if (shipment.updates.length) {
    const lastUpdate = shipment.updates[shipment.updates.length - 1];
    if (lastUpdate.location && lastUpdate.location.match(/^-?\d+\.\d+,-?\d+\.\d+$/)) {
      const [lat, lon] = parseLatLon(lastUpdate.location);
      currentLocation = await reverseGeocode(lat, lon);
    } else if (lastUpdate.location) {
      currentLocation = lastUpdate.location;
    }
  }
  const modalHtml = `
    <div id="trackingModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-8 w-full max-w-2xl shadow-lg relative animate-slideIn overflow-auto" style="max-height:90vh;">
        <button id="closeTrackingModalBtn" class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl">×</button>
        <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Tracking Details - ${shipment.tracking_code}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg mb-4">
          <p><strong>Status:</strong> <span class="font-semibold">${shipment.status}</span></p>
          <p><strong>Current Location:</strong> ${currentLocation}</p>
          <p><strong>Tracking ID:</strong> <span class="font-mono">${shipment.tracking_code}</span></p>
        </div>
        <div id="modalMapContainer" style="height: 350px;" class="mb-6 rounded-lg overflow-hidden"></div>
        <div>
          <h4 class="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Tracking History</h4>
          <ul class="space-y-2">${historyHtml}</ul>
        </div>
      </div>
    </div>
    <style>
      .animate-slideIn { animation: slideIn 0.4s cubic-bezier(.4,0,.2,1); }
      @keyframes slideIn {
        from { transform: translateY(40px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .ol-popup { font-size: 1rem; pointer-events: none; z-index: 1000; }
    </style>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHtml);
  setTimeout(() => {
    renderTrackingMap('modalMapContainer', shipment.updates);
  }, 100);
  document.getElementById("closeTrackingModalBtn")?.addEventListener("click", () => {
    document.getElementById("trackingModal")?.remove();
  });
}

// --- Track Product Logic ---
async function fetchShipment(trackingId) {
  try {
    const { data: shipment, error } = await supabase
      .from("shipments")
      .select("*")
      .eq("tracking_code", trackingId)
      .single();
    if (error || !shipment) {
      toastr.error("Tracking ID not found.");
      return null;
    }
    const { data: updates } = await supabase
      .from("tracking_updates")
      .select("*")
      .eq("shipment_id", shipment.id)
      .order("updated_at", { ascending: true });
    shipment.updates = updates || [];
    return shipment;
  } catch (err) {
    toastr.error("Error fetching product.");
    return null;
  }
}

// --- Logo Wall Animation ---
function animateLogoWall() {
  const wall = document.querySelector('.animated-logo-wall-track');
  if (!wall) return;
  let scrollAmount = 0;
  function step() {
    scrollAmount += 0.5;
    wall.style.transform = `translateX(-${scrollAmount}px)`;
    if (scrollAmount > wall.scrollWidth / 2) scrollAmount = 0;
    requestAnimationFrame(step);
  }
  step();
}

const home = () => {
  reset('Swift Edge Logistics');
  const { html: navbarHtml, pageEvents: navbarEvents } = Navbar();
  const { html: footerHtml } = Footer();

  function pageEvents() {
    navbarEvents();
    animateLogoWall();

    // Track Product Form Logic
    const form = document.getElementById("hero-track-form");
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const trackingId = document.getElementById("hero-tracking-id-input").value.trim().toUpperCase();
        if (!trackingId) {
          toastr.warning("Please enter a tracking ID.");
          return;
        }
        showSpinner();
        const shipment = await fetchShipment(trackingId);
        if (shipment) {
          await renderTrackingModal(shipment);
        } else {
          hideSpinner();
          toastr.error("Tracking ID not found.");
        }
      });
    }
  }

  return {
    html: /* html */`
      <div class="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light font-sans">
        ${navbarHtml}
        <main id="wcag-main-content" class="flex-1 flex flex-col justify-start items-stretch px-2 md:px-0">
          <!-- Hero Banner with Track Products -->
          <section class="relative w-full bg-background-light dark:bg-background-dark mb-24">
            <picture>
              <source srcset="https://www.dhl.com/content/dam/dhl/global/core/images/marketing-stage-2730x1120/africa-core-homepage-banner.web.1920.600.png, https://www.dhl.com/content/dam/dhl/global/core/images/marketing-stage-2730x1120/africa-core-homepage-banner.web.3840.1200.png 2x" media="(min-width: 1365px)">
              <source srcset="https://www.dhl.com/content/dam/dhl/global/core/images/marketing-stage-2730x1120/africa-core-homepage-banner.web.1365.428.png, https://www.dhl.com/content/dam/dhl/global/core/images/marketing-stage-2730x1120/africa-core-homepage-banner.web.2730.854.png 2x" media="(min-width: 1024px)">
              <source srcset="https://www.dhl.com/content/dam/dhl/global/core/images/marketing-stage-2730x1120/africa-core-homepage-banner.web.1024.321.png ,https://www.dhl.com/content/dam/dhl/global/core/images/marketing-stage-2730x1120/africa-core-homepage-banner.web.2048.642.png 2x" media="(min-width: 768px)">
              <img class="w-full object-cover h-64 md:h-96" src="https://www.dhl.com/content/dam/dhl/global/core/images/marketing-stage-2730x1120/africa-core-homepage-banner.web.785.246.png" alt="SwiftEdge Logistics Banner" />
            </picture>
            <div class="absolute inset-0 flex flex-col justify-center items-center text-center z-10 bg-black bg-opacity-40 pt-16">
              <img src="${swiftLogoLight}" alt="SwiftEdge Logo" class="h-16 mb-4 block dark:hidden" />
              <img src="${swiftLogoDark}" alt="SwiftEdge Logo" class="h-16 mb-4 hidden dark:block" />
              <h1 class="text-4xl md:text-5xl font-bold text-primary dark:text-accent mb-4 pt-16 md:pt-0">SwiftEdge Logistics</h1>
              <p class="text-lg md:text-xl text-text-light mb-6">Industry Leading Same-Day Delivery Services</p>
              <form id="hero-track-form" class="flex flex-col md:flex-row gap-4 items-center justify-center mb-4 w-full max-w-xl mx-auto">
                <input
                  type="text"
                  id="hero-tracking-id-input"
                  placeholder="Enter Tracking ID (e.g., TRK123456)"
                  class="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                <button type="submit"
                  class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50">
                  Track
                </button>
              </form>
            </div>
          </section>
          <!-- Quick Links -->
          <section class="max-w-5xl mx-auto py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="/track" data-nav class="shadow-small flex flex-col items-center p-6 rounded-lg bg-white dark:bg-primary-light hover:shadow-lg transition">
              <img src="https://www.dhl.com/content/dam/dhl/global/core/images/icons/general-icons/glo-core-online.svg" alt="Ship Now" class="mb-3 h-12 w-12">
              <span class="font-bold text-lg mb-1">Ship Now</span>
              <p class="text-sm text-center">Find the right service</p>
            </a>
            <a href="/services" data-nav class="shadow-small flex flex-col items-center p-6 rounded-lg bg-white dark:bg-primary-light hover:shadow-lg transition">
              <img src="https://www.dhl.com/content/dam/dhl/global/core/images/icons/general-icons/glo-core-getaquote.svg" alt="Get a Quote" class="mb-3 h-12 w-12">
              <span class="font-bold text-lg mb-1">Get a Quote</span>
              <p class="text-sm text-center">Estimate cost to share and compare</p>
            </a>
            <a href="/business" data-nav class="shadow-small flex flex-col items-center p-6 rounded-lg bg-white dark:bg-primary-light hover:shadow-lg transition">
              <img src="https://www.dhl.com/content/dam/dhl/global/core/images/icons/gogreen-icons/glo-core-gogreen-warehousing.svg" alt="SwiftEdge for Business" class="mb-3 h-12 w-12">
              <span class="font-bold text-lg mb-1">SwiftEdge for Business</span>
              <p class="text-sm text-center">Shipping regularly? Request a business account and profit from exclusive benefits</p>
            </a>
          </section>
          <!-- Animated Logo Wall Section -->
          <section class="w-full bg-peach py-8 overflow-hidden">
            <div class="relative w-full h-20 flex items-center">
              <div class="animated-logo-wall-track flex gap-8 items-center" style="will-change: transform;">
                ${logoWallImages.concat(logoWallImages).map((src, i) => `
                  <img src="${src}" alt="Brand Logo ${i}" class="h-12 w-auto rounded shadow transition-all duration-300" loading="lazy" />
                `).join('')}
              </div>
            </div>
            <style>
              .animated-logo-wall-track {
                display: flex;
                min-width: 200%;
                transition: transform 0.2s linear;
              }
              @media (max-width: 640px) {
                .animated-logo-wall-track img { height: 32px; }
              }
            </style>
          </section>
          <!-- SwiftEdge Section Container -->
          <section class="w-full bg-peach-soft py-12">
            <div class="container mx-auto text-center px-2">
              <h6 class="text-lg font-semibold mb-2 text-primary">You’re in good hands</h6>
              <h2 class="text-3xl md:text-4xl font-bold mb-4 text-primary">Join industry-leaders who have partnered with SwiftEdge Logistics to power their order fulfillment.</h2>
            </div>
          </section>
          <!-- SwiftEdge Plus Section -->
          <section class="w-full bg-peach py-12">
            <div class="container mx-auto flex flex-col md:flex-row items-center gap-10 px-2">
              <div class="flex-1 flex justify-center">
                <img class="w-full max-w-md rounded-lg shadow-lg" src="https://www.shipbob.com/wp-content/uploads/2025/04/1e29379f49547ca1e85e076f27642d16.png" alt="SwiftEdge Plus" loading="lazy">
              </div>
              <div class="flex-1">
                <h2 class="text-2xl md:text-3xl font-bold mb-2 dark:text-text-dark">Introducing SwiftEdge Plus</h2>
                <p class="mb-2 font-semibold dark:text-text-dark">The go-to fulfillment solution for the fastest-growing modern brands</p>
                <p class="mb-4 dark:text-text-dark">SwiftEdge Plus enables high-performing brands to unlock accelerated growth, greater operational resilience, and cost efficiencies through a high-touch, customized fulfillment experience.</p>
                <a class="btn btn-primary dark:text-text-dark" href="/about" data-nav>Learn More</a>
              </div>
            </div>
          </section>
          <!-- Value Props Section -->
          <section class="w-full bg-background-light dark:bg-background-dark py-12">
            <div class="container mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center px-2">
              <div>
                <h3 class="text-3xl font-bold text-accent">200M+</h3>
                <p class="font-semibold">Orders fulfilled</p>
                <p>through the SwiftEdge Network</p>
              </div>
              <div>
                <h3 class="text-3xl font-bold text-accent">60+</h3>
                <p class="font-semibold">Fulfillment centers</p>
                <p>across the world</p>
              </div>
              <div>
                <h3 class="text-3xl font-bold text-accent">99.95%</h3>
                <p class="font-semibold">Accuracy rate</p>
                <p>in fulfilling orders</p>
              </div>
              <div>
                <h3 class="text-3xl font-bold text-accent">99.8%</h3>
                <p class="font-semibold">Of orders ship on time</p>
                <p>within SLA</p>
              </div>
            </div>
          </section>
          <!-- Service Grid Section -->
          <section class="w-full bg-white dark:bg-background-dark py-12">
            <div class="container mx-auto px-2">
              <div class="text-center mb-8">
                <h6 class="text-lg font-semibold text-primary">Ecommerce Fulfillment Solutions</h6>
                <h2 class="text-2xl md:text-3xl font-bold">SwiftEdge Logistics is an end-to-end fulfillment provider</h2>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                ${serviceGrid.map(s => `
                  <div class="flex flex-col items-center text-center transition hover:scale-105">
                    <img class="h-16 mb-4" src="https://www.shipbob.com/wp-content/uploads/2024/12/${s.icon}.svg" alt="${s.title}">
                    <h3 class="font-bold mb-2">${s.title}</h3>
                    <p>${s.desc}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>
          <!-- How It Works Section -->
          <section class="w-full bg-peach-soft py-12 text-primary">
            <div class="container mx-auto px-2">
              <div class="text-center mb-8">
                <h6 class="font-semibold text-primary">Streamlined Fulfillment</h6>
                <h2 class="text-2xl md:text-3xl font-bold">How it works</h2>
                <p class="mb-4 font-semibold">From your online store to your customer’s door</p>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div class="flex flex-col items-center text-center">
                  <img class="h-16 mb-4" src="https://www.shipbob.com/wp-content/uploads/2019/11/home-sec1-1.svg" alt="Step One">
                  <h3 class="font-bold mb-2">Step One</h3>
                  <p>Connect your store and sync your products in a couple clicks.</p>
                </div>
                <div class="flex flex-col items-center text-center">
                  <img class="h-16 mb-4" src="https://www.shipbob.com/wp-content/uploads/2019/11/home-sec1-2.svg" alt="Step Two">
                  <h3 class="font-bold mb-2">Step Two</h3>
                  <p>Send us your inventory, and we’ll help distribute it to your needs.</p>
                </div>
                <div class="flex flex-col items-center text-center">
                  <img class="h-16 mb-4" src="https://www.shipbob.com/wp-content/uploads/2019/11/home-sec1-3.svg" alt="Step Three">
                  <h3 class="font-bold mb-2">Step Three</h3>
                  <p>Relax as we handle picking, packing, and shipping for you!</p>
                </div>
              </div>
              <div class="flex justify-center">
                <a class="btn btn-primary" href="/login" data-nav>login</a>
              </div>
            </div>
          </section>
          <!-- SwiftEdge Deep Industry Section -->
          <section class="w-full bg-white dark:bg-background-dark py-12">
            <div class="container mx-auto px-2">
              <h2 class="text-2xl md:text-3xl font-bold text-center mb-8">SwiftEdge Logistics has deep industry expertise across many specialized categories:</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                ${industryGrid.map(cat => `
                  <div class="flex flex-col items-center text-center">
                    <img class="h-16 mb-4" src="https://www.shipbob.com/wp-content/uploads/2025/01/${cat.img}" alt="${cat.title}">
                    <h3 class="font-bold mb-2">${cat.title}</h3>
                    <div class="flex flex-wrap justify-center gap-2 mb-2">
                      ${cat.brands.map(b => `<img class="h-8" src="https://www.shipbob.com/wp-content/uploads/2025/03/${b}" alt="">`).join('')}
                    </div>
                    <a class="text-accent hover:underline" href="/about" data-nav>Learn more</a>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>
          <!-- Clients Testimonial Section -->
          <section class="w-full bg-background-light dark:bg-background-dark py-12">
            <div class="container mx-auto px-2">
              <div class="text-center mb-8">
                <h6 class="font-semibold text-primary">Our Customers</h6>
                <h3 class="text-2xl md:text-3xl font-bold">Don’t just take our word for it — see why SwiftEdge Logistics is trusted by industry-leading brands</h3>
              </div>
              <div class="flex flex-col items-center gap-8">
                ${testimonials.map((t, i) => `
                  <div class="testimonial-item${i === 0 ? "" : " hidden"} flex flex-col md:flex-row items-center gap-6 w-full transition-opacity duration-700">
                    <div class="flex-shrink-0 flex flex-col items-center">
                      <img class="h-16 w-16 rounded-full mb-2" src="${t.photo}" alt="${t.name}">
                      <img class="h-8" src="${t.logo}" alt="${t.position}">
                    </div>
                    <div class="flex-1 text-center md:text-left">
                      <blockquote class="italic text-text-subtle dark:text-peach mb-4">"${t.quote}"</blockquote>
                      <div>
                        <p class="font-bold">${t.name}</p>
                        <p class="text-sm">${t.position}</p>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>
          <!-- Trusted By Section -->
          <section class="bg-white py-12">
            <div class="max-w-6xl mx-auto text-center">
              <h2 class="text-2xl md:text-3xl font-bold mb-6">Trusted By 270+ Global Brands</h2>
              <div class="flex flex-wrap justify-center gap-6">
                ${[
      "quest.png", "sprinkles.png", "labcorp-2.png", "american-red-cross-2.png", "mckesson.png", "holt.png", "texas-health.png", "kpmg.png", "helix.png", "ricon.png", "neiman.png", "susie-cackes.png"
    ].map((img, i) => `
                  <img src="https://www.dropoff.com/wp-content/themes/bb-theme-child/media/clients-logos-svg/${img}" alt="brand ${i}" class="h-12">
                `).join('')}
              </div>
            </div>
          </section>
          <!-- Insights Section -->
          <section class="bg-white dark:bg-background-dark py-12">
            <div class="max-w-6xl mx-auto px-2">
              <h2 class="text-2xl md:text-3xl font-bold mb-6">Our Latest Insights</h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="post-item bg-background-light dark:bg-primary-light rounded-lg shadow p-4">
                  <div class="post-thumbnail mb-2">
                    <a href="/blog/medical-courier-tips">
                      <img src="https://www.dropoff.com/wp-content/uploads/2016/06/10_Tips_to_Choose_The_Right_Medical_Courier-01-1-scaled.jpeg" alt="Medical Courier Tips" class="rounded-lg w-full h-32 object-cover">
                    </a>
                  </div>
                  <div class="post-categories mb-1">
                    <a href="/blog/category/healthcare" class="text-accent font-semibold">Healthcare</a>
                  </div>
                  <h3 class="subtitle-2 mb-1"><a href="/blog/medical-courier-tips">14 Tips to Choose The Right Medical Courier in 2025</a></h3>
                  <div class="post-meta text-xs text-text-subtle">
                    By <a href="/services" data-nav class="underline">Jeff Hackman</a> | Apr 09, 2025 | 9&nbsp;min read
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        ${footerHtml}
      </div>
    `,
    pageEvents
  };
};

export default home;