import styled from 'styled-components';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { navConfig, bottomNavConfig } from './navConfig';
import { Link, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';


const Sidebar = ({ userRole, isOpen, toggleSidebar }) => {
  const { t } = useTranslation();

  const topNavItems = navConfig.filter((item) =>
    item.roles.includes(userRole)
  );
  
  const bottomNavItems = bottomNavConfig.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <SidebarContainer $isOpen={isOpen}>
      <SidebarInner>
        {/* Logo Area */}
        <SidebarLogoArea>
          <LogoContent>
            <LogoIconContainer>
              <LogoIconWrapper>
                <Link size={20} />
              </LogoIconWrapper>
            </LogoIconContainer>
            <LogoText>
              <LogoTitle>{t('sidebar.title')}</LogoTitle>
              <LogoSubtitle>{t('sidebar.subtitle')}</LogoSubtitle>
            </LogoText>
          </LogoContent>
          
          <CloseButton onClick={toggleSidebar}>
            <X size={20} />
          </CloseButton>
        </SidebarLogoArea>

        {/* Main Navigation */}
        <SidebarNav>
          <ul>
            {topNavItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <StyledNavLink to={item.path}>
                    <NavIconWrapper>
                      <Icon size={20} />
                    </NavIconWrapper>
                    <span>{t(item.translationKey)}</span>
                  </StyledNavLink>
                </li>
              );
            })}
          </ul>
        </SidebarNav>

        {/* Bottom Navigation */}
        <SidebarBottom>
          <ul>
            {bottomNavItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <StyledNavLink to={item.path}>
                    <NavIconWrapper>
                      <Icon size={20} />
                    </NavIconWrapper>
                    <span>{t(item.translationKey)}</span>
                  </StyledNavLink>
                </li>
              );
            })}
          </ul>
        </SidebarBottom>
      </SidebarInner>
    </SidebarContainer>
  );
};

export default Sidebar;


// --- Styled Components ---



export const SidebarContainer = styled.aside`
  width: ${({ $isOpen }) => ($isOpen ? '260px' : '0px')};
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.sidebarBg};
  color: ${({ theme }) => theme.colors.secondary};
  height: 100vh;
  box-shadow: ${({ theme }) => theme.shadows.sidebar};
  z-index: ${({ theme }) => theme.zIndices.sidebar};
`;

export const SidebarInner = styled.div`
  width: 260px;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const SidebarLogoArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const LogoContent = styled.div`
  display: flex;
  align-items: center;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borders.radiusSm};
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const LogoIconContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borders.radiusMd};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.md};
  transform: rotate(45deg);
`;

export const LogoIconWrapper = styled.div`
  transform: rotate(-45deg);
  display: flex;
`;

export const LogoText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LogoTitle = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin: 0;
  line-height: 1.2;
  letter-spacing: 1px;
`;

export const LogoSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const SidebarNav = styled.nav`
  flex: 1;
  overflow-y: auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: ${({ theme }) => theme.borders.radiusSm};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borders.radiusMd};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  transition: all 0.2s ease;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.lg};

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: ${({ theme }) => theme.colors.white};
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme }) => theme.colors.white};

    svg {
      opacity: 1;
      color: #4DE6D6; /* Bright mint highlight */
    }
  }
`;

export const NavIconWrapper = styled.div`
  margin-right: 14px;
  opacity: 0.8;
  display: flex;
`;

export const SidebarBottom = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;
