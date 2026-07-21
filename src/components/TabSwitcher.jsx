import React from "react";
import styled from "styled-components";

const TabContainer = styled.div`
  display: flex;
  background: #f1f5f9;
  padding: 6px;
  border-radius: 12px;
  width: fit-content;
  margin-bottom: 32px;
  border: 1px solid var(--border);
  box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.05);

  @media (max-width: 600px) {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Tab = styled.button`
  padding: 12px 28px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  background: ${(props) => (props.$active ? "linear-gradient(135deg, var(--primary), #0d47a1)" : "transparent")};
  color: ${(props) => (props.$active ? "#FFFFFF" : "var(--text-muted)")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${(props) => (props.$active ? "0px 4px 12px rgba(26, 115, 232, 0.25)" : "none")};
  flex-shrink: 0;
  white-space: nowrap;
  letter-spacing: 0.1px;

  @media (max-width: 600px) {
    flex: 1;
    padding: 12px 10px;
    font-size: 13px;
  }

  &:hover {
    color: ${(props) => (props.$active ? "#FFFFFF" : "var(--text-main)")};
    background: ${(props) => (props.$active ? "linear-gradient(135deg, #1557b0, var(--primary))" : "var(--border)")};
  }
`;

const TabSwitcher = ({ tabs, activeTab, onTabChange }) => {
  return (
    <TabContainer>
      {tabs.map((tab, idx) => (
        <Tab
          key={idx}
          $active={activeTab === tab}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </Tab>
      ))}
    </TabContainer>
  );
};

export default TabSwitcher;
