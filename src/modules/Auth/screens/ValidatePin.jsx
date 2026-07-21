// src/laboratoryManagement/screens/registration/ValidatePin.jsx
import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { LuShieldCheck as ShieldCheck, LuDelete as Delete, LuX as X, LuChevronRight as ChevronRight, LuLock as Lock, LuEye as Eye, LuEyeOff as EyeOff } from 'react-icons/lu';
import { useNavigate } from "react-router-dom";
import { validatePinRequest, validatePinClear } from "../actions/validatePinActions";
import SuccessModal from "../../../components/Modal/SuccessModal";
import { useToast } from "../../../components/Toast/ToastContext";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background, #F4F7F6);
  padding: 24px;
  font-family: 'Roboto', sans-serif;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    background: rgba(0, 118, 100, 0.05);
    filter: blur(100px);
    border-radius: 50%;
    top: -10%;
    left: -10%;
  }
`;

const GlassCard = styled.div`
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 32px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  z-index: 10;
  text-align: center;

  @media (max-width: 480px) {
    padding: 30px 20px;
    border-radius: 24px;
  }
`;

const Header = styled.div`
  margin-bottom: 32px;
  animation: ${slideDown} 0.8s ease;

  @media (max-width: 480px) {
    margin-bottom: 24px;
  }
`;

const IconCircle = styled.div`
  width: 72px;
  height: 72px;
  background: var(--secondary, #e6f0ee);
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary, #007664);
  margin: 0 auto 20px;
  box-shadow: 0 8px 16px rgba(0, 118, 100, 0.1);

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    margin-bottom: 16px;
    
    svg {
      width: 32px;
      height: 32px;
    }
  }
`;

const Title = styled.h1`
  color: var(--text-main, #101828);
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-bottom: 8px;

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

const Description = styled.p`
  color: var(--text-muted, #667085);
  font-size: 15px;
  line-height: 1.5;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ToggleRow = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  margin-top: -12px;

  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted, #667085);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    color: var(--primary, #007664);
    background: var(--secondary, #e6f0ee);
  }
`;

const PinGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-bottom: 40px;

  @media (max-width: 480px) {
    gap: 10px;
    margin-bottom: 30px;
  }
`;

const PinBox = styled.div`
  width: 48px;
  height: 56px;
  background: #ffffff;
  border: 2px solid ${(props) => (props.$active ? "var(--primary, #007664)" : "var(--border, #cbd5e1)")};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-main, #101828);
  font-size: 20px;
  font-weight: 700;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${(props) => (props.$active ? "0 0 15px rgba(0, 118, 100, 0.15)" : "none")};

  @media (max-width: 480px) {
    width: 40px;
    height: 48px;
    font-size: 18px;
  }

  ${(props) => props.$filled && !props.$show && css`
    &::after {
      content: '';
      width: 10px;
      height: 10px;
      background: var(--primary, #007664);
      border-radius: 50%;
    }
  `}
`;

const KeypadContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 480px) {
    gap: 12px;
    margin-bottom: 24px;
  }
`;

const Key = styled.button`
  height: 64px;
  background: #ffffff;
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 16px;
  color: var(--text-main, #101828);
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  @media (max-width: 480px) {
    height: 56px;
    font-size: 20px;
    border-radius: 12px;
  }

  &:hover {
    background: var(--secondary, #e6f0ee);
    border-color: var(--primary, #007664);
    color: var(--primary, #007664);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  }

  &:active {
    transform: translateY(0) scale(0.96);
    background: var(--secondary, #e6f0ee);
  }
`;

const GhostKey = styled(Key)`
  background: transparent;
  border: none;
  color: var(--text-muted, #667085);

  &:hover {
    background: var(--secondary, #e6f0ee);
    color: var(--text-secondary, #344054);
    box-shadow: none;
  }
`;

const PrimaryButton = styled.button`
  width: 100%;
  height: 60px;
  background: linear-gradient(135deg, var(--primary, #007664), var(--primary-dark, #1A4B4B));
  color: white;
  border: none;
  border-radius: 18px;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 118, 100, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(0, 118, 100, 0.3);
    filter: brightness(1.05);
  }

  &:active {
    transform: translateY(-1px);
  }

  &:disabled {
    background: var(--border, #cbd5e1);
    color: #ffffff;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const ValidatePin = () => {
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { success, message, error, loading } = useSelector((state) => state.validatePin);
  const { data: loginData } = useSelector((state) => state.login);
  const userId = loginData?.userId;

  const handleAddDigit = (digit) => {
    if (pin.length < 6) setPin((prev) => prev + digit);
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPin("");
  };

  const handleSubmit = () => {
    if (pin.length < 4) {
      toast.warning("Verification", "PIN must be at least 4 digits");
      return;
    }
    const base64Pin = btoa(pin);
    dispatch(validatePinRequest({ pin: base64Pin, userId }));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= "0" && e.key <= "9") handleAddDigit(e.key);
      else if (e.key === "Backspace") handleBackspace();
      else if (e.key === "Enter") handleSubmit();
      else if (e.key === "Escape") handleClear();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pin]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(validatePinClear());
        navigate("/admin/dashboard");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <Container>
      <GlassCard>
        <Header>
          <IconCircle>
            <ShieldCheck size={38} />
          </IconCircle>
          <Title>Identity Verification</Title>
          <Description>Please enter your 6-digit administrative PIN to unlock the dashboard.</Description>
        </Header>

        <ToggleRow>
          <ToggleButton onClick={() => setShowPin(!showPin)}>
            {showPin ? <EyeOff size={16} /> : <Eye size={16} />}
            {showPin ? "Hide PIN" : "Show PIN"}
          </ToggleButton>
        </ToggleRow>

        <PinGrid>
          {Array.from({ length: 6 }).map((_, i) => (
            <PinBox 
              key={i} 
              $filled={i < pin.length} 
              $active={i === pin.length}
              $show={showPin}
            >
              {showPin && i < pin.length ? pin[i] : ""}
            </PinBox>
          ))}
        </PinGrid>

        <KeypadContainer>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Key key={num} onClick={() => handleAddDigit(num)}>
              {num}
            </Key>
          ))}
          <GhostKey onClick={handleClear} title="Clear All">
            <X size={24} />
          </GhostKey>
          <Key onClick={() => handleAddDigit(0)}>0</Key>
          <GhostKey onClick={handleBackspace} title="Backspace">
            <Delete size={24} />
          </GhostKey>
        </KeypadContainer>

        <PrimaryButton onClick={handleSubmit} disabled={loading || pin.length === 0}>
          {loading ? "Verifying Authority..." : "Authenticate"}
          <ChevronRight size={22} />
        </PrimaryButton>

        {error && <p style={{ color: 'var(--danger, #E53E3E)', marginTop: '20px', fontSize: '14px', fontWeight: '500' }}>{error}</p>}
        {success && <SuccessModal message={message || "Authentication Successful"} />}
      </GlassCard>
    </Container>
  );
};

export default ValidatePin;
