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
<div className='w-full md:w-1/2 p-4'> <h2 className="text-4xl font-bold text-[#202b44] mb-6"> Our Values </h2> <div className="md:w-full"> <ul className="list-decimal list-inside"> {descriptionList.map((desc, index) => ( <li key={index} className="font-medium mt-4">{desc}</li> ))} </ul> </div> </div> <div className="w-full md:w-1/2"> <img className='h-100 w-150 object-cover rounded-xl' src={currentValueData.image} /> </div>
    </section>
  );
};

export default CoreValues;

