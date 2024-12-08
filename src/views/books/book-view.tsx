'use client';

import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { Box, Pagination } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSession } from 'next-auth/react';
import './styles/App3.css';
import { Book } from 'types/book';
import BookDisplay from './components/bookDisplay';

const BookViewPage: React.FC = () => {
  const { data: session } = useSession();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const booksPerPage = 4;

  // Fetch all books initially
  useEffect(() => {
    const fetchBooks = async () => {
      if (!session?.token?.accessToken) return;

      try {
        const limit = 100;
        const offset = 0;
        const response = await fetch(`http://localhost:4000/retrieve/retrieveBooks?limit=${limit}&offset=${offset}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.token.accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const data = await response.json();
        const validBooks = data.books.filter((book: Book) => book.isbn13.length >= 13);
        setBooks(validBooks);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to load books');
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [session]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(books.length / booksPerPage);

  // Loading state
  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
        <Spinner animation="border" role="status" className="me-2" />
        <span>Loading books...</span>
      </Container>
    );
  }

  // Error handling
  if (error) {
    return (
      <Container className="text-center text-danger" style={{ marginTop: '2rem' }}>
        <h3>{error}</h3>
      </Container>
    );
  }

  return (
    <Container>
      <BookDisplay books={books} currentPage={currentPage} booksPerPage={booksPerPage} />
      <Box display="flex" justifyContent="center" sx={{ margin: '20px 0px' }}>
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
      </Box>
    </Container>
  );
};

export default BookViewPage;