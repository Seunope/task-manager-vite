import cartSlice, { CartState } from './reducers/cartSlice';
import storage from 'redux-persist/lib/storage';
import orderSlice from './reducers/orderSlice';
import businessSlice from './reducers/businessSlice';
import inventorySlice, { InventorySliceType } from './reducers/inventorySlice';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer, { UserType } from './reducers/userSlice';
import agentSlice, { NewShopType } from './reducers/agentSlice';
import { BusinessSliceDTO, OrderDTO } from '../utils/types';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productSlice, { ProductSliceType } from './reducers/productSlice';

export type CentralState = {
  user: UserType;
  // shop: ShopDTO;
  order: OrderDTO;
  agent: NewShopType;
  cart: CartState;
  business: BusinessSliceDTO;
  products: ProductSliceType;
  inventory: InventorySliceType;
};

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducers = combineReducers({
  cart: cartSlice,
  user: userReducer,
  order: orderSlice,
  agent: agentSlice,
  // shop: shopReducer,
  products: productSlice,
  business: businessSlice,
  inventory: inventorySlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
