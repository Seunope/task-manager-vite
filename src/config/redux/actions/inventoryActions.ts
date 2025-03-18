import axios from 'axios';
import { PaginationDTO } from '../../utils/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { INVENTORY_BY_SKU_ID, INVENTORY_GET_ALL } from '../../api/http';

export const fetchAllInventory = createAsyncThunk(
  'inventory/fetchAllInventory',
  async (dto: PaginationDTO) => {
    const response = await axios.get(INVENTORY_GET_ALL(dto?.page, dto.limit));
    // console.log('response', response);
    return response?.data;
  },
);

export const fetchInventoryBySKUiD = createAsyncThunk(
  'inventory/fetchInventoryBySKUiD',
  async (skuId: string) => {
    const response = await axios.get(INVENTORY_BY_SKU_ID(skuId));
    console.log('responseTTTTT', response);
    return response?.data;
  },
);
