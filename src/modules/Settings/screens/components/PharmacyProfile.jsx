import React from 'react';
import styled from 'styled-components';
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FullWidth = styled.div`
  margin-bottom: 24px;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid var(--border);
  font-family: inherit;
  font-size: 14px;
  min-height: 120px;
  resize: vertical;
  color: var(--text-dark);

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 4px rgba(0, 82, 255, 0.1);
  }
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 8px;
`;

const PharmacyProfile = () => {
  return (
    <Container>
      <Title>Pharmacy Profile</Title>
      
      <FormCard>
        <FullWidth>
          <TextField 
            label="Pharmacy Name"
            placeholder="Apollo Pharmacy"
            defaultValue="Apollo Pharmacy"
          />
        </FullWidth>

        <Grid>
          <TextField 
            label="Owner Name"
            placeholder="Rajesh Kumar"
            defaultValue="Rajesh Kumar"
          />
          <TextField 
            label="Contact Number"
            placeholder="+91 98765 43210"
            defaultValue="+91 98765 43210"
          />
        </Grid>

        <FullWidth>
          <TextField 
            label="Email Address"
            placeholder="contact@apollopharmacy.com"
            defaultValue="contact@apollopharmacy.com"
          />
        </FullWidth>

        <FullWidth style={{ marginBottom: 0 }}>
          <Label>Address</Label>
          <StyledTextArea 
            placeholder="Enter full address"
          />
        </FullWidth>
      </FormCard>
    </Container>
  );
};

export default PharmacyProfile;
