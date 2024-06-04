import Link from 'next/link';
import { fetchBooks } from '../services/bookService';
import { Book } from '../types/book.type';
import BooksTable from './components/booksTable';
import styles from './book.module.scss';

const fetchBooksData = async (): Promise<Book[]> => {
  return fetchBooks();
};

const BooksPage = async () => {
  const books:  Book[] = await fetchBooksData();

  return (
    <div className={styles.booksPage}>
      <div className={styles.heading}>
      <h1>Books List</h1>
      <Link legacyBehavior href="/books/create">
        <a>Add New Book</a>
      </Link>
      </div>
      <BooksTable books={books} />
    </div>
  );
};

export default BooksPage;