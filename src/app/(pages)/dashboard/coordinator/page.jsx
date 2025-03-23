"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Calendar,
  PlusCircle,
  BarChart3,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash,
  Search,
} from "lucide-react";
import { useSession, signOut, signIn } from "next-auth/react";

export default function CoordinatorDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const [pendingEvents, setPendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvedEvents, setApprovedEvents] = useState([]);

  useEffect(() => {
    if (session) {
      fetchPendingEvents();
      fetchApprovedEvents();
    } else {
      // Load dummy data for development
      setDummyData();
      setLoading(false);
    }
  }, [session]);

  const setDummyData = () => {
    // Dummy pending events
    setPendingEvents([
      {
        _id: "pe1",
        title: "Annual Tech Conference",
        description: "A conference showcasing the latest technology trends and innovations in the industry.",
        organizer: { name: "John Doe", email: "john.doe@example.com" },
        startDate: new Date("2023-12-15T09:00:00"),
        endDate: new Date("2023-12-15T17:00:00"),
        RoomLocation: "Main Auditorium",
        status: "pending"
      },
      {
        _id: "pe2",
        title: "Career Fair",
        description: "Connect students with potential employers and explore career opportunities.",
        organizer: { name: "Jane Smith", email: "jane.smith@example.com" },
        startDate: new Date("2023-12-20T10:00:00"),
        endDate: new Date("2023-12-20T15:00:00"),
        RoomLocation: "Exhibition Hall",
        status: "pending"
      },
      {
        _id: "pe3",
        title: "Workshop on AI",
        description: "Learn about artificial intelligence and its applications in various fields.",
        organizer: { name: "Robert Johnson", email: "robert.j@example.com" },
        startDate: new Date("2023-12-22T13:00:00"),
        endDate: new Date("2023-12-22T16:00:00"),
        RoomLocation: "Room 101",
        status: "pending"
      }
    ]);

    // Dummy approved events
    setApprovedEvents([
      {
        _id: "ae1",
        title: "Alumni Networking Event",
        description: "Connect with alumni and build professional relationships for future opportunities.",
        organizer: { name: "Michael Brown", email: "michael.b@example.com" },
        startDate: new Date("2023-12-10T18:00:00"),
        endDate: new Date("2023-12-10T21:00:00"),
        RoomLocation: "Grand Hall",
        status: "approved"
      },
      {
        _id: "ae2",
        title: "Research Symposium",
        description: "Showcase research projects and findings from various departments.",
        organizer: { name: "Sarah Wilson", email: "sarah.w@example.com" },
        startDate: new Date("2023-12-12T09:00:00"),
        endDate: new Date("2023-12-12T16:00:00"),
        RoomLocation: "Science Building",
        status: "approved"
      },
      {
        _id: "ae3",
        title: "Cultural Festival",
        description: "Celebrate diversity with performances, food, and activities from different cultures.",
        organizer: { name: "David Lee", email: "david.l@example.com" },
        startDate: new Date("2023-12-18T11:00:00"),
        endDate: new Date("2023-12-18T20:00:00"),
        RoomLocation: "Campus Quad",
        status: "approved"
      }
    ]);
  };

  const fetchPendingEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/get-event-request");
      const data = await response.json();

      if (response.ok) {
        // Filter events with pending status
        const pendingEventsList = data.events.filter(
          (event) => event.status === "pending"
        );
        setPendingEvents(pendingEventsList);
      } else {
        console.error("Failed to fetch events:", data.error);
        // Load dummy data if API fails
        setDummyData();
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      // Load dummy data if API fails
      setDummyData();
    } finally {
      setLoading(false);
    }
  };

  const fetchApprovedEvents = async () => {
    try {
      const response = await fetch("/api/get-admin-pending-events");
      const data = await response.json();

      if (response.ok) {
        setApprovedEvents(data.events);
      } else {
        console.error("Failed to fetch approved events:", data.error);
        // Use dummy approved events if API fails
        setApprovedEvents([
          {
            _id: "ae1",
            title: "Alumni Networking Event",
            description: "Connect with alumni and build professional relationships for future opportunities.",
            organizer: { name: "Michael Brown", email: "michael.b@example.com" },
            startDate: new Date("2023-12-10T18:00:00"),
            endDate: new Date("2023-12-10T21:00:00"),
            RoomLocation: "Grand Hall",
            status: "approved"
          },
          {
            _id: "ae2",
            title: "Research Symposium",
            description: "Showcase research projects and findings from various departments.",
            organizer: { name: "Sarah Wilson", email: "sarah.w@example.com" },
            startDate: new Date("2023-12-12T09:00:00"),
            endDate: new Date("2023-12-12T16:00:00"),
            RoomLocation: "Science Building",
            status: "approved"
          }
        ]);
      }
    } catch (error) {
      console.error("Error fetching approved events:", error);
      // Use dummy approved events if API fails
      setApprovedEvents([
        {
          _id: "ae1",
          title: "Alumni Networking Event",
          description: "Connect with alumni and build professional relationships for future opportunities.",
          organizer: { name: "Michael Brown", email: "michael.b@example.com" },
          startDate: new Date("2023-12-10T18:00:00"),
          endDate: new Date("2023-12-10T21:00:00"),
          RoomLocation: "Grand Hall",
          status: "approved"
        },
        {
          _id: "ae2",
          title: "Research Symposium",
          description: "Showcase research projects and findings from various departments.",
          organizer: { name: "Sarah Wilson", email: "sarah.w@example.com" },
          startDate: new Date("2023-12-12T09:00:00"),
          endDate: new Date("2023-12-12T16:00:00"),
          RoomLocation: "Science Building",
          status: "approved"
        }
      ]);
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/sign-in" });
  };

  const handleOptionClick = (option) => {
    switch (option) {
      case "add-events":
        router.push("/coordinator/add-events");
        break;
      case "analytics":
        router.push("/coordinator/analytics");
        break;
      default:
        break;
    }
  };

  const handleSendForAdminApproval = async (eventId) => {
    try {
      const response = await fetch(`/api/approve-event?eventId=${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "pending_admin" }),
      });

      if (response.ok) {
        // Refresh the events list
        fetchPendingEvents();
        alert("Event sent for admin approval!");
      } else {
        const data = await response.json();
        console.error("Failed to send for admin approval:", data.error);
        alert("Failed to send for admin approval. Please try again.");
      }
    } catch (error) {
      console.error("Error sending for admin approval:", error);
      alert("Error sending for admin approval. Please try again.");
    }
  };

  const handleRejectEvent = async (eventId) => {
    try {
      const response = await fetch(`/api/approve-event?eventId=${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "rejected" }),
      });

      if (response.ok) {
        // Refresh the events list
        fetchPendingEvents();
        alert("Event rejected successfully!");
      } else {
        const data = await response.json();
        console.error("Failed to reject event:", data.error);
        alert("Failed to reject event. Please try again.");
      }
    } catch (error) {
      console.error("Error rejecting event:", error);
      alert("Error rejecting event. Please try again.");
    }
  };

  const handleViewEvent = (eventId) => {
    router.push(`/coordinator/event-details?eventId=${eventId}`);
  };

  if (session && session.user && session.user.role !== "coordinator") {
    // If not a coordinator, show restricted message
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-red-600">
            Access Restricted
          </h1>
          <p className="text-center text-gray-600">
            This dashboard is only available to Coordinator. Please sign in with
            a coordinator account.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => signIn()}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
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
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
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
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              <LogOut className="mr-2 h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Coordinator Dashboard
        </h1>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {/* Add Events Card */}
          <div
            onClick={() => handleOptionClick("add-events")}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <PlusCircle className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Add Events
                </h3>
                <p className="mt-1 text-sm text-gray-500">Create new events</p>
              </div>
            </div>
          </div>

          {/* View Analytics Card */}
          <div
            onClick={() => handleOptionClick("analytics")}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart3 className="h-8 w-8 text-purple-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  View Analytics
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Check event statistics and insights
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Events Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-8">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Pending Events
            </h2>
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
              {pendingEvents.length} pending
            </span>
          </div>

          {loading ? (
            <div className="text-center py-4">
              <p>Loading events...</p>
            </div>
          ) : pendingEvents.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-gray-500">No pending events found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Organizer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingEvents.map((event) => (
                    <tr key={event._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {event.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {event.description.substring(0, 50)}...
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {event.organizer?.name || "Unknown"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {event.organizer?.email || "No email"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(event.startDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(event.startDate).toLocaleTimeString()} -{" "}
                          {new Date(event.endDate).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.RoomLocation || "Not specified"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          {event.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewEvent(event._id)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Details">
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleSendForAdminApproval(event._id)}
                            className="text-green-600 hover:text-green-900"
                            title="Send for Admin Approval">
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleRejectEvent(event._id)}
                            className="text-red-600 hover:text-red-900"
                            title="Reject Event">
                            <XCircle className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Approved Events Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-8">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Approved Events
            </h2>
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              {approvedEvents?.length || 0} approved
            </span>
          </div>

          {loading ? (
            <div className="text-center py-4">
              <p>Loading events...</p>
            </div>
          ) : approvedEvents?.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-gray-500">No approved events found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Organizer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {approvedEvents?.map((event) => (
                    <tr key={event._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {event.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {event.description.substring(0, 50)}...
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {event.organizer?.name || "Unknown"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {event.organizer?.email || "No email"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(event.startDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(event.startDate).toLocaleTimeString()} -{" "}
                          {new Date(event.endDate).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.RoomLocation || "Not specified"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Approved
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewEvent(event._id)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Details">
                            <Eye className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
