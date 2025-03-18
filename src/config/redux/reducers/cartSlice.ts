import { createSlice } from '@reduxjs/toolkit';

import { Cart } from '../../utils/types';
import {
  addProductToCart,
  emptyRemoteCart,
  fetchCustomerCart,
  removeProductFromCart,
} from '../actions/cartActions';

export interface CartState {
  error: unknown;
  items: Cart[];
  loading: boolean;
  itemCount: number;
  totalCost: number;
  businessId: string | null;
  cartId: string | null;
}

const initState: CartState = {
  items: [],
  businessId: null,
  error: null,
  itemCount: 0,
  totalCost: 0,
  cartId: null,
  loading: false,
};

const mapCartItems = (cartItems: Cart[], businessId: string) => {
  return cartItems.map((item: Cart) => {
    // console.log('cartItems', cartItems)
    return {
      businessId,
      quantity: item.quantity,
      productId: item.productId,
      productName: item.product?.name,
      image: item.product.skuImage?.fullImageUrl,
      quantityInPack: item.product?.quantityInPack,
      subCategoryId: item.product?.subCategory?.id,
      discountType: item.product?.openRetailPrice?.discountType,
      productSkuId: item.product?.openRetailPrice?.productSkuId,
      discount: item.product?.openRetailPrice?.openRetailDiscounts,
      price:
        item.product.openRetailPrice.sellingPrice ||
        item.product.openRetailPrice.leastRecommendedRetailPrice,
    };
  });
};

export const cartReducer = createSlice({
  name: 'cart',
  initialState: initState,
  reducers: {
    emptyCart: (state) => {
      state.items = [];
      state.itemCount = 0;
      state.totalCost = 0;
      state.cartId = null;
    },
    updateCartState: (state, action) => {
      const disData = action.payload.data;
      if (disData) {
        state.cartId = disData.id;
        state.businessId = disData.customerId;
        state.totalCost = disData?.totalPrice;
        state.itemCount = disData?.cartItems?.length;
        state.items = mapCartItems(disData?.cartItems, disData?.customerId) as unknown as Cart[];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      const disData = action.payload.data;
      state.loading = false;

      if (disData) {
        // console.log("cartItems", disData);
        state.cartId = disData.id;
        state.businessId = disData.customerId;
        state.items = mapCartItems(disData?.cartItems, disData.customerId) as unknown as Cart[];
        state.totalCost = disData?.totalPrice;
        state.itemCount = disData?.cartItems?.length;
      }
    });

    builder.addCase(addProductToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(addProductToCart.rejected, (state, action) => {
      // console.log("action", action);
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch data';
    });

    // Remove from cart
    builder.addCase(removeProductFromCart.fulfilled, (state, action) => {
      const disData = action.payload.data;
      state.loading = false;
      if (disData) {
        // console.log("cartItems", disData.cartItems);
        state.cartId = disData.id;
        state.businessId = disData.customerId;
        state.items = mapCartItems(disData?.cartItems, disData.customerId) as unknown as Cart[];
        state.totalCost = disData?.totalPrice;
        state.itemCount = disData?.cartItems?.length;
      }
    });

    builder.addCase(removeProductFromCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(removeProductFromCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch data';
    });

    // My Cart
    builder.addCase(fetchCustomerCart.fulfilled, (state, action) => {
      const disData = action.payload.data;
      if (disData) {
        // console.log("cartItems", disData);
        state.cartId = disData.id;
        state.businessId = disData.customerId;
        state.items = mapCartItems(disData?.cartItems, disData.customerId) as unknown as Cart[];
        state.totalCost = disData?.totalPrice;
        state.itemCount = disData?.cartItems?.length;
      } else if (action.payload.status == 'error' || action.payload.status == 'fail') {
        state.items = [];
        state.itemCount = 0;
        state.totalCost = 0;
        state.cartId = null;
      }

      state.loading = false;
    });

    builder.addCase(fetchCustomerCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchCustomerCart.rejected, (state, action) => {
      state.loading = false;
      state.items = [];
      state.itemCount = 0;
      state.totalCost = 0;
      state.cartId = null;
      state.error = action.error.message || 'Failed to fetch data';
    });

    // Empty Cart
    builder.addCase(emptyRemoteCart.fulfilled, (state, action) => {
      const disData = action.payload;
      if (disData.status === 'success') {
        state.cartId = null;
        state.businessId = null;
        state.items = [];
        state.totalCost = 0;
        state.itemCount = 0;
      }
      state.loading = false;
    });

    builder.addCase(emptyRemoteCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(emptyRemoteCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to empty cart';
    });
  },
});

export const { emptyCart, updateCartState } = cartReducer.actions;

export default cartReducer.reducer;
