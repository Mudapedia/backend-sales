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
