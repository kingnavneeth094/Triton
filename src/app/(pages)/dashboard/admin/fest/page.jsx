"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const [college, setCollege] = useState(null);
  const [fest, setFest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    collegeName: "",
    festName: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    fee: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/get-college-fest");
        
        if (res.data.college) setCollege(res.data.college);
        if (res.data.fest) setFest(res.data.fest);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/add-college-fest", formData);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  const hasData = college && fest;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        {hasData ? (
          <>
            <h2 className="text-xl font-bold text-gray-800">College Information</h2>
            <p className="text-gray-600">Name: {college.name}</p>
            <p className="text-gray-600">Location: {college.location}</p>

            <h2 className="mt-4 text-xl font-bold text-gray-800">Fest Information</h2>
            <p className="text-gray-600">Name: {fest.name}</p>
            <p className="text-gray-600">Start Date: {fest.startDate}</p>
            <p className="text-gray-600">End Date: {fest.endDate}</p>

            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Edit Info
            </button>
          </>
        ) : (
          <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Add Info
          </button>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add College & Fest Info</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input type="text" name="collegeName" placeholder="College Name" className="border p-2 rounded" onChange={handleInputChange} required />
              <input type="text" name="festName" placeholder="Fest Name" className="border p-2 rounded" onChange={handleInputChange} required />
              <input type="text" name="location" placeholder="Location" className="border p-2 rounded" onChange={handleInputChange} required />
              <input type="date" name="startDate" className="border p-2 rounded" onChange={handleInputChange} required />
              <input type="date" name="endDate" className="border p-2 rounded" onChange={handleInputChange} required />
              <textarea name="description" placeholder="Fest Description" className="border p-2 rounded" onChange={handleInputChange} required />
              <input type="number" name="fee" placeholder="Fest Fee (Optional)" className="border p-2 rounded" onChange={handleInputChange} />
              <div className="flex gap-2 mt-4">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
