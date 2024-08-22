export interface DataSales {
  _id: string;
  kode_produk: string;
  nama_produk: string;
  qty_produk: number;
}

export interface AddInventorySales {
  data: DataSales[];
}

export interface DataSalesinsert {
  kode_produk: string;
  nama_produk: string;
}
