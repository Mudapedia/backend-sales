import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    kode_produk: {
      type: String,
      required: true,
    },
    nama_produk: {
      type: String,
      required: true,
    },
    qty_gudang: {
      type: Number,
      required: true,
      default: 0,
    },
    qty_sales: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default inventorySchema;
