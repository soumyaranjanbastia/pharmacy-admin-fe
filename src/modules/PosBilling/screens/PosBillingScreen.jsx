import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Minus, Trash2, MapPin, Search, CheckCircle2 } from 'lucide-react';
import {
  otcQuickAddFavorites,
  sampleMedicinesCatalog,
  mockHeldBills,
} from '../../../data/mockPosBilling';
import {
  addMedicineToCart,
  removeMedicineFromCart,
  updateCartItemQty,
  updatePatientDetails,
  applyCouponCode,
} from '../actions/posBillingActions';

const Container = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px;
  background-color: #f8fafc;
  min-height: calc(100vh - 70px);
  font-family: 'Roboto', 'Inter', sans-serif;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 16px;
  }
`;

const MainSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`;

const AddPrescriptionBtn = styled.button`
  background-color: #007664;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #005a4c;
  }
`;

const SearchBar = styled.div`
  position: relative;
  width: 100%;

  input {
    width: 100%;
    padding: 12px 16px 12px 42px;
    font-size: 14px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background-color: #ffffff;
    outline: none;

    &:focus {
      border-color: #007664;
      box-shadow: 0 0 0 3px rgba(0, 118, 100, 0.1);
    }
  }

  svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 13px;
    font-weight: 600;
    color: #334155;
  }

  input {
    padding: 12px 14px;
    font-size: 14px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background-color: #f8fafc;
    outline: none;

    &:focus {
      background-color: #ffffff;
      border-color: #007664;
    }
  }
`;

const MedicineAddRow = styled.div`
  display: flex;
  gap: 12px;
  position: relative;

  input {
    flex: 1;
    padding: 12px 16px;
    font-size: 14px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background-color: #ffffff;
    outline: none;

    &:focus {
      border-color: #007664;
    }
  }
`;

const AddMedicineBtn = styled.button`
  background-color: #007664;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #005a4c;
  }
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 140px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  z-index: 100;
  max-height: 200px;
  overflow-y: auto;
`;

const DropdownItem = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  font-size: 13px;

  &:hover {
    background-color: #f1f5f9;
    color: #007664;
  }
`;

const TableCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th {
    background-color: #f8fafc;
    color: #64748b;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.5px;
    padding: 12px 16px;
    border-bottom: 1px solid #e2e8f0;
    text-transform: uppercase;
  }

  td {
    padding: 12px 16px;
    font-size: 14px;
    color: #1e293b;
    border-bottom: 1px solid #f1f5f9;
    vertical-align: middle;
  }
`;

const QtyControl = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #f1f5f9;
  padding: 4px 8px;
  border-radius: 6px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #475569;
    padding: 2px;

    &:hover {
      color: #007664;
    }
  }

  span {
    font-weight: 600;
    font-size: 13px;
    min-width: 16px;
    text-align: center;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    cursor: pointer;
    transition: color 0.2s;
  }

  .pin-icon {
    color: #64748b;
    &:hover { color: #007664; }
  }

  .trash-icon {
    color: #ef4444;
    &:hover { color: #dc2626; }
  }
`;

const OtcSection = styled.div`
  margin-top: 8px;
`;

const SectionLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const OtcChip = styled.button`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #334155;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #007664;
    color: #007664;
    background-color: #f0fdf4;
  }
`;

// Right Sidebar (Bill Summary)
const SummarySection = styled.div`
  width: 320px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
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
  background: ${(props) => (props.$type === 'id' ? '#f0fdf4' : '#eff6ff')};
  color: ${(props) => (props.$type === 'id' ? '#16a34a' : '#2563eb')};
  border: 1px solid ${(props) => (props.$type === 'id' ? '#bbf7d0' : '#bfdbfe')};
`;

const FieldLabel = styled.label`
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  letter-spacing: 1px;
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
  background-color: #ffffff;
  outline: none;
  margin-bottom: 16px;
  box-sizing: border-box;

  &:focus {
    border-color: #007664;
  }
`;

const SummaryTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  margin: 16px 0;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #64748b;
  margin-bottom: 10px;

  span.val {
    color: #1e293b;
    font-weight: 500;
  }
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;

  span.label {
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
  }

  span.total-amount {
    font-size: 22px;
    font-weight: 800;
    color: #007664;
  }
`;

const RxNotice = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #166534;
  padding: 12px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  margin: 20px 0;
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
  margin-bottom: 24px;
`;

const PayButton = styled.button`
  width: 100%;
  background-color: #007664;
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  padding: 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #005a4c;
  }
`;

const PosBillingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems, patientInfo, couponCode, orderDetails } = useSelector(
    (state) => state.posBilling || { cartItems: [], patientInfo: {}, orderDetails: {} }
  );

  const [medSearchText, setMedSearchText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // Search suggestions
  const filteredCatalog = sampleMedicinesCatalog.filter((m) =>
    m.name.toLowerCase().includes(medSearchText.toLowerCase())
  );

  const handleSelectMedicine = (med) => {
    dispatch(addMedicineToCart(med));
    setMedSearchText('');
    setShowDropdown(false);
  };

  const handlePatientChange = (field, value) => {
    dispatch(updatePatientDetails(field, value));
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  return (
    <Container>
      <MainSection>
        {/* Header */}
        <HeaderRow>
          <Title>POS Billing</Title>
          <AddPrescriptionBtn onClick={() => navigate('/pos-billing/add-prescription')}>
            Add Prescription
          </AddPrescriptionBtn>
        </HeaderRow>

        {/* Search Patient */}
        <SearchBar>
          <Search size={18} />
          <input
            type="text"
            placeholder="Search patient or walk-in.."
            value={patientInfo.patientName || ''}
            onChange={(e) => handlePatientChange('patientName', e.target.value)}
          />
        </SearchBar>

        {/* Form Fields */}
        <FormGrid>
          <FormGroup>
            <label>Patient Name *</label>
            <input
              type="text"
              placeholder="Enter patient name"
              value={patientInfo.patientName || ''}
              onChange={(e) => handlePatientChange('patientName', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <label>Patient Age</label>
            <input
              type="text"
              placeholder="Age in years"
              value={patientInfo.patientAge || ''}
              onChange={(e) => handlePatientChange('patientAge', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <label>Doctor Name</label>
            <input
              type="text"
              placeholder="Treating doctor name"
              value={patientInfo.doctorName || ''}
              onChange={(e) => handlePatientChange('doctorName', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <label>Prescription Date</label>
            <input
              type="date"
              value={patientInfo.prescriptionDate || ''}
              onChange={(e) => handlePatientChange('prescriptionDate', e.target.value)}
            />
          </FormGroup>
        </FormGrid>

        {/* Medicine Search & Add */}
        <MedicineAddRow>
          <input
            type="text"
            placeholder="search medicine name.."
            value={medSearchText}
            onChange={(e) => {
              setMedSearchText(e.target.value);
              setShowDropdown(!!e.target.value);
            }}
          />
          <AddMedicineBtn
            onClick={() => {
              if (medSearchText.trim()) {
                handleSelectMedicine({
                  id: `custom-${Date.now()}`,
                  name: medSearchText,
                  price: 50,
                  stock: 100,
                  qty: 1,
                });
              }
            }}
          >
            Add medicine
          </AddMedicineBtn>

          {showDropdown && filteredCatalog.length > 0 && (
            <DropdownList>
              {filteredCatalog.map((med) => (
                <DropdownItem key={med.id} onClick={() => handleSelectMedicine(med)}>
                  <span>{med.name}</span>
                  <span>₹{med.price}</span>
                </DropdownItem>
              ))}
            </DropdownList>
          )}
        </MedicineAddRow>

        {/* Medicines Table */}
        <TableCard>
          <Table>
            <thead>
              <tr>
                <th>MEDICINE</th>
                <th>QTY</th>
                <th>STOCK</th>
                <th>UNIT PRICE</th>
                <th>AMOUNT</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length === 0 ? (
                <tr>
                  <td>-</td>
                  <td>
                    <QtyControl>
                      <button disabled><Minus size={14} /></button>
                      <span>0</span>
                      <button disabled><Plus size={14} /></button>
                    </QtyControl>
                  </td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>
                    <ActionButtons>
                      <MapPin size={16} className="pin-icon" />
                      <Trash2 size={16} className="trash-icon" />
                    </ActionButtons>
                  </td>
                </tr>
              ) : (
                cartItems.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 600 }}>{item.name}</td>
                    <td>
                      <QtyControl>
                        <button onClick={() => dispatch(updateCartItemQty(item.id, -1))}>
                          <Minus size={14} />
                        </button>
                        <span>{item.qty}</span>
                        <button onClick={() => dispatch(updateCartItemQty(item.id, 1))}>
                          <Plus size={14} />
                        </button>
                      </QtyControl>
                    </td>
                    <td>{item.stock}</td>
                    <td>₹{item.price}</td>
                    <td style={{ fontWeight: 600 }}>₹{item.price * item.qty}</td>
                    <td>
                      <ActionButtons>
                        <MapPin size={16} className="pin-icon" />
                        <Trash2
                          size={16}
                          className="trash-icon"
                          onClick={() => dispatch(removeMedicineFromCart(item.id))}
                        />
                      </ActionButtons>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </TableCard>

        {/* OTC Quick-Add Favorites */}
        <OtcSection>
          <SectionLabel>OTC QUICK-ADD FAVORITES</SectionLabel>
          <ChipContainer>
            {otcQuickAddFavorites.map((fav) => (
              <OtcChip key={fav.id} onClick={() => dispatch(addMedicineToCart(fav))}>
                {fav.name}
              </OtcChip>
            ))}
          </ChipContainer>
        </OtcSection>
      </MainSection>

      {/* Right Summary Panel */}
      <SummarySection>
        <div>
          <TopBadges>
            <OrderBadge $type="id">{orderDetails.orderId || 'ORD-2401'}</OrderBadge>
            <OrderBadge $type="status">{orderDetails.orderType || 'Offline Order'}</OrderBadge>
          </TopBadges>

          <FieldLabel>REFERRED BY</FieldLabel>
          <SummaryInput
            type="text"
            placeholder="Name"
            value={patientInfo.referredBy || ''}
            onChange={(e) => handlePatientChange('referredBy', e.target.value)}
          />

          <FieldLabel>DISCOUNT COUPON</FieldLabel>
          <SummaryInput
            type="text"
            value={couponCode || 'AXER200'}
            onChange={(e) => dispatch(applyCouponCode(e.target.value))}
          />

          <SummaryTitle>Bill Summary</SummaryTitle>

          <SummaryRow>
            <span>Subtotal ({cartItems.length} items)</span>
            <span className="val">₹{subtotal}</span>
          </SummaryRow>

          <SummaryRow>
            <span>GST (18%)</span>
            <span className="val">₹{gst}</span>
          </SummaryRow>

          <SummaryRow>
            <span>Discount</span>
            <span className="val">-</span>
          </SummaryRow>

          <TotalRow>
            <span className="label">Total</span>
            <span className="total-amount">₹{total}</span>
          </TotalRow>

          <RxNotice>
            <CheckCircle2 size={18} />
            <span>No Rx items — verification not required</span>
          </RxNotice>

          <FieldLabel>HELD BILLS</FieldLabel>
          {mockHeldBills.map((hb) => (
            <HeldBillChip key={hb.id}>{hb.name}</HeldBillChip>
          ))}
        </div>

        <PayButton>
          Proceed to Payment · ₹{total > 0 ? total : 0}
        </PayButton>
      </SummarySection>
    </Container>
  );
};

export default PosBillingScreen;
