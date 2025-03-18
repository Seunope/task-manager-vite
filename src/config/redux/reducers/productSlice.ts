import { createSlice } from '@reduxjs/toolkit';

import { ErrorType, ProductInternalInventory } from '../../utils/types';
import {
  fetchBrands,
  fetchCategories,
  fetchProducts,
  fetchSearchSKUWithPrice,
  fetchSKUs,
  fetchSKUSearch,
  fetchSKUSearchList,
  fetchSKUsForSale,
  fetchSubCategories,
  fetchSubCategorySKUs,
  fetchWholesalerSubCategorySKUs,
} from '../actions/productActions';
import { formatSkuForSaleItem } from '../../../config/utils/utils';

export type SubCategory = {
  id: string;
  name: string;
};

export type ProductModifaicationHistory = {
  id: string;
  createdAt: string;
  modifiedByName: string;
  newValue: string | number;
  oldValue: string | number;
};

export type SKUsForSale = {
  averageRating: string;
};

export type ProductSku = {
  name: string;
  description: string;
  skuImage: { fullImageUrl: string };
};

export type WholesalerSubCategorySKUs = {
  id: string;
  productSku: ProductSku;
  distributorBuyingPrice: string;
  sellingPrice: string;
};

export type ProductSliceType = {
  products: [];
  categories: [];
  selling: boolean;
  subCategories: SubCategory[];
  SKUs: [];
  SKUsForSale: formatSkuForSaleItem[];
  brands: [];
  subCategorySKUs: [];
  skuName: string;
  skuId: string;
  name: string;
  openRetailPrice: {
    discountType: number;
    productSkuId: string;
    openRetailDiscounts: number;
    sellingPrice: number;
    leastRecommendedRetailPrice: number;
  };
  quantityInPack: number;
  subCategory: { id: string };
  skuImage: { fullImageUrl: string };
  skuWholesalers: { wholesalerName: string; sellingPrice: number }[];
  wholesalerSubCategorySKUs: [];
  productInternalInventory: ProductInternalInventory;
  priceModificationHistory: ProductModifaicationHistory[];
  previousPage: boolean;
  nextPage: boolean;
  pageNumber: number;
  totalPages: number;
  loading: boolean;
  error: ErrorType | null | string;
};

export const initialProductState: ProductSliceType = {
  name: '',
  products: [],
  selling: false,
  categories: [],
  subCategories: [],
  SKUs: [],
  SKUsForSale: [],
  brands: [],
  subCategorySKUs: [],
  skuName: '',
  skuId: '',
  openRetailPrice: {
    discountType: 0,
    productSkuId: '',
    openRetailDiscounts: 0,
    sellingPrice: 0,
    leastRecommendedRetailPrice: 0,
  },
  quantityInPack: 0,
  subCategory: { id: '' },
  skuImage: { fullImageUrl: '' },
  skuWholesalers: [],
  productInternalInventory: {
    id: '',
    quantity: 0,
    updatedAt: '',
    createdAt: '',
    productSkuId: '',
    buyingPrice: 0,
    sellingPrice: 0,
  },
  wholesalerSubCategorySKUs: [],
  priceModificationHistory: [],
  previousPage: false,
  nextPage: false,
  pageNumber: 1,
  totalPages: 1,
  loading: false,
  error: {
    message: '',
  },
};

export const productSlice = createSlice({
  name: 'products',
  initialState: initialProductState,
  reducers: {
    updateCurrentSKU(state, action) {
      state.skuId = action.payload.id;
      state.skuName = action.payload.name;
      state.selling = action.payload.selling;
      state.openRetailPrice = {
        ...state.openRetailPrice,
        sellingPrice: action.payload.sellingPrice,
      };
    },
    updateSKUWholesalers(state, action) {
      state.skuId = action.payload.id;
      state.skuName = action.payload.name;
      state.skuWholesalers = action.payload.skuWholesalers;
    },
    updatePriceModificationHistory(state, action) {
      console.log(
        'action.payload.priceModificationHistory',
        action.payload.priceModificationHistory,
      );
      state.skuName = action.payload.name;
      state.priceModificationHistory = action.payload.priceModificationHistory;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })

      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })

      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories = action.payload.data.subCategories;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })

      .addCase(fetchSubCategorySKUs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategorySKUs.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategorySKUs = action.payload.data.skus;
        state.pageNumber = action.payload.data.page;
        state.previousPage = action.payload.data.hasPreviousPage;
        state.nextPage = action.payload.data.hasNextPage;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchSubCategorySKUs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })

      .addCase(fetchWholesalerSubCategorySKUs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWholesalerSubCategorySKUs.fulfilled, (state, action) => {
        state.loading = false;
        state.wholesalerSubCategorySKUs = action.payload.data.wholesalerProductSkus;
      })
      .addCase(fetchWholesalerSubCategorySKUs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })

      .addCase(fetchSKUs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSKUs.fulfilled, (state, action) => {
        state.loading = false;
        state.SKUs = action.payload.data.skus;
        state.pageNumber = action.payload.data.page;
        state.previousPage = action.payload.data.hasPreviousPage;
        state.nextPage = action.payload.data.hasNextPage;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchSKUs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })

      .addCase(fetchSKUsForSale.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSKUsForSale.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.SKUsForSale = action.payload.data.skus;
          state.pageNumber = action.payload.data.page;
          state.previousPage = action.payload.data.hasPreviousPage;
          state.nextPage = action.payload.data.hasNextPage;
        } else if (action.payload.status == 'error' || action.payload.status == 'fail') {
          state.loading = false;
          state.SKUsForSale = [];
          state.error = 'Failed to fetch data';
        }
      })
      .addCase(fetchSKUsForSale.rejected, (state, action) => {
        state.loading = false;
        state.pageNumber = 0;
        state.SKUsForSale = [];
        state.nextPage = false;
        state.previousPage = false;
        state.error = action.error.message || 'Failed to fetch data';
      })

      .addCase(fetchSearchSKUWithPrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchSKUWithPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.SKUsForSale = action.payload.data.skus;
      })
      .addCase(fetchSearchSKUWithPrice.rejected, (state, action) => {
        state.loading = false;
        state.SKUsForSale = [];
        state.error = action.error.message || 'Failed to fetch data';
      })

      .addCase(fetchSKUSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSKUSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.SKUs = action.payload.data.skus;
        state.pageNumber = action.payload.data.page;
        state.previousPage = action.payload.data.hasPreviousPage;
        state.nextPage = action.payload.data.hasNextPage;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchSKUSearch.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })

      .addCase(fetchSKUSearchList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSKUSearchList.fulfilled, (state, action) => {
        state.loading = false;
        state.SKUs = action.payload.data.skus;
      })
      .addCase(fetchSKUSearchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })

      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload.data.brands;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export const { updateCurrentSKU, updateSKUWholesalers, updatePriceModificationHistory } =
  productSlice.actions;

export default productSlice.reducer;
