'use client';

import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Box, Pagination } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSession } from 'next-auth/react';
import BookDisplay from '../../../../views/books/components/bookDisplay';
import { Book } from 'types/book';

export default function BookViewPage() {
  const { data: session } = useSession();
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const booksPerPage = 4;

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
      } catch (err) {
        console.error('Error fetching books:', err);
      }
    };

    fetchBooks();
  }, [session]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <Container>
      <BookDisplay books={books} currentPage={currentPage} booksPerPage={booksPerPage} />
      <Box display="flex" justifyContent="center" sx={{ margin: '20px 0px' }}>
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
      </Box>
    </Container>
  );
}