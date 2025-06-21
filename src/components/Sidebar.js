import React from 'react';

export default function Sidebar({ menuItems, selected, onSelect }) {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      <div className="text-2xl font-bold p-4 border-b border-gray-700">Bookstore</div>
      <nav className="flex-grow mt-4">
        {menuItems.map(item => (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            className={`block w-full text-left px-4 py-3 hover:bg-gray-700 focus:outline-none ${
              selected === item.key ? 'bg-gray-700' : ''
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
