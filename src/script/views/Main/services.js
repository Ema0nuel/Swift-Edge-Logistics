import Navbar from "/src/script/components/navbar";
import Footer from "/src/script/components/footer";
import swiftLogoLight from "/src/images/logo.png";
import swiftLogoDark from "/src/images/logo.jpg";
import { reset } from '/src/script/utils/reset'

const services = () => {
  reset('Plans')
  function pageEvents() {
    // Add any interactive logic here if needed
    Navbar().pageEvents()
  }

  return ({
    html: /* html */`
        <div class="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light font-sans">
          ${Navbar().html}
     <main class="flex-1 pt-12">
      <div class="container mx-auto px-4 py-10">
        <h1 class="text-4xl font-bold text-gray-900 mb-4 text-center dark:text-accent">Swift Edge Logistics Services</h1>
        <p class="text-lg text-primary dark:text-white mb-6">
          Discover our full suite of logistics solutions designed for industrial, retail, and security needs. We combine technology, expertise, and a vetted team to deliver your goods safely, quickly, and reliably.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <img src="https://www.dropoff.com/wp-content/uploads/2023/03/Fast-shipping.png" alt="Same-Day Delivery" class="h-24 mb-4" />
            <div class="font-semibold text-lg mb-2 dark:text-accent">Same-Day Delivery</div>
            <p class="text-gray-600 text-center">Urgent shipments delivered within hours. Real-time tracking and guaranteed on-time arrival.</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <img src="https://www.dropoff.com/wp-content/uploads/2023/03/API.png" alt="API Integration" class="h-24 mb-4" />
            <div class="font-semibold text-lg mb-2 dark:text-accent">API Integration</div>
            <p class="text-gray-600 text-center">Connect your business systems for seamless order management and delivery tracking.</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <img src="https://www.dropoff.com/wp-content/uploads/2023/03/Vetted.png" alt="Vetted Drivers" class="h-24 mb-4" />
            <div class="font-semibold text-lg mb-2 dark:text-accent">Vetted, Professional Drivers</div>
            <p class="text-gray-600 text-center">All drivers are background-checked, certified, and trained for your industry’s standards.</p>
          </div>
        </div>
        <div class="py-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-accent mb-4">Industries We Serve</h2>
          <ul class="list-disc list-inside text-lg text-gray-700 dark:text-white">
            <li>Industrial: Auto parts, construction, HVAC, heavy equipment</li>
            <li>Retail: E-commerce, bakeries, meal prep, floral, pet goods, fashion</li>
            <li>Security: Secure transport, confidential documents, high-value assets</li>
          </ul>
        </div>
        <div class="py-8">
          <a href="/about" data-nav class="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-red-700 transition">Talk to an Expert</a>
        </div>
      </div>
      </main>
      ${Footer().html}
      </div>
          `,
    pageEvents
  });
}

export default services;
