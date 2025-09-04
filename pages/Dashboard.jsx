"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  AlarmClock,
  BarChart2,
  CandlestickChart,
  ChartBar,
  House,
  LineChartIcon,
  LucideMessageCircleWarning,
  MoreHorizontal,
  NotebookPen,
  PenBox,
  ShoppingCart,
  Star,
  ToolCase,
  User,
  Users,
} from "lucide-react";
import { toast } from "react-toastify";

export default function App() {
  const { reset, register, handleSubmit } = useForm();
  const [currentData, setData] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showHomeSection, setHomeSectionForm] = useState(false);
  const [Section, setSection] = useState(false);
  const [relateds, setRelateds] = useState(false);
  const [showcase, setShowCase] = useState(false);
  const [showMission, setShowMission] = useState(false);
  const [showValues, setShowValues] = useState(false);
  const [showInternship, setShowInternship] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [Bar, setProductBar] = useState(false);
  const [showSection, setSectionForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCreateCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState([]);
  const [internship, setInternship] = useState([]);
  const [mission, setMission] = useState([]);
  const [currentValues, setCurrentValues] = useState([]);
  const [products, setProducts] = useState([]);
  const [updateForm, setUpdateForm] = useState(false);
  const [updateCatForm, setUpdateCatForm] = useState(false);
  const [selectedEntryHome, setSelectedEntryHome] = useState(null);
  const [updateProductsForm, setUpdateProductsForm] = useState(false);
  const [showCaseData, setShowCaseData] = useState([]);
  const [updateShowForm, setUpdateShowForm] = useState(false);
  const [showTeamForm, updateShowTeam] = useState(false);
  const [team, setTeam] = useState([]);
  const [updateTeamForm, setUpdateTeamForm] = useState(false);
  const [addNewCustomer, setAddNewCustomer] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [updateCustomerForm, setUpdateCustomerForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://fourk-new-backend.onrender.com/product/read");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleHome = async (data) => {
    const formData = new FormData();
    formData.append("description", data.description);

    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }

    axios
      .post("https://fourk-new-backend.onrender.com/home/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Data successfully inserted !");
        console.log("Data successfully inserted !", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    reset();
    setData(data);
    console.log(currentData);
  };

  const handleHomeUpdate = async (data) => {
    try {
      await axios.put(
        `https://fourk-new-backend.onrender.com/home/update/${selectedEntryHome.id}`,
        data
      );
      toast.success("Entry updated successfully!");
      setUpdateForm(false);

      // Refresh data
      const res = await axios.get("https://fourk-new-backend.onrender.com/home/read");

      setHomeData(res.data);
    } catch (err) {
      toast.error(err);
      console.error("Update error:", err);
      
    }
  };

  const handleCategoryUpdate = async (data) => {
    try {
      await axios.put(
        `https://fourk-new-backend.onrender.com/cat/update/${selectedEntryHome.cat_id}`,
        data
      );
      toast.success("Entry updated successfully!");
      setUpdateForm(false);

      // Refresh data
      const res = await axios.get("https://fourk-new-backend.onrender.com/cat/read");
      setCategories(res.data);
    } catch (err) {
      toast.error(err);
      console.error("Update error:", err);
     
    }
  };

  const handleProducts = async (data) => {
    const formData = new FormData();

    // Make sure data.images is a FileList
    if (!data.images || data.images.length === 0) {
      console.error("No images selected");
      return;
    }

    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }

    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("features", data.features);
    formData.append("style", data.style);
    formData.append("quantity", data.quantity);
    formData.append("category", data.category);

    try {
      const res = await axios.post(
        "https://fourk-new-backend.onrender.com/product/add",
        formData
      );
      toast.success("Data successfully inserted !");
      console.log("Success", res.data);
    } catch (err) {
      console.error("Upload error", err.response?.data || err.message);
    }
  };

  // TODO: CATEGORY TAB

  const createCategory = async (data) => {
    reset();
    console.log(data);
    try {
      const res = await axios.post("https://fourk-new-backend.onrender.com/cat/add", data);
      toast.success("Data successfully inserted !");
      console.log("Data successfully inserted", res.data);
    } catch (err) {
      console.log("Error found", err);
    }
  };

  const handleDeleteCategories = (cat_id) => {
    axios
      .delete(`https://fourk-new-backend.onrender.com/cat/delete/${cat_id}`)
      .then((res) => {
        console.log(res.data);
        toast.success("Category successfully deleted !");
      })
      .catch((err) => {
        toast.error(err)
        console.log(err);
      });
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`https://fourk-new-backend.onrender.com/product/delete/${id}`);
      toast.success(`Product with ID ${id} successfully deleted !`);

      const res = await axios.get("https://fourk-new-backend.onrender.com/product/read");
      setProducts(res.data);
    } catch (err) {
      toast.error(err.response?.data || err.message);
      console.log(err);
    }
  };

  const deleteTeam = async (id) => {
    try {
      await axios.delete(`https://fourk-new-backend.onrender.com/team/delete/${id}`);
      toast.success("Team successfully deleted");
    } catch (err) {
      toast.error(err)
      console.log(err);
    }
  };

  const deleteMission = async (id) => {
    try {
      await axios.delete(`https://fourk-new-backend.onrender.com/mission/delete/${id}`);
      toast.success("Mission successfully deleted");

      const res = await axios.get("https://fourk-new-backend.onrender.com/mission/read");
      setMission(res.data);
    } catch (err) {
      toast.error(err);
      console.log(err);
    }
  };

  const handleProductUpdate = async (data) => {
    try {
      await axios.put(
        `https://fourk-new-backend.onrender.com/product/update/${selectedEntryHome.id}`,
        data
      );
    
      const res = await axios.get("https://fourk-new-backend.onrender.com/product/read");
      setProducts(res.data);

      toast.success("Product successfully updated !")
    } catch (err) {
      toast.error(err)
    }
  };

  const deleteInternship = async (id) => {
    await axios
      .delete(`https://fourk-new-backend.onrender.com/internship/delete/${id}`)
      .then(() => {
        toast.success(`ID ${id} have deleted !`);
      })
      .catch((err) => {
        toast.error(`Error found ${err}`);
      });
  };
  const handleValues = (data) => {
    const formData = new FormData();
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }
    formData.append("description", data.description);

    axios.post("https://fourk-new-backend.onrender.com/values/add", formData);
    toast
      .success("Data successfully inserted !")
      .then((res) => {
        console.log("Values successfully Inserted", res.data);
      })
      .catch((err) => {
        console.log("Error found", err);
      });
  };

  const handleInternship = (data) => {
    const formData = new FormData();
    formData.append("icon", data.icon[0]); // ✅ send first file
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("requirement", data.requirement);
    formData.append("duration", data.duration);

    axios
      .post("https://fourk-new-backend.onrender.com/internship/add", formData)
      .then((res) => {
        toast.success("Data successfully inserted !");
        console.log("Internship successfully added!", res.data);
      })
      .catch((err) => {
        console.log("Error found", err);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://fourk-new-backend.onrender.com/cat/read");
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://fourk-new-backend.onrender.com/values/read");
        setCurrentValues(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://fourk-new-backend.onrender.com/mission/read");
        setMission(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://fourk-new-backend.onrender.com/internship/read");
        setInternship(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Enhanced analytics data with more realistic values
  const [analyticsData, setAnalyticsData] = useState([
    {
      id: 1,
      date: "2024-01-15",
      totalVisitors: 12450,
      pageViews: 28900,
      bounceRate: 42.3,
      avgSessionDuration: "3:24",
      conversionRate: 2.8,
    },
    {
      id: 2,
      date: "2024-01-14",
      totalVisitors: 11200,
      pageViews: 25600,
      bounceRate: 45.1,
      avgSessionDuration: "3:12",
      conversionRate: 2.5,
    },
    {
      id: 3,
      date: "2024-01-13",
      totalVisitors: 13800,
      pageViews: 31200,
      bounceRate: 38.9,
      avgSessionDuration: "3:45",
      conversionRate: 3.2,
    },
    {
      id: 4,
      date: "2024-01-12",
      totalVisitors: 10900,
      pageViews: 23400,
      bounceRate: 48.2,
      avgSessionDuration: "2:58",
    },
    {
      id: 5,
      date: "2024-01-11",
      totalVisitors: 14200,
      pageViews: 32800,
      bounceRate: 36.7,
      avgSessionDuration: "4:12",
      conversionRate: 3.8,
    },
  ]);

  const [homeData, setHomeData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("https://fourk-new-backend.onrender.com/home/read");
        console.log("Fetched data:", res.data); // 👈 Check what's returned
        setHomeData(res.data);
        console.log(homeData.res.data.image);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    fetchData();
  }, []);

  const handleHomeDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (!confirmDelete) return;

    axios
      .delete(`https://fourk-new-backend.onrender.com/home/delete/${id}`)

      .then(() => {
        toast.success("Home Slide successfully deleted!");
      })
      .catch((err) => {
        console.error("Delete error:", err);
        toast.error(err);
      });
  };

  const deleteAllHome = () => {
    // Confirm returns true if user clicks "OK", false if "Cancel"
    const confirmed = window.confirm(
      "Are you sure you want to delete all data?"
    );

    if (!confirmed) {
      return; // Stop here if user cancels
    }

    axios
      .delete("https://fourk-new-backend.onrender.com/home/truncate")
      .then(() => {
        toast.info("All data has been deleted");
      })
      .catch((err) => {
        toast.error(err.message || "Error deleting data");
      });
  };

  const deleteAllShow = () => {
    // Confirm returns true if user clicks "OK", false if "Cancel"
    const confirmed = window.confirm(
      "Are you sure you want to delete all data?"
    );

    if (!confirmed) {
      return; // Stop here if user cancels
    }

    axios
      .delete("https://fourk-new-backend.onrender.com/show/truncate")
      .then(() => {
        toast.success("All data has been deleted");
      })
      .catch((err) => {
        toast.error(err.message || "Error deleting data");
      });
  };

  const handleMission = (data) => {
    const formData = new FormData();
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }
    formData.append("title", data.title);
    formData.append("description", data.description);

    axios
      .post("https://fourk-new-backend.onrender.com/mission/add", formData)
      .then((res) => {
        toast.success("Data successfully inserted !");
        console.log("Data successfully Inserted", res.data);
      })
      .catch((err) => {
        console.log("Error Found :", err);
      });
  };

  const [formData, setFormData] = useState({
    date: "",
    totalVisitors: "",
    pageViews: "",
    bounceRate: "",
    avgSessionDuration: "",
    conversionRate: "",
  });

  // Chart data
  const chartData = analyticsData.map((entry) => ({
    date: entry.date.split("-")[2],
    visitors: entry.totalVisitors,
    pageViews: entry.pageViews,
    conversion: entry.conversionRate,
  }));

  // TODO : Showcase

  const handleShow = (data) => {
    const formData = new FormData();
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }

    formData.append("description", data.description);

    axios
      .post("https://fourk-new-backend.onrender.com/show/add", formData)
      .then((res) => {
        toast.success("Data successfully inserted !");
        console.log("Showcase successfully inserted", res.data);
      })
      .catch((err) => {
        console.log("Error found", err);
      });
  };

  useEffect(() => {
    const fetchData = async (data) => {
      try {
        const res = await axios.get("https://fourk-new-backend.onrender.com/show/read");
        setShowCaseData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleShowDelete = async (id) => {
    try {
      await axios.delete(`https://fourk-new-backend.onrender.com/show/delete/${id}`);
      toast.success(`Data with ${id} successfully deleted`);

      const res = await axios.get("https://fourk-new-backend.onrender.com/show/read");
      setShowCaseData(res.data);
    } catch (err) {
      toast.error(err);
    }
  };

  const handleShowUpdate = async (data) => {
    try {
      await axios.put(
        `https://fourk-new-backend.onrender.com/show/update/${selectedEntryHome.id}`,
        data
      );
      toast.success(`Customer Show with ID ${selectedEntryHome.id} updated`);

      const res = await axios.get("https://fourk-new-backend.onrender.com/show/read");
      setShowCaseData(res.data);
    } catch (err) {
      toast.error(err);
      console.log(err);
    }
  };

  // END OF SHOWCASE

  // TODO : BEGINNING OF TEAM PANEL

  const createTeam = (data) => {
    console.log(data.role);
    const formData = new FormData();
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }

    formData.append("role", data.role);

    axios
      .post("https://fourk-new-backend.onrender.com/team/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Team successfully Added");
      })
      .catch((err) => {
        console.log("Error occured", err);
      });
  };

  const deleteAllData = () => {
    // Confirm returns true if user clicks "OK", false if "Cancel"
    const confirmed = window.confirm(
      "Are you sure you want to delete all data?"
    );

    if (!confirmed) {
      return; // Stop here if user cancels
    }

    axios
      .delete("https://fourk-new-backend.onrender.com/product/truncate")
      .then(() => {
        toast.success("All data has been deleted");
      })
      .catch((err) => {
        toast.error(err.message || "Error deleting data");
      });
  };

  // Displaying data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://fourk-new-backend.onrender.com/team/read");
        setTeam(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Updating Team Member

  const deleteValues = async (id) => {
    try {
      axios.delete(`https://fourk-new-backend.onrender.com/values/delete/${id}`);

      const res = await axios.get("https://fourk-new-backend.onrender.com/values/read");
      setCurrentValues(res.data);
    } catch (err) {
      toast.error(err);
      console.log(err);
    }
  };
  const handleTeamUpdate = async (data) => {
    try {
      await axios.put(
        `https://fourk-new-backend.onrender.com/team/update/${selectedEntryHome.id}`,
        data
      );
      toast.success("Team successfully updated !");
    } catch (err) {
      toast.error(err)
      console.log(err);
    }
  };

  // TODO : END OF TEAM CCOMPONENT

  // TODO : START PARTNER/CUSTOMER COMPONENT

  const createCustomer = (data) => {
    const formData = new FormData();
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }
    formData.append("description", data.description);

    axios
      .post("https://fourk-new-backend.onrender.com/customer/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      .then((res) => {
        toast.success("Data successfully inserted !");
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(err);
        console.log(err);
      });
  };

  // Displaying data from API

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://fourk-new-backend.onrender.com/customer/read");
        setCustomer(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Deleting data

  const handleDeleteCustomers = async (id) => {
    try {
      await axios.delete(`https://fourk-new-backend.onrender.com/customer/delete/${id}`);
      toast.success("Data successfully deleted !");

      const res = await axios.get("https://fourk-new-backend.onrender.com/customer/read");
      setCustomer(res.data);
    } catch (err) {
      toast.error(err);
      console.log(err);
    }
  };

  // Updating Data

  const handleDescriptionUpdate = async (data) => {
    try {
      await axios.put(
        `https://fourk-new-backend.onrender.com/customer/update/${selectedEntryHome.id}`,
        data
      );
      toast.success("Customer Successfully Updated");

      const res = await axios.get("https://fourk-new-backend.onrender.com/customer/read");
      setCustomer(res.data);
    } catch (err) {
      toast.error(err);
      console.log(err);
    }
  };

  const pieData = [
    { name: "Direct", value: 35, color: "#4C6EF5" }, // Blue
    { name: "Social", value: 25, color: "#7950F2" }, // Purple
    { name: "Search", value: 30, color: "#10B981" }, // Green
    { name: "Email", value: 10, color: "#F59E0B" }, // Orange
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = (id) => {
    setAnalyticsData(analyticsData.filter((entry) => entry.id !== id));
    setShowDeleteModal(false);
    setSelectedEntry(null);
  };

  const MetricCard = ({ title, value, change, icon, gradient }) => (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-lg border-0 p-6 text-white transform hover:scale-105 transition-all duration-300 ${gradient}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <div className="text-8xl">{icon}</div>
      </div>
      <div className="relative z-10">
        <p className="text-sm font-medium opacity-90 mb-2">{title}</p>
        <p className="text-3xl font-bold mb-2">{value}</p>
        {change && <div className="flex items-center"></div>}
      </div>
    </div>
  );

  const Sidebar = () => (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-center h-16 ">
        <h1 className="text-xl font-bold text-white">Insightful</h1>
      </div>
      <nav className="mt-8 ">
        {[
          { id: "dashboard", label: "Dashboard", icon: <ChartBar /> },
          { id: "home", label: "Home", icon: <House /> },
          { id: "category", label: "Category", icon: <AlarmClock /> },
          { id: "products", label: "Products", icon: <ShoppingCart /> },
          { id: "showcase", label: "Showcase", icon: <Star /> },
          { id: "team", label: "Team", icon: <Users /> },
          { id: "customer", label: "Customer", icon: <User /> },
          { id: "entries", label: "Entries", icon: <CandlestickChart /> },
          { id: "settings", label: "Settings", icon: "⚙️" },
          { id: "others", label: "More", icon: <MoreHorizontal /> },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center px-6 py-3 text-left text-sm font-medium transition-all duration-200 ${
              activeTab === item.id
                ? "bg-blue-800 text-w-4 border-blue-300"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 font-inter text-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content Area */}
      <div className="ml-64 w-400 overflow-x-hidden overflow-y-hidden">
        {/* Top Navigation */}
        <nav className="bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-800 sticky top-0 z-30  w-full">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <h1 className="ml-2 text-xl font-bold bg- from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Analytics Dashboard
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                {/* Search Bar */}
                <div className="relative hidden md:block">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-gray-800 text-gray-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                {/* Notifications */}
                <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
                {/* User Profile */}
                <div className="relative">
                  <div className="w-8 h-8 bg- from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer">
                    A
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="">
          {/* Dashboard Overview */}
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Dashboard Overview */}
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                {/* Header & Button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="max-w-full sm:max-w-xl">
                    <h2 className="text-xl sm:text-3xl font-extrabold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
                      Dashboard Overview
                    </h2>
                    <p className="text-gray-400 mt-1 text-xs sm:text-sm md:text-base max-w-md">
                      Real-time analytics and insights
                    </p>
                  </div>
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-blue-400 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-blue-500 transform hover:scale-105 transition-transform duration-200 shadow-lg text-sm sm:text-base w-full sm:w-auto min-w-[160px]"
                    type="button"
                    aria-label="Create new entry"
                  >
                    Create New Entry
                  </button>
                </div>

                {/* Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <MetricCard
                    title="Total Visitors"
                    value="12,450"
                    change={8.2}
                  />
                  <MetricCard title="Page Views" value="28,900" change={12.5} />
                  <MetricCard title="Bounce Rate" value="42.3%" change={-2.1} />
                  <MetricCard
                    title="Conversion Rate"
                    value="2.8%"
                    change={5.3}
                  />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Visitor Trends */}
                  <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 p-4 sm:p-6">
                    <h3 className="text-base sm:text-xl font-bold text-gray-100 mb-4 flex items-center">
                      <span className="mr-2">
                        <LineChartIcon />
                      </span>
                      Visitor Trends
                    </h3>
                    <ResponsiveContainer
                      width="100%"
                      height={200}
                      minHeight={150}
                    >
                      {/* Chart code unchanged */}
                    </ResponsiveContainer>
                  </div>

                  {/* Traffic Sources */}
                  <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 p-4 sm:p-6">
                    <h3 className="text-base sm:text-xl font-bold text-gray-100 mb-4 flex items-center">
                      <span className="mr-2">
                        <ChartBar />
                      </span>
                      Traffic Sources
                    </h3>
                    <ResponsiveContainer
                      width="100%"
                      height={200}
                      minHeight={150}
                    >
                      {/* Chart code unchanged */}
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Performance Overview */}
                <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 p-4 sm:p-6 mt-8">
                  <h3 className="text-base sm:text-xl font-bold text-gray-100 mb-4 flex items-center">
                    <span className="mr-2">
                      <BarChart2 />
                    </span>
                    Performance Overview
                  </h3>
                  <ResponsiveContainer
                    width="100%"
                    height={250}
                    minHeight={180}
                  >
                    {/* Chart code unchanged */}
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>

          {/* View Entries */}
          {activeTab === "entries" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold bg- from-gray-100 to-gray-300 bg-clip-text text-transparent">
                    Analytics Entries
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Manage your analytics data
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-blue-400  text-white px-6 py-3 rounded-xl hover:bg-blue-400 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Add New Entry
                </button>
              </div>

              <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        {[
                          "Date",
                          "Visitors",
                          "Page Views",
                          "Bounce Rate",
                          "Avg Session",
                          "Conversion",
                          "Actions",
                        ].map((header) => (
                          <th
                            key={header}
                            className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                      {analyticsData.map((entry, index) => (
                        <tr
                          key={entry.id}
                          className="hover:bg-gray-700/50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 text-sm font-medium text-gray-100">
                            {entry.date}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            {entry.totalVisitors.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            {entry.pageViews.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            {entry.bounceRate}%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            {entry.avgSessionDuration}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            {entry.conversionRate}%
                          </td>
                          <td className="px-6 py-4 text-sm font-medium space-x-2">
                            <button
                              onClick={() => {
                                setSelectedEntry(entry);
                                setShowDeleteModal(true);
                              }}
                              className=""
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "category" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold bg- from-gray-100 to-gray-300 bg-clip-text text-transparent">
                    Category Entries
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Manage your Categories data
                  </p>
                </div>
                <button
                  onClick={() => setShowCategories(true)}
                  className="bg-blue-400  text-white px-6 py-3 rounded-xl hover:bg-blue-400 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Add New Entry
                </button>
              </div>

              <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        {["Date", "Categories", "Actions"].map((header) => (
                          <th
                            key={header}
                            className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                      {categories.map((entry, index) => (
                        <tr
                          key={entry.cat_id}
                          className="hover:bg-gray-700/50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 text-sm font-medium text-gray-100">
                            2025-04-7
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            {entry.id}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium space-x-2">
                            <button
                              onClick={() => {
                                setSelectedEntryHome(entry);
                                reset(entry);
                                setUpdateCatForm(true);
                              }}
                              className="bg-blue-400 text-white p-2 rounded-md"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => {
                                handleDeleteCategories(entry.cat_id);
                              }}
                              className="bg-red-800 text-white p-2 rounded-md"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold bg- from-gray-100 to-gray-300 bg-clip-text text-transparent">
                    Team
                  </h2>
                  <p className="text-gray-400 mt-1">Team Members</p>
                </div>
                <button
                  onClick={() => updateShowTeam(true)}
                  className="bg-blue-400  text-white px-6 py-3 rounded-xl hover:bg-blue-400 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Add New Entry
                </button>
              </div>

              <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        {["ID", "Names", "Image", "Role", "Actions"].map(
                          (header) => (
                            <th
                              key={header}
                              className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                            >
                              {header}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                      {team.map((entry, index) => (
                        <tr
                          key={entry.cat_id}
                          className="hover:bg-gray-700/50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 text-sm font-medium text-gray-100 w-50">
                            {entry.id}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300 w-60 ">
                            {entry.team_member}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300 w-50">
                            <img
                              src={entry.image}
                              className="w-15 h-15 rounded-md object-cover"
                              alt=""
                            />
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300 w-50">
                            {entry.role}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium space-x-2 w-50">
                            <button
                              onClick={() => {
                                setSelectedEntryHome(entry);
                                reset(entry);
                                setUpdateTeamForm(true);
                              }}
                              className="bg-blue-400 text-white p-2 rounded-md"
                            >
                              Update
                            </button>
                            <button
                              className="bg-red-800 text-white p-3 w-15 rounded-md"
                              onClick={() => {
                                deleteTeam(entry.id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "customer" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold bg- from-gray-100 to-gray-300 bg-clip-text text-transparent">
                    Customer
                  </h2>
                  <p className="text-gray-400 mt-1">Manage your Customer</p>
                </div>
                <button
                  onClick={() => setAddNewCustomer(true)}
                  className="bg-blue-400  text-white px-6 py-3 rounded-xl hover:bg-blue-400 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Add New Entry
                </button>
              </div>

              <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        {[
                          "Date",
                          "Name",
                          "Image",
                          "Description",
                          "Actions",
                        ].map((header) => (
                          <th
                            key={header}
                            className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                      {customer.map((entry, index) => (
                        <tr
                          key={entry.id}
                          className="hover:bg-gray-700/50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 text-sm font-medium text-gray-100">
                            {entry.id}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            {entry.title_name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            <img
                              src={entry.description}
                              alt=""
                              className="w-16 h-16 rounded-md"
                            />
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            {entry.description}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium space-x-2">
                            <button
                              onClick={() => {
                                setSelectedEntryHome(entry);
                                reset(entry);
                                setUpdateCustomerForm(true);
                              }}
                              className="bg-blue-400 text-white p-2 rounded-md"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => {
                                handleDeleteCustomers(entry.id);
                              }}
                              className="bg-red-800 text-white p-2 rounded-md"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Settings */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold bg- from-gray-100 to-gray-300 bg-clip-text text-transparent">
                  Settings
                </h2>
                <p className="text-gray-400 mt-1">
                  Configure your dashboard preferences
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 p-6">
                  <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
                    <span className="mr-2">🎨</span>
                    Appearance
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Dark Mode</span>
                      <div className="w-12 h-6 bg-gray-600 rounded-full relative cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Auto Refresh</span>
                      <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 p-6">
                  <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
                    <span className="mr-2">🔔</span>
                    Notifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Email Alerts</span>
                      <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Push Notifications</span>
                      <div className="w-12 h-6 bg-gray-600 rounded-full relative cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Home Section */}
          {activeTab === "home" && (
            <div className="">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold bg- from-gray-100 to-gray-300 bg-clip-text text-transparent">
                    Home Section
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Manage your homepage content
                  </p>
                </div>
                <button
                  onClick={() => {
                    deleteAllHome();
                  }}
                  className="bg-orange-400 p-3 rounded-md"
                >
                  Delete All
                </button>
                <button
                  onClick={() => setHomeSectionForm(true)}
                  className="bg-blue-400 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Add New Entry
                </button>
              </div>

              <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        {[
                          "Date",
                          "Title",
                          "Description",
                          "Image",
                          "Actions",
                        ].map((header) => (
                          <th
                            key={header}
                            className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                      {homeData.map((entry) => (
                        <tr
                          key={entry.id}
                          className="hover:bg-gray-700/50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 text-sm text-gray-100">
                            2024-01-15
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-100">
                            {entry.title}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            {entry.description}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center">
                              <img src={entry.image} alt="" />
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium space-x-2 flex">
                            <button
                              onClick={() => {
                                setSelectedEntryHome(entry);
                                reset(entry);
                                setUpdateForm(true);
                              }}
                              className="bg-blue-400 text-white  rounded-lg transition-colors p-3"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => handleHomeDelete(entry.id)}
                              className="bg-red-800 text-white  rounded-lg p-3  transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Products Section */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold bg- from-gray-100 to-gray-300 bg-clip-text text-transparent">
                    Product Section
                  </h2>
                  <p className="text-gray-400 mt-1">Manage your Products</p>
                </div>
                <button
                  onClick={() => {
                    deleteAllData();
                  }}
                  className="bg-orange-400 p-3 rounded-md"
                >
                  Delete All
                </button>
                <button
                  onClick={() => setProductBar(true)}
                  className="bg-blue-400 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Add New Entry
                </button>
              </div>

              <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        {[
                          "ID",
                          "Image",
                          "Title",
                          "Description",
                          "Price",
                          "Category",
                          "Action",
                        ].map((header) => (
                          <th
                            key={header}
                            className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                      {products.map((entry) => (
                        <tr
                          key={entry.id}
                          className="hover:bg-gray-700/50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 text-sm text-gray-100 w-50">
                            {entry.ID}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-100 w-50">
                            <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center">
                              <img src={entry.image} alt="" />
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300 w-50">
                            {entry.title}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300 w-50">
                            {entry.description}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300 w-50">
                            {entry.price}
                          </td>
                          <td>{entry.category}</td>

                          <td className="w-60">
                            <button
                              onClick={() => {
                                setSelectedEntryHome(entry);
                                reset(entry);
                                setUpdateProductsForm(true);
                              }}
                              className="bg-blue-400  p-3 w-16 rounded-lg hover:cursor-pointer transition-colors"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => {
                                handleDeleteProduct(entry.id);
                              }}
                              className="bg-red-800 ml-5  p-3 w-16 rounded-lg hover:cursor-pointer transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {/* Showcase Section */}
          {activeTab === "showcase" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold bg- from-gray-100 to-gray-300 bg-clip-text text-transparent">
                    Showcase
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Feature your best content
                  </p>
                </div>
                <button
                  onClick={() => {
                    deleteAllShow();
                  }}
                  className="bg-orange-400 p-3 rounded-md"
                >
                  Delete All
                </button>
                <button
                  onClick={() => setShowCase(true)}
                  className="bg- from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Add Showcase Item
                </button>
              </div>

              <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        {["ID", "Title","Image", "Description", "Action"].map(
                          (header) => (
                            <th
                              key={header}
                              className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                            >
                              {header}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                      {showCaseData.map((entry) => (
                        <tr
                          key={entry.id}
                          className="hover:bg-gray-700/50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 text-sm text-gray-100 w-50">
                            {entry.id}
                          </td>

                          <td className="px-6 py-4 text-sm text-gray-300 w-50">
                            {entry.title}
                          </td>
                           <td className="px-6 py-4 text-sm text-gray-300 w-50">
                            <img src={entry.image} alt="" />
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300 w-30">
                            {entry.description}
                          </td>

                          <td className="w-60">
                            <button
                              onClick={() => {
                                setSelectedEntryHome(entry);
                                reset(entry);
                                setUpdateShowForm(true);
                              }}
                              className="bg-blue-400  p-3 w-16 rounded-lg hover:cursor-pointer transition-colors"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => handleShowDelete(entry.id)}
                              className="bg-red-800 ml-5  p-3 w-16 rounded-lg hover:cursor-pointer transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Others Section */}
          {activeTab === "others" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold bg- from-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
                  Additional Sections
                </h2>
                <p className="text-gray-400">
                  Manage mission, values, and internships
                </p>
              </div>

              {/* Mission Section */}
              <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-100 flex items-center">
                    <span className="mr-2">
                      <PenBox />
                    </span>
                    Mission Section
                  </h3>
                  <button
                    onClick={() => setShowMission(true)}
                    className="bg-blue-400 text-white px-4 py-2 rounded-lg  transition-all duration-200"
                  >
                    Update
                  </button>
                </div>
                <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-gray-700">
                        <tr>
                          {[
                            "ID",
                            "Section",
                            "Description",
                            "Image",
                            "Action",
                          ].map((header) => (
                            <th
                              key={header}
                              className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700/50">
                        {mission.map((entry, index) => (
                          <tr
                            key={entry.cat_id}
                            className="hover:bg-gray-700/50 transition-colors duration-200"
                          >
                            <td className="px-6 py-4 text-sm font-medium text-gray-100">
                              {entry.id}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              {entry.title_of_section}
                            </td>
                            <td className="px-6 py-4 w-80 text-sm text-gray-300">
                              {entry.description}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              <img
                                src={entry.image}
                                className="w-16 h-16 object-cover rounded-md"
                                alt=""
                              />
                            </td>
                            <td className="px-6 py-4 text-sm font-medium space-x-2">
                              <button className="bg-blue-400 text-white p-2 rounded-md hover:cursor-pointer">
                                Update
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedEntry(entry);

                                  deleteMission(entry.id);
                                }}
                                className="bg-red-800 text-white p-2 rounded-md hover:cursor-pointer"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Values Section */}
              <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-100 flex items-center">
                    <span className="mr-2">
                      <PenBox />
                    </span>
                    Values Section
                  </h3>
                  <button
                    onClick={() => setShowValues(true)}
                    className="bg-blue-400 text-white px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    Update
                  </button>
                </div>
                <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-gray-700">
                        <tr>
                          {["ID", "Description", "Image", "Action"].map(
                            (header) => (
                              <th
                                key={header}
                                className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                              >
                                {header}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700/50">
                        {currentValues.map((entry, index) => (
                          <tr className="hover:bg-gray-700/50 transition-colors duration-200">
                            <td className="px-6 py-4 text-sm font-medium text-gray-100">
                              {entry.id}
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-300">
                              {entry.description}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              <img
                                src={entry.image}
                                alt=""
                                className="w-16 h-16 rounded-md object-cover"
                              />
                            </td>
                            <td className="px-6 py-4 text-sm font-medium space-x-2">
                              <button
                                className="bg-red-800 text-white p-2 rounded-md hover:cursor-pointer"
                                onClick={() => {
                                  setSelectedEntry(entry);
                                  deleteValues(entry.id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Internship Section */}
              <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-100 flex items-center">
                    <span className="mr-2">
                      <PenBox />
                    </span>
                    Internship Opportunities
                  </h3>
                  <button
                    onClick={() => setShowInternship(true)}
                    className="bg-blue-400 p-3 rounded-md transition-all duration-200"
                  >
                    Add Position
                  </button>
                </div>
                <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-gray-700">
                        <tr>
                          {[
                            "Date",
                            "ID",
                            "Title",
                            "Description",
                            "requirement",
                          ].map((header) => (
                            <th
                              key={header}
                              className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700/50">
                        {internship.map((entry, index) => (
                          <tr className="hover:bg-gray-700/50 transition-colors duration-200">
                            <td className="px-6 py-4 text-sm font-medium text-gray-100">
                              2025-04-7
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              {entry.id}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              {entry.title}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              {entry.description}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium space-x-2">
                              <button
                                className="bg-red-900 text-white p-2 rounded-md hover:cursor-pointer"
                                onClick={() => {
                                  setSelectedEntry(entry);
                                  deleteInternship(entry.id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {/* Home Section Modal */}
      {showHomeSection && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300">
            <h1 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
              <span className="mr-2">
                <House />
              </span>
              Home Section
            </h1>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(handleHome)}
              encType="multipart/form-data"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Image Description
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-gray-700 text-gray-100"
                  rows="3"
                  placeholder="Enter Image Description..."
                  {...register("description")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload Image
                </label>
                <input
                  {...register("images")}
                  accept="image/*"
                  type="file"
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                  multiple
                />
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setHomeSectionForm(false)}
                  className="flex-1 bg-gray-700 text-gray-300 py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-400 hover:cursor-pointer text-white py-3 rounded-xl  transition-all font-medium"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {updateForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300">
            <h1 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
              <span className="mr-2">
                <House />
              </span>
              Home Section
            </h1>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(handleHomeUpdate)}
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Image Description
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-gray-700 text-gray-100"
                  rows="3"
                  placeholder="Change Description ..."
                  {...register("description")}
                />
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setUpdateForm(false)}
                  className="flex-1 bg-gray-700 text-gray-300 py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-400 hover:cursor-pointer text-white py-3 rounded-xl  transition-all font-medium"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {updateCatForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300">
            <h1 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
              <span className="mr-2">
                <House />
              </span>
              Category Section
            </h1>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(handleCategoryUpdate)}
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Change Category
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-gray-700 text-gray-100"
                  rows="3"
                  placeholder="Change Category ..."
                  {...register("id")}
                />
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setUpdateCatForm(false)}
                  className="flex-1 bg-gray-700 text-gray-300 py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-400 hover:cursor-pointer text-white py-3 rounded-xl  transition-all font-medium"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {updateCustomerForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300">
            <h1 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
              <span className="mr-2">
                <House />
              </span>
              Customer Section
            </h1>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(handleDescriptionUpdate)}
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Change Description
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-gray-700 text-gray-100"
                  rows="3"
                  placeholder="Change Category ..."
                  {...register("description")}
                />
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setUpdateCustomerForm(false)}
                  className="flex-1 bg-gray-700 text-gray-300 py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-400 hover:cursor-pointer text-white py-3 rounded-xl  transition-all font-medium"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {updateTeamForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300">
            <h1 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
              <span className="mr-2">
                <House />
              </span>
              Team Section
            </h1>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(handleTeamUpdate)}
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Change Team Role
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-gray-700 text-gray-100"
                  placeholder="Change Role ..."
                  {...register("role")}
                />
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setUpdateTeamForm(false)}
                  className="flex-1 bg-gray-700 text-gray-300 py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-400 hover:cursor-pointer text-white py-3 rounded-xl  transition-all font-medium"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {updateProductsForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300">
            <h1 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
              <span className="mr-2">
                <House />
              </span>
              Product Section
            </h1>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(handleProductUpdate)}
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Change Category
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-gray-700 text-gray-100"
                  rows="3"
                  placeholder="Change Category ..."
                  {...register("description")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Change Category
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-gray-700 text-gray-100"
                  rows="3"
                  placeholder="Change Category ..."
                  {...register("price")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Change Category
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-gray-700 text-gray-100"
                  rows="3"
                  placeholder="Change Category ..."
                  {...register("category")}
                />
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setUpdateProductsForm(false)}
                  className="flex-1 bg-gray-700 text-gray-300 py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-400 hover:cursor-pointer text-white py-3 rounded-xl  transition-all font-medium"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {updateShowForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300">
            <h1 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
              <span className="mr-2">
                <House />
              </span>
              ShowCase Section
            </h1>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(handleShowUpdate)}
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Change Title
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-gray-700 text-gray-100"
                  rows="3"
                  placeholder="Change Category ..."
                  {...register("title")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Change Description
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-gray-700 text-gray-100"
                  rows="3"
                  placeholder="Change Category ..."
                  {...register("description")}
                />
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setUpdateShowForm(false)}
                  className="flex-1 bg-gray-700 text-gray-300 py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-400 hover:cursor-pointer text-white py-3 rounded-xl  transition-all font-medium"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Section Modal */}
      {productSection && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h1 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
              <span className="mr-2">📦</span>
              Product Section
            </h1>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Product Title
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                  type="text"
                  placeholder="Enter Product Title..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload Icon
                </label>
                <input
                  type="file"
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                />
              </div>
            </form>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setProductSection(false)}
                className="flex-1 bg-gray-700 text-gray-300 py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
              <button className="flex-1 bg- from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
              <span className="mr-2">📊</span>
              Create New Analytics Entry
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Total Visitors
                  </label>
                  <input
                    type="number"
                    name="totalVisitors"
                    value={formData.totalVisitors}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Page Views
                  </label>
                  <input
                    type="number"
                    name="pageViews"
                    value={formData.pageViews}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bounce Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="bounceRate"
                    value={formData.bounceRate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Avg Session Duration
                  </label>
                  <input
                    type="text"
                    name="avgSessionDuration"
                    value={formData.avgSessionDuration}
                    onChange={handleInputChange}
                    placeholder="e.g., 3:24"
                    className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Conversion Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="conversionRate"
                    value={formData.conversionRate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 bg-gray-700 text-gray-300 py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg- from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
                >
                  Create Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCreateCategories && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
              <span className="mr-2">
                <PenBox />
              </span>
              Create New Category Entry
            </h3>
            <form onSubmit={handleSubmit(createCategory)} className="space-y-4">
              <div className="">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Create Category
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                    required
                    {...register("cat")}
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setShowCategories(false)}
                    className="w-full bg-red-400 p-3 mt-3  rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-blue-400 p-3 mt-3 ml-2 rounded-xl"
                  >
                    Create Entry
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {addNewCustomer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
              <span className="mr-2">
                <PenBox />
              </span>
              Create New Customer
            </h3>
            <form
              onSubmit={handleSubmit(createCustomer)}
              className="space-y-4"
              encType="multipart/form-data"
            >
              <div className="">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Upload Image
                  </label>
                  <input
                    multiple
                    type="file"
                    className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                    required
                    {...register("images")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Enter Description
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                    required
                    {...register("description")}
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setAddNewCustomer(false)}
                    className="w-full bg-red-400 p-3 mt-3  rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-blue-400 p-3 mt-3 ml-2 rounded-xl"
                  >
                    Create Entry
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {showTeamForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
              <span className="mr-2">
                <PenBox />
              </span>
              Create New Team Entry
            </h3>
            <form
              onSubmit={handleSubmit(createTeam)}
              className="space-y-4"
              encType="multipart/form-data"
            >
              <div className="">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Upload Profile Image
                  </label>
                  <input
                    multiple
                    type="file"
                    className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                    required
                    {...register("images")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Add Role
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                    required
                    {...register("role")}
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => updateShowTeam(false)}
                    className="w-full bg-red-400 p-3 mt-3  rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-blue-400 p-3 mt-3 ml-2 rounded-xl"
                  >
                    Create Entry
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Bar Modal */}
      {productBar && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-4xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <h1 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
              <span className="mr-2">🛍️</span>
              Product Features
            </h1>
            <form
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              onSubmit={handleSubmit(handleProducts)}
              encType="multipart/form-data"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Upload Image
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                    type="file"
                    multiple
                    {...register("images")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Product Description
                  </label>
                  <textarea
                    placeholder="Enter Product Description..."
                    className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-gray-700 text-gray-100"
                    rows="3"
                    {...register("description")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Product Price
                  </label>
                  <input
                    {...register("price")}
                    type="text"
                    placeholder="Enter Product Price..."
                    className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    ID
                  </label>
                  <input
                    type="text"
                    value="1"
                    readOnly
                    className="w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-700 text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    name=""
                    id=""
                    {...register("category")}
                    className="outline-none w-full px-4 py-3 border border-gray-700  bg-gray-700 text-gray-400"
                  >
                    <option>-- SELECT CATEGORY --</option>
                    {categories.map((data) => (
                      <option value={data.id} className="text-white blur-2xl">
                        {data.id}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Product Features
                  </label>
                  <input
                    {...register("features")}
                    type="text"
                    placeholder="Enter Product Features..."
                    className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Product Style
                  </label>
                  <input
                    {...register("style")}
                    type="text"
                    placeholder="Enter Product Style..."
                    className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Product Quantity
                  </label>
                  <input
                    {...register("quantity")}
                    type="number"
                    placeholder="Enter Quantity..."
                    className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                  />
                </div>
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => setProductBar(false)}
                    className="flex-1 bg-gray-700 text-gray-300 py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-400 text-white py-3 rounded-xl hover:cursor-pointer transition-all font-medium"
                  >
                    Save Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Showcase Modal */}
      {showcase && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h1 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
            
              Showcase Item
            </h1>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(handleShow)}
              encType="multipart/form-data"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ID
                </label>
                <input
                  type="text"
                  value="1"
                  readOnly
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-700 text-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload Image
                </label>
                <input
                  multiple
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                  type="file"
                  {...register("images")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Enter Description..."
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-gray-700 text-gray-100"
                  rows="3"
                  {...register("description")}
                />
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => setShowCase(false)}
                    className=" flex-1 bg-gray-700 text-gray-300 py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="hover:cursor-pointer flex-1 bg- from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mission Modal */}
      {showMission && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h1 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
              <span className="mr-2">
                <PenBox />
              </span>
              Mission Section
            </h1>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(handleMission)}
              encType="mutipart/form-data"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload Image
                </label>
                <input
                  multiple
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                  type="file"
                  {...register("images")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Choose your title
                </label>
                <textarea
                  placeholder="Enter any title..."
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-gray-700 text-gray-100"
                  rows="4"
                  {...register("title")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mission Statement
                </label>
                <textarea
                  placeholder="Enter Mission Statement..."
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-gray-700 text-gray-100"
                  rows="4"
                  {...register("description")}
                />
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowMission(false)}
                  className="flex-1 bg-gray-700 text-gray-300 py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button className="flex-1 bg- from-green-600 to-emerald-700 text-white py-3 rounded-xl hover:from-green-700 hover:to-emerald-800 transition-all font-medium">
                  Save Mission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Values Modal */}
      {showValues && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h1 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
              <span className="mr-2">💎</span>
              Values Section
            </h1>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(handleValues)}
              encType="multipart/form-data"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload Image
                </label>
                <input
                  multiple
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                  type="file"
                  {...register("images")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Core Values
                </label>
                <textarea
                  placeholder="Enter Core Values..."
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-gray-700 text-gray-100"
                  rows="4"
                  {...register("description")}
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowValues(false)}
                  className="flex-1 bg-gray-700 text-gray-300 py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 hover:cursor-pointer bg-blue-400 text-white py-3 rounded-xl hover:from-purple-700 hover:to-pink-800 transition-all font-medium"
                >
                  Save Values
                </button>
              </div>
            </form>
            <div className="flex space-x-3 mt-6"></div>
          </div>
        </div>
      )}

      {/* Internship Modal */}
      {showInternship && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
            <h1 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
              <span className="mr-2">🎓</span>
              Internship Section
            </h1>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(handleInternship)}
              encType="multipart/form-data"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload Icon
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                  type="file"
                  {...register("icon")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Internship Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                  placeholder="Enter Internship Title..."
                  {...register("title")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Internship Description
                </label>
                <textarea
                  placeholder="Enter Internship Description..."
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-gray-700 text-gray-100"
                  rows="3"
                  {...register("description")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Requirements
                </label>
                <textarea
                  placeholder="Enter Requirements..."
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-gray-700 text-gray-100"
                  rows="3"
                  {...register("requirement")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                  placeholder="e.g., 3-6 months"
                  {...register("duration")}
                />
              </div>
              <button
                onClick={() => setShowInternship(false)}
                className="flex-1 w-1/2 bg-gray-700 text-gray-300 py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
              <button className="flex-1 w-1/2 bg- from-orange-600 to-red-700 text-white py-3 rounded-xl hover:from-orange-700 hover:to-red-800 transition-all font-medium">
                Save Internship
              </button>
            </form>
            <div className="flex space-x-3 mt-6"></div>
          </div>
        </div>
      )}

      {/* Related Products Modal */}
      {relatedProducts && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h1 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
              <span className="mr-2">🔗</span>
              Related Products
            </h1>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload Image
                </label>
                <input
                  type="file"
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Product Name..."
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Product Price
                </label>
                <input
                  type="number"
                  placeholder="Enter Product Price..."
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-700 text-gray-100"
                />
              </div>
            </form>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setRelatedProducts(false)}
                className="flex-1 bg-gray-700 text-gray-300 py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
              <button className="flex-1 bg- from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedEntry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="text-center mb-6">
              <div className=" rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="" alt="" />
                <LucideMessageCircleWarning />
                <p />
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-2">
                Confirm Delete
              </h3>
              <p className="text-gray-300">
                Are you sure you want to delete the analytics entry for{" "}
                <span className="font-semibold">{selectedEntry.date}</span>?
                This action cannot be undone.
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedEntry(null);
                }}
                className="flex-1 bg-gray-700 text-gray-300 py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedEntry.id)}
                className="flex-1 bg- from-red-500 to-red-600 text-white py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
