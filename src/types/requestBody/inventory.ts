export interface InventoryAdd {
  kode_produk: string;
  nama_produk: string;
  qty_gudang?: number;
  qty_sales?: number;
}

// export interface InventoryEdit {
//   kode_produk: string;
//   nama_produk: string;
//   qty_gudang: number;
//   qty_sales: number;
// }

export interface editBarang {
  kode_produk: string;
  nama_produk: string;
}
