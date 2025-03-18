import ErrorPage from '../components/ErrorPage';
import TSOrders from '../pages/tele-sales/TSOrders';
import UserRoleMiddleware from './UserRoleMiddleware';
import CallPlan from '../pages/tele-sales/TSCallPlan';
import SRCustomer from '../pages/sales-rep/SRCustomer';
import TSDashboard from '../pages/tele-sales/TSDashboard';
import NoPlacedOrder from '../pages/auth/shops/NoPlacedOrder';
import TSAssignedCustomers from '../pages/tele-sales/TSAssignedCustomers';

export const tsRoutes = [
  {
    path: 'ts/',
    element: <UserRoleMiddleware allowedRoles={['Tele Sales Agent']} />,
    children: [
      {
        path: 'dashboard',
        element: <TSDashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'call-plan',
        element: <CallPlan />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'customer',
        element: <SRCustomer />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'assigned-customers',
        element: <TSAssignedCustomers />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'not-ordering',
        element: <NoPlacedOrder />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'orders',
        element: <TSOrders />,
        errorElement: <ErrorPage />,
      },
    ],
  },
];
