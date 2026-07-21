import React from 'react';
import styled from 'styled-components';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const ChartContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border);
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const ChartHeader = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
  margin: 0;
`;

import { revenueTrendData } from '../../data/mockData';

const RevenueTrendChart = () => {
  return (
    <ChartContainer>
      <ChartHeader>
        <Title>Revenue Trend</Title>
      </ChartHeader>
      <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueTrendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#6B7280' }} 
              dy={10}
            />
            <YAxis 
              yAxisId="left"
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              domain={[0, 8000]}
              ticks={[0, 2000, 4000, 6000, 8000]}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              hide={true}
              domain={[0, 25]}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
            />
            <Legend 
              iconType="circle" 
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => <span style={{ color: value === 'Revenue (₹)' ? '#3B82F6' : '#10B981', fontWeight: 500 }}>{value}</span>}
            />
            <Line 
              yAxisId="left"
              name="Revenue (₹)" 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3B82F6" 
              strokeWidth={2} 
              dot={{ r: 4, fill: '#3B82F6', strokeWidth: 0 }} 
              activeDot={{ r: 6 }} 
            />
            <Line 
              yAxisId="right"
              name="Orders" 
              type="monotone" 
              dataKey="orders" 
              stroke="#10B981" 
              strokeWidth={2} 
              dot={{ r: 4, fill: '#10B981', strokeWidth: 0 }} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
};

export default RevenueTrendChart;
