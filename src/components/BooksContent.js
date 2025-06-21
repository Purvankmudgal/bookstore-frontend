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
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {books.map(book => (
          <li key={book._id} className="border p-4 rounded shadow hover:shadow-md transition bg-white">
            {book.coverImageUrl && (
              <img src={book.coverImageUrl} alt={book.title} className="w-full h-48 object-cover mb-4 rounded" />
            )}
            <h3 className="text-xl font-bold mb-1">{book.title}</h3>
            <p className="text-gray-700 mb-1">Author: {book.author}</p>
            {book.genre && <p className="text-gray-600 mb-1">Genre: {book.genre}</p>}
            {book.publishedYear && <p className="text-gray-600 mb-1">Published: {book.publishedYear}</p>}
            <p className="text-gray-800 font-semibold mb-1">₹{book.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mb-2">In stock: {book.stock}</p>
            {book.description && <p className="text-gray-700 text-sm">{book.description.slice(0, 100)}...</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
