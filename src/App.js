import React, { useEffect, useState } from 'react';

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '' });
  const [loading, setLoading] = useState(false);

  const backendURL = 'https://bookstore-backend-htmk.onrender.com'; // 🔁 Replace with your actual backend URL

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${backendURL}/api/books`);
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.author) return alert('Both fields are required');

    try {
      const res = await fetch(`${backendURL}/api/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ title: '', author: '' });
        fetchBooks(); // refresh list
      } else {
        alert('Failed to add book');
      }
    } catch (err) {
      alert('Error submitting book');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">📚 Online Book Store</h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-4 md:p-6 mb-6 flex flex-col md:flex-row gap-4"
        >
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Book Title"
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Author"
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Add Book
          </button>
        </form>

        {/* Book List */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h2 className="text-xl font-semibold mb-4">📖 Book List</h2>
          {loading ? (
            <p>Loading books...</p>
          ) : books.length === 0 ? (
            <p>No books found.</p>
          ) : (
            <ul className="space-y-3">
              {books.map((book) => (
                <li
                  key={book._id}
                  className="border-b pb-2 flex flex-col md:flex-row justify-between"
                >
                  <span className="font-medium">{book.title}</span>
                  <span className="text-gray-600">{book.author}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
