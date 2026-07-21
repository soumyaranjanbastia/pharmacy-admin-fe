import React, { createContext, useContext, useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { LuCircleCheck as CheckCircle, LuCircleX as XCircle, LuInfo as Info, LuTriangleAlert as AlertTriangle, LuX as X } from 'react-icons/lu';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;
`;

const ToastItem = styled.div`
  pointer-events: auto;
  min-width: 320px;
  max-width: 450px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-left: 4px solid ${(props) => props.color};
  animation: ${(props) => (props.exiting ? slideOut : slideIn)} 0.3s ease forwards;
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
  color: ${(props) => props.color};
  margin-top: 2px;
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h4`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

const Message = styled.p`
  margin: 4px 0 0 0;
  font-size: 13px;
  color: #4b5563;
  line-height: 1.5;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    color: #6b7280;
  }
`;

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  const showToast = useCallback((type, title, message, duration = 5000) => {
    const id = Date.now();
    const newToast = { id, type, title, message, exiting: false };
    setToasts((prev) => [...prev, newToast]);

    if (duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const success = (title, message, duration) => showToast("success", title, message, duration);
  const error = (title, message, duration) => showToast("error", title, message, duration);
  const info = (title, message, duration) => showToast("info", title, message, duration);
  const warning = (title, message, duration) => showToast("warning", title, message, duration);

  const getIcon = (type) => {
    switch (type) {
      case "success": return <CheckCircle size={20} />;
      case "error": return <XCircle size={20} />;
      case "warning": return <AlertTriangle size={20} />;
      default: return <Info size={20} />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case "success": return "#10b981";
      case "error": return "#ef4444";
      case "warning": return "#f59e0b";
      default: return "var(--primary, #1a73e8)";
    }
  };

  return (
    <ToastContext.Provider value={{ success, error, info, warning }}>
      {children}
      <ToastContainer>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} color={getColor(toast.type)} exiting={toast.exiting}>
            <IconWrapper color={getColor(toast.type)}>
              {getIcon(toast.type)}
            </IconWrapper>
            <Content>
              <Title>{toast.title}</Title>
              {toast.message && <Message>{toast.message}</Message>}
            </Content>
            <CloseButton onClick={() => removeToast(toast.id)}>
              <X size={16} />
            </CloseButton>
          </ToastItem>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};
