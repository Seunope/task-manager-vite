import ErrorPage from '../components/ErrorPage';
import NoPlacedOrder from '../pages/auth/shops/NoPlacedOrder';
import AssignedCustomers from '../pages/sales-rep/AssignedCustomers';
import CaptureShopImage from '../pages/sales-rep/CaptureShop';
import SRCustomer from '../pages/sales-rep/SRCustomer';
import SRDashboard from '../pages/sales-rep/SRDashboard';
import SROrders from '../pages/sales-rep/SROrders';
import VisitPlan from '../pages/sales-rep/VisitPlan';
import UserRoleMiddleware from './UserRoleMiddleware';

export const srRoutes = [
  {
    path: 'sr/',
    element: <UserRoleMiddleware allowedRoles={['Sales Representative']} />,
    children: [
      {
        path: 'dashboard',
        element: <SRDashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'assigned-customers',
        element: <AssignedCustomers />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'visit-plan',
        element: <VisitPlan />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'capture-shop',
        element: <CaptureShopImage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'customer',
        element: <SRCustomer />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'orders',
        element: <SROrders />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'not-ordering',
        element: <NoPlacedOrder />,
        errorElement: <ErrorPage />,
      },
    ],
  },
];
