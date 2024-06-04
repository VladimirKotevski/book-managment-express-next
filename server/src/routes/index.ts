import express, { Request, Response } from 'express';
import { Book } from '../models/book';
import { DetailedError } from "../errors/detailed-error"

const router = express.Router();

router.get('/books', async (req: Request, res: Response) => {

  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    const err = error as Error;
    throw new DetailedError('Failed to fetch books', err.message);
  }
});

export { router as indexBookRouter };