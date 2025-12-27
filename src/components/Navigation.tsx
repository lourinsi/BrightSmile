// src/components/Navigation.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    // The nav element will handle its internal layout using Tailwind classes.
    // flex: enables flexbox
    // items-center: vertically centers items
    // justify-between: spaces items evenly with space at ends
    // w-full: takes full width of its parent
    <nav className="flex items-center justify-between w-full">
      {/* Navigation links container with Tailwind flex utilities and gap */}
      <div className="flex gap-6 flex-grow justify-start"> {/* Increased gap for better spacing */}
        <Link
          to="/"
          className={`flex items-center gap-1 text-gray-600 font-medium py-2 px-3 rounded-md transition-colors duration-150 ease-in-out hover:bg-gray-100
            ${location.pathname === '/' ? 'text-blue-600 font-bold border-b-2 border-blue-600 hover:bg-transparent' : ''}`}
        >
          {/* Tailwind text size and color for the icon */}
          <span className="text-xl text-gray-500">👤</span>
          Dashboard
        </Link>
        <Link
          to="/patients"
          className={`flex items-center gap-1 text-gray-600 font-medium py-2 px-3 rounded-md transition-colors duration-150 ease-in-out hover:bg-gray-100
            ${location.pathname.startsWith('/patients') ? 'text-blue-600 font-bold border-b-2 border-blue-600 hover:bg-transparent' : ''}`}
        >
          <span className="text-xl text-gray-500">👥</span>
          Patients
        </Link>
        <Link
          to="/calendar"
          className={`flex items-center gap-1 text-gray-600 font-medium py-2 px-3 rounded-md transition-colors duration-150 ease-in-out hover:bg-gray-100
            ${location.pathname === '/calendar' ? 'text-blue-600 font-bold border-b-2 border-blue-600 hover:bg-transparent' : ''}`}
        >
          <span className="text-xl text-gray-500">📅</span>
          Calendar
        </Link>
        <Link
          to="/finance"
          className={`flex items-center gap-1 text-gray-600 font-medium py-2 px-3 rounded-md transition-colors duration-150 ease-in-out hover:bg-gray-100
            ${location.pathname === '/finance' ? 'text-blue-600 font-bold border-b-2 border-blue-600 hover:bg-transparent' : ''}`}
        >
          <span className="text-xl text-gray-500">📊</span>
          Finance
        </Link>
      </div>
      {/* Profile icon div is now explicitly included and styled with Tailwind classes */}
      <div className="mr-4"> {/* Margin-right to separate from navigation links */}
        <img
          src="/profile-pic.jpg"
          alt="Dr. Smith"
          className="w-9 h-9 rounded-full object-cover" // Tailwind classes for size, shape, and image fitting
        />
      </div>
    </nav>
  );
};

export default Navigation;
