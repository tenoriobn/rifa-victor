import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { stateUserDate } from './path/to/your/state';

const ProtectedRoute = ({ element, roles }) => {
  const userDate = useRecoilValue(stateUserDate);
  const location = useLocation();

  if (!roles.includes(userDate.role)) {
    // Redireciona para a página de login ou uma página de acesso negado
    return <Navigate to="/" state={{ from: location }} />;
  }

  return element;
};

export default ProtectedRoute;
