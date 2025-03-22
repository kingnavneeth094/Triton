'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, LogOut, UserPlus, Users, Settings, Layout } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    // Add your logout logic here
    router.push('/login');
  };

  const handleOptionClick = (option) => {
    switch (option) {
      case 'create-coordinators':
        router.push('/admin/create-coordinators');
        break;
      case 'view-coordinators':
        router.push('/admin/view-coordinators');
        break;
      case 'configure-layout':
        router.push('/admin/configure');
        break;
      case 'view-layouts':
        router.push('/admin/view');
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
            onClick={() => handleOptionClick('create-coordinators')}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserPlus className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Create Coordinators</h3>
                <p className="mt-1 text-sm text-gray-500">Add new coordinators to the system</p>
              </div>
            </div>
          </div>

          {/* View Coordinators Card */}
          <div
            onClick={() => handleOptionClick('view-coordinators')}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">View Coordinators</h3>
                <p className="mt-1 text-sm text-gray-500">Manage and view existing coordinators</p>
              </div>
            </div>
          </div>

          {/* Configure Layout Card */}
          <div
            onClick={() => handleOptionClick('configure-layout')}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Settings className="h-8 w-8 text-purple-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Configure Layout</h3>
                <p className="mt-1 text-sm text-gray-500">Set up and manage room layouts</p>
              </div>
            </div>
          </div>

          {/* View Layouts Card */}
          <div
            onClick={() => handleOptionClick('view-layouts')}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Layout className="h-8 w-8 text-orange-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">View Layouts</h3>
                <p className="mt-1 text-sm text-gray-500">View and manage room layouts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
