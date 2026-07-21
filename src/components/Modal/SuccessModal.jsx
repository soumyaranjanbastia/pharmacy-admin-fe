import React from "react";
import styled, { keyframes } from "styled-components";
import { LuCircleCheck as CheckCircle2 } from 'react-icons/lu';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleBounce = keyframes`
  0% { transform: scale(0.5); opacity: 0; }
  70% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 24px;
  text-align: center;
  max-width: 360px;
  width: 90%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: ${scaleBounce} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: #dcfce7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  color: #22c55e;
`;

const Message = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

const SuccessModal = ({ message }) => {
  return (
    <Overlay>
      <ModalContainer>
        <IconWrapper>
          <CheckCircle2 size={48} />
        </IconWrapper>
        <Message>{message}</Message>
      </ModalContainer>
    </Overlay>
  );
};

export default SuccessModal;
