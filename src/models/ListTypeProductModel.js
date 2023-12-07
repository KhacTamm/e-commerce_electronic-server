import mongoose from "mongoose";

const Schema = mongoose.Schema;


const SelectList = new Schema(
  {
    name: String,
    options: Array,
  }
)

const ListTypeProductSchema = new Schema(
  {
    name: String,
    img: String,
    property: [SelectList],
    cloudinary_id: String,
  },
  {
    timestamps: true,
  }
);

export const ListTypeProductModel = mongoose.model(
  "ListTypeproduct",
  ListTypeProductSchema
);
