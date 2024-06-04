import mongoose from 'mongoose';

interface BookAttrs {
  title: string;
  description: string;
  numberOfPages: number;
}

interface BookDoc extends mongoose.Document {
  title: string;
  description: string;
  numberOfPages: number;
}

interface BookModel extends mongoose.Model<BookDoc> {
  build(attrs: BookAttrs): BookDoc;
}

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    numberOfPages: {
      type: Number,
      required: true,
    }
  }
);


bookSchema.statics.build = (attrs: BookAttrs) => {
  return new Book(attrs);
};

const Book = mongoose.model<BookDoc, BookModel>('Book', bookSchema);

export { Book };