import React, { useState, useContext } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import BooksContent from './BooksContent';
import ProfileContent from './ProfileContent';
import { AuthContext } from '../context/AuthContext';

const MENU_ITEMS = [
  { key: 'books', label: 'Books' },
  { key: 'profile', label: 'Profile' },
];

export default function Dashboard() {
  const [selectedMenu, setSelectedMenu] = useState('books');
  const { logout } = useContext(AuthContext);

  function renderContent() {
    switch (selectedMenu) {
      case 'books':
        return <BooksContent />;
      case 'profile':
        return <ProfileContent />;
      default:
        return <div>Select an option</div>;
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        menuItems={MENU_ITEMS}
        selected={selectedMenu}
        onSelect={setSelectedMenu}
      />
      <div className="flex flex-col flex-grow">
        <Header onLogout={logout} />
        <main className="p-6 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
}
