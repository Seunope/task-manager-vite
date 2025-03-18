import { createSlice } from '@reduxjs/toolkit';

import { fetchInventoryBySKUiD } from '../actions/inventoryActions';
import { ErrorType, Inventories, InventoryChangeLog } from '../../utils/types';

export type InventorySliceType = {
  skuName: string;
  loading: boolean;
  inventoryId: string;
  nextPage: boolean;
  pageNumber: number;
  totalPages: number;
  productSkuId: string;
  buyingPrice: number;
  previousPage: boolean;
  inventories: Inventories[];
  error: ErrorType | null | string;
  inventoryChangeLog: InventoryChangeLog[];
};

export const initialInventoryState: InventorySliceType = {
  skuName: '',
  pageNumber: 1,
  totalPages: 1,
  buyingPrice: 0,
  inventoryId: '',
  loading: false,
  productSkuId: '',
  inventories: [],
  nextPage: false,
  previousPage: false,
  error: {
    message: '',
  },
  inventoryChangeLog: [],
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState: initialInventoryState,
  reducers: {
    // updateInventoryModificationHistory(state, action) {
    //   state.skuName = action.payload.name;
    //   state.inventoryChangeLog = action.payload.inventoryChangeLog;
    // },
    updateCurrentSKUInventory(state, action) {
      state.skuName = action.payload.name;
      state.inventoryId = action.payload.inventoryId;
      state.buyingPrice = action.payload.buyingPrice;
      state.productSkuId = action.payload.productSkuId;
    },
  },
  extraReducers: (builder) => {
    builder

      //fetchAllInventory
      // .addCase(fetchAllInventory.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchAllInventory.fulfilled, (state, action) => {
      //   state.loading = false;
      //   // console.log('PAYLOAD', action.payload);
      //   state.pageNumber = action.payload.page;
      //   state.nextPage = action.payload.hasNextPage;
      //   state.totalPages = action.payload.totalPages;
      //   state.inventories = action.payload.inventories;
      //   state.previousPage = action.payload.hasPreviousPage;
      // })
      // .addCase(fetchAllInventory.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message || 'Failed to fetch data';
      // })

      //fetchInventoryBySKU ID
      .addCase(fetchInventoryBySKUiD.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.inventoryChangeLog = [];
      })
      .addCase(fetchInventoryBySKUiD.fulfilled, (state, action) => {
        state.loading = false;
        state.skuName = action.payload.data.productSku.name;
        const changeLogs = [...action.payload.data.inventoryChangeLog];
        if (changeLogs) {
          state.inventoryChangeLog = changeLogs.reverse();
        }
      })
      .addCase(fetchInventoryBySKUiD.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export const { updateCurrentSKUInventory } = inventorySlice.actions;

export default inventorySlice.reducer;
