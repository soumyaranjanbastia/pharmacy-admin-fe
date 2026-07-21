import React from "react";
import styled from "styled-components";
import { LuCheck as Check } from 'react-icons/lu';

const StepperWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 32px auto;
  position: relative;
  max-width: 720px;
  width: 100%;
  padding: 0 16px;

  @media (max-width: 600px) {
    margin: 24px auto;
    padding: 0 8px;
  }
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 18px;
    left: calc(50% + 24px);
    right: calc(-50% + 24px);
    height: 3px;
    background: ${(props) => (props.$completed ? "linear-gradient(90deg, var(--primary, #1a73e8), #60a5fa)" : "var(--border, #cbd5e1)")};
    z-index: 0;
    border-radius: 4px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @media (max-width: 600px) {
    &:not(:last-child)::after {
      left: calc(50% + 18px);
      right: calc(-50% + 18px);
      height: 2px;
      top: 15px;
    }
  }
`;

const Dot = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid
    ${(props) =>
      props.$completed
        ? "var(--primary, #1a73e8)"
        : props.$active
        ? "var(--primary, #1a73e8)"
        : "var(--border, #cbd5e1)"};
  background-color: ${(props) =>
    props.$completed ? "var(--primary, #1a73e8)" : props.$active ? "#ffffff" : "#ffffff"};
  color: ${(props) => (props.$completed ? "#ffffff" : props.$active ? "var(--primary, #1a73e8)" : "var(--text-muted, #667085)")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  z-index: 1;
  box-shadow: ${(props) =>
    props.$active
      ? "0 0 0 4px rgba(26, 115, 232, 0.15), 0 4px 6px -1px rgba(0,0,0,0.05)"
      : props.$completed
      ? "0 4px 6px -1px rgba(26, 115, 232, 0.15)"
      : "none"};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${(props) => (props.$active ? "scale(1.1)" : "scale(1)")};

  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
    font-size: 12px;
  }
`;

const Label = styled.span`
  margin-top: 10px;
  font-size: 12px;
  font-weight: ${(props) => (props.$active ? "700" : "600")};
  color: ${(props) => (props.$active ? "var(--primary, #1a73e8)" : props.$completed ? "var(--text-main, #101828)" : "#94a3b8")};
  text-align: center;
  transition: all 0.3s ease;
  white-space: nowrap;

  @media (max-width: 600px) {
    font-size: 9px;
    margin-top: 8px;
    white-space: normal;
    max-width: 65px;
    line-height: 1.2;
  }
`;

const ProgressDots = ({ currentStep, totalSteps, labels = [] }) => {
  return (
    <StepperWrapper>
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const completed = step < currentStep;
        const active = step === currentStep;

        return (
          <StepWrapper key={step} $completed={completed} $active={active}>
            <Dot $active={active} $completed={completed}>
              {completed ? <Check size={16} strokeWidth={3} /> : step}
            </Dot>
            {labels.length > 0 && (
              <Label $active={active} $completed={completed}>
                {labels[i] || `Step ${step}`}
              </Label>
            )}
          </StepWrapper>
        );
      })}
    </StepperWrapper>
  );
};

export default ProgressDots;
