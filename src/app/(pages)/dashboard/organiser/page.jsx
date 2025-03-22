'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Edit, Building } from 'lucide-react';

export default function OrganizerDashboard() {
  const router = useRouter();

  const handleSignOut = () => {
    // Add sign out logic here
    router.push('/'); // Redirect to home page after sign out
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-gray-900">Organizer Dashboard</h1>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Update Event Details Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center mb-4">
              <Edit className="h-6 w-6 text-blue-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Update Event Details</h2>
            </div>
            <p className="text-gray-500 mb-4">
              Modify your event information, including date, time, and description.
            </p>
            <button
              onClick={() => router.push('/organiser/update-event')}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update Details
            </button>
          </div>

          {/* Request Venue Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center mb-4">
              <Building className="h-6 w-6 text-green-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Request Venue</h2>
            </div>
            <p className="text-gray-500 mb-4">
              Submit a request for room booking and manage your venue requirements.
            </p>
            <button
              onClick={() => router.push('/organiser/request-venue')}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Request Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
