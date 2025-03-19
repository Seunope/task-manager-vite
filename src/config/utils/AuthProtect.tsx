import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const AuthProtect = () => {
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const isTokenExpired = (userToken: string) => {
    if (!userToken) return true;

    const decodedToken = jwtDecode(userToken);
    const currentTime = Date.now() / 1000; // Convert to seconds

    const exp = decodedToken?.exp as number;

    return exp < currentTime;
  };
  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('accessToken');
      toast.success('Unauthorized action. Login to proceed');
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default AuthProtect;
