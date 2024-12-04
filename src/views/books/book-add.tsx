'use client';

import React from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App3.css';
import BookAddForm from './components/bookAddForm';
import { useSession } from 'next-auth/react';
import BookIcon from '@mui/icons-material/Book';

const BookAdd: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div>
      <Card>
        <Card.Body>
          <div className="website-header">
            <h1>BOOKHUB</h1>
            <div>
              <a href="/books" className="search-book-link">Search Books</a>
              <a href="/help" className="help-link">Help</a>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card>
        <p><BookIcon /> Add New Book</p>
        <Card.Body>
          <BookAddForm />
        </Card.Body>
      </Card>
    </div>
  );
};

export default BookAdd;