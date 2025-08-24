import React from 'react'
import { FingerprintIcon,CctvIcon,NetworkIcon,DoorClosedIcon,HouseIcon,Laptop2Icon,Gpu,Lightbulb,ServerCrashIcon, DoorOpen, MapPinHouseIcon, LocationEditIcon } from 'lucide-react';

const Services = () => {
    const services = [
    {
      title: "CCTV Systems (4K)",
      description:"Advanced surveillance solutions with crystal clear 4K resolution",
      icon: <CctvIcon></CctvIcon>,
      
    },
    {
      title: "Fingerprint Access Control",
      description: "Secure biometric access systems for enhanced security",
      icon: <FingerprintIcon></FingerprintIcon>
     
    },
    {
      title: "Network Infrastructure",
      description: "Robust networking solutions for seamless connectivity",
      icon: <ServerCrashIcon></ServerCrashIcon>
    },
    {
      title: "Gate Automation",
      description: "Smart automated gate systems with remote control",
      icon: <DoorOpen></DoorOpen>
    },
    {
      title: "Real Estate Security",
      description: "Comprehensive security solutions for properties",
      icon: <MapPinHouseIcon></MapPinHouseIcon>
    },
    {
      title: "Mobile/Web Development",
      description: "Custom applications tailored to your needs",
      icon:<Laptop2Icon></Laptop2Icon>
    },
    {
      title: "GPS Installations",
      description: "Professional GPS tracking and navigation systems",
      icon: <LocationEditIcon></LocationEditIcon>
    },
    {
      title: "Rapid Response Solutions",
      description: "24/7 emergency security response services",
      icon:<Lightbulb></Lightbulb>
    },
  ];

  return (

    <div>
      <section
        id="our services"
        className="py-20 px-6 md:px-20 max-w-7xl mx-auto relative"
      >
        <div className="absolute inset-0 opacity-5 -z-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 800"
            preserveAspectRatio="none"
          >
            <path
              d="M0,200 Q600,50 1200,200 L1200,600 Q600,750 0,600 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <h2 className="text-4xl font-bold text-center mb-16 text-[#202b44]">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-gray-300 bg-white shadow-md hover:shadow-lg transition transform hover:scale-105"
              role="region"
              aria-label={service.title}
            >
              <div className="p-2 ml-20 ">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#202b44] text-center">
                {service.title}
              </h3>
              <p className="text-gray-700 mb-6 text-center">
                {service.description}
              </p>
              <button className="block mx-auto text-[#202b44] hover:text-sky-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-md px-4 py-2">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </section>


    </div>
  )
}

export default Services
