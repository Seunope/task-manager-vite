import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { CentralState } from '../config/redux/store';

type UserRoleMiddlewarePops = {
  allowedRoles: string[];
};

const UserRoleMiddleware = ({ allowedRoles }: UserRoleMiddlewarePops) => {
  const userRole = useSelector((state: CentralState) => state.user.role);

  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default UserRoleMiddleware;
