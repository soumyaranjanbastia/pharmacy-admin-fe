import React from 'react';
import styled from 'styled-components';
import { 
  LuDollarSign as DollarSign,
  LuShoppingCart as ShoppingCart,
  LuPackage as Package,
  LuTrendingUp as TrendingUp
} from 'react-icons/lu';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
  margin-bottom: 16px;
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.bg || '#F3F4F6'};
  color: ${props => props.color || 'var(--text-dark)'};
`;

const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  margin: 0;
`;

const CardValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 8px;
`;

const TrendContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: ${props => props.positive ? '#10B981' : '#EF4444'};
`;

import { metricsData } from '../../data/mockData';

const MetricsGrid = () => {
  return (
    <Grid>
      <Card>
        <CardHeader>
          <IconWrapper bg="rgba(59, 130, 246, 0.1)" color="#3B82F6">
            <DollarSign size={16} />
          </IconWrapper>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardValue>{metricsData.totalRevenue.value}</CardValue>
        <TrendContainer positive={metricsData.totalRevenue.isPositive}>
          <TrendingUp size={14} />
          <span>{metricsData.totalRevenue.trend}</span>
        </TrendContainer>
      </Card>

      <Card>
        <CardHeader>
          <IconWrapper bg="rgba(16, 185, 129, 0.1)" color="#10B981">
            <ShoppingCart size={16} />
          </IconWrapper>
          <CardTitle>Total Orders</CardTitle>
        </CardHeader>
        <CardValue>{metricsData.totalOrders.value}</CardValue>
        <TrendContainer positive={metricsData.totalOrders.isPositive}>
          <TrendingUp size={14} />
          <span>{metricsData.totalOrders.trend}</span>
        </TrendContainer>
      </Card>

      <Card>
        <CardHeader>
          <IconWrapper bg="rgba(139, 92, 246, 0.1)" color="#8B5CF6">
            <Package size={16} />
          </IconWrapper>
          <CardTitle>Items Sold</CardTitle>
        </CardHeader>
        <CardValue>{metricsData.itemsSold.value}</CardValue>
        <TrendContainer positive={metricsData.itemsSold.isPositive}>
          <TrendingUp size={14} />
          <span>{metricsData.itemsSold.trend}</span>
        </TrendContainer>
      </Card>

      <Card>
        <CardHeader>
          <IconWrapper bg="rgba(245, 158, 11, 0.1)" color="#F59E0B">
            <DollarSign size={16} />
          </IconWrapper>
          <CardTitle>Avg Order Value</CardTitle>
        </CardHeader>
        <CardValue>{metricsData.avgOrderValue.value}</CardValue>
        <TrendContainer positive={metricsData.avgOrderValue.isPositive}>
          <TrendingUp size={14} />
          <span>{metricsData.avgOrderValue.trend}</span>
        </TrendContainer>
      </Card>
    </Grid>
  );
};

export default MetricsGrid;
