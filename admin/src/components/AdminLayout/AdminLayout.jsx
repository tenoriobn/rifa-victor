import styled from "styled-components";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { fetchDados } from "../../common/http/http";
import { useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { stateUserDate, stateUserLogin } from "../../common/states/atom";

const MainContainer = styled.main`
  @media (min-width: 992px) {
    margin-left: 300px;
  }
`;

export const Main = styled.div`
  padding: .75rem;

  @media (min-width: 992px) {
    padding: 1.25rem;
  }
`;

export default function AdminLayout() {
  const userLogin = useRecoilValue(stateUserLogin);
  const setUserDate = useSetRecoilState(stateUserDate);
  
  const obterDados = async () => {
    const response = await fetchDados(`/admin/me`, userLogin);
    setUserDate(response);
  };

  useEffect(() => {
    if (userLogin) {
      obterDados();
    }
  }, [userLogin]);

  
  return (
    <div className="">
      <Sidebar />

      <MainContainer>
          <Outlet />
      </MainContainer>
    </div>
  );
}