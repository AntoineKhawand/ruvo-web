import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body ?? {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // 1. Notify the RUVO team
    await resend.emails.send({
      from: 'RUVO Waitlist <waitlist@ruvo.app>',
      to: 'hello@ruvo.app',
      subject: `New waitlist signup: ${email}`,
      html: `<p>A new user joined the waitlist: <strong>${email}</strong></p>`,
    });

    // 2. Send confirmation to the user
    await resend.emails.send({
      from: 'RUVO <hello@ruvo.app>',
      to: email,
      subject: "You're on the RUVO waitlist 🏃",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;background:#050505;color:#fff;padding:40px;border-radius:16px">
          <img src="https://ruvo.app/Ruvo Logo Original.png" alt="RUVO" style="height:40px;margin-bottom:32px" />
          <h1 style="font-size:28px;font-weight:900;margin:0 0 12px;color:#fff">You're in. 🎉</h1>
          <p style="color:#aaa;line-height:1.6;margin:0 0 24px">
            Thanks for joining the RUVO waitlist. We're putting the final touches on the app and you'll be the first to know when we launch.
          </p>
          <p style="color:#aaa;line-height:1.6;margin:0">
            — The RUVO Team
          </p>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
