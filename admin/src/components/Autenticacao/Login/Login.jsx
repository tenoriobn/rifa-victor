import styled from "styled-components"
import Theme from "../../../common/GlobalStyles/Theme/Theme";

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

const FormContainer = styled.form`
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
  return (
    <Section>
      <LeftSide>
        <img src="" alt="" />
      </LeftSide>

      <RightSide>
        <FormContainer>
          <center><h1>Rei do Pix Prêmios</h1></center>

          <Form action="https://dash.alimaprojetos.com/login" method="post">
            <label htmlFor="email">
              Email
              <input type="email" name="email" />
            </label>
            
            <label htmlFor="">
              Senha
              <input type="password" name="password" />
            </label>

            <button type="submit" value="Acessar">Acessar</button>
          </Form>
        </FormContainer>
      </RightSide>
    </Section>
  )
}
