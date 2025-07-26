import Navbar from "/src/script/components/navbar";
import Footer from "/src/script/components/footer";
import { reset } from '/src/script/utils/reset';

const terms = () => {
  reset('Terms of Service');
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
              <h1 class="text-4xl font-bold text-primary dark:text-accent mb-4 animate-pulse">Terms of Service</h1>
              <p class="text-lg text-text-subtle mb-6">Last updated: July 2025</p>
              <div class="mb-8">
                <p>
                  Welcome to Swift Edge Logistics. By using our website, mobile app, or services, you agree to these Terms of Service. Please read them carefully.
                </p>
              </div>
              <div class="space-y-8">
                <div>
                  <h2 class="text-2xl font-bold text-primary dark:text-accent mb-2">1. Acceptance of Terms</h2>
                  <p>
                    By accessing or using Swift Edge Logistics, you agree to comply with these terms and all applicable laws and regulations.
                  </p>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-primary dark:text-accent mb-2">2. Changes to Terms</h2>
                  <p>
                    We may update these terms at any time. Continued use of our services means you accept any changes.
                  </p>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-primary dark:text-accent mb-2">3. Privacy</h2>
                  <p>
                    Please review our <a href="/privacy" class="text-accent underline">Privacy Policy</a> for details on how we handle your information.
                  </p>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-primary dark:text-accent mb-2">4. User Responsibilities</h2>
                  <ul class="list-disc list-inside text-base text-text-dark dark:text-text-light">
                    <li>Provide accurate and current information.</li>
                    <li>Use our services for lawful purposes only.</li>
                    <li>Do not attempt to harm, disrupt, or misuse our platform.</li>
                  </ul>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-primary dark:text-accent mb-2">5. Intellectual Property</h2>
                  <p>
                    All content, trademarks, and technology on Swift Edge Logistics are owned by us or our licensors. You may not copy, modify, or distribute without permission.
                  </p>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-primary dark:text-accent mb-2">6. Limitation of Liability</h2>
                  <p>
                    Swift Edge Logistics is not liable for any indirect, incidental, or consequential damages arising from your use of our services.
                  </p>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-primary dark:text-accent mb-2">7. Indemnification</h2>
                  <p>
                    You agree to indemnify and hold Swift Edge Logistics harmless from any claims, losses, or damages resulting from your violation of these terms.
                  </p>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-primary dark:text-accent mb-2">8. Governing Law</h2>
                  <p>
                    These terms are governed by the laws of the State of Kentucky, USA.
                  </p>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-primary dark:text-accent mb-2">9. Contact Information</h2>
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

export default terms;