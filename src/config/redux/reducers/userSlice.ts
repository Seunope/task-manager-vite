import { createSlice } from '@reduxjs/toolkit';
import { fetchOneAgent } from '../actions/userActions';
import { ErrorType } from '../../utils/types';

export type UserType = {
  id: string;
  role: string;
  image: string;
  email: string;
  agentId: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  coverageArea: [];
  cluster: string;
  homeAddress: string;
  loading: boolean;
  orderValue: number;
  totalOrder: number;
  shopsOnboarded: number;
  error?: ErrorType | null | string;
};

const initialState: UserType = {
  id: '',
  role: '',
  image: '',
  email: '',
  agentId: '',
  phoneNumber: '',
  firstName: '',
  lastName: '',
  coverageArea: [],
  cluster: '',
  homeAddress: '',
  loading: false,
  error: {
    message: '',
  },

  orderValue: 0,
  totalOrder: 0,
  shopsOnboarded: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.agentId = action.payload.agentId;
      state.phoneNumber = action.payload.phoneNumber;
      state.role = action.payload.role.name;
      state.image = action.payload.profileUrl;
      state.cluster = action.payload.cluster;
      state.lastName = action.payload.lastName;
      state.firstName = action.payload.firstName;
      state.coverageArea = action.payload.coverageArea;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOneAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneAgent.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload.data.email;
        state.cluster = action.payload.data.cluster;
        state.lastName = action.payload.data.lastName;
        state.firstName = action.payload.data.firstName;
        state.image = action.payload.data.profileUrl;
        state.phoneNumber = action.payload.data.phoneNumber;
        state.coverageArea = action.payload.data.coverageArea;
      })
      .addCase(fetchOneAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
