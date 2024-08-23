import mongoose from "mongoose";

const BarangSchema = new mongoose.Schema({
  id_produk: {
    type: mongoose.Types.ObjectId,
  },
  kode_produk: {
    type: String,
    required: true,
  },
  nama_produk: {
    type: String,
    required: true,
  },
  qty_barang: {
    type: Number,
    required: true,
  },
});

const ShippingSchema = new mongoose.Schema(
  {
    list_barang: [BarangSchema],
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
