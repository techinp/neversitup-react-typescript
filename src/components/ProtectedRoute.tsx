import React from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
  const token = localStorage.getItem('token');
  console.log('token ProtectedRoute :', token);

  if (token) return children;
  else return <Navigate to={'/login'} replace />;
};

export default ProtectedRoute;
