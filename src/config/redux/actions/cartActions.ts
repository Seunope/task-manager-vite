import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ADD_TO_CART, CLEAR_CART, GET_CUSTOMER_CART, REMOVE_FROM_CART } from '../../api/http';
import { CartPayload } from '../../utils/types';
import { getAuthToken } from '../../utils/utils';

export const fetchCustomerCart = createAsyncThunk('cart/mine', async (id: string) => {
  const token = getAuthToken();
  const response = await axios.get(GET_CUSTOMER_CART(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const addProductToCart = createAsyncThunk(
  'cart/addProduct',
  async (product: CartPayload) => {
    const token = getAuthToken();
    const response = await axios.post(ADD_TO_CART, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('From ADD', response.data);
    return response.data;
  },
);

export const removeProductFromCart = createAsyncThunk(
  'cart/removeProduct',
  async (product: CartPayload) => {
    const token = getAuthToken();
    const response = await axios.put(REMOVE_FROM_CART, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("From Cartslice", response.data)
    return response.data;
  },
);

export const emptyRemoteCart = createAsyncThunk('cart/clear', async (cardId: string) => {
  const token = getAuthToken();
  const response = await axios.delete(CLEAR_CART(cardId), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log("From Cartslice", response.data)
  return response.data;
});
