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
    qty_Gudang: {
      type: Number,
      required: true,
    },
    qty_sales: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default inventorySchema;
