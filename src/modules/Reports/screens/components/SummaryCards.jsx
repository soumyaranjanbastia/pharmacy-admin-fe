import React from 'react';
import styled from 'styled-components';
import { LuTrendingUp as TrendingUp } from 'react-icons/lu';
import { FiAlertCircle as AlertCircle } from 'react-icons/fi';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border);
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.bg};
  color: ${props => props.color};
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
  margin: 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const Label = styled.span`
  font-size: 14px;
  color: var(--text-secondary);
`;

const Value = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.color || 'var(--text-dark)'};
`;

import { summaryData } from '../../data/mockData';

const SummaryCards = () => {
  return (
    <Grid>
      <Card>
        <CardHeader>
          <IconWrapper bg="rgba(239, 68, 68, 0.1)" color="#EF4444">
            <AlertCircle size={16} />
          </IconWrapper>
          <CardTitle>Expiry Loss Report</CardTitle>
        </CardHeader>
        
        <Row>
          <Label>Items Expired</Label>
          <Value color="#EF4444">{summaryData.expiryLoss.itemsExpired}</Value>
        </Row>
        <Row>
          <Label>Value Loss</Label>
          <Value color="#EF4444">{summaryData.expiryLoss.valueLoss}</Value>
        </Row>
        <Row>
          <Label>Near Expiry</Label>
          <Value color="#F59E0B">{summaryData.expiryLoss.nearExpiry}</Value>
        </Row>
      </Card>

      <Card>
        <CardHeader>
          <IconWrapper bg="rgba(16, 185, 129, 0.1)" color="#10B981">
            <TrendingUp size={16} />
          </IconWrapper>
          <CardTitle>Profit Margin</CardTitle>
        </CardHeader>
        
        <Row>
          <Label>Gross Profit</Label>
          <Value color="#10B981">{summaryData.profitMargin.grossProfit}</Value>
        </Row>
        <Row>
          <Label>Margin</Label>
          <Value color="#10B981">{summaryData.profitMargin.margin}</Value>
        </Row>
        <Row>
          <Label>Target</Label>
          <Value>{summaryData.profitMargin.target}</Value>
        </Row>
      </Card>
    </Grid>
  );
};

export default SummaryCards;
