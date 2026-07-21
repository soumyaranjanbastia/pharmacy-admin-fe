import React, { useRef } from "react";
import styled from "styled-components";
import PlanCard from "./PlanCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 10px 40px;

  @media (max-width: 768px) {
    padding: 10px 0;
  }
`;

const ScrollWrapper = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    overflow-x: visible;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 10;

  &:hover {
    background: #f0f0f0;
  }

  ${(props) => (props.left ? `left: 10px;` : `right: 10px;`)}

  @media (max-width: 768px) {
    display: none;
  }
`;

const CardContainer = styled.div`
  flex: 0 0 40%;
  min-width: 40%;

  @media (max-width: 768px) {
    flex: 1 1 100%;
    min-width: 100%;
  }
`;

const PlanCarousel = ({ plans, selectedPlanId, onPlanSelect }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild?.offsetWidth + 20;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <CarouselContainer>
      <ArrowButton left onClick={() => scroll("left")}>
        <FaChevronLeft />
      </ArrowButton>

      <ScrollWrapper ref={scrollRef}>
        {plans.map((plan) => {
          const isSelected = String(plan.planId) === String(selectedPlanId);

          return (
            <CardContainer key={plan.planId}>
              <PlanCard
                plan={plan}
                selected={isSelected}
                onClick={() => onPlanSelect(plan.planId)}
              />
            </CardContainer>
          );
        })}
      </ScrollWrapper>

      <ArrowButton onClick={() => scroll("right")}>
        <FaChevronRight />
      </ArrowButton>
    </CarouselContainer>
  );
};

export default PlanCarousel;
