import React from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  margin-top: 20px;
`;

const CouponBox = styled.div`
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px dashed;
  background: #f9f9f9;

  ${(props) =>
    props.$status === "ACTIVE" &&
    css`
      border-color: #28a745;
      background: #e9fbe9;
      color: #155724;
    `}

  ${(props) =>
    props.$status === "EXPIRED" &&
    css`
      border-color: #dc3545;
      background: #fbe9e9;
      color: #721c24;
      opacity: 0.7;
    `}
`;

const CouponList = ({ coupons }) => {
  if (!coupons || !coupons.length) {
    return (
      <Container>
        <p>No coupons available.</p>
      </Container>
    );
  }

  return (
    <Container>
      <h3>Available Coupons</h3>
      {coupons.map((coupon) => (
        <CouponBox key={coupon.id} $status={coupon.couponStatus}>
          <strong>{coupon.couponCode}</strong> - {coupon.description} <br />
          <small>Status: {coupon.couponStatus}</small>
        </CouponBox>
      ))}
    </Container>
  );
};

export default CouponList;
