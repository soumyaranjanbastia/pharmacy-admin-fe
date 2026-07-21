export const metricsData = {
  totalRevenue: {
    value: '₹38,700',
    trend: '+12.5% from last week',
    isPositive: true
  },
  totalOrders: {
    value: 111,
    trend: '+8.2% from last week',
    isPositive: true
  },
  itemsSold: {
    value: 754,
    trend: '+15.3% from last week',
    isPositive: true
  },
  avgOrderValue: {
    value: '₹349',
    trend: '+3.1% from last week',
    isPositive: true
  }
};

export const revenueTrendData = [
  { name: 'Mar 12', revenue: 4200, orders: 12 },
  { name: 'Mar 13', revenue: 5100, orders: 15 },
  { name: 'Mar 14', revenue: 3800, orders: 11 },
  { name: 'Mar 15', revenue: 6300, orders: 18 },
  { name: 'Mar 16', revenue: 5500, orders: 16 },
  { name: 'Mar 17', revenue: 7300, orders: 21 },
  { name: 'Mar 18', revenue: 6900, orders: 19 },
];

export const salesCategoryData = [
  { name: 'Antibiotics', value: 25, color: '#10B981' },
  { name: 'Vitamins', value: 20, color: '#F59E0B' },
  { name: 'Cold & Flu', value: 15, color: '#8B5CF6' },
  { name: 'Others', value: 10, color: '#6B7280' },
  { name: 'Pain Relief', value: 30, color: '#3B82F6' },
];

export const topSellingData = [
  { id: 1, name: 'Paracetamol 500mg', units: 245, revenue: '₹11,025', performance: 100 },
  { id: 2, name: 'Crocin 650mg', units: 180, revenue: '₹11,700', performance: 75 },
  { id: 3, name: 'Azithromycin 500mg', units: 95, revenue: '₹17,100', performance: 40 },
  { id: 4, name: 'Calpol 500mg', units: 156, revenue: '₹8,580', performance: 65 },
  { id: 5, name: 'Amoxicillin 250mg', units: 78, revenue: '₹7,410', performance: 32 },
];

export const summaryData = {
  expiryLoss: {
    itemsExpired: '5 items',
    valueLoss: '₹2,340',
    nearExpiry: '12 items'
  },
  profitMargin: {
    grossProfit: '₹15,200',
    margin: '39.2%',
    target: '40.0%'
  }
};
