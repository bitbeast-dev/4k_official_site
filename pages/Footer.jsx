import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <section id="contact" className="relative bg-[#202b44] text-white pt-24">
      {/* Smooth wave SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-[120px]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 120"
        >
          <path
            fill="#202b44"
            fillOpacity="1"
            d="M0,64L60,69.3C120,75,240,85,360,74.7C480,64,600,32,720,26.7C840,21,960,43,1080,53.3C1200,64,1320,64,1380,64L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>

      <footer className="max-w-7xl mx-auto px-6 md:px-10 pb-16 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start md:w-1/4">
            <img src="logo.png" alt="Company Logo" className="w-32 mb-6" />
            <p className="text-center md:text-left text-gray-300 leading-relaxed max-w-xs">
              Leading IT company specializing in security solutions and technology services.
            </p>
          </div>

          {/* Services */}
          <div className="md:w-1/4">
            <h4 className="font-semibold mb-6 text-lg text-white">Services</h4>
            <ul className="space-y-3 text-gray-300">
              {["CCTV Systems", "Access Control", "Network Solutions", "Mobile Development"].map((item) => (
                <li
                  key={item}
                  className="hover:text-indigo-400 cursor-pointer transition-colors duration-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:w-1/4">
            <h4 className="font-semibold mb-6 text-lg text-white">Company</h4>
            <ul className="space-y-3 text-gray-300">
              {["About Us", "Our Team", "Careers", "Contact"].map((item) => (
                <li
                  key={item}
                  className="hover:text-indigo-400 cursor-pointer transition-colors duration-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:w-1/4">
            <h4 className="font-semibold mb-6 text-lg text-white">Contact</h4>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center space-x-3 hover:text-indigo-400 transition-colors duration-300 cursor-pointer">
                <MapPin size={20} />
                <span>KN 84 st Inkurunziza building<span>
              </li>
              <li className="flex items-center space-x-3 hover:text-indigo-400 transition-colors duration-300 cursor-pointer">
                <Mail size={20} />
                <a href="mailto:4kvisions22@gmail.com" className="underline">
                  4kvisions22@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3 hover:text-indigo-400 transition-colors duration-300 cursor-pointer">
                <Phone size={20} />
                <a href="tel:+250 788 689 309 className="underline">
                  +250 788 689 309
                </a>
              </li>
               <li className="flex items-center space-x-3 hover:text-indigo-400 transition-colors duration-300 cursor-pointer">
                <Instagram size={20} />
                <a href="https://www.instagram.com/4k_vision2050/" className="underline">
                  4k_vision2050
                </a>
              </li>
              <li className="flex items-center space-x-3 hover:text-indigo-400 transition-colors duration-300 cursor-pointer">
                <Linkedin size={20} />
                <a href="https://www.linkedin.com/company/4kvision/" className="underline">
                  4KVision
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-none pt-6 text-center text-gray-400 text-sm select-none">
          © 2025 4K Vision. All rights reserved.
        </div>
      </footer>
    </section>
  );
};

export default Footer;
