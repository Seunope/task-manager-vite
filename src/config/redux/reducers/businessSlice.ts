import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BusinessSliceDTO } from '../../utils/types';
import {
  fetchAgentCustomersWithClusterAndCoverage,
  fetchAgentOnBoardedCustomers,
  fetchAllAgentCustomers,
  fetchAllBusiness,
  fetchChannels,
  fetchBusinessContactDetails,
  fetchMyAssignedCustomers,
  fetchMyOnBoardedCustomers,
  fetchMyVisitPlans,
  fetchRetailers,
  fetchSearchAllCustomers,
  fetchWholesalers,
  fetchMyCallPlans,
} from '../actions/businessActions';

const initialState: BusinessSliceDTO = {
  error: null,
  loading: false,
  business: {
    //selected biz
    id: '',
    name: '',
    type: 'retailer',
    channelId: '',
    yearEstablished: '',
    phones: [],
    whatsapps: [],
    logoUrl: '',
    streetName: '',
    landmark: '',
    lcda: '',
    lga: '',
    state: '',
    country: '',
    longitude: '',
    channel: {
      name: '',
    },
    latitude: '',
    hasSignedTerms: false,
    businessContactId: '',
    createdByUserId: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: '',
    isPhoneVerified: false,
    businessContact: {
      id: '',
      profileUrl: null,
      firstName: '',
      lastName: '',
      phoneNumber: '',
    },
    assignedAgents: [],
    visitPlan: {
      frequency: '',
      startDate: '',
    },
    callPlan: {
      frequency: '',
      startDate: '',
    },
  },
  businesses: [],
  pagination: {
    page: 1,
    limit: 50,
    businessId: '',
    pageCount: 0,
    // totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  },
  visitPlans: [],
  callPlans: [],
  allChannels: [],
  businessContact: {
    streetName: '',
    type: '',
    name: '',
    businessContact: {
      id: '',
      firstName: '',
      lastName: '',
      profileUrl: '',
      phoneNumber: '',
    },
    firstName: '',
    lastName: '',
    password: '',
    phoneNumber: '',
    profileUrl: '',
    email: '',
    gender: '',
  },
  assignCustomerIds: [],
};

export const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    updateCurrentBusiness(state, action) {
      state.business = action.payload;
    },
    selectAllShops(state, action: PayloadAction<string[]>) {
      if (state.assignCustomerIds?.length > 0) {
        const newIds = action?.payload;
        const combinedIds = Array.from(new Set([...state.assignCustomerIds, ...newIds]));
        state.assignCustomerIds = combinedIds;
      } else {
        state.assignCustomerIds = action.payload;
      }
    },
    deselectAllShops(state, action: PayloadAction<string[]>) {
      const deselectedIds = action.payload;
      state.assignCustomerIds = state.assignCustomerIds?.filter(
        (id) => !deselectedIds.includes(id),
      );
    },
    clearAllShops: (state) => {
      state.assignCustomerIds = [];
    },
    selectOneShop(state, action: PayloadAction<string>) {
      console.log('HandleOneShop', action.payload);
      if (!state.assignCustomerIds?.includes(action.payload)) {
        state.assignCustomerIds?.push(action.payload);
      }
    },
    deselectOneShop(state, action: PayloadAction<string>) {
      state.assignCustomerIds = state.assignCustomerIds?.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBusiness.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.businesses = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(fetchAllBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })
      .addCase(fetchRetailers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRetailers.fulfilled, (state, action) => {
        state.loading = false;
        state.businesses = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(fetchRetailers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })
      .addCase(fetchWholesalers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWholesalers.fulfilled, (state, action) => {
        state.loading = false;
        state.businesses = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(fetchWholesalers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })
      .addCase(fetchChannels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.loading = false;
        state.allChannels = action.payload.data;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })
      .addCase(fetchSearchAllCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchAllCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.businesses = action.payload.data;
        // state.wholesalers = action.payload.data;
        // state.retailers = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(fetchSearchAllCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })
      .addCase(fetchAgentCustomersWithClusterAndCoverage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgentCustomersWithClusterAndCoverage.fulfilled, (state, action) => {
        state.loading = false;
        state.businesses = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(fetchAgentCustomersWithClusterAndCoverage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })

      .addCase(fetchAllAgentCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAgentCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.businesses = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(fetchAllAgentCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })

      .addCase(fetchAgentOnBoardedCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgentOnBoardedCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.businesses = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(fetchAgentOnBoardedCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })

      .addCase(fetchMyAssignedCustomers.pending, (state) => {
        state.loading = true;
        state.businesses = [];
        state.error = null;
      })
      .addCase(fetchMyAssignedCustomers.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.businesses = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(fetchMyAssignedCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })

      .addCase(fetchMyOnBoardedCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOnBoardedCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.businesses = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(fetchMyOnBoardedCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })

      .addCase(fetchBusinessContactDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBusinessContactDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.businessContact = action.payload.data;
        state.business = action.payload.data[0];
        state.pagination = action.payload.meta;
      })
      .addCase(fetchBusinessContactDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })
      .addCase(fetchMyVisitPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyVisitPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.visitPlans = action?.payload?.data;
        state.pagination = action?.payload?.meta;
      })
      .addCase(fetchMyVisitPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })
      .addCase(fetchMyCallPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyCallPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.callPlans = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(fetchMyCallPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export const {
  updateCurrentBusiness,
  selectAllShops,
  deselectAllShops,
  selectOneShop,
  deselectOneShop,
  clearAllShops,
} = businessSlice.actions;

export default businessSlice.reducer;
