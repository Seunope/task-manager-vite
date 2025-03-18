import { toast } from 'react-toastify';
import { initialProductState, ProductSliceType } from '../redux/reducers/productSlice';
import {
  AssignedAgents,
  BasicType,
  BusinessAcquisitionDTo,
  ProductInternalInventory,
  SalesRepBusinessData,
  TeleSaleRepBusinessData,
} from './types';

export const getAuthToken = () => {
  const token = JSON.parse(localStorage.getItem('authToken') as string);
  if (!token) {
    throw new Error('No auth token found');
  }
  return token;
};

export const authUser = () => {
  const user = JSON.parse(localStorage.getItem('user') as string);
  if (!user) {
    return null;
  }
  return user;
};

export const upperCaseFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatAmount = (
  num: number,
  withDecimal: boolean = false,
  decimalPlace: number = 2,
  hide: boolean = false,
  hideSymbol = false,
) => {
  if (isNaN(num)) {
    return '____';
  }
  if (hide) {
    return '--,---';
  }
  const didNumber = Number(num);
  let newValue = null;
  if (withDecimal) {
    newValue = didNumber.toLocaleString('en-US', {
      minimumFractionDigits: decimalPlace,
      maximumFractionDigits: decimalPlace,
    });
  } else {
    newValue = didNumber.toLocaleString('en-US');
  }

  if (hideSymbol) {
    return newValue;
  }
  return `₦${newValue}`;
};

export const formatDate = (dateInput: string, showTime?: boolean) => {
  if (showTime) {
    return new Date(dateInput).toLocaleString('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  } else {
    return new Date(dateInput).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'UTC',
    });
  }
};

export type formatSkuForSaleItem = {
  id: string;
  inStock?: boolean;
  packType?: string;
  selling?: boolean;
  wholesalerProductSkus: string;
  name: string;
  price: number;
  updatedAt: Date;
  description: string;
  inventoryLevel: number;
  unitOfMeasureInPack?: string;
  averageRating: string | number;
  skuImage: { fullImageUrl: string };
  subCategory: BasicType;
  itemCount: number;
  quantityInPack: number;
  openRetailPrice: {
    productSkuId: string;
    discountType: string;
    openRetailDiscounts: string;
    sellingPrice: number;
    priceModificationHistory: number;
    leastRecommendedRetailPrice: number;
  };
  productInternalInventory?: ProductInternalInventory;
  product: ProductSliceType;
  brand: {
    company: string;
  };
};

export const formatSkuForSale = (item: formatSkuForSaleItem, businessId: string) => {
  return {
    businessId,
    productName: item.name,
    itemCount: item?.itemCount,
    description: item.description,
    quantityInPack: item?.quantityInPack,
    averageRating: item.averageRating,
    image: item.skuImage.fullImageUrl,
    subCategoryId: item.subCategory.id,
    productId: item.openRetailPrice.productSkuId,
    discountType: item.openRetailPrice.discountType,
    productSkuId: item.openRetailPrice.productSkuId,
    discount: item.openRetailPrice.openRetailDiscounts,
    price: item.openRetailPrice.sellingPrice || item.openRetailPrice.leastRecommendedRetailPrice,
    product: initialProductState,
    brand: item?.brand.company,
  };
};

export const formatPaymentMethod = (type: string) => {
  if (type == 'On_Delivery') {
    return 'On delivery';
  }
  if (type == 'Advance_payment') {
    return 'Advance payment';
  }
  if (type == 'Buy_Now_Pay_Later') {
    return 'Buy now pay later payment';
  }
  return 'Other methods';
};

export const normalizePhoneNumber = (phoneNumber: string) => {
  const phone = phoneNumber?.replace(/ /g, '');
  let newVal = phone;
  if (phone?.includes('+234')) {
    const temp = phone?.split('+234');
    newVal = `0${temp[1]}`;
  }
  if (phone?.includes('234')) {
    const temp = phone?.split('234');
    newVal = `0${temp[1]}`;
  }
  return newVal;
};

export const formatPhoneNumber = (phoneNumber: string) => {
  const phone = phoneNumber.replace(/ /g, '');
  let newVal = phone;

  if (phone.startsWith('0')) {
    newVal = `234${phone.slice(1)}`;
  } else if (/^[987]/.test(phone)) {
    newVal = `234${phone}`;
  }
  return newVal;
};

export function removeEmptyValues(obj: BusinessAcquisitionDTo): Partial<BusinessAcquisitionDTo> {
  return Object.fromEntries(
    Object.entries(obj)
      .map(([key, value]) => {
        if (
          value !== '' &&
          value !== null &&
          value !== undefined &&
          !(typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0)
        ) {
          return [
            key,
            typeof value === 'object' && !Array.isArray(value) ? removeEmptyValues(value) : value,
          ];
        }
        return null;
      })
      .filter((entry): entry is [string, unknown] => entry !== null),
  ) as Partial<BusinessAcquisitionDTo>;
}

export const getOneAgentRole = (allRoles: BasicType[], agentRole: string) => {
  if (!allRoles) {
    toast.error('No data found');
    throw new Error('No data found');
  } else {
    const foundAgent = allRoles.find((el: BasicType) => {
      if (el.name === agentRole) {
        return el;
      }
    });
    return foundAgent?.id;
  }
};

export const getSalesRep = (item: SalesRepBusinessData) => {
  const salesRep = item?.assignedAgents?.find(
    (agent: AssignedAgents) => agent?.assignedRole?.name === 'Sales Representative',
  );

  const salesRepName = salesRep
    ? `${salesRep?.internalUser?.firstName} ${salesRep?.internalUser?.lastName}`
    : 'N/A';

  return salesRepName;
};

export const getTeleSales = (item: TeleSaleRepBusinessData) => {
  const teleSales = item?.assignedAgents?.find(
    (agent: AssignedAgents) => agent?.assignedRole?.name === 'Tele Sales Agent',
  );

  const teleSalesName = teleSales
    ? `${teleSales?.internalUser?.firstName} ${teleSales?.internalUser?.lastName}`
    : 'N/A';

  return teleSalesName;
};
