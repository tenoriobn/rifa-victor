import styled from "styled-components";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

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
  return (
    <div className="">
      <Sidebar />

      <MainContainer>
          <Outlet />
      </MainContainer>
    </div>
  );
}