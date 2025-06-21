import React from 'react';

export default function ProfileDropdown({ onLogout }) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
      <button
        onClick={onLogout}
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
      >
        Logout
      </button>
    </div>
  );
}
