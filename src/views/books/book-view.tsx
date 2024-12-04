'use client';

import React, { useState, useEffect} from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, Container, Row, Col, Spinner } from 'react-bootstrap'; // Added Spinner for better loading indication
import { useSession } from 'next-auth/react';


interface Book {
  isbn13: string;
  author: string;
  publication: number;
  title: string;
  ratings: {
      average: number;
      count: number;
      rating_1: string;
      rating_2: string;
      rating_3: string;
      rating_4: string;
      rating_5: string;
  };
  icons: {
      large: string;
      small: string;
  };
}

const BookViewPage: React.FC = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const isbn13 = searchParams.get('isbn13');  // Now using title instead of isbn13
  
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!isbn13) return; // If title is missing, don't proceed

      try {
        // Adjusted to use title in the URL
        const response = await fetch(`http://localhost:4000/retrieve/retrieveISBN?ISBN=${isbn13}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.token?.accessToken}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }

        const data = await response.json();
        //console.log(data.books[0]);
        if (!data) {
          throw new Error('No book found with the provided title');
        }

        setBook(data.books[0]);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching book details:', err);
        setError('Failed to load book details');
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [isbn13]);

  // Loading state: Display a loading spinner
  if (isLoading) return (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner animation="border" />
      <span>Loading...</span>
    </div>
  );

  // Error handling: Show error message if any
  if (error) return <div className="text-center text-danger">{error}</div>;

  // No book found case
  if (!book) return <div>No book found with this title</div>;

  return (
    <Container>
      <Row className="mt-4">
        <Col md={4}>
          <img 
            src={book.icons.large} 
            alt={book.title} 
            className="img-fluid" 
          />
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title><h1>{book.title}</h1></Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Author: {book.author}</Card.Subtitle>
              
              <div className="book-details">
                <p><strong>ISBN:</strong> {book.isbn13}</p>
                <p><strong>Publication Year:</strong> {book.publication}</p>
                
                <h3>Ratings</h3>
                <p><strong>Average Rating:</strong> {book.ratings.average}</p>
                <p><strong>Total Ratings:</strong> {book.ratings.count}</p>
                
                <div className="rating-breakdown">
                  <p>5 Stars: {book.ratings.rating_5}</p>
                  <p>4 Stars: {book.ratings.rating_4}</p>
                  <p>3 Stars: {book.ratings.rating_3}</p>
                  <p>2 Stars: {book.ratings.rating_2}</p>
                  <p>1 Star: {book.ratings.rating_1}</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookViewPage;
