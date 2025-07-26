import { supabase } from "../../../utils/supabaseClient";
import toastr from "../../../utils/toastr";
import dayjs from "dayjs";
import { sendEmail } from "../../../utils/send-email";

/**
 * Calculates the delivery cost in USD.
 * Considers duration, urgency, weight, quantity, and distance.
 */
export async function calculateCost(data) {
  let base = 20;
  let weightCost = data.weight ? Math.ceil(Number(data.weight)) * 5 : 0;
  let quantityCost = data.quantity ? Number(data.quantity) * 2 : 0;
  let urgencyCost = 0;
  let distanceCost = 0;

  // Duration logic
  let durationHours = 72; // default 3 days
  if (data.delivery_duration && data.delivery_duration !== "custom") {
    durationHours = Number(data.delivery_duration);
  } else if (data.delivery_duration === "custom" && data.custom_duration) {
    durationHours = Number(data.custom_duration);
  }

  // Urgency: if duration < 24h, add 30%
  if (durationHours < 24) {
    urgencyCost = 0.3 * (base + weightCost + quantityCost);
  }

  // TODO: Use Google Directions API for real distance
  if (data.delivery_address && data.origin_address) {
    distanceCost = 4500 * 0.05; // $0.05/km (demo value)
  }

  let total = base + weightCost + quantityCost + distanceCost + urgencyCost;
  return Math.round(total * 100) / 100;
}

/**
 * Uploads an image to Supabase Storage (to deliveries/public/images/).
 * Requires RLS policy to allow public insert to deliveries/public/images/*
 */
export async function uploadImage(file) {
  if (!file) return "";
  const fileName = `public/images/${Date.now()}_${file.name}`;
  const { data: imgData, error: imgError } = await supabase.storage
    .from("deliveries")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });
  if (imgError) {
    toastr.error("Image upload failed: " + imgError.message);
    return "";
  }
  // Public URL for the uploaded image
  return supabase.storage.from("deliveries").getPublicUrl(fileName).publicUrl;
}

/**
 * Submits a delivery request and sends a receipt email.
 * Returns { success, trackingId }
 */
export async function submitDelivery(data, imageUrl, userId, cost) {
  // Generate tracking code
  const trackingCode = "TRK" + Date.now();

  // Insert shipment
  const { data: shipmentData, error: shipmentError } = await supabase.from("shipments").insert([{
    sender_id: userId,
    receiver_name: data.receiver_name,
    receiver_address: data.delivery_address,
    receiver_phone: data.receiver_phone,
    origin: data.origin_address,
    destination: data.delivery_address,
    package_description: data.instructions,
    weight: Number(data.weight) || null,
    cost: Number(cost),
    status: "processing",
    tracking_code: trackingCode,
    image_url: imageUrl,
  }]).select();

  if (shipmentError) {
    toastr.error("Failed to create delivery request: " + shipmentError.message);
    return { success: false, trackingId: null };
  }

  // Insert notification
  await supabase.from("notifications").insert([{
    user_id: userId,
    title: "Delivery Quota Requested",
    message: `Your delivery request for ${data.delivery_address} is pending approval.`,
  }]);

  // Generate receipt HTML
  const receiptHtml = `
    <h2>SwiftEdge Logistics Delivery Receipt</h2>
    <p><strong>Tracking Code:</strong> ${trackingCode}</p>
    <p><strong>Sender Name:</strong> ${data.sender_name}</p>
    <p><strong>Sender Email:</strong> ${data.sender_email}</p>
    <p><strong>Sender Phone:</strong> ${data.sender_phone}</p>
    <p><strong>Pickup Address:</strong> ${data.origin_address}</p>
    <hr>
    <p><strong>Receiver Name:</strong> ${data.receiver_name}</p>
    <p><strong>Receiver Phone:</strong> ${data.receiver_phone}</p>
    <p><strong>Receiver Email:</strong> ${data.receiver_email}</p>
    <p><strong>Country:</strong> ${data.country}</p>
    <p><strong>State:</strong> ${data.state}</p>
    <p><strong>Region:</strong> ${data.region}</p>
    <p><strong>City/Town:</strong> ${data.city}</p>
    <p><strong>Address:</strong> ${data.delivery_address}</p>
    <p><strong>Zipcode:</strong> ${data.zipcode}</p>
    <hr>
    <p><strong>Delivery Date/Time:</strong> ${dayjs(data.delivery_datetime).format("MMM D, YYYY HH:mm")}</p>
    <p><strong>Duration:</strong> ${data.delivery_duration === "custom" ? data.custom_duration + " hours" : data.delivery_duration + " hours"}</p>
    <p><strong>Item Category:</strong> ${data.item_category}</p>
    <p><strong>Quantity:</strong> ${data.quantity}</p>
    <p><strong>Weight:</strong> ${data.weight} kg</p>
    <p><strong>Instructions:</strong> ${data.instructions}</p>
    <p><strong>Cost:</strong> $${cost}</p>
    ${imageUrl ? `<img src="${imageUrl}" alt="Item Image" style="max-width:200px;border-radius:8px;margin-top:10px;">` : ""}
    <p>Thank you for choosing SwiftEdge Logistics!</p>
  `;

  // Send receipt email to sender and receiver
  try {
    await sendEmail({
      to: [data.sender_email, data.receiver_email],
      subject: "Your SwiftEdge Delivery Receipt",
      html: receiptHtml,
    });
    toastr.success("Receipt sent to your email!");
  } catch (err) {
    toastr.error("Failed to send receipt email.");
  }

  return { success: true, trackingId: trackingCode };
}