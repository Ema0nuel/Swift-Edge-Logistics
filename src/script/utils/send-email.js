/**
 * Sends a custom email using Resend.
 * @param {Object} param0
 * @param {string|string[]} param0.to - Recipient email address(es)
 * @param {string} param0.subject - Email subject
 * @param {string} param0.html - HTML content of the email
 */

// filepath: src/script/utils/send-email.js
export async function sendEmail({ to, subject, html }) {
  const res = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to, subject, html }),
  });
  let data;
  try {
    data = await res.json();
  } catch (err) {
    throw new Error('No response from server');
  }
  if (!data.success) throw new Error(data.error || 'Failed to send email');
  return data.result;
}