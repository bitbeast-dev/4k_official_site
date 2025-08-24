import React, { useState, useEffect } from "react";
import axios from "axios";

const Mission = () => {
  const [missions, setNewMission] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://fourk-backend-i5ps.onrender.com/mission/read");
        const shuffled = [...res.data].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);
        setNewMission(selected);
      } catch (err) {
        console.error("Error fetching mission data:", err);
      }
    };
    fetchData();
  }, []);

  // If no missions are available yet
  if (missions.length === 0) {
    return <div className="text-center py-10">Loading mission...</div>;
  }

  // Pick the first mission to display
  const mission = missions[0];

  return (
    <section
      id="mission"
      className="py-20 px-6 md:px-20 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12"
    >
      <div className="w-full md:w-1/2">
        <img
          src={mission.image}
          alt="Mission illustration representing 4K Vision's purpose"
          className="w-full h-90 rounded-lg shadow-md object-cover"
        />
      </div>
      <div className="w-full md:w-1/2">
        <h2 className="text-4xl font-bold text-[#202b44] mb-6">{mission.title_of_section}</h2>
        <p className="mb-4 leading-relaxed">{mission.description}</p>
        <p className="mb-4 leading-relaxed">{mission.descriptionB}</p>
        <button className="bg-[#202b44] px-6 py-2 text-white rounded-md hover:bg-[#1a2235]">
          More
        </button>
      </div>
    </section>
  );
};

export default Mission;
