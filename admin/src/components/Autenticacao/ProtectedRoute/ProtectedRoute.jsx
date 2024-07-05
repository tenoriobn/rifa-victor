/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { stateUserLogin } from "../../../common/states/atom";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function ProtectedRoute({ element }) {
  const [userLogin, setUserLogin] = useRecoilState(stateUserLogin);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('_token');
    if (token) {
      setUserLogin(token);
    } else {
      navigate('/', { replace: true });
    }
  }, [setUserLogin, navigate]);

  if (!userLogin) {
    return null; // Retorna null ou qualquer mensagem de acesso negado conforme necessário
  }

  return element;
}
