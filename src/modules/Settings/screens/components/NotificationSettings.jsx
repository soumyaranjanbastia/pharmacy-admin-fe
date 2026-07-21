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
  gap: 24px;
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

const SettingDescription = styled.div`
  font-size: 13px;
  color: var(--text-muted);
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

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    newOrder: true,
    lowStock: true,
    expiry: true,
    email: false
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <Container>
      <Title>Notification Settings</Title>
      
      <FormCard>
        <ToggleRow>
          <ToggleInfo>
            <ToggleLabel>New Order Alerts</ToggleLabel>
            <SettingDescription>Get notified when a new order is received</SettingDescription>
          </ToggleInfo>
          <ToggleSwitch>
            <input 
              type="checkbox" 
              checked={settings.newOrder} 
              onChange={() => toggleSetting('newOrder')} 
            />
            <span />
          </ToggleSwitch>
        </ToggleRow>

        <ToggleRow>
          <ToggleInfo>
            <ToggleLabel>Low Stock Alerts</ToggleLabel>
            <SettingDescription>Receive alerts when inventory is running low</SettingDescription>
          </ToggleInfo>
          <ToggleSwitch>
            <input 
              type="checkbox" 
              checked={settings.lowStock} 
              onChange={() => toggleSetting('lowStock')} 
            />
            <span />
          </ToggleSwitch>
        </ToggleRow>

        <ToggleRow>
          <ToggleInfo>
            <ToggleLabel>Expiry Alerts</ToggleLabel>
            <SettingDescription>Get notified about medicines nearing expiry</SettingDescription>
          </ToggleInfo>
          <ToggleSwitch>
            <input 
              type="checkbox" 
              checked={settings.expiry} 
              onChange={() => toggleSetting('expiry')} 
            />
            <span />
          </ToggleSwitch>
        </ToggleRow>

        <ToggleRow>
          <ToggleInfo>
            <ToggleLabel>Email Notifications</ToggleLabel>
            <SettingDescription>Receive notifications via email</SettingDescription>
          </ToggleInfo>
          <ToggleSwitch>
            <input 
              type="checkbox" 
              checked={settings.email} 
              onChange={() => toggleSetting('email')} 
            />
            <span />
          </ToggleSwitch>
        </ToggleRow>
      </FormCard>
    </Container>
  );
};

export default NotificationSettings;
