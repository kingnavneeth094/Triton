'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ChatWidget from '@/components/Chatbot';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const cards = document.querySelectorAll('.slide-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="fixed w-full top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-cyan-900/30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">
            TRITON
          </h1>
          <Link 
            href="/signin"
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-600 hover:to-teal-500 transition-all duration-300 shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] relative after:absolute after:inset-0 after:bg-gradient-to-r after:from-teal-500/20 after:to-cyan-400/20 after:rounded-lg after:blur-xl after:transition-all after:duration-300 after:hover:blur-2xl after:-z-10 border border-teal-500/50 hover:border-teal-400 ring-2 ring-teal-500/20 hover:ring-teal-400/40"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 to-cyan-900/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto relative">
          <h2 className="text-[8rem] font-bold text-center text-gray-900 opacity-10 absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none">
            EVENTS
          </h2>
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-cyan-200 to-yellow-200 bg-clip-text text-transparent">
              Capturing The Energy And Excitement Of College Events
            </h3>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mb-8">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-lg bg-gray-900/50 border border-white/20 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 transition-colors">
                Search
              </button>
            </div>

            <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-600 hover:to-teal-500 transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] relative after:absolute after:inset-0 after:bg-gradient-to-r after:from-teal-500/20 after:to-cyan-400/20 after:rounded-lg after:blur-xl after:transition-all after:duration-300 after:hover:blur-2xl after:-z-10 border border-teal-500/50 hover:border-teal-400 ring-2 ring-teal-500/20 hover:ring-teal-400/40">
              Explore Events
            </button>
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      <section className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-12 text-center">Past Events</h3>
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x">
            {[
              {
                title: "Tech Symposium 2024",
                participants: "500+ Participants",
                image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000&auto=format&fit=crop",
                description: "Annual showcase of cutting-edge technology",
                college: "BITS Pilani"
              },
              {
                title: "AI & ML Workshop",
                participants: "300+ Attendees",
                image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
                description: "Hands-on experience with latest AI tools",
                college: "BMSCE"
              },
              {
                title: "Cybersecurity Summit",
                participants: "400+ Security Experts",
                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
                description: "Advanced security protocols and practices",
                college: "IIT Bombay"
              },
              {
                title: "Cloud Computing Conference",
                participants: "450+ Cloud Professionals",
                image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop",
                description: "Latest trends in cloud infrastructure",
                college: "NITK"
              }
            ].map((event) => (
              <div key={event.title} className="min-w-[300px] bg-gray-900 p-6 rounded-xl snap-center border border-cyan-900/30 hover:border-cyan-500/50 transition-all duration-300 group">
                <div className="relative h-40 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-cyan-400 text-sm font-medium">{event.college}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-cyan-400 text-sm">{event.participants}</span>
                </div>
                <h4 className="font-semibold mb-2 text-lg">{event.title}</h4>
                <p className="text-gray-400 text-sm">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-12 text-center">Our Services</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Event Management', icon: '🎯' },
              { title: 'Resource Allocation', icon: '🔄' },
              { title: 'Venue Booking', icon: '🏛️' },
              { title: 'Event Registration', icon: '📝' }
            ].map((service) => (
              <div key={service.title} className="slide-card opacity-0 p-6 rounded-xl bg-gray-900/30 border border-cyan-900/30 hover:border-cyan-500/50 transition-all duration-300">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h4 className="font-semibold mb-2">{service.title}</h4>
                <p className="text-gray-400 text-sm">Streamlined and efficient service delivery</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-6">About Us</h3>
            <p className="text-gray-400 leading-relaxed">
              We are dedicated to revolutionizing how college events are managed and experienced. 
              Our platform brings together cutting-edge technology and user-friendly design to create 
              seamless event experiences for organizers and participants alike.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-cyan-900/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <p className="text-gray-400">support@triton.edu</p>
              <p className="text-gray-400">+1 (123) 456-7890</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-gray-400 hover:text-cyan-400 transition-colors">Help Center</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .slide-card {
          transform: translateY(50px);
          transition: all 0.8s ease-out;
        }
        
        .slide-card.slide-in {
          transform: translateY(0);
          opacity: 1;
        }
      `}</style>
      <ChatWidget/>
    </main>
  );
}