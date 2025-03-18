import { ProductSliceType } from '../../config/redux/reducers/productSlice';

export type ErrorType = {
  message?: string | null;
};

export type Channel = {
  name: string;
  id?: string;
  createdAt?: string;
  businessType?: string;
  updatedAt?: string;
};

export type BasicType = {
  id: string;
  name: string;
};

export type BusinessType = 'retailer' | 'wholesaler' | 'Retailer' | 'Wholesaler';

export type BusinessDTO = {
  imageUrl: string;
  businessName: string;
  type: { name: string };
  channel: Channel;
};

// export type WholeSalerDTO = {
//   id: string;
//   name: string;
//   logoUrl: string;
//   type: string;
//   isVerified: boolean;
//   lcda: string;
//   category: string;
//   visited: string;
//   createdAt: string;
//   phoneNumber: string;
//   distributorBuyingPrice: string;

// };

export type PurchaseRequisitionType = {
  latestCreatedAt: string;
  price: number;
  productName: string;
  productSkuId: string;
  totalQuantity: number;
  existingPr: [];
  proquantityQuantityAlreadyProcessed: number;
};

export interface BusinessAcquisitionDTo {
  name: string;
  type: string;
  channelId: string;
  yearEstablished: string;
  whatsapps: string[];
  phones: string[];
  logoUrl?: string;
  streetName: string;
  landmark?: string;
  lcda: string;
  lga: string;
  state: string;
  country: string;
  latitude?: number;
  longitude?: number;
  hasSignedTerms: boolean;
  businessContactId?: string;
  businessContact: BusinessContact;
}

export type BusinessPrimaryContact = {
  id: string;
  firstName: string;
  lastName: string;
  profileUrl: string;
  phoneNumber: string;
};

export type BusinessContact = {
  streetName?: string;
  type?: string;
  name?: string;
  businessContact?: BusinessPrimaryContact;
  firstName: string;
  lastName: string;
  password?: string;
  phoneNumber: string;
  profileUrl?: string;
  email?: string;
  gender: string;
};

export interface Cart {
  meta?: string;
  price: number;
  businessId: string;
  image?: string;
  loading?: boolean;
  quantity?: number;
  productId: string;
  discount?: string;
  itemCount: number;
  productName: string;
  subCategoryId: string;
  discountType: string;
  productSkuId: string;
  quantityInPack: number;
  product: ProductSliceType;
}

export interface CartPayload {
  customerId: string;
  productId: string;
  quantity: number;
}

export type Customer = {
  id: string;
  lga?: string;
  streetName: string;
  image: string;
  name: string;
  visited: string;
  dateOnboarded: string;
  businessName: string;
  businessType: string;
};

export type Agent = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  agentId: string;
};

export interface AgentDTO {
  id: string;
  country: string;
  coverageArea: string[];
  email: string;
  firstName: string;
  lastName: string;
  lga: string;
  phoneNumber: string;
  role: { id: string; name: string };
  state: string;
  profileUrl: string | null;
  status: string;
  _id: string;
}

export type SKU = {
  id: string;
  productSkuId: string;
  sellingPrice: string;
  productSku: { name: string };
  recommendedRetailPrice: string;
  distributorBuyingPrice: string;
  subDistributorBuyingPrice: string;
};

export type InternalUser = {
  id: string;
  firstName: string;
  lastName: string;
};

export type AssignedAgents = {
  assignedRole: { name: string; id: string };
  internalUser: InternalUser;
};

export type Retailer = {
  assignedAgents: AssignedAgents[];
  id: string;
  name: string;
  logoUrl: string;
  type: string;
  createdAt: string;
  isVerified: boolean;
  lcda: string;
};

export interface BusinessSliceDTO {
  loading: boolean;
  allChannels: Channel[];
  business: BusinessData; //selected biz
  visitPlans: VisitPlans[];
  callPlans: CallPlans[];
  assignCustomerIds: string[];
  businesses: BusinessData[]; //all user biz
  businessContact: BusinessContact;
  pagination: PaginationBusinessDTO;
  error: ErrorType | null | string;
}

export interface BusinessData {
  visitPlan: { frequency: string; startDate: string };
  callPlan: { frequency: string; startDate: string };
  id: string;
  name: string;
  lcda: string;
  lga: string;
  state: string;
  logoUrl: string;
  country: string;
  phones: string[];
  channelId: string;
  channel: Channel;
  whatsapps: string[];
  streetName: string;
  type: BusinessType;
  createdAt: string;
  updatedAt: string;
  isPhoneVerified: boolean;
  yearEstablished: string;
  landmark: string | null;
  hasSignedTerms: boolean;
  longitude: string | null;
  latitude: string | null;
  businessContactId: string;
  createdByUserId: string;
  deletedAt: string | null;
  businessContact: {
    id: string;
    profileUrl: string | null;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
  assignedAgents: AssignedAgents[];
}

export type SalesRepBusinessDTO = Omit<BusinessSliceDTO, 'callPlans'>;
export type SalesRepBusinessData = Omit<BusinessData, 'callPlan'>;
export type TeleSaleRepBusinessDTO = Omit<BusinessSliceDTO, 'visitPlans'>;
export type TeleSaleRepBusinessData = Omit<BusinessData, 'visitPlan'>;

type PlannerType = {
  id: string;
  frequency: string;
  interval: number;
  business: {
    id: string;
    name: string;
    type: string;
    logoUrl: string;
    lcda: string;
    lga: string;
    longitude: string | number;
    latitude: string | number;
    businessContactId: string;
  };
  internalUser: {
    id: string;
    firstName: string;
    lastName: string;
    profileUrl: string;
    phoneNumber: string;
  };
};

export type VisitAndCallPlans = {
  id: string;
  businessVisitPlanId: string;
  longitude: number | string;
  latitude: number | string;
  imageUrl: string;
  orderId: string;
  // visited: string;
  failedReason: string;
  possibleNextOrderDate: string;
  possibleNextOrder: string;
  visitDate: string;
  callDate: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  visitPlan: PlannerType;
  callPlan: PlannerType;
};
export type VisitPlans = Omit<VisitAndCallPlans, 'callPlan' | 'callDate'>;
export type CallPlans = Omit<VisitAndCallPlans, 'visitPlan' | 'visitDate'>;

export type ProductDetails = {
  name: string;
  quantity: number;
  description: string;
  quantityInPack: number;
  skuImage: {
    fullImageUrl: string;
    skuImage: string;
    alternativeImageText: string;
  };
};

export type OrderItem = {
  id: string;
  status: string;
  date: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number | string;
  image: string;
  paymentMethod: string;
  createdAt: string;
  businessName: string;
  phoneNumber: string;
  grandTotal: string | number;
  productDetails: ProductDetails;
  skuImage: { fullImageUrl: string; skuImage: string; alternativeImageText: string };
};

export type OrdersByCustomer = {
  id: string;
  status: string;
  orderId: string;
  phoneNumber: string;
  date: string;
  totalPrice: number | string;
  image: string;
  address: string;
  orderItems: OrderItem[];
  grandTotal: string | number;
  paymentMethod: string;
  createdAt: string;
  deliveryAddress: string;
  businessName: string;
  productDetails: { skuImage: { fullImageUrl: string; skuImage: string } };
};

export type OrderDetails = {
  paymentStatus: string;
  paymentChannel: string;
  orderItems: OrderItem[];
  deliveryAddress: string;
  businessName: string;
  phoneNumber: string;
  createdAt: string;
  status: string;
  orderId: string;
  paymentMethod: string;
  totalPrice: number;
  grandTotal: number;
};

export interface OrderDTO {
  loading: boolean;
  nextPage: boolean;
  pageNumber: number;
  totalPages: number;
  phoneNumber: string;
  businessName: string;
  previousPage: boolean;
  endCursor: number | null;
  orderDetails: OrderDetails;
  pickUps: SKUPickUpDetails[];
  assignedPickUps: AssignedPickUps[];
  allOrders: OrdersByCustomer[];
  pagination: PaginationOrderDTO;
  error: ErrorType | null | string;
  ordersByCustomer: OrdersByCustomer[];
  skuPickUpPrDetails: SKUPickupPRDetails;
  purchaseRequisition: PurchaseRequisitionType[];
  purchaseRequisitionSku: PurchaseRequisitionSkuType;
}
export interface PurchaseRequisitionDTO {
  purchaseRequisition: skuPurchaseRequisitionWholesalers[];
  productQuantity: number;
  productId: string;
  productName: string;
}

export type PurchaseRequisitionSkuType = {
  id: string;
  name: string;
  skuWholesalers: skuPurchaseRequisitionWholesalers[];
};

export type skuPurchaseRequisitionWholesalers = {
  wholesalerId: string;
  wholesalerName: string;
  distributorBuyingPrice: string;
  wholesalerPrice?: string;
  quantity: number;
  addedItem?: boolean;
};

export type SKUPickUpDetails = {
  productName: string;
  productSkuId: string;
  totalQuantity: number;
  latestCreatedAt: string;
  status: string; //"Unassigned"
  proquantityQuantityAlreadyProcessed: number;
};

export type AssignedPickUps = {
  pickUpStatus: string;
  wholesaler: {
    phoneNumber: string;
    address: {
      streetName: string;
    };
    business: {
      businessName: string;
    };
  };
  driver: {
    firstName: string;
  };
};

export interface SKUPickupPRDetails {
  prs: SKUPurchaseRequisition[];
  driverToAssignWithQuantity: AssignDriver[];
  alreadyAssignedPickup: AlreadyAssignPickUp[] | AlreadyAssignPickupFull[];
}

export interface SKUPurchaseRequisition {
  id: string;
  productId: string;
  wholesalerId: string;
  wholesalerPrice: number;
  productName: string;
  localDate: string;
  quantity: string;
  createdAt: string;
  updatedAt: string;
  wholesaler: {
    id: string;
    businessName: string;
  };
}

export interface AlreadyAssignPickUp {
  driverId: string;
  quantity: number;
  driverName?: string;
  wholesalerId: string;
  wholesalerPrice: number;
  driverDeliveryLCDA: string;
  wholesalerBusiness?: string;
}

export interface AlreadyAssignPickupFull {
  id: string;
  driverId: string;
  quantity: number;
  productId: string;
  localDate: string;
  createdAt: string;
  updatedAt: string;
  addedItem?: boolean;
  productName: string;
  wholesalerId: string;
  pickupStatus: string;
  wholesalerPrice: number;
  wholesaler: { id: string; businessName: string };
  driver: { id: string; firstName: string; lastName: string };
}

export interface AssignDriver {
  productId: string;
  driver: {
    id: string;
    firstName: string;
    lastName: string;
  };
  deliveryLCDA: string;
  quantity: number;
}

export interface AssignPickUpDTO {
  date: string;
  productId: string;
  productName: string;
  assignedPickUpList: AlreadyAssignPickUp[];
}

export interface AllOrderDTO {
  onSetCurOrder: () => void;
  onSetAllOrderOpen: () => void;
}

export interface PaginationAssignShopDTO {
  assignedAgentId?: string;
  cluster?: string;
  coverageArea?: string;
  page?: number;
  type: BusinessType;
  limit?: number;
  totalPages?: number;
  prevPage?: number;
  nextPage?: string | number;
}

export type PaginationDTO = {
  type?: BusinessType;
  page?: number;
  limit?: number;
  search?: string;
  pageCount?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
};

export type FilterParamsType = PaginationDTO & {
  toDate?: string;
  agentId?: string;
  filename?: string;
  fromDate?: string;
  internalUserId?: string;
  assignedAgentId?: string;
  output?: 'csv' | 'pdf' | 'json';
};

export interface PaginationAgentDTO {
  id?: string;
  page?: number;
  limit?: number;
  search?: string;
  agentId?: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageCount?: number;
}
export interface PaginationProductDTO {
  subCategoryId?: string;
  page?: number;
  limit?: number;
}

export interface PaginationOrderDTO {
  page?: number;
  limit?: number;
  businessId?: string;
  itemCount?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

export interface PaginationBusinessDTO {
  totalPages?: number;
  prevPage?: boolean;
  nextPage?: boolean;
  type?: BusinessType;
  // shopId?: string; //relegated| don'y use
  page: number;
  limit?: number;
  businessId?: string;
  pageCount?: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface DriverAcquisitionDTO {
  email: string;
  roleId: string;
  state: string;
  cluster: string;
  country: string;
  lastName: string;
  password: string;
  firstName: string;
  homeAddress: string;
  phoneNumber: string;
  vehicleType: string;
  plateNumber: string;
  vehicleModel: string;
  licenseNumber: string;
  coverageArea: string[];
  documentImageUrl: string;
  vehicleImageUrl: string;
  vehicleCapacity: string | number;
  licenseExpiration: string;
}

// export interface InventoryDTO {
//   skuId: string;
//   skuName: string;
//   loading: boolean;
//   itemCount: number;
//   nextPage: boolean;
//   buyingPrice: number;
//   pageNumber: number;
//   totalPages: number;
//   previousPage: boolean;
//   inventories: Inventories[];
//   error: ErrorType | null | string;
//   inventoryChangeLog: InventoryChangeLog[];
// }

export interface InventoryProductSKU {
  id: string;
  name: string;
  brandId: string;
  selling: boolean;
  packType: string;
  createdAt: string;
  updatedAt: string;
  skuImageId: string;
  description: string;
  subCategoryId: string;
  unitOfMeasure: string;
  quantityInPack: number;
  inventoryLevel: number;
  unitOfMeasureInPack: string;
  averageRating: string | null;
  brand: {
    id: string;
    name: string;
    company: string;
    logo: string | null;
    createdAt: string;
    updatedAt: string;
    brandExtension: string;
  };
  skuImage: SKUImage;
}

export interface InventoryChangeLog {
  id: string;
  reason: string;
  oldValue: number;
  newValue: number;
  createdAt: string;
  updatedAt: string;
  modifiedBy: string;
  dateModified: string;
  modifiedByName: string;
  productInventoryId: string;
}

export interface Inventories {
  id: string;
  skuName: string;
  quantity: number;
  createdAt: string;
  loading: boolean;
  updatedAt: string;
  nextPage: boolean;
  pageNumber: number;
  totalPages: number;
  buyingPrice: number;
  productSkuId: string;
  sellingPrice: number;
  previousPage: boolean;
  productSku: InventoryProductSKU;
  error: ErrorType | null | string;
  inventoryChangeLog: InventoryChangeLog[];
}

export type SKUImage = {
  id: string;
  createdAt: string;
  updatedAt: string;
  fullImageUrl: string;
  rareImageUrl: string;
  alternativeImageText: string;
  sideImageUrl: string | null;
};

export interface InventoryFormDataDTO {
  id?: string;
  image?: string;
  reason: string;
  quantity: number;
  buyingPrice: number;
  productSkuId: string;
}

export interface ProductInternalInventory {
  id: string;
  quantity: number;
  updatedAt: string;
  createdAt: string;
  productSkuId: string;
  buyingPrice: number;
  sellingPrice: number;
}

export interface SKUPriceModifyDTO {
  selling: boolean;
  productSkuId: string;
  sellingPrice: number;
  discountType: string;
  openRetailDiscounts: number;
}

export interface FormDataSKUProductDTO {
  id?: string;
  name?: string;
  company: string;
  packType: string;
  brandName: string;
  brandLogo: string;
  description: string;
  subCategoryId: string;
  unitOfMeasure: string;
  quantityInPack: number;
  inventoryLevel: number;
  brandExtension: string;
  image: string | undefined;
  unitOfMeasureInPack: string;
}

export {};
