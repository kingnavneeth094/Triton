'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Calendar, PlusCircle, Trash2, CheckCircle, XCircle, BarChart3 } from 'lucide-react';

export default function CoordinatorDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    // Add your logout logic here
    router.push('/sign-in');
  };

  const handleOptionClick = (option) => {
    switch (option) {
      case 'view-events':
        router.push('/coordinator/view-events');
        break;
      case 'add-events':
        router.push('/coordinator/add-events');
        break;
      case 'delete-events':
        router.push('/coordinator/delete-events');
        break;
      case 'approve-events':
        router.push('/coordinator/approve-events');
        break;
      case 'analytics':
        router.push('/coordinator/analytics');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
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
              className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Coordinator Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* View Events Card */}
          <div
            onClick={() => handleOptionClick('view-events')}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">View Events</h3>
                <p className="mt-1 text-sm text-gray-500">Browse and manage all events</p>
              </div>
            </div>
          </div>

          {/* Add Events Card */}
          <div
            onClick={() => handleOptionClick('add-events')}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <PlusCircle className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Add Events</h3>
                <p className="mt-1 text-sm text-gray-500">Create new events</p>
              </div>
            </div>
          </div>

          {/* Delete Events Card */}
          <div
            onClick={() => handleOptionClick('delete-events')}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Trash2 className="h-8 w-8 text-red-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Delete Events</h3>
                <p className="mt-1 text-sm text-gray-500">Remove existing events</p>
              </div>
            </div>
          </div>

          {/* Approve/Reject Events Card */}
          <div
            onClick={() => handleOptionClick('approve-events')}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Approve/Reject Events</h3>
                <p className="mt-1 text-sm text-gray-500">Review and manage event requests</p>
              </div>
            </div>
          </div>

          {/* View Analytics Card */}
          <div
            onClick={() => handleOptionClick('analytics')}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart3 className="h-8 w-8 text-purple-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">View Analytics</h3>
                <p className="mt-1 text-sm text-gray-500">Check event statistics and insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
