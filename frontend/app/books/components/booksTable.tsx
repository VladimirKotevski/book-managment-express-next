"use client";

import React, { useState, FC, useEffect } from 'react';
import { Book } from '../../types/book.type';
import TableComponent from '../../components/Table/Table';
import DeleteDialog from '../../components/Dialog/DeleteDialog';
import { deleteBook } from '@/app/services/bookService';
import { useBooks } from '../../context/BooksContext';

interface BooksTableProps {
  books: Book[];
}

const BooksTable: FC<BooksTableProps> = ({ books }) => {
  const [bookData, setBookData] = useState<Book[]>(books);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { dispatch } = useBooks();

  useEffect(() => {
    dispatch({ type: 'SET_BOOKS', payload: books });
  }, [dispatch, books]);

  const columns = [
    { label: 'Title', accessor: 'title' as keyof Book },
    { label: 'Description', accessor: 'description' as keyof Book },
    { label: 'Number of Pages', accessor: 'numberOfPages' as keyof Book }
  ];

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id);
      setBookData(books.filter(book => book._id !== id));
    } catch (error) {
      console.error('Error', error);
    }
  };

  const openDeleteDialog = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteId(null);
    setIsDeleteDialogOpen(false);
  };

  const confirmDelete = () => {
    if (deleteId) {
      handleDelete(deleteId);
    }
    closeDeleteDialog();
  };

  return (
    <>
    <TableComponent
      data={bookData}
      columns={columns}
      editLink="/books"
      onDelete={openDeleteDialog}
    />
    <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
    />
    </>
  );
};

export default BooksTable;
