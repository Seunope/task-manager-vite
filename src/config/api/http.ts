import {
  AssignPickUpDTO,
  BusinessAcquisitionDTo,
  FilterParamsType,
  FormDataSKUProductDTO,
  InventoryFormDataDTO,
  PurchaseRequisitionDTO,
  SKUPriceModifyDTO,
} from '../utils/types';
import { GetFunc, PatchFunc, PostFunc, PutFunc } from './http-mthd';

const BASE_URL = import.meta.env.VITE_API_URL;
// const BASE_URL = 'https://prod-backend.openretail.nl/api';
const NEW_BASE_URL = import.meta.env.VITE_API_URL_V1;

export const LOGIN_USER = `${NEW_BASE_URL}/v1/internal-user/login`;
export const CREATE_AGENT = `${NEW_BASE_URL}/v1/internal-user/signup`;
export const GET_ALL_AGENT = (page?: number, limit = 10) => {
  return `${NEW_BASE_URL}/v1/internal-user?page=${page}&limit=${limit}`;
};
export const GET_ONE_AGENT = (userId: string) => {
  return `${NEW_BASE_URL}/v1/internal-user/user/${userId}`;
};
export const SEARCH_FOR_AGENT = (search?: string, page = 1) => {
  return `${NEW_BASE_URL}/v1/internal-user?search=${search}&page=${page}`;
};

export const GET_ALL_AGENT_BY_ROLE = (id?: string, page = 1) => {
  return `${NEW_BASE_URL}/v1/internal-user?roleId=${id}&page=${page}`;
};
export const UPDATE_USER = () => `${NEW_BASE_URL}/v1/internal-user/me`;
// export const UPDATE_USER = (userId: string) => `${NEW_BASE_URL}/v1/internal-user/${userId}`;
export const UPDATE_PASSWORD = `${NEW_BASE_URL}/v1/internal-user/change-password`;
export const ALL_AGENT_ROLES = `${NEW_BASE_URL}/v1/internal-user/roles`;

export const GET_ALL_BUSINESS_COVERAGE_AND_CLUSTER = (
  limit = 50,
  page = 1,
  type?: string,
  cluster?: string,
  coverageArea?: string,
  assignedAgentId?: string,
) => {
  if (!assignedAgentId && !cluster && !coverageArea) {
    // console.log(`${BASE_URL}/v1/customers/get-all?page=${page}&limit=${limit}`);
    return `${NEW_BASE_URL}/v1/internal-user/businesses?page=${page}&limit=${limit}&type=${type}`;
  } else if (assignedAgentId && !cluster && !coverageArea) {
    return `${NEW_BASE_URL}/v1/internal-user/businesses?assignedAgentId=${assignedAgentId}&page=${page}&limit=${limit}&type=${type}`;
  } else if (!assignedAgentId && cluster && !coverageArea) {
    return `${NEW_BASE_URL}/v1/internal-user/businesses?cluster=${cluster}&page=${page}&limit=${limit}&type=${type}`;
  } else if (coverageArea && !assignedAgentId && !cluster) {
    return `${NEW_BASE_URL}/v1/internal-user/businesses?coverageArea=${coverageArea}&page=${page}&limit=${limit}&type=${type}`;
  } else {
    return `${NEW_BASE_URL}/v1/internal-user/businesses?coverageArea=${coverageArea}&cluster=${cluster}&assignedAgentId=${assignedAgentId}&page=${page}&limit=${limit}&type=${type}`;
  }
};

export const GET_ALL_BUSINESS = (type?: string, page = 1, limit = 50) => {
  return `${NEW_BASE_URL}/v1/internal-user/businesses?page=${page}&limit=${limit}&type=${type}`;
};

// export const GET_ALL_RETAILERS = (page = 1, limit = 50) => {
//   return `${NEW_BASE_URL}/v1/internal-user/businesses?page=${page}&limit=${limit}&type=retailer`;
// };
export const SIGNUP_CUSTOMER = `${NEW_BASE_URL}/v1/internal-user/businesses`;
export const GET_ALL_CHANNELS = `${NEW_BASE_URL}/v1/businesses/channels?limit=50`;
// export const GET_ALL_WHOLESALER = (page: number, limit = 10) => {
//   return `${NEW_BASE_URL}/v1/internal-user/businesses?page=${page}&limit=${limit}&type=wholesaler`;
// };

export const SEARCH_ALL_BUSINESS = (
  type?: string,
  page = 1,
  limit = 50,
  search?: string,
  assignedAgentId?: string,
) => {
  let url = `${NEW_BASE_URL}/v1/internal-user/businesses
?page=${page}&limit=${limit}&type=${type}`;
  if (assignedAgentId) {
    url = url + `&assignedAgentId=${assignedAgentId}`;
  }
  if (search) {
    url = url + `&search=${search}`;
  }
  return url;
};

// export const GET_ALL_SHOPS = (page = 1, limit = 50) => {
//   return `${BASE_URL}/v1/customers/get-all?page=${page}&limit=${limit}`;
// };

export const GET_MY_ASSIGNED_CUSTOMERS = (
  type?: string,
  page = 1,
  limit = 50,
  search?: string,
  assignedAgentId?: string,
) => {
  let url = `${NEW_BASE_URL}/v1/internal-user/businesses?page=${page}&limit=${limit}&type=${type}`;
  if (search) {
    url = `${url}&search=${search}`;
  }
  if (assignedAgentId) {
    url = `${url}&assignedAgentId=${assignedAgentId}`;
  }
  return url;
};

export const GET_MY_ASSIGNED_CUSTOMER_BY_ID = (assignedAgentId: string) => {
  return `${NEW_BASE_URL}/v1/internal-user/businesses?assignedAgentId=${assignedAgentId}`;
};
export const GET_BUSINESS_CONTACT_DETAILS = (businessContactId: string) => {
  return `${NEW_BASE_URL}/v1/internal-user/businesses?businessContactId=${businessContactId}`;
};

// export const SEARCH_MY_ASSIGNED_CUSTOMERS = (query: string) => {
//   return `${BASE_URL}/v1/users/search-my-customer?query=${query}`;
// };

export const GET_MY_VISIT_PLANS = ({
  page = 1,
  limit = 50,
  search,
  toDate,
  output,
  fromDate,
  internalUserId,
}: FilterParamsType) => {
  let url = `${NEW_BASE_URL}/v1/visit-plans?sortField=createdAt&sortOrder=desc&page=${page}&limit=${limit}`;
  if (search) {
    url = `${url}&search=${search}`;
  }
  if (fromDate) {
    url = `${url}&toDate=${toDate}&fromDate=${fromDate}`;
  }
  if (internalUserId) {
    url = `${url}&internalUserId=${internalUserId}`;
  }
  if (output) {
    url = `${url}&output=${output}`;
  }
  return url;
};

export const BACK_OFFICE_SET_VISIT_PLANS = `${NEW_BASE_URL}/v1/visit-plans/bulk-create`;
export const START_VISIT = (id: string) => `${NEW_BASE_URL}/v1/visit-plans/${id}/start`;
export const END_VISIT = (id: string) => `${NEW_BASE_URL}/v1/visit-plans/${id}/end`;

export const GET_MY_CALL_PLANS = ({
  page = 1,
  limit = 50,
  search,
  toDate,
  output,
  fromDate,
  internalUserId,
}: FilterParamsType) => {
  let url = `${NEW_BASE_URL}/v1/call-plans?sortField=createdAt&sortOrder=desc&page=${page}&limit=${limit}`;
  if (search) {
    url = `${url}&search=${search}`;
  }
  if (fromDate) {
    url = `${url}&toDate=${toDate}&fromDate=${fromDate}`;
  }
  if (internalUserId) {
    url = `${url}&internalUserId=${internalUserId}`;
  }
  if (output) {
    url = `${url}&output=${output}`;
  }
  return url;
};

export const BACK_OFFICE_SET_CALL_PLANS = `${NEW_BASE_URL}/v1/call-plans/bulk-create`;
export const START_CALL = (id: string) => `${NEW_BASE_URL}/v1/call-plans/${id}/start`;
export const END_CALL = (id: string) => `${NEW_BASE_URL}/v1/call-plans/${id}/end`;

export const GET_ALL_AGENT_CUSTOMERS = (agentId: string, page = 1, limit = 50) => {
  return `${NEW_BASE_URL}/v1/internal-user/businesses
  ?assignedAgentId=${agentId}&page=${page}&limit=${limit}`;
};

export const GET_MY_ON_BOARDED_CUSTOMERS = (page = 1, limit = 50) => {
  return `${BASE_URL}/v1/users/get-my-onboarded-customers?page=${page}&limit=${limit}`;
};

export const GET_AGENT_ON_BOARDED_CUSTOMERS = ({
  page = 1,
  limit = 50,
  search,
  toDate,
  output,
  agentId,
  fromDate,
  internalUserId,
}: FilterParamsType) => {
  let url = `${NEW_BASE_URL}/v1/internal-user/businesses?assignedAgentId=${agentId}&page=${page}&limit=${limit}&sortOrder=desc&sortField=createdAt`;
  if (search) {
    url = `${url}&search=${search}`;
  }
  if (fromDate) {
    url = `${url}&toDate=${toDate}&fromDate=${fromDate}`;
  }
  if (internalUserId) {
    url = `${url}&internalUserId=${internalUserId}`;
  }
  if (output) {
    url = `${url}&output=${output}`;
  }
  return url;
};

export const ASSIGN_SHOPS_TO_AGENT = (userId: string) => {
  return `${NEW_BASE_URL}/v1/internal-user/${userId}/businesses/assign`;
};

export const MODIFY_AGENT_LGA_AND_LCDA = (agentId: string) => {
  return `${NEW_BASE_URL}/v1/internal-user/${agentId}`;
};

export const GET_WHOLESALER_SKU = (id: string) => {
  return `${BASE_URL}/v1/wholesaler-sku/get-all/${id}`;
};
export const GET_WHOLESALER_SKU_SUBCATEGORY = (id: string, subCategoryId?: string) => {
  if (subCategoryId) {
    return `${BASE_URL}/v1/wholesaler-sku/get-all/${id}?subCategoryId=${subCategoryId}`;
  } else {
    return `${BASE_URL}/v1/wholesaler-sku/get-all/${id}`;
  }
};

export const CREATE_SKU = `${BASE_URL}/v1/sku/create`;
export const GET_ALL_PRODUCTS = `${BASE_URL}/v1/product/get-all`;
export const GET_ALL_CATEGORIES = `${BASE_URL}/v1/category/get-all`;
export const GET_ALL_SUBCATEGORIES = () => {
  return `${BASE_URL}/v1/sub-category/get-all?limit=100`;
};
export const GET_ALL_SKUS = (page: number, limit = 10) => {
  if (page) {
    return `${BASE_URL}/v1/sku/get-all?page=${page}&limit=${limit}`;
  }
  return `${BASE_URL}/v1/sku/get-all`;
};
export const SKU_SEARCH_LIST = (query: string) => {
  return `${BASE_URL}/v1/sku/search?limit=all&query=${query}`;
};

export const SEARCH_SKU_WITH_PRICE = (query: string) => {
  return `${BASE_URL}/v1/sku/search-sku-with-price?limit=all&query=${query}`;
};

export const GET_ALL_BRANDS = `${BASE_URL}/v1/brand/get-all`;

export const SKU_AVAILABLE_FOR_SALE = (subCategoryId?: string, page?: number, limit = 50) => {
  if (!subCategoryId && !page) {
    return `${BASE_URL}/v1/sku/get-all-selling?limit=${limit}`;
  } else if (subCategoryId) {
    return `${BASE_URL}/v1/sku/get-all-selling?subCategoryId=${subCategoryId}&page=${page}&limit=${limit}`;
  } else if (page) {
    return `${BASE_URL}/v1/sku/get-all-selling?page=${page}&limit=${limit}`;
  } else null;
};

export const WHOLESALER_ADD_NEW_SKU = `${BASE_URL}/v1/wholesaler-sku/create`;
export const WHOLESALER_PRICE_UPDATE = (id: string) => {
  return `${BASE_URL}/v1/wholesaler-sku/update/${id}`;
};
export const GET_SKU_BY_SUBCATEGORYID = (id: string, page: number, limit = 10) => {
  return `${BASE_URL}/v1/sku/get-all?subCategoryId=${id}&page=${page}&limit=${limit}`;
};

export const GET_SKU_SEARCH = (query: string, page: number, limit = 10) => {
  return `${BASE_URL}/v1/sku/search?query=${query}&page=${page}&limit=${limit}`;
};

export const ADD_TO_CART = `${BASE_URL}/v1/cart/add-to-cart`;
export const REMOVE_FROM_CART = `${BASE_URL}/v1/cart/remove`;
export const CLEAR_CART = (cartId: string) => {
  return `${BASE_URL}/v1/cart/clear/${cartId}`;
};

export const GET_CUSTOMER_CART = (id: string) => {
  return `${BASE_URL}/v1/cart/get-customer-cart/${id}`;
};

export const VERIFY_OTP = `${NEW_BASE_URL}/v1/businesses/contacts/verify-otp`;
export const RESEND_OTP = `${NEW_BASE_URL}/v1/businesses/contacts/send-otp`;
export const FORGOT_PASSWORD = `${NEW_BASE_URL}/v1/internal-user/forgot-password`;
export const RESET_PASSWORD = () => {
  return `${NEW_BASE_URL}/v1/internal-user/reset-password`;
};

// export const PRICE_MODIFICATION = () => {
//   return `${BASE_URL}/v1/price/update`;
// };

export const CREATE_ORDER = `${BASE_URL}/v1/order/create`;
export const GET_ALL_ORDER_BY_CUSTOMER = ({
  businessId,
  page,
  limit,
}: {
  businessId: string;
  page: number;
  limit: number;
}) => {
  if (page) {
    return `${BASE_URL}/v1/order/get-all-customer-orders/${businessId}?page=${page}&limit=${limit}`;
  }
  return `${BASE_URL}/v1/order/get-all-customer-orders/${businessId}?limit=${limit}`;
};

export const GET_ALL_ORDERS = (date: string, status: string, page: number) => {
  if (date) {
    return `${BASE_URL}/v1/order/get-all?date=${date}&page=${page}`;
  }
  if (status) {
    return `${BASE_URL}/v1/order/get-all?status=${status}&page=${page}`;
  }
  return `${BASE_URL}/v1/order/get-all?page=${page}`;
};

export const GET_ORDER_BY_ID = (orderId: string) => {
  return `${BASE_URL}/v1/order/get/${orderId}`;
};

// export const GET_PURCHASE_REQUISITIONS = `${BASE_URL}/v1/pr/get`;

export const GET_PURCHASE_REQUISITIONS = (date: string, status: string, page: number) => {
  if (date) {
    return `${BASE_URL}/v1/pr/get?date=${date}&page=${page}`;
  }
  if (status) {
    return `${BASE_URL}/v1/pr/get?status=${status}&page=${page}`;
  }
  return `${BASE_URL}/v1/pr/get?page=${page}`;
};

export const GET_PURCHASE_REQUISITION_SKU = (skuId?: string) => {
  return `${BASE_URL}/v1/sku/list-wholesler-prices/${skuId}`;
};

export const CREATE_PURCHASE_REQUISITION = async (data: PurchaseRequisitionDTO) => {
  const url = `${BASE_URL}/v1/pr/create`;
  return await PostFunc(url, data);
};

export const UPDATE_PURCHASE_REQUISITION = async (data: PurchaseRequisitionDTO) => {
  const url = `${BASE_URL}/v1/pr/update`;
  return await PutFunc(url, data);
};

// export const DOWNLOAD_PURCHASE_REQUISITION = async (date: string) => {
//   const url = `${BASE_URL}/v1/pr/download?date=${date}`;
//   return await GetFunc(url);
// };

export const DOWNLOAD_PURCHASE_REQUISITION = (date: string) => {
  return `${BASE_URL}/v1/pr/download?date=${date}`;
};

export const DOWNLOAD_ORDER_BOOK = `${BASE_URL}/v1/order/order-book-export`;
export const DOWNLOAD_BUYING_LIST = `${BASE_URL}/v1/order/order-book-export`;

export const INVENTORY_GET_ALL = (page = 1, limit = 50) => {
  return `${BASE_URL}/v1/inventory/get-all?page=${page}&limit=${limit}`;
};

export const INVENTORY_BY_SKU_ID = (skuId: string) => {
  return `${BASE_URL}/v1/inventory/get-by-sku/${skuId}`;
};

export const GET_PICK_UP_LIST = (date: string, status: string, page: number) => {
  if (date) {
    return `${BASE_URL}/v1/pickup/get?date=${date}&page=${page}`;
  }
  if (status) {
    return `${BASE_URL}/v1/pickup/get?status=${status}&page=${page}`;
  }
  return `${BASE_URL}/v1/pickup/get?page=${page}`;
};

export const GET_SKU_PICK_UP_DETAILS_RAW = (skuId: string) => {
  return `${BASE_URL}/v1/pickup/get/${skuId}`;
};

export const GET_ASSIGNED_PICK_UP_LIST = (
  date: string,
  status: string,
  page: number,
  driverId?: string,
) => {
  if (driverId) {
    return `${BASE_URL}/v1/pickup/assigned?driverId=${driverId}&page=${page}`;
  }
  if (date) {
    return `${BASE_URL}/v1/pickup/assigned?date=${date}&page=${page}`;
  }
  if (status) {
    return `${BASE_URL}/v1/pickup/assigned?status=${status}&page=${page}`;
  }
  return `${BASE_URL}/v1/pickup/assigned?page=${page}`;
};

/// ******************** Clean way***************************** *///
export const ADD_TO_CART_2 = async (data: unknown) => {
  const url = ADD_TO_CART;
  return await PostFunc(url, data);
};

export const REMOVE_FROM_CART_2 = async (data: unknown) => {
  const url = REMOVE_FROM_CART;
  return await PutFunc(url, data);
};
export const SKU_IS_SELLING = async (skuId: string, selling: boolean) => {
  const url = `${BASE_URL}/v1/sku/update/${skuId}`;
  return await PutFunc(url, { selling });
};

export const SKU_IS_SOLD_OUT = async (skuId: string, inStock: boolean) => {
  const url = `${BASE_URL}/v1/sku/update/${skuId}`;
  return await PutFunc(url, { inStock });
};

export const CREATE_INVENTORY = async (data: InventoryFormDataDTO) => {
  const url = `${BASE_URL}/v1/inventory/create`;
  return await PostFunc(url, data);
};

export const ADD_INVENTORY = async (data: InventoryFormDataDTO) => {
  const url = `${BASE_URL}/v1/inventory/add`;
  return await PutFunc(url, data);
};

export const REMOVE_INVENTORY = async (data: InventoryFormDataDTO) => {
  const url = `${BASE_URL}/v1/inventory/remove`;
  return await PutFunc(url, data);
};

export const PRICE_MODIFICATION = async (data: SKUPriceModifyDTO) => {
  const url = `${BASE_URL}/v1/price/update`;
  return await PutFunc(url, data);
};

export const UPDATE_BUSINESS_PROFILE = async (
  data: Partial<BusinessAcquisitionDTo>,
  businessId: string,
) => {
  const url = `${NEW_BASE_URL}/v1/businesses/${businessId}`;
  return await PatchFunc(url, data);
};

export const UPDATE_PRODUCT_SKU = async (data: Partial<FormDataSKUProductDTO>, skuId: string) => {
  const url = `${BASE_URL}/v1/sku/update/${skuId}`;
  // console.log('url', url);
  // console.log('data', data);
  return await PutFunc(url, data);
};

export const GET_SKU_PICK_UP_DETAILS = async (skuId: string) => {
  const url = `${BASE_URL}/v1/pickup/get/${skuId}`;
  return await GetFunc(url);
};

export const CREATE_PICK_UP = async (data: AssignPickUpDTO) => {
  const url = `${BASE_URL}/v1/pickup/create`;
  return await PostFunc(url, data);
};
