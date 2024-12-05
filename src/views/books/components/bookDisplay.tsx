import { Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { Book } from 'types/book';

interface BookDisplayProps {
  books: Book[];
  currentPage: number;
  booksPerPage: number;
}

const BookDisplay: React.FC<BookDisplayProps> = ({ books, currentPage, booksPerPage }) => {
  const router = useRouter();

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const pageData = books.slice(indexOfFirstBook, indexOfLastBook);

  // Handle book click navigation
  const handleBookClick = (isbn13: string) => {
    // Navigate to the book view page using title
    router.push(`/books/view?isbn13=${isbn13}`);
  };

  return (
    <div>
      <Row>
        {pageData.map((book) => (
          <Col
            md={6}
            key={book.isbn13}
            onClick={() => handleBookClick(book.isbn13)}
            style={{ cursor: 'pointer' }} // Add pointer cursor to indicate clickability
          >
            <Card className="single-book-style">
              <Card.Body>
                <Card.Title>
                  <strong>{book.title}</strong>{' '}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Author: {book.author}</Card.Subtitle>
                <Card.Text>ISBN: {book.isbn13}</Card.Text>
                <Card.Text>Year: {book.publication}</Card.Text>
                <img src={book.icons.large} alt={book.title} className="img-fluid" />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BookDisplay;
