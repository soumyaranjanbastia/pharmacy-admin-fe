import React from "react";
import styled from "styled-components";

const Badge = styled.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  display: inline-block;
  width: fit-content;
  text-align: center;

  background-color: ${({ status }) =>
    status === "Active" ? "#ECFDF3" :
    status === "Pending" ? "#FFFAEB" : "#F2F4F7"};
  color: ${({ status }) =>
    status === "Active" ? "#027A48" :
    status === "Pending" ? "#B54708" : "var(--text-secondary)"};
  border: 1px solid ${({ status }) =>
    status === "Active" ? "#ABEFC6" :
    status === "Pending" ? "#FEDF89" : "var(--border)"};
`;

const StatusBadge = ({ status }) => {
  return <Badge status={status}>{status}</Badge>;
};

export default StatusBadge;
