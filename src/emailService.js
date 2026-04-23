async function post(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? 'Request failed');
  }
  return res.json();
}

/**
 * Adds an email to the waitlist via Formspree.
 * Set VITE_FORMSPREE_ID in your .env / Vercel env vars.
 */
export function joinWaitlist(email) {
  const formId = import.meta.env.VITE_FORMSPREE_ID;
  return post(`https://formspree.io/f/${formId}`, { email, _replyto: email });
}

/**
 * Sends a support contact message via Formspree.
 * Set VITE_FORMSPREE_SUPPORT_ID in your .env / Vercel env vars.
 */
export function sendSupportMessage({ name, email, category, message }) {
  const formId = import.meta.env.VITE_FORMSPREE_SUPPORT_ID;
  return post(`https://formspree.io/f/${formId}`, {
    name,
    email,
    _replyto: email,
    category,
    message,
  });
}

/** Submits a shop order via the /api/order serverless function (Resend). */
export const sendOrder = (orderData) => post('/api/order', orderData);
