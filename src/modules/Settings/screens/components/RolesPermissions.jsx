import React from 'react';
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
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: var(--text-muted);
  font-size: 15px;
`;

const RolesPermissions = () => {
  return (
    <Container>
      <Title>Roles & Permissions</Title>
      <FormCard>
        This section is currently under development.
      </FormCard>
    </Container>
  );
};

export default RolesPermissions;
