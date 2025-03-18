import VisitPlanner from '../pages/back-office/VisitPlanner';
import AssignShops from '../pages/back-office/assignShops/AssignShops';
import BODashboard from '../pages/back-office/BODashboard';
import BOOrders from '../pages/back-office/BOOrders';
import CallPlanner from '../pages/back-office/callPlan/CallPlanner';
import CreateProductSKU from '../pages/back-office/product-sku/CreateProductSKU';
import Delivery from '../pages/back-office/delivery/Delivery';
import LoyaltyProgramme from '../pages/back-office/loyalty/LoyaltyProgramme';
import PurchaseRequisition from '../pages/back-office/order/purchase-requistion/PurchaseRequisition';
import Pricing from '../pages/back-office/price-inventory/PriceAndInventory';
import Promotions from '../pages/back-office/promotions/Promotions';
import RetailerProfile from '../pages/back-office/retailers/RetailerProfile';
import Retailers from '../pages/back-office/retailers/Retailers';
import Staff from '../pages/back-office/staff/Staff';
import NewTerritory from '../pages/back-office/territory/NewTerritory';
import TerritoryCreation from '../pages/back-office/territory/TerritoryCreation';
import AgentProfile from '../pages/back-office/user-agent/AgentProfile';
import AllAgents from '../pages/back-office/user-agent/AllAgents';
import CreateAgent from '../pages/back-office/user-agent/CreateAgent';
import BOOStockUpdate from '../pages/back-office/WholesalerStockUpdate/StockUpdate';
import WholesalerList from '../pages/back-office/WholesalerStockUpdate/WholesalerList';
import WholesalerProfile from '../pages/back-office/WholesalerStockUpdate/WholesalerProfile';
import OrderDetails from '../pages/auth/cart/OrderDetails';
import UserRoleMiddleware from './UserRoleMiddleware';
import ErrorPage from '../components/ErrorPage';
import AllTasks from '../pages/back-office/tasks/AllTasks';
import Complaint from '../pages/back-office/tasks/Complaint';
import PickUpOrders from '../pages/back-office/order/pick-up/PickUpOrders';
import ModifyDriver from '../pages/back-office/delivery/ModifyDriver';
import CreateComplaint from '../pages/back-office/tasks/CreateComplaint';
import ListProductSKU from '../pages/back-office/product-sku/ListProductSKU';
import EditProductSKU from '../pages/back-office/product-sku/EditProductSKU';

export const boRoutes = [
  {
    path: 'bo/',
    element: <UserRoleMiddleware allowedRoles={['Back Office Manager']} />,
    children: [
      {
        path: 'dashboard',
        element: <BODashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'staff',
        element: <Staff />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'assign-shops',
        element: <AssignShops />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'visit-planner',
        element: <VisitPlanner />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'call-planner',
        element: <CallPlanner />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'orders',
        element: <BOOrders />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'pick-up/list',
        element: <PickUpOrders />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'purchase-requisition/list',
        element: <PurchaseRequisition />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'stock-update',
        element: <WholesalerList />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'stock-update/products',
        element: <BOOStockUpdate />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'delivery',
        element: <Delivery />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'modify-driver',
        element: <ModifyDriver />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'order-details',
        element: <OrderDetails />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'pricing',
        element: <Pricing />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'promotions',
        element: <Promotions />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'loyalty',
        element: <LoyaltyProgramme />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'territory',
        element: <TerritoryCreation />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'new-territory',
        element: <NewTerritory />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'product-sku/create',
        element: <CreateProductSKU />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'product-sku/list',
        element: <ListProductSKU />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'product-sku/edit',
        element: <EditProductSKU />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'agent',
        element: <AllAgents />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'create-agent',
        element: <CreateAgent />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'agent-profile',
        element: <AgentProfile />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'wholesaler-profile',
        element: <WholesalerProfile />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'retailer-profile',
        element: <RetailerProfile />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'retailers',
        element: <Retailers />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'tasks',
        element: <AllTasks />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'create-complaint',
        element: <CreateComplaint />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'complaint',
        element: <Complaint />,
        errorElement: <ErrorPage />,
      },
    ],
  },
];
