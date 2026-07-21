import React from 'react';
import styled from 'styled-components';
import { CheckCircle2, Store, Truck } from 'lucide-react';
import Button from '../../../components/Button';
import { mockInitialOrderDetails } from '../../../data/mockPosBilling';

const SummarySection = styled.div`
  width: 320px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const TopBadges = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const OrderBadge = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 16px;
  background: ${(props) => (props.$type === 'id' ? '#ecfdf5' : '#eff6ff')};
  color: ${(props) => (props.$type === 'id' ? '#047857' : '#2563eb')};
  border: 1px solid ${(props) => (props.$type === 'id' ? '#a7f3d0' : '#bfdbfe')};
`;

const FieldLabel = styled.label`
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted, #667085);
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin-bottom: 6px;
  display: block;
`;

const SummaryInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 13px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #f8fafc;
  outline: none;
  margin-bottom: 16px;
  box-sizing: border-box;

  &:focus {
    border-color: var(--primary, #007664);
    background-color: #ffffff;
  }
`;

const SummaryTitle = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: var(--text-main, #101828);
  margin: 16px 0 14px 0;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: var(--text-muted, #667085);
  margin-bottom: 10px;

  span.val {
    color: var(--text-main, #101828);
    font-weight: 600;
  }
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border, #cbd5e1);

  span.label {
    font-size: 18px;
    font-weight: 800;
    color: var(--text-main, #101828);
  }

  span.total-amount {
    font-size: 22px;
    font-weight: 800;
    color: var(--primary, #007664);
  }
`;

const RxNotice = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #ecfdf5;
  border: 1px solid #a7f3d0;
  color: #047857;
  padding: 12px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  margin: 20px 0 16px 0;
`;

const HeldBillChip = styled.div`
  display: inline-block;
  background-color: #fef3c7;
  color: #92400e;
  border: 1px solid #fde68a;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  font-family: monospace;
  margin-bottom: 20px;
`;

const DeliverySection = styled.div`
  margin-top: 8px;
  margin-bottom: 20px;
`;

const DeliveryGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DeliveryCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid ${(props) => (props.$selected ? 'var(--primary, #007664)' : 'var(--border, #cbd5e1)')};
  background-color: ${(props) => (props.$selected ? 'var(--secondary, #e6f0ee)' : 'var(--surface, #ffffff)')};
  color: ${(props) => (props.$selected ? 'var(--primary, #007664)' : 'var(--text-main, #101828)')};
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary, #007664);
  }
`;

const ActionButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BillSummarySidebar = ({
  currentOrderId,
  patientInfo,
  setPatientInfo,
  couponCode,
  setCouponCode,
  cartItems,
  subtotal,
  gst,
  total,
  viewMode,
  setViewMode,
  deliveryMethod,
  setDeliveryMethod,
  mockHeldBills,
}) => {
  return (
    <SummarySection>
      <div>
        <TopBadges>
          <OrderBadge $type="id">{currentOrderId}</OrderBadge>
          <OrderBadge $type="status">{mockInitialOrderDetails.orderType}</OrderBadge>
        </TopBadges>

        <FieldLabel>REFERRED BY</FieldLabel>
        <SummaryInput
          type="text"
          placeholder="Name"
          value={patientInfo.referredBy}
          onChange={(e) => setPatientInfo({ ...patientInfo, referredBy: e.target.value })}
        />

        <FieldLabel>DISCOUNT COUPON</FieldLabel>
        <SummaryInput
          type="text"
          placeholder="AXER200"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />

        <SummaryTitle>Bill Summary</SummaryTitle>

        <SummaryRow>
          <span>Subtotal ({cartItems.length} items)</span>
          <span className="val">₹{subtotal > 0 ? subtotal : '00'}</span>
        </SummaryRow>

        <SummaryRow>
          <span>GST ({mockInitialOrderDetails.gstRate}%)</span>
          <span className="val">₹{gst > 0 ? gst : '0'}</span>
        </SummaryRow>

        <SummaryRow>
          <span>Discount</span>
          <span className="val">-</span>
        </SummaryRow>

        <TotalRow>
          <span className="label">Total</span>
          <span className="total-amount">₹{total > 0 ? total : '00'}</span>
        </TotalRow>

        <RxNotice>
          <CheckCircle2 size={18} />
          <span>
            {cartItems.some((item) => item.isRx)
              ? 'Rx items verified from uploaded prescription'
              : 'No Rx items — verification not required'}
          </span>
        </RxNotice>

        {/* Interactive Delivery Method Selection */}
        {viewMode === 'payment' && (
          <DeliverySection>
            <FieldLabel>Delivery Method</FieldLabel>
            <DeliveryGrid>
              <DeliveryCard
                $selected={deliveryMethod === 'Self Pickup'}
                onClick={() => setDeliveryMethod('Self Pickup')}
              >
                <Store size={18} />
                <span>Self Pickup</span>
              </DeliveryCard>
              <DeliveryCard
                $selected={deliveryMethod === 'Home delivery'}
                onClick={() => setDeliveryMethod('Home delivery')}
              >
                <Truck size={18} />
                <span>Home delivery</span>
              </DeliveryCard>
            </DeliveryGrid>
          </DeliverySection>
        )}

        {viewMode === 'billing' && (
          <>
            <FieldLabel>HELD BILLS</FieldLabel>
            {mockHeldBills.map((hb) => (
              <HeldBillChip key={hb.id}>
                {cartItems.length === 0 ? `${hb.name} - ₹00` : `${hb.name} - ₹${total}`}
              </HeldBillChip>
            ))}
          </>
        )}
      </div>

      {/* Action Buttons at Bottom of Right Sidebar */}
      {viewMode === 'billing' && (
        <Button
          variant="primary"
          style={{ width: '100%', padding: '14px' }}
          onClick={() => setViewMode('payment')}
        >
          Proceed to Payment · ₹{total > 0 ? total : '00'}
        </Button>
      )}

      {viewMode === 'payment' && (
        <ActionButtonGroup>
          <Button
            variant="outline"
            style={{ width: '100%', padding: '12px' }}
            onClick={() => setViewMode('preview')}
          >
            Preview Invoice
          </Button>
          <Button
            variant="primary"
            style={{ width: '100%', padding: '14px' }}
            onClick={() => setViewMode('completed')}
          >
            Print Invoice
          </Button>
        </ActionButtonGroup>
      )}
    </SummarySection>
  );
};

export default BillSummarySidebar;
