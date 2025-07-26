import Navbar from "/src/script/components/navbar";
import Footer from "/src/script/components/footer";
import { reset } from '/src/script/utils/reset';

const privacy = () => {
  reset('Privacy Policy');
  function pageEvents() {
    Navbar().pageEvents();
    Footer().pageEvents && Footer().pageEvents();
  }

  return ({
    html: /* html */`
      <div class="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light font-sans transition-all duration-500">
        ${Navbar().html}
        <main class="flex-1">
          <section class="container mx-auto px-4 py-10">
            <div class="bg-white dark:bg-primary-light rounded-xl shadow-lg p-8 transition-all duration-500">
              <h1 class="text-4xl font-bold text-primary dark:text-accent mb-4 animate-pulse">Privacy Policy</h1>
              <p class="text-lg text-text-subtle mb-6">Last updated: July 2025</p>
              <div class="mb-8">
                <p>
                  Swift Edge Logistics ("Swift Edge", "we", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, share, and safeguard your information when you use our website, mobile app, and services.
                </p>
                <p>
                  By using our services, you agree to the terms of this Privacy Policy. If you do not agree, please do not use our services.
                </p>
              </div>
              <div class="space-y-8">
                <div>
                  <h2 class="text-2xl font-bold text-primary dark:text-accent mb-2">1. Information We Collect</h2>
                  <ul class="list-disc list-inside text-base text-text-dark dark:text-text-light">
                    <li><span class="font-semibold">Personal Information:</span> Name, company, email, phone number, and other details you provide via forms, registration, or contact.</li>
                    <li><span class="font-semibold">Usage Data:</span> Device info, browser type, IP address, geolocation, pages visited, and interactions with our services.</li>
                    <li><span class="font-semibold">Cookies & Tracking:</span> We use cookies and similar technologies to enhance your experience and analyze usage.</li>
                    <li><span class="font-semibold">Third-Party Info:</span> We may supplement your data with information from trusted partners to improve our services.</li>
                  </ul>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-primary dark:text-accent mb-2">2. How We Use Your Information</h2>
                  <ul class="list-disc list-inside text-base text-text-dark dark:text-text-light">
                    <li>To provide, operate, and improve our logistics services.</li>
                    <li>To communicate with you regarding orders, support, and updates.</li>
                    <li>To personalize your experience and deliver relevant content.</li>
                    <li>For analytics, security, and fraud prevention.</li>
                  </ul>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-primary dark:text-accent mb-2">3. Sharing Your Information</h2>
                  <ul class="list-disc list-inside text-base text-text-dark dark:text-text-light">
                    <li>With trusted partners and service providers who help us deliver our services.</li>
                    <li>With law enforcement or government agencies as required by law.</li>
                    <li>In connection with business transfers, mergers, or acquisitions.</li>
                  </ul>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-primary dark:text-accent mb-2">4. Your Choices & Rights</h2>
                  <ul class="list-disc list-inside text-base text-text-dark dark:text-text-light">
                    <li>You may update or correct your personal information by contacting us.</li>
                    <li>You can opt out of marketing communications at any time.</li>
                    <li>Cookies can be managed via your browser settings.</li>
                  </ul>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-primary dark:text-accent mb-2">5. Security</h2>
                  <p>
                    We use industry-standard security measures to protect your data, including encryption and secure servers. However, no system is completely secure; use our services at your own risk.
                  </p>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-primary dark:text-accent mb-2">6. Children's Privacy</h2>
                  <p>
                    Our services are not intended for children under 18. We do not knowingly collect personal information from minors.
                  </p>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-primary dark:text-accent mb-2">7. Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. Changes will be posted on this page and are effective immediately.
                  </p>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-primary dark:text-accent mb-2">8. Contact Us</h2>
                  <p>
                    Swift Edge Logistics<br>
                    Phone: <a href="tel:+15022095647" class="text-accent underline">+1 502-209-5647</a><br>
                    Email: <a href="mailto:Swiftedgelogistics01@gmail.com" class="text-accent underline">Swiftedgelogistics01@gmail.com</a>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        ${Footer().html}
      </div>
    `,
    pageEvents
  });
};

export default privacy;