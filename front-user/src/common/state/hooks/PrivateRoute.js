// PrivateRoute.js
import { Route, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { estadoUsuario } from '../atom';

const PrivateRoute = ({ element, ...rest }) => {
  const usuario = useRecoilValue(estadoUsuario);

  return (
    <Route
      {...rest}
      element={usuario ? element : <Navigate to="/meu-perfil" replace />}
    />
  );
};

export default PrivateRoute;
