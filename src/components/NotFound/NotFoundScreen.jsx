import styled from 'styled-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';


const NotFoundScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <NotFoundContainer>
      <ErrorCode>{t('not_found.code')}</ErrorCode>
      <ErrorTitle>{t('not_found.title')}</ErrorTitle>
      <ErrorMessage>
        {t('not_found.message')}
      </ErrorMessage>
      <BackButton onClick={() => navigate('/dashboard')}>
        <Home size={18} />
        {t('not_found.back_to_dashboard')}
      </BackButton>
    </NotFoundContainer>
  );
};

export default NotFoundScreen;


// --- Styled Components ---


export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
`;

export const ErrorCode = styled.h1`
  font-size: 72px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  line-height: 1;
`;

export const ErrorTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.display};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  color: ${({ theme }) => theme.colors.text};
  margin: ${({ theme }) => theme.spacing.lg} 0 ${({ theme }) => theme.spacing.sm};
`;

export const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  max-width: 500px;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borders.radiusMd};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;
