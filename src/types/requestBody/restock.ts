interface listBarang {
  id_produk: string;
  kode_produk: string;
  nama_produk: string;
  qty: number;
}

export interface typeRestock {
  list_produk: [listBarang];
}
