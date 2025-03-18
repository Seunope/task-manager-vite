import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import {
  ALL_AGENT_ROLES,
  GET_ALL_AGENT,
  GET_ALL_AGENT_BY_ROLE,
  SEARCH_FOR_AGENT,
} from '../../api/http';
import { getAuthToken } from '../../utils/utils';
import { PaginationAgentDTO } from '../../utils/types';

export const fetchAllAgent = createAsyncThunk('agent/fetchAllAgent', async (page?: number) => {
  const token = getAuthToken();
  const response = await axios.get(GET_ALL_AGENT(page), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data;
});

export const fetchAgentSearch = createAsyncThunk(
  'agent/fetchAgentSearch',
  async (dto: PaginationAgentDTO) => {
    const token = getAuthToken();
    const response = await axios.get(SEARCH_FOR_AGENT(dto.search, dto.page), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },
);

export const fetchAllAgentRoles = createAsyncThunk('agent/fetchAllAgentRoles', async () => {
  const token = getAuthToken();
  const response = await axios.get(ALL_AGENT_ROLES, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data;
});

export const fetchAllAgentByRole = createAsyncThunk(
  'agent/fetchAllAgentByRole',
  async (dto: PaginationAgentDTO) => {
    const token = getAuthToken();
    const response = await axios.get(GET_ALL_AGENT_BY_ROLE(dto.id, dto.page), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  },
);
