import React, { useState } from "react";
import styled from "styled-components";
import { 
  LuStore as Store, 
  LuFileText as FileText, 
  LuPackage as Package, 
  LuBell as Bell 
} from 'react-icons/lu';

import PharmacyProfile from "./components/PharmacyProfile";
import ComplianceSettings from "./components/ComplianceSettings";
import InventorySettings from "./components/InventorySettings";
import NotificationSettings from "./components/NotificationSettings";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 70px);
  background-color: #F8F9FA;
  font-family: 'Roboto', sans-serif;
`;

const HeaderContainer = styled.div`
  padding: 24px 32px;
  background-color: white;
  border-bottom: 1px solid var(--border);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: var(--text-dark);
  margin: 0;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const SidebarNav = styled.div`
  width: 260px;
  background-color: white;
  border-right: 1px solid var(--border);
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.active ? 'var(--primary)' : 'var(--text-secondary)'};
  background-color: ${props => props.active ? 'rgba(0, 82, 255, 0.05)' : 'transparent'};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.active ? 'rgba(0, 82, 255, 0.05)' : '#F3F4F6'};
    color: ${props => props.active ? 'var(--primary)' : 'var(--text-dark)'};
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
`;

const TABS = [
  { id: 'profile', label: 'Pharmacy Profile', icon: Store, component: PharmacyProfile },
  { id: 'compliance', label: 'Compliance', icon: FileText, component: ComplianceSettings },
  { id: 'inventory', label: 'Inventory Settings', icon: Package, component: InventorySettings },
  { id: 'notifications', label: 'Notifications', icon: Bell, component: NotificationSettings },
];

const SettingsScreen = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderActiveComponent = () => {
    const ActiveComponent = TABS.find(tab => tab.id === activeTab)?.component;
    return ActiveComponent ? <ActiveComponent /> : null;
  };

  return (
    <Container>
      <HeaderContainer>
        <Title>Settings</Title>
        <Subtitle>Manage your pharmacy configuration</Subtitle>
      </HeaderContainer>

      <MainContent>
        <SidebarNav>
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <NavItem 
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={18} />
                {tab.label}
              </NavItem>
            );
          })}
        </SidebarNav>

        <ContentArea>
          {renderActiveComponent()}
        </ContentArea>
      </MainContent>
    </Container>
  );
};

export default SettingsScreen;
