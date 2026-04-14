import emailjs from '@emailjs/browser';

export const sendEmail = (templateId, templateParams) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return Promise.reject(new Error("EmailJS environment variables are not configured."));
  }

  return emailjs.send(serviceId, templateId, templateParams, publicKey);
};