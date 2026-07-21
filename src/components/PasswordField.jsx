import React, { useState } from "react";
import styled from "styled-components";
import { LuEye as Eye, LuEyeOff as EyeOff } from 'react-icons/lu';

const Wrapper = styled.div`
  width: 90%;
  margin: 0.75rem auto;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 44px 12px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.2);
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  pointer-events: all;

  svg {
    width: 20px;
    height: 20px;
    color: #555;
  }
`;

const Error = styled.div`
  color: red;
  font-size: 13px;
  margin-top: 4px;
  text-align: left;
`;

const PasswordField = ({ label, name, value, onChange, error, maxLength }) => {
  const [show, setShow] = useState(false);

  return (
    <Wrapper>
      <Label htmlFor={name}>{label}</Label>
      <InputContainer>
        <Input
          id={name}
          name={name}
          type={show ? "text" : "password"}
          value={value}
          maxLength={maxLength}
          onChange={onChange}
          autoComplete="off"
        />
        <ToggleButton type="button" onClick={() => setShow((prev) => !prev)}>
          {show ? <EyeOff /> : <Eye />}
        </ToggleButton>
      </InputContainer>
      {error && <Error>{error}</Error>}
    </Wrapper>
  );
};

export default PasswordField;
