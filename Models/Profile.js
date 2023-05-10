import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  paintings: [{
    paintingId: {
      type: Schema.Types.ObjectId,
      ref: 'Painting',
      required: true
    }
  }]
});

const Cart = mongoose.model("Cart", ProfileSchema);

export default Cart;
