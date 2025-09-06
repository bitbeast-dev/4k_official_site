import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const CoreValues = () => {
  const [currentValues, setCurrentValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://fourk-new-backend.onrender.com/values/read");
        const shuffled = [...res.data].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);
        setCurrentValues(selected);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  if (currentValues.length === 0) {
    return <div className="text-center py-10">Loading Values...</div>;
  }

  const currentValueData = currentValues[0];

  // Split description into multiple items if numbered (1., 2., 3., etc.)
  const descriptionList = currentValueData.description
    .split(/\d+\.\s+/) // splits by "1. ", "2. ", etc.
    .filter(item => item.trim() !== ''); // remove empty strings

  return (
    <section
      id="values"
      className="flex flex-col md:flex-row items-center mx-auto gap-12 p-4 md:p-20"
    >
    <div className="w-full md:w-1/2 p-8 relative z-10 flex flex-col justify-center">
  {/* Dynamic Accent Line */}
  <div
    className={`absolute top-0 left-0 h-2 w-24 ${currentValueData.accent} rounded-br-full transition-all duration-700`}
  ></div>

  {/* Title */}
  <h2 className="text-5xl font-black bg-gradient-to-r from-purple-200 via-white to-pink-200 bg-clip-text text-transparent mb-6 leading-tight">
    Our Values
  </h2>

  {/* Subtitle */}
  <p className="text-xl text-gray-300 italic mb-6">
    {currentValueData.title}
  </p>
  <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 w-20 mb-8 rounded-full"></div>

  {/* Animated List */}
  <div className="space-y-4">
    {descriptionList.map((desc, index) => (
      <div
        key={index}
        className="flex items-start group transform transition-all duration-500 hover:translate-x-4"
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
          <span className="text-white font-bold text-sm">{index + 1}</span>
        </div>
        <p className="text-gray-100 font-medium text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
          {desc}
        </p>
      </div>
    ))}
  </div>
</div>

{/* Image Section */}
<div className="w-full md:w-1/2 relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/20 to-pink-500/30"></div>
  <div className="relative h-full transform transition-all duration-700 hover:scale-105">
    <img
      className="w-full h-full object-cover rounded-xl transition-all duration-700"
      src={currentValueData.image}
      alt={currentValueData.title}
    />
    {/* Overlay Gradient */}
    <div
      className={`absolute inset-0 bg-gradient-to-br ${currentValueData.color} opacity-50 mix-blend-multiply rounded-xl`}
    ></div>

    {/* Floating Description */}
    <div className="absolute bottom-6 left-6 right-6 p-4 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 transform transition-all duration-500 hover:translate-y-2">
      <p className="text-white text-lg font-medium leading-relaxed">
        {currentValueData.description}
      </p>
    </div>
  </div>
</div>

    </section>
  );
};

export default CoreValues;

