import axiosInstance from './axiosInstance';
import { Book } from '../types/book.type'
import { CreateBookPayload } from '../interfaces/createBookPayload.type'

const API_URL = '/books';

export const fetchBooks = async (): Promise<Book[]> => {
  const { data } = await axiosInstance.get(API_URL
  );
  return data;
};

export const createBook = async (book: CreateBookPayload): Promise<Book> => {
  const { data } = await axiosInstance.post(API_URL,
    book,
  );
  return data;
};

export const updateBook = async (id: string, book: CreateBookPayload): Promise<Book> => {
  const { data } = await axiosInstance.put(`${API_URL}/${id}`,
   book
  );
  return data;
};

export const deleteBook = async (id: string): Promise<void> => {
  const { data } = await axiosInstance.delete(`${API_URL}/${id}`
  );
  return data;
};