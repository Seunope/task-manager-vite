import {
  CreateTaskDTO,
  LoginDTO,
  SignUpDTO,
  TaskStatus,
  UpdateTaskDTO,
  UpdateTaskStatusDTO,
} from '../utils/types';
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

export const GET_TASK = async () => {
  const url = `${BASE_URL}/v1/task`;
  return await GetFunc(url);
};

export const UPDATE_TASK_STATUS = async (data: UpdateTaskStatusDTO) => {
  const url = `${BASE_URL}/v1/task/${data.taskId}/status`;
  return await PatchFunc(url, { status: data.status });
};

export const UPDATE_TASK = async (data: UpdateTaskDTO) => {
  const url = `${BASE_URL}/v1/task/${data.taskId}/edit`;
  return await PutFunc(url, data);
};

export const CREATE_TASK = async (data: CreateTaskDTO) => {
  const url = `${BASE_URL}/v1/task`;
  return await PostFunc(url, data);
};
