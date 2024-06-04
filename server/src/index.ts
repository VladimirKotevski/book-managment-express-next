import mongoose from "mongoose";

import { app } from "./app";


const start = async () => {
    
  
    try {
      
      mongoose.set("strictQuery", false);
      await mongoose.connect('mongodb://localhost:27017/books_db', {});
      console.log("Connected to MongoDb");
    } catch (err) {
      console.error(err);
    }
  
    app.listen(3001, () => {
      console.log("Listening on port 3001!!!!!!!!");
    });
  };
  
  start();