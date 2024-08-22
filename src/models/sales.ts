import mongoose from "mongoose";

const schemaInventorySales = new mongoose.Schema({
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
  qty_produk: {
    type: Number,
    required: true,
    default: 0,
  },
});

const salesSchema = new mongoose.Schema(
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
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    inventory: [schemaInventorySales],
  },
  {
    timestamps: true,
  }
);

export default salesSchema;
