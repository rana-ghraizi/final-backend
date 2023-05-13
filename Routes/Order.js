import express from "express";
const router = express.Router();

import {
  createOrder,
  getAllOrders,
  getOrderById,
  getAllUserOrders,
  getAllOrdersForUser,
} from "../Controllers/Order.js";

// create a new order
router.post("/", createOrder);

// get all orders
router.get("/", getAllOrders);

// get a single order by ID
router.get("/:id", getOrderById);

// get all orders to a specific userId
router.get("/user/:userId", getAllUserOrders);

// get all orders done by a specific user
router.get("/orders/:userId", getAllOrdersForUser);


export default router;
