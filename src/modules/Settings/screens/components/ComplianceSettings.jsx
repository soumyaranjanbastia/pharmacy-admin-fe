import React from 'react';
import styled from 'styled-components';
import { LuShieldCheck as ShieldCheck } from 'react-icons/lu';
import TextField from '../../../../components/TextField';

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
`;

const FullWidth = styled.div`
  margin-bottom: 24px;
`;

const VerificationBadge = styled.div`
  background-color: #ECFDF3;
  border: 1px solid #A6F4C5;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BadgeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #027A48;
  font-weight: 600;
  font-size: 16px;
`;

const BadgeText = styled.p`
  margin: 0;
  color: #027A48;
  font-size: 14px;
`;

const ComplianceSettings = () => {
  return (
    <Container>
      <Title>License & Compliance</Title>
      
      <FormCard>
        <FullWidth>
          <TextField 
            label="Drug License Number"
            placeholder="DL-OD-12345-2024"
            defaultValue="DL-OD-12345-2024"
          />
        </FullWidth>

        <FullWidth>
          <TextField 
            label="GST Number"
            placeholder="22AAAAA0000A1Z5"
            defaultValue="22AAAAA0000A1Z5"
          />
        </FullWidth>

        <FullWidth>
          <TextField 
            label="PAN Number"
            placeholder="ABCDE1234F"
            defaultValue="ABCDE1234F"
          />
        </FullWidth>

        <VerificationBadge>
          <BadgeHeader>
            <ShieldCheck size={20} />
            Verified
          </BadgeHeader>
          <BadgeText>
            All compliance documents are verified and up to date
          </BadgeText>
        </VerificationBadge>
      </FormCard>
    </Container>
  );
};

export default ComplianceSettings;
