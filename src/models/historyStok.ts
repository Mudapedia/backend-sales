import mongoose from "mongoose";

const listProduk = new mongoose.Schema({
  id_produk: {
    type: String,
    required: true,
  },
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
    default: 0,
  },
});

const historyStok = new mongoose.Schema(
  {
    kode_restock: {
      type: String,
      required: true,
    },
    list_produk: [listProduk],
  },
  {
    timestamps: true,
  }
);

export default historyStok;
