import express, { Request, Response } from "express";
import { validateRequest } from "../middlewares/validate-request";
import { Book } from "../models/book";
import { NotFoundError } from "../errors/not-found-error";
import { DetailedError } from "../errors/detailed-error"

const router = express.Router();

router.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      throw new NotFoundError();
    }
    res.send('Book deleted');
  } catch (error) {
    const err = error as Error;
    throw new DetailedError('Failed to delete book', err.message);
  }
});

export { router as deleteBookRouter };