import { LoginDTO, SignUpDTO } from '../utils/types';
import { GetFunc, PatchFunc, PostFunc, PutFunc } from './http-mthd';

const BASE_URL = 'http://localhost:3000'; //import.meta.env.VITE_API_URL;

export const LOGIN_USER = async (data: LoginDTO) => {
  const url = `${BASE_URL}/v1/auth/login`;
  return await PostFunc(url, data);
};

export const SIGN_UP_USER = async (data: SignUpDTO) => {
  const url = `${BASE_URL}/v1/auth/signup`;
  return await PostFunc(url, data);
};
