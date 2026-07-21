// src/laboratoryManagement/screens/registration/CertificationScreen.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Formik, Form } from "formik";
import styled, { keyframes, css } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LuFileText as FileText, LuPlus as Plus, LuCloudUpload as UploadCloud, LuShieldCheck as ShieldCheck, LuChevronRight as ChevronRight, LuX as X, LuCircleAlert as AlertCircle } from 'react-icons/lu';

import ComboList from "../../../components/ComboList";
import Button from "../../../components/Button";
import SuccessModal from "../../../components/Modal/SuccessModal";
import Modal from "../../../components/Modal/Modal";
import TextField from "../../../components/TextField";
import BackButton from "../../../components/BackButton";
import { certifications as localCertifications } from "../../../data/certifications";

import { getCertificationRequest } from "../actions/getCertificationActions";
import { addCertificateRequest, clearAddCertificate } from "../actions/addCertificateActions";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ApiErrorText = styled.div`
  color: var(--danger, #E53E3E);
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  margin-top: 16px;
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: var(--background, #F4F7F6);
  padding: 40px 20px;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 480px) {
    padding: 20px 12px;
  }
`;

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
  padding: 40px;
  animation: ${fadeIn} 0.6s ease-out;
  border: 1px solid var(--border, #cbd5e1);
  position: relative;

  @media (max-width: 768px) {
    padding: 24px 20px;
    border-radius: 16px;
  }
`;

const HeaderNav = styled.div`
  margin-bottom: 24px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const IconCircle = styled.div`
  width: 72px;
  height: 72px;
  background: var(--secondary, #e6f0ee);
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: var(--primary, #007664);
  box-shadow: 0 8px 16px rgba(0, 118, 100, 0.1);
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: var(--text-main, #101828);
  margin: 0 0 8px;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  color: var(--text-muted, #667085);
  font-size: 15px;
  margin: 0;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 32px 0 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border, #cbd5e1);
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: var(--primary, #007664);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;



const FileUploadCard = styled.div`
  background: #ffffff;
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: var(--primary, #007664);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 118, 100, 0.08);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CardTitle = styled.h4`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main, #101828);
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UploadGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const UploadZone = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-secondary, #344054);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      color: var(--danger, #E53E3E);
      font-size: 11px;
      font-weight: 700;
      background: var(--danger-bg, #FFF5F5);
      padding: 2px 6px;
      border-radius: 4px;
    }
  }
`;

const StyledInputFile = styled.div`
  position: relative;
  
  input[type="file"] {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 2;
  }
`;

const UploadUI = styled.div`
  border: 2px dashed ${(props) => props.$hasFile ? "var(--success, #38A169)" : "var(--border, #cbd5e1)"};
  border-radius: 16px;
  padding: 24px 16px;
  text-align: center;
  transition: all 0.25s ease;
  background: ${(props) => props.$hasFile ? "var(--success-bg, #E6F4EA)" : "var(--secondary, #e6f0ee)"};
  cursor: pointer;

  &:hover {
    border-color: ${(props) => props.$hasFile ? "var(--success, #38A169)" : "var(--primary, #007664)"};
    background: ${(props) => props.$hasFile ? "var(--success-bg, #E6F4EA)" : "var(--secondary-hover, #d0e3e0)"};
    transform: scale(1.02);
  }

  svg {
    margin-bottom: 10px;
    color: ${(props) => props.$hasFile ? "var(--success, #38A169)" : "var(--text-muted, #667085)"};
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateY(-2px) scale(1.08);
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${(props) => props.$hasFile ? "var(--success, #38A169)" : "var(--text-muted, #667085)"};
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

const CertificationScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companyTypeId, companyId } = location.state || {};
  const { loading, data } = useSelector((state) => state.certifications);
  const addCertState = useSelector((state) => state.addCertificate);
  const { error: apiError } = addCertState;

  const apiCertificates = data?.certificates || [];

  const [selectedCerts, setSelectedCerts] = useState([]);
  const [customCerts, setCustomCerts] = useState([]);
  const [files, setFiles] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCertName, setNewCertName] = useState("");
  const [uploadErrors, setUploadErrors] = useState({});

  useEffect(() => {
    if (companyTypeId) {
      dispatch(getCertificationRequest({ companyTypeId }));
    }
  }, [dispatch, companyTypeId]);

  const allCertificates = useMemo(() => {
    const apiOptions = (apiCertificates || []).map(c =>
      typeof c === 'string' ? c : c["Certificate / License"]
    );
    return Array.from(new Set([...apiOptions, ...localCertifications, ...customCerts]));
  }, [apiCertificates, customCerts]);

  useEffect(() => {
    if (addCertState.data?.success) {
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        dispatch(clearAddCertificate());
        navigate("/admin/dashboard");
      }, 1500);
    }
  }, [addCertState.data, dispatch, navigate]);

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Scale down resolution if too high (max 1200px)
          const maxDimension = 1200;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Quality loops down if size is over 500KB (roughly 680,000 chars in base64)
          const maxBase64Length = 680000;
          let quality = 0.8;
          let dataUrl = canvas.toDataURL("image/jpeg", quality);

          while (dataUrl.length > maxBase64Length && quality > 0.2) {
            quality -= 0.1;
            dataUrl = canvas.toDataURL("image/jpeg", quality);
          }

          // If still larger, scale down resolution to max 800px
          if (dataUrl.length > maxBase64Length) {
            const scale = 800 / Math.max(width, height);
            const newWidth = Math.round(width * scale);
            const newHeight = Math.round(height * scale);
            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            dataUrl = canvas.toDataURL("image/jpeg", 0.5);
          }

          resolve(dataUrl);
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleFileChange = async (cert, side, file, target) => {
    if (!file) return;

    const fileKey = `${cert}_${side}`;

    // Clear previous error for this input
    setUploadErrors((prev) => {
      const next = { ...prev };
      delete next[fileKey];
      return next;
    });

    const clearFileState = () => {
      setFiles((prev) => {
        const certFiles = { ...prev[cert] };
        delete certFiles[side];
        delete certFiles[`${side}Name`];
        return { ...prev, [cert]: certFiles };
      });
      if (target) {
        target.value = "";
      }
    };

    try {
      const isImage = file.type.startsWith("image/");
      const isPdf = file.type === "application/pdf";

      if (!isImage && !isPdf) {
        setUploadErrors((prev) => ({
          ...prev,
          [fileKey]: "Only images (PNG, JPG) or PDF files are allowed.",
        }));
        clearFileState();
        return;
      }

      let base64 = "";

      if (isImage) {
        // Validation: Image size must be under 3MB
        if (file.size > 3 * 1024 * 1024) {
          setUploadErrors((prev) => ({
            ...prev,
            [fileKey]: "Image size must be under 3MB.",
          }));
          clearFileState();
          return;
        }
        // Compress image
        base64 = await compressImage(file);
      } else if (isPdf) {
        // Validation: PDF size must be under 500KB
        if (file.size > 500 * 1024) {
          setUploadErrors((prev) => ({
            ...prev,
            [fileKey]: "PDF size must be under 500KB.",
          }));
          clearFileState();
          return;
        }
        // Convert PDF to base64 directly
        base64 = await fileToBase64(file);
      }

      setFiles((prev) => ({
        ...prev,
        [cert]: { ...prev[cert], [side]: base64, [`${side}Name`]: file.name },
      }));
    } catch (err) {
      console.error("Error processing file:", err);
      setUploadErrors((prev) => ({
        ...prev,
        [fileKey]: "Failed to process the uploaded file.",
      }));
      clearFileState();
    }
  };

  const handleAddCustomCertificate = () => {
    if (newCertName.trim()) {
      setCustomCerts(prev => [...prev, newCertName.trim()]);
      setSelectedCerts(prev => [...prev, newCertName.trim()]);
      setNewCertName("");
      setIsAddModalOpen(false);
    }
  };

  return (
    <PageWrapper>
      <Container>
        <HeaderNav>
          <BackButton text="Back" />
        </HeaderNav>

        <Header>
          <IconCircle>
            <ShieldCheck size={32} />
          </IconCircle>
          <Title>Certifications</Title>
          <Subtitle>Upload your facility licenses and accreditations</Subtitle>
        </Header>



        {loading && <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px', margin: '32px 0' }}>Fetching required certificates...</div>}

        <Formik
          initialValues={{}}
          onSubmit={() => {
            const payload = {
              companyId,
              certificate: Object.entries(files).map(([name, fileData]) => ({
                certificateName: name,
                frontPhoto: fileData.front || "",
                backPhoto: fileData.back || "",
              })),
            };
            dispatch(addCertificateRequest(payload));
          }}
        >
          {() => (
            <Form>
              <SectionHeader>
                <SectionTitle>1. Select Certificate Types</SectionTitle>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddModalOpen(true)}
                  style={{ width: "auto", height: "36px", padding: "0 16px", fontSize: "13px" }}
                >
                  <Plus size={16} style={{ marginRight: '6px' }} /> Add Custom
                </Button>
              </SectionHeader>

              <ComboList
                options={allCertificates}
                selectedOptions={selectedCerts}
                setSelectedOptions={setSelectedCerts}
              />

              {selectedCerts.length > 0 && (
                <>
                  <SectionHeader>
                    <SectionTitle>2. Upload Documents</SectionTitle>
                  </SectionHeader>

                  {selectedCerts.map((cert) => {
                    const isFrontMandatory = true;
                    const isBackMandatory = false;
                    const fileData = files[cert] || {};

                    return (
                      <FileUploadCard key={cert}>
                        <CardHeader>
                          <CardTitle><FileText size={18} color="var(--primary)" /> {cert}</CardTitle>
                        </CardHeader>
                        <UploadGrid>
                          <UploadZone>
                            <label>Front Page {isFrontMandatory && <span>Required</span>}</label>
                            <StyledInputFile>
                              <input
                                type="file"
                                required={isFrontMandatory}
                                accept="image/*,application/pdf"
                                onChange={(e) => handleFileChange(cert, "front", e.target.files[0], e.target)}
                              />
                              <UploadUI $hasFile={!!fileData.front}>
                                <UploadCloud size={24} />
                                <p>{fileData.frontName || "Click to upload front photo"}</p>
                              </UploadUI>
                            </StyledInputFile>
                            {uploadErrors[`${cert}_front`] && (
                              <span style={{ color: "#ef4444", fontSize: "11px", marginTop: "6px", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                                <AlertCircle size={12} /> {uploadErrors[`${cert}_front`]}
                              </span>
                            )}
                          </UploadZone>

                          <UploadZone>
                            <label>Back Page {isBackMandatory && <span>Required</span>}</label>
                            <StyledInputFile>
                              <input
                                type="file"
                                required={isBackMandatory}
                                accept="image/*,application/pdf"
                                onChange={(e) => handleFileChange(cert, "back", e.target.files[0], e.target)}
                              />
                              <UploadUI $hasFile={!!fileData.back}>
                                <UploadCloud size={24} />
                                <p>{fileData.backName || "Click to upload back photo"}</p>
                              </UploadUI>
                            </StyledInputFile>
                            {uploadErrors[`${cert}_back`] && (
                              <span style={{ color: "#ef4444", fontSize: "11px", marginTop: "6px", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                                <AlertCircle size={12} /> {uploadErrors[`${cert}_back`]}
                              </span>
                            )}
                          </UploadZone>
                        </UploadGrid>
                      </FileUploadCard>
                    );
                  })}
                </>
              )}

              {apiError && <ApiErrorText style={{ marginBottom: "16px" }}>{apiError}</ApiErrorText>}

              <Button type="submit" style={{ marginTop: "32px", width: "100%", height: "52px", fontSize: "16px" }}>
                Submit & Continue <ChevronRight size={20} style={{ marginLeft: '8px' }} />
              </Button>
            </Form>
          )}
        </Formik>

        <Modal show={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
          <div style={{ padding: '8px' }}>
            <h3 style={{ marginTop: 0, marginBottom: "20px", fontSize: '20px', fontWeight: '800' }}>Add Custom Certificate</h3>
            <TextField
              label="Certificate Name"
              value={newCertName}
              onChange={(e) => setNewCertName(e.target.value)}
              placeholder="e.g. ISO 9001, NABL Accreditation"
            />
            <ModalFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)} style={{ width: 'auto' }}>
                Cancel
              </Button>
              <Button type="button" onClick={handleAddCustomCertificate} style={{ width: 'auto' }}>
                Add Selection
              </Button>
            </ModalFooter>
          </div>
        </Modal>

        {showSuccessModal && <SuccessModal message="Certificates uploaded successfully! Redirecting..." />}
      </Container>
    </PageWrapper>
  );
};

export default CertificationScreen;
