"use client";

import { useRouter } from "next/navigation";
import { LogOut, Edit, Eye } from "lucide-react";

const Venue = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-lg font-bold text-gray-700">Venue Manager</h1>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
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
          {/* Edit Layout Card */}
          <div
            onClick={() => router.push("/dashboard/venue/edit")}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200 border-2 border-gray-200"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Edit className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Edit Layout
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Modify venue layouts and configurations
                </p>
              </div>
            </div>
          </div>

          {/* View Layout Card */}
          <div
            onClick={() => router.push("/dashboard/venue/view")}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200 border-2 border-gray-200"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Eye className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  View Layout
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Preview and manage existing venue layouts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Venue;
