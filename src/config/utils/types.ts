export type ErrorType = {
  message?: string | null;
};

export type UserDTO = {
  id: string;
  name: string;
  email: string;
  create_at: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};

export type SignUpDTO = {
  name: string;
  email: string;
  password: string;
};
