import mongoose from "mongoose";
import salesSchema from "./sales";
import inventorySchema from "./inventory";
import historyStok from "./historyStok";
import ShippingSchema from "./shipping";

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
    authentication: {
      password: {
        type: String,
        select: false,
        required: true,
      },
      salt: {
        type: String,
        select: false,
        required: true,
      },
      token: {
        type: String,
        select: false,
      },
    },
    sales: [salesSchema],
    inventory: [inventorySchema],
    history_stok: [historyStok],
    shipping: [ShippingSchema],
  },
  {
    timestamps: true,
  }
);

const OwnerCol = mongoose.model("owner", schemaOwner, "owner");
export default OwnerCol;
