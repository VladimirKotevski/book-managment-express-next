'use client'

import React, { createContext, useReducer, ReactNode, useContext } from 'react';
import { Book } from '../types/book.type';

interface BooksState {
  books: Book[];
}

interface BooksContextProps extends BooksState {
  dispatch: React.Dispatch<any>;
  findBookById: (id: string) => Book | undefined;
}

const initialState: BooksState = {
  books: [],
};

const BooksContext = createContext<BooksContextProps | undefined>(undefined);

const booksReducer = (state: BooksState, action: any) => {
  switch (action.type) {
    case 'SET_BOOKS': 
      return { ...state, books: action.payload };
    default:
      return state;
  }
};

export const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(booksReducer, initialState);

  const findBookById = (id: string) => {
    return state.books.find((book: { _id: string; }) => book._id === id);
  };

  return (
    <BooksContext.Provider value={{ ...state, dispatch, findBookById }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BooksProvider');
  }
  return context;
};