import mongoose from "mongoose";
import salesSchema from "./sales";
import inventorySchema from "./inventory";
import historyStok from "./historyStok";

const schemaOwner = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    sales: [salesSchema],
    inventory: [inventorySchema],
    history_stok: [historyStok],
  },
  {
    timestamps: true,
  }
);

const OwnerCol = mongoose.model("owner", schemaOwner, "owner");
export default OwnerCol;
