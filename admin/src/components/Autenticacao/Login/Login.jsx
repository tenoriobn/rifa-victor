import { useState } from 'react';
import styled from "styled-components";
import Theme from "../../../common/GlobalStyles/Theme/Theme";
import { stateUserLogin } from "../../../common/states/atom";
import { useSetRecoilState } from "recoil";
import { postDados, salvarToken } from '../../../common/http/http';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Section = styled.section`
  font-family: ${Theme.font.poppins}!important;
  display: flex;
  height: 100vh;
  width: 100%;
`;

const LeftSide = styled.div`
  display: none;
  background-color: #20202a;
  justify-content: center;
  align-items: center;
  width: 60%;

  img {
    max-width: 300px
  }

  @media (min-width: 992px) {
    display: flex;
  }
`;

const RightSide = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #fff!important;
`;

const FormContainer = styled.div`
  flex: 1;
  padding: 30px;

  h1 {
    color: ${Theme.colors.black};
    font-size: 2rem;
    font-weight: 600;
    line-height: 2.75rem;
    margin-bottom: 1.875rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  label {
    box-sizing: border-box;
    color: ${Theme.colors.black};
    width: 100%;
  }

  input {
    outline: none;
    border: 2px solid #e8f0fe;
    background-color: #e8f0fe;
    border-radius: .625rem;
    font-size: 14px;
    margin-top: .25rem;
    padding: 1.15rem;
    width: 100%;
    box-sizing: border-box;
    transition: all .3s ease-in-out;

    &:focus {
      border: 2px solid #069748;
    }
  }

  button {
    border: none;
    border-radius: .625rem;
    background-color: #07b353;
    cursor: pointer;
    color: #fff;
    font-weight: 500;
    width: 100%;
    padding: 1.25rem;
    transition: all .3s ease-in-out;

    &:hover {
      background-color: #069748;
    }
  }

  @media (min-width: 992px) {
    button {
      max-width: 200px;
      padding: .75rem;
    }
  }
`;

export default function Login() {
  const setUserLogin = useSetRecoilState(stateUserLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const dadosLogin = {
          email,
          password,
      };

      const response = await postDados('/admin/user/login', dadosLogin);
      
      console.log('aqui')

      if (response && response.token) {
        salvarToken(response.token); 
        setUserLogin(response.token); 
        navigate('/dashboard');
      } else {
        console.log('aqui')
        throw new Error('Token não encontrado na resposta.');
      }

    } catch (error) {
      toast.error(error.response.data.response || 'Erro ao fazer login');
    }
  };

  return (
    <Section>
      <LeftSide>
        <img src="" alt="" />
      </LeftSide>

      <RightSide>
        <FormContainer>
          <center><h1>Ana Lima Prêmios</h1></center>

          <Form onSubmit={handleLogin}>
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </label>
            
            <label htmlFor="password">
              Senha
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </label>

            <button type="submit">Acessar</button>
          </Form>
          
          <ToastContainer />
        </FormContainer>
      </RightSide>
    </Section>
  );
}
