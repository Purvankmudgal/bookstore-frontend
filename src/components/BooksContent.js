import React, { useEffect, useState, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../context/AuthContext';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';

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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (books.length === 0) return <Typography>No books found.</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Books List
      </Typography>
      <Grid container spacing={3}>
        {books.map(book => (
          <Grid item xs={12} sm={6} md={4} key={book._id}>
            <Card>
              {book.coverImageUrl && (
                <CardMedia
                  component="img"
                  height="200"
                  image={book.coverImageUrl}
                  alt={book.title}
                />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>{book.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Author: {book.author}
                </Typography>
                {book.genre && (
                  <Typography variant="body2" color="text.secondary">
                    Genre: {book.genre}
                  </Typography>
                )}
                {book.publishedYear && (
                  <Typography variant="body2" color="text.secondary">
                    Published: {book.publishedYear}
                  </Typography>
                )}
                <Typography variant="body2" color="text.primary">
                  ₹{book.price?.toFixed(2) || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  In stock: {book.stock || 0}
                </Typography>
                {book.description && (
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {book.description.slice(0, 100)}...
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
