import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertCircle, ArrowRight, ArrowLeft, ZoomIn, ZoomOut } from 'lucide-react';

import Button from '../../../components/Button';
import Loader from '../../../components/common/Loader';
import Modal from '../../../components/Modal/Modal';
import { mockPrescriptionOcrData } from '../../../data/mockPosBilling';

const Container = styled.div`
  padding: 32px;
  background-color: var(--background, #f4f7f6);
  min-height: calc(100vh - 70px);
  font-family: ${({ theme }) => theme?.fonts?.main || "'Inter', 'Roboto', sans-serif"};
  color: var(--text-main, #101828);
  position: relative;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: var(--text-main, #101828);
  margin: 0;
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 28px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Card = styled.div`
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const CardHeaderTab = styled.div`
  background: var(--background, #f4f7f6);
  padding: 12px 20px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: var(--text-muted, #667085);
  text-transform: uppercase;
  border-bottom: 1px solid var(--border, #cbd5e1);
  display: inline-block;
  border-top-left-radius: 16px;
`;

const TableList = styled.div`
  padding: 8px 20px;
`;

const TableRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }

  span.label {
    font-size: 14px;
    color: var(--text-muted, #667085);
    text-transform: capitalize;
  }

  div.value-col {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    font-weight: 700;
    color: var(--text-main, #101828);
  }
`;

const ConfidenceBadge = styled.span`
  background: ${(props) => (props.$low ? '#fff1f0' : '#e6f4ea')};
  color: ${(props) => (props.$low ? '#e53e3e' : '#38a169')};
  border: 1px solid ${(props) => (props.$low ? '#ffa39e' : '#b7eb8f')};
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 6px;
`;

const SectionHeader = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main, #101828);
  margin: 12px 0 4px 0;
`;

const DrugCard = styled.div`
  background: var(--surface, #ffffff);
  border: 1px solid ${(props) => (props.$warning ? '#feb2b2' : 'var(--border, #cbd5e1)')};
  background-color: ${(props) => (props.$warning ? '#fff5f5' : 'var(--surface, #ffffff)')};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
`;

const DrugHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;

  h3 {
    font-size: 16px;
    font-weight: 800;
    margin: 0;
    color: var(--text-main, #101828);
  }
`;

const DrugDosage = styled.p`
  font-size: 14px;
  color: var(--text-secondary, #344054);
  margin: 0;
`;

const WarningText = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  color: #e53e3e;
  font-size: 13px;
  font-weight: 600;
`;

const BottomButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`;

const OutlineBtn = styled.button`
  flex: 1;
  padding: 14px;
  border: 1.5px solid var(--primary, #007664);
  background: var(--surface, #ffffff);
  color: var(--primary, #007664);
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--secondary, #e6f0ee);
  }
`;

const SolidBtn = styled.button`
  flex: 1.5;
  padding: 14px;
  background: var(--primary, #007664);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: var(--primary-hover, #005a4c);
  }
`;

// Right Column Photo Card Components
const RightColumn = styled.div`
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

const DocHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  span.doc-title {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.8px;
    color: var(--text-muted, #667085);
    text-transform: uppercase;
  }

  button.zoom-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    background: transparent;
    border: none;
    font-size: 13px;
    font-weight: 600;
    color: var(--primary, #007664);
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ImageCard = styled.div`
  background: #f8fafc;
  border: 1.5px dashed var(--border, #cbd5e1);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 420px;
  overflow: hidden;
  transition: all 0.3s ease;

  img {
    max-width: 100%;
    max-height: ${(props) => (props.$isZoomed ? '750px' : '480px')};
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease;
    transform: ${(props) => (props.$isZoomed ? 'scale(1.25)' : 'scale(1)')};
  }
`;

const PrescriptionViewScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [modal, setModal] = useState({ show: false, title: '', message: '' });

  // User uploaded prescription photo from location state - NO hardcoded fallback values
  const displayPhoto = location.state?.previewUrl || location.state?.prescriptionImage || null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const ocrData = mockPrescriptionOcrData;
  const fields = ocrData.extractedFields;
  const drugs = ocrData.extractedDrugs;

  const handleContinue = () => {
    navigate('/pos-billing', {
      state: {
        fromOcr: true,
        patientName: fields.patientName.value,
        patientAge: fields.age.value,
        doctorName: fields.prescriberName.value,
        prescriptionDate: fields.issueDate.value,
        extractedDrugs: drugs,
      },
    });
  };

  if (loading) {
    return (
      <Container style={{ position: 'relative', minHeight: '80vh' }}>
        <Loader fullScreen={false} text="Scanning Prescription..." subText="Extracting AI OCR fields and drugs" />
      </Container>
    );
  }

  return (
    <Container>
      <HeaderRow>
        <Button variant="outline" onClick={() => navigate('/pos-billing')}>
          <ArrowLeft size={16} /> Back to POS
        </Button>
        <Title>Prescription view</Title>
      </HeaderRow>

      <MainGrid>
        {/* Left Column - Extracted Fields & Drugs */}
        <LeftColumn>
          {/* Extracted Fields Table */}
          <Card>
            <CardHeaderTab>EXTRACTED FIELDS</CardHeaderTab>
            <TableList>
              <TableRow>
                <span className="label">Prescriber name</span>
                <div className="value-col">
                  <span>{fields.prescriberName.value}</span>
                  <ConfidenceBadge>{fields.prescriberName.confidence}%</ConfidenceBadge>
                </div>
              </TableRow>

              <TableRow>
                <span className="label">AGE</span>
                <div className="value-col">
                  <span>{fields.age.value}</span>
                </div>
              </TableRow>

              <TableRow>
                <span className="label">Patient name</span>
                <div className="value-col">
                  <span>{fields.patientName.value}</span>
                  <ConfidenceBadge>{fields.patientName.confidence}%</ConfidenceBadge>
                </div>
              </TableRow>

              <TableRow>
                <span className="label">Issue date</span>
                <div className="value-col">
                  <span>{fields.issueDate.value}</span>
                  <ConfidenceBadge $low={fields.issueDate.confidence < 90}>
                    {fields.issueDate.confidence}%
                  </ConfidenceBadge>
                </div>
              </TableRow>
            </TableList>
          </Card>

          {/* Extracted Drugs Section */}
          <SectionHeader>Drugs extracted</SectionHeader>

          {drugs.map((drug) => (
            <DrugCard key={drug.id} $warning={drug.isLowConfidence}>
              <DrugHeader>
                <h3>{drug.name}</h3>
                <ConfidenceBadge $low={drug.isLowConfidence}>
                  {drug.confidence}% Confidence
                </ConfidenceBadge>
              </DrugHeader>
              <DrugDosage>{drug.dosage}</DrugDosage>
              {drug.isLowConfidence && (
                <WarningText>
                  <AlertCircle size={16} />
                  <span>{drug.warningText}</span>
                </WarningText>
              )}
            </DrugCard>
          ))}

          {/* Action Buttons */}
          <BottomButtons>
            <OutlineBtn onClick={() => setModal({ show: true, title: 'Prescription Verified', message: 'Prescription OCR fields verified successfully!' })}>
              Verify
            </OutlineBtn>
            <SolidBtn onClick={handleContinue}>
              Continue <ArrowRight size={18} />
            </SolidBtn>
          </BottomButtons>
        </LeftColumn>

        {/* Right Column - Uploaded Prescription Photo Display */}
        <RightColumn>
          <DocHeaderRow>
            <span className="doc-title">UPLOADED PRESCRIPTION PHOTO</span>
            <button className="zoom-btn" onClick={() => setIsZoomed(!isZoomed)}>
              {isZoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
              <span>{isZoomed ? 'Zoom 100%' : 'Zoom In'}</span>
            </button>
          </DocHeaderRow>

          <ImageCard $isZoomed={isZoomed}>
            {displayPhoto ? (
              <img src={displayPhoto} alt="Uploaded Prescription" />
            ) : (
              <div style={{ padding: '60px 20px', color: 'var(--text-muted, #667085)', textAlign: 'center', fontSize: '14px', fontWeight: 600 }}>
                No prescription photo uploaded
              </div>
            )}
          </ImageCard>
        </RightColumn>
      </MainGrid>

      {/* Global Modal Component */}
      <Modal show={modal.show} onClose={() => setModal({ show: false, title: '', message: '' })}>
        <div style={{ textAlign: 'center', padding: '12px 8px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px 0', color: '#101828' }}>
            {modal.title}
          </h3>
          <p style={{ fontSize: '14px', color: '#475467', margin: '0 0 20px 0', lineHeight: 1.5 }}>
            {modal.message}
          </p>
          <Button variant="primary" style={{ width: '100%' }} onClick={() => setModal({ show: false, title: '', message: '' })}>
            OK
          </Button>
        </div>
      </Modal>
    </Container>
  );
};

export default PrescriptionViewScreen;
