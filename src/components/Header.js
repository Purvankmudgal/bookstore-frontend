import React, { useState, useRef, useEffect } from 'react';
import ProfileDropdown from './ProfileDropdown';

export default function Header({ onLogout }) {
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow flex justify-between items-center px-6 py-3">
      <div>
        {/* Notifications icon */}
        <button className="relative">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8a6 6 0 00-12 0v5H4l2 3h12l2-3h-2z"></path>
            <path d="M13.73 21a2 2 0 01-3.46 0"></path>
          </svg>
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
        </button>
      </div>

      <div className="relative" ref={profileRef}>
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">
            U
          </div>
          <span className="text-gray-700">Profile</span>
        </button>
        {showProfile && <ProfileDropdown onLogout={onLogout} />}
      </div>
    </header>
  );
}
