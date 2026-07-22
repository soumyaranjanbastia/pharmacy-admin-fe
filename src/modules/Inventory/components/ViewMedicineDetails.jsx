import React, { useState } from 'react';
import styled from 'styled-components';
import { X, Plus, Sliders, Lock, FlaskConical, MapPin } from 'lucide-react';

const ViewMedicineDetails = ({
  isOpen,
  onClose,
  selectedMed,
  onAddStockClick // Callback to open Add Stock modal from details popup
}) => {
  const [activeTab, setActiveTab] = useState('OVERVIEW');

  if (!isOpen || !selectedMed) return null;

  // Deriving mock batches count and lists
  const reorderPoint = 50;
  const uniqueBatches = selectedMed.history
    ? Array.from(new Set(selectedMed.history.map(h => h.batch)))
    : [selectedMed.batch || 'B2401'];
  
  const totalBatchesCount = Math.max(uniqueBatches.length, 1);

  // Generate dynamic batch records for representation in the BATCHES tab
  const batchRecords = uniqueBatches.map((batchName, idx) => {
    // If only one batch, it gets full qty, else split
    const qty = idx === 0 
      ? Math.ceil(selectedMed.qty * (uniqueBatches.length > 1 ? 0.6 : 1.0)) 
      : selectedMed.qty - Math.ceil(selectedMed.qty * 0.6);

    const expiryDate = idx === 0 ? selectedMed.expiry : '2026-08';
    const binLocation = idx === 0 ? selectedMed.bin : 'B-02';

    return {
      batch: batchName,
      qty,
      expiry: expiryDate,
      bin: binLocation
    };
  });

  return (
    <ModalOverlay>
      <ModalWrapper style={{ maxWidth: '680px' }}>
        {/* Header Block */}
        <HeaderContainer>
          <HeaderLeft>
            <IconContainer>
              <FlaskConical size={22} />
            </IconContainer>
            <TitleArea>
              <h2>{selectedMed.name}</h2>
              <div className="subtitle">{selectedMed.composition} · {selectedMed.manufacturer}</div>
              <CategoryTag>{selectedMed.category}</CategoryTag>
            </TitleArea>
          </HeaderLeft>

          <HeaderRight>
            <AddStockBtn onClick={() => { onClose(); onAddStockClick(selectedMed); }}>
              <Plus size={14} /> Add Stock
            </AddStockBtn>
            <AdjustBtn>
              <Sliders size={14} /> Adjust
            </AdjustBtn>
            <CloseButton onClick={onClose}><X size={20} /></CloseButton>
          </HeaderRight>
        </HeaderContainer>

        {/* Tab Headers */}
        <TabHeaderContainer>
          <TabHeaderBtn 
            $isActive={activeTab === 'OVERVIEW'} 
            onClick={() => setActiveTab('OVERVIEW')}
          >
            OVERVIEW
          </TabHeaderBtn>
          <TabHeaderBtn 
            $isActive={activeTab === 'BATCHES'} 
            onClick={() => setActiveTab('BATCHES')}
          >
            BATCHES ({totalBatchesCount})
          </TabHeaderBtn>
        </TabHeaderContainer>

        {/* Modal Scrollable Body */}
        <ModalBody>
          {activeTab === 'OVERVIEW' ? (
            <>
              {/* Summary Stats Row */}
              <OverviewStatsRow>
                <StatBox>
                  <div className="value highlighted">{selectedMed.qty}</div>
                  <div className="label">Total Stock</div>
                </StatBox>
                <StatBox>
                  <div className="value">{reorderPoint}</div>
                  <div className="label">Reorder Point</div>
                </StatBox>
                <StatBox>
                  <div className="value">{totalBatchesCount}</div>
                  <div className="label">Total Batches</div>
                </StatBox>
              </OverviewStatsRow>

              {/* Master Info Table Grid */}
              <SectionTitle>MEDICINE MASTER INFO</SectionTitle>
              <MasterInfoGrid>
                <InfoRow>
                  <span className="lbl">Prescription needed</span>
                  <span className="val bold-val">{selectedMed.rxNeeded || 'Yes'}</span>
                </InfoRow>
                <InfoRow>
                  <span className="lbl">BIN</span>
                  <span className="val">{selectedMed.bin || 'A-01'}</span>
                </InfoRow>
                <InfoRow>
                  <span className="lbl">HSN code</span>
                  <span className="val">{selectedMed.hsnCode || '30049099'}</span>
                </InfoRow>
                <InfoRow>
                  <span className="lbl">Composition</span>
                  <span className="val">{selectedMed.composition}</span>
                </InfoRow>
                <InfoRow>
                  <span className="lbl">Expiry date</span>
                  <span className="val">{selectedMed.expiry}</span>
                </InfoRow>
                <InfoRow>
                  <span className="lbl">Category</span>
                  <span className="val">{selectedMed.category}</span>
                </InfoRow>
                <InfoRow>
                  <span className="lbl">Conditions treated</span>
                  <span className="val">Fever / Infection</span>
                </InfoRow>
                <InfoRow>
                  <span className="lbl">Manufacturer</span>
                  <span className="val">{selectedMed.manufacturer}</span>
                </InfoRow>
                <InfoRow>
                  <span className="lbl">Unit</span>
                  <span className="val">{selectedMed.unit || 'Strip / 10 tabs'}</span>
                </InfoRow>
              </MasterInfoGrid>

              {/* Lock Alert Banner */}
              <LockAlertBanner>
                <Lock size={15} className="lock-icon" />
                <span>Medicine master is locked for critical edits — transactions exist in the ledger.</span>
              </LockAlertBanner>
            </>
          ) : (
            // Batches Tab Content
            <BatchesContentWrapper>
              <SectionTitle>ACTIVE BATCHES</SectionTitle>
              <BatchesTable>
                <thead>
                  <tr>
                    <th>BATCH NUMBER</th>
                    <th>QUANTITY</th>
                    <th>EXPIRY DATE</th>
                    <th>BIN LOCATION</th>
                  </tr>
                </thead>
                <tbody>
                  {batchRecords.map((rec, index) => (
                    <tr key={index}>
                      <td><code>{rec.batch}</code></td>
                      <td style={{ fontWeight: 600 }}>{rec.qty}</td>
                      <td>{rec.expiry}</td>
                      <td><MapPin size={12} style={{ display: 'inline', marginRight: '4px', color: '#007664' }} />{rec.bin}</td>
                    </tr>
                  ))}
                </tbody>
              </BatchesTable>
            </BatchesContentWrapper>
          )}
        </ModalBody>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default ViewMedicineDetails;

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
  border-radius: 16px;
  width: 100%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
`;

const HeaderContainer = styled.div`
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid #f1f5f9;
`;

const HeaderLeft = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
`;

const IconContainer = styled.div`
  background-color: #E6F4EA;
  color: #007664;
  width: 44px;
  height: 44px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h2 {
    font-size: 18px;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
  }

  .subtitle {
    font-size: 13px;
    color: #64748b;
  }
`;

const CategoryTag = styled.span`
  background-color: #f1f5f9;
  color: #475569;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 4px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AddStockBtn = styled.button`
  background-color: #007664;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #005a4c;
  }
`;

const AdjustBtn = styled.button`
  background-color: #F3E8FF;
  color: #7C3AED;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e9d5ff;
  }
`;

const CloseButton = styled.button`
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

const TabHeaderContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  background-color: #f8fafc;
`;

const TabHeaderBtn = styled.button`
  flex: 1;
  padding: 14px;
  border: none;
  background: transparent;
  font-size: 12px;
  font-weight: 700;
  color: ${props => props.$isActive ? '#007664' : '#64748b'};
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => props.$isActive ? '#007664' : 'transparent'};
  }

  &:hover {
    color: #007664;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const OverviewStatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const StatBox = styled.div`
  background-color: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  padding: 16px;
  text-align: center;

  .value {
    font-size: 24px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 4px;

    &.highlighted {
      color: #007664;
    }
  }

  .label {
    font-size: 11px;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
  }
`;

const SectionTitle = styled.h3`
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  letter-spacing: 0.5px;
  margin: 8px 0 0 0;
  text-transform: uppercase;
`;

const MasterInfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #f1f5f9;
  border-radius: 8px;
  overflow: hidden;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 13px;

  &:last-child {
    border-bottom: none;
  }

  .lbl {
    color: #64748b;
  }

  .val {
    color: #1e293b;
    font-weight: 500;
    
    &.bold-val {
      font-weight: 700;
    }
  }
`;

const LockAlertBanner = styled.div`
  background-color: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #B45309;
  font-size: 12px;
  font-weight: 500;

  .lock-icon {
    flex-shrink: 0;
    color: #D97706;
  }
`;

// Batches Tab components
const BatchesContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BatchesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  border: 1px solid #f1f5f9;
  border-radius: 8px;
  overflow: hidden;

  th {
    background-color: #f8fafc;
    color: #64748b;
    font-size: 11px;
    font-weight: 700;
    padding: 12px 16px;
    border-bottom: 1px solid #e2e8f0;
    text-transform: uppercase;
  }

  td {
    padding: 12px 16px;
    font-size: 13px;
    color: #1e293b;
    border-bottom: 1px solid #f1f5f9;
    vertical-align: middle;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;
