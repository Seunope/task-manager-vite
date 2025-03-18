import ErrorPage from '../components/ErrorPage';
import UserRoleMiddleware from './UserRoleMiddleware';
import Dashboard from '../pages/wholesaler-account-officer/Dashboard';

export const waoRoutes = [
  {
    path: 'wao/',
    element: <UserRoleMiddleware allowedRoles={['Wholesaler Account Officer']} />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
        errorElement: <ErrorPage />,
      },
    ],
  },
];
