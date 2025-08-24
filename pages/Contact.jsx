import React from 'react'
import { MapPin,Phone,Linkedin,Mail } from 'lucide-react'

const Contact = () => {
  return (
   <section
        id="contact"
        className="p-10 w-full ml-20"
        aria-label="Contact us"
      >
        <div className="absolute inset-0 opacity-5 -z-10"></div>
        <h2 className="text-4xl font-bold text-center mb-16 text-[#202b44]">
          Get in Touch
        </h2>
        <div className="flex">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1" />
              <p className="text-gray-600">Kigali Town</p>
            </div>

          
            <div className="flex items-start gap-4">
              <Phone className="mt-1" />
              <p className="text-gray-600">+250 781 823 341 / +250 788 689 309</p>
            </div>

            <div className="flex items-start gap-4">
              <Linkedin className="mt-1" />
              <p className="text-gray-600">4K VISION</p>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="mt-1" />
              <p className="text-gray-600">4kvisions22@gmail.com</p>
            </div>
          </div>
          <form
            className="p-8 rounded-2xl border border-white/20 backdrop-blur-sm flex flex-col space-y-6  md:block"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300  outline-none"
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"
              />
            </div>
            <textarea
              name="message"
              id="message"
              placeholder="Your Message"
              rows="6"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none transition resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 text-white bg-[#202b44] rounded-lg font-semibold hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-400 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

  )
}

export default Contact
