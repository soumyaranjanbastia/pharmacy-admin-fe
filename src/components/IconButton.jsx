import React from "react";
import styled from "styled-components";
import { LuArrowLeft as ArrowLeft, LuSkipForward as SkipForward } from 'react-icons/lu';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 14px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) =>
    props.variant === "back" ? "#f0f0f0" : "#007bff"};
  color: ${(props) => (props.variant === "back" ? "#333" : "#fff")};
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const IconButton = ({ variant = "back", label, onClick }) => {
  return (
    <Button variant={variant} onClick={onClick}>
      {variant === "back" && <ArrowLeft size={18} />}
      {variant === "skip" && <SkipForward size={18} />}
      {label}
    </Button>
  );
};

export default IconButton;
