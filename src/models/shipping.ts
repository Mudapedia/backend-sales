import mongoose from "mongoose";

const BarangSchema = new mongoose.Schema({
  kode_produk: {
    type: String,
    required: true,
  },
  nama_produk: {
    type: String,
    required: true,
  },
});

const ShippingSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    noHP: {
      type: String,
      required: true,
    },
    alamat: {
      type: String,
      required: true,
    },
    listBarang: [BarangSchema],
    tanggal_diterima: {
      type: Date,
    },
    status: {
      type: String,
      default: "Dikirim",
    },
  },
  {
    timestamps: true,
  }
);

export default ShippingSchema;
