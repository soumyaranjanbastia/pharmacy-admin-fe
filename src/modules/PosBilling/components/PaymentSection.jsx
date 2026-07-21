import React from 'react';
import styled from 'styled-components';
import { Banknote, CreditCard, QrCode, Truck } from 'lucide-react';
import { mockInitialOrderDetails, mockPaymentMethods } from '../../../data/mockPosBilling';

const AmountDueBox = styled.div`
  margin-top: 16px;
  
  .label {
    font-size: 12px;
    font-weight: 700;
    color: var(--text-muted, #667085);
    letter-spacing: 0.8px;
  }
  .amount {
    font-size: 36px;
    font-weight: 800;
    color: var(--text-main, #101828);
    margin: 4px 0;
  }
  .subtext {
    font-size: 13px;
    color: var(--text-muted, #667085);
  }
`;

const DiscountBox = styled.div`
  border: 2px dashed #a7f3d0;
  background: #f0fdf4;
  border-radius: 12px;
  padding: 20px;
  margin-top: 24px;

  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    h3 {
      font-size: 15px;
      font-weight: 700;
      color: #047857;
      margin: 0;
    }
    span.tag {
      font-size: 12px;
      font-weight: 600;
      color: #047857;
    }
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }
`;

const CouponGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 12px;
    font-weight: 600;
    color: #334155;
  }

  select, input {
    padding: 10px 12px;
    font-size: 14px;
    border: 1px solid var(--border, #cbd5e1);
    border-radius: 8px;
    background-color: var(--surface, #ffffff);
    outline: none;
  }
`;

const ReferralInputRow = styled.div`
  display: flex;
  gap: 8px;

  input {
    flex: 1;
  }

  button {
    background: var(--primary, #007664);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0 18px;
    font-weight: 700;
    cursor: pointer;
    &:hover { background: var(--primary-hover, #005a4c); }
  }
`;

const PaymentOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 32px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PaymentCard = styled.div`
  background: var(--surface, #ffffff);
  border: 1px solid ${(props) => (props.$active ? 'var(--primary, #007664)' : 'var(--border, #cbd5e1)')};
  background-color: ${(props) => (props.$active ? 'var(--secondary, #e6f0ee)' : 'var(--surface, #ffffff)')};
  border-radius: 14px;
  padding: 20px 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary, #007664);
  }

  .icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 12px;
    color: var(--text-secondary, #344054);
  }

  .title {
    font-size: 15px;
    font-weight: 700;
    color: var(--text-main, #101828);
    margin-bottom: 2px;
  }

  .sub {
    font-size: 11px;
    color: var(--text-muted, #667085);
  }
`;

const PaymentSection = ({
  total,
  cartItems,
  paymentMethod,
  setPaymentMethod,
  mockAvailableOffers,
  mockDefaultReferralCode,
}) => {
  const renderPaymentIcon = (id) => {
    switch (id) {
      case 'Cash': return <Banknote size={22} />;
      case 'Card': return <CreditCard size={22} />;
      case 'UPI': return <QrCode size={22} />;
      case 'COD': return <Truck size={22} />;
      default: return <Banknote size={22} />;
    }
  };

  return (
    <>
      <AmountDueBox>
        <div className="label">AMOUNT DUE</div>
        <div className="amount">₹{total}</div>
        <div className="subtext">
          Incl. {mockInitialOrderDetails.gstRate}% GST · {cartItems.length} items
        </div>
      </AmountDueBox>

      <DiscountBox>
        <div className="header-row">
          <h3>Apply Discounts & Rewards</h3>
          <span className="tag">🏷 {mockAvailableOffers.length} coupons available</span>
        </div>
        <div className="grid">
          <CouponGroup>
            <label>Select Offer</label>
            <select>
              {mockAvailableOffers.map((off) => (
                <option key={off.id}>{off.name}</option>
              ))}
            </select>
          </CouponGroup>

          <CouponGroup>
            <label>Referral Code</label>
            <ReferralInputRow>
              <input type="text" defaultValue={mockDefaultReferralCode} placeholder="Enter code" />
              <button onClick={() => alert('Referral Applied!')}>Apply</button>
            </ReferralInputRow>
          </CouponGroup>
        </div>
      </DiscountBox>

      <PaymentOptionsGrid>
        {mockPaymentMethods.map((pm) => (
          <PaymentCard
            key={pm.id}
            $active={paymentMethod === pm.id}
            onClick={() => setPaymentMethod(pm.id)}
          >
            <div className="icon">{renderPaymentIcon(pm.id)}</div>
            <div className="title">{pm.title}</div>
            <div className="sub">{pm.sub}</div>
          </PaymentCard>
        ))}
      </PaymentOptionsGrid>
    </>
  );
};

export default PaymentSection;
