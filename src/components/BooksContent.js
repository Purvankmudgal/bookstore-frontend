import React, { useEffect, useState, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../context/AuthContext';

export default function BooksContent() {
  const [books, setBooks] = useState([]);
  const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await API.get('/books');
        setBooks(res.data);
      } catch (error) {
        if (error.response?.status === 401) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, [logout]);

  if (loading) return <p>Loading books...</p>;
  if (books.length === 0) return <p>No books found.</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Books List</h2>
      <ul className="space-y-2">
        {books.map(book => (
          <li
            key={book._id}
            className="border p-4 rounded shadow hover:shadow-md transition"
          >
            <p className="font-bold text-lg">{book.title}</p>
            <p className="text-gray-700">Author: {book.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
