import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PaintingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    public_id:{
       type: String,
       required: true,
    },
    url:{
       type: String,
       required: true,
    }
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  styleId: {
    type: Schema.Types.ObjectId,
    ref: "Style",
    required: true,
  },
  soldOut: {
    type: Boolean,
    default: false,
  },

});

const Painting = mongoose.model("Painting", PaintingSchema);

export default Painting;
