import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import CommonButton from "../../../components/Button";

import { verifyPaymentRequest } from "../actions/verifyPaymentActions";

const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulseRing = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  70% { box-shadow: 0 0 0 20px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: var(--background, #F4F7F6);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-family: 'Roboto', sans-serif;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid var(--border, #cbd5e1);
  padding: 3.5rem 2.5rem;
  border-radius: 24px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  text-align: center;
  max-width: 480px;
  width: 100%;
  animation: ${fadeSlideUp} 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
`;

const CheckCircle = styled.div`
  width: 80px;
  height: 80px;
  background: var(--success, #38A169);
  border-radius: 50%;
  color: white;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  animation: ${pulseRing} 2s infinite;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--primary, #007664);
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  font-size: 15px;
  margin-bottom: 2rem;
  color: var(--text-muted, #667085);
`;

const InfoBox = styled.div`
  background: var(--secondary, #e6f0ee);
  border: 1px solid var(--border, #cbd5e1);
  padding: 1.25rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  text-align: left;
  font-size: 13px;

  p {
    margin: 8px 0;
    color: var(--text-secondary, #344054);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  strong {
    color: var(--text-main, #101828);
    font-weight: 600;
  }
`;

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const paymentData = location.state;
  const { data, loading, error } = useSelector((state) => state.verifyPayment);

  const handleVerify = () => {
    const payload = {
      razorpay_order_id: paymentData?.razorpay_order_id,
      razorpay_payment_id: paymentData?.razorpay_payment_id,
      razorpay_signature: paymentData?.razorpay_signature,
      usageLogId: paymentData?.usageLogId,
    };
    dispatch(verifyPaymentRequest(payload));
  };

  useEffect(() => {
    if (data?.success) {
      navigate("/admin/dashboard");
    }
    if (error) {
      alert("Payment verification failed. Try again.");
    }
  }, [data, error, navigate]);

  return (
    <PageWrapper>
      <Card>
        <CheckCircle>✓</CheckCircle>
        <Title>Payment Successful!</Title>
        <Subtitle>Your transaction was completed perfectly.</Subtitle>

        <InfoBox>
          <p><span>Amount Paid:</span> <strong>₹{paymentData?.totalAmount}</strong></p>
          <p><span>Order ID:</span> <strong>{paymentData?.razorpay_order_id}</strong></p>
          <p><span>Ref ID:</span> <strong>{paymentData?.razorpay_payment_id?.slice(-8)}</strong></p>
          <p><span>Plan ID:</span> <strong>{paymentData?.planId}</strong></p>
          {paymentData?.appliedCoupon && (
            <p><span>Coupon:</span> <strong>{paymentData.appliedCoupon.couponCode}</strong></p>
          )}
        </InfoBox>

        <CommonButton
          variant="primary"
          style={{
            width: "100%",
            fontSize: "16px",
            padding: "16px",
            background: "var(--success, #38A169)",
            boxShadow: "0 8px 24px rgba(56, 161, 105, 0.3)",
          }}
          onClick={handleVerify}
          disabled={loading}
        >
          {loading ? "Verifying Access..." : "Proceed to Dashboard →"}
        </CommonButton>
      </Card>
    </PageWrapper>
  );
};

export default PaymentSuccess;
