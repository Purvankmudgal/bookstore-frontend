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
        console.log('Fetched books:', res.data); // Debug API response
        setBooks(res.data);
      } catch (error) {
        if (error.response?.status === 401) {
          logout();
        } else {
          console.error('Failed to fetch books:', error);
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
      <Grid container spacing={3} justifyContent="center">
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book._id} display="flex" justifyContent="center">
            <Card
              sx={{
                width: 320,
                height: 480,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 2,
                borderRadius: 2,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 8,
                },
                overflow: 'hidden',
                backgroundColor: '#fff',
              }}
            >
              <CardMedia
                component="img"
                image={
                  book.coverImageUrl && book.coverImageUrl.trim() !== ''
                    ? book.coverImageUrl
                    : 'https://via.placeholder.com/320x200?text=No+Image'
                }
                alt={book.title}
                sx={{
                  height: 200,
                  objectFit: 'cover',
                  width: '100%',
                  flexShrink: 0,
                }}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  title={book.title}
                >
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap title={`Author: ${book.author}`}>
                  Author: {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap title={`Genre: ${book.genre || 'N/A'}`}>
                  Genre: {book.genre || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap title={`Published: ${book.publishedYear || 'N/A'}`}>
                  Published: {book.publishedYear || 'N/A'}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ mt: 1, fontWeight: 'bold' }}
                >
                  ₹{book.price ? book.price.toFixed(2) : '0.00'}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap title={`Stock: ${book.stock || 0}`}>
                  In stock: {book.stock || 0}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  mt={1}
                  sx={{
                    flexGrow: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                  }}
                  title={book.description}
                >
                  {book.description || 'No description available.'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
