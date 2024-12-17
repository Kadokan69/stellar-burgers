import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

export const ProtectedRoute = () => {
  let location = useLocation();
  const { user, isInit, isLoading, userLogin } = useSelector(
    (store) => store.user
  );
  // if (!isInit || isLoading) {
  //   return <Preloader />;
  // }

  // if (!userLogin) {
  //   return <Navigate to='/login' replace />;
  // }

  return <Outlet />;
};
