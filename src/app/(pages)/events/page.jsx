"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const cards = document.querySelectorAll(".event-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  // Dummy data for 8 events with real internet images
  const events = [
    {
      id: 1,
      title: "Rust Web Development Workshop",
      date: "2023-10-15",
      time: "10:00 AM - 2:00 PM",
      location: "Tech Hub, Building A",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      description:
        "Learn the fundamentals of web development using Rust and frameworks like Rocket and Actix. This workshop is perfect for beginners looking to start their journey in Rust web development.",
      organizer: "Rust Community",
      price: "Free",
      participants: "200+ Registered",
    },
    {
      id: 2,
      title: "Rust for AI Conference 2023",
      date: "2023-10-20",
      time: "9:00 AM - 5:00 PM",
      location: "Innovation Center",
      image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c",
      description:
        "Join us for the annual Rust AI Conference where industry experts share insights on using Rust for machine learning and artificial intelligence applications.",
      organizer: "Rust AI Research Group",
      price: "$50",
      participants: "350+ Attendees",
    },
    {
      id: 3,
      title: "Rust Startup Networking Night",
      date: "2023-10-25",
      time: "6:00 PM - 9:00 PM",
      location: "Business Lounge",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b",
      description:
        "Connect with fellow entrepreneurs, investors, and mentors using Rust in their tech stack in this networking event designed to help startups grow.",
      organizer: "Rust Startup Incubator",
      price: "$10",
      participants: "150+ Entrepreneurs",
    },
    {
      id: 4,
      title: "Rust for Data Science Bootcamp",
      date: "2023-11-05",
      time: "10:00 AM - 4:00 PM",
      location: "Learning Center",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      description:
        "Intensive one-day bootcamp covering data analysis, visualization, and machine learning fundamentals with Rust and its ecosystem.",
      organizer: "Rust Data Science Academy",
      price: "$75",
      participants: "120+ Data Enthusiasts",
    },
    {
      id: 5,
      title: "Building UIs with Rust Workshop",
      date: "2023-11-10",
      time: "1:00 PM - 5:00 PM",
      location: "Design Studio",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c",
      description:
        "Learn to create user interfaces with Rust using frameworks like Iced, Druid, and integrations with web technologies.",
      organizer: "Rust Design Community",
      price: "$25",
      participants: "180+ Designers",
    },
    {
      id: 6,
      title: "Rust Blockchain Technology Summit",
      date: "2023-11-15",
      time: "9:00 AM - 6:00 PM",
      location: "Conference Center",
      image: "https://images.unsplash.com/photo-1639762681057-408e52192e55",
      description:
        "Explore the potential of Rust in blockchain development with keynote speakers and panel discussions on performance and security.",
      organizer: "Rust Blockchain Association",
      price: "$100",
      participants: "250+ Blockchain Experts",
    },
    {
      id: 7,
      title: "Rust Mobile Development Workshop",
      date: "2023-11-20",
      time: "10:00 AM - 3:00 PM",
      location: "Tech Campus",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
      description:
        "Hands-on workshop on building mobile applications using Rust with bindings to native platforms and cross-platform solutions.",
      organizer: "Rust Mobile Developers Group",
      price: "$40",
      participants: "160+ Developers",
    },
    {
      id: 8,
      title: "Rust for Cybersecurity Conference",
      date: "2023-11-25",
      time: "9:00 AM - 5:00 PM",
      location: "Security Institute",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
      description:
        "Learn about using Rust for secure systems programming, threat modeling, and best practices in cybersecurity from industry experts.",
      organizer: "Rust Cybersecurity Alliance",
      price: "$85",
      participants: "300+ Security Professionals",
    },
  ];

  const openEventDetails = (event) => {
    setSelectedEvent(event);
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  const handleRegister = (eventId) => {
    alert(`Registered for event #${eventId}`);
    closeEventDetails();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already handled by the filter function, this just prevents form submission
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="relative pt-20 pb-10 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 to-cyan-900/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto relative">
          <h2 className="text-[6rem] font-bold text-center text-gray-900 opacity-10 absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none">
            EVENTS
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-300 via-cyan-200 to-yellow-200 bg-clip-text text-transparent">
            Upcoming Events
          </h1>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="relative max-w-xl mx-auto mb-12">
            <div className="flex">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-l-lg bg-gray-900/50 border border-white/20 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
              />
              <button
                type="submit"
                className="px-6 py-4 rounded-r-lg bg-cyan-600 hover:bg-cyan-500 transition-colors text-white font-medium">
                Search
              </button>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-[100px] top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </form>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="event-card opacity-0 bg-gray-900 rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 border border-cyan-900/30 hover:border-cyan-500/50 group"
                  onClick={() => openEventDetails(event)}>
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300 group-hover:scale-110"
                      priority
                      unoptimized={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-cyan-400 text-sm font-medium">
                        {event.organizer}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-cyan-400 text-sm">
                        {event.participants}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">
                      {event.title}
                    </h2>
                    <p className="text-gray-400 mb-2">
                      {event.date} • {event.time}
                    </p>
                    <p className="text-gray-300 mb-2">{event.location}</p>
                    <p className="text-teal-400 font-medium">{event.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-10">
                <p className="text-xl text-gray-400">
                  No events found matching your search.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-cyan-900/50">
            <div className="relative h-64 w-full">
              <Image
                src={selectedEvent.image}
                alt={selectedEvent.title}
                fill
                style={{ objectFit: "cover" }}
                unoptimized={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-cyan-100 bg-clip-text text-transparent">
                {selectedEvent.title}
              </h2>
              <div className="mb-6 space-y-2">
                <p className="text-gray-300">
                  <span className="font-semibold text-cyan-400">Date:</span>{" "}
                  {selectedEvent.date}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-cyan-400">Time:</span>{" "}
                  {selectedEvent.time}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-cyan-400">Location:</span>{" "}
                  {selectedEvent.location}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-cyan-400">
                    Organizer:
                  </span>{" "}
                  {selectedEvent.organizer}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-cyan-400">Price:</span>{" "}
                  {selectedEvent.price}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-cyan-400">
                    Participants:
                  </span>{" "}
                  {selectedEvent.participants}
                </p>
              </div>
              <p className="text-gray-300 mb-8">{selectedEvent.description}</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeEventDetails}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 border border-gray-700 transition-colors">
                  Close
                </button>
                <button
                  onClick={() => handleRegister(selectedEvent.id)}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-600 hover:to-teal-500 transition-all duration-300 text-white border border-teal-500/50 hover:border-teal-400">
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .event-card {
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }

        .event-card.fade-in {
          transform: translateY(0);
          opacity: 1;
        }
      `}</style>
    </main>
  );
};

export default EventsPage;
