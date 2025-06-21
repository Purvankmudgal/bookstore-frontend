import React, { useState, useRef, useEffect } from 'react';
import NotificationsPanel from './NotificationsPanel';
import ProfileDropdown from './ProfileDropdown';

export default function Header({ onLogout, onOpenProfile }) {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const profileRef = useRef();
  const notificationsRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current && !profileRef.current.contains(event.target) &&
        notificationsRef.current && !notificationsRef.current.contains(event.target)
      ) {
        setShowProfile(false);
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow flex justify-end items-center px-6 py-3 space-x-4 relative">

      {/* Notifications Button */}
      <div ref={notificationsRef} className="relative">
        <button
          onClick={() => {
            setShowNotifications(prev => !prev);
            setShowProfile(false);
          }}
          className="relative focus:outline-none"
          aria-label="Notifications"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8a6 6 0 00-12 0v5H4l2 3h12l2-3h-2z" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
        </button>

        {showNotifications && <NotificationsPanel />}
      </div>

      {/* Profile Button */}
      <div ref={profileRef} className="relative">
        <button
          onClick={() => {
            setShowProfile(prev => !prev);
            setShowNotifications(false);
          }}
          className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold focus:outline-none"
          aria-label="Profile"
        >
          U
        </button>

        {showProfile && (
          <ProfileDropdown
            onLogout={onLogout}
            openProfile={() => {
              onOpenProfile();
              setShowProfile(false);
            }}
          />
        )}
      </div>
    </header>
  );
}
