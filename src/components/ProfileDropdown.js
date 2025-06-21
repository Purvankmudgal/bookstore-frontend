export default function ProfileDropdown({ onLogout, openProfile }) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
      <button
        onClick={openProfile}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        View Profile
      </button>
      <button
        onClick={onLogout}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  );
}
