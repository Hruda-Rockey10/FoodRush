// src/pages/Contact/Contact.jsx
import React, { useRef, useState } from 'react';
import './contact.css';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [sent, setSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_4ihibti',     // your service ID
        'template_dozud0p',    // your template ID
        form.current,
        'Eqto2SuIG3UYO-RIE'    // your public key
      )
      .then(
        () => {
          setSent(true);
          form.current.reset();
        },
        (error) => {
          console.error('Email send error:', error);
        }
      );
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h2>Get in Touch</h2>
        <p className="contact-intro">
          Whether you have questions about our menu, feedback on your order, or just want to say hi — 
          the <strong>Golden Zaika</strong> team is here to help. Your voice matters, and we’d love to hear from you!
        </p>
      </div>

      <div className="contact-form-wrapper">
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <input type="text" name="from_name" placeholder="Your Name" required />
          <input type="email" name="reply_to" placeholder="Your Email" required />
          <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
          {sent && <p className="success-msg">Thank you! We'll respond to your message shortly.</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
