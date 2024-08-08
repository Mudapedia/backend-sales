interface listBarang {
  id_produk: string;
  kode_produk: string;
  nama_produk: string;
  qty: number;
}

export interface typeRestock {
  kode_restock: string;
  list_produk: [listBarang];
}
