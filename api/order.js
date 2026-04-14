import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, address, city, zip, message } = req.body ?? {};

  if (!email || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await resend.emails.send({
      from: 'RUVO Shop <shop@ruvo.app>',
      to: 'hello@ruvo.app',
      replyTo: email,
      subject: `New merchandise order from ${name}`,
      html: `
        <h2>New Order</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone ?? '—'}</p>
        <p><strong>Address:</strong> ${address}, ${city} ${zip}</p>
        <hr />
        <pre>${message}</pre>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
