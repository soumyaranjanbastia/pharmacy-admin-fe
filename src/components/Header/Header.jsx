import styled from 'styled-components';
import React from 'react';
import { Bell, ChevronDown, MapPin, Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SearchBar from '../common/SearchBar';


const Header = ({ userRole, isOpen, toggleSidebar }) => {
  const { t } = useTranslation();

  return (
    <HeaderContainer>
      <HeaderLeft>
        {!isOpen && (
          <MenuButton onClick={toggleSidebar}>
            <Menu size={20} />
          </MenuButton>
        )}
        <SearchBar />
      </HeaderLeft>
      
      <HeaderRight>
        {/* Branch Selector */}
        <BranchSelector>
          <BranchIconWrapper>
            <MapPin size={16} />
          </BranchIconWrapper>
          <span>{t('header.branch.koramangala')}</span>
          <DropdownIconWrapper>
            <ChevronDown size={14} />
          </DropdownIconWrapper>
        </BranchSelector>

        {/* Notifications */}
        <NotificationBell>
          <Bell size={20} />
          <NotificationDot />
        </NotificationBell>

        {/* User Profile */}
        <UserProfile>
          <UserAvatar>{t('header.user.avatar_initials')}</UserAvatar>
          <UserInfo>
            <UserName>{t('header.user.name')}</UserName>
            <UserRoleText>
              {userRole === 'super_admin' ? t('header.roles.super_admin') : userRole}
            </UserRoleText>
          </UserInfo>
          <DropdownIconWrapper>
            <ChevronDown size={14} />
          </DropdownIconWrapper>
        </UserProfile>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;


// --- Styled Components ---


export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xxl};
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  height: 72px;
  z-index: ${({ theme }) => theme.zIndices.header};
`;

export const HeaderLeft = styled.div`
  flex: 1;
  max-width: 500px;
  display: flex;
  align-items: center;
`;

export const MenuButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm};
  margin-right: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borders.radiusMd};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.inputBg};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xxl};
`;

export const BranchSelector = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.inputBg};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borders.radiusMd};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: background 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.borderLight};
  }
`;

export const BranchIconWrapper = styled.div`
  margin-right: 6px;
  color: ${({ theme }) => theme.colors.textLight};
  display: flex;
`;

export const DropdownIconWrapper = styled.div`
  margin-left: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
`;

export const NotificationBell = styled.div`
  position: relative;
  color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const NotificationDot = styled.span`
  position: absolute;
  top: 0px;
  right: 2px;
  width: 8px;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.danger};
  border-radius: ${({ theme }) => theme.borders.radiusFull};
  border: 2px solid ${({ theme }) => theme.colors.surface};
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const UserAvatar = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borders.radiusFull};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-right: ${({ theme }) => theme.spacing.md};
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.2;
`;

export const UserRoleText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textLight};
  text-transform: capitalize;
`;
