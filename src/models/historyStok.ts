import mongoose from "mongoose";

const historyStok = new mongoose.Schema(
  {
    kode_produk: {
      type: String,
      required: true,
    },
    nama_produk: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default historyStok;
