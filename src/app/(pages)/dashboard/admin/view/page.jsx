'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function ViewLayouts() {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Get rooms from localStorage
    const storedRooms = localStorage.getItem('roomLayouts');
    if (storedRooms) {
      setRooms(JSON.parse(storedRooms));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => router.push('/dashboard/admin/')}
              className="mr-4 inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            <h1 className="text-xl font-semibold text-gray-900">View Layouts</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Legend */}
        <div className="mb-6 flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Occupied</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Available</span>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="relative aspect-square bg-gray-100 rounded-lg p-4 hover:bg-gray-200 transition-colors duration-200 flex flex-col items-center justify-center"
            >
              {/* Status Indicator */}
              <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full"></div>
              
              {/* Room Name */}
              <span className="text-lg font-medium text-gray-900 text-center">{room}</span>
              
              {/* Room Number */}
              <span className="text-sm text-gray-500 mt-1">Room {index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 