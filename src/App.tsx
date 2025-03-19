import SignIn from './pages/auth/Signin';
import 'react-toastify/dist/ReactToastify.css';
import ErrorPage from './components/ErrorPage';
import { ToastContainer } from 'react-toastify';
import AuthProtect from './config/utils/AuthProtect';
import UnauthorizedPage from './components/UnauthorizedPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },

  // {
  //   path: '/',
  //   element: <AuthProtect />,
  //   errorElement: <ErrorPage />,
  //   children: [
  //     ...onboardingRoutes,
  //     ...caaRoutes,
  //     ...srRoutes,
  //     ...tsRoutes,
  //     ...boRoutes,
  //     ...waoRoutes,
  //     ...lmRoutes,
  //     {
  //       path: '/market-place',
  //       element: <MarketPlace />,
  //       errorElement: <ErrorPage />,
  //     },
  //   ],
  // },
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
