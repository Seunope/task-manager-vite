import axios, { AxiosResponse } from 'axios';

import { AUTH_CONSTANTS } from '../../constants/auth';

axios.interceptors.request.use(async (config) => {
  if (config) {
    const token = JSON.parse(localStorage.getItem(AUTH_CONSTANTS.AUTH_TOKEN) as string);
    // console.log('token', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

const newAbortSignal = (timeoutMs: number) => {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
};

export const onSuccess = (response: AxiosResponse) => {
  return response.data ? response.data : response;
};

export type CustomAxiosErrorType = {
  message: string;
  error: { message: string };
  response: {
    data: {
      data: {
        errors: string[];
      };
      message: string;
    };
  };
  request: {
    _response: {
      message: string;
    };
    _aborted: boolean;
  };
};

export const onError = (error: CustomAxiosErrorType) => {
  console.log('erroKKKr', error);
  if (error.response) {
    console.log('Error Data', error.response.data);
    if (error.response.data.message) {
      return error.response.data.message;
    }
    return error.response.data;
  }
  if (error.request) {
    console.log('Request', error.request);
    if (error.request._response) {
      return error.request._response;
    }
    if (error.request._aborted) {
      return 'Connection aborted. Please, try again';
    }
    return error.request;
  }
  console.log('Error', error.message);
  return error.message;
};

export const GetFunc = async (path: string) => {
  return axios.get(path, { signal: newAbortSignal(60000) }); // 1 min //.then(onSuccess).catch(onError);
};
export const GetDownloadFunc = async (path: string) => {
  return axios.get(path, { signal: newAbortSignal(60000), responseType: 'blob' }); // 1 min //.then(onSuccess).catch(onError);
};

export const PostFunc = async (path: string, payload: unknown) => {
  return axios.post(path, payload, { signal: newAbortSignal(60000) }); // .then(onSuccess).catch(onError);
};

export const PutFunc = async (path: string, payload: unknown) => {
  return axios.put(path, payload, { signal: newAbortSignal(60000) }); // .then(onSuccess).catch(onError);
};

export const PatchFunc = async (path: string, payload: unknown) => {
  return axios.patch(path, payload, { signal: newAbortSignal(60000) }); // .then(onSuccess).catch(onError);
};

export const DelFunc = async (path: string) => {
  return axios.delete(path, { signal: newAbortSignal(60000) }); // .then(onSuccess).catch(onError);
};
