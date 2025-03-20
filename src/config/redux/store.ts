import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer, { UserState } from './reducers/userSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import taskReducer, { TaskState } from './reducers/taskSlice';

export type CentralState = {
  user: UserState;
  task: TaskState;
};

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducers = combineReducers({
  user: userReducer,
  task: taskReducer,
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
