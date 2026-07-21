// src/laboratoryManagement/screens/registration/OTPVerification.jsx
import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LuMail as Mail, LuPhone as PhoneIcon, LuShieldCheck as ShieldCheck, LuArrowLeft as ArrowLeft, LuRotateCcw as RotateCcw, LuCircleCheck as CheckCircle2, LuLock as Lock } from 'react-icons/lu';
import TextField from "../../../components/TextField";
import Button from "../../../components/Button";
import { validateRequest, resendOtpRequest, resendOtpClear } from "../actions/validateActions";
import { loginClear } from "../actions/loginActions";
import { registerClear } from "../actions/registerActions";
import { userExistClear } from "../actions/userExistActions";
import SuccessModal from "../../../components/Modal/SuccessModal";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background, #F4F7F6);
  padding: 24px 16px;
  font-family: 'Roboto', sans-serif;
`;

const Card = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: 24px;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
  animation: ${fadeIn} 0.6s ease-out;
  overflow: hidden;
  border: 1px solid var(--border, #cbd5e1);
`;

const StyledBackButton = styled.button`
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.25s ease;
  backdrop-filter: blur(8px);
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateX(-2px);
  }

  &:active {
    transform: translateX(-2px) scale(0.95);
  }
`;

const Header = styled.div`
  background: linear-gradient(135deg, var(--primary, #007664), var(--primary-dark, #1A4B4B));
  padding: 32px 24px;
  text-align: center;
  color: #ffffff;
`;

const HeaderIcon = styled.div`
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  backdrop-filter: blur(8px);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  margin: 0 0 8px;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
`;

const Content = styled.div`
  padding: 32px 40px;

  @media (max-width: 480px) {
    padding: 24px 20px;
  }
`;

const Stepper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  gap: 12px;
`;

const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const StepCircle = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  transition: all 0.3s ease;
  
  ${(props) => props.$done ? css`
    background: var(--success, #38A169);
    color: white;
  ` : props.$active ? css`
    background: var(--primary, #007664);
    color: white;
    box-shadow: 0 0 0 4px rgba(0, 118, 100, 0.15);
  ` : css`
    background: var(--secondary, #e6f0ee);
    color: var(--text-muted, #667085);
  `}
`;

const StepLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.$active || props.$done ? "var(--text-main, #101828)" : "var(--text-muted, #667085)"};
`;

const StepLine = styled.div`
  width: 60px;
  height: 2px;
  background: ${(props) => props.$done ? "var(--success, #38A169)" : "var(--border, #cbd5e1)"};
  margin-top: -20px;
`;

const InfoBox = styled.div`
  background: var(--secondary, #e6f0ee);
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 14px;
  color: var(--text-secondary, #344054);

  strong {
    color: var(--text-main, #101828);
    word-break: break-all;
  }
`;

const ResendButton = styled.button`
  background: none;
  border: none;
  color: var(--primary, #007664);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    color: var(--text-muted, #667085);
    cursor: not-allowed;
    text-decoration: none;
  }
`;

const ActionRow = styled.div`
  margin-top: 32px;
`;

const maskEmail = (email) => {
  if (!email) return "";
  const [name, domain] = email.split("@");
  return `${name.slice(0, 3)}***@${domain}`;
};

const maskPhone = (phone) => {
  if (!phone) return "";
  return `${phone.slice(0, 5)}***${phone.slice(-2)}`;
};

const OtpVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { email, phone, encryptedKey, phoneVerification, validationType } = location.state || {};

  const { data: validateData, loading, error, resendData, resendLoading, resendError } = useSelector((state) => state.validate);

  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneEnabled, setPhoneEnabled] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // States to keep track of the active encryption keys (which update on resending)
  const [currentEmailKey, setCurrentEmailKey] = useState(encryptedKey);
  const [currentPhoneKey, setCurrentPhoneKey] = useState(null);
  const [resendStatusMsg, setResendStatusMsg] = useState("");

  // Initialize timer to 30s on mount so it's visible on load
  const [resendTimer, setResendTimer] = useState(30);
  const redirected = useRef(false);

  // Clear redux states on mount to prevent redirection loops when backing out
  useEffect(() => {
    dispatch(loginClear());
    dispatch(registerClear());
    dispatch(userExistClear());
  }, [dispatch]);

  // Restart timer when transitioning to phone OTP step
  useEffect(() => {
    if (emailVerified && phoneEnabled && !phoneVerified) {
      setResendTimer(30);
    }
  }, [emailVerified, phoneEnabled, phoneVerified]);

  // Handle successful resend OTP response
  useEffect(() => {
    if (resendData?.success) {
      const newKey = resendData.encryptionKey || resendData.data?.encryptionKey || resendData.result?.encryptionKey;
      if (newKey) {
        if (!emailVerified) {
          setCurrentEmailKey(newKey);
        } else {
          setCurrentPhoneKey(newKey);
        }
      }
      setResendStatusMsg("OTP resent successfully!");
      setTimeout(() => setResendStatusMsg(""), 5000);
      dispatch(resendOtpClear());
    }
  }, [resendData, emailVerified, dispatch]);

  // Handle resend OTP error response
  useEffect(() => {
    if (resendError) {
      setResendStatusMsg(resendError);
      setTimeout(() => setResendStatusMsg(""), 5000);
      dispatch(resendOtpClear());
    }
  }, [resendError, dispatch]);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleResend = () => {
    if (resendTimer > 0 || resendLoading) return;
    
    dispatch(resendOtpRequest({
      email,
      phone,
      type: !emailVerified ? "email" : "phone",
      registrationType: validationType === "REGISTRATION" ? "user" : undefined
    }));
    
    setResendTimer(30);
  };

  const handleBack = () => {
    // Clear Redux states first to avoid auto-redirect loops
    dispatch(loginClear());
    dispatch(registerClear());
    dispatch(userExistClear());
    
    if (validationType === "LOGIN") {
      navigate("/login");
    } else {
      navigate("/register");
    }
  };

  useEffect(() => {
    if (!validateData) return;

    if (validationType === "LOGIN" && (validateData.success === true || validateData.success === "true") && !redirected.current) {
      redirected.current = true;
      setEmailVerified(true);
      navigate("/admin/dashboard", {
        state: { 
          user: validateData.user || validateData.data?.user || (validateData.userId ? { id: validateData.userId } : null), 
          userType: validateData.userType || validateData.data?.userType || validateData.loginType || validateData.data?.loginType
        }
      });
      return;
    }

    if (validationType === "REGISTRATION" && !emailVerified && validateData?.data?.nextStep === "PHONE_OTP_PENDING") {
      setEmailVerified(true);
      setPhoneEnabled(true);
      if (validateData?.data?.phoneEncryptedKey) {
        setCurrentPhoneKey(validateData.data.phoneEncryptedKey);
      }
    }

    if (validationType === "REGISTRATION" && emailVerified && (validateData?.success === true || validateData?.success === "true") && !phoneVerified && !validateData?.data?.nextStep) {
      setPhoneVerified(true);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate("/pin-setup");
      }, 2500);
    }
  }, [validateData, validationType, emailVerified, phoneVerified, navigate]);

  return (
    <Container>
      {showSuccessModal && <SuccessModal message="OTP verification completed successfully!" />}
      
      <Card>
        <StyledBackButton type="button" onClick={handleBack}>
          <ArrowLeft size={20} />
        </StyledBackButton>
        
        <Header>
          <HeaderIcon>
            <Lock size={32} />
          </HeaderIcon>
          <Title>OTP Verification</Title>
          <Subtitle>
            {validationType === "LOGIN" ? "Verify identity to sign in" : "Secure your administrative account"}
          </Subtitle>
        </Header>

        <Content>
          {validationType === "REGISTRATION" && phoneVerification && (
            <Stepper>
              <StepItem>
                <StepCircle $active={!emailVerified} $done={emailVerified}>
                  {emailVerified ? <CheckCircle2 size={20} /> : "1"}
                </StepCircle>
                <StepLabel $active={!emailVerified} $done={emailVerified}>Email</StepLabel>
              </StepItem>
              <StepLine $done={emailVerified} />
              <StepItem>
                <StepCircle $active={emailVerified && !phoneVerified} $done={phoneVerified}>
                  {phoneVerified ? <CheckCircle2 size={20} /> : "2"}
                </StepCircle>
                <StepLabel $active={emailVerified && !phoneVerified} $done={phoneVerified}>Phone</StepLabel>
              </StepItem>
            </Stepper>
          )}

          <InfoBox>
            <Mail size={16} color="var(--primary)" />
            <span>OTP sent to: <strong>{maskEmail(email)}</strong></span>
          </InfoBox>

          {validationType === "REGISTRATION" && phone && (
            <InfoBox>
              <PhoneIcon size={16} color="var(--primary)" />
              <span>Phone: <strong>{maskPhone(phone)}</strong></span>
            </InfoBox>
          )}

          <Formik
            enableReinitialize
            initialValues={{ emailOtp: "", phoneOtp: "" }}
            validationSchema={Yup.object({
              emailOtp: Yup.string()
                .matches(/^[0-9]+$/, "Must be numeric")
                .length(6, "Must be exactly 6 digits")
                .required("Required"),
              phoneOtp: Yup.string().when([], {
                is: () => validationType === "REGISTRATION" && phoneEnabled && !phoneVerified,
                then: (schema) => schema
                  .matches(/^[0-9]+$/, "Must be numeric")
                  .length(6, "Must be exactly 6 digits")
                  .required("Required"),
              }),
            })}
            onSubmit={(values) => {
              if (!emailVerified) {
                const encodedCode = btoa(values.emailOtp);
                dispatch(validateRequest({
                  encryptionKey: currentEmailKey,
                  validationType,
                  code: encodedCode,
                  codeType: "EMAIL",
                  phoneVerification: validationType === "REGISTRATION" ? phoneVerification : undefined
                }));
              } else if (validationType === "REGISTRATION" && !phoneVerified && phoneEnabled) {
                const encodedCode = btoa(values.phoneOtp);
                const phoneKey = currentPhoneKey || validateData?.data?.phoneEncryptedKey;
                dispatch(validateRequest({
                  encryptionKey: phoneKey,
                  validationType,
                  code: encodedCode,
                  codeType: "PHONE"
                }));
              }
            }}
          >
            {({ values, errors, touched, handleChange, setFieldValue }) => (
              <Form noValidate>
                {!emailVerified && (
                  <div style={{ marginBottom: '20px' }}>
                    <TextField
                      name="emailOtp"
                      label="Email OTP"
                      value={values.emailOtp}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, "");
                        if (val.length <= 6) {
                          setFieldValue("emailOtp", val);
                        }
                      }}
                      placeholder="Enter 6-digit code"
                      error={touched.emailOtp && !!errors.emailOtp}
                      helperText={touched.emailOtp && errors.emailOtp}
                      inputMode="numeric"
                    />
                    <ResendButton 
                      type="button" 
                      onClick={handleResend} 
                      disabled={resendTimer > 0 || resendLoading}
                    >
                      <RotateCcw size={14} /> {resendLoading ? "Resending..." : resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
                    </ResendButton>
                    {resendStatusMsg && (
                      <p style={{ 
                        fontSize: '12px', 
                        color: resendStatusMsg.includes("successfully") ? 'var(--success, #38A169)' : 'var(--danger, #E53E3E)', 
                        marginTop: '6px', 
                        fontWeight: '500' 
                      }}>
                        {resendStatusMsg}
                      </p>
                    )}
                  </div>
                )}

                {emailVerified && !phoneVerified && phoneEnabled && (
                  <div style={{ marginBottom: '20px' }}>
                    <TextField
                      name="phoneOtp"
                      label="Phone OTP"
                      value={values.phoneOtp}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, "");
                        if (val.length <= 6) {
                          setFieldValue("phoneOtp", val);
                        }
                      }}
                      placeholder="Enter 6-digit code"
                      error={touched.phoneOtp && !!errors.phoneOtp}
                      helperText={touched.phoneOtp && errors.phoneOtp}
                      inputMode="numeric"
                    />
                    <ResendButton 
                      type="button" 
                      onClick={handleResend} 
                      disabled={resendTimer > 0 || resendLoading}
                    >
                      <RotateCcw size={14} /> {resendLoading ? "Resending..." : resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
                    </ResendButton>
                    {resendStatusMsg && (
                      <p style={{ 
                        fontSize: '12px', 
                        color: resendStatusMsg.includes("successfully") ? 'var(--success, #38A169)' : 'var(--danger, #E53E3E)', 
                        marginTop: '6px', 
                        fontWeight: '500' 
                      }}>
                        {resendStatusMsg}
                      </p>
                    )}
                  </div>
                )}

                <ActionRow>
                  <Button 
                    type="submit" 
                    disabled={loading || (emailVerified && !phoneEnabled)}
                    style={{ height: '48px', width: '100%' }}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </Button>
                </ActionRow>
              </Form>
            )}
          </Formik>

          {error && <p style={{ color: "var(--danger, #E53E3E)", textAlign: "center", marginTop: "20px", fontSize: "14px", fontWeight: "500" }}>{error}</p>}
        </Content>
      </Card>
    </Container>
  );
};

export default OtpVerification;
