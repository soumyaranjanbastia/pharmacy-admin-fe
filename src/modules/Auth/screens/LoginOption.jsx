// src/laboratoryManagement/screens/registration/LoginOption.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { LuSmartphone as Smartphone, LuKeyRound as KeyRound, LuChevronRight as ChevronRight, LuShieldCheck as ShieldCheck, LuCircleCheck as CheckCircle2 } from 'react-icons/lu';
import { setAuthTypeRequest } from "../actions/setAuthTypeActions";
import SuccessModal from "../../../components/Modal/SuccessModal";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background, #F4F7F6);
  padding: 24px 16px;
  font-family: 'Roboto', sans-serif;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 24px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
  animation: ${fadeIn} 0.6s ease-out;
  overflow: hidden;
  border: 1px solid var(--border, #cbd5e1);
`;

const Header = styled.div`
  background: linear-gradient(135deg, var(--primary, #007664), var(--primary-dark, #1A4B4B));
  padding: 32px 24px;
  text-align: center;
  color: #ffffff;
`;

const HeaderIcon = styled.div`
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  backdrop-filter: blur(8px);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  margin: 0 0 8px;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
`;

const Content = styled.div`
  padding: 32px 40px;

  @media (max-width: 480px) {
    padding: 24px 20px;
  }
`;

const OptionGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OptionCard = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  position: relative;
  
  ${(props) => props.$active ? css`
    border: 2px solid var(--primary, #007664);
    background: var(--secondary, #e6f0ee);
    box-shadow: 0 4px 12px rgba(0, 118, 100, 0.1);
  ` : css`
    border: 2px solid var(--border, #cbd5e1);
    background: #ffffff;
    
    &:hover {
      border-color: var(--primary, #007664);
      background: var(--secondary, #e6f0ee);
      transform: translateY(-2px);
    }
  `}
`;

const OptionIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
  
  ${(props) => props.$active ? css`
    background: var(--primary, #007664);
    color: white;
  ` : css`
    background: var(--secondary, #e6f0ee);
    color: var(--text-muted, #667085);
  `}
`;

const OptionText = styled.div`
  flex: 1;
`;

const OptionTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main, #101828);
  margin-bottom: 4px;
`;

const OptionDesc = styled.div`
  font-size: 13px;
  color: var(--text-muted, #667085);
  line-height: 1.4;
`;

const StatusIcon = styled.div`
  color: var(--primary, #007664);
  opacity: ${(props) => props.$active ? 1 : 0};
  transition: all 0.2s;
`;

const LoginOption = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error } = useSelector((state) => state.setAuthType);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const location = useLocation();
  const companyId = location.state?.companyId;

  const handleSelect = (type) => {
    setSelected(type);
    dispatch(setAuthTypeRequest({ authType: type }));
  };

  useEffect(() => {
    if (data && data.success) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/company-details", { state: { companyId } });
      }, 2000);
    }
  }, [data, navigate, companyId]);

  return (
    <Container>
      <Card>
        <Header>
          <HeaderIcon>
            <ShieldCheck size={32} />
          </HeaderIcon>
          <Title>Secure Login</Title>
          <Subtitle>Choose your preferred way to sign in next time</Subtitle>
        </Header>

        <Content>
          <OptionGrid>
            <OptionCard $active={selected === "otp"} onClick={() => handleSelect("otp")}>
              <OptionIcon $active={selected === "otp"}>
                <Smartphone size={24} />
              </OptionIcon>
              <OptionText>
                <OptionTitle>OTP Verification</OptionTitle>
                <OptionDesc>Secure code sent via email or SMS for every login</OptionDesc>
              </OptionText>
              <StatusIcon $active={selected === "otp"}>
                <CheckCircle2 size={20} />
              </StatusIcon>
            </OptionCard>

            <OptionCard $active={selected === "pin"} onClick={() => handleSelect("pin")}>
              <OptionIcon $active={selected === "pin"}>
                <KeyRound size={24} />
              </OptionIcon>
              <OptionText>
                <OptionTitle>Secure PIN</OptionTitle>
                <OptionDesc>Fast and easy access using your 6-digit secure PIN</OptionDesc>
              </OptionText>
              <StatusIcon $active={selected === "pin"}>
                <CheckCircle2 size={20} />
              </StatusIcon>
            </OptionCard>
          </OptionGrid>
          {error && (
            <p style={{ color: 'var(--danger, #E53E3E)', textAlign: 'center', marginTop: '20px', fontSize: '14px', fontWeight: '500' }}>
              {error}
            </p>
          )}
        </Content>
      </Card>

      {showModal && (
        <SuccessModal message="Login method selected successfully!" />
      )}
    </Container>
  );
};

export default LoginOption;
