import {
  GET_ALL_ORDERS,
  GET_ORDER_BY_ID,
  GET_PICK_UP_LIST,
  GET_PURCHASE_REQUISITIONS,
  GET_ALL_ORDER_BY_CUSTOMER,
  GET_SKU_PICK_UP_DETAILS_RAW,
  GET_PURCHASE_REQUISITION_SKU,
  GET_ASSIGNED_PICK_UP_LIST,
} from '../../api/http';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PaginationOrderDTO } from '../../utils/types';

export const fetchOrdersByCustomer = createAsyncThunk(
  'order/fetchOrdersByCustomer',
  async (dto: PaginationOrderDTO) => {
    console.log({ dto });
    const response = await axios.get(
      GET_ALL_ORDER_BY_CUSTOMER({
        businessId: dto.businessId as string,
        page: dto.page as number,
        limit: dto.limit as number,
      }),
    );
    // console.log('GET_ALL_ORDER_BY_CUSTOMER', response);
    return response.data;
  },
);

type FetchAllOrdersParams = { driverId?: string; date: string; status: string; page: number };

export const fetchAllOrders = createAsyncThunk(
  'order/fetchAllOrders',
  async ({ date, status, page }: FetchAllOrdersParams) => {
    const response = await axios.get(GET_ALL_ORDERS(date, status, page));
    // console.log("GET_ALL_ORDERS", response.data)
    return response.data;
  },
);

export const fetchPurchaseRequisitions = createAsyncThunk(
  'order/fetchPurchaseRequisitions',
  async ({ date, status, page }: FetchAllOrdersParams) => {
    const response = await axios.get(GET_PURCHASE_REQUISITIONS(date, status, page));
    // console.log('GET_PURCHASE_REQUISITION', response.data);
    return response.data;
  },
);

export const fetchPurchaseRequisitionSku = createAsyncThunk(
  'order/fetchPurchaseRequisitionSku',
  async (id: string) => {
    const response = await axios.get(GET_PURCHASE_REQUISITION_SKU(id));
    return response.data;
  },
);

export const fetchOrderById = createAsyncThunk('order/fetchOrderById', async (orderId: string) => {
  // console.log('orderId', orderId);
  const response = await axios.get(GET_ORDER_BY_ID(orderId));
  // console.log('GET_ORDER_BY_ID', response.data);
  return response.data;
});

export const fetchPickUps = createAsyncThunk(
  'order/fetchPickUps',
  async ({ date, status, page }: FetchAllOrdersParams) => {
    const response = await axios.get(GET_PICK_UP_LIST(date, status, page));
    // console.log('GET_PICK_UP_LIST', response.data);
    return response.data;
  },
);

export const fetchSKUPickUpPrDetails = createAsyncThunk(
  'order/fetchSKUPickUpPrDetails',
  async (skuId: string) => {
    const response = await axios.get(GET_SKU_PICK_UP_DETAILS_RAW(skuId));
    console.log('GET_SKU_PICK_UP_DETAILS', response.data);
    return response.data;
  },
);

export const fetchAssignedPickUps = createAsyncThunk(
  'order/fetchAssignedPickUps',
  async ({ driverId, date, status, page }: FetchAllOrdersParams) => {
    const response = await axios.get(GET_ASSIGNED_PICK_UP_LIST(date, status, page, driverId));
    return response.data;
  },
);
