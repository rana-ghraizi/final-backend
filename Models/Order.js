import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderedPaintings: [
      {
        paintingId: {
          type: Schema.Types.ObjectId,
          ref: "Painting",
          required: true,
        },
      },
    ],
    total_price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
