import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: var(--text-dark);
  margin-top: 0;
  margin-bottom: 24px;
`;

const FormCard = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid var(--border);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const SettingBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SettingLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-dark);
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledInput = styled.input`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid var(--border);
  font-size: 14px;
  width: 120px;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 4px rgba(0, 82, 255, 0.1);
  }
`;

const InputSuffix = styled.span`
  font-size: 14px;
  color: var(--text-secondary);
`;

const SettingDescription = styled.div`
  font-size: 13px;
  color: var(--text-muted);
`;

const Divider = styled.div`
  height: 1px;
  background-color: var(--border);
  margin: 8px 0;
`;

const ToggleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ToggleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ToggleLabel = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: var(--text-dark);
`;

/* Simple pure CSS toggle */
const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #E5E7EB;
    transition: .3s;
    border-radius: 24px;
  }

  span:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .3s;
    border-radius: 50%;
  }

  input:checked + span {
    background-color: var(--primary);
  }

  input:checked + span:before {
    transform: translateX(20px);
  }
`;

const InventorySettings = () => {
  const [autoReorder, setAutoReorder] = useState(true);

  return (
    <Container>
      <Title>Inventory Settings</Title>
      
      <FormCard>
        <SettingBlock>
          <SettingLabel>Low Stock Threshold</SettingLabel>
          <InputRow>
            <StyledInput type="number" defaultValue={10} />
            <InputSuffix>units</InputSuffix>
          </InputRow>
          <SettingDescription>Alert when stock falls below this quantity</SettingDescription>
        </SettingBlock>

        <SettingBlock>
          <SettingLabel>Expiry Alert Period</SettingLabel>
          <InputRow>
            <StyledInput type="number" defaultValue={30} />
            <InputSuffix>days before expiry</InputSuffix>
          </InputRow>
          <SettingDescription>Receive alerts for medicines expiring soon</SettingDescription>
        </SettingBlock>

        <Divider />

        <ToggleRow>
          <ToggleInfo>
            <ToggleLabel>Auto Reorder Suggestions</ToggleLabel>
            <SettingDescription>Get automatic reorder suggestions for low stock items</SettingDescription>
          </ToggleInfo>
          <ToggleSwitch>
            <input 
              type="checkbox" 
              checked={autoReorder} 
              onChange={() => setAutoReorder(!autoReorder)} 
            />
            <span />
          </ToggleSwitch>
        </ToggleRow>
      </FormCard>
    </Container>
  );
};

export default InventorySettings;
