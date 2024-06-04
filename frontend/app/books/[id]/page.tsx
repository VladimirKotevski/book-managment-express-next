'use client';

import { useEffect, useState } from 'react';
import BookForm from '../components/bookEditor';
import { useParams, useRouter  } from 'next/navigation';
import { CreateBookPayload } from '../../interfaces/createBookPayload.type';
import { useBooks } from '@/app/context/BooksContext';
import { updateBook } from '../../services/bookService'
import styles from './updateBook.module.scss';

const UpdateBook = () => {
    const { id } = useParams();
    const { push } = useRouter();
    const { findBookById, dispatch } = useBooks();
    const [initialValues, setInitialValues] = useState<CreateBookPayload | undefined>(undefined);
  
    useEffect(() => {
      if (id) {
        const foundBook = findBookById(id as string);
        if (foundBook) {
          const { title, description, numberOfPages } = foundBook;
          setInitialValues({ title, description, numberOfPages });
        }
      }
    }, [id, findBookById]);

  const handleSubmit = async (data: CreateBookPayload) => {
    const bookId = Array.isArray(id) ? id[0] : id;
    try {
      await updateBook(bookId, data)
      push('/books');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.updateBook}>
      <h1>Update Book</h1>
      <BookForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
};

export default UpdateBook;