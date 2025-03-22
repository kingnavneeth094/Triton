'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function ConfigureLayout() {
  const router = useRouter();
  const [roomInput, setRoomInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Split the input by commas and trim whitespace
    const rooms = roomInput
      .split(',')
      .map(room => room.trim())
      .filter(room => room.length > 0);
    
    if (rooms.length === 0) {
      setError('Please enter at least one room name');
      return;
    }
    
    // Sort rooms alphabetically
    rooms.sort((a, b) => a.localeCompare(b));
    
    // Store rooms in localStorage
    localStorage.setItem('roomLayouts', JSON.stringify(rooms));
    
    // Redirect to view layouts page
    router.push('/dashboard/admin/view');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => router.push('/dashboard/admin')}
              className="mr-4 inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Configure Layout</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-2">Room Configuration</h2>
                <p className="text-sm text-gray-500 mb-4">
                  Enter room names separated by commas (e.g., "Room 1, Room 2, Room 3")
                </p>
                <textarea
                  value={roomInput}
                  onChange={(e) => setRoomInput(e.target.value)}
                  placeholder="Enter room names separated by commas..."
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-32 resize-none"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Save Layout
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 