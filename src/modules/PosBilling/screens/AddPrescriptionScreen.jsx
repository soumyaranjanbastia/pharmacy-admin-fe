import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft, FileCheck, X, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Button from '../../../components/Button';

const Container = styled.div`
  padding: 32px;
  background-color: var(--background, #f8fafc);
  min-height: calc(100vh - 70px);
  font-family: ${({ theme }) => theme?.fonts?.main || "'Inter', sans-serif"};
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-main, #0f172a);
  margin: 0;
`;

const Card = styled.div`
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 16px;
  padding: 32px;
  max-width: 800px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-main, #0f172a);
  margin: 0 0 24px 0;
`;

const DropZone = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  border: 2px dashed var(--border, #cbd5e1);
  border-radius: 12px;
  background-color: var(--surface, #ffffff);
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;

  &:hover {
    border-color: var(--primary, #007664);
    background-color: var(--secondary, #f0fdf4);
  }

  input {
    display: none;
  }
`;

const UploadIconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background-color: var(--secondary, #e6f0ee);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary, #007664);
  margin-bottom: 16px;
`;

const DropText = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: var(--text-main, #334155);
  margin: 0 0 6px 0;
`;

const DropSubtext = styled.p`
  font-size: 13px;
  color: var(--text-muted, #94a3b8);
  margin: 0;
`;

// Uploaded File Card with Eye Preview Toggle
const FileCard = styled.div`
  margin-top: 24px;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 12px;
  padding: 18px 20px;
  background-color: #f8fafc;
`;

const FileCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .info {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    font-weight: 700;
    color: var(--text-main, #0f172a);
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const EyeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--primary, #007664);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--secondary, #e6f0ee);
    border-color: var(--primary, #007664);
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    color: #dc2626;
    background-color: #fee2e2;
  }
`;

const ImagePreviewBox = styled.div`
  margin-top: 16px;
  width: 100%;
  max-height: 360px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--border, #cbd5e1);
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 360px;
    object-fit: contain;
  }
`;

const AddPrescriptionScreen = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(true);

  const handleFileChange = (file) => {
    if (file) {
      setSelectedFile(file);
      setShowPreview(true);

      // Read selected image file as Data URL / Object URL
      if (file.type && file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setImagePreviewUrl(url);
      } else {
        // If file is not an image (e.g. pdf), clear preview url
        setImagePreviewUrl(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setImagePreviewUrl(null);
    setShowPreview(false);
  };

  const handleProceed = () => {
    navigate('/pos-billing/prescription-view', {
      state: {
        fileName: selectedFile?.name || 'Uploaded_Prescription.jpg',
        previewUrl: imagePreviewUrl,
      },
    });
  };

  return (
    <Container>
      <HeaderRow>
        <Button variant="outline" onClick={() => navigate('/pos-billing')}>
          <ArrowLeft size={16} /> Back to POS
        </Button>
        <Title>Upload Prescription</Title>
      </HeaderRow>

      <Card>
        <CardTitle>Select or Drag Prescription File</CardTitle>

        <DropZone>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => handleFileChange(e.target.files[0])}
          />
          <UploadIconWrapper>
            <Upload size={28} />
          </UploadIconWrapper>
          <DropText>Drag & drop prescription or click to browse</DropText>
          <DropSubtext>PDF, JPG, PNG · Max 5MB</DropSubtext>
        </DropZone>

        {/* Uploaded File Card with Eye Preview Toggle */}
        {selectedFile && (
          <FileCard>
            <FileCardHeader>
              <div className="info">
                <FileCheck size={20} color="var(--primary, #007664)" />
                <span>{selectedFile.name}</span>
              </div>

              <div className="actions">
                {imagePreviewUrl && (
                  <EyeButton onClick={() => setShowPreview(!showPreview)}>
                    {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                    <span>{showPreview ? 'Hide Preview' : 'Preview'}</span>
                  </EyeButton>
                )}

                <RemoveButton onClick={handleRemoveFile} title="Remove File">
                  <X size={18} />
                </RemoveButton>
              </div>
            </FileCardHeader>

            {/* Live Image Preview Box (Shown only for uploaded image when showPreview is true) */}
            {showPreview && imagePreviewUrl && (
              <ImagePreviewBox>
                <img src={imagePreviewUrl} alt="Uploaded Prescription Preview" />
              </ImagePreviewBox>
            )}
          </FileCard>
        )}

        <Button
          variant="primary"
          style={{ width: '100%', marginTop: '24px', padding: '14px', fontSize: '15px' }}
          onClick={handleProceed}
        >
          Proceed to OCR Extraction <ArrowRight size={18} />
        </Button>
      </Card>
    </Container>
  );
};

export default AddPrescriptionScreen;
