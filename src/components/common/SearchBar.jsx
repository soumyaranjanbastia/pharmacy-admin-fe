import React from 'react';
import styled from 'styled-components';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SearchBar = () => {
  const { t } = useTranslation();

  return (
    <SearchBarContainer>
      <SearchIconWrapper>
        <Search size={18} />
      </SearchIconWrapper>
      <SearchInput 
        type="text" 
        placeholder={t('header.search_placeholder')} 
      />
    </SearchBarContainer>
  );
};

// --- Styled Components ---
const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.inputBg};
  border-radius: ${({ theme }) => theme.borders.radiusMd};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border: 1px solid transparent;
  transition: all 0.2s ease;

  &:focus-within {
    background-color: ${({ theme }) => theme.colors.surface};
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 118, 100, 0.1);
  }
`;

const SearchIconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  margin-right: ${({ theme }) => theme.spacing.md};
  display: flex;
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  font-family: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export default SearchBar;
