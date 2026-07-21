import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPlansRequest } from "../actions/getPlansActions";
import { getAllCouponsRequest } from "../actions/getAllCouponsActions";
import PlanCarousel from "../../../components/PlanCarousel";
import CouponList from "../../../components/CouponList";
import Button from "../../../components/Button";
import SuccessModal from "../../../components/Modal/SuccessModal";

const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: var(--background, #F4F7F6);
  padding: 3rem 1rem;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 480px) {
    padding: 1.5rem 0.75rem;
  }
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  animation: ${fadeSlideUp} 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  position: relative;
`;

const HeaderNav = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: flex-end;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;
const Title = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: var(--text-main, #101828);
  margin: 0 0 12px;
  letter-spacing: -0.5px;

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const GradientTitle = styled.span`
  background: linear-gradient(135deg, var(--primary, #007664), var(--primary-dark, #1A4B4B));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  color: var(--text-muted, #667085);
  font-size: 16px;
  margin: 0;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.5;
`;

const ErrorMsg = styled.div`
  background: var(--danger-bg, #FFF5F5);
  color: var(--danger, #E53E3E);
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid var(--danger, #E53E3E);
  text-align: center;
  margin-bottom: 2rem;
`;

const LoadingText = styled.div`
  text-align: center;
  color: var(--text-muted, #667085);
  font-size: 16px;
  margin: 3rem 0;
`;

const SubscriptionScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: plansData, loading: plansLoading, error: plansError } =
    useSelector((state) => state.plans || {});

  const { data: couponsData } = useSelector((state) => state.coupons || {});

  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    dispatch(getPlansRequest());
  }, [dispatch]);

  useEffect(() => {
    if (plansData?.data?.length) {
      setSelectedPlanId(plansData.data[0].id);
    }
  }, [plansData]);

  useEffect(() => {
    if (selectedPlanId) {
      dispatch(getAllCouponsRequest({ planId: selectedPlanId }));
    }
  }, [selectedPlanId, dispatch]);

  const plans = plansData?.data || [];

  let coupons = [];
  if (Array.isArray(couponsData)) {
    coupons = couponsData.flat();
  } else if (couponsData?.data) {
    coupons = Array.isArray(couponsData.data)
      ? couponsData.data.flat()
      : [];
  }

  return (
    <PageWrapper>
      <Container>
        <HeaderNav>
          <Button
            onClick={() => {
              setShowSuccess(true);
              setTimeout(() => {
                setShowSuccess(false);
                navigate("/admin/dashboard");
              }, 2000);
            }}
            variant="outline"
            style={{ width: "auto", padding: "8px 20px", borderRadius: "100px", fontSize: "14px" }}
          >
            Skip
          </Button>
        </HeaderNav>

        <Header>
          <Title>Choose Your <GradientTitle>Plan</GradientTitle></Title>
          <Subtitle>Unlock powerful management features tailored to scale with your business.</Subtitle>
        </Header>

        {plansLoading && <LoadingText>Loading plans securely...</LoadingText>}
        {plansError && <ErrorMsg>Error: {plansError}</ErrorMsg>}

        {!plansLoading && !plansError && plans.length > 0 && (
          <PlanCarousel
            plans={plans.map((plan) => ({
              ...plan,
              coupons: coupons.filter((c) => c.applicablePlans?.includes(plan.planId)),
            }))}
            selectedPlanId={selectedPlanId}
            onPlanSelect={setSelectedPlanId}
          />
        )}

        {!plansLoading && !plansError && (
          <CouponList
            coupons={coupons}
            selectedPlanId={selectedPlanId}
            plans={plans}
          />
        )}

        {showSuccess && <SuccessModal message="Registration Successful!" />}
      </Container>
    </PageWrapper>
  );
};

export default SubscriptionScreen;
