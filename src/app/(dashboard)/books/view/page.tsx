'use client';

import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { Box, Pagination, CircularProgress } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSession } from 'next-auth/react';
import BookDisplay from '@/views/books/components/bookDisplay';
import { Book } from '@/types/book';

export default function BookViewPage() {
  const { data: session, status } = useSession();
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const booksPerPage = 4;

  useEffect(() => {
    const fetchBooks = async () => {
      if (status === 'loading') return;
      
      if (!session?.token?.accessToken) {
        setError('Please sign in to view books');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const limit = 100;
        const offset = 0;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/retrieve/retrieveBooks?limit=${limit}&offset=${offset}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.token.accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch books: ${response.statusText}`);
        }

        const data = await response.json();
        const validBooks = data.books.filter((book: Book) => book.isbn13.length >= 13);
        setBooks(validBooks);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to load books. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [session, status]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(books.length / booksPerPage);

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!books.length) {
    return (
      <Container>
        <Alert variant="info" className="mt-4">
          No books found. Try adding some books first.
        </Alert>
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
}