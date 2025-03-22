'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BuildingsConfig() {
  const router = useRouter();
  const [numberOfBuildings, setNumberOfBuildings] = useState(1);
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    // Create array of building objects
    const newBuildings = Array.from({ length: numberOfBuildings }, (_, index) => ({
      id: index + 1,
      height: Math.floor(Math.random() * 100) + 100, // Random height between 100-200px
      color: `hsl(${Math.random() * 360}, 70%, 50%)`, // Random color
    }));
    setBuildings(newBuildings);
  }, [numberOfBuildings]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => router.back()}
              className="mr-4 inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Configure Buildings</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <label htmlFor="buildings" className="text-lg font-medium text-gray-900">
              Number of Buildings:
            </label>
            <input
              type="number"
              id="buildings"
              min="1"
              max="10"
              value={numberOfBuildings}
              onChange={(e) => setNumberOfBuildings(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
              className="block w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Buildings Display */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-end justify-center space-x-4 h-[400px]">
            {buildings.map((building) => (
              <div
                key={building.id}
                className="w-16 bg-gray-200 rounded-t-lg transition-all duration-500 ease-in-out"
                style={{
                  height: `${building.height}px`,
                  backgroundColor: building.color,
                }}
              >
                <div className="text-center text-white font-medium mt-2">
                  {building.id}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 