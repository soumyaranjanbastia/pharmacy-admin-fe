import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid var(--border);
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  overflow: hidden;
`;

const Header = styled.div`
  padding: 24px;
  border-bottom: 1px solid var(--border);
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
  margin: 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px 24px;
  background-color: #F8F9FA;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid var(--border);
`;

const Td = styled.td`
  padding: 16px 24px;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
  color: var(--text-dark);
  vertical-align: middle;

  &:last-child {
    width: 250px;
  }
`;

const Tr = styled.tr`
  &:last-child ${Td} {
    border-bottom: none;
  }
`;

const RankBadge = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  background-color: ${props => props.top3 ? '#FEF3C7' : '#F3F4F6'};
  color: ${props => props.top3 ? '#D97706' : '#6B7280'};
`;

const MedicineName = styled.div`
  font-weight: 500;
`;

const UnitsValue = styled.span`
  font-weight: 600;
`;

const UnitsLabel = styled.span`
  color: var(--text-muted);
  font-size: 12px;
  margin-left: 4px;
`;

const PerformanceBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background-color: #E5E7EB;
  border-radius: 3px;
  overflow: hidden;
`;

const PerformanceBarFill = styled.div`
  height: 100%;
  background-color: #3B82F6;
  width: ${props => props.percentage}%;
  border-radius: 3px;
`;

import { topSellingData } from '../../data/mockData';

const TopSellingTable = () => {
  return (
    <Container>
      <Header>
        <Title>Top Selling Medicines</Title>
      </Header>
      <Table>
        <thead>
          <tr>
            <Th>RANK</Th>
            <Th>MEDICINE NAME</Th>
            <Th>UNITS SOLD</Th>
            <Th>REVENUE</Th>
            <Th>PERFORMANCE</Th>
          </tr>
        </thead>
        <tbody>
          {topSellingData.map((item, index) => (
            <Tr key={item.id}>
              <Td>
                <RankBadge top3={index < 3}>{item.id}</RankBadge>
              </Td>
              <Td>
                <MedicineName>{item.name}</MedicineName>
              </Td>
              <Td>
                <UnitsValue>{item.units}</UnitsValue>
                <UnitsLabel>units</UnitsLabel>
              </Td>
              <Td>{item.revenue}</Td>
              <Td>
                <PerformanceBarContainer>
                  <PerformanceBarFill percentage={item.performance} />
                </PerformanceBarContainer>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TopSellingTable;
