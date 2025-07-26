import Navbar from "/src/script/components/navbar";
import Footer from "/src/script/components/footer";
import swiftLogoLight from "/src/images/logo.png";
import swiftLogoDark from "/src/images/logo.jpg";
import { reset } from '/src/script/utils/reset'

const plans = () => {
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
        <h1 class="text-4xl font-bold text-gray-900 mb-4 text-center dark:text-accent">Clear Outsourced Order Fulfillment Pricing</h1>
        <p class="text-lg text-primary-dark dark:text-gray-400  mb-6">
          Swift Edge’s pricing is transparent and all-inclusive for direct-to-consumer order fulfillment. Know exactly what your costs will be—no hidden fees.
        </p>
        <ul class="list-disc list-inside text-lg text-primary-dark dark:text-gray-400 mb-6">
          <li>Implementation</li>
          <li>Receiving your inventory</li>
          <li>Warehousing your products</li>
          <li>Picking, packing, and shipping each order</li>
        </ul>
        <div class="bg-white rounded-lg shadow p-6 mb-8 flex flex-col md:flex-row gap-8 items-center">
          <img src="https://www.shipbob.com/wp-content/uploads/2023/08/4b58920257cacbfc25f4ef6ddbf1e67e.webp" alt="Client Testimonial" class="rounded-full h-24 w-24 mb-4" />
          <blockquote class="italic text-gray-700">
            "Because of Swift Edge’s overall order volume, they can negotiate bulk discounts with carriers that we simply couldn’t. By partnering with Swift Edge, we get better quality fulfillment and shipping for a better price."
            <br />
            <span class="font-bold">Maria Osorio</span>, Logistics and Operations Director at <a href="https://oxfordhealthspan.com/" target="_blank" class="text-red-600 underline">Oxford Healthspan</a>
          </blockquote>
        </div>
        <div class="bg-white rounded-lg shadow p-6 mb-8 flex flex-col md:flex-row gap-8 items-center">
          <img src="https://www.shipbob.com/wp-content/uploads/2023/10/0b5ea42e124f687284c6d5b88f56b6c0.jpg" alt="Client Testimonial" class="rounded-full h-24 w-24 mb-4" />
          <blockquote class="italic text-gray-700">
            "With Swift Edge, billing is straightforward and transparent. Expanding from 2 to 4 warehouses has translated into $1.5 million in freight cost savings."
            <br />
            <span class="font-bold">Ali Shahid</span>, COO of Our Place
          </blockquote>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <img src="https://www.shipbob.com/wp-content/uploads/2022/02/product-sec10-1.svg" alt="Customized" class="h-24 mb-4" />
            <div class="font-semibold text-lg mb-2">Customized for You</div>
            <p class="text-gray-600 text-center">Unique needs? We accommodate kitting, special handling, and more. All quotes are customized for each customer.</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <img src="https://www.shipbob.com/wp-content/uploads/2022/02/product-sec10-2.svg" alt="More than 3PL" class="h-24 mb-4" />
            <div class="font-semibold text-lg mb-2">More than a 3PL</div>
            <p class="text-gray-600 text-center">Best-in-class technology, analytics, and scalability to grow fast and expand into new locations at no additional cost.</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <img src="https://www.shipbob.com/wp-content/uploads/2022/02/product-sec10-3.svg" alt="Support" class="h-24 mb-4" />
            <div class="font-semibold text-lg mb-2">Built-in Support</div>
            <p class="text-gray-600 text-center">On-site customer support reps at each location for direct, boots-on-the-ground help.</p>
          </div>
        </div>
        <div class="py-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-accent mb-4">Frequently Asked Questions</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 class="font-semibold mb-2">Does Swift Edge offer international shipping?</h4>
              <p>Yes! We ship to 250+ destinations. Quotes for international shipping are available upon request.</p>
            </div>
            <div>
              <h4 class="font-semibold mb-2">How much does Swift Edge’s software cost?</h4>
              <p>Our software is free for all customers, including all integrations and dashboard features.</p>
            </div>
            <div>
              <h4 class="font-semibold mb-2">Can I use custom branded boxes?</h4>
              <p>Yes, you can use your own branded boxes, mailers, and inserts. Just pay to store them.</p>
            </div>
            <div>
              <h4 class="font-semibold mb-2">Does Swift Edge offer free packing supplies?</h4>
              <p>Yes! We provide standard boxes, mailers, tape, and labels for all orders.</p>
            </div>
            <div>
              <h4 class="font-semibold mb-2">Does Swift Edge offer kitting?</h4>
              <p>Yes, we offer kitting services for unique shipping needs. Contact us for details.</p>
            </div>
            <div>
              <h4 class="font-semibold mb-2">Does Swift Edge fulfill B2B/Wholesale/EDI orders?</h4>
              <p>Yes, we fulfill automated EDI-compliant and wholesale orders, including labeling, pallet prep, and freight quotes.</p>
            </div>
            <div>
              <h4 class="font-semibold mb-2">Which carriers does Swift Edge negotiate rates with?</h4>
              <p>We negotiate bulk discounts with UPS, USPS, FedEx, DHL, and regional carriers, passing savings to you.</p>
            </div>
            <div>
              <h4 class="font-semibold mb-2">Does Swift Edge offer returns?</h4>
              <p>Yes, we offer returns management as a value-added service with flat-fee processing.</p>
            </div>
            <div>
              <h4 class="font-semibold mb-2">How are shipping costs calculated?</h4>
              <p>Shipping costs are based on weight, dimensions, destination, and service. Each quote is customized for accuracy.</p>
            </div>
            <div>
              <h4 class="font-semibold mb-2">Can I use your warehouse management system?</h4>
              <p>Yes, our WMS is available for merchants with US-based warehouses.</p>
            </div>
            <div>
              <h4 class="font-semibold mb-2">How do I get a fulfillment quote?</h4>
              <p><a href="/contact" data-nav class="text-red-600 underline">Fill out this form</a> and a fulfillment expert will be in touch.</p>
            </div>
          </div>
        </div>
        <div class="py-8">
          <a href="/login" data-nav class="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-red-700 transition">Request Fulfillment Pricing</a>
        </div>
      </div>
      </main>
      ${Footer().html}
      </div>
          `,
    pageEvents
  });
}

export default plans;