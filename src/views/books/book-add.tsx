'use client';

import React from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App3.css';
import BookAddForm from './components/bookAddForm';

const BookAdd: React.FC = () => {
  return (
    <div>
      <Card>
        <Card.Body>
          <BookAddForm />
        </Card.Body>
      </Card>
    </div>
  );
};

export default BookAdd;
