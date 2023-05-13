import express from "express";
const router = express.Router();

import {
  createOrder,
  getAllOrders,
  getOrderById,
  getAllUserOrders,
} from "../Controllers/Order.js";

// create a new order
router.post("/", createOrder);

// get all orders
router.get("/", getAllOrders);

// get a single order by ID
router.get("/:id", getOrderById);

// get all orders to a specific userId
router.get("/user/:userId", getAllUserOrders);

export default router;
