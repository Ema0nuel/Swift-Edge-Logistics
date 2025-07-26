import Navbar from "/src/script/components/navbar";
import Footer from "/src/script/components/footer";
import swiftLogoLight from "/src/images/logo.png";
import swiftLogoDark from "/src/images/logo.jpg";
import { reset } from '/src/script/utils/reset'

const about = () => {
  reset('About Us')
  function pageEvents() {
    // Add any interactive logic here if needed
    Navbar().pageEvents()
  }

  return {
    html: /* html */`
      <div class="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light font-sans">
        ${Navbar().html}
        <main class="flex-1">
          <!-- Hero Section -->
          <section class="relative w-full hero-section hero-single hero-section__ip__center hero-section--large bg-background-light dark:bg-background-dark">
            <div class="hero-block py-8 md:py-16">
              <div class="container mx-auto px-4">
                <div class="flex flex-col items-center justify-center">
                  <div class="mb-4">
                    <picture>
                      <img src="${swiftLogoLight}" alt="Swift Edge Logistics Logo" class="h-16 block dark:hidden mx-auto" />
                      <img src="${swiftLogoDark}" alt="Swift Edge Logistics Logo" class="h-16 hidden dark:block mx-auto" />
                    </picture>
                  </div>
                  <h1 class="headtitle text-4xl md:text-5xl font-bold text-primary dark:text-accent mb-4 animate-pulse">About Us</h1>
                  <div class="bg-stretch _bg rounded-lg overflow-hidden shadow-lg mb-4">
                    <picture>
                      <source srcset="https://www.uberfreight.com/wp-content/uploads/2022/10/about-us-banner.jpeg" media="(min-width: 481px)">
                      <img src="https://www.uberfreight.com/wp-content/uploads/2023/12/about-us-mobile-375x812.jpg" srcset="https://www.uberfreight.com/wp-content/uploads/2023/12/about-us-mobile.jpg 2x" alt="About us" title="about-us-banner" class="w-full object-cover h-48 md:h-96" />
                    </picture>
                  </div>
                </div>
              </div>
            </div>
            <div class="hero-content py-6 md:py-12">
              <div class="container mx-auto px-4">
                <div class="text-wrap _w1 text-center">
                  <h3 class="subtitle text-2xl font-semibold text-accent mb-2">Our Mission</h3>
                  <span class="text-lg block text-text-subtle mb-2">Leading the pace of logistics to move the world’s goods.</span>
                  <p class="max-w-2xl mx-auto text-base md:text-lg text-text-dark dark:text-text-light">
                    At Swift Edge Logistics, we are dedicated to redefining the future of logistics. Our mission is to deliver seamless, intelligent, and reliable solutions that empower businesses and individuals to move goods faster, safer, and smarter. We combine technology, expertise, and a customer-first approach to ensure every shipment arrives on time, every time.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Background Image Section -->
          <section class="bg-section py-8 md:py-16">
            <div class="container mx-auto px-4">
              <div class="bg-section-content"></div>
            </div>
            <div class="bg-stretch rounded-lg overflow-hidden shadow-lg">
              <picture>
                <img src="https://www.uberfreight.com/wp-content/uploads/2022/08/bg-08@2x-scaled-1920x1080.jpg" srcset="https://www.uberfreight.com/wp-content/uploads/2022/08/bg-08@2x-scaled.jpg 2x" alt="Swift Edge Logistics Skyline" class="w-full object-cover h-48 md:h-96" />
              </picture>
            </div>
          </section>
          <div class="spacer h-8 md:h-16"></div>

          <!-- Intelligent Logistics Section -->
          <section class="content-section section s-bottom py-12 bg-peach-soft dark:bg-background-dark">
            <div class="container mx-auto px-4">
              <div class="section-headline text-center mb-8">
                <h2 class="text-3xl md:text-4xl font-bold text-primary dark:text-accent mb-4">Powering Intelligent Logistics™</h2>
                <p class="max-w-2xl mx-auto text-base md:text-lg text-text-dark dark:text-text-light">
                  Swift Edge Logistics delivers an end-to-end suite of relational logistics to advance supply chains and move the world’s goods. We offer a unique blend of technology, capacity, and partnership. Our AI-optimized network surfaces deep insights to supercharge and streamline operations. In any mode, market, and configuration, we align shippers and carriers through dynamic capacity and expert partnership, pairing deep industry expertise and high-touch service for the best results. We thrive in complexity, building new efficiencies at every stage to help businesses run as intelligently as possible.
                </p>
              </div>
              <ul class="tile-list grid grid-cols-1 md:grid-cols-3 gap-8">
                <li>
                  <div class="tile-card bg-white dark:bg-primary-light rounded-lg shadow p-6 flex flex-col items-center">
                    <div class="tile-card-visual mb-4">
                      <picture>
                        <img src="https://www.uberfreight.com/wp-content/uploads/2022/08/img-30@2x-400x250.jpg" srcset="https://www.uberfreight.com/wp-content/uploads/2022/08/img-30@2x.jpg 2x" alt="Connected" class="rounded-lg w-full h-32 object-cover" />
                      </picture>
                    </div>
                    <h4 class="tile-card-title text-xl font-bold text-primary dark:text-accent mb-2">Connected</h4>
                    <p class="text-base text-text-dark dark:text-text-light text-center">
                      We bridge the gap in logistics through state-of-the-art connectivity, fostering seamless interactions and real-time solutions. Our technology and services unite all stakeholders, streamlining operations and enhancing collaboration.
                    </p>
                  </div>
                </li>
                <li>
                  <div class="tile-card bg-white dark:bg-primary-light rounded-lg shadow p-6 flex flex-col items-center">
                    <div class="tile-card-visual mb-4">
                      <picture>
                        <img src="https://www.uberfreight.com/wp-content/uploads/2022/08/img-21@2x-250x250.jpg" srcset="https://www.uberfreight.com/wp-content/uploads/2022/08/img-21@2x-500x500.jpg 2x" alt="Agile" class="rounded-lg w-full h-32 object-cover" />
                      </picture>
                    </div>
                    <h4 class="tile-card-title text-xl font-bold text-primary dark:text-accent mb-2">Agile</h4>
                    <p class="text-base text-text-dark dark:text-text-light text-center">
                      We prioritize agility, swiftly adapting to the ever-evolving needs of the logistics industry. Our solutions are designed to be nimble, ensuring our partners stay ahead of challenges and capitalize on opportunities.
                    </p>
                  </div>
                </li>
                <li>
                  <div class="tile-card bg-white dark:bg-primary-light rounded-lg shadow p-6 flex flex-col items-center">
                    <div class="tile-card-visual mb-4">
                      <picture>
                        <img src="https://www.uberfreight.com/wp-content/uploads/2022/08/img-32@2x-400x250.jpg" srcset="https://www.uberfreight.com/wp-content/uploads/2022/08/img-32@2x.jpg 2x" alt="Empowering" class="rounded-lg w-full h-32 object-cover" />
                      </picture>
                    </div>
                    <h4 class="tile-card-title text-xl font-bold text-primary dark:text-accent mb-2">Empowering</h4>
                    <p class="text-base text-text-dark dark:text-text-light text-center">
                      We believe in empowering our customers, providing them with tools and solutions that amplify their capabilities. Our innovative solutions enable businesses to reach their fullest potential, driving growth and operational excellence.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <!-- Our Values Section -->
          <section class="promo-section section bg-peach py-12">
            <div class="container mx-auto px-4">
              <h2 class="headtitle text-3xl md:text-4xl font-bold text-primary dark:text-accent mb-6 text-center">Our Values</h2>
              <div class="section-img mb-8 rounded-lg overflow-hidden shadow-lg">
                <img src="https://www.uberfreight.com/wp-content/uploads/2023/12/100621_Uber_Recruiting_Shot02_0267-1440x490.jpg" srcset="https://www.uberfreight.com/wp-content/uploads/2023/12/100621_Uber_Recruiting_Shot02_0267-2500x980.jpg 2x" alt="group of people looking at computers" class="w-full object-cover h-48 md:h-96" />
              </div>
              <div class="features grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="features-card bg-white dark:bg-primary-light rounded-lg shadow p-6">
                  <h4 class="features-card-title text-lg font-bold text-primary dark:text-accent mb-2">Customer Success</h4>
                  <p class="text-base text-text-dark dark:text-text-light">
                    We work passionately to deliver positive, measurable outcomes for shippers, carriers, employees, and our communities – every load, every time.
                  </p>
                </div>
                <div class="features-card bg-white dark:bg-primary-light rounded-lg shadow p-6">
                  <h4 class="features-card-title text-lg font-bold text-primary dark:text-accent mb-2">Innovate with Purpose</h4>
                  <p class="text-base text-text-dark dark:text-text-light">
                    We are innovative thinkers harnessing advanced technologies and our experience to create new ideas for the benefit of all.
                  </p>
                </div>
                <div class="features-card bg-white dark:bg-primary-light rounded-lg shadow p-6">
                  <h4 class="features-card-title text-lg font-bold text-primary dark:text-accent mb-2">Stronger Together</h4>
                  <p class="text-base text-text-dark dark:text-text-light">
                    We foster collaborative environments where everyone can be their authentic self. When we celebrate differences, we become collectively stronger.
                  </p>
                </div>
                <div class="features-card bg-white dark:bg-primary-light rounded-lg shadow p-6">
                  <h4 class="features-card-title text-lg font-bold text-primary dark:text-accent mb-2">Do the Right Thing</h4>
                  <p class="text-base text-text-dark dark:text-text-light">
                    We believe our actions should be grounded in integrity and transparency. We aim to do the right thing, always.
                  </p>
                </div>
              </div>
              <div class="btn-unit flex justify-center mt-10">
                <a class="btn btn-primary btn-large" href="/contact" data-nav>Get Started</a>
              </div>
            </div>
          </section>

          <!-- Locations Section -->
          <section class="slocations section py-12 bg-background-light dark:bg-background-dark">
            <div class="container mx-auto px-4">
              <h2 class="slocations__heading headtitle text-3xl md:text-4xl font-bold text-primary dark:text-accent mb-6 text-center">Our Locations</h2>
              <div class="slocations__map mb-8 flex justify-center">
                <img src="https://www.uberfreight.com/wp-content/uploads/2024/05/map.png" alt="North America" class="rounded-lg shadow-lg w-full max-w-2xl object-cover" />
              </div>
              <div class="slocations__cols grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="slocations__col">
                  <h4 class="slocations__col__title text-lg font-bold text-primary dark:text-accent mb-2">North America</h4>
                  <ul class="slocations__col__cities list-disc pl-5 text-text-dark dark:text-text-light">
                    <li>Chicago (HQ)</li>
                    <li>San Francisco</li>
                    <li>New York</li>
                    <li>Frisco</li>
                    <li>Rogers</li>
                    <li>Monterrey (MX)</li>
                    <li>Mexico City (MX)</li>
                    <li>Oakville (CA)</li>
                    <li>St. Louis</li>
                    <li>Cincinnati</li>
                  </ul>
                </div>
                <div class="slocations__col">
                  <h4 class="slocations__col__title text-lg font-bold text-primary dark:text-accent mb-2">Europe</h4>
                  <ul class="slocations__col__cities list-disc pl-5 text-text-dark dark:text-text-light">
                    <li>Netherlands (EU)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <!-- Testimonials Section -->
          <section class="testimonial-section section bg-peach py-12">
            <div class="container mx-auto px-4">
              <h2 class="headtitle text-3xl md:text-4xl font-bold text-primary dark:text-accent mb-6 text-center">What Our Customers Say About Us</h2>
              <ul class="tile-list grid grid-cols-1 md:grid-cols-3 gap-8">
                <li>
                  <div class="tile-card bg-white dark:bg-primary-light rounded-lg shadow p-6 flex flex-col items-center">
                    <div class="tile-card-logo mb-4">
                      <picture>
                        <img src="https://www.uberfreight.com/wp-content/uploads/2022/08/wis-pak@2x-394x85.jpg" srcset="https://www.uberfreight.com/wp-content/uploads/2022/08/wis-pak@2x.jpg 2x" alt="wis pak logo" class="h-12 object-contain" />
                      </picture>
                    </div>
                    <blockquote class="tile-card-quote text-center">
                      <span class="figcaption font-semibold text-accent">David Magnan, Distribution Manager, Wis-Pak</span>
                      <p class="text-base text-text-dark dark:text-text-light mt-2">“As soon as we hit our busy season, it was incredibly helpful to have the extra capacity Swift Edge Logistics provides.”</p>
                    </blockquote>
                  </div>
                </li>
                <li>
                  <div class="tile-card bg-white dark:bg-primary-light rounded-lg shadow p-6 flex flex-col items-center">
                    <div class="tile-card-logo mb-4">
                      <picture>
                        <img src="https://www.uberfreight.com/wp-content/uploads/2022/08/narragansett@2x-205x85.jpg" srcset="https://www.uberfreight.com/wp-content/uploads/2022/08/narragansett@2x.jpg 2x" alt="narragansett logo" class="h-12 object-contain" />
                      </picture>
                    </div>
                    <blockquote class="tile-card-quote text-center">
                      <span class="figcaption font-semibold text-accent">Bill Heslam, VP of Operations, Narragansett</span>
                      <p class="text-base text-text-dark dark:text-text-light mt-2">“The level of transparency and efficiency that Swift Edge Logistics offers… I haven’t been able to get with any other freight partner.”</p>
                    </blockquote>
                  </div>
                </li>
                <li>
                  <div class="tile-card bg-white dark:bg-primary-light rounded-lg shadow p-6 flex flex-col items-center">
                    <div class="tile-card-logo mb-4">
                      <picture>
                        <img src="https://www.uberfreight.com/wp-content/uploads/2022/08/birch-plastics@2x-182x85.jpg" srcset="https://www.uberfreight.com/wp-content/uploads/2022/08/birch-plastics@2x.jpg 2x" alt="birch logo" class="h-12 object-contain" />
                      </picture>
                    </div>
                    <blockquote class="tile-card-quote text-center">
                      <span class="figcaption font-semibold text-accent">Paul Wilson, Logistics Manager, Birch Plastics</span>
                      <p class="text-base text-text-dark dark:text-text-light mt-2">“I can’t tell you how much easier my life got the very minute I logged into the shipper platform for the first time.”</p>
                    </blockquote>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <!-- CTA Section -->
          <section class="cta-section py-12 bg-background-light dark:bg-background-dark">
            <div class="container mx-auto px-4">
              <div class="cta-tile bg-peach-soft dark:bg-primary-light rounded-lg shadow p-8 flex flex-col items-center">
                <h2 class="cta-tile-title text-2xl md:text-3xl font-bold text-primary dark:text-accent mb-4 text-center">Sign up and get started.</h2>
                <div class="cta-tile-inner text-center mb-6">
                  <p class="text-base md:text-lg text-text-dark dark:text-text-light">
                    We’re here to help you make the most of your logistics and transportation operations.
                  </p>
                </div>
                <div class="btn-row flex gap-4 justify-center">
                  <a class="btn btn-primary" href="/signup" data-nav>Ship with us</a>
                  <a class="btn btn-secondary" href="/login" data-nav>Haul with us</a>
                </div>
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

export default about;