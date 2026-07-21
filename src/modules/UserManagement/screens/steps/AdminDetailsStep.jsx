import React, { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import styled from "styled-components";
import { LuUpload as Upload, LuPenTool as PenTool, LuEraser as Eraser, LuCheck as Check, LuArrowLeft as ArrowLeft, LuArrowRight as ArrowRight } from 'react-icons/lu';
import SearchableDropdown from "../../../../components/SearchableDropdown";
import { getBranchesRequest } from "../../../BranchManagement/actions/getBranchesActions";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import Button from "../../../../components/Button";

const Card = styled.div`
  background: white;
  border-radius: 16px;
  border: 1px solid var(--border);
  padding: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
  margin-top: 24px;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--border);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.03), 0 4px 6px -4px rgba(0, 0, 0, 0.03);
  }

  @media (max-width: 600px) {
    padding: 20px;
    border-radius: 12px;
  }
`;

const FormSectionTitle = styled.h4`
  font-size: 15px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #f1f5f9;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SignatureSection = styled.div`
  background: #f8fafc;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 8px;
`;

const TabGroup = styled.div`
  display: flex;
  gap: 8px;
  background: #f1f5f9;
  padding: 4px;
  border-radius: 10px;
  width: fit-content;

  @media (max-width: 480px) {
    width: 100%;
    flex-direction: column;
  }
`;

const Tab = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  background: ${props => props.$active ? 'white' : 'transparent'};
  color: ${props => props.$active ? 'var(--primary)' : 'var(--text-muted)'};
  box-shadow: ${props => props.$active ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'};
  transition: all 0.2s;

  &:hover {
    color: var(--primary);
  }

  @media (max-width: 480px) {
    width: 100%;
    text-align: center;
  }
`;

const CanvasWrapper = styled.div`
  background: white;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--primary);
  }
  
  canvas {
    width: 100%;
    height: 180px;
    cursor: crosshair;
    display: block;
  }
`;

const UploadWrapper = styled.div`
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: white;
  border: 2px dashed var(--border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--primary);
    background: #f0f7ff;
  }

  input { display: none; }
  
  img {
    max-height: 140px;
    max-width: 90%;
    object-fit: contain;
  }
`;

const PreviewBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ecfdf5;
  color: #059669;
  padding: 6px 12px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 700;
  width: fit-content;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 28px;
  border-top: 1px solid #f1f5f9;
  padding-top: 20px;
`;

const validationSchema = Yup.object().shape({
  branchId: Yup.string().required("Branch selection is required"),
  digitalSignature: Yup.string().when('isDoctor', {
    is: true,
    then: (schema) => schema.required("Doctor signature is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const AdminDetailsStep = ({ onNext, onBack, data }) => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signMode, setSignMode] = useState('draw');
  const [digitalSignature, setDigitalSignature] = useState(data.digitalSignature || null);
  
  const { data: branches, loading } = useSelector((state) => state.branches);
  const isDoctor = data.role === "Doctor";

  useEffect(() => {
    dispatch(getBranchesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (signMode === 'draw' && canvasRef.current && isDoctor) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.lineWidth = 3;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#0f172a';
    }
  }, [signMode, isDoctor]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = (setFieldValue) => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL();
    setDigitalSignature(dataUrl);
    setFieldValue("digitalSignature", dataUrl);
  };

  const clearCanvas = (setFieldValue) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDigitalSignature(null);
    setFieldValue("digitalSignature", "");
  };

  const handleFileUpload = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
          setDigitalSignature(reader.result);
          setFieldValue("digitalSignature", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const branchOptions = branches?.map((b) => ({ id: b.branchUserId || b.id, label: b.branchName, isMainBranch: b.isMainBranch })) || [];
  const dropdownOptions = branchOptions.map((b) => b.label).filter((l) => typeof l === "string" && l.trim() !== "");

  return (
    <Card>
      <Formik
        initialValues={{ 
          branchId: data.branchId?.toString() || "", 
          isMainBranch: data.isMainBranch || false,
          digitalSignature: data.digitalSignature || "",
          isDoctor: isDoctor 
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Step 3 Submitted:", values);
          onNext(values);
        }}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form>
            <FormSectionTitle>Branch Assignment & Details</FormSectionTitle>
            
            <FieldGroup>
              <Label>Select Primary Branch *</Label>
              <div style={{ marginTop: "4px" }}>
                <SearchableDropdown
                  options={dropdownOptions}
                  placeholder={loading ? "Loading..." : "Select branch"}
                  value={branchOptions.find((b) => b.id?.toString() === values.branchId)?.label || ""}
                  error={touched.branchId && errors.branchId}
                  helperText={touched.branchId && errors.branchId}
                  onSelect={(label) => {
                    const selected = branchOptions.find((b) => b.label === label);
                    setFieldValue("branchId", selected?.id?.toString() || "");
                    setFieldValue("isMainBranch", selected?.isMainBranch || false);
                  }}
                />
              </div>
            </FieldGroup>

            {isDoctor && (
              <SignatureSection>
                <Label>
                  <PenTool size={16} color="var(--primary)" /> Doctor Signature *
                </Label>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0' }}>
                  Please provide a professional signature for digital sign-offs on diagnostic reports.
                </p>

                <TabGroup>
                  <Tab 
                    type="button"
                    $active={signMode === 'draw'} 
                    onClick={() => { setSignMode('draw'); setDigitalSignature(null); setFieldValue("digitalSignature", ""); }}
                  >
                    Draw Signature
                  </Tab>
                  <Tab 
                    type="button"
                    $active={signMode === 'upload'} 
                    onClick={() => { setSignMode('upload'); setDigitalSignature(null); setFieldValue("digitalSignature", ""); }}
                  >
                    Upload Image
                  </Tab>
                </TabGroup>

                {signMode === 'draw' ? (
                  <CanvasWrapper>
                    <canvas 
                      ref={canvasRef}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={() => stopDrawing(setFieldValue)}
                      onMouseOut={() => stopDrawing(setFieldValue)}
                      width={600}
                      height={200}
                    />
                    <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
                       <Button 
                         variant="outline" 
                         type="button" 
                         onClick={() => clearCanvas(setFieldValue)} 
                         style={{ padding: '6px 12px', fontSize: '12px', background: 'white' }}
                       >
                         <Eraser size={14} /> Clear Canvas
                       </Button>
                    </div>
                  </CanvasWrapper>
                ) : (
                  <UploadWrapper onClick={() => document.getElementById('enroll-sign-upload').click()}>
                    <input 
                      id="enroll-sign-upload" 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileUpload(e, setFieldValue)} 
                    />
                    {digitalSignature ? (
                      <img src={digitalSignature} alt="Signature Preview" />
                    ) : (
                      <>
                        <Upload color="#94a3b8" size={32} />
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Click to upload signature (PNG/JPG)</span>
                      </>
                    )}
                  </UploadWrapper>
                )}

                {digitalSignature && (
                  <PreviewBadge>
                    <Check size={14} strokeWidth={3} /> Signature Captured
                  </PreviewBadge>
                )}
                
                {touched.digitalSignature && errors.digitalSignature && (
                  <p style={{ color: "#e74c3c", fontSize: "12px", margin: "4px 0 0 0", fontWeight: "600" }}>{errors.digitalSignature}</p>
                )}
              </SignatureSection>
            )}

            <ButtonGroup>
              {onBack && (
                <Button variant="outline" type="button" onClick={onBack}>
                  <ArrowLeft size={16} /> Previous
                </Button>
              )}
              <Button type="submit">
                Next Step <ArrowRight size={16} />
              </Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default AdminDetailsStep;
