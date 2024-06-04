import express from "express";
import "express-async-errors";
import cors from 'cors';
import { json } from "body-parser";
import { NotFoundError } from "../src/errors/not-found-error";
import { errorHandler } from "../src/middlewares/error-handler"
import { createBookRouter } from "./routes/create";
import { deleteBookRouter } from "./routes/delete";
import { indexBookRouter } from "./routes/index";
import { updateBookRouter } from "./routes/update";

const app = express();
app.use(cors())
app.set("trust proxy", true);
app.use(json());

app.use(createBookRouter);
app.use(deleteBookRouter);
app.use(indexBookRouter);
app.use(updateBookRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };