import Navbar from "/src/script/components/navbar";
import Footer from "/src/script/components/footer";
import swiftLogoLight from "/src/images/logo.png";
import swiftLogoDark from "/src/images/logo.jpg";
import { reset } from '/src/script/utils/reset'

const careers = () => {
  reset('Careers')
  function pageEvents() {
    Navbar().pageEvents();
  }

  return {
    html: /* html */`
      <div class="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light font-sans">
        ${Navbar().html}
        <main class="flex-1">
          <!-- Hero Section with background image -->
          <section 
            class="hero-section hero-single hero-section__ip__center hero-section--large bg-background-light dark:bg-background-dark relative"
            style="background-image: url('https://www.uberfreight.com/wp-content/uploads/2022/08/bg-08@2x-scaled-1920x1080.jpg'); background-size: cover; background-position: center;"
          >
            <div class="absolute inset-0 bg-black bg-opacity-40"></div>
            <div class="hero-block py-8 md:py-16 relative z-10">
              <div class="container mx-auto px-4 flex flex-col items-center">
                <picture>
                  <img src="${swiftLogoLight}" alt="Swift Edge Logistics Logo" class="h-16 block dark:hidden mx-auto mb-4" />
                  <img src="${swiftLogoDark}" alt="Swift Edge Logistics Logo" class="h-16 hidden dark:block mx-auto mb-4" />
                </picture>
                <h1 class="hero-block-title text-4xl md:text-5xl font-bold text-accent mb-4 animate-pulse drop-shadow-lg">Careers that move the world forward</h1>
                <div class="btn-row mb-4">
                  <a class="btn btn-secondary w-auto text-accent" href="#opportunities" data-nav>See all opportunities</a>
                </div>
              </div>
            </div>
            <div class="hero-content py-6 md:py-12 relative z-10 text-accent">
              <div class="container mx-auto px-4 text-center">
                <h2 class="h3-title text-2xl md:text-3xl font-bold mb-2">We’re leading the pace of logistics to move the world’s goods</h2>
                <p class="max-w-2xl mx-auto text-base md:text-lg mb-4">
                  And we’re doing it with an exceptionally talented team of people passionate about creating a better future for the industry that moves everything. We’re driven by the positive impact we have on the communities we serve, and motivated by the challenges we’ve yet to overcome. If you’re energized by the opportunity and responsibility of moving the world forward, we’d like to meet you.
                </p>
              </div>
            </div>
          </section>

          <!-- Impact Section -->
          <section class="bg-section py-8 md:py-16">
            <div class="container mx-auto px-4">
              <div class="bg-section-content text-center mb-8">
                <h2 class="h1-title text-3xl md:text-4xl font-bold mb-2">Your ideas make an impact</h2>
                <p class="max-w-2xl mx-auto text-base md:text-lg">
                  In logistics, small changes can lead to big shifts—a good idea can have impact on a major scale. We don’t just see the industry as it is, we see what it could be, then we make it a reality. We succeed by fostering an environment where the best idea wins, no matter where in the org chart it originates. Because moving this industry forward doesn’t just take skills, talent, and expertise, but imagination. From all of us.
                </p>
              </div>
            </div>
            <div class="bg-stretch _bg _v5 rounded-lg overflow-hidden shadow-lg">
              <picture>
                <img src="https://www.uberfreight.com/wp-content/uploads/2023/12/careers-1-1920x1080.jpg" srcset="https://www.uberfreight.com/wp-content/uploads/2023/12/careers-1.jpg 2x" alt="group of people meeting at a table" class="w-full object-cover h-48 md:h-96" />
              </picture>
            </div>
          </section>
          <div class="spacer h-8 md:h-16"></div>

          <!-- Working at Swift Edge Section -->
          <section class="promo-section section bg-peach py-12">
            <div class="container mx-auto px-4">
              <h2 class="headtitle text-3xl md:text-4xl font-bold text-primary dark:text-accent mb-6 text-center">Working at Swift Edge Logistics</h2>
              <div class="features grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="features-card bg-white dark:bg-primary-light rounded-lg shadow p-6">
                  <h4 class="features-card-title text-lg font-bold text-primary dark:text-accent mb-2">Our people</h4>
                  <p>
                    Behind all the technology, logistics, and data, are people—friendly, smart, passionate individuals from every walk of life and corner of the world who feel comfortable and empowered to be their authentic selves when they show up to work each day.
                  </p>
                </div>
                <div class="features-card bg-white dark:bg-primary-light rounded-lg shadow p-6">
                  <h4 class="features-card-title text-lg font-bold text-primary dark:text-accent mb-2">Our teams</h4>
                  <p>
                    From engineering to sales, data science, operations, customer service, and more. It takes a lot of specialized skills to reimagine the way goods move, and chances are, we could use yours.
                  </p>
                </div>
                <div class="features-card bg-white dark:bg-primary-light rounded-lg shadow p-6">
                  <h4 class="features-card-title text-lg font-bold text-primary dark:text-accent mb-2">Our locations</h4>
                  <p>
                    We have offices across North America and Europe including Chicago, Dallas, San Francisco, Northwest Arkansas, Monterrey, and the Netherlands.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Growth & Quality Section -->
          <section class="tile-section section bg-peach-soft py-12">
            <div class="container mx-auto px-4 dark:text-primary-dark">
              <div class="tile-unit grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="tile-unit-content flex flex-col justify-center">
                  <h2 class="tile-unit-title text-2xl md:text-3xl font-bold mb-2">Accelerated growth</h2>
                  <div class="text-wrap entry mb-4">
                    <p>
                      The potential to change the industry is huge, but we believe it’s the potential of our people that will unlock it. Our commitment to your personal and professional growth goes beyond our quarterly feedback and development conversations. You’ll have opportunities to gain exposure to different project work, expand your experience beyond your discipline, and receive formal training.
                    </p>
                  </div>
                </div>
                <div class="tile-unit-visual rounded-lg overflow-hidden shadow-lg">
                  <img src="https://www.uberfreight.com/wp-content/uploads/2022/08/img-35@2x-778x606.jpg" srcset="https://www.uberfreight.com/wp-content/uploads/2022/08/img-35@2x.jpg 2x" alt="people working" class="w-full object-cover h-48 md:h-96" />
                </div>
              </div>
              <div class="tile-unit _reverse grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div class="tile-unit-content flex flex-col justify-center">
                  <h2 class="tile-unit-title text-2xl md:text-3xl font-bold mb-2">Quality of work and life</h2>
                  <div class="text-wrap entry mb-4">
                    <p>
                      Our total rewards package supports the whole you. Our competitive compensation rewards you for your work, and our health insurance, family planning, wellness, personal time off, and mental health benefits are a great support for everything else.
                    </p>
                  </div>
                </div>
                <div class="tile-unit-visual rounded-lg overflow-hidden shadow-lg">
                  <img src="https://www.uberfreight.com/wp-content/uploads/2022/09/100621_Uber_Recruiting_Shot02_0046-778x606.jpg" srcset="https://www.uberfreight.com/wp-content/uploads/2022/09/100621_Uber_Recruiting_Shot02_0046.jpg 2x" alt="people walking down stairs" class="w-full object-cover h-48 md:h-96" />
                </div>
              </div>
              <div class="tile-unit grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div class="tile-unit-content flex flex-col justify-center">
                  <h2 class="tile-unit-title text-2xl md:text-3xl font-bold mb-2">Stronger together</h2>
                  <div class="text-wrap entry mb-4">
                    <p>
                      Every project is an opportunity to learn, share, and develop as you collaborate with exceptionally talented people—many with prior experience in other top tech and logistics companies. Our mission unites us in purpose and our teammates encourage and challenge us to produce the best possible outcomes.
                    </p>
                  </div>
                </div>
                <div class="tile-unit-visual rounded-lg overflow-hidden shadow-lg">
                  <img src="https://www.uberfreight.com/wp-content/uploads/2023/12/careers-778x606.jpg" srcset="https://www.uberfreight.com/wp-content/uploads/2023/12/careers.jpg 2x" alt="group of people meeting on stairs" class="w-full object-cover h-48 md:h-96" />
                </div>
              </div>
            </div>
          </section>

          <!-- Connect Section -->
          <section class="hero-section hero-single hero-section__ip__center py-12 bg-background-light dark:bg-background-dark">
            <div class="hero-block">
              <div class="container mx-auto px-4 flex flex-col items-center">
                <h1 class="hero-block-title text-2xl md:text-3xl font-bold text-primary dark:text-accent mb-4">Connect with Swift Edge Logistics</h1>
                <div class="btn-row flex gap-4 mb-4">
                  <a class="btn btn-secondary w-auto" href="https://www.linkedin.com" target="_blank" rel="noopener">LinkedIn</a>
                  <a class="btn btn-secondary w-auto" href="https://www.youtube.com" target="_blank" rel="noopener">YouTube</a>
                  <a class="btn btn-secondary w-auto" href="https://www.instagram.com" target="_blank" rel="noopener">Instagram</a>
                </div>
                <div class="bg-stretch _bg no-overlay rounded-lg overflow-hidden shadow-lg mb-4">
                  <picture>
                    <source srcset="https://www.uberfreight.com/wp-content/uploads/2024/06/DJI_0009.png" media="(min-width: 481px)">
                    <img src="https://www.uberfreight.com/wp-content/uploads/2024/06/DJI_0009.png" srcset="https://www.uberfreight.com/wp-content/uploads/2024/06/DJI_0009.png 2x" alt="overhead image of truck cabs" class="w-full object-cover h-48 md:h-96" />
                  </picture>
                </div>
              </div>
            </div>
            <div class="hero-content py-6 md:py-12">
              <div class="container mx-auto px-4 text-center">
                <h2 class="h3-title text-2xl md:text-3xl font-bold mb-2">Career Opportunities</h2>
                <span class="text-lg block mb-2">
                  <div id="grnhse_app" style="overflow: auto; height: 600px;">
                    <iframe id="grnhse_iframe" width="100%" frameborder="0" scrolling="no" allow="geolocation" title="Greenhouse Job Board" src="https://job-boards.greenhouse.io/embed/job_board?for=uberfreight" height="5032"></iframe>
                  </div>
                </span>
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

export default careers;