import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  z-index: ${(props) => (props.$isOpen ? "1001" : "auto")};
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputBox = styled.input`
  width: 100%;
  padding: 10px 36px 10px 14px;
  border: 1px solid ${(props) => (props.$error ? "#e74c3c" : "var(--border, #cbd5e1)")};
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  cursor: pointer;
  background: white;
  color: var(--text-main, #101828);
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
  transition: all 0.2s ease-in-out;
 
  &:focus {
    border-color: var(--primary, #1a73e8);
    box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.15);
  }
`;

const ArrowIcon = styled.div`
  position: absolute;
  right: 12px;
  color: var(--text-muted, #667085);
  font-size: 14px;
  pointer-events: none;
`;

const HelperText = styled.span`
  font-size: 12px;
  color: #e74c3c;
  margin-top: 4px;
  display: block;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 180px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 1000;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
`;

const Option = styled.li`
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
 
  &:hover {
    background: #f0f8ff;
  }
`;

const NoOption = styled.li`
  padding: 10px;
  font-size: 14px;
  color: #999;
  text-align: center;
`;

const SearchableDropdown = ({ options = [], placeholder = "Select...", onSelect, error, helperText, value, searchable = true }) => {
  const [search, setSearch] = useState(value || "");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (value !== undefined) {
      setSearch(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    setSearch(val);
    setIsOpen(false);
    if (onSelect) onSelect(val);
  };

  const filteredOptions = searchable ? options.filter((opt) => {
    if (search === value) return true;
    const stringOpt = opt ? opt.toString() : "";
    const stringSearch = search ? search.toString() : "";
    return stringOpt.toLowerCase().includes(stringSearch.toLowerCase());
  }) : options;

  return (
    <Wrapper ref={wrapperRef} $isOpen={isOpen}>
      <InputWrapper>
        <InputBox
          type="text"
          placeholder={placeholder}
          value={search || ""}
          onChange={(e) => {
            if (searchable) {
              setSearch(e.target.value);
              setIsOpen(true);
            }
          }}
          onClick={() => setIsOpen(!isOpen)}
          readOnly={!searchable}
          $error={error}
          style={{ cursor: searchable ? "text" : "pointer" }}
        />
        <ArrowIcon>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </ArrowIcon>
      </InputWrapper>

      {helperText && <HelperText>{helperText}</HelperText>}

      {isOpen && (
        <Dropdown>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, idx) => (
              <Option key={idx} onClick={() => handleSelect(opt)}>
                {opt}
              </Option>
            ))
          ) : (
            <NoOption>No results found</NoOption>
          )}
        </Dropdown>
      )}
    </Wrapper>
  );
};

export default SearchableDropdown;
