import React, { useState, useEffect } from "react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import axios from "axios";

const TeamMembers = () => {
  const [expandedMember, setExpandedMember] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://fourk-new-backend.onrender.com/team/read");

        const shuffled = [...res.data].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4);
        setTeamMembers(selected);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const toggleExpanded = (memberId) => {
    setExpandedMember(expandedMember === memberId ? null : memberId);
  };

  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the talented individuals who make our company exceptional. Each
            team member brings unique skills and experience to drive innovation.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-28 h-28 rounded-full object-cover"
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  {member.team_member}
                </h3>
                <p className="font-medium text-indigo-600">{member.role}</p>
                <div className="text-gray-500 text-sm mb-4">
                  5 years experience
                </div>

                {/* Optional Social Links */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
