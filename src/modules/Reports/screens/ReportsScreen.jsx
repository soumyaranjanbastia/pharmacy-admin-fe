import React from "react";
import styled from "styled-components";
import { LuChevronDown as ChevronDown } from 'react-icons/lu';

import MetricsGrid from "./components/MetricsGrid";
import ChartsSection from "./components/ChartsSection";
import TopSellingTable from "./components/TopSellingTable";
import SummaryCards from "./components/SummaryCards";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #F8F9FA;
  font-family: 'Roboto', sans-serif;
  min-height: calc(100vh - 70px);
`;

const HeaderContainer = styled.div`
  padding: 24px 32px;
  background-color: white;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
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

const ControlsBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SelectBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: white;
  color: var(--text-dark);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

const ExportButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: white;
  color: var(--text-dark);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background: #F3F4F6;
  }
`;

const MainContent = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const ReportsScreen = () => {
  return (
    <Container>
      <HeaderContainer>
        <TitleBlock>
          <Title>Reports & Analytics</Title>
          <Subtitle>Track your pharmacy's performance</Subtitle>
        </TitleBlock>
        <ControlsBlock>
          <SelectBox>
            Weekly <ChevronDown size={16} />
          </SelectBox>
          <ExportButton>Export Report</ExportButton>
        </ControlsBlock>
      </HeaderContainer>

      <MainContent>
        <MetricsGrid />
        <ChartsSection />
        <TopSellingTable />
        <SummaryCards />
      </MainContent>
    </Container>
  );
};

export default ReportsScreen;
