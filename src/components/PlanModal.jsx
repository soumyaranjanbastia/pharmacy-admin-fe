import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";
import TextField from "./TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  applyCouponsRequest,
  clearApplyCoupons,
} from "../modules/Auth/actions/applyCouponsActions";
import { useNavigate } from "react-router-dom";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: ${({ $open }) => ($open ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 420px;
  max-width: 95%;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.25);
`;

const PlanHeader = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const OriginalPrice = styled.p`
  font-size: 16px;
  color: #888;
  text-decoration: line-through;
  margin-bottom: 5px;
`;

const DiscountedPrice = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 20px;
`;

const CouponWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FeatureList = styled.ul`
  margin: 20px 0;
  padding-left: 20px;
  list-style: none;
`;

const Feature = styled.li`
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;

  &::before {
    content: "✔";
    color: #28a745;
    margin-right: 8px;
    font-weight: bold;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const PlanModal = ({ open, onClose, plan, coupons = [] }) => {
  const [couponCode, setCouponCode] = useState("");
  const [finalPrice, setFinalPrice] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: appliedCouponData } = useSelector(
    (state) => state.appliedCoupon
  );

  useEffect(() => {
    if (appliedCouponData && appliedCouponData.success && appliedCouponData.data) {
      setFinalPrice(appliedCouponData.data.finalAmount);
    }
  }, [appliedCouponData]);

  if (!plan) return null;

  const handleApplyCoupon = () => {
    const couponCodeTrimmed = couponCode.trim();
    const selectedCoupon = coupons.find(
      (c) => c.couponCode === couponCodeTrimmed
    );

    if (selectedCoupon) {
      const payload = {
        planId: plan.planId,
        couponId: selectedCoupon.id,
      };
      dispatch(applyCouponsRequest(payload));
    } else {
      alert("Invalid coupon code");
    }
  };

  const handleClose = () => {
    setCouponCode("");
    setFinalPrice(null);
    dispatch(clearApplyCoupons());
    onClose();
  };

  const handleProceedToPayment = () => {
    const payload = {
      planId: plan.planId,
      couponId: appliedCouponData?.data?.couponId || null,
    };

    handleClose();
    navigate("/payment-details", { state: payload });
  };

  const displayPrice =
    plan.hasDiscount ? plan.discountedPrice : plan.price;

  return (
    <ModalOverlay $open={open} onClick={handleClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <PlanHeader>{plan.planName}</PlanHeader>

        {finalPrice !== null ? (
          <>
            <OriginalPrice>{displayPrice}/month</OriginalPrice>
            <DiscountedPrice>{finalPrice}/month</DiscountedPrice>
          </>
        ) : (
          <DiscountedPrice>
            {displayPrice}/month
          </DiscountedPrice>
        )}

        <CouponWrapper>
          <TextField
            name="coupon"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            label="Coupon"
          />
          <Button onClick={handleApplyCoupon}>Apply</Button>
        </CouponWrapper>

        <FeatureList>
          {plan.features.slice(0, 4).map((f, i) => (
            <Feature key={i}>{f}</Feature>
          ))}
        </FeatureList>

        <Actions>
          <Button variant="secondary" onClick={handleClose}>
            Back to Plans
          </Button>
          <Button onClick={handleProceedToPayment}>
            Proceed to Payment →
          </Button>
        </Actions>
      </ModalBox>
    </ModalOverlay>
  );
};

export default PlanModal;
