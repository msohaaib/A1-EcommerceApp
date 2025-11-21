import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true }, // Added brand
    category: { type: String, required: true },
    description: { type: String, default: "" }, // optional
    image: { type: String, default: "" }, // optional
  },
  { timestamps: true },
); // adds createdAt and updatedAt automatically

export default mongoose.model("Product", productSchema);
