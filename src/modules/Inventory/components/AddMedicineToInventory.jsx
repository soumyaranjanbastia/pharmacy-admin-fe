import React from 'react';
import styled from 'styled-components';
import { X, Boxes, Tag, Warehouse } from 'lucide-react';

const AddMedicineToInventory = ({
  isOpen,
  onClose,
  newMedForm,
  setNewMedForm,
  onSave
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalWrapper style={{ maxWidth: '850px' }}>
        <ModalHeader>
          <div className="title-desc">
            <div className="icon-title">
              <span className="icon-wrapper"><Boxes size={18} /></span>
              <h2>Add Medicine to Inventory</h2>
            </div>
            <p>Fill medicine details and first stock batch in one step</p>
          </div>
          <CloseIconButton onClick={onClose}><X size={20} /></CloseIconButton>
        </ModalHeader>

        <ModalForm onSubmit={onSave}>
          <FormContentGrid>
            {/* Left Side: Medicine Info */}
            <FormColumn>
              <SectionHeader>
                <Tag size={16} /> Medicine Info
              </SectionHeader>
              <FormGroup>
                <label>MEDICINE NAME *</label>
                <input
                  type="text"
                  placeholder="e.g. Paracetamol 500mg"
                  value={newMedForm.name}
                  onChange={(e) => setNewMedForm({ ...newMedForm, name: e.target.value })}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>PRESCRIPTION NEEDED *</label>
                <select
                  value={newMedForm.rxNeeded}
                  onChange={(e) => setNewMedForm({ ...newMedForm, rxNeeded: e.target.value })}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </FormGroup>

              <FormGroup>
                <label>COMPOSITION *</label>
                <input
                  type="text"
                  placeholder="e.g. Paracetamol 500mg"
                  value={newMedForm.composition}
                  onChange={(e) => setNewMedForm({ ...newMedForm, composition: e.target.value })}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>CATEGORY *</label>
                <select
                  value={newMedForm.category}
                  onChange={(e) => setNewMedForm({ ...newMedForm, category: e.target.value })}
                >
                  <option value="Antidiabetic">Antidiabetic</option>
                  <option value="Cardiovascular">Cardiovascular</option>
                  <option value="Antibiotics">Antibiotics</option>
                  <option value="Analgesics">Analgesics</option>
                  <option value="Other">Other</option>
                </select>
              </FormGroup>

              <FormGroup>
                <label>MANUFACTURER</label>
                <input
                  type="text"
                  placeholder="e.g. GSK India"
                  value={newMedForm.manufacturer}
                  onChange={(e) => setNewMedForm({ ...newMedForm, manufacturer: e.target.value })}
                />
              </FormGroup>

              <FormGroup>
                <label>PURCHASE COST</label>
                <input
                  type="text"
                  placeholder="e.g. Strip / 10 tabs"
                  value={newMedForm.purchaseCost}
                  onChange={(e) => setNewMedForm({ ...newMedForm, purchaseCost: e.target.value })}
                />
              </FormGroup>

              <FormGroup>
                <label>UNIT</label>
                <input
                  type="text"
                  placeholder="e.g. Strip / 10 tabs"
                  value={newMedForm.unit}
                  onChange={(e) => setNewMedForm({ ...newMedForm, unit: e.target.value })}
                />
              </FormGroup>
            </FormColumn>

            {/* Right Side: First Stock Entry */}
            <FormColumn>
              <SectionHeader>
                <Warehouse size={16} /> First Stock Entry
              </SectionHeader>
              <FormGroup>
                <label>BATCH NUMBER *</label>
                <input
                  type="text"
                  placeholder="e.g. B2401"
                  value={newMedForm.batch}
                  onChange={(e) => setNewMedForm({ ...newMedForm, batch: e.target.value })}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>HSN CODE *</label>
                <input
                  type="text"
                  placeholder="30049099"
                  value={newMedForm.hsnCode}
                  onChange={(e) => setNewMedForm({ ...newMedForm, hsnCode: e.target.value })}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>BIN *</label>
                <input
                  type="text"
                  placeholder="e.g. B2401"
                  value={newMedForm.bin}
                  onChange={(e) => setNewMedForm({ ...newMedForm, bin: e.target.value })}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>EXPIRY DATE *</label>
                <input
                  type="month"
                  value={newMedForm.expiry}
                  onChange={(e) => setNewMedForm({ ...newMedForm, expiry: e.target.value })}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>QUANTITY (UNITS) *</label>
                <input
                  type="number"
                  placeholder="0"
                  value={newMedForm.qty}
                  onChange={(e) => setNewMedForm({ ...newMedForm, qty: Math.max(0, parseInt(e.target.value) || 0) })}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>MRP (₹) *</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newMedForm.mrp}
                  onChange={(e) => setNewMedForm({ ...newMedForm, mrp: Math.max(0, parseFloat(e.target.value) || 0) })}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>MARGIN %</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newMedForm.margin}
                  onChange={(e) => setNewMedForm({ ...newMedForm, margin: Math.max(0, parseFloat(e.target.value) || 0) })}
                />
              </FormGroup>
            </FormColumn>
          </FormContentGrid>

          <ModalFooter>
            <div className="footer-notice">
              Stock is tracked via ledger — no manual edits allowed after save.
            </div>
            <div className="btn-group">
              <CancelButton type="button" onClick={onClose}>Cancel</CancelButton>
              <SubmitButton type="submit">Save Medicine</SubmitButton>
            </div>
          </ModalFooter>
        </ModalForm>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default AddMedicineToInventory;

// --- Styled Components ---

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(15, 23, 42, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  backdrop-filter: blur(2px);
  padding: 20px;
`;

const ModalWrapper = styled.div`
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
`;

const ModalHeader = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .title-desc {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .icon-title {
      display: flex;
      align-items: center;
      gap: 8px;
      
      .icon-wrapper {
        color: #007664;
        display: flex;
      }
    }

    h2 {
      font-size: 18px;
      font-weight: 700;
      color: #1e293b;
    }

    p {
      font-size: 12px;
      color: #64748b;
    }
  }
`;

const CloseIconButton = styled.button`
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  padding: 4px;
  border-radius: 6px;

  &:hover {
    background-color: #f1f5f9;
    color: #475569;
  }
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

const FormContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  padding: 0 24px 24px 24px;
  overflow-y: auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const SectionHeader = styled.h3`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  color: #94a3b8;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 8px;
  margin-bottom: 4px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 11px;
    font-weight: 700;
    color: #475569;
    letter-spacing: 0.5px;
  }

  input, select {
    padding: 10px 12px;
    font-size: 13px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    outline: none;
    background-color: #ffffff;
    width: 100%;
    transition: all 0.2s ease;

    &:focus {
      border-color: #007664;
      box-shadow: 0 0 0 3px rgba(0, 118, 100, 0.1);
    }
  }

  input::placeholder {
    color: #cbd5e1;
  }
`;

const ModalFooter = styled.div`
  background-color: #f8fafc;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f1f5f9;

  .footer-notice {
    font-size: 12px;
    color: #64748b;
    font-weight: 500;
  }

  .btn-group {
    display: flex;
    gap: 12px;
  }
`;

const CancelButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  color: #475569;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8fafc;
    border-color: #94a3b8;
  }
`;

const SubmitButton = styled.button`
  background-color: #007664;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 18px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #005a4c;
  }
`;
