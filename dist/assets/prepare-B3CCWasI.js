import{N as $}from"./navbar-ZPK2fscr.js";import{r as q}from"./reset-W7AGB0Zm.js";import{G as C}from"./GlobeSpinner-BshKxO8A.js";import{s as m}from"./supabaseClient-CMz3Pz_I.js";import{t as n}from"./toastr-ToYgTeRl.js";import{d as w}from"./dayjs.min-Cbbdfn5l.js";import{s as L}from"./send-email-D3sSQfLx.js";import{c as R}from"./checkSession-8xa7RLL5.js";import"./logo-BSIuJKwo.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";async function v(e){let t=20,i=e.weight?Math.ceil(Number(e.weight))*5:0,s=e.quantity?Number(e.quantity)*2:0,d=0,l=0,r=72;e.delivery_duration&&e.delivery_duration!=="custom"?r=Number(e.delivery_duration):e.delivery_duration==="custom"&&e.custom_duration&&(r=Number(e.custom_duration)),r<24&&(d=.3*(t+i+s)),e.delivery_address&&e.origin_address&&(l=4500*.05);let c=t+i+s+l+d;return Math.round(c*100)/100}async function B(e){if(!e)return"";const t=`public/images/${Date.now()}_${e.name}`,{data:i,error:s}=await m.storage.from("deliveries").upload(t,e,{cacheControl:"3600",upsert:!1});return s?(n.error("Image upload failed: "+s.message),""):m.storage.from("deliveries").getPublicUrl(t).publicUrl}async function S(e,t,i,s){const d="TRK"+Date.now(),{data:l,error:r}=await m.from("shipments").insert([{sender_id:i,receiver_name:e.receiver_name,receiver_address:e.delivery_address,receiver_phone:e.receiver_phone,origin:e.origin_address,destination:e.delivery_address,package_description:e.instructions,weight:Number(e.weight)||null,cost:Number(s),status:"processing",tracking_code:d,image_url:t}]).select();if(r)return n.error("Failed to create delivery request: "+r.message),{success:!1,trackingId:null};await m.from("notifications").insert([{user_id:i,title:"Delivery Quota Requested",message:`Your delivery request for ${e.delivery_address} is pending approval.`}]);const c=`
    <h2>SwiftEdge Logistics Delivery Receipt</h2>
    <p><strong>Tracking Code:</strong> ${d}</p>
    <p><strong>Sender Name:</strong> ${e.sender_name}</p>
    <p><strong>Sender Email:</strong> ${e.sender_email}</p>
    <p><strong>Sender Phone:</strong> ${e.sender_phone}</p>
    <p><strong>Pickup Address:</strong> ${e.origin_address}</p>
    <hr>
    <p><strong>Receiver Name:</strong> ${e.receiver_name}</p>
    <p><strong>Receiver Phone:</strong> ${e.receiver_phone}</p>
    <p><strong>Receiver Email:</strong> ${e.receiver_email}</p>
    <p><strong>Country:</strong> ${e.country}</p>
    <p><strong>State:</strong> ${e.state}</p>
    <p><strong>Region:</strong> ${e.region}</p>
    <p><strong>City/Town:</strong> ${e.city}</p>
    <p><strong>Address:</strong> ${e.delivery_address}</p>
    <p><strong>Zipcode:</strong> ${e.zipcode}</p>
    <hr>
    <p><strong>Delivery Date/Time:</strong> ${w(e.delivery_datetime).format("MMM D, YYYY HH:mm")}</p>
    <p><strong>Duration:</strong> ${e.delivery_duration==="custom"?e.custom_duration+" hours":e.delivery_duration+" hours"}</p>
    <p><strong>Item Category:</strong> ${e.item_category}</p>
    <p><strong>Quantity:</strong> ${e.quantity}</p>
    <p><strong>Weight:</strong> ${e.weight} kg</p>
    <p><strong>Instructions:</strong> ${e.instructions}</p>
    <p><strong>Cost:</strong> $${s}</p>
    ${t?`<img src="${t}" alt="Item Image" style="max-width:200px;border-radius:8px;margin-top:10px;">`:""}
    <p>Thank you for choosing SwiftEdge Logistics!</p>
  `;try{await L({to:[e.sender_email,e.receiver_email],subject:"Your SwiftEdge Delivery Receipt",html:c}),n.success("Receipt sent to your email!")}catch{n.error("Failed to send receipt email.")}return{success:!0,trackingId:d}}const f="https://www.wowtheme7.com/tf/transpro/assets/version-2/img/slide-v3/item-03.png",T="https://www.dhl.com/content/experience-fragments/dhl/en/dgf/top_product_teaser/image_right_3_rows/dgf_aspa_euro_dgf_homepage_products_and_solutions/_jcr_content/root/container_copy/container_copy/image.coreimg.80.1197.jpeg/1655732496462/shipping-methods-graphic-0001.jpeg";function j(){function e(){(document.documentElement.classList.contains("dark")||document.body.classList.contains("dark"))&&document.querySelectorAll("input, textarea, select").forEach(i=>{i.classList.add("dark:text-white")})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}const Q=async()=>{if(!await R())return;const{html:e,pageEvents:t}=$("prepare"),i=`
    <div class="min-h-screen bg-[#1e293b] dark:bg-background-dark transition-colors duration-300 bg-cover bg-center"
      style="background-image: url('${f}'); background-blend-mode: multiply;">
      ${e}
      <main id="prepare-main" class="container mx-auto px-4 py-8 max-w-4xl">
        <section class="relative w-full h-56 md:h-72 flex items-center justify-center overflow-hidden rounded-2xl shadow-lg mb-8"
          style="background: url('${f}') center/cover no-repeat, #1e293b;">
          <div class="absolute inset-0 bg-gradient-to-b from-black/60 to-background-dark/90"></div>
          <div class="relative z-10 flex flex-col items-center justify-center w-full h-full">
            <img src="${T}" alt="Delivery Illustration" class="h-24 w-auto mb-2 rounded-lg shadow-lg" />
            <h1 class="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-2">Prepare Your Delivery</h1>
            <p class="text-lg text-accent mt-2 font-semibold">Get a quote, schedule, and track your package</p>
          </div>
        </section>
        <form id="prepare-form" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
          <h2 class="text-2xl font-bold text-primary dark:text-accent mb-4 text-center">Sender Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block font-semibold mb-1">Your Name/Company</label>
              <input type="text" name="sender_name" class="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" required />
            </div>
            <div>
              <label class="block font-semibold mb-1">Your Email</label>
              <input type="email" name="sender_email" class="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" required />
            </div>
            <div>
              <label class="block font-semibold mb-1">Your Phone</label>
              <input type="tel" name="sender_phone" class="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" required />
            </div>
            <div>
              <label class="block font-semibold mb-1">Pickup Address</label>
              <input type="text" name="origin_address" id="origin-address" class="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" required />
            </div>
          </div>
          <h2 class="text-2xl font-bold text-primary dark:text-accent mb-4 text-center">Receiver Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block font-semibold mb-1">Receiver Name/Company</label>
              <input type="text" name="receiver_name" class="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" required />
            </div>
            <div>
              <label class="block font-semibold mb-1">Receiver Phone</label>
              <input type="tel" name="receiver_phone" class="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" required />
            </div>
            <div>
              <label class="block font-semibold mb-1">Receiver Email</label>
              <input type="email" name="receiver_email" class="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" required />
            </div>
            <div>
              <label class="block font-semibold mb-1">Country</label>
              <input type="text" name="country" class="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" required />
            </div>
            <div>
              <label class="block font-semibold mb-1">State</label>
              <input type="text" name="state" class="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" required />
            </div>
            <div>
              <label class="block font-semibold mb-1">Region</label>
              <input type="text" name="region" class="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" />
            </div>
            <div>
              <label class="block font-semibold mb-1">City/Town</label>
              <input type="text" name="city" class="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" required />
            </div>
            <div>
              <label class="block font-semibold mb-1">Address</label>
              <input type="text" name="delivery_address" id="delivery-address" class="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" required />
            </div>
            <div>
              <label class="block font-semibold mb-1">Zipcode</label>
              <input type="text" name="zipcode" class="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" required />
            </div>
          </div>
          <h2 class="text-2xl font-bold text-primary dark:text-accent mb-4 text-center">Delivery Details</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block font-semibold mb-1">Delivery Date/Time Preference</label>
              <input type="datetime-local" name="delivery_datetime" class="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" required />
            </div>
            <div>
              <label class="block font-semibold mb-1">Delivery Duration</label>
              <select name="delivery_duration" class="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
                <option value="24">24 Hours</option>
                <option value="72">3 Days</option>
                <option value="720">1 Month</option>
                <option value="2160">3 Months</option>
                <option value="custom">Custom (hours)</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold mb-1">Item Type/Category</label>
              <select name="item_category" class="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
                <option value="electronics">Electronics</option>
                <option value="documents">Documents</option>
                <option value="clothing">Clothing</option>
                <option value="food">Food</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold mb-1">Quantity</label>
              <input type="number" name="quantity" min="1" class="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" required />
            </div>
            <div>
              <label class="block font-semibold mb-1">Weight (kg)</label>
              <input type="number" name="weight" min="0.1" step="0.1" class="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" />
            </div>
            <div class="md:col-span-2">
              <label class="block font-semibold mb-1">Delivery Instructions</label>
              <textarea name="instructions" rows="2" class="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"></textarea>
            </div>
            <div class="md:col-span-2">
              <label class="block font-semibold mb-1">Upload Item Image</label>
              <input type="file" name="item_image" accept="image/*" class="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" />
            </div>
          </div>
          <div id="pricing-box" class="bg-peach dark:bg-background-dark rounded-lg p-4 mt-6 text-center text-lg font-bold text-primary dark:text-accent shadow-inner"></div>
          <button type="submit" class="w-full py-4 mt-4 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-accent transition-all duration-300 flex items-center justify-center gap-2">
            <span id="spinner" class="hidden">${C({size:24})}</span>
            <span id="submit-text">Submit Delivery Request</span>
          </button>
        </form>
        <div id="prepare-modal" class="fixed inset-0 flex items-center justify-center z-[99999] bg-black bg-opacity-50 hidden">
          <div class="bg-white dark:bg-background-dark p-6 rounded-lg shadow-xl max-w-md w-full relative">
            <button id="close-modal-btn" class="absolute top-2 right-2 text-xl text-text-subtle hover:text-accent">&times;</button>
            <h3 class="text-xl font-bold mb-2">Confirm Delivery Request</h3>
            <form id="confirm-form" class="space-y-4">
              <input type="email" name="email" placeholder="Email" required class="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" />
              <input type="password" name="password" placeholder="Password" required class="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" />
              <button type="submit" class="w-full py-3 bg-accent text-primary font-bold rounded-lg shadow-md hover:bg-accent-soft transition-all duration-300">Confirm</button>
            </form>
          </div>
        </div>
        <div id="tracking-modal" class="fixed inset-0 flex items-center justify-center z-[99999] bg-black bg-opacity-50 hidden">
          <div class="bg-white dark:bg-background-dark p-6 rounded-lg shadow-xl max-w-md w-full relative">
            <button id="close-tracking-modal-btn" class="absolute top-2 right-2 text-xl text-text-subtle hover:text-accent">&times;</button>
            <h3 class="text-xl font-bold mb-2">Your Tracking ID</h3>
            <div id="tracking-id-box" class="text-lg font-mono bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4"></div>
            <button id="copy-tracking-btn" class="w-full py-3 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-accent transition-all duration-300">Copy Tracking ID</button>
          </div>
        </div>
      </main>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
      <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"><\/script>
    </div>
  `;function s(d=()=>{}){if(t(d),q("Prepare Delivery"),j(),window.google&&window.google.maps){const o=document.getElementById("delivery-address"),a=document.getElementById("origin-address");o&&new window.google.maps.places.Autocomplete(o,{types:["geocode"],componentRestrictions:{country:"us"}}),a&&new window.google.maps.places.Autocomplete(a,{types:["geocode"],componentRestrictions:{country:"us"}})}else window.initGoogleAutocomplete=()=>{const o=document.getElementById("delivery-address"),a=document.getElementById("origin-address");o&&window.google&&window.google.maps&&new window.google.maps.places.Autocomplete(o,{types:["geocode"],componentRestrictions:{country:"us"}}),a&&window.google&&window.google.maps&&new window.google.maps.places.Autocomplete(a,{types:["geocode"],componentRestrictions:{country:"us"}})},window.addEventListener("load",window.initGoogleAutocomplete);const l=document.getElementById("pricing-box"),r=document.getElementById("prepare-form"),c=document.getElementById("spinner"),g=document.getElementById("submit-text");r.addEventListener("input",async()=>{const o=Object.fromEntries(new FormData(r)),a=await v(o);l.innerHTML=`Estimated Delivery Cost: <span class="text-accent font-extrabold">$${a.toLocaleString()}</span>`}),r.addEventListener("submit",async o=>{o.preventDefault(),c.classList.remove("hidden"),g.classList.add("opacity-50");const a=Object.fromEntries(new FormData(r)),h=await v(a);let p="";const b=r.item_image.files[0];b&&(p=await B(b)),document.getElementById("prepare-modal").classList.remove("hidden"),c.classList.add("hidden"),g.classList.remove("opacity-50"),document.getElementById("confirm-form").onsubmit=async u=>{u.preventDefault();const k=u.target.email.value,x=u.target.password.value,{data:y,error:_}=await m.auth.signInWithPassword({email:k,password:x});if(_){n.error("Authentication failed");return}const E=Math.floor(1e5+Math.random()*9e5);await m.from("otps").insert({user_id:y.user.id,code:E.toString(),type:"transaction",expires_at:w().add(10,"minute").toISOString()}),n.success("Reciept sent to your email!");const{success:I,trackingId:D}=await S(a,p,y.user.id,h);I?(n.success("Delivery request submitted!"),document.getElementById("prepare-modal").classList.add("hidden"),r.reset(),l.innerHTML="",document.getElementById("tracking-modal").classList.remove("hidden"),document.getElementById("tracking-id-box").textContent=D):n.error("Failed to create delivery request")},document.getElementById("close-modal-btn").onclick=()=>{document.getElementById("prepare-modal").classList.add("hidden")}}),document.getElementById("close-tracking-modal-btn").onclick=()=>{document.getElementById("tracking-modal").classList.add("hidden")},document.getElementById("copy-tracking-btn").onclick=()=>{const o=document.getElementById("tracking-id-box").textContent;navigator.clipboard.writeText(o),n.success("Tracking ID copied!")}}return{html:i,pageEvents:s}};export{Q as default};
//# sourceMappingURL=prepare-B3CCWasI.js.map
