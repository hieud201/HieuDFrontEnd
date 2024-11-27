interface Book {
  book_id: number;
  isbn13: number;
  authors: string;
  original_publication_year: number;
  original_title: string;
  title: string;
  average_rating: number;
  ratings_count: number;
  image_url: string;
  small_image_url: string;
}

const books: Book[] = [
  {
    book_id: 1,
    isbn13: 9780439023480,
    authors: "Suzanne Collins",
    original_publication_year: 2008,
    original_title: "The Hunger Games",
    title: "The Hunger Games (The Hunger Games, #1)",
    average_rating: 4.34,
    ratings_count: 4780653,
    image_url: "https://images.gr-assets.com/books/1447303603m/2767052.jpg",
    small_image_url: "https://images.gr-assets.com/books/1447303603s/2767052.jpg"
  },
  {
    book_id: 2,
    isbn13: 9780439554930,
    authors: "J.K. Rowling, Mary GrandPré",
    original_publication_year: 1997,
    original_title: "Harry Potter and the Philosopher's Stone",
    title: "Harry Potter and the Sorcerer's Stone (Harry Potter, #1)",
    average_rating: 4.44,
    ratings_count: 4602479,
    image_url: "https://images.gr-assets.com/books/1474154022m/3.jpg",
    small_image_url: "https://images.gr-assets.com/books/1474154022s/3.jpg"
  },
  {
    book_id: 3,
    isbn13: 9780316015840,
    authors: "Stephenie Meyer",
    original_publication_year: 2005,
    original_title: "Twilight",
    title: "Twilight (Twilight, #1)",
    average_rating: 3.57,
    ratings_count: 3866839,
    image_url: "https://images.gr-assets.com/books/1361039443m/41865.jpg",
    small_image_url: "https://images.gr-assets.com/books/1361039443s/41865.jpg"
  },
  {
    book_id: 4,
    isbn13: 9780061120080,
    authors: "Harper Lee",
    original_publication_year: 1960,
    original_title: "To Kill a Mockingbird",
    title: "To Kill a Mockingbird",
    average_rating: 4.25,
    ratings_count: 3198671,
    image_url: "https://images.gr-assets.com/books/1361975680m/2657.jpg",
    small_image_url: "https://images.gr-assets.com/books/1361975680s/2657.jpg"
  },
  {
    book_id: 5,
    isbn13: 9780743273560,
    authors: "F. Scott Fitzgerald",
    original_publication_year: 1925,
    original_title: "The Great Gatsby",
    title: "The Great Gatsby",
    average_rating: 3.89,
    ratings_count: 2683664,
    image_url: "https://images.gr-assets.com/books/1490528560m/4671.jpg",
    small_image_url: "https://images.gr-assets.com/books/1490528560s/4671.jpg"
  },
  {
    book_id: 6,
    isbn13: 9780618260300,
    authors: "J.R.R. Tolkien",
    original_publication_year: 1954,
    original_title: "The Fellowship of the Ring",
    title: "The Fellowship of the Ring (The Lord of the Rings, #1)",
    average_rating: 4.38,
    ratings_count: 2439618,
    image_url: "https://images.gr-assets.com/books/1298411339m/34.jpg",
    small_image_url: "https://images.gr-assets.com/books/1298411339s/34.jpg"
  },
  {
    book_id: 7,
    isbn13: 9781408855898,
    authors: "J.K. Rowling",
    original_publication_year: 1998,
    original_title: "Harry Potter and the Chamber of Secrets",
    title: "Harry Potter and the Chamber of Secrets (Harry Potter, #2)",
    average_rating: 4.41,
    ratings_count: 2961543,
    image_url: "https://images.gr-assets.com/books/1474169725m/15881.jpg",
    small_image_url: "https://images.gr-assets.com/books/1474169725s/15881.jpg"
  },
  {
    book_id: 8,
    isbn13: 9780060883287,
    authors: "Khaled Hosseini",
    original_publication_year: 2003,
    original_title: "The Kite Runner",
    title: "The Kite Runner",
    average_rating: 4.3,
    ratings_count: 2302077,
    image_url: "https://images.gr-assets.com/books/1484565687m/77203.jpg",
    small_image_url: "https://images.gr-assets.com/books/1484565687s/77203.jpg"
  },
  {
    book_id: 9,
    isbn13: 9780451524935,
    authors: "George Orwell",
    original_publication_year: 1949,
    original_title: "Nineteen Eighty-Four",
    title: "1984",
    average_rating: 4.19,
    ratings_count: 3301866,
    image_url: "https://images.gr-assets.com/books/1348990566m/5470.jpg",
    small_image_url: "https://images.gr-assets.com/books/1348990566s/5470.jpg"
  },
  {
    book_id: 10,
    isbn13: 9780141439518,
    authors: "Jane Austen",
    original_publication_year: 1813,
    original_title: "Pride and Prejudice",
    title: "Pride and Prejudice",
    average_rating: 4.26,
    ratings_count: 2834584,
    image_url: "https://images.gr-assets.com/books/1320399351m/1885.jpg",
    small_image_url: "https://images.gr-assets.com/books/1320399351s/1885.jpg"
  },
  {
    book_id: 11,
    isbn13: 9780141439600,
    authors: "Charles Dickens",
    original_publication_year: 1861,
    original_title: "Great Expectations",
    title: "Great Expectations",
    average_rating: 3.77,
    ratings_count: 689771,
    image_url: "https://images.gr-assets.com/books/1406512312m/2623.jpg",
    small_image_url: "https://images.gr-assets.com/books/1406512312s/2623.jpg"
  },
  {
    book_id: 12,
    isbn13: 9780307277671,
    authors: "Gabriel García Márquez",
    original_publication_year: 1967,
    original_title: "Cien años de soledad",
    title: "One Hundred Years of Solitude",
    average_rating: 4.08,
    ratings_count: 697379,
    image_url: "https://images.gr-assets.com/books/1327881361m/320.jpg",
    small_image_url: "https://images.gr-assets.com/books/1327881361s/320.jpg"
  }
];

export default books;
