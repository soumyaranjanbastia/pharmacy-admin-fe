import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Upload, ArrowLeft, FileCheck, X } from 'lucide-react';
import { setPrescriptionFile } from '../actions/posBillingActions';

const Container = styled.div`
  padding: 32px;
  background-color: #f8fafc;
  min-height: calc(100vh - 70px);
  font-family: 'Roboto', 'Inter', sans-serif;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
`;

const BackButton = styled.button`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #334155;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background: #f1f5f9;
    color: #007664;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`;

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 32px;
  max-width: 900px;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 24px 0;
`;

const DropZone = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 56px 24px;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;

  &:hover {
    border-color: #007664;
    background-color: #f0fdf4;
  }

  input {
    display: none;
  }
`;

const UploadIconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background-color: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  margin-bottom: 16px;
`;

const DropText = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: #334155;
  margin: 0 0 6px 0;
`;

const DropSubtext = styled.p`
  font-size: 13px;
  color: #94a3b8;
  margin: 0;
`;

const FilePreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  padding: 16px 20px;
  border-radius: 10px;
  margin-top: 24px;

  .info {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #166534;
    font-weight: 600;
    font-size: 14px;
  }

  .remove {
    cursor: pointer;
    color: #ef4444;
    &:hover { color: #dc2626; }
  }
`;

const AddPrescriptionScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      dispatch(setPrescriptionFile({ name: file.name, size: file.size }));
    }
  };

  return (
    <Container>
      <HeaderRow>
        <BackButton onClick={() => navigate('/pos')}>
          <ArrowLeft size={18} />
          Back
        </BackButton>
        <Title>Prescription</Title>
      </HeaderRow>

      <Card>
        <CardTitle>Upload Prescription Image</CardTitle>

        <DropZone>
          <input type="file" accept="image/*,.pdf" onChange={handleFileChange} />
          <UploadIconWrapper>
            <Upload size={28} />
          </UploadIconWrapper>
          <DropText>Drag & drop prescription or click to browse</DropText>
          <DropSubtext>PDF, JPG, PNG · Max 5MB</DropSubtext>
        </DropZone>

        {selectedFile && (
          <FilePreview>
            <div className="info">
              <FileCheck size={20} />
              <span>{selectedFile.name}</span>
            </div>
            <X size={18} className="remove" onClick={() => setSelectedFile(null)} />
          </FilePreview>
        )}
      </Card>
    </Container>
  );
};

export default AddPrescriptionScreen;
