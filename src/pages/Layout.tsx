import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '@/components/SideBar';
import MainHeader from '@/components/Header/MainHeader';
import Loading from '@/components/Loading';
import styled from 'styled-components';

const Layout = () => {
  return (
    <Container>
      <SideBar />
      <OutletContainer>
        <MainHeader />
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </OutletContainer>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const OutletContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.bgColor};
`;
