import Navbar from "/src/script/components/navbar";
import Footer from "/src/script/components/footer";
import swiftLogoLight from "/src/images/logo.png";
import swiftLogoDark from "/src/images/logo.jpg";
import { reset } from '/src/script/utils/reset'


const industrial = () => {
  reset("Industries")
  function pageEvents() {
    Navbar().pageEvents()
    // Tab functionality for industrial businesses
    const tabs = document.querySelectorAll('.uabb-tab-link');
    const sections = document.querySelectorAll('.section');
    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.parentElement.parentElement.classList.remove('uabb-tab-current'));
        tab.parentElement.parentElement.classList.add('uabb-tab-current');
        sections.forEach((sec, i) => {
          sec.classList.toggle('uabb-content-current', i === idx);
        });
      });
    });
    // FAQ accordion
    document.querySelectorAll('.uabb-faq-questions-button').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        btn.nextElementSibling.style.display = btn.classList.contains('active') ? 'block' : 'none';
      });
    });
  }

  return ({
    html: /* html */`
        <div class="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light font-sans">
          ${Navbar().html}
     <main class="flex-1 pt-12">
      <div class="fl-content-full container mx-auto px-4 py-10">
        <div class="row flex flex-col md:flex-row gap-10 items-center">
          <div class="fl-content col-md-6">
            <h1 class="text-4xl font-bold text-gray-900 dark:text-accent mb-4">Industrial Courier Services</h1>
            <p class="text-lg text-gray-700 dark:text-white mb-6">
              Our team of logistics experts provides reliable and cost-effective delivery solutions for industrial businesses of all sizes. We offer industrial courier services tailored to the unique needs of your business, for local or nationwide delivery our services scale with you.
            </p>
            <a href="/login" data-nav class="inline-block bg-accent text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-accent-dark transition">Talk to an Expert</a>
          </div>
          <div class="fl-content col-md-6 flex justify-center">
            <img src="https://www.dropoff.com/wp-content/uploads/2023/03/3.png" alt="Industrial Courier" class="rounded-xl shadow-lg w-full max-w-lg" />
          </div>
        </div>
        <div class="client-brands py-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 dark:text-accent">Our Clients in Industrial Space</h2>
          <div class="flex flex-wrap gap-8 justify-center items-center">
            <img src="https://www.dropoff.com/wp-content/themes/bb-theme-child/media/clients-logos-svg/holt.svg" alt="Holt" class="h-16" />
            <img src="https://www.dropoff.com/wp-content/themes/bb-theme-child/media/clients-logos-svg/ups.svg" alt="UPS" class="h-16" />
            <img src="https://www.dropoff.com/wp-content/themes/bb-theme-child/media/clients-logos-svg/kpmg.svg" alt="KPMG" class="h-16" />
            <img src="https://www.dropoff.com/wp-content/themes/bb-theme-child/media/clients-logos-svg/ricon.svg" alt="Ricon" class="h-16" />
          </div>
        </div>
        <div class="services bg-gradient-to-r from-gray-100 to-gray-200 py-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center dark:text-accent">Why Choose Swift Edge?</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.dropoff.com/wp-content/uploads/2023/03/Vetted.png" alt="Vetted" class="h-24 mb-4" />
              <div class="font-semibold text-lg mb-2 dark:text-accent">Vetted, Professional Drivers</div>
              <p class="text-gray-600 text-center">All drivers undergo a rigorous vetting process, including written tests, interviews, and background checks. Our team is certified for industrial standards and safety.</p>
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
          <h2 class="text-2xl font-bold text-gray-900 dark:text-accent mb-6">Industrial Businesses We Serve</h2>
          <nav class="uabb-tabs-nav flex gap-4 mb-4">
            <ul class="flex flex-wrap gap-2">
              <li class="uabb-tab-current" data-index="0"><a class="uabb-tab-link cursor-pointer px-4 py-2 rounded bg-red-100 text-red-700 font-semibold">Auto Parts</a></li>
              <li data-index="1"><a class="uabb-tab-link cursor-pointer px-4 py-2 rounded bg-gray-100 text-gray-700 font-semibold">Construction</a></li>
              <li data-index="2"><a class="uabb-tab-link cursor-pointer px-4 py-2 rounded bg-gray-100 text-gray-700 font-semibold">HVAC</a></li>
              <li data-index="3"><a class="uabb-tab-link cursor-pointer px-4 py-2 rounded bg-gray-100 text-gray-700 font-semibold">Heavy Equipment</a></li>
            </ul>
          </nav>
          <div class="uabb-content-wrap">
            <div class="section uabb-content-current">
              <div class="flex flex-col md:flex-row gap-8 items-center">
                <div class="bubble-bg"><img src="https://www.dropoff.com/wp-content/uploads/2023/03/L-6.png" alt="Auto Parts" class="w-64 h-64 object-cover rounded-xl" /></div>
                <div>
                  <h4 class="text-xl font-bold mb-2">Auto Parts</h4>
                  <p>Express and scheduled deliveries for urgent repairs and regular restocks. Full visibility from pickup to delivery for you and your customers.</p>
                  <a href="/about" data-nav class="stroke-btn text-red-600 underline">Learn more</a>
                </div>
              </div>
            </div>
            <div class="section hidden">
              <div class="flex flex-col md:flex-row gap-8 items-center">
                <div class="bubble-bg"><img src="https://www.dropoff.com/wp-content/uploads/2023/03/L-1-2.png" alt="Construction" class="w-64 h-64 object-cover rounded-xl" /></div>
                <div>
                  <h4 class="text-xl font-bold mb-2">Construction</h4>
                  <p>On-time, accurate material drops at job sites. Our drivers keep your project moving with years of experience in construction logistics.</p>
                  <a href="/about" data-nav class="stroke-btn text-red-600 underline">Learn more</a>
                </div>
              </div>
            </div>
            <div class="section hidden">
              <div class="flex flex-col md:flex-row gap-8 items-center">
                <div class="bubble-bg"><img src="https://www.dropoff.com/wp-content/uploads/2023/03/L-2-2.png" alt="HVAC" class="w-64 h-64 object-cover rounded-xl" /></div>
                <div>
                  <h4 class="text-xl font-bold mb-2">HVAC</h4>
                  <p>Fast delivery for HVAC equipment, residential or commercial. No more waiting for slow deliveries—Swift Edge keeps your business running.</p>
                  <a href="/about" data-nav class="stroke-btn text-red-600 underline">Learn more</a>
                </div>
              </div>
            </div>
            <div class="section hidden">
              <div class="flex flex-col md:flex-row gap-8 items-center">
                <div class="bubble-bg"><img src="https://www.dropoff.com/wp-content/uploads/2023/03/L-3-1.png" alt="Heavy Equipment" class="w-64 h-64 object-cover rounded-xl" /></div>
                <div>
                  <h4 class="text-xl font-bold mb-2">Heavy Equipment</h4>
                  <p>Stress-free transport for heavy, fragile, or oversized items. Let our experts handle the logistics so you can focus on your business.</p>
                  <a href="/about" data-nav class="stroke-btn text-red-600 underline">Learn more</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="industries-case-block py-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 dark:text-accent">Same-Day Delivery For Heavy Equipment Company</h2>
          <div class="flex flex-col md:flex-row gap-8 items-center">
            <img src="https://www.dropoff.com/wp-content/uploads/2023/03/image-68.png" alt="HOLT CAT" class="h-20 mb-4" />
            <div>
              <h4 class="font-bold mb-2">About</h4>
              <p>HOLT CAT is a leader in heavy caterpillar equipment, engines, machines, and rental services. They rely on Swift Edge for daily logistics, software tracking, and on-time delivery of 95% of equipment parts.</p>
              <h4 class="font-bold mt-4 mb-2">What we do for them:</h4>
              <p>We provide ASAP, 2-hour, 4-hour, and route deliveries, plus delivery management software for tracking and inventory logs. Our partnership keeps HOLT CAT’s operations running smoothly.</p>
            </div>
            <img src="https://www.dropoff.com/wp-content/uploads/2023/03/image-315.png" alt="Heavy Equipment" class="rounded-xl shadow-lg w-64 h-64 object-cover" />
          </div>
          <div class="flex gap-8 mt-8">
            <div class="stats-info text-center">
              <h4 class="text-3xl font-bold text-red-600">93%+</h4>
              <p>on-time delivery rate</p>
            </div>
            <div class="stats-info text-center">
              <h4 class="text-3xl font-bold text-red-600">2600+</h4>
              <p>deliveries per month</p>
            </div>
            <div class="stats-info text-center">
              <h4 class="text-3xl font-bold text-red-600">5-star</h4>
              <p>reviews from clients</p>
            </div>
          </div>
          <div class="quote-section mt-10 flex flex-col md:flex-row items-center gap-8">
            <img src="https://www.dropoff.com/wp-content/uploads/2023/03/Mask-group-1.png" alt="Steven Wilson" class="rounded-full h-24 w-24" />
            <div>
              <div class="name font-bold">Steven Wilson <a href="https://www.linkedin.com/" target="_blank" rel="nofollow"><svg width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="13" r="12" stroke="#646468"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M11.6381 11.3954H13.6043V12.3748C13.8875 11.8115 14.6139 11.3054 15.705 11.3054C17.7967 11.3054 18.2933 12.4267 18.2933 14.484V18.2942H16.1757V14.9525C16.1757 13.7809 15.8924 13.1202 15.1714 13.1202C14.1713 13.1202 13.7557 13.8323 13.7557 14.952V18.2942H11.6381V11.3954ZM8.00684 18.2042H10.1245V11.3054H8.00684V18.2042ZM10.4278 9.05593C10.4279 9.23343 10.3927 9.40918 10.3243 9.57295C10.2558 9.73672 10.1555 9.88526 10.0292 10.0099C9.77317 10.2644 9.42662 10.4068 9.06567 10.4059C8.70534 10.4057 8.3596 10.2636 8.1032 10.0105C7.97731 9.88537 7.87734 9.73666 7.80902 9.57287C7.74071 9.40907 7.70538 9.2334 7.70508 9.05593C7.70508 8.69752 7.84802 8.35446 8.10373 8.1014C8.3599 7.8479 8.70579 7.70577 9.0662 7.70593C9.42725 7.70593 9.77349 7.84834 10.0292 8.1014C10.2844 8.35446 10.4278 8.69752 10.4278 9.05593Z" fill="#646468"></path></svg></a></div>
              <div class="position text-gray-600">Regional Parts Manager, HOLT CAT</div>
              <p class="italic mt-2">"We use Swift Edge for the majority of our on-time or scheduled on-call deliveries. The flexibility to help us solve a business problem has been great. We appreciated the ability to have open communication back and forth to improve overall collaboration."</p>
            </div>
          </div>
        </div>
        <div class="industries-v2-cta py-12 bg-gray-300 rounded-lg mx-auto">
          <h3 class="text-2xl font-bold text-gray-900 mb-4 text-center">Ready To Streamline Your Supply Chain With Swift Edge?</h3>
          <a href="/login" data-nav class="relative text-center w-fit mx-auto block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-red-700 transition mb-6">Talk To an Expert</a>
          <div class="flex gap-8 justify-center">
            <img src="https://www.dropoff.com/wp-content/uploads/2023/03/img.png" alt="Supply Chain" class="rounded-xl w-64 h-48 object-cover" />
            <img src="https://www.dropoff.com/wp-content/uploads/2023/03/img-1.png" alt="Supply Chain 2" class="rounded-xl w-80 h-56 object-cover" />
          </div>
        </div>
        <div class="faq-v3 py-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center dark:text-accent">Got More Questions?</h2>
          <div class="uabb-faq-module">
            <div class="uabb-faq-item mb-4">
              <div class="uabb-faq-questions-button cursor-pointer bg-gray-100 px-4 py-2 rounded font-semibold dark:text-primary-dark">What are some of the different types of delivery services offered to industrial businesses?</div>
              <div class="uabb-faq-content hidden px-4 py-2">Swift Edge offers scheduled and same-day delivery shipments. Talk with an expert so we can create the most ideal logistics solutions for your needs.</div>
            </div>
            <div class="uabb-faq-item mb-4">
              <div class="uabb-faq-questions-button cursor-pointer bg-gray-100 px-4 py-2 rounded font-semibold dark:text-primary-dark">I have my own fleet but sometimes need extra help. Can I supplement my fleet with Swift Edge?</div>
              <div class="uabb-faq-content hidden px-4 py-2">Yes. Swift Edge can replace your fleet, augment your fleet, or provide seasonal help during your busy seasons.</div>
            </div>
            <div class="uabb-faq-item mb-4">
              <div class="uabb-faq-questions-button cursor-pointer bg-gray-100 px-4 py-2 rounded font-semibold dark:text-primary-dark">What does Swift Edge transport?</div>
              <div class="uabb-faq-content hidden px-4 py-2">We deliver automotive parts, construction and building materials, HVAC equipment, and heavy freight.</div>
            </div>
            <div class="uabb-faq-item mb-4">
              <div class="uabb-faq-questions-button cursor-pointer bg-gray-100 px-4 py-2 rounded font-semibold dark:text-primary-dark">How fast do you deliver?</div>
              <div class="uabb-faq-content hidden px-4 py-2">Depending on the time of day and mileage, we offer 4-hour, 2-hour, and 90-min windows.</div>
            </div>
            <div class="uabb-faq-item mb-4">
              <div class="uabb-faq-questions-button cursor-pointer bg-gray-100 px-4 py-2 rounded font-semibold dark:text-primary-dark">What are your hours of operation?</div>
              <div class="uabb-faq-content hidden px-4 py-2">Swift Edge is available 24/7. Existing customers can place orders online or call <a href="tel:+18883767633" class="text-red-600 underline">1-888-DROPOFF</a>, ext. 1.</div>
            </div>
            <div class="uabb-faq-item mb-4">
              <div class="uabb-faq-questions-button cursor-pointer bg-gray-100 px-4 py-2 rounded font-semibold dark:text-primary-dark">What is the maximum size and weight for packages?</div>
              <div class="uabb-faq-content hidden px-4 py-2">Packages up to 40 pounds are included in your price. Over 40 pounds, we charge an extra $0.12 per pound. For oversized items, contact us for arrangements.</div>
            </div>
          </div>
        </div>
        <div class="latest-insights py-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 dark:text-accent">Our Recent Industrial Insights</h2>
          <div class="carousel-wrapper flex gap-8 overflow-x-auto">
            <div class="post-item min-w-[325px]">
              <div class="post-thumbnail mb-2">
                <a href="https://www.dropoff.com/blog/the-ultimate-guide-to-logistics-optimization/"><img src="https://www.dropoff.com/wp-content/uploads/2022/05/The-Ultimate-Guide-to-Logistics-Optimization-01-scaled.jpg" alt="Logistics Optimization" class="rounded-lg w-full h-40 object-cover" /></a>
              </div>
              <h3 class="subtitle-2 font-semibold"><a href="https://www.dropoff.com/blog/the-ultimate-guide-to-logistics-optimization/">The Ultimate Guide to Logistics Optimization</a></h3>
              <div class="post-meta text-gray-500 text-sm">By Nessadora Silitonga | May 18, 2022 | 10 min read</div>
            </div>
            <div class="post-item min-w-[325px]">
              <div class="post-thumbnail mb-2">
                <a href="https://www.dropoff.com/blog/everything-you-need-to-know-about-manufacturing-logistics/"><img src="https://www.dropoff.com/wp-content/uploads/2022/05/What-Is-Manufacturing-Logistics-and-What-Does-It-Involve-01-scaled.jpg" alt="Manufacturing Logistics" class="rounded-lg w-full h-40 object-cover" /></a>
              </div>
              <h3 class="subtitle-2 font-semibold"><a href="https://www.dropoff.com/blog/everything-you-need-to-know-about-manufacturing-logistics/">Everything You Need to Know About Manufacturing Logistics</a></h3>
              <div class="post-meta text-gray-500 text-sm">By Nessadora Silitonga | May 11, 2022 | 8 min read</div>
            </div>
            <div class="post-item min-w-[325px]">
              <div class="post-thumbnail mb-2">
                <a href="https://www.dropoff.com/blog/b2b-logistics-how-to-manage-it-successfully/"><img src="https://www.dropoff.com/wp-content/uploads/2022/05/B2B-Logistics-How-to-Manage-it-Successfully-01-scaled.jpg" alt="B2B Logistics" class="rounded-lg w-full h-40 object-cover" /></a>
              </div>
              <h3 class="subtitle-2 font-semibold"><a href="https://www.dropoff.com/blog/b2b-logistics-how-to-manage-it-successfully/">B2B Logistics: How to Manage It Successfully</a></h3>
              <div class="post-meta text-gray-500 text-sm">By Nessadora Silitonga | May 05, 2022 | 10 min read</div>
            </div>
          </div>
        </div>
      </div>
      </main>
      ${Footer().html}
      </div>
          `,
    pageEvents
  });
}

export default industrial;