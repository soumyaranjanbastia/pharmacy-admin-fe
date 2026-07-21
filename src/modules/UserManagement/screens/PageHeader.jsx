import React from "react";
import styled from "styled-components";
import Button from "../../../components/Button";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin: 4px 0 0;
`;

const Left = styled.div``;

const PageHeader = ({ title, subtitle, onCreate }) => {
  return (
    <HeaderContainer>
      <Left>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Left>
      {onCreate && <Button onClick={onCreate}>+ Add Staff</Button>}
    </HeaderContainer>
  );
};

export default PageHeader;
