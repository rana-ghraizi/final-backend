import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./Routes/Auth.js";
import categoriesRoute from './Routes/Category.js';
import paintingsRoute from './Routes/Painting.js';
import cartRoute from './Routes/Cart.js';
import orderRoutes from './Routes/Order.js'

dotenv.config();

await connectDB();

const PORT = process.env.PORT || 5000;
const app = new express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use("/", router);
app.use("/category", categoriesRoute);
app.use("/painting", paintingsRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoutes);




app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`)
);
