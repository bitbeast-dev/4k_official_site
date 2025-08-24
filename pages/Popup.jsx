import React, { useState } from "react";

const ServicesModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const techServices = [
    "Custom Software Development",
    "Cloud Infrastructure Management",
    "Cybersecurity Solutions",
    "DevOps Automation",
    "Web and Mobile App Development",
    "IT Consulting",
    "Data Analytics & BI",
    "Tech Support & Maintenance"
  ];

  return (
    <div className="flex flex-col gap-2">
      {/* Trigger Button for Modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Our Services
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 relative">
            <h2 className="text-xl font-bold mb-4 text-center">Our Tech Services</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {techServices.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesModal;
