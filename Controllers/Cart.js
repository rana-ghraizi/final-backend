import Cart from "../Models/Cart.js";
import Painting from "../Models/Painting.js";

// get cart's items
export const getCartItems = async (req, res) => {
  const userId = req.params.id;

  try {
    let cart = await Cart.findOne({ userId })
      .populate("userId", "username  address phonenumber")

      .populate("items.paintingId")
      .exec();
    if (cart && cart.items.length > 0) {
      res.send(cart);
    } else {
      res.send(null);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

// Add items to cart
export const addCartItem = async (req, res) => {
  const userId = req.params.id;
  const paintingId = req.body.paintingId;
  try {
    let cart = await Cart.findOne({ userId });
    let painting = await Painting.findOne({ _id: paintingId });
    if (!painting) {
      res.status(404).send("Painting not found");
      return;
    }

    // Check if the painting is sold out before adding it to the cart
    if (painting.soldOut) {
      return res.status(400).send("Painting is sold out.");
    }
    let price = painting.price;
    if (!cart) {
      const newCart = await Cart.create({
        userId,
        items: [{ paintingId }],
        bill: price,
      });

      // Mark the painting as sold out since it's been added to the cart
      await Painting.updateOne({ _id: paintingId }, { soldOut: true });

      return res.status(201).send(newCart);
    } else {
      let itemIndex = cart.items.findIndex(
        (item) => item.paintingId.toString() === paintingId.toString()
      );
      if (itemIndex > -1) {
        return res.send("Painting already exists in cart.");
      } else {
        cart.items.push({ paintingId });
      }
      cart.bill += price;
      cart = await cart.save();

      // Mark the painting as sold out since it's been added to the cart
      await Painting.updateOne({ _id: paintingId }, { soldOut: true });

      return res.status(201).send(cart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

// delete item from cart
export const deleteItem = async (req, res) => {
  const userId = req.params.userId;
  const paintingId = req.params.paintingId;
  try {
    let cart = await Cart.findOne({ userId });
    let painting = await Painting.findOne({ _id: paintingId });
    console.log(paintingId);
    let itemIndex = cart.items.findIndex(
      (item) => item.paintingId.toString() === paintingId
    );
    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      cart.bill -= painting.price;
    }
    cart = await cart.save();

    // Mark the painting as available since it's been deleted from the cart
    await Painting.updateOne({ _id: paintingId }, { soldOut: false });

    return res.status(200).send(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
