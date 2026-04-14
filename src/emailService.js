async function post(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? 'Request failed');
  }
  return res.json();
}

/** Adds an email to the waitlist and sends a confirmation. */
export const joinWaitlist = (email) => post('/api/waitlist', { email });

/** Submits a shop order. */
export const sendOrder = (orderData) => post('/api/order', orderData);
