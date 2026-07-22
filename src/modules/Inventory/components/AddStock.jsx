import React from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';

const AddStock = ({
  isOpen,
  onClose,
  selectedMed,
  newStockForm,
  setNewStockForm,
  onConfirm
}) => {
  if (!isOpen || !selectedMed) return null;

  return (
    <ModalOverlay>
      <ModalWrapper style={{ maxWidth: '500px' }}>
        <ModalHeader style={{ backgroundColor: '#007664', color: '#ffffff' }}>
          <div className="title-desc">
            <h2 style={{ color: '#ffffff', margin: 0 }}>Add Stock</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '4px 0 0 0' }}>{selectedMed.name}</p>
          </div>
          <CloseIconButton onClick={onClose} style={{ color: '#ffffff' }}>
            <X size={20} />
          </CloseIconButton>
        </ModalHeader>

        <ModalForm onSubmit={onConfirm}>
          <FormContentGrid style={{ gridTemplateColumns: '1fr', padding: '20px' }}>
            <FormTwoColumnGrid>
              <FormGroup>
                <label>BATCH NUMBER *</label>
                <input
                  type="text"
                  placeholder="B2401"
                  value={newStockForm.batch}
                  onChange={(e) => setNewStockForm({ ...newStockForm, batch: e.target.value })}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>HSN *</label>
                <input
                  type="text"
                  placeholder="30049099"
                  value={newStockForm.hsn}
                  onChange={(e) => setNewStockForm({ ...newStockForm, hsn: e.target.value })}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>QUANTITY *</label>
                <input
                  type="number"
                  placeholder="0"
                  value={newStockForm.qty}
                  onChange={(e) => setNewStockForm({ ...newStockForm, qty: Math.max(0, parseInt(e.target.value) || 0) })}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>EXPIRY DATE *</label>
                <input
                  type="month"
                  value={newStockForm.expiry}
                  onChange={(e) => setNewStockForm({ ...newStockForm, expiry: e.target.value })}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>MRP (₹) *</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newStockForm.mrp}
                  onChange={(e) => setNewStockForm({ ...newStockForm, mrp: Math.max(0, parseFloat(e.target.value) || 0) })}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>SUPPLIER *</label>
                <input
                  type="text"
                  placeholder="GSK Pharma India"
                  value={newStockForm.supplier}
                  onChange={(e) => setNewStockForm({ ...newStockForm, supplier: e.target.value })}
                  required
                />
              </FormGroup>

              <FormGroup style={{ gridColumn: 'span 2' }}>
                <label>DISCOUNT %</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newStockForm.discount}
                  onChange={(e) => setNewStockForm({ ...newStockForm, discount: Math.max(0, parseFloat(e.target.value) || 0) })}
                />
              </FormGroup>

              <FormGroup style={{ gridColumn: 'span 2' }}>
                <label>NOTE</label>
                <input
                  type="text"
                  placeholder="Optional details..."
                  value={newStockForm.note}
                  onChange={(e) => setNewStockForm({ ...newStockForm, note: e.target.value })}
                />
              </FormGroup>
            </FormTwoColumnGrid>
          </FormContentGrid>

          <ModalFooter style={{ padding: '16px 20px' }}>
            <div className="btn-group" style={{ width: '100%', justifyContent: 'flex-end' }}>
              <CancelButton type="button" onClick={onClose}>Cancel</CancelButton>
              <SubmitButton type="submit" style={{ backgroundColor: '#007664' }}>Confirm Intake</SubmitButton>
            </div>
          </ModalFooter>
        </ModalForm>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default AddStock;

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
    background-color: rgba(255, 255, 255, 0.1);
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
  gap: 32px;
  overflow-y: auto;
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

  input {
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

const FormTwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const ModalFooter = styled.div`
  background-color: #f8fafc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f1f5f9;

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
