import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useSession } from 'next-auth/react';

interface BookFormData {
  ISBN13: string;
  Title: string;
  Authors?: string;
  Rating_Avg?: number;
  Rating_Count?: number;
  One_Star_Count?: number;
  Two_Star_Count?: number;
  Three_Star_Count?: number;
  Four_Star_Count?: number;
  Five_Star_Count?: number;
  Image_URL?: string;
  Image_Small_URL?: string;
  Publication_Year?: number;
}

const BookAddForm: React.FC = () => {
  const { data: session } = useSession();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const [formData, setFormData] = useState<BookFormData>({
    ISBN13: '',
    Title: '',
    Authors: '',
    Rating_Avg: undefined,
    Rating_Count: undefined,
    One_Star_Count: undefined,
    Two_Star_Count: undefined,
    Three_Star_Count: undefined,
    Four_Star_Count: undefined,
    Five_Star_Count: undefined,
    Image_URL: '',
    Image_Small_URL: '',
    Publication_Year: undefined //new Date().getFullYear()
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    setFormData({
      ISBN13: '',
      Title: '',
      Authors: '',
      Rating_Avg: undefined,
      Rating_Count: undefined,
      One_Star_Count: undefined,
      Two_Star_Count: undefined,
      Three_Star_Count: undefined,
      Four_Star_Count: undefined,
      Five_Star_Count: undefined,
      Image_URL: '',
      Image_Small_URL: '',
      Publication_Year: undefined
    });
  };

  const validateForm = () => {
    if (!formData.ISBN13 || !formData.Title) {
      setError('ISBN and Title are required fields');
      return false;
    }
    if (formData.ISBN13.length !== 13 || isNaN(Number(formData.ISBN13))) {
      setError('ISBN must be a 13-digit number');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:4000/create/addBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.token?.accessToken}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to add book');
      }

      setSuccess('Book added successfully!');
    } catch (error) {
      setError('Error adding book. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>ISBN13 *</Form.Label>
        <Form.Control
          placeholder="Enter a new 13-digit ISBN..."
          type="text"
          name="ISBN13"
          value={formData.ISBN13}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Title *</Form.Label>
        <Form.Control
          placeholder="Enter a new book's title..."
          type="text"
          name="Title"
          value={formData.Title}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Authors</Form.Label>
        <Form.Control
          placeholder="Enter a new book's comma-separated list of authors..."
          type="text"
          name="Authors"
          value={formData.Authors}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Rating Average</Form.Label>
        <Form.Control
          placeholder="Enter a new book's average rating..."
          type="number"
          name="Rating_Avg"
          value={formData.Rating_Avg ?? ''}
          onChange={handleInputChange}
          step="0.1"
          min="0"
          max="5"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Rating Count</Form.Label>
        <Form.Control
          placeholder="Enter a new book's rating count..."
          type="number"
          name="Rating_Count"
          value={formData.Rating_Count ?? ''}
          onChange={handleInputChange}
          min="0"
          required
        />
      </Form.Group>

      <div className="row">
        <Form.Group className="col mb-3">
          <Form.Label>1 Star Count</Form.Label>
          <Form.Control
            placeholder="Enter a new book's 1 star count..."
            type="number"
            name="One_Star_Count"
            value={formData.One_Star_Count ?? ''}
            onChange={handleInputChange}
            min="0"
            required
          />
        </Form.Group>

        <Form.Group className="col mb-3">
          <Form.Label>2 Star Count</Form.Label>
          <Form.Control
            placeholder="Enter a new book's 2 star count..."
            type="number"
            name="Two_Star_Count"
            value={formData.Two_Star_Count ?? ''}
            onChange={handleInputChange}
            min="0"
            required
          />
        </Form.Group>

        <Form.Group className="col mb-3">
          <Form.Label>3 Star Count</Form.Label>
          <Form.Control
            placeholder="Enter a new book's 3 star count..."
            type="number"
            name="Three_Star_Count"
            value={formData.Three_Star_Count ?? ''}
            onChange={handleInputChange}
            min="0"
            required
          />
        </Form.Group>

        <Form.Group className="col mb-3">
          <Form.Label>4 Star Count</Form.Label>
          <Form.Control
            placeholder="Enter a new book's 4 star count..."
            type="number"
            name="Four_Star_Count"
            value={formData.Four_Star_Count ?? ''}
            onChange={handleInputChange}
            min="0"
            required
          />
        </Form.Group>

        <Form.Group className="col mb-3">
          <Form.Label>5 Star Count</Form.Label>
          <Form.Control
            placeholder="Enter a new book's 5 star count..."
            type="number"
            name="Five_Star_Count"
            value={formData.Five_Star_Count ?? ''}
            onChange={handleInputChange}
            min="0"
            required
          />
        </Form.Group>
      </div>

      <Form.Group className="mb-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          placeholder="Enter a new book's image URL..."
          type="text"
          name="Image_URL"
          value={formData.Image_URL}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Small Image URL</Form.Label>
        <Form.Control
          placeholder="Enter a new book's small image URL..."
          type="text"
          name="Image_Small_URL"
          value={formData.Image_Small_URL}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Publication Year</Form.Label>
        <Form.Control
          placeholder="Enter a new book's publication year..."
          type="number"
          name="Publication_Year"
          value={formData.Publication_Year ?? ''}
          onChange={handleInputChange}
          min="1000"
          max={new Date().getFullYear()}
          required
        />
      </Form.Group>

      <div className="d-flex justify-content-between">
        <Button variant="primary" type="submit">
          Add Book
        </Button>
        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </Form>
  );
};

export default BookAddForm;
