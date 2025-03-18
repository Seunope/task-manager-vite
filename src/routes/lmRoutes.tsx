import ErrorPage from '../components/ErrorPage';
import UserRoleMiddleware from './UserRoleMiddleware';
import Dashboard from '../pages/logistics-manager/LMDashboard';
import DriverProfile from '../pages/logistics-manager/DriverProfile';
import DriverOrder from '../pages/logistics-manager/driver-order/DriverOrder';
import DriverClient from '../pages/logistics-manager/driver-order/DriverClient';
import DriverPickUp from '../pages/logistics-manager/driver-order/DriverPickup';
import DriverDelivery from '../pages/logistics-manager/driver-order/DriverDelivery';

export const lmRoutes = [
  {
    path: 'lm/',
    element: <UserRoleMiddleware allowedRoles={['Logistics Manager']} />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
        errorElement: <ErrorPage />,
      },

      {
        path: 'driver-profile',
        element: <DriverProfile />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'driver-order',
        element: <DriverOrder />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'driver-delivery',
        element: <DriverDelivery />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'driver-client',
        element: <DriverClient />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'driver-pickup',
        element: <DriverPickUp />,
        errorElement: <ErrorPage />,
      },
    ],
  },
];
