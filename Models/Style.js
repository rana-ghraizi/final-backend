import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StyleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

const Style = mongoose.model("Style", StyleSchema);

export default Style;
