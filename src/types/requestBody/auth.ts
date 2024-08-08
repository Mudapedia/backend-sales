export interface RegisterOwner {
  username: string;
  email: string;
  password: string;
  salt: string;
}

export interface LoginOwner {
  email: string;
  password: string;
}

export interface RegisterSales {
  nama: string;
  username: string;
  noHP: string;
  alamat: string;
  password: string;
  salt: string;
}

export interface LoginSales {
  username: string;
  password: string;
}
