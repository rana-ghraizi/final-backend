import Order from "../Models/Order.js";
import Cart from "../Models/Cart.js";
import Painting from "../Models/Painting.js";

// create order
export const createOrder = async (req, res) => {
  try {
    const userId = req.body.userId;

    // find the user's cart
    const cart = await Cart.findOne({ userId }).populate("items.paintingId");

    // create a new order based on the cart's items
    const order = new Order({
      user: userId,
      orderedPaintings: cart.items.map((item) => ({
        paintingId: item.paintingId._id,
      })),
      total_price: cart.bill,
    });

    // save the order to the database
    const savedOrder = await order.save();

    // clear the user's cart
    cart.items = [];
    cart.bill = 0;
    await cart.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "username address phonenumber")
      .populate(
        "orderedPaintings.paintingId",
        "title image price size soldOut"
      );

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// get a single order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "username address phonenumber")
      .populate("orderedPaintings.paintingId", "title size");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// get all orders to a specific userId
export const getAllUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all paintings uploaded by the user
    const paintings = await Painting.find({ userId });

    // Get the painting IDs uploaded by the user
    const paintingIds = paintings.map((painting) => painting._id);

    // Find all orders that include the painting IDs
    const orders = await Order.find({
      "orderedPaintings.paintingId": { $in: paintingIds },
    })
      .populate("user", "username address phonenumber")
      .populate(
        "orderedPaintings.paintingId",
        "title image price size soldOut"
      );

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// get all orders done by a specific user
export const getAllOrdersForUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId })
      .populate("user", "username address phonenumber")
      .populate("orderedPaintings.paintingId", "title image price size soldOut");

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
