import React from "react";
import styled from "styled-components";

const DropdownWrapper = styled.div`
  margin-bottom: 20px;
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  input {
    margin-right: 10px;
  }
`;

const ComboList = ({ options, selectedOptions, setSelectedOptions }) => {
  const handleChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <DropdownWrapper>
      {options.map((option) => (
        <CheckboxItem key={option}>
          <input
            type="checkbox"
            checked={selectedOptions.includes(option)}
            onChange={() => handleChange(option)}
          />
          <label>{option}</label>
        </CheckboxItem>
      ))}
    </DropdownWrapper>
  );
};

export default ComboList;
