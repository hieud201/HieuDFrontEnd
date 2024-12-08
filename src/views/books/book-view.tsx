'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import { Box, Pagination } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSession } from 'next-auth/react';
import './styles/App3.css';
import { Book } from 'types/book';
import BookDisplay from './components/bookDisplay';

const BookViewPage: React.FC = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const isbn13 = searchParams.get('isbn13');

  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const booksPerPage = 4;

  // Fetch all books initially
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const limit = 100;
        const offset = 0;
        const response = await fetch(`http://localhost:4000/retrieve/retrieveBooks?limit=${limit}&offset=${offset}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.token?.accessToken}`
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

    if (session) {
      fetchBooks();
    }
  }, [session]);

  // Fetch specific book details if ISBN is provided
  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!isbn13) {
        setSelectedBook(null);
        return;
      }

      try {
        const response = await fetch(`http://localhost:4000/retrieve/retrieveISBN?ISBN=${isbn13}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.token?.accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }

        const data = await response.json();
        if (!data || !data.books || data.books.length === 0) {
          throw new Error('No book found with the provided ISBN');
        }

        setSelectedBook(data.books[0]);
      } catch (err) {
        console.error('Error fetching book details:', err);
        setError('Failed to load book details');
      }
    };

    if (session && isbn13) {
      fetchBookDetails();
    }
  }, [isbn13, session]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(books.length / booksPerPage);

  // Loading state
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" />
        <span className="ms-2">Loading...</span>
      </div>
    );
  }

  // Error handling
  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <Container>
      {/* Selected Book Details */}
      {selectedBook && (
        <Row className="mt-4 mb-4">
          <Col md={4}>
            <img src={selectedBook.icons.large} alt={selectedBook.title} width="100%" height="auto" className="img-fluid" />
          </Col>
          <Col md={8}>
            <Card className="book-details-card shadow-sm">
              <Card.Body>
                <Card.Title className="text-primary mb-4">
                  <h1>{selectedBook.title}</h1>
                </Card.Title>
                <Card.Subtitle className="text-muted mb-3">
                  <strong>Author:</strong> {selectedBook.author}
                </Card.Subtitle>

                <div className="book-details">
                  <p>
                    <strong>ISBN:</strong> {selectedBook.isbn13}
                  </p>
                  <p>
                    <strong>Publication Year:</strong> {selectedBook.publication}
                  </p>

                  <h3 className="mt-4 mb-3 text-success">Ratings</h3>
                  <p>
                    <strong>Average Rating:</strong> {selectedBook.ratings.average}
                  </p>
                  <p>
                    <strong>Total Ratings:</strong> {selectedBook.ratings.count}
                  </p>

                  <div className="rating-breakdown mt-3">
                    <p>⭐️⭐️⭐️⭐️⭐️: {selectedBook.ratings.rating_5}</p>
                    <p>⭐️⭐️⭐️⭐️: {selectedBook.ratings.rating_4}</p>
                    <p>⭐️⭐️⭐️: {selectedBook.ratings.rating_3}</p>
                    <p>⭐️⭐️: {selectedBook.ratings.rating_2}</p>
                    <p>⭐️: {selectedBook.ratings.rating_1}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* All Books Grid */}
      <div className={selectedBook ? 'mt-4' : ''}>
        <h2 className="mb-4">All Books</h2>
        <BookDisplay books={books} currentPage={currentPage} booksPerPage={booksPerPage} />
        <Box display="flex" justifyContent="center" sx={{ margin: '20px 0px' }}>
          <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
        </Box>
      </div>
    </Container>
  );
};

export default BookViewPage;
