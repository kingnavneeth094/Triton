'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, Mail, Trash2 } from 'lucide-react';
import { useSession } from "next-auth/react";

export default function ViewCoordinators() {
  const { data: session } = useSession();
  const router = useRouter();
  const [coordinators, setCoordinators] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoordinators();
  }, []);

  const fetchCoordinators = async () => {
    try {
      const response = await fetch('/api/get-coordinators');
      const data = await response.json();
      if (response.ok) {
        setCoordinators(data.coordinators);
      } else {
        console.error('Failed to fetch coordinators:', data.error);
      }
    } catch (error) {
      console.error('Error fetching coordinators:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (coordinatorId) => {
    if (window.confirm('Are you sure you want to delete this coordinator?')) {
      try {
        const response = await fetch(`/api/delete-coordinator/${coordinatorId}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          // Remove the coordinator from the list
          setCoordinators(coordinators.filter(c => c._id !== coordinatorId));
        } else {
          const data = await response.json();
          alert(data.error || 'Failed to delete coordinator');
        }
      } catch (error) {
        console.error('Error deleting coordinator:', error);
        alert('Failed to delete coordinator');
      }
    }
  };

  const filteredCoordinators = coordinators.filter(coordinator =>
    coordinator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coordinator.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!session || session.user.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-red-600">Access Restricted</h1>
          <p className="text-center text-gray-600">This page is only accessible to administrators.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </button>
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search coordinators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Coordinators List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Coordinators</h2>
            
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : filteredCoordinators.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No coordinators found
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredCoordinators.map((coordinator) => (
                  <div
                    key={coordinator._id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {coordinator.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{coordinator.name}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="h-4 w-4 mr-1" />
                          {coordinator.email}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(coordinator._id)}
                      className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}