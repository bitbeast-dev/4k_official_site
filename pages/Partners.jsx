import React, { useState,useEffect } from 'react';
import axios from 'axios';

const Partners = () => {

  const [partners,setPartners]=useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://fourk-new-backend.onrender.com/customer/read");

        const shuffled = [...res.data].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4);
        setPartners(selected);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  

  // Track which partner's review is visible
  const [visibleReviewId, setVisibleReviewId] = useState(null);

  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from the clients and partners who trust us to bring their vision to life.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner) => {
            const isVisible = visibleReviewId === partner.id;

            return (
              <div
                key={partner.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-6 flex flex-col items-center text-center"
              >
                {/* Image with conditional blur */}
                <img
                  src={partner.description}
                  alt={partner.name}
                  className={`w-24 h-24 object-contain mb-4 transition-filter duration-300 ${
                    isVisible ? 'blur-sm' : ''
                  }`}
                />

                {/* View Review Button */}
                <button
                  onMouseEnter={() => setVisibleReviewId(partner.id)}
                  onMouseLeave={() => setVisibleReviewId(null)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-white"
                >
                  View Review
                </button>

                {/* Show name & review only when visible */}
                {isVisible && (
                  <div className="mt-4 text-left max-w-xs">
                    <h1 className="font-bold text-lg">{partner.title_name}</h1>
                    <p className="italic text-gray-600 mt-2">"{partner.description}"</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Partners;
