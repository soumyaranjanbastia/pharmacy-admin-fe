import React from 'react';
import styled from 'styled-components';
import { Search, Plus, Minus, MapPin, Trash2, ArrowRight } from 'lucide-react';

const SearchBarContainer = styled.div`
  position: relative;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }

  input {
    width: 100%;
    padding: 12px 16px 12px 42px;
    font-size: 14px;
    border: 1px solid var(--border, #cbd5e1);
    border-radius: 8px;
    background-color: #ffffff;
    outline: none;
    box-sizing: border-box;

    &:focus {
      border-color: var(--primary, #007664);
      box-shadow: 0 0 0 3px rgba(0, 118, 100, 0.1);
    }
  }

  svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted, #667085);
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
    font-weight: 700;
    color: var(--text-secondary, #344054);
  }

  input {
    padding: 11px 14px;
    font-size: 14px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background-color: #f8fafc;
    outline: none;
    transition: all 0.2s ease;

    &:focus {
      border-color: var(--primary, #007664);
      background-color: #ffffff;
    }
  }
`;

const MedicineAddRow = styled.div`
  position: relative;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }

  input {
    width: 100%;
    padding: 12px 16px 12px 42px;
    font-size: 14px;
    border: 1px solid var(--border, #cbd5e1);
    border-radius: 8px;
    background-color: #ffffff;
    outline: none;
    box-sizing: border-box;

    &:focus {
      border-color: var(--primary, #007664);
      box-shadow: 0 0 0 3px rgba(0, 118, 100, 0.1);
    }
  }

  svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted, #667085);
  }
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #ffffff;
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 100;
  max-height: 220px;
  overflow-y: auto;
  margin-top: 4px;
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  font-size: 14px;

  &:hover {
    background-color: var(--secondary, #e6f0ee);
    color: var(--primary, #007664);
  }
`;

const TableCard = styled.div`
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 12px;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th {
    background-color: var(--background, #f4f7f6);
    color: var(--text-muted, #667085);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.8px;
    padding: 12px 16px;
    border-bottom: 1px solid var(--border, #cbd5e1);
    text-transform: uppercase;
  }

  td {
    padding: 14px 16px;
    font-size: 14px;
    color: var(--text-main, #101828);
    border-bottom: 1px solid #f1f5f9;
    vertical-align: middle;
  }
`;

const MedicineInfo = styled.div`
  .name {
    font-weight: 700;
    color: var(--text-main, #101828);
  }
  .sub {
    font-size: 11px;
    color: var(--text-muted, #667085);
  }
`;

const QtyControl = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #f1f5f9;
  padding: 4px 10px;
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

    &:hover:not(:disabled) {
      color: var(--primary, #007664);
    }
    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }
  }

  span {
    font-weight: 700;
    font-size: 13px;
    min-width: 16px;
    text-align: center;
  }
`;

const LocateBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background-color: #f1f5f9;
  border: 1px solid #cbd5e1;
  color: #475569;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: var(--secondary, #e6f0ee);
    color: var(--primary, #007664);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .trash-icon {
    color: var(--danger, #e53e3e);
    cursor: pointer;
    &:hover { color: #dc2626; }
  }
`;

const SubstituteCard = styled.div`
  padding: 16px;
  background-color: var(--surface, #ffffff);
  border-top: 1px solid var(--border, #cbd5e1);

  .sub-title {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-muted, #667085);
    margin-bottom: 10px;
  }

  .sub-chips {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
`;

const SubChip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary, #344054);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--primary, #007664);
    color: var(--primary, #007664);
    background-color: var(--secondary, #e6f0ee);
  }
`;

const OtcSection = styled.div`
  margin-top: 8px;
`;

const SectionLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted, #667085);
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const OtcChip = styled.button`
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary, #344054);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--primary, #007664);
    color: var(--primary, #007664);
    background-color: var(--secondary, #e6f0ee);
  }
`;

const PosBillingForm = ({
  patientSearchQuery,
  setPatientSearchQuery,
  patientInfo,
  setPatientInfo,
  medSearchText,
  setMedSearchText,
  showDropdown,
  setShowDropdown,
  filteredCatalog,
  cartItems,
  handleAddMedicine,
  handleUpdateQty,
  handleRemoveItem,
  mockSubstituteMedicines,
  otcQuickAddFavorites,
}) => {
  return (
    <>
      {/* Search Patient */}
      <SearchBarContainer>
        <Search size={18} />
        <input
          type="text"
          placeholder="Search patient or walk-in..."
          value={patientSearchQuery}
          onChange={(e) => setPatientSearchQuery(e.target.value)}
        />
      </SearchBarContainer>

      {/* Form Fields */}
      <FormGrid>
        <FormGroup>
          <label>Patient Name *</label>
          <input
            type="text"
            placeholder="Enter patient name"
            value={patientInfo.patientName}
            onChange={(e) => setPatientInfo({ ...patientInfo, patientName: e.target.value })}
          />
        </FormGroup>

        <FormGroup>
          <label>Patient Age</label>
          <input
            type="text"
            placeholder="Age in years"
            value={patientInfo.patientAge}
            onChange={(e) => setPatientInfo({ ...patientInfo, patientAge: e.target.value })}
          />
        </FormGroup>

        <FormGroup>
          <label>Doctor Name</label>
          <input
            type="text"
            placeholder="Treating doctor name"
            value={patientInfo.doctorName}
            onChange={(e) => setPatientInfo({ ...patientInfo, doctorName: e.target.value })}
          />
        </FormGroup>

        <FormGroup>
          <label>Prescription Date</label>
          <input
            type="date"
            value={patientInfo.prescriptionDate}
            onChange={(e) => setPatientInfo({ ...patientInfo, prescriptionDate: e.target.value })}
          />
        </FormGroup>
      </FormGrid>

      {/* Medicine Search Input */}
      <MedicineAddRow>
        <Search size={18} />
        <input
          type="text"
          placeholder="search medicine name,Composition.."
          value={medSearchText}
          onChange={(e) => {
            setMedSearchText(e.target.value);
            setShowDropdown(!!e.target.value);
          }}
        />

        {showDropdown && filteredCatalog.length > 0 && (
          <DropdownList>
            {filteredCatalog.map((med) => (
              <DropdownItem key={med.id} onClick={() => handleAddMedicine(med)}>
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
                <td
                  colSpan={6}
                  style={{
                    textAlign: 'center',
                    padding: '28px 16px',
                    color: 'var(--text-muted, #667085)',
                    fontSize: '13.5px',
                  }}
                >
                  No medicines added yet. Search medicine above or select from OTC Quick-Add favorites below.
                </td>
              </tr>
            ) : (
              cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <MedicineInfo>
                      <div className="name">{item.name}</div>
                      {item.code && <div className="sub">{item.code} {item.composition}</div>}
                    </MedicineInfo>
                  </td>
                  <td>
                    <QtyControl>
                      <button onClick={() => handleUpdateQty(item.id, -1)}>
                        <Minus size={14} />
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => handleUpdateQty(item.id, 1)}>
                        <Plus size={14} />
                      </button>
                    </QtyControl>
                  </td>
                  <td>{item.stock}</td>
                  <td>₹{item.price}</td>
                  <td style={{ fontWeight: 700 }}>₹{item.price * item.qty}</td>
                  <td>
                    <ActionButtons>
                      <LocateBtn onClick={() => alert(`Locating ${item.name}`)}>
                        <MapPin size={13} /> Locate
                      </LocateBtn>
                      <Trash2
                        size={16}
                        className="trash-icon"
                        onClick={() => handleRemoveItem(item.id)}
                      />
                    </ActionButtons>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        {/* Substitute Medicine Section */}
        {cartItems.length > 0 && (
          <SubstituteCard>
            <div className="sub-title">Substitute medicine</div>
            <div className="sub-chips">
              {mockSubstituteMedicines.map((sub) => (
                <SubChip key={sub.id} onClick={() => handleAddMedicine(sub)}>
                  <span>{sub.name} · ₹{sub.price} · {sub.composition}</span>
                  <ArrowRight size={14} />
                </SubChip>
              ))}
            </div>
          </SubstituteCard>
        )}
      </TableCard>

      {/* OTC Quick-Add Favorites */}
      <OtcSection>
        <SectionLabel>OTC QUICK-ADD FAVORITES</SectionLabel>
        <ChipContainer>
          {otcQuickAddFavorites.map((fav) => (
            <OtcChip key={fav.id} onClick={() => handleAddMedicine(fav)}>
              {fav.name}
            </OtcChip>
          ))}
        </ChipContainer>
      </OtcSection>
    </>
  );
};

export default PosBillingForm;
