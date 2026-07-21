import styled from 'styled-components';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';


const Layout = ({ userRole = 'super_admin' }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <LayoutContainer>
      <Sidebar userRole={userRole} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <LayoutMain>
        <Header userRole={userRole} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <LayoutContent>
          <Outlet />
        </LayoutContent>
      </LayoutMain>
    </LayoutContainer>
  );
};

export default Layout;


// --- Styled Components ---


export const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

export const LayoutMain = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

export const LayoutContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.xxl};
`;
