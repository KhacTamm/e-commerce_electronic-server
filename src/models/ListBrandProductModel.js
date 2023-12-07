import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ListBrandProductSchema = new Schema(
  {
    name: String,
    img: String,
    cloudinary_id: String,
  },
  {
    timestamps: true,
  }
);

export const ListBrandProductModel = mongoose.model(
  "ListBrandproduct",
  ListBrandProductSchema
);
