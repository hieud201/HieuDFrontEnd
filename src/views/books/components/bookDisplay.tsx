import { Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Book {
  book_id: number;
  isbn13: number;
  authors: string;
  original_publication_year: number;
  original_title: string;
  title: string;
  image_url: string;
}

interface BookDisplayProps {
  books: Book[];
  currentPage: number;
  booksPerPage: number;
}

const BookDisplay: React.FC<BookDisplayProps> = ({ books, currentPage, booksPerPage }) => {
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const pageData = books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div>
      <Row>
        {pageData.map((book) => (
          <Col md={6} key={book.book_id}>
            <Card className="single-book-style">
              <Card.Body>
                <Card.Title><strong>{book.original_title}</strong> </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Author: {book.authors}</Card.Subtitle>
                <Card.Text>ISBN: {book.isbn13}</Card.Text>
                <Card.Text>Year: {book.original_publication_year}</Card.Text>
                <img src={book.image_url} alt={book.title} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default BookDisplay;