import { reset } from "../../utils/reset.js";
import { checkAuthSession } from "./functions/checkSession.js";
import { supabase } from "../../utils/supabaseClient.js";
import Navbar from "./components/navbar.js";
import Chart from "chart.js/auto";
import dayjs from "dayjs";
import packageLogo from "/src/images/package-icon.png"
import logo from "/src/images/logo.jpg";

const safeNumber = (value) => {
  const num = Number(value);
  return isNaN(num) ? 0 : num;
};

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(safeNumber(amount));
}

async function fetchDashboardData() {
  try {
    const [
      userCountRes,
      shipmentCountRes,
      paymentCountRes,
      shipmentsRes,
      paymentsRes
    ] = await Promise.all([
      supabase.from('profiles').select('id', { count: 'exact', head: true }),
      supabase.from('shipments').select('id', { count: 'exact', head: true }),
      supabase.from('payments').select('id', { count: 'exact', head: true }),
      supabase.from('shipments')
        .select('id, tracking_code, status, cost, created_at, image_url, receiver_name, origin, destination')
        .order('created_at', { ascending: false }),
      supabase.from('payments')
        .select('id, amount, status, created_at, method, type')
        .order('created_at', { ascending: false })
    ]);

    const userCount = userCountRes?.count ?? 0;
    const shipmentCount = shipmentCountRes?.count ?? 0;
    const paymentCount = paymentCountRes?.count ?? 0;
    const shipments = shipmentsRes?.data ?? [];
    const payments = paymentsRes?.data ?? [];

    const shipmentAnalytics = {};
    let pendingAmount = 0;
    shipments.forEach(shipment => {
      shipmentAnalytics[shipment.status] = (shipmentAnalytics[shipment.status] || 0) + 1;
      if (shipment.status === 'processing' && shipment.cost !== null && shipment.cost !== undefined) {
        pendingAmount += safeNumber(shipment.cost);
      }
    });

    const paymentAnalytics = {};
    payments.forEach(payment => {
      paymentAnalytics[payment.status] = (paymentAnalytics[payment.status] || 0) + 1;
    });

    return {
      userCount,
      shipmentCount,
      paymentCount,
      pendingAmount,
      recentShipments: shipments.slice(0, 5).map(s => ({
        ...s,
        cost: safeNumber(s.cost)
      })),
      recentPayments: payments.slice(0, 5).map(p => ({
        ...p,
        amount: safeNumber(p.amount)
      })),
      analytics: {
        shipments: Object.entries(shipmentAnalytics).map(([status, count]) => ({ status, count })),
        payments: Object.entries(paymentAnalytics).map(([status, count]) => ({ status, count }))
      }
    };
  } catch (error) {
    console.error('Dashboard data fetch error:', error);
    return {
      userCount: 0,
      shipmentCount: 0,
      paymentCount: 0,
      pendingAmount: 0,
      recentShipments: [],
      recentPayments: [],
      analytics: {
        shipments: [],
        payments: []
      }
    };
  }
}

let shipmentsChartInstance = null;
let paymentsChartInstance = null;

function destroyCharts() {
  if (shipmentsChartInstance) {
    shipmentsChartInstance.destroy();
    shipmentsChartInstance = null;
  }
  if (paymentsChartInstance) {
    paymentsChartInstance.destroy();
    paymentsChartInstance = null;
  }
}

const dashboard = async () => {
  const session = checkAuthSession();
  if (!session) return;

  reset("Admin Dashboard");
  const { html: navbarHtml, pageEvents: navbarEvents } = Navbar();

  // Fetch dashboard data
  const stats = await fetchDashboardData();

  // Render dashboard with fixed sidebar and scrollable main content
  const html = /* html */ `
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex">
      ${navbarHtml}
      <div class="flex-1 ml-0 sm:ml-64 h-screen overflow-y-auto transition-all duration-300">
        <main class="p-4 md:p-8 max-w-7xl mx-auto animate-fadeIn">
          <div class="flex items-center justify-between mb-8 animate-slideDown">
            <div class="flex items-center space-x-4">
              <img src="${logo}" alt="Profile" class="w-12 h-12 rounded-full bg-white p-1">
              <div>
                <h1 class="text-3xl font-bold text-white">Welcome back, ${session.user?.full_name || 'Admin'}</h1>
                <p class="text-blue-300">Manage your logistics operations</p>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            ${[
      { icon: 'users', label: 'Total Users', value: stats.userCount, color: 'blue' },
      { icon: 'truck', label: 'Shipments', value: stats.shipmentCount, color: 'green' },
      { icon: 'credit-card', label: 'Payments', value: stats.paymentCount, color: 'purple' },
      { icon: 'clock', label: 'Pending Amount', value: formatCurrency(stats.pendingAmount), color: 'yellow' }
    ].map((stat, index) => `
              <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 transform transition-all duration-300 hover:scale-105 animate-slideIn" 
                   style="animation-delay: ${index * 100}ms">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-${stat.color}-400 text-sm font-medium">${stat.label}</p>
                    <p class="text-2xl font-bold text-white mt-2">${stat.value}</p>
                  </div>
                  <div class="bg-${stat.color}-500/20 p-3 rounded-lg">
                    <i class="fa fa-${stat.icon} text-${stat.color}-400 text-xl"></i>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 animate-slideIn"
                 style="animation-delay: 400ms">
              <h3 class="text-lg font-bold text-white mb-4">Shipment Status</h3>
              <div style="height:300px"><canvas id="shipmentsChart"></canvas></div>
            </div>
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 animate-slideIn"
                 style="animation-delay: 500ms">
              <h3 class="text-lg font-bold text-white mb-4">Payment Status</h3>
              <div style="height:300px"><canvas id="paymentsChart"></canvas></div>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 animate-slideIn"
                 style="animation-delay: 600ms">
              <h3 class="text-lg font-bold text-white mb-4">Recent Shipments</h3>
              <div class="space-y-4">
                ${stats.recentShipments.map(shipment => `
                  <div class="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                    <img src="${shipment.image_url || packageLogo}" 
                         alt="Package" class="w-12 h-12 rounded-lg object-cover">
                    <div class="flex-1">
                      <div class="text-white font-medium">${shipment.tracking_code}</div>
                      <div class="text-sm text-gray-400">${dayjs(shipment.created_at).format('MMM D, YYYY')}</div>
                      <div class="text-blue-400 font-medium">${formatCurrency(shipment.cost)}</div>
                    </div>
                    <span class="px-3 py-1 rounded-full text-xs font-medium
                      ${shipment.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
        shipment.status === 'in-transit' ? 'bg-blue-500/20 text-blue-400' :
          'bg-yellow-500/20 text-yellow-400'}">
                      ${shipment.status}
                    </span>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 animate-slideIn"
                 style="animation-delay: 700ms">
              <h3 class="text-lg font-bold text-white mb-4">Recent Payments</h3>
              <div class="space-y-4">
                ${stats.recentPayments.map(payment => `
                  <div class="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                    <div class="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <i class="fa fa-credit-card text-purple-400 text-xl"></i>
                    </div>
                    <div class="flex-1">
                      <div class="text-white font-medium">${formatCurrency(payment.amount)}</div>
                      <div class="text-sm text-gray-400">${dayjs(payment.created_at).format('MMM D, YYYY')}</div>
                      <div class="text-purple-400 font-medium">${payment.method || 'Card'}</div>
                    </div>
                    <span class="px-3 py-1 rounded-full text-xs font-medium
                      ${payment.status === 'paid' ? 'bg-green-500/20 text-green-400' :
              payment.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'}">
                      ${payment.status}
                    </span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <style>
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideIn {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes slideDown {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
      .animate-slideIn { animation: slideIn 0.5s ease-out forwards; }
      .animate-slideDown { animation: slideDown 0.5s ease-out; }
      /* Prevent main content from scrolling the sidebar */
      #admin-sidebar { position: fixed; left: 0; top: 0; height: 100vh; }
      @media (max-width: 640px) {
        #admin-sidebar { width: 100vw; }
        .sm\\:ml-64, .ml-64 { margin-left: 0 !important; }
      }
    </style>
  `;

  function pageEvents() {
    navbarEvents();
    destroyCharts();

    const chartColors = {
      shipments: ['#22c55e', '#3b82f6', '#eab308', '#ef4444'],
      payments: ['#22c55e', '#eab308', '#ef4444']
    };

    const shipmentsCanvas = document.getElementById('shipmentsChart');
    if (stats.analytics.shipments.length && shipmentsCanvas) {
      shipmentsChartInstance = new Chart(shipmentsCanvas, {
        type: 'doughnut',
        data: {
          labels: stats.analytics.shipments.map(s => s.status),
          datasets: [{
            data: stats.analytics.shipments.map(s => s.count),
            backgroundColor: chartColors.shipments
          }]
        },
        options: {
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: 'white' }
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }

    const paymentsCanvas = document.getElementById('paymentsChart');
    if (stats.analytics.payments.length && paymentsCanvas) {
      paymentsChartInstance = new Chart(paymentsCanvas, {
        type: 'doughnut',
        data: {
          labels: stats.analytics.payments.map(p => p.status),
          datasets: [{
            data: stats.analytics.payments.map(p => p.count),
            backgroundColor: chartColors.payments
          }]
        },
        options: {
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: 'white' }
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  }

  return { html, pageEvents };
};

export default dashboard;