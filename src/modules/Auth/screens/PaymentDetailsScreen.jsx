import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { paymentDetailsRequest } from "../actions/paymentDetailsActions";
import { paymentRequest } from "../actions/paymentActions";
import BackButton from "../../../components/BackButton";

const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: var(--background, #F4F7F6);
  padding: 3rem 1rem;
  font-family: 'Roboto', sans-serif;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 480px) {
    padding: 1.5rem 0.75rem;
  }
`;

const Container = styled.div`
  max-width: 520px;
  width: 100%;
  background: #fff;
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 20px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  position: relative;
  animation: ${fadeSlideUp} 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
  }
`;

const HeaderNav = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
`;

const HeaderBlock = styled.div`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border, #cbd5e1);
`;

const HeaderTitle = styled.h2`
  font-size: 24px;
  font-weight: 800;
  color: var(--text-main, #101828);
  margin: 0 0 8px;
  letter-spacing: -0.4px;
`;

const CouponBadge = styled.div`
  background: var(--secondary, #e6f0ee);
  color: var(--primary, #007664);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  border: 1px dashed var(--primary, #007664);
  width: 100%;
`;

const DetailsBox = styled.div`
  background: var(--secondary, #e6f0ee);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--border, #cbd5e1);
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
  font-size: 14px;
  color: var(--text-secondary, #344054);
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DiscountRow = styled(Row)`
  color: var(--success, #38A169);
  font-weight: 500;
`;

const Divider = styled.div`
  height: 1px;
  background: var(--border, #cbd5e1);
  margin: 1.25rem 0;
`;

const TotalRow = styled(Row)`
  font-size: 18px;
  font-weight: 800;
  color: var(--text-main, #101828);
  margin-bottom: 0;
  align-items: center;

  .amount {
    font-size: 24px;
    background: linear-gradient(135deg, var(--primary, #007664), var(--primary-dark, #1A4B4B));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const PaymentDetailsScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { planId, couponId } = location.state || {};

  const { data, loading, error } = useSelector((state) => state.paymentDetails);
  const paymentState = useSelector((state) => state.payment);

  useEffect(() => {
    if (planId) {
      dispatch(paymentDetailsRequest({ planId, couponId }));
    }
  }, [dispatch, planId, couponId]);

  const razorpayOpenedRef = React.useRef(false);

  useEffect(() => {
    if (paymentState?.data?.data?.orderId && !razorpayOpenedRef.current) {
      const paymentData = paymentState.data.data;
      razorpayOpenedRef.current = true;

      const options = {
        key: "rzp_test_XpdR0ZsSBAsXpX",
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: "MyApp Services",
        description: "Plan Purchase",
        order_id: paymentData.orderId,
        handler: function (response) {
          navigate("/payment-success", {
            state: {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              totalAmount: paymentData.totalAmount,
              planId: paymentData.planId,
              appliedCoupon: paymentData.appliedCoupon,
              usageLogId: paymentData.usageLogId,
            },
          });
        },
        prefill: {
          name: "Test User",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "var(--primary)",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on("payment.failed", function (err) {
        alert("Payment failed, please try again.");
        razorpayOpenedRef.current = false; // Allow retry if it failed
      });
    }
  }, [paymentState, navigate]);

  if (loading) return <PageWrapper><Container style={{ textAlign: "center", color: "var(--text-muted)" }}>Loading securely...</Container></PageWrapper>;
  if (error) return <PageWrapper><Container style={{ color: "#e53935" }}>Error connecting to payment gateway: {error}</Container></PageWrapper>;
  if (!data) return null;

  const {
    planId: responsePlanId,
    originalAmount,
    discountAmount,
    finalAmount,
    taxAmount,
    platformFee,
    totalAmount,
    appliedCoupon,
    taxfee,
    platformAmount,
  } = data.data;

  const responseCouponId = appliedCoupon?.couponId || null;

  const handleProceedToPay = () => {
    const payload = {
      planId: responsePlanId,
      couponId: responseCouponId,
    };
    dispatch(paymentRequest(payload));
  };

  return (
    <PageWrapper>
      <Container>
        <HeaderNav>
          <BackButton text="Back" />
        </HeaderNav>

        <HeaderBlock>
          <HeaderTitle>Order Summary</HeaderTitle>
          <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>Review your subscription details</div>
        </HeaderBlock>

        {appliedCoupon && (
          <CouponBadge>
            🎉 Coupon Applied: {appliedCoupon.couponCode}
          </CouponBadge>
        )}

        <DetailsBox>
          <Row><span>Subtotal Price</span><span>₹{originalAmount.toFixed(2)}</span></Row>
          {discountAmount > 0 && (
            <DiscountRow><span>Discount</span><span>- ₹{discountAmount.toFixed(2)}</span></DiscountRow>
          )}
          <Row><span>Price after Discount</span><span>₹{finalAmount.toFixed(2)}</span></Row>

          <Divider />

          <Row><span>Tax ({taxfee || 'GST'})</span><span>₹{taxAmount.toFixed(2)}</span></Row>
          <Row><span>Platform Fee ({platformAmount || 'Standard'})</span><span>₹{platformFee.toFixed(2)}</span></Row>

          <Divider />

          <TotalRow>
            <span>Total Payable</span>
            <span className="amount">₹{totalAmount.toFixed(2)}</span>
          </TotalRow>
        </DetailsBox>

        <Button
          style={{ width: "100%", padding: "16px", fontSize: "16px", borderRadius: "12px" }}
          onClick={handleProceedToPay}
        >
          Secure Checkout →
        </Button>
      </Container>
    </PageWrapper>
  );
};

export default PaymentDetailsScreen;
