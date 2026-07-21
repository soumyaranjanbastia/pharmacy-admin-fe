import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(0.95); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(0.95); opacity: 0.5; }
`;

const LoaderOverlay = styled.div`
  position: ${props => props.fullScreen ? 'fixed' : 'absolute'};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.transparent ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: ${props => props.fullScreen ? 9999 : 10};
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const SpinnerWrapper = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpinnerOuter = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid transparent;
  border-top-color: #009688;
  border-bottom-color: #009688;
  animation: ${spin} 1.5s linear infinite;
`;

const SpinnerInner = styled.div`
  position: absolute;
  width: 70%;
  height: 70%;
  border-radius: 50%;
  border: 4px solid transparent;
  border-left-color: #00796b;
  border-right-color: #00796b;
  animation: ${spin} 1s linear infinite reverse;
`;

const LogoCenter = styled.div`
  width: 20px;
  height: 20px;
  background-color: #009688;
  border-radius: 50%;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const LoadingText = styled.div`
  font-family: 'Outfit', 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
  letter-spacing: 0.5px;
  background: linear-gradient(90deg, #0f172a, #009688, #0f172a);
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: shine 2s linear infinite;

  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }
`;

const SubText = styled.div`
  font-family: 'Outfit', 'Inter', sans-serif;
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
`;

/**
 * Common Loader Component
 * @param {boolean} fullScreen - If true, covers the entire viewport. Otherwise, covers nearest relative parent.
 * @param {string} text - Main loading text.
 * @param {string} subText - Secondary loading description.
 * @param {boolean} transparent - Whether background should be more transparent.
 */
const Loader = ({ fullScreen = false, text = 'Loading data...', subText = 'Please wait a moment', transparent = false }) => {
  return (
    <LoaderOverlay fullScreen={fullScreen} transparent={transparent}>
      <LoaderContainer>
        <SpinnerWrapper>
          <SpinnerOuter />
          <SpinnerInner />
          <LogoCenter />
        </SpinnerWrapper>
        <LoadingText>{text}</LoadingText>
        {subText && <SubText>{subText}</SubText>}
      </LoaderContainer>
    </LoaderOverlay>
  );
};

export default Loader;
