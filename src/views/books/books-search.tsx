'use client';

import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App3.css';
import BookDisplay from './components/bookDisplay';
import books from './mockData';
import { Box, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSession } from 'next-auth/react';

// Define a type for books if it's not already defined (this can be a more detailed type)
interface Book {
  book_id: number;
  isbn13: number;
  authors: string;
  original_publication_year: number;
  original_title: string;
  title: string;
  average_rating: number;
  ratings_count: number;
  ratings_1: number;
  ratings_2: number;
  ratings_3: number;
  ratings_4: number;
  ratings_5: number;
  image_url: string;
  small_image_url: string;
}

interface App3Props {
  books: Book[];
}

const App3: React.FC = () => {

  const [fetchedBooks, setFetchedBooks] = useState<Book[]>([]);
  const { data: session } = useSession();

  // Function to fetch books
  const handleBookFetch = async () => {
    try {
      const response = await fetch("http://localhost:4000/retrieve/retrieveBooks", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.token.accessToken}`
        }
      });
      const data = await response.json(); 
      console.log(data); 
      setFetchedBooks(data.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    handleBookFetch(); 
  }, []); 


  const booksPerPage = 4;
  const [currentPage, setCurrentPage] = useState<number>(1); // Explicitly typing state

  const totalPage = Math.ceil(books.length / booksPerPage);

  // Typing event and page parameters for the handlePageChange function
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <div className="website-header">
            <h1>BOOKHUB</h1>
            <div>
              <a href="/addbook" className="add-book-link">
                AddBook
              </a>
              <a href="/help" className="help-link">
                Help
              </a>
              <a href="/logout" className="log-out">
                Log Out
              </a>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card>
        <p>
          <SearchIcon />
          Search Book
        </p>
        <Card.Body>
          <div className="search-information">
            <p className="search-text">Author</p>
            <input className="search-input" type="text" placeholder="" />
          </div>

          <div className="search-information">
            <p className="search-text">ID</p>
            <input className="search-input" type="text" />
          </div>

          <div className="search-information">
            <p className="search-text">Title</p>
            <input className="search-input" type="text" />
          </div>

          <div className="search-information">
            <p className="search-text">ISBN</p>
            <input className="search-input" type="text" />
          </div>

          <button className="book-search-button">Book Search</button>
          <button className="reset-button">Reset</button>
        </Card.Body>
      </Card>

      <BookDisplay books={books} currentPage={currentPage} booksPerPage={booksPerPage} />

      <Box display="flex" justifyContent="center" sx={{ margin: '20px 0px' }}>
        <Pagination count={totalPage} page={currentPage} onChange={handlePageChange} color="primary" />
      </Box>
    </div>
  );
};

export default App3;
