import { createSlice } from '@reduxjs/toolkit';

import { OrderDTO } from '../../utils/types';
import {
  fetchAllOrders,
  fetchOrderById,
  fetchPickUps,
  fetchOrdersByCustomer,
  fetchSKUPickUpPrDetails,
  fetchPurchaseRequisitions,
  fetchPurchaseRequisitionSku,
  fetchAssignedPickUps,
} from '../actions/orderActions';

const initialState: OrderDTO = {
  error: null,
  allOrders: [],
  pageNumber: 1,
  totalPages: 1,
  pagination: {},
  loading: false,
  nextPage: false,
  orderDetails: {
    orderItems: [],
    deliveryAddress: '',
    businessName: '',
    phoneNumber: '',
    createdAt: '',
    status: '',
    orderId: '',
    paymentMethod: '',
    totalPrice: 0,
    grandTotal: 0,
    paymentStatus: '',
    paymentChannel: '',
  },
  previousPage: false,
  ordersByCustomer: [],
  businessName: '',
  phoneNumber: '',
  pickUps: [],
  assignedPickUps: [],
  purchaseRequisition: [],
  purchaseRequisitionSku: {
    id: '',
    name: '',
    skuWholesalers: [],
  },
  endCursor: null,
  skuPickUpPrDetails: {
    prs: [],
    driverToAssignWithQuantity: [],
    alreadyAssignedPickup: [],
  },
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersByCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload.data) {
          const pagination = {
            page: action.payload.data.page,
            limit: action.payload.data.limit,
            itemCount: action.payload.data.itemCount,
            totalPages: action.payload.data.totalPages,
            hasNextPage: action.payload.data.hasNextPage,
            hasPreviousPage: action.payload.data.hasPreviousPage,
          };
          state.pagination = pagination;
          state.pageNumber = action.payload.data.page;
          state.ordersByCustomer = action.payload.data.orders;
          state.previousPage = action.payload.data.hasPreviousPage;
          state.nextPage = action.payload.data.hasNextPage;
          state.totalPages = action.payload.data.totalPages;
        } else if (action.payload.status == 'error' || action.payload.status == 'fail') {
          state.loading = false;
          state.ordersByCustomer = [];
          state.error = 'Failed to fetch data';
        }
      })
      .addCase(fetchOrdersByCustomer.rejected, (state, action) => {
        state.loading = false;
        state.ordersByCustomer = [];
        state.error = action.error.message || 'Failed to fetch data';
      })

      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrders = action.payload.data.orders;
        state.pageNumber = action.payload.data.page;
        state.previousPage = action.payload.data.hasPreviousPage;
        state.nextPage = action.payload.data.hasNextPage;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })

      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.orderDetails = {
          orderItems: [],
          deliveryAddress: '',
          businessName: '',
          phoneNumber: '',
          createdAt: '',
          status: '',
          orderId: '',
          paymentChannel: '',
          paymentStatus: '',
          paymentMethod: '',
          totalPrice: 0,
          grandTotal: 0,
        };
        state.error = action.error.message || 'Failed to fetch data';
      })

      .addCase(fetchPurchaseRequisitions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPurchaseRequisitions.fulfilled, (state, action) => {
        state.loading = false;
        state.purchaseRequisition = action.payload.data.items;
        state.pageNumber = action.payload.data.page;
        state.previousPage = action.payload.data.hasPreviousPage;
        state.nextPage = action.payload.data.hasNextPage;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchPurchaseRequisitions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })

      .addCase(fetchPurchaseRequisitionSku.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPurchaseRequisitionSku.fulfilled, (state, action) => {
        state.loading = false;
        state.purchaseRequisitionSku = action.payload.data.sku;
        state.purchaseRequisitionSku.skuWholesalers = action.payload.data.sku.wholesalerProductSkus;
        state.endCursor = action.payload.data.endCursor;
      })
      .addCase(fetchPurchaseRequisitionSku.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })

      //PICK UP LIST
      .addCase(fetchPickUps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPickUps.fulfilled, (state, action) => {
        state.loading = false;
        state.pickUps = action.payload.data.items;
        // state.purchaseRequisitionSku.skuWholesalers = action.payload.data.sku.wholesalerProductSkus;
        // state.endCursor = action.payload.data.endCursor;
      })
      .addCase(fetchPickUps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })

      //PICK UP PR DETAILS
      .addCase(fetchSKUPickUpPrDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSKUPickUpPrDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.skuPickUpPrDetails = action.payload.data;
      })
      .addCase(fetchSKUPickUpPrDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })

      //ASSIGNED PICK UP LIST
      .addCase(fetchAssignedPickUps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignedPickUps.fulfilled, (state, action) => {
        state.loading = false;
        state.assignedPickUps = action.payload.data.items;
      })
      .addCase(fetchAssignedPickUps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default orderSlice.reducer;
