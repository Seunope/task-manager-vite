import ErrorPage from '../components/ErrorPage';
import AcquisitionForm from '../pages/auth/onboarding/AcquisitionForm';
import ShopAuthentication from '../pages/auth/onboarding/ShopAuthentication';
import Verify from '../pages/auth/onboarding/Verify';
// import OnboardingSuccess from "../pages/common/onboarding/OnboardingSuccess";

export const onboardingRoutes = [
  {
    path: 'onboarding-form',
    element: <AcquisitionForm />,
    errorElement: <ErrorPage />,
  },

  {
    path: 'shop-authentication',
    element: <ShopAuthentication />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'verify',
    element: <Verify />,
    errorElement: <ErrorPage />,
  },
];
