import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  outline: none;
  transition: all 0.2s ease-in-out;

  background: ${(props) =>
    props.$variant === "secondary"
      ? "var(--secondary, #e6f0ee)"
      : props.$variant === "indigo"
        ? "linear-gradient(135deg, var(--primary, #007664), #1A4B4B)"
        : props.$variant === "outline"
          ? "#ffffff"
          : "var(--primary, #007664)"};
  
  color: ${(props) =>
    props.$variant === "secondary" ? "var(--primary, #007664)" :
      props.$variant === "indigo" ? "#fff" :
        props.$variant === "outline" ? "var(--text-secondary, #344054)" : "#fff"};

  border: ${(props) =>
    props.$variant === "outline" ? "1px solid var(--border, #cbd5e1)" : "1px solid transparent"};

  &:hover {
    background: ${(props) =>
    props.$variant === "secondary"
      ? "var(--secondary-hover, #d0e3e0)"
      : props.$variant === "indigo"
        ? "linear-gradient(135deg, var(--primary-hover, #005a4c), var(--primary, #007664))"
        : props.$variant === "outline"
          ? "#f9fafb"
          : "var(--primary-hover, #005a4c)"};
    color: ${(props) =>
    props.$variant === "outline" ? "var(--text-main, #101828)" : "#fff"};
  }

  &:disabled {
    background: #f2f4f7;
    color: #98a2b3;
    cursor: not-allowed;
    border: 1px solid var(--border, #cbd5e1);
  }
`;

const Button = ({ children, variant = "primary", disabled = false, ...rest }) => {
  return (
    <StyledButton $variant={variant} disabled={disabled} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
