'use client';

import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App3.css';
import BookDisplay from './components/bookDisplay';
import { Box, Pagination } from '@mui/material';
import { useSession } from 'next-auth/react';
import { Book } from 'types/book';

interface SearchCriteria {
  isbn: string;
  author: string;
  title: string;
  rating: string;
  year: string;
}

const App3: React.FC = () => {
  const booksPerPage = 4;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetchedBooks, setFetchedBooks] = useState<Book[]>([]);
  const { data: session } = useSession();

  // Unified search state
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    isbn: '',
    author: '',
    title: '',
    rating: '',
    year: ''
  });

  // Fetch initial books
  useEffect(() => {
    const fetchInitialBooks = async () => {
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

        const books = data.books.filter((book: Book) => book.isbn13.length >= 13);

        setFetchedBooks(books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    if (session) {
      fetchInitialBooks();
    }
  }, [session, searchCriteria]);

  // Unified search handler
  const handleSearch = async () => {
    if (!session) return;

    try {
      let endpoint = 'http://localhost:4000/retrieve/';
      let queryParam = '';

      if (searchCriteria.isbn) {
        endpoint += 'retrieveISBN';
        queryParam = `ISBN=${searchCriteria.isbn}`;
      } else if (searchCriteria.author) {
        endpoint += 'retrieveAuthor';
        queryParam = `author=${searchCriteria.author}`;
      } else if (searchCriteria.title) {
        endpoint += 'retrieveTitle';
        queryParam = `title=${searchCriteria.title}`;
      } else if (searchCriteria.rating) {
        endpoint += 'retrieveRating';
        queryParam = `minRating=${parseFloat(searchCriteria.rating) - 0.05}&maxRating=${parseFloat(searchCriteria.rating) + 0.05}`;
      } else if (searchCriteria.year) {
        endpoint += 'retrieveYear';
        queryParam = `startYear=${searchCriteria.year}&endYear=${searchCriteria.year}`;
      } else {
        // If no search criteria, fetch all books
        return;
      }

      const response = await fetch(`${endpoint}?${queryParam}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token.accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setFetchedBooks(data.books);
      setCurrentPage(1);
    } catch (error) {
      console.error('Search error:', error);
      // Optional: Add user-friendly error handling
    }
  };

  // Handle input changes
  const handleInputChange = (field: keyof SearchCriteria, value: string) => {
    // Clear other fields when one is being typed
    const updatedCriteria = {
      isbn: '',
      author: '',
      title: '',
      rating: '',
      year: ''
    };
    updatedCriteria[field] = value;

    setSearchCriteria(updatedCriteria);
  };

  // Reset search
  const handleReset = () => {
    setSearchCriteria({
      isbn: '',
      author: '',
      title: '',
      rating: '',
      year: ''
    });
  };

  const totalPage = Math.ceil(fetchedBooks.length / booksPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <div className="search-information">
            <p className="search-text">ISBN</p>
            <input
              placeholder="Enter a 13-digit ISBN..."
              className="search-input"
              type="text"
              value={searchCriteria.isbn}
              onChange={(e) => handleInputChange('isbn', e.target.value)}
              disabled={searchCriteria.isbn === '' && Object.values(searchCriteria).some((val, idx) => idx !== 0 && val !== '')}
            />
          </div>

          <div className="search-information">
            <p className="search-text">Author</p>
            <input
              placeholder="Enter a book's author..."
              className="search-input"
              type="text"
              value={searchCriteria.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              disabled={searchCriteria.author === '' && Object.values(searchCriteria).some((val, idx) => idx !== 1 && val !== '')}
            />
          </div>

          <div className="search-information">
            <p className="search-text">Title</p>
            <input
              placeholder="Enter a book's title..."
              className="search-input"
              type="text"
              value={searchCriteria.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              disabled={searchCriteria.title === '' && Object.values(searchCriteria).some((val, idx) => idx !== 2 && val !== '')}
            />
          </div>

          <div className="search-information">
            <p className="search-text">Rating</p>
            <input
              placeholder="Enter a book's average rating..."
              className="search-input"
              type="text"
              value={searchCriteria.rating}
              onChange={(e) => handleInputChange('rating', e.target.value)}
              disabled={searchCriteria.rating === '' && Object.values(searchCriteria).some((val, idx) => idx !== 3 && val !== '')}
            />
          </div>

          <div className="search-information">
            <p className="search-text">Year</p>
            <input
              placeholder="Enter a book's publication year..."
              className="search-input"
              type="text"
              value={searchCriteria.year}
              onChange={(e) => handleInputChange('year', e.target.value)}
              disabled={searchCriteria.year === '' && Object.values(searchCriteria).some((val, idx) => idx !== 4 && val !== '')}
            />
          </div>

          <button className="book-search-button" onClick={handleSearch}>
            Book Search
          </button>
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </Card.Body>
      </Card>

      <BookDisplay books={fetchedBooks} currentPage={currentPage} booksPerPage={booksPerPage} />

      <Box display="flex" justifyContent="center" sx={{ margin: '20px 0px' }}>
        <Pagination count={totalPage} page={currentPage} onChange={handlePageChange} color="primary" />
      </Box>
    </div>
  );
};

export default App3;
