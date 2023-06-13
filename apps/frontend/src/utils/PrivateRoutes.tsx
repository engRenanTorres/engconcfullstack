import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from './hooks/useAuth';

type Props = {
  role: number[];
};

const PrivateRoutes: React.FC<Props> = ({ role }: Props) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  const checkAuth = () => {
    if (!currentUser || !role.includes(currentUser.roles))
      return <Navigate to="/login" state={{ from: location }} />;
    return <Outlet />;
  };
  // console.log(currentUser);
  // console.log(role);
  // eslint-disable-next-line prettier/prettier, no-constant-condition
  return loading ? <></> : checkAuth();
};

export default PrivateRoutes;
