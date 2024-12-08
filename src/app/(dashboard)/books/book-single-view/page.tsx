'use client';

import React, { useState, useEffect } from 'react';
import { Container, Alert, Card } from 'react-bootstrap';
import { CircularProgress } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Book } from '@/types/book';

export default function BookSingleViewPage() {
  const { data: session, status } = useSession();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const isbn13 = searchParams.get('isbn13');

  useEffect(() => {
    const fetchBook = async () => {
      if (status === 'loading') return;
      
      if (!session?.token?.accessToken) {
        setError('Please sign in to view book details');
        setIsLoading(false);
        return;
      }

      if (!isbn13) {
        setError('No book identifier provided');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/retrieve/retrieveBook/${isbn13}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.token.accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch book: ${response.statusText}`);
        }

        const data = await response.json();
        setBook(data.book);
      } catch (err) {
        console.error('Error fetching book:', err);
        setError('Failed to load book details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [session, status, isbn13]);

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

  if (!book) {
    return (
      <Container>
        <Alert variant="info" className="mt-4">
          Book not found.
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Card className="mt-4">
        <Card.Body>
          <div className="d-flex flex-column flex-md-row">
            <div className="book-image me-md-4 mb-4 mb-md-0">
              <img src={book.icons.large} alt={book.title} className="img-fluid" style={{ maxWidth: '300px' }} />
            </div>
            <div className="book-details">
              <Card.Title className="h2 mb-3">{book.title}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">By {book.author}</Card.Subtitle>
              <div className="book-info">
                <p><strong>ISBN-13:</strong> {book.isbn13}</p>
                <p><strong>Publication Year:</strong> {book.publication}</p>
                <p><strong>Publisher:</strong> {book.publisher}</p>
                <p><strong>Language:</strong> {book.language}</p>
                {book.summary && (
                  <div className="mt-4">
                    <h5>Summary</h5>
                    <p>{book.summary}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}