import React from 'react';
import styled from 'styled-components';
import { Check, Clock, Printer } from 'lucide-react';
import { mockWalkInOrderLifecycle, mockDeliveryOrderLifecycle } from '../../../data/mockPosBilling';

const OrderCompleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
`;

const SuccessPulseCircle = styled.div`
  width: 80px;
  height: 80px;
  background-color: #d1fae5;
  color: #059669;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 0 0 12px rgba(209, 250, 229, 0.4);
`;

const CompleteHeading = styled.h2`
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 6px 0;
`;

const CompleteMetaSub = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0 0 32px 0;
  font-weight: 500;
`;

const LifecycleBox = styled.div`
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 14px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

const LifecycleTab = styled.div`
  background: #f8fafc;
  padding: 14px 24px;
  font-size: 13px;
  font-weight: 700;
  color: #64748b;
  border-bottom: 1px solid #e2e8f0;
`;

const LifecycleContent = styled.div`
  padding: 28px 32px;
`;

const StepItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding-bottom: 24px;

  &:last-child {
    padding-bottom: 0;
  }

  /* Single straight continuous vertical line reused across all steps */
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 14px;
    top: 30px;
    bottom: 0;
    width: 2px;
    background-color: ${(props) => (props.$done ? '#007664' : '#e2e8f0')};
  }

  .left-side {
    display: flex;
    align-items: center;
    gap: 16px;

    .icon-badge {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: ${(props) => (props.$done ? '#007664' : '#ffffff')};
      border: 2px solid ${(props) => (props.$done ? '#007664' : '#94a3b8')};
      color: ${(props) => (props.$done ? '#ffffff' : '#94a3b8')};
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
    }

    span.step-text {
      font-size: 15px;
      font-weight: 700;
      color: #101828;
    }
  }

  span.step-time {
    font-size: 13px;
    color: #94a3b8;
    font-weight: 500;
  }
`;

const PrintBottomButton = styled.button`
  width: 100%;
  margin-top: 24px;
  padding: 14px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #cbd5e1);
  color: var(--text-secondary, #344054);
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    border-color: var(--primary, #007664);
    color: var(--primary, #007664);
  }
`;

const OrderCompleteView = ({
  currentOrderId,
  total,
  paymentMethod,
  deliveryMethod,
  onPrintInvoice,
}) => {
  const activeLifecycle =
    deliveryMethod === 'Home delivery' || paymentMethod === 'COD'
      ? mockDeliveryOrderLifecycle
      : mockWalkInOrderLifecycle;

  return (
    <OrderCompleteWrapper>
      <SuccessPulseCircle>
        <Check size={44} />
      </SuccessPulseCircle>

      <CompleteHeading>Order Complete!</CompleteHeading>
      <CompleteMetaSub>
        {currentOrderId} · ₹{total} · {paymentMethod.toLowerCase()}
      </CompleteMetaSub>

      <LifecycleBox>
        <LifecycleTab>Order Lifecycle</LifecycleTab>
        <LifecycleContent>
          {activeLifecycle.map((step) => (
            <StepItemRow key={step.id} $done={step.done}>
              <div className="left-side">
                <div className="icon-badge">
                  {step.done ? <Check size={16} /> : <Clock size={16} />}
                </div>
                <span className="step-text">{step.text}</span>
              </div>
              <span className="step-time">{step.time}</span>
            </StepItemRow>
          ))}
        </LifecycleContent>
      </LifecycleBox>

      <PrintBottomButton onClick={onPrintInvoice}>
        <Printer size={18} /> Print Invoice
      </PrintBottomButton>
    </OrderCompleteWrapper>
  );
};

export default OrderCompleteView;
