export type RegisterDTO = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  [key: string]: string;
};

export type LoginFormDTO = {
  username: string;
  password: string;
  remember: boolean;
};

export type AuthContent = {
  authenticated: boolean;
  is_superuser: boolean;
  username: string;
  jwt: string;
  exp: string;
};

export type AuthResponse = {
  data: AuthContent;
};
