import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Code,
  Cpu,
  Database,
  Server,
  Smartphone,
  Wifi,
  Shield,
  Cloud,
  Gamepad,
  SmartphoneIcon,
  ServerIcon,
  Palette,
  BarChart,
  Settings,
  CpuIcon,
  ShieldCheck

} from "lucide-react";

const Internship = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const internships = [
    {
      title: "Software Development",
      icon: <SmartphoneIcon className="w-5 h-5" />,
      description:
        "Build responsive web interfaces using React, Next.js, and modern CSS frameworks.",
      requirements: [
        "Basic knowledge of HTML/CSS/JavaScript",
        "Familiarity with React or similar frameworks",
        "Understanding of responsive design principles",
        "Experience with Git version control",
      ],
      duration: "3-6 months",
      projects: [
        "Build an e-commerce product page",
        "Create a responsive admin dashboard",
        "Implement a progressive web app",
      ],
    },
    {
      title: "Networking",
      icon: <ServerIcon className="w-5 h-5" />,
      description:
        "Our Networking Internship Program offers hands-on experience in designing, deploying, and managing cutting-edge network infrastructures for clients across industries.",
      requirements: [
        ">>> Networking Fundamentals",
        "TCP/IP, DNS, DHCP, Subnetting",

        "OSI & TCP/IP Models",

        "Routing & Switching Concepts",

        "Basic VLAN and Firewall Configurations",

        ,
      ],
      duration: "1 month",
      projects: [
        "Virtual Home Network Design Use Cisco Packet Tracer (free with NetAcad account) to: Design a home network with Wi-Fi, smart devices, and a firewall. Simulate internet connectivity issues and troubleshoot.",

        "Build a LAN in a Game Set up a Minecraft or Counter-Strike LAN party to learn: IP addressing (static vs. DHCP). Basic ping/traceroute commands.",
        "Wi-Fi Heat Mapping Use NetSpot (free version) or WiFi Analyzer (Android) to: Map signal strength in your home/school. Recommend optimal router placement.",
      ],
    },
    {
      title: "Computer System and Architecture",
      icon: <CpuIcon className="w-5 h-5" />,
      description: [
        "This program teaches the fundamentals of computer organization, CPU design, memory hierarchy, and I/O systems through interactive projects using",

        "Arduino (for hardware control",

        "LCD displays (for output visualization)",

        "Raspberry Pi (for Linux-based systems)",

        "FPGA/Logisim (for digital logic)",
      ],
      requirements: [
        "Open to high school students (LEVEL 3–5)",
        "No prior experience required for beginner projects",
      ],
      duration: "1 month",
      projects: [
        "Fastest Sorting Competition",

        "Teams optimize algorithms on Arduino, LCD shows speed.",

        "School Network Monitor",

        "Raspberry Pi + LCD displays LAN traffic stats.",

        "Voice-Activated CPU",

        "Arduino + microphone module accepts voice commands.",
      ],
    },
   {
  title: "CCTV Installation and Access Control",
  icon: <Shield className="w-5 h-5" />, // you can swap icon for a camera/lock icon if available
  description:
    "Learn how to design, install, and manage CCTV systems and electronic access control for security solutions in homes, offices, and organizations.",
  requirements: [
    "Basic understanding of electrical and networking concepts",
    "Knowledge of safety standards and wiring practices",
    "Familiarity with IP cameras and DVR/NVR systems",
    "Understanding of biometric and card-based access systems",
  ],
  duration: "3-6 months",
  projects: [
    "Set up and configure a complete CCTV surveillance system",
    "Integrate biometric access control with CCTV monitoring",
    "Design and document a security system for a commercial building",
  ],
}
,
{
  title: "Mobile App Development Internship",
  icon: <Smartphone className="w-5 h-5" />,
  description: "Gain hands-on experience building mobile apps for Android and iOS.",
  requirements: [
    "Knowledge of Java/Kotlin (Android) or Swift (iOS)",
    "Familiarity with Flutter or React Native",
    "Basic understanding of APIs",
  ],
  duration: "3-6 months",
  projects: [
    "Develop a weather forecast app",
    "Create a fitness tracking application",
    "Build a chat/messaging app",
  ],
},
{
  title: "Cybersecurity Internship",
  icon: <Shield className="w-5 h-5" />,
  description: "Explore tools and practices for securing systems, networks, and applications.",
  requirements: [
    "Basic networking concepts",
    "Knowledge of Linux/Windows OS security",
    "Familiarity with firewalls and encryption",
  ],
  duration: "3-6 months",
  projects: [
    "Perform penetration testing on a sample app",
    "Configure a secure firewall system",
    "Create a vulnerability assessment report",
  ],
},
{
  title: "Cloud Computing Internship",
  icon: <Cloud className="w-5 h-5" />,
  description: "Learn how to deploy and manage apps on AWS, Azure, or Google Cloud.",
  requirements: [
    "Basic Linux command line",
    "Understanding of networking and storage",
    "Familiarity with cloud platforms",
  ],
  duration: "3-6 months",
  projects: [
    "Deploy a web app on AWS EC2",
    "Set up cloud storage with S3 buckets",
    "Create serverless functions using AWS Lambda",
  ],
},
{
  title: "Artificial Intelligence & Machine Learning Internship",
  icon: <Cpu className="w-5 h-5" />,
  description: "Dive into AI/ML by working with data, algorithms, and neural networks.",
  requirements: [
    "Python programming",
    "Familiarity with NumPy, Pandas, TensorFlow, or PyTorch",
    "Basic statistics and linear algebra",
  ],
  duration: "4-6 months",
  projects: [
    "Build an image classifier",
    "Develop a chatbot using NLP",
    "Create a movie recommendation system",
  ],
},
{
  title: "UI/UX Design Internship",
  icon: <Palette className="w-5 h-5" />,
  description: "Learn to design user interfaces and experiences with modern tools.",
  requirements: [
    "Basic graphic design skills",
    "Familiarity with Figma/Adobe XD",
    "Understanding of user research and wireframing",
  ],
  duration: "3-4 months",
  projects: [
    "Redesign a landing page for a startup",
    "Create a mobile app UI kit",
    "Conduct usability testing on a prototype",
  ],
},
{
  title: "Data Science Internship",
  icon: <BarChart className="w-5 h-5" />,
  description: "Work with data cleaning, visualization, and predictive modeling.",
  requirements: [
    "Strong Python/R skills",
    "Knowledge of SQL for data queries",
    "Understanding of machine learning basics",
  ],
  duration: "3-6 months",
  projects: [
    "Analyze real-world sales datasets",
    "Build predictive models for customer churn",
    "Visualize data trends with dashboards",
  ],
},
{
  title: "DevOps Internship",
  icon: <Settings className="w-5 h-5" />,
  description: "Gain skills in automation, CI/CD, and infrastructure as code.",
  requirements: [
    "Basic Linux commands",
    "Familiarity with Docker and Kubernetes",
    "Knowledge of Git and CI/CD pipelines",
  ],
  duration: "3-6 months",
  projects: [
    "Set up a Jenkins CI/CD pipeline",
    "Containerize an app with Docker",
    "Deploy microservices on Kubernetes",
  ],
},
{
  title: "Game Development Internship",
  icon: <Gamepad className="w-5 h-5" />,
  description: "Learn to build games with Unity or Unreal Engine.",
  requirements: [
    "C# (Unity) or C++ (Unreal Engine)",
    "Basic 3D/2D graphics knowledge",
    "Familiarity with physics engines",
  ],
  duration: "3-6 months",
  projects: [
    "Build a 2D platformer game",
    "Create a VR environment",
    "Design and code a multiplayer mini-game",
  ],
},
{
  title: "Networking & IT Support Internship",
  icon: <Wifi className="w-5 h-5" />,
  description: "Hands-on experience in networking, troubleshooting, and IT systems.",
  requirements: [
    "Basic hardware and OS knowledge",
    "Understanding of LAN/WAN, routers, and switches",
    "Troubleshooting and customer support skills",
  ],
  duration: "3-4 months",
  projects: [
    "Set up a small office network",
    "Configure a router and firewall",
    "Troubleshoot and document IT issues",
  ],
}
      
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white"
      id="internship"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Tech Internship Programs
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Gain hands-on experience with our immersive internship programs in
            cutting-edge technologies
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {internships.map((internship, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <button
                className={`w-full px-6 py-4 flex items-center justify-between text-left bg-white ${
                  activeIndex === index ? "rounded-t-lg" : "rounded-lg"
                }`}
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`internship-${index}`}
              >
                <div className="flex items-center">
                  <div className="mr-4">{internship.icon}</div>
                  <span className="text-lg font-semibold text-gray-900">
                    {internship.title}
                  </span>
                </div>
                <div className="ml-4">
                  {activeIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </button>

              <div
                id={`internship-${index}`}
                className={`px-6 pt-2 pb-6 bg-gray-50 ${
                  activeIndex === index ? "block" : "hidden"
                }`}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-gray-900 font-medium mb-2">
                      Description
                    </h3>
                    <p className="text-gray-700 mb-4">
                      {internship.description}
                    </p>

                    <h3 className="text-gray-900 font-medium mb-2">Duration</h3>
                    <p className="text-gray-700 mb-4">{internship.duration}</p>
                  </div>

                  <div>
                    <h3 className="text-gray-900 font-medium mb-2">
                      Requirements
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                      {internship.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>

                    <h3 className="text-gray-900 font-medium mb-2">
                      Potential Projects
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {internship.projects.map((proj, i) => (
                        <li key={i}>{proj}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Internship;
