import React from 'react';
import { Navigate } from 'react-router-dom';
import Wrapper from './Wrapper';

type Props = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
  const token = localStorage.getItem('token');
  console.log('token ProtectedRoute :', token);

  if (token) return <Wrapper>{children}</Wrapper>;
  else return <Navigate to={'/login'} replace />;
};

export default ProtectedRoute;
