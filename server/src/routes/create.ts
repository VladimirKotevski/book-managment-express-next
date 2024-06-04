import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { Book } from "../models/book";
import { DetailedError } from "../errors/detailed-error";

const router = express.Router();

router.post(
  "/books",
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("numberOfPages")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
    body("description").not().isEmpty().withMessage("descritpion is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const { title, description, numberOfPages } = req.body;

      const book = Book.build({
        title,
        description,
        numberOfPages
      });

      await book.save();

      res.status(201).send(book);
    } catch (error) {
      const err = error as Error;
      throw new DetailedError('Failed to create book', err.message);
    }
  }
);

export { router as createBookRouter };