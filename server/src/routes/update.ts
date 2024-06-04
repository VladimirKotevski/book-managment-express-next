import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { NotFoundError } from "../errors/not-found-error"
import { DetailedError } from "../errors/detailed-error";
import { Book } from "../models/book";

const router = express.Router();

router.put(
  "/books/:id",
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("numberOfPages")
      .isFloat({ gt: 0 })
      .withMessage("number of pages must be provided and must be greater than 0"),
      body("description").not().isEmpty().withMessage("Description is required"),

  ],
  validateRequest,
  async (req: Request, res: Response) => {
    try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      throw new NotFoundError();
    }

    book.set({
      title: req.body.title,
      description: req.body.description,
      numberOfPages: req.body.numberOfPages
    });
    await book.save();

    res.send(book);
  } catch (error) {
    const err = error as Error;
    throw new DetailedError('Failed to update book', err.message);
  }
  }
);

export { router as updateBookRouter };