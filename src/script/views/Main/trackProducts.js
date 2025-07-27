import Navbar from "../User/components/navbar";
import { supabase } from "../../utils/supabaseClient";
import toastr from "../../utils/toastr";
import dayjs from "dayjs";
import { reset } from "../../utils/reset";
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

// --- Parse lat/lon from string ---
function parseLatLon(location) {
  let [a, b] = location.split(',').map(Number);
  return [a, b];
}

// --- Map Logic (OpenLayers) ---
const WAREHOUSE_LOCATION = [40.7127281, -74.0060152];

async function getLatLonFromAddress(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
  } catch (err) {}
  return [40.7127281, -74.0060152];
}

async function renderTrackingMap(containerId, updates) {
  // Always use admin input for label, decode for map
  const points = [
    WAREHOUSE_LOCATION,
    ...updates.map(u => u.location)
  ];
  const decodedPoints = [];
  for (let loc of points) {
    if (typeof loc === "string" && loc.match(/^-?\d+\.\d+,-?\d+\.\d+$/)) {
      decodedPoints.push(parseLatLon(loc));
    } else if (loc) {
      decodedPoints.push(await getLatLonFromAddress(loc));
    } else {
      decodedPoints.push(WAREHOUSE_LOCATION);
    }
  }
  const center = decodedPoints.length > 1 ? decodedPoints[decodedPoints.length - 1] : WAREHOUSE_LOCATION;
  const centerWebMercator = transform([center[1], center[0]], 'EPSG:4326', 'EPSG:3857');

  document.getElementById(containerId).innerHTML = "";

  const map = new Map({
    target: containerId,
    layers: [new TileLayer({ source: new OSM() })],
    view: new View({ center: centerWebMercator, zoom: 10 })
  });

  if (decodedPoints.length > 1) {
    const lineCoords = decodedPoints.map(([lat, lon]) => transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
    const line = new Feature({ geometry: new LineString(lineCoords) });
    line.setStyle(new Style({ stroke: new Stroke({ color: '#F59E42', width: 4, lineDash: [8, 4] }) }));
    map.addLayer(new VectorLayer({ source: new VectorSource({ features: [line] }) }));
  }

  for (let idx = 0; idx < decodedPoints.length; idx++) {
    const pt = decodedPoints[idx];
    const marker = new Feature({ geometry: new Point(transform([pt[1], pt[0]], 'EPSG:4326', 'EPSG:3857')) });
    marker.setStyle(new Style({
      image: new Icon({
        src: idx === 0
          ? "https://cdn-icons-png.flaticon.com/512/684/684908.png"
          : "https://cdn.jsdelivr.net/npm/ol@v7.4.0/examples/data/icon.png",
        scale: idx === 0 ? 0.08 : 0.07,
        anchor: [0.5, 1]
      })
    }));
    marker.set('popup', idx === 0 ? "Warehouse (New York)" : `Update: ${points[idx]}`);
    map.addLayer(new VectorLayer({ source: new VectorSource({ features: [marker] }) }));
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
  if (decodedPoints.length > 1) {
    const extent = [
      Math.min(...decodedPoints.map(pt => pt[1])),
      Math.min(...decodedPoints.map(pt => pt[0])),
      Math.max(...decodedPoints.map(pt => pt[1])),
      Math.max(...decodedPoints.map(pt => pt[0]))
    ];
    map.getView().fit(transformExtent(extent, 'EPSG:4326', 'EPSG:3857'), { padding: [40, 40, 40, 40] });
  }
}

const trackProducts = () => {
  const { html: navbarHtml, pageEvents: navbarEvents } = Navbar("track");

  const heroBg =
    "https://www.wowtheme7.com/tf/transpro/assets/img/portfolio/2.png";

  const html = `
    <div class="min-h-screen bg-[#1e293b] dark:bg-background-dark transition-colors duration-300 bg-cover bg-center"
      style="background-image: url('${heroBg}'); background-blend-mode: multiply;">
      ${navbarHtml}
      <main id="track-main" class="container mx-auto px-4 py-8 max-w-4xl">
        <section class="relative w-full h-56 md:h-72 flex items-center justify-center overflow-hidden rounded-2xl shadow-lg mb-8"
          style="background: url('${heroBg}') center/cover no-repeat, #1e293b;">
          <div class="absolute inset-0 bg-gradient-to-b from-black/60 to-background-dark/90"></div>
          <div class="relative z-10 flex flex-col items-center justify-center w-full h-full">
            <i class="fa fa-box-open text-5xl text-accent mb-4 animate-pulse"></i>
            <h1 class="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-2">Track Your Package</h1>
            <p class="text-lg text-accent mt-2 font-semibold">Real-time shipment status & location</p>
          </div>
        </section>
        <form id="track-form" class="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            id="tracking-id-input"
            placeholder="Enter Tracking ID (e.g., TRK123456)"
            class="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <button type="submit"
            class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50">
            Track
          </button>
        </form>
        <div id="tracking-result-container"></div>
        <div id="map-container" class="mt-10 rounded-lg overflow-hidden shadow-lg" style="height: 400px;"></div>
      </main>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    </div>
    <style>
      .ol-popup {
        font-size: 1rem;
        pointer-events: none;
        z-index: 1000;
      }
    </style>
  `;

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
      toastr.success("Product fetched successfully!");
      return shipment;
    } catch (err) {
      toastr.error("Error fetching product.");
      return null;
    }
  }

  async function renderTrackingResult(shipment) {
    if (!shipment) {
      document.getElementById("tracking-result-container").innerHTML = `
        <div class="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-md mb-6" role="alert">
          <p class="font-bold">Error!</p>
          <p class="text-sm">Tracking ID not found. Please try again.</p>
        </div>
      `;
      document.getElementById("map-container").innerHTML = "";
      return;
    }

    // Show only admin input for history
    let historyHtml = "";
    for (const item of shipment.updates) {
      historyHtml += `
        <li class="flex items-start">
          <span class="text-indigo-500 dark:text-indigo-300 mr-3">&#x2022;</span>
          <div>
            <span class="font-medium">${dayjs(item.updated_at).format(
              "MMM D, HH:mm"
            )}:</span> ${item.status} - ${item.location} <span class="text-xs text-text-subtle">${item.note || ""}</span>
          </div>
        </li>
      `;
    }

    // Current location
    let currentLocation = shipment.origin;
    if (shipment.updates.length) {
      const lastUpdate = shipment.updates[shipment.updates.length - 1];
      currentLocation = lastUpdate.location;
    }

    document.getElementById("tracking-result-container").innerHTML = `
      <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-inner mb-4">
        <h3 class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Tracking Details</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
          <p><strong>Status:</strong> <span class="font-semibold">${shipment.status}</span></p>
          <p><strong>Current Location:</strong> ${currentLocation}</p>
          <p><strong>Tracking ID:</strong> <span class="font-mono">${shipment.tracking_code}</span></p>
        </div>
        <div class="mt-6">
          <h4 class="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">Tracking History</h4>
          <ul class="space-y-2">
            ${historyHtml}
          </ul>
        </div>
      </div>
      <div id="productMapContainer" style="height: 400px;" class="mb-8 rounded-lg overflow-hidden"></div>
    `;

    setTimeout(() => {
      renderTrackingMap('productMapContainer', shipment.updates);
    }, 100);
  }

  function pageEvents(onNavigate = () => {}) {
    navbarEvents(onNavigate);

    reset("Track Product");

    document
      .getElementById("track-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const trackingId = document
          .getElementById("tracking-id-input")
          .value.trim()
          .toUpperCase();
        if (!trackingId) {
          toastr.warning("Please enter a tracking ID.");
          return;
        }
        document.getElementById("tracking-result-container").innerHTML =
          '<div class="text-center py-8 text-accent animate-pulse">Loading...</div>';
        const shipment = await fetchShipment(trackingId);
        await renderTrackingResult(shipment);
      });
  }

  return {
    html,
    pageEvents,
  };
};

export default trackProducts;