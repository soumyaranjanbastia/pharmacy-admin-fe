import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LuChevronLeft as ChevronLeft } from 'react-icons/lu';

const BackButtonContainer = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #ffffff;
  border: 1px solid var(--border, #cbd5e1);
  color: var(--text-main, #101828);
  cursor: pointer;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  width: fit-content;
  margin-bottom: 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: #f8fafc;
    border-color: var(--border, #cbd5e1);
    transform: translateX(-4px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  &:active {
    transform: translateX(-2px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  svg {
    transition: transform 0.2s ease;
    color: var(--text-muted, #667085);
  }

  &:hover svg {
    transform: translateX(-2px);
    color: var(--text-main, #101828);
  }
`;

const BackButton = ({ text = "Back", to = -1 }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (to === -1) {
            navigate(-1);
        } else {
            navigate(to);
        }
    };

    return (
        <BackButtonContainer onClick={handleBack}>
            <ChevronLeft size={20} />
            {text}
        </BackButtonContainer>
    );
};

export default BackButton;
