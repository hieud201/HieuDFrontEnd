'use client';

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


const BookAddPage: React.FC = () => {

  return (
    <>Hello World!</>
  );
};

export default BookAddPage;
