import { useRecoilState } from "recoil";
import { jwtDecode } from "jwt-decode";
import { estadoUsuario } from "../../atom";
import { postDados } from "../../../http/http";

export default function useLogin() {
  const [, setUsuario] = useRecoilState(estadoUsuario);

  const login = async (telefone) => {
    try {
      const dadosLogin = { "cellphone": telefone };
      const response = await postDados('/login', dadosLogin);

      if (response && response.access_token) {
        localStorage.setItem('access_token', response.access_token);
        const decoded = jwtDecode(response.access_token);
        setUsuario(decoded);

        console.log('cheguei aqui')
        return true;
      } else {
        console.error('Resposta de login inválida:', response);
        return false;
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  };

  return login;
}
