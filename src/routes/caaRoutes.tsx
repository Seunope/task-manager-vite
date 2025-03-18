import Customer from '../pages/caa/Customer';
import Dashboard from '../pages/caa/Dashboard';
import UserRoleMiddleware from './UserRoleMiddleware';
import OnboardedCustomers from '../pages/caa/OnboardedCustomers';
import ErrorPage from '../components/ErrorPage';

export const caaRoutes = [
  {
    path: 'caa/',
    element: <UserRoleMiddleware allowedRoles={['Customer Acquisition Agent']} />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'onboarded-customers',
        element: <OnboardedCustomers />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'customer',
        element: <Customer />,
        errorElement: <ErrorPage />,
      },
    ],
  },
];
