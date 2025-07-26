import Navbar from "/src/script/components/navbar";
import Footer from "/src/script/components/footer";
import swiftLogoLight from "/src/images/logo.png";
import swiftLogoDark from "/src/images/logo.jpg";
import { reset } from "/src/script/utils/reset";

const retail = () => {
  reset("Retail");
  function pageEvents() {
    Navbar().pageEvents()
    // Tab functionality for retail businesses
    const tabs = document.querySelectorAll(".uabb-tab-link");
    const sections = document.querySelectorAll(".section");
    tabs.forEach((tab, idx) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) =>
          t.parentElement.parentElement.classList.remove("uabb-tab-current")
        );
        tab.parentElement.parentElement.classList.add("uabb-tab-current");
        sections.forEach((sec, i) => {
          sec.classList.toggle("uabb-content-current", i === idx);
        });
      });
    });
    // FAQ accordion
    document.querySelectorAll(".uabb-faq-questions-button").forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.classList.toggle("active");
        btn.nextElementSibling.style.display = btn.classList.contains("active")
          ? "block"
          : "none";
      });
    });
  }

  return {
    html: /* html */ `
        <div class="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light font-sans">
          ${Navbar().html}
     <main class="flex-1 pt-12">
      <div class="fl-content-full container mx-auto px-4 py-10">
        <div class="row flex flex-col md:flex-row gap-10 items-center">
          <div class="fl-content col-md-6">
            <h1 class="text-4xl font-bold text-gray-900 mb-4 dark:text-accent">Retail Delivery Service</h1>
            <p class="text-lg text-gray-700 dark:text-white mb-6">
              At Swift Edge, our team of logistics experts provides reliable and cost-effective retail delivery services for businesses of all sizes. Our mission is to make it easy for retailers to get their products into the hands of customers.
            </p>
            <a href="/login" data-nav class="inline-block bg-accent-dark text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-red-700 transition">Talk to an Expert</a>
          </div>
          <div class="fl-content col-md-6 flex justify-center">
            <img src="https://www.dropoff.com/wp-content/uploads/2023/03/Retail.png" alt="Retail Delivery" class="rounded-xl shadow-lg w-full max-w-lg" />
          </div>
        </div>
        <div class="client-brands py-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-accent mb-6">Our Clients in Retail Space</h2>
          <div class="flex flex-wrap gap-8 justify-center items-center dark:bg-white rounded-md">
            <img src="https://www.dropoff.com/wp-content/themes/bb-theme-child/media/clients-logos-svg/zimmermann.png" alt="Zimmermann" class="h-16" />
            <img src="https://www.dropoff.com/wp-content/themes/bb-theme-child/media/clients-logos-svg/susie-cackes.svg" alt="Susie Cakes" class="h-16" />
            <img src="https://www.dropoff.com/wp-content/themes/bb-theme-child/media/clients-logos-svg/racetrack.svg" alt="Racetrack" class="h-16" />
            <img src="https://www.dropoff.com/wp-content/themes/bb-theme-child/media/clients-logos-svg/dropit.svg" alt="Dropit" class="h-16" />
            <img src="https://www.dropoff.com/wp-content/themes/bb-theme-child/media/clients-logos-svg/reeds.svg" alt="Reeds" class="h-16" />
            <img src="https://www.dropoff.com/wp-content/themes/bb-theme-child/media/clients-logos-svg/neiman.svg" alt="Neiman" class="h-16" />
            <img src="https://www.dropoff.com/wp-content/themes/bb-theme-child/media/clients-logos-svg/whole-foods.svg" alt="Whole Foods" class="h-16" />
            <img src="https://www.dropoff.com/wp-content/themes/bb-theme-child/media/clients-logos-svg/sprinkles.svg" alt="Sprinkles" class="h-16" />
          </div>
        </div>
        <div class="services bg-gradient-to-r from-gray-100 to-gray-200 py-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Swift Edge?</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.dropoff.com/wp-content/uploads/2023/03/Vetted.png" alt="Vetted" class="h-24 mb-4" />
              <div class="font-semibold text-lg mb-2 dark:text-accent">Vetted, Professional Drivers</div>
              <p class="text-gray-600 text-center">All drivers undergo a rigorous vetting process and are trained in retail logistics standards and safe handling of merchandise.</p>
            </div>
            <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.dropoff.com/wp-content/uploads/2023/03/Fast-shipping.png" alt="Fast shipping" class="h-24 mb-4" />
              <div class="font-semibold text-lg mb-2 dark:text-accent">High On-Time Delivery Rate</div>
              <p class="text-gray-600 text-center">Local experts ensure every pickup and delivery is tracked and rated for continuous improvement. Timeliness is our promise.</p>
            </div>
            <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.dropoff.com/wp-content/uploads/2023/03/API.png" alt="API" class="h-24 mb-4" />
              <div class="font-semibold text-lg mb-2 dark:text-accent">API Integration</div>
              <p class="text-gray-600 text-center">Seamless integration with your business systems for real-time tracking and logistics management.</p>
            </div>
          </div>
        </div>
        <div class="tabs-section py-12">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-accent mb-6">Retail Businesses We Serve</h2>
          <nav class="uabb-tabs-nav flex gap-4 mb-4">
            <ul class="flex flex-wrap gap-2">
              <li class="uabb-tab-current" data-index="0"><a class="uabb-tab-link cursor-pointer px-4 py-2 rounded bg-red-100 text-red-700 font-semibold">E-Commerce</a></li>
              <li data-index="1"><a class="uabb-tab-link cursor-pointer px-4 py-2 rounded bg-gray-100 text-gray-700 font-semibold">Meal Prep</a></li>
              <li data-index="2"><a class="uabb-tab-link cursor-pointer px-4 py-2 rounded bg-gray-100 text-gray-700 font-semibold">Catering</a></li>
              <li data-index="3"><a class="uabb-tab-link cursor-pointer px-4 py-2 rounded bg-gray-100 text-gray-700 font-semibold">Bakeries</a></li>
              <li data-index="4"><a class="uabb-tab-link cursor-pointer px-4 py-2 rounded bg-gray-100 text-gray-700 font-semibold">Pet Care Goods</a></li>
              <li data-index="5"><a class="uabb-tab-link cursor-pointer px-4 py-2 rounded bg-gray-100 text-gray-700 font-semibold">Floral Businesses</a></li>
              <li data-index="6"><a class="uabb-tab-link cursor-pointer px-4 py-2 rounded bg-gray-100 text-gray-700 font-semibold">Retail Chains</a></li>
              <li data-index="7"><a class="uabb-tab-link cursor-pointer px-4 py-2 rounded bg-gray-100 text-gray-700 font-semibold">Fashion Retail</a></li>
            </ul>
          </nav>
          <div class="uabb-content-wrap">
            <div class="section uabb-content-current">
              <div class="flex flex-col md:flex-row gap-8 items-center">
                <div class="bubble-bg"><img src="https://www.dropoff.com/wp-content/uploads/2023/03/L-3.png" alt="E-Commerce" class="w-64 h-64 object-cover rounded-xl" /></div>
                <div>
                  <h4 class="text-xl font-bold mb-2">E-Commerce</h4>
                  <p>Technology and services for startups and enterprise fulfillment. Timely and accurate deliveries with in-house software and processes.</p>
                  <a href="/about" data-nav class="stroke-btn text-red-600 underline">Learn more</a>
                </div>
              </div>
            </div>
            <div class="section hidden">
              <div class="flex flex-col md:flex-row gap-8 items-center">
                <div class="bubble-bg"><img src="https://www.dropoff.com/wp-content/uploads/2023/03/L-1.png" alt="Meal Prep" class="w-64 h-64 object-cover rounded-xl" /></div>
                <div>
                  <h4 class="text-xl font-bold mb-2">Meal Prep</h4>
                  <p>Same-day delivery for meal prep businesses. Climate-controlled vehicles keep food fresh and safe for your customers.</p>
                  <a href="/about" data-nav class="stroke-btn text-red-600 underline">Learn more</a>
                </div>
              </div>
            </div>
            <div class="section hidden">
              <div class="flex flex-col md:flex-row gap-8 items-center">
                <div class="bubble-bg"><img src="https://www.dropoff.com/wp-content/uploads/2023/03/L-4.png" alt="Catering" class="w-64 h-64 object-cover rounded-xl" /></div>
                <div>
                  <h4 class="text-xl font-bold mb-2">Catering</h4>
                  <p>Reliable courier service for catering deliveries. User-friendly platform for placing orders and ensuring food arrives fresh and on time.</p>
                  <a href="/about" data-nav class="stroke-btn text-red-600 underline">Learn more</a>
                </div>
              </div>
            </div>
            <div class="section hidden">
              <div class="flex flex-col md:flex-row gap-8 items-center">
                <div class="bubble-bg"><img src="https://www.dropoff.com/wp-content/uploads/2023/03/L-5.png" alt="Bakeries" class="w-64 h-64 object-cover rounded-xl" /></div>
                <div>
                  <h4 class="text-xl font-bold mb-2">Bakeries</h4>
                  <p>Courier services for bakeries. From birthday cakes to fresh bread, we deliver quickly and safely.</p>
                  <a href="/about" data-nav class="stroke-btn text-red-600 underline">Learn more</a>
                </div>
              </div>
            </div>
            <div class="section hidden">
              <div class="flex flex-col md:flex-row gap-8 items-center">
                <div class="bubble-bg"><img src="https://www.dropoff.com/wp-content/uploads/2023/03/L.png" alt="Pet Care Goods" class="w-64 h-64 object-cover rounded-xl" /></div>
                <div>
                  <h4 class="text-xl font-bold mb-2">Pet Care Goods</h4>
                  <p>Convenient delivery for pet stores, clinics, and daycares. Supplies delivered to pet parents when they need them.</p>
                  <a href="/about" data-nav class="stroke-btn text-red-600 underline">Learn more</a>
                </div>
              </div>
            </div>
            <div class="section hidden">
              <div class="flex flex-col md:flex-row gap-8 items-center">
                <div class="bubble-bg"><img src="https://www.dropoff.com/wp-content/uploads/2023/03/L-2.png" alt="Floral Businesses" class="w-64 h-64 object-cover rounded-xl" /></div>
                <div>
                  <h4 class="text-xl font-bold mb-2">Floral Businesses</h4>
                  <p>Nationwide delivery for florists. We help you connect with customers and grow your business with best-in-class service.</p>
                  <a href="/about" data-nav class="stroke-btn text-red-600 underline">Learn more</a>
                </div>
              </div>
            </div>
            <div class="section hidden">
              <div class="flex flex-col md:flex-row gap-8 items-center">
                <div class="bubble-bg"><img src="https://www.dropoff.com/wp-content/uploads/2023/03/L-1-1.png" alt="Retail Chains" class="w-64 h-64 object-cover rounded-xl" /></div>
                <div>
                  <h4 class="text-xl font-bold mb-2">Retail Chains</h4>
                  <p>Expand your reach and optimize deliveries. Technology-enabled platform ensures products arrive on time and in perfect condition.</p>
                  <a href="/about" data-nav class="stroke-btn text-red-600 underline">Learn more</a>
                </div>
              </div>
            </div>
            <div class="section hidden">
              <div class="flex flex-col md:flex-row gap-8 items-center">
                <div class="bubble-bg"><img src="https://www.dropoff.com/wp-content/uploads/2023/03/L-2-1.png" alt="Fashion Retail" class="w-64 h-64 object-cover rounded-xl" /></div>
                <div>
                  <h4 class="text-xl font-bold mb-2">Fashion Retail</h4>
                  <p>Same-day and next-day delivery for stores and distribution centers. Experts in fashion logistics ensure efficient and detailed deliveries.</p>
                  <a href="/about" data-nav class="stroke-btn text-red-600 underline">Learn more</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="industries-v2-cta py-12 bg-gray-400 mx-auto">
          <h3 class="text-2xl font-bold text-gray-900 mb-4 text-center">Boost Your Delivery Speed From Pick-Up To Dropoff</h3>
          <a href="/login" class="relative block w-fit text-center mx-auto bg-accent text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-accent-dark transition mb-6 z-20">Talk To an Expert</a>
          <div class="flex gap-8 justify-center">
            <img src="https://www.dropoff.com/wp-content/uploads/2023/03/img.png" alt="Retail Delivery" class="rounded-xl w-64 h-48 object-cover" />
            <img src="https://www.dropoff.com/wp-content/uploads/2023/03/img-1.png" alt="Retail Delivery 2" class="rounded-xl w-80 h-56 object-cover" />
          </div>
        </div>
        <div class="faq-v3 py-12">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-accent mb-6">Got More Questions?</h2>
          <div class="uabb-faq-module">
            <div class="uabb-faq-item mb-4">
              <div class="uabb-faq-questions-button cursor-pointer bg-gray-100 px-4 py-2 rounded font-semibold dark:text-primary-dark">How do I schedule a delivery?</div>
              <div class="uabb-faq-content hidden px-4 py-2">Log into your Swift Edge account, add order details, review, and submit. Need help? <a href="/contact" data-nav class="text-red-600 underline">Talk with an expert here</a>.</div>
            </div>
            <div class="uabb-faq-item mb-4">
              <div class="uabb-faq-questions-button cursor-pointer bg-gray-100 px-4 py-2 rounded font-semibold dark:text-primary-dark">How do I create an account?</div>
              <div class="uabb-faq-content hidden px-4 py-2">Talk with an expert before setting up an account. Fill out our <a href="/about" data-nav class="text-red-600 underline">Sales Form</a> or call <a href="tel:+18883767633" class="text-red-600 underline">1-888-DROPOFF</a>, ext 2.</div>
            </div>
            <div class="uabb-faq-item mb-4">
              <div class="uabb-faq-questions-button cursor-pointer bg-gray-100 px-4 py-2 rounded font-semibold dark:text-primary-dark">Does Swift Edge deliver in my area?</div>
              <div class="uabb-faq-content hidden px-4 py-2">We serve 58 cities nationwide and expanding. <a href="/about" data-nav class="text-red-600 underline">See locations</a> or call <a href="tel:+18883767633" class="text-red-600 underline">1-888-DROPOFF</a>, ext. 1.</div>
            </div>
            <div class="uabb-faq-item mb-4">
              <div class="uabb-faq-questions-button cursor-pointer bg-gray-100 px-4 py-2 rounded font-semibold dark:text-primary-dark">Why use a retail delivery service?</div>
              <div class="uabb-faq-content hidden px-4 py-2">Retail delivery services offer same-day delivery, know traffic patterns, and ensure your package arrives on time with expedited service.</div>
            </div>
            <div class="uabb-faq-item mb-4">
              <div class="uabb-faq-questions-button cursor-pointer bg-gray-100 px-4 py-2 rounded font-semibold dark:text-primary-dark">What industries need same-day delivery services the most?</div>
              <div class="uabb-faq-content hidden px-4 py-2">E-commerce, food, floral, manufacturing, health/pharma, medical labs, law firms, and offices.</div>
            </div>
            <div class="uabb-faq-item mb-4">
              <div class="uabb-faq-questions-button cursor-pointer bg-gray-100 px-4 py-2 rounded font-semibold dark:text-primary-dark">How do retail courier services work?</div>
              <div class="uabb-faq-content hidden px-4 py-2">Companies can fulfill to a depot or send products directly to the courier. Couriers optimize routes for time and cost savings.</div>
            </div>
          </div>
        </div>
        <div class="latest-insights py-12">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-accent mb-6">Our Recent Retail Insights</h2>
          <div class="carousel-wrapper flex gap-8 overflow-x-auto">
            <div class="post-item min-w-[325px]">
              <div class="post-thumbnail mb-2">
                <a href="/about" data-nav><img src="https://www.dropoff.com/wp-content/uploads/2024/03/Ecommerce-Warehouse-In-Depth-Guide-And-Best-Practices-For-2024.png" alt="Ecommerce Warehouse" class="rounded-lg w-full h-40 object-cover" /></a>
              </div>
              <h3 class="subtitle-2 font-semibold"><a href="https://www.dropoff.com/blog/ecommerce-warehouse/">Ecommerce Warehouse – In-Depth Guide And Best Practices For 2024</a></h3>
              <div class="post-meta text-gray-500 text-sm">By Sean Spector | Feb 21, 2024 | 11 min read</div>
            </div>
            <div class="post-item min-w-[325px]">
              <div class="post-thumbnail mb-2">
                <a href="/about" data-nav><img src="https://www.dropoff.com/wp-content/uploads/2024/02/Ultimate-Guide-to-Last-Mile-Delivery-in-E-Commerce-2024.png" alt="Last-Mile Delivery" class="rounded-lg w-full h-40 object-cover" /></a>
              </div>
              <h3 class="subtitle-2 font-semibold"><a href="https://www.dropoff.com/blog/ultimate-guide-last-mile-ecommerce/">Ultimate Guide to Last-Mile Delivery in E-Commerce 2024</a></h3>
              <div class="post-meta text-gray-500 text-sm">By Sean Spector | Jan 13, 2024 | 11 min read</div>
            </div>
            <div class="post-item min-w-[325px]">
              <div class="post-thumbnail mb-2">
                <a href="/about" data-nav><img src="https://www.dropoff.com/wp-content/uploads/2023/12/15-Best-E-Commerce-Shipping-Companies-in-the-US.png" alt="Shipping Companies" class="rounded-lg w-full h-40 object-cover" /></a>
              </div>
              <h3 class="subtitle-2 font-semibold"><a href=/contact" data-nav>15 Best eCommerce Shipping Companies in the US</a></h3>
              <div class="post-meta text-gray-500 text-sm">By Sean Spector | Nov 24, 2023 | 9 min read</div>
            </div>
          </div>
        </div>
      </div>
      </main>
      ${Footer().html}
      </div>
          `,
    pageEvents,
  };
};

export default retail;
