import Navbar from "/src/script/components/navbar";
import Footer from "/src/script/components/footer";
import swiftLogoLight from "/src/images/logo.png";
import swiftLogoDark from "/src/images/logo.jpg";
import { reset } from "/src/script/utils/reset";
import toastr from "/src/script/utils/toastr";

const contact = () => {
  reset("Contact");
  function pageEvents() {
    Navbar().pageEvents();

    // Contact form submit logic
    const form = document.getElementById("contact-support-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        // Basic validation
        const requiredFields = ["role", "firstName", "lastName", "email", "company"];
        let valid = true;
        requiredFields.forEach((field) => {
          if (!formData.get(field)) valid = false;
        });
        if (!valid) {
          toastr.error("Please fill all required fields.");
          return;
        }
        // Simulate async submit
        setTimeout(() => {
          toastr.success("Support request submitted successfully!");
          form.reset();
        }, 600);
      });
    }
  }

  return {
    html: /* html */`
      <div class="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light font-sans">
        ${Navbar().html}
        <main class="flex-1 main">
          <!-- Hero Section -->
          <section class="hero-section hero-section__ip__center relative bg-background-light dark:bg-background-dark">
            <div class="absolute inset-0 z-0">
              <img src="https://www.uberfreight.com/wp-content/uploads/2023/09/SHIPPERS_AT_WORK_TABLE_A_0012_R1-1-1920x858.jpg" alt="Contact background" class="w-full h-full object-cover opacity-60" />
            </div>
            <div class="container relative z-10 py-12 flex flex-col items-center">
              <picture>
                <img src="${swiftLogoLight}" alt="Swift Edge Logistics Logo" class="h-16 block dark:hidden mx-auto mb-4" />
                <img src="${swiftLogoDark}" alt="Swift Edge Logistics Logo" class="h-16 hidden dark:block mx-auto mb-4" />
              </picture>
              <h1 class="hero-block-title text-4xl md:text-5xl font-bold text-primary dark:text-accent mb-4 drop-shadow-lg">Swift Edge Logistics Support</h1>
              <p class="max-w-xl text-lg text-center mb-4">Reach out for TMS, carrier, or shipper support. Our team is ready to help you move forward.</p>
            </div>
          </section>

          <!-- Login Links Section -->
          <section class="lo-content py-8">
            <div class="container mx-auto px-4">
              <h3 class="text-2xl font-bold mb-4">Quick Access Logins</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 _links">
                <a class="btn btn-secondary w-full flex justify-between items-center" href="/login" target="_blank">Swift Edge Logistics TMS <i class="fas fa-arrow-right"></i></a>
                <a class="btn btn-secondary w-full flex justify-between items-center" href="/login" target="_blank">Intermodal Customer Login <i class="fas fa-arrow-right"></i></a>
                <a class="btn btn-secondary w-full flex justify-between items-center" href="/login" target="_blank">Lanehub Customer Login <i class="icon-arrow-right"></i></a>
                <a class="btn btn-secondary w-full flex justify-between items-center" href="/login" target="_blank">Swift Edge Logistics Online Training <i class="fas fa-arrow-right"></i></a>
                <a class="btn btn-secondary w-full flex justify-between items-center" href="/signup" target="_blank">Swift Edge International <i class="icon-arrow-right"></i></a>
              </div>
            </div>
          </section>

          <!-- Support Form Section -->
          <section class="lo-form py-8 bg-peach-soft">
            <div class="container mx-auto px-4">
              <h3 class="text-2xl font-bold mb-4">TMS Support Form</h3>
              <div class="max-w-2xl mx-auto bg-white dark:bg-primary-light rounded-lg shadow-lg p-6">
                <form id="contact-support-form" class="space-y-4">
                  <div>
                    <label for="role" class="block font-semibold mb-1">Are you a:<span class="text-red-500">*</span></label>
                    <select id="role" name="role" required class="w-full border rounded px-3 py-2">
                      <option value="">Select</option>
                      <option value="Customer">Customer</option>
                      <option value="Carrier">Carrier</option>
                      <option value="Shipper">Shipper</option>
                    </select>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label for="firstName" class="block font-semibold mb-1">First Name<span class="text-red-500">*</span></label>
                      <input type="text" id="firstName" name="firstName" required class="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                      <label for="lastName" class="block font-semibold mb-1">Last Name<span class="text-red-500">*</span></label>
                      <input type="text" id="lastName" name="lastName" required class="w-full border rounded px-3 py-2" />
                    </div>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label for="email" class="block font-semibold mb-1">Email address<span class="text-red-500">*</span></label>
                      <input type="email" id="email" name="email" required class="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                      <label for="phone" class="block font-semibold mb-1">Phone</label>
                      <input type="tel" id="phone" name="phone" class="w-full border rounded px-3 py-2" />
                    </div>
                  </div>
                  <div>
                    <label for="company" class="block font-semibold mb-1">Company or Organization Name<span class="text-red-500">*</span></label>
                    <input type="text" id="company" name="company" required class="w-full border rounded px-3 py-2" />
                  </div>
                  <div>
                    <label for="comments" class="block font-semibold mb-1">Comments</label>
                    <textarea id="comments" name="comments" rows="4" class="w-full border rounded px-3 py-2"></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary w-full mt-4">Submit</button>
                </form>
              </div>
              <div class="mt-4 text-center text-primary-dark">
                <p>For Swift Edge shipper and carrier support, please <a href="/login" target="_blank" class="text-primary underline">click here</a>.</p>
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

export default contact;