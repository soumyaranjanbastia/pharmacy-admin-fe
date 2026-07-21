import React from 'react';
import styled from 'styled-components';
import { LuCircleAlert as AlertCircle, LuX as X } from 'react-icons/lu';

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(15, 23, 42, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalBox = styled.div`
  background: white;
  border-radius: 20px;
  width: 400px;
  max-width: 90vw;
  padding: 32px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  position: relative;
  animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes scaleUp {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  background: #fff1f0;
  color: #ef4444;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 8px 0;
`;

const Message = styled.p`
  font-size: 14px;
  color: var(--text-muted, #667085);
  line-height: 1.5;
  margin: 0 0 24px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.$type === 'danger' ? `
    background: #ef4444;
    color: white;
    border: none;
    &:hover { background: #dc2626; transform: translateY(-1px); }
  ` : `
    background: white;
    color: var(--text-muted, #667085);
    border: 1px solid var(--border, #cbd5e1);
    &:hover { background: #f8fafc; color: #0f172a; }
  `}
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 16px; right: 16px;
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  &:hover { background: #f1f5f9; color: var(--text-muted, #667085); }
`;

const ConfirmModal = ({ 
  show, 
  onClose, 
  onConfirm, 
  title = "Are you sure?", 
  message = "This action cannot be undone.", 
  confirmText = "Yes, Proceed", 
  cancelText = "No, Cancel",
  type = "danger" 
}) => {
  if (!show) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <CloseBtn onClick={onClose}><X size={18} /></CloseBtn>
        <IconWrapper>
          <AlertCircle size={24} />
        </IconWrapper>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <ButtonGroup>
          <ActionButton onClick={onClose}>{cancelText}</ActionButton>
          <ActionButton $type={type} onClick={onConfirm}>{confirmText}</ActionButton>
        </ButtonGroup>
      </ModalBox>
    </Overlay>
  );
};

export default ConfirmModal;
