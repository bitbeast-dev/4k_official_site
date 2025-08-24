import React from 'react';
import axios from 'axios';
import { useEffect,useState } from 'react';

const CoreValues = () => {
  const [currentvalue,setCurrentValues]=useState([])


  useEffect(()=>{
      const fetchData=async()=>{
        try{
          const res=await axios.get("https://fourk-backend-i5ps.onrender.com/values/read")
          console.log(res.data)
          const shuffled = [...res.data].sort(() => 0.5 - Math.random());
          const selected = shuffled.slice(0, 5);
          setCurrentValues(selected)
        }
        catch(err){ 
        }    
      }
      fetchData()
    },[])

     if (currentvalue.length === 0) {
    return <div className="text-center py-10">Loading Values...</div>;
  }
  
    const currentvalueData=currentvalue[0]
    

  return (
    <section
      id="values"
      className="flex flex-col md:flex-row items-center mx-auto gap-12 p-4 md:p-20"
    >
      <div className='w-full md:w-1/2  p-4'>
        <h2 className="text-4xl font-bold text-[#202b44] mb-6">
          Our Values
        </h2>
          <div className="md:w-full">
            <ul>
              <li className='font-medium mt-4'>{currentvalueData.description}</li>
            </ul>
          </div>
      </div>
      <div className="w-full md:w-1/2 ">
        <img
        className='h-100 w-150 object-cover rounded-xl'
          src={currentvalueData.image}
        />
      </div>
    </section>
  );
}

export default CoreValues;
