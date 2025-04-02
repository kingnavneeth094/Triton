"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  LogOut,
  UserPlus,
  Users,
  Settings,
  Layout,
  Calendar,
  X,
} from "lucide-react";
import { useSession, signOut, signIn } from "next-auth/react";
import axios from "axios";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFestForm, setShowFestForm] = useState(false);
  const [showCoordinatorForm, setShowCoordinatorForm] = useState(false);
  const [showVenueManagerForm, setShowVenueManagerForm] = useState(false);
  const [venueManagerData, setVenueManagerData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [festData, setFestData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [coordinatorData, setCoordinatorData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const handleVenueManagerInputChange = (e) => {
    const { name, value } = e.target;
    setVenueManagerData({ ...venueManagerData, [name]: value });
  };
  const handleSubmitVenueManager = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/add-venue_manager",
        venueManagerData
      );

      if (response.status === 201) {
        alert("Venue Manager created successfully!");
        setVenueManagerData({ name: "", email: "", password: "" });
        setShowVenueManagerForm(false);
      }
    } catch (error) {
      alert(error.response?.data?.error || "Failed to create venue manager");
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    router.push("/");
  };

  const handleOptionClick = (option) => {
    switch (option) {
      case "create-coordinators":
        setShowCoordinatorForm(true);
        break;
      case "view-coordinators":
        router.push("/dashboard/admin/view");
        break;
      case "add-fest":
        router.push("/dashboard/admin/fest")
        break;
      default:
        break;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFestData({ ...festData, [name]: value });
  };

  const handleCoordinatorInputChange = (e) => {
    const { name, value } = e.target;
    setCoordinatorData({ ...coordinatorData, [name]: value });
  };

  const handleSubmitFest = (e) => {
    e.preventDefault();
    // Add your logic to save the fest data
    console.log("Submitting fest data:", festData);

    // Clear the form and close it
    setFestData({
      name: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setShowFestForm(false);

    // Show success message or redirect
    // For now, we'll just close the form
  };

  const handleSubmitCoordinator = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    try {
      const response = await axios.post(
        "/api/add-coordinator",
        coordinatorData
      );

      if (response.status === 201) {
        setFormSuccess("Coordinator created successfully!");
        // Clear the form
        setCoordinatorData({
          name: "",
          email: "",
          password: "",
        });

        // Close the form after a delay
        setTimeout(() => {
          setShowCoordinatorForm(false);
          setFormSuccess("");
        }, 2000);
      }
    } catch (error) {
      setFormError(
        error.response?.data?.error || "Failed to create coordinator"
      );
      console.error("Error creating coordinator:", error);
    }
  };

  if (session && session.user && session.user.role !== "admin") {
    // If not an organizer, show restricted message
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-red-600">
            Access Restricted
          </h1>
          <p className="text-center text-gray-600">
            This dashboard is only available to organizers. Please sign in with
            an organizer account.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => signIn()}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <p>No user found</p>
        <button
          onClick={() => signIn()}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create Coordinators Card */}
          <div
            onClick={() => handleOptionClick("create-coordinators")}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200 border-2 border-gray-200"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserPlus className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Create Event Coordinators
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Add new event coordinators to the system
                </p>
              </div>
            </div>
          </div>

          {/* View Coordinators Card */}
          <div
            onClick={() => handleOptionClick("view-coordinators")}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200 border-2 border-gray-200"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  View Coordinators
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Manage and view existing coordinators
                </p>
              </div>
            </div>
          </div>

          {/* Add Fest Card */}
          <div
            onClick={() => handleOptionClick("add-fest")}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200 border-2 border-gray-200"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-teal-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Register College and Add Fest
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Create and configure new fests for your college
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Venue Manager Card */}
      <div
        onClick={() => setShowVenueManagerForm(true)}
        className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200 border-2 border-gray-200"
      >
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <UserPlus className="h-8 w-8 text-purple-500" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">
              Create Venue Manager
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Add a new venue manager to the system
            </p>
          </div>
        </div>
      </div>

      {/* Add Coordinator Modal */}
      {showCoordinatorForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md mx-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Add New Coordinator
              </h2>
              <button
                onClick={() => setShowCoordinatorForm(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {formError}
              </div>
            )}

            {formSuccess && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                {formSuccess}
              </div>
            )}

            <form onSubmit={handleSubmitCoordinator}>
              <div className="space-y-4">
                {/* Coordinator Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter coordinator's full name"
                    value={coordinatorData.name}
                    onChange={handleCoordinatorInputChange}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter coordinator's email"
                    value={coordinatorData.email}
                    onChange={handleCoordinatorInputChange}
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter a secure password"
                    value={coordinatorData.password}
                    onChange={handleCoordinatorInputChange}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowCoordinatorForm(false)}
                  className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Coordinator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <p>{session.user.role}</p>
      {showVenueManagerForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md mx-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Add Venue Manager
              </h2>
              <button
                onClick={() => setShowVenueManagerForm(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmitVenueManager}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                    placeholder="Enter name"
                    value={venueManagerData.name}
                    onChange={handleVenueManagerInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                    placeholder="Enter email"
                    value={venueManagerData.email}
                    onChange={handleVenueManagerInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                    placeholder="Enter password"
                    value={venueManagerData.password}
                    onChange={handleVenueManagerInputChange}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowVenueManagerForm(false)}
                  className="mr-3 px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Create Venue Manager
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
