interface Barang {
  id_produk: string;
  kode_produk: string;
  nama_produk: string;
  qty_barang: number;
}

export interface ShippingType {
  list_barang: [Barang];
}
