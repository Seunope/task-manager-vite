import axios from 'axios';
import {
  GET_ALL_SKUS,
  GET_ALL_BRANDS,
  GET_SKU_SEARCH,
  GET_ALL_PRODUCTS,
  GET_ALL_CATEGORIES,
  GET_ALL_SUBCATEGORIES,
  SKU_AVAILABLE_FOR_SALE,
  GET_SKU_BY_SUBCATEGORYID,
  GET_WHOLESALER_SKU_SUBCATEGORY,
  SKU_SEARCH_LIST,
  SEARCH_SKU_WITH_PRICE,
} from '../../api/http';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PaginationProductDTO } from '../../utils/types';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(GET_ALL_PRODUCTS);
  return response.data;
});

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const response = await axios.get(GET_ALL_CATEGORIES);
  return response.data;
});

export const fetchSubCategories = createAsyncThunk('products/fetchSubCategories', async () => {
  const response = await axios.get(GET_ALL_SUBCATEGORIES());
  return response.data;
});

export const fetchSubCategorySKUs = createAsyncThunk(
  'products/fetchSubCategorySKUs',
  async ({ id, page }: { id: string; page: number }) => {
    const response = await axios.get(GET_SKU_BY_SUBCATEGORYID(id, page));
    // console.log("Id from SubCategorySKUs", id, response.data)
    return response.data;
  },
);

export const fetchSKUs = createAsyncThunk('products/fetchSKUs', async (page: number) => {
  const response = await axios.get(GET_ALL_SKUS(page));
  return response.data;
});

export const fetchSKUSearch = createAsyncThunk(
  'products/fetchSKUSearch',
  async ({ query, page }: { query: string; page: number }) => {
    const response = await axios.get(GET_SKU_SEARCH(query, page));
    // console.log("From Actions: ", page, response.data)
    return response.data;
  },
);

export const fetchSKUSearchList = createAsyncThunk(
  'products/fetchSKUSearchList',
  async (query: string) => {
    const response = await axios.get(SKU_SEARCH_LIST(query));
    return response.data;
  },
);

export const fetchSearchSKUWithPrice = createAsyncThunk(
  'products/fetchSearchSKUWithPrice',
  async (query: string) => {
    const response = await axios.get(SEARCH_SKU_WITH_PRICE(query));
    return response.data;
  },
);

export const fetchSKUsForSale = createAsyncThunk(
  'products/fetchSKUForSale',
  async (dto: PaginationProductDTO) => {
    const subcategoryId = dto?.subCategoryId as string;
    const response = await axios.get(SKU_AVAILABLE_FOR_SALE(subcategoryId, dto?.page) as string);
    // console.log('SKU_AVAILABLE_FOR_SALE', dto.subCategoryId, dto.page);
    return response?.data;
  },
);

export const fetchBrands = createAsyncThunk('products/fetchBrands', async () => {
  const response = await axios.get(GET_ALL_BRANDS);
  return response.data;
});

type WholeSaleApiParams = { id: string; subCategoryId?: string };
export const fetchWholesalerSubCategorySKUs = createAsyncThunk(
  'products/fetchWholesalerSubCategorySKUs',
  async ({ id, subCategoryId }: WholeSaleApiParams) => {
    const response = await axios.get(GET_WHOLESALER_SKU_SUBCATEGORY(id, subCategoryId));
    return response.data;
  },
);
