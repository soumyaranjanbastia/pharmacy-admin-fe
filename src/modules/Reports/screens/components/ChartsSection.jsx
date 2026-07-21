import React from 'react';
import styled from 'styled-components';
import RevenueTrendChart from './RevenueTrendChart';
import SalesCategoryChart from './SalesCategoryChart';

const SectionContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
`;

const ChartsSection = () => {
  return (
    <SectionContainer>
      <RevenueTrendChart />
      <SalesCategoryChart />
    </SectionContainer>
  );
};

export default ChartsSection;
