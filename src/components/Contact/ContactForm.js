import React from 'react';
import Navbar from '../Navbar';

function ContactForm() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />

      <div className="contact-form max-w-md mt-16 mx-auto bg-white border border-gray-200 text-card-foreground p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Contact Me</h2>

        <form 
          action="https://public.herotofu.com/v1/7bf7df50-6d53-11ef-95a6-6f38c376f913" 
          method="post" 
          acceptCharset="UTF-8"
          target="_blank"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              name="Name"
              id="name"
              className="w-full px-3 py-2 mt-1 text-input border rounded-lg focus:ring focus:ring-blue-900"
              required
              placeholder="Your Name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
            <input
              type="email"
              name="Email"
              id="email"
              className="w-full px-3 py-2 mt-1 text-input border rounded-lg focus:ring focus:ring-blue-900"
              required
              placeholder="Your Email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              name="Subject"
              id="subject"
              className="w-full px-3 py-2 mt-1 text-input border rounded-lg focus:ring focus:ring-blue-900"
              required
              placeholder="Subject"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="Message"
              id="message"
              className="w-full px-3 py-2 mt-1 text-input border rounded-lg focus:ring focus:ring-blue-900"
              required
              placeholder="Your Message"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-neutral-900 transition duration-300"
          >
            Send Message
          </button>

          {/* Honeypot field for spam prevention */}
          <div style={{ textIndent: '-99999px', whiteSpace: 'nowrap', overflow: 'hidden', position: 'absolute' }} aria-hidden="true">
            <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" />
          </div>
        </form>

      </div>
    </div>
  );
}


export default ContactForm;
