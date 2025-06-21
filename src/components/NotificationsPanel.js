export default function NotificationsPanel() {
  const notifications = [
    'New message from John',
    'Your order has shipped',
    'Reminder: Meeting at 3 PM',
  ];

  return (
    <div className="absolute right-0 mt-2 w-72 max-h-64 overflow-auto bg-white border rounded shadow-lg z-10">
      <div className="p-4 border-b font-semibold">Notifications</div>
      <ul>
        {notifications.map((note, i) => (
          <li
            key={i}
            className="px-4 py-2 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer"
          >
            {note}
          </li>
        ))}
        {notifications.length === 0 && (
          <li className="px-4 py-2 text-gray-500">No notifications</li>
        )}
      </ul>
    </div>
  );
}
