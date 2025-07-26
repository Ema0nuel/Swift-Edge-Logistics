import Navbar from "/src/script/components/navbar";
import Footer from "/src/script/components/footer";
import swiftLogoLight from "/src/images/logo.png";
import swiftLogoDark from "/src/images/logo.jpg";
import { reset } from "/src/script/utils/reset";

const dropOff = () => {
  reset("Dropoff");
  function pageEvents() {
    Navbar().pageEvents();
  }

  return {
    html: /* html */`
      <div class="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light font-sans">
        ${Navbar().html}
        <main class="flex-1 main">
          <!-- Hero Section -->
          <section class="hero-section hero-section__ip__center relative bg-background-light dark:bg-background-dark">
            <div class="absolute inset-0 z-0">
              <img src="https://www.dropoff.com/wp-content/webp-express/webp-images/uploads/2023/04/number-boxes-1.png.webp" alt="Dropoff background" class="w-full h-full object-cover opacity-60" />
            </div>
            <div class="container relative z-10 py-12 flex flex-col md:flex-row items-center gap-8">
              <div class="flex-1">
                <h1 class="hero-block-title text-4xl md:text-5xl font-bold text-primary dark:text-accent mb-4 drop-shadow-lg">More Than A Delivery Service</h1>
                <p class="max-w-xl text-lg mb-4">Whether you need occasional deliveries or are dependent on logistics, Dropoff is here to help your day-to-day operations run smoothly. We adapt to your unique needs and scale to meet the demands of your growing business.</p>
                <a class="btn btn-primary btn-large" href="/get-started/" data-nav>Talk to an Expert</a>
              </div>
              <div class="flex-1 flex justify-center">
                <img src="https://www.dropoff.com/wp-content/webp-express/webp-images/uploads/2023/04/number-boxes-1.png.webp" alt="Dropoff in Numbers" class="rounded-lg shadow-lg w-full max-w-md object-cover" />
              </div>
            </div>
          </section>

          <!-- Dropoff in Numbers -->
          <section class="py-8 bg-peach-soft">
            <div class="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
              <div class="flex-1 flex justify-center">
                <img src="https://www.dropoff.com/wp-content/webp-express/webp-images/uploads/2023/04/number-boxes-1.png.webp" alt="Dropoff in Numbers" class="rounded-lg shadow-lg w-full max-w-md object-cover" />
              </div>
              <div class="flex-1">
                <h2 class="text-2xl font-bold mb-2 text-primary dark:text-accent">Dropoff in Numbers</h2>
                <p class="mb-4 text-primary-dark">We designed our services to adapt to your every need. We bring the logistics experts, couriers, and fleet needed to get things done. From lab work to catered meals, we have you covered.</p>
                <a class="btn btn-primary text-primary-dark" href="/signup" data-nav>Talk to an Expert</a>
              </div>
            </div>
          </section>

          <!-- The Dropoff Difference -->
          <section class="py-8 bg-white dark:bg-background-dark">
            <div class="container mx-auto px-4">
              <h2 class="text-2xl font-bold mb-4 text-primary dark:text-accent">The Dropoff Difference</h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-primary-dark">
                <div class="bg-peach rounded-lg shadow p-6 flex flex-col items-center">
                  <img src="https://www.dropoff.com/wp-content/webp-express/webp-images/uploads/2023/04/Rate.png.webp" alt="Couriers" class="h-16 mb-2" />
                  <h4 class="font-bold mb-2">Couriers</h4>
                  <p class="text-center">Professional, highly-trained couriers go through a seven-day vetting process and are continually rated by customers.</p>
                </div>
                <div class="bg-peach rounded-lg shadow p-6 flex flex-col items-center">
                  <img src="https://www.dropoff.com/wp-content/webp-express/webp-images/uploads/2023/04/Customer-Service.png.webp" alt="Customer Service" class="h-16 mb-2" />
                  <h4 class="font-bold mb-2">Customer Service</h4>
                  <p class="text-center">Custom logistics programs designed for your needs. 24/7 support and rapid city setup.</p>
                </div>
                <div class="bg-peach rounded-lg shadow p-6 flex flex-col items-center">
                  <img src="https://www.dropoff.com/wp-content/webp-express/webp-images/uploads/2023/01/Tracking.png.webp" alt="Reliability & Experience" class="h-16 mb-2" />
                  <h4 class="font-bold mb-2">Reliability & Experience</h4>
                  <p class="text-center">Over a million deliveries nationwide. Consistent, dependable service and real-time tracking.</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Schedule On-Demand Section -->
          <section class="py-8 bg-peach">
            <div class="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
              <div class="flex-1">
                <h2 class="text-2xl font-bold mb-2 text-primary dark:text-accent">Schedule On-Demand Or Recurring Deliveries</h2>
                <p class="mb-4 text-primary">Your business requirements can change minute-to-minute. Our easy-to-use portal allows you to schedule pick-ups and deliveries with ease, whether it's on-demand or on a recurring schedule.</p>
                <a class="btn btn-primary text-primary" href="/login" data-nav>Get Started Today</a>
              </div>
              <div class="flex-1 flex justify-center">
                <img src="https://www.dropoff.com/wp-content/webp-express/webp-images/uploads/2023/04/15.png.webp" alt="Schedule Deliveries" class="rounded-lg shadow-lg w-full max-w-md object-cover" />
              </div>
            </div>
          </section>
        </main>
        ${Footer().html}
      </div>
    `,
    pageEvents
  };
};

export default dropOff;