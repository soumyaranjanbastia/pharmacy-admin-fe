import React, { useState } from "react";
import styled from "styled-components";
import PlanModal from "./PlanModal";

const Card = styled.div`
  position: relative;
  background: ${({ $selected }) => ($selected ? "#e6f7ff" : "#fafafa")};
  border: 2px solid ${({ $selected }) => ($selected ? "#1890ff" : "#ddd")};
  border-radius: 12px;
  padding: 30px 20px 20px;
  cursor: pointer;
  box-shadow: ${({ $selected }) =>
    $selected
      ? "0px 6px 16px rgba(24,144,255,0.3)"
      : "0px 2px 6px rgba(0,0,0,0.05)"};
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.15);
  }
`;

const PopularBadge = styled.div`
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: gold;
  color: #333;
  font-size: 12px;
  font-weight: bold;
  padding: 6px 14px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);

  &::before {
    content: "★";
    color: #ffbf00;
    font-size: 14px;
  }
`;

const PlanTypeChip = styled.span`
  position: absolute;
  top: 10px;
  right: 12px;
  background: #1890ff;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 8px;
  text-transform: uppercase;
`;

const SelectedTick = styled.div`
  position: absolute;
  top: 10px;
  left: 12px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid #1890ff;
  display: ${({ $show }) => ($show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #1890ff;
  background: #fff;
`;

const PlanName = styled.h3`
  margin: 10px 0 10px;
`;

const Price = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => (props.discount ? "green" : "black")};
`;

const FeatureList = styled.ul`
  margin-top: 10px;
  padding-left: 20px;
  list-style: disc;
`;

const Feature = styled.li`
  margin-bottom: 6px;
`;

const MoreButton = styled.span`
  color: #1890ff;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  margin-left: 6px;

  &:hover {
    text-decoration: underline;
  }
`;

const Link = styled.a`
  color: #1890ff;
  cursor: pointer;
  display: inline-block;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const PlanCard = ({ plan, onClick, selected }) => {
  const [showAll, setShowAll] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [cardClicked, setCardClicked] = useState(false);

  const featuresToShow = showAll ? plan.features : plan.features.slice(0, 4);

  const handleCardClick = () => {
    onClick(plan.planId);
    setCardClicked(true);
  };

  return (
    <>
      <Card
        $selected={selected}
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
      >
        {plan.isPopular === "true" && <PopularBadge>Popular</PopularBadge>}
        <PlanTypeChip>{plan.planType}</PlanTypeChip>
        <SelectedTick $show={!!selected}>✓</SelectedTick>

        <PlanName>{plan.planName}</PlanName>
        <p>{plan.description}</p>

        {plan.hasDiscount ? (
          <>
            <Price discount>Discounted: {plan.formattedDiscountedPrice}</Price>
            <p style={{ textDecoration: "line-through", color: "gray" }}>
              {plan.formattedPrice}
            </p>
            <p>You save: ₹{plan.totalSavings}</p>
          </>
        ) : (
          <Price>{plan.formattedPrice}</Price>
        )}

        <p>
          Duration: {plan.duration} | Users: {plan.userLimit} | Tests: {plan.testLimit}
        </p>

        <FeatureList>
          {featuresToShow.map((feature, index) => (
            <Feature key={index}>
              {feature}
              {index === 3 && !showAll && plan.features.length > 4 && (
                <MoreButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAll(true);
                  }}
                >
                  ...more
                </MoreButton>
              )}
            </Feature>
          ))}
          {showAll && plan.features.length > 4 && (
            <Feature>
              <MoreButton
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAll(false);
                }}
              >
                ...less
              </MoreButton>
            </Feature>
          )}
        </FeatureList>

        <Link
          onClick={(e) => {
            e.stopPropagation();
            if (!cardClicked) return;
            setOpenModal(true);
          }}
          style={{ cursor: cardClicked ? "pointer" : "not-allowed", opacity: cardClicked ? 1 : 0.5 }}
        >
          Click to view pricing →
        </Link>
      </Card>

      <PlanModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        plan={plan}
        coupons={plan.coupons || []}
      />
    </>
  );
};

export default PlanCard;
