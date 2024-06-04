'use client';

import { useRouter } from 'next/navigation';
import BookForm from '../components/bookEditor';
import { createBook } from '../../services/bookService';
import { CreateBookPayload } from '../../interfaces/createBookPayload.type';
import styles from './createBook.module.scss';

const CreateBook = () => {
  const { push } = useRouter();

  const handleSubmit = async (data: CreateBookPayload) => {

    try {
        await createBook(data);
        push('/books');
      } catch (error) {
        console.error(error);
    }
  };

  return (
    <div className={styles.createBook}>
      <h1>Add New Book</h1>
      <BookForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateBook;