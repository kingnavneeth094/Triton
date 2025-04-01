"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Users, Loader, AlertTriangle } from "lucide-react";

export default function ViewCoordinators() {
  const [coordinators, setCoordinators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoordinators = async () => {
      try {
        const response = await axios.get("/api/view-coordinators");
        setCoordinators(response.data);
      } catch (err) {
        setError("Failed to load coordinators");
      } finally {
        setLoading(false);
      }
    };
    fetchCoordinators();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Users className="mr-2" /> Event Coordinators
        </h2>

        {loading && (
          <div className="flex justify-center items-center py-4">
            <Loader className="animate-spin text-blue-600 h-6 w-6" />
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mt-4 flex items-center">
            <AlertTriangle className="mr-2" /> {error}
          </div>
        )}

        {!loading && !error && coordinators.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No coordinators found.</p>
        )}

        <ul className="mt-4 space-y-4">
          {coordinators.map((coordinator) => (
            <li
              key={coordinator.id}
              className="p-4 bg-gray-100 rounded-lg shadow-sm flex justify-between"
            >
              <div>
                <p className="text-lg font-semibold text-gray-700">
                  {coordinator.name}
                </p>
                <p className="text-sm text-gray-500">{coordinator.email}</p>
              </div>
              <span className="text-sm text-blue-600 font-medium">Coordinator</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
