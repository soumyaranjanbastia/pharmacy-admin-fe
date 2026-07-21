import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary, #344054);
  margin-bottom: 6px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  padding-left: ${(props) => (props.$hasIcon ? "40px" : "14px")};
  border: 1px solid ${(props) => (props.$error ? "#fda29b" : "var(--border, #cbd5e1)")};
  border-radius: 8px;
  font-size: 16px;
  color: var(--text-main, #101828);
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
  font-family: inherit;

  ${(props) => props.as === "textarea" && `
    resize: vertical;
    min-height: 100px;
  `}

  &:focus {
    border-color: var(--border-focus, #0052ff);
    box-shadow: 0 0 0 4px rgba(0, 82, 255, 0.1);
  }

  &::placeholder {
    color: var(--text-muted, #667085);
  }

  &:disabled {
    background-color: #f9fafb;
    color: var(--text-muted, #667085);
    cursor: not-allowed;
  }
`;

const HelperText = styled.span`
  font-size: 12px;
  color: ${(props) => (props.$error ? "#e74c3c" : "var(--text-muted, #667085)")};
  margin-top: 4px;
`;

const TextField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  helperText,
  error,
  icon,
  multiline,
  rows,
  children,
  className,
  style,
  ...rest
}) => {
  const asProp = multiline ? "textarea" : type === "select" ? "select" : "input";
  const typeProp = multiline || type === "select" ? undefined : type;

  return (
    <Wrapper className={className} style={style}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <InputWrapper>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        {type === "select" ? (
          <Input
            as={asProp}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            $error={error}
            $hasIcon={!!icon}
            {...rest}
          >
            {children}
          </Input>
        ) : (
          <Input
            as={asProp}
            id={name}
            name={name}
            type={typeProp}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            $error={error}
            $hasIcon={!!icon}
            rows={multiline ? rows || 4 : undefined}
            {...rest}
          />
        )}
      </InputWrapper>
      {helperText && <HelperText $error={error}>{helperText}</HelperText>}
    </Wrapper>
  );
};

export default TextField;
