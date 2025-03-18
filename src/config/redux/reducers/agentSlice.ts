import { createSlice } from '@reduxjs/toolkit';

import { ErrorType, PaginationAgentDTO } from '../../utils/types';
import {
  fetchAgentSearch,
  fetchAllAgent,
  fetchAllAgentByRole,
  fetchAllAgentRoles,
} from '../actions/agentActions';

export type AgentsByRoleId = {
  lastName: string;
  id: string;
  name: string;
  firstName: string;
};

export type NewShopType = {
  id: string;
  agentId: string;
  agents: [];
  agentRoles: [];
  firstName: string;
  lastName: string;
  email: string;
  agentsByRoleId: AgentsByRoleId[];
  phoneNumber: string;
  coverageArea: [];
  profileUrl: string;
  cluster: string;
  homeAddress: string;
  pagination: PaginationAgentDTO;
  // role: string;
  role: { name: string };
  loading: boolean;
  error?: ErrorType | null | string;
};

const initialState: NewShopType = {
  id: '',
  agentId: '',
  agents: [],
  agentRoles: [],
  firstName: '',
  lastName: '',
  email: '',
  agentsByRoleId: [],
  phoneNumber: '',
  coverageArea: [],
  profileUrl: '',
  cluster: '',
  homeAddress: '',
  pagination: {
    agentId: '',
    limit: 50,
    page: 1,
    pageCount: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  // role: '',
  role: { name: '' },
  loading: false,
  error: {
    message: '',
  },
};

export const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    updateCurrentAgent(state, action) {
      state.cluster = action.payload.cluster;
      state.agentId = action.payload.id;
      state.email = action.payload.email;
      state.profileUrl = action.payload.profileUrl;
      state.role = action.payload.role;
      state.lastName = action.payload.lastName;
      state.firstName = action.payload.firstName;
      state.phoneNumber = action.payload.phoneNumber;
      state.coverageArea = action.payload.coverageArea;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAgent.fulfilled, (state, action) => {
        state.loading = false;
        state.agents = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(fetchAllAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })

      .addCase(fetchAllAgentByRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAgentByRole.fulfilled, (state, action) => {
        state.loading = false;
        state.agentsByRoleId = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(fetchAllAgentByRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })

      .addCase(fetchAllAgentRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAgentRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.agentRoles = action.payload.data;
      })
      .addCase(fetchAllAgentRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })

      .addCase(fetchAgentSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgentSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.agents = action.payload.data;
      })
      .addCase(fetchAgentSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export const { updateCurrentAgent } = agentSlice.actions;

export default agentSlice.reducer;
