import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  FilterParamsType,
  PaginationAgentDTO,
  PaginationAssignShopDTO,
  PaginationDTO,
} from '../../utils/types';
import { getAuthToken } from '../../utils/utils';
import axios from 'axios';
import {
  GET_AGENT_ON_BOARDED_CUSTOMERS,
  GET_ALL_AGENT_CUSTOMERS,
  GET_ALL_BUSINESS,
  GET_ALL_BUSINESS_COVERAGE_AND_CLUSTER,
  GET_ALL_CHANNELS,
  GET_BUSINESS_CONTACT_DETAILS,
  GET_MY_ASSIGNED_CUSTOMERS,
  GET_MY_CALL_PLANS,
  GET_MY_ON_BOARDED_CUSTOMERS,
  GET_MY_VISIT_PLANS,
  SEARCH_ALL_BUSINESS,
} from '../../api/http';
import { GetFunc } from '../../api/http-mthd';

export const fetchRetailers = createAsyncThunk(
  'business/fetchRetailers',
  async (dto: PaginationDTO) => {
    const token = getAuthToken();
    const response = await axios.get(GET_ALL_BUSINESS(dto.type, dto.page, dto.limit), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

export const fetchWholesalers = createAsyncThunk(
  'business/fetchWholesalers',
  async (dto: PaginationDTO) => {
    const token = getAuthToken();
    const response = await axios.get(GET_ALL_BUSINESS(dto.type, dto.page), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

export const fetchChannels = createAsyncThunk('business/fetchChannels', async () => {
  const token = getAuthToken();
  const response = await axios.get(GET_ALL_CHANNELS, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const fetchSearchAllCustomers = createAsyncThunk(
  'business/fetchSearchAllCustomers',
  async (dto: FilterParamsType) => {
    // const token = getAuthToken();
    const response = await axios.get(
      SEARCH_ALL_BUSINESS(dto.type, dto.page, dto.limit, dto.search, dto?.assignedAgentId),
    );
    return response.data;
  },
);

export const fetchAgentCustomersWithClusterAndCoverage = createAsyncThunk(
  'business/fetchAgentCustomersWithClusterAndCoverage',
  async (dto: PaginationAssignShopDTO) => {
    // console.log('agentId', agentId)
    const token = getAuthToken();
    const response = await axios.get(
      GET_ALL_BUSINESS_COVERAGE_AND_CLUSTER(
        dto?.limit,
        dto?.page,
        dto?.type,
        dto?.cluster,
        dto.coverageArea,
        dto?.assignedAgentId,
      ),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // console.log('GET_AGENT_CUSTOMERS_WITH', response.data);
    return response.data;
  },
);

export const fetchAllAgentCustomers = createAsyncThunk(
  'business/fetchAllAgentCustomers',
  async (dto: Partial<PaginationAgentDTO>) => {
    // console.log('agentId', agentId)
    const token = getAuthToken();
    const response = await axios.get(
      GET_ALL_AGENT_CUSTOMERS(dto?.agentId as string, dto?.page, dto?.limit),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log('GET_ALL_AGENT_CUSTOMERS', response.data);
    return response.data;
  },
);

export const fetchAgentOnBoardedCustomers = createAsyncThunk(
  'business/fetchAgentOnBoardedCustomers',
  async (filterQueryParams: FilterParamsType) => {
    const { agentId, toDate, fromDate, limit, page, search, internalUserId } = filterQueryParams;
    try {
      const response = await GetFunc(
        GET_AGENT_ON_BOARDED_CUSTOMERS({
          page,
          limit,
          search,
          agentId,
          toDate,
          fromDate,
          internalUserId,
        }),
      );

      return response?.data;
    } catch (error) {}
  },
);

export const fetchAllBusiness = createAsyncThunk(
  'business/fetchAllBusiness',
  async (dto: PaginationDTO) => {
    const token = getAuthToken();
    const response = await axios.get(GET_ALL_BUSINESS(dto.type, dto.page, dto.limit), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

export const fetchMyAssignedCustomers = createAsyncThunk(
  'business/fetchMyAssignedCustomers',
  async (dto: PaginationDTO) => {
    const token = getAuthToken();
    const response = await axios.get(
      GET_MY_ASSIGNED_CUSTOMERS(dto.type, dto.page, dto.limit, dto?.search),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  },
);

export const fetchMyOnBoardedCustomers = createAsyncThunk(
  'business/fetchMyOnBoardedCustomers',
  async (dto: PaginationDTO) => {
    const token = getAuthToken();
    const response = await axios.get(GET_MY_ON_BOARDED_CUSTOMERS(dto.page, dto.limit), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

export const fetchBusinessContactDetails = createAsyncThunk(
  'business/fetchBusinessContactDetails',
  async (businessContactId: string) => {
    try {
      const response = await GetFunc(GET_BUSINESS_CONTACT_DETAILS(businessContactId));
      return response.data;
    } catch (error) {
      console.log(`Error fetching customer: ${error}`);
    }
  },
);

//VISIT PLANS
export const fetchMyVisitPlans = createAsyncThunk(
  'business/fetchMyVisitPlans',
  async (filterQueryParams: FilterParamsType) => {
    const { toDate, fromDate, limit, page, search, internalUserId } = filterQueryParams;
    try {
      const response = await GetFunc(
        GET_MY_VISIT_PLANS({ page, limit, search, toDate, fromDate, internalUserId }),
      );

      return response?.data;
    } catch (error) {}
  },
);

// CALL PLANS
export const fetchMyCallPlans = createAsyncThunk(
  'business/fetchMyCallPlans',
  async (filterQueryParams: FilterParamsType) => {
    const { toDate, fromDate, limit, page, search } = filterQueryParams;
    try {
      const response = await GetFunc(GET_MY_CALL_PLANS({ page, limit, search, toDate, fromDate }));
      return response.data;
    } catch (error) {}
  },
);
