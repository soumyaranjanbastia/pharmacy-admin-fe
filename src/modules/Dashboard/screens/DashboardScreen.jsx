import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { Activity, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fetchDashboardData, isStub } from '../sagas/dashboardApi';
import Loader from '../../../components/common/Loader';


const DashboardScreen = () => {
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchDashboardData();
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to fetch dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <DashboardContainer style={{ height: '100%', position: 'relative' }}>
        <Loader 
          fullScreen={false} 
          text={isStub ? 'Loading mock data...' : 'Fetching live data...'} 
          subText="Please wait a moment"
        />
      </DashboardContainer>
    );
  }

  if (error) {
    return (
      <DashboardContainer style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <p style={{ color: 'red' }}>{error}</p>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      {/* Header Section */}
      <DashboardHeader>
        <div>
          <Breadcrumb>{t('dashboard.breadcrumb')}</Breadcrumb>
          <PageTitle>{t('dashboard.title')}</PageTitle>
          <CurrentTime>{data.overview.currentTime}</CurrentTime>
        </div>
        <div>
          <LiveBtn>
            <LiveIconWrapper>
              <Activity size={16} />
            </LiveIconWrapper>
            {t('dashboard.live')}
            <LiveDot />
          </LiveBtn>
        </div>
      </DashboardHeader>

      {/* Summary Cards */}
      <SummaryCards>
        {/* Card 1 */}
        <SummaryCardItem>
          <CardLabel>{t('dashboard.cards.total_sales')}</CardLabel>
          <CardValue>{data.overview.totalSales.value}</CardValue>
          <CardTrend $positive={data.overview.totalSales.isPositive}>
            <Activity size={14} /> {data.overview.totalSales.trend} {t('dashboard.cards.vs_yesterday')}
          </CardTrend>
        </SummaryCardItem>

        {/* Card 2 */}
        <SummaryCardItem>
          <CardLabel>{t('dashboard.cards.active_branches')}</CardLabel>
          <CardValue>{data.overview.activeBranches.value}</CardValue>
          <CardTrend $positive={data.overview.activeBranches.isPositive}>
            <Activity size={14} /> {t('dashboard.cards.systems_operational')}
          </CardTrend>
        </SummaryCardItem>

        {/* Card 3 */}
        <SummaryCardItem>
          <CardLabel>{t('dashboard.cards.low_stock_alerts')}</CardLabel>
          <CardValue>{data.overview.lowStockAlerts.value} {t('dashboard.cards.items')}</CardValue>
          <CardTrend $positive={data.overview.lowStockAlerts.isPositive}>
            <Activity size={14} /> {data.overview.lowStockAlerts.trend} {t('dashboard.cards.since_last_week')}
          </CardTrend>
        </SummaryCardItem>

        {/* Card 4 */}
        <SummaryCardItem>
          <CardLabel>{t('dashboard.cards.pending_rx_verifications')}</CardLabel>
          <CardValue>{data.overview.pendingVerifications.value}</CardValue>
          <CardTrend $positive={data.overview.pendingVerifications.isPositive}>
            <Activity size={14} /> {t('dashboard.cards.avg_wait')} {data.overview.pendingVerifications.trend}
          </CardTrend>
        </SummaryCardItem>
      </SummaryCards>

      {/* Main Content Area */}
      <DashboardMainContent>
        {/* Chart Section */}
        <SectionCard>
          <SectionHeader>
            <div>
              <SectionTitle>{t('dashboard.charts.sales_comparison_title')}</SectionTitle>
              <SectionSubtitle>{t('dashboard.charts.sales_comparison_subtitle')}</SectionSubtitle>
            </div>
            <ExportBtn>
              <Download size={14} />
              {t('dashboard.charts.export_csv')}
            </ExportBtn>
          </SectionHeader>
          
          <ChartPlaceholder>
            {/* Hardcoded visual representation of the bar chart for now */}
            <YAxis>
              <span>{t('dashboard.charts.y_axis.320k')}</span>
              <span>{t('dashboard.charts.y_axis.240k')}</span>
              <span>{t('dashboard.charts.y_axis.160k')}</span>
              <span>{t('dashboard.charts.y_axis.80k')}</span>
              <span>{t('dashboard.charts.y_axis.0k')}</span>
            </YAxis>
            <BarsContainer>
              {data?.charts?.branchSales?.map((branch, index) => (
                <BarWrapper key={index}>
                  <Bar height={`${branch.value}%`} />
                  <BarLabel>{t(branch.label)}</BarLabel>
                </BarWrapper>
              ))}
            </BarsContainer>
          </ChartPlaceholder>
        </SectionCard>

        {/* Active Alerts Section */}
        <SectionCard>
          <SectionTitle style={{ marginBottom: 16 }}>{t('dashboard.alerts.title')}</SectionTitle>
          
          <AlertList>
            {data?.alerts?.map((alert) => (
              <AlertItem key={alert.id} type={alert.type}>
                <AlertIcon>{alert.icon}</AlertIcon>
                <span>{t(alert.translationKey, alert.params)}</span>
              </AlertItem>
            ))}
          </AlertList>
        </SectionCard>
      </DashboardMainContent>
    </DashboardContainer>
  );
};

export default DashboardScreen;


// --- Styled Components ---


export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxl};
`;

export const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Breadcrumb = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.secondary};
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.display};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`;

export const CurrentTime = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const LiveBtn = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  padding: 6px ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borders.radiusXl};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  font-family: inherit;
`;

export const LiveIconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  display: flex;
`;

export const LiveDot = styled.span`
  width: 6px;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.success};
  border-radius: ${({ theme }) => theme.borders.radiusFull};
`;

export const SummaryCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const SummaryCardItem = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borders.radiusLg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

export const CardLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

export const CardValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const CardTrend = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  gap: 6px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme, $positive }) => 
    $positive ? theme.colors.primary : theme.colors.danger};

  svg {
    display: block;
  }
`;

export const DashboardMainContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const SectionCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borders.radiusLg};
  padding: ${({ theme }) => theme.spacing.xxl};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`;

export const SectionSubtitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ExportBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  cursor: pointer;
  font-family: inherit;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ChartPlaceholder = styled.div`
  display: flex;
  height: 250px;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const YAxis = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  padding-bottom: ${({ theme }) => theme.spacing.xxl};
`;

export const BarsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 1;
  align-items: flex-end;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  position: relative;
`;

export const Bar = styled.div`
  width: 40px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 4px 4px 0 0;
  height: ${({ height }) => height};
`;

export const BarLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textLight};
  text-align: center;
  position: absolute;
  bottom: -24px;
  white-space: nowrap;
`;

export const AlertList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const AlertItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borders.radiusMd};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  gap: ${({ theme }) => theme.spacing.md};

  ${({ type, theme }) => {
    switch (type) {
      case 'danger':
        return `
          background-color: ${theme.colors.dangerBg};
          color: ${theme.colors.danger};
          border: 1px solid ${theme.colors.dangerBorder};
        `;
      case 'warning':
        return `
          background-color: ${theme.colors.warningBg};
          color: ${theme.colors.warning};
          border: 1px solid ${theme.colors.warningBorder};
        `;
      case 'info':
      default:
        return `
          background-color: ${theme.colors.infoBg};
          color: ${theme.colors.info};
          border: 1px solid ${theme.colors.infoBorder};
        `;
    }
  }}
`;

export const AlertIcon = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  display: flex;
`;
