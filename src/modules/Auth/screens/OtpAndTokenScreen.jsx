import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";

import TextField from "../../../components/TextField";
import Button from "../../../components/Button";
import SuccessModal from "../../../components/Modal/SuccessModal";
import { validateOtpTokenRequest } from "../actions/validateOtpAndTokenActions";

// ====== Animations ======
const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ====== Styled Components ======
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--background, #F4F7F6);
  padding: 2rem;
  font-family: 'Roboto', sans-serif;
`;

const Card = styled.div`
  background: #ffffff;
  border: 1px solid var(--border, #cbd5e1);
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 440px;
  animation: ${fadeSlideUp} 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
`;

const CardHeader = styled.div`
  background: linear-gradient(135deg, var(--primary, #007664), var(--primary-dark, #1A4B4B));
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  margin-bottom: 1.75rem;
`;

const HeaderIcon = styled.div`
  font-size: 32px;
  margin-bottom: 0.5rem;
`;

const HeaderTitle = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: #fff;
  margin: 0 0 4px;
`;

const StepRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 1.5rem;
`;

const StepDot = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  background: ${({ active, done }) =>
    done ? "var(--success, #38A169)" : active ? "linear-gradient(135deg, var(--primary, #007664), var(--primary-dark, #1A4B4B))" : "var(--border, #cbd5e1)"};
  color: ${({ active, done }) => (active || done ? "#fff" : "var(--text-muted, #667085)")};
  transition: all 0.3s;
`;

const StepLine = styled.div`
  flex: 1;
  height: 2px;
  background: ${({ done }) => (done ? "var(--success, #38A169)" : "var(--border, #cbd5e1)")};
  max-width: 60px;
  transition: background 0.3s;
`;

const StepLabel = styled.span`
  font-size: 11px;
  color: var(--text-muted, #667085);
  margin-top: 4px;
`;

const Info = styled.p`
  font-size: 13px;
  color: var(--text-secondary, #344054);
  text-align: center;
  margin-bottom: 1.25rem;
  background: var(--secondary, #e6f0ee);
  padding: 8px 12px;
  border-radius: 8px;
`;

const ErrorText = styled.p`
  color: var(--danger, #E53E3E);
  margin-top: 10px;
  font-size: 13px;
  text-align: center;
`;

const OtpAndTokenScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();

  const { email, loginType, otpEncryptedKey, isFirstTimeLogin } =
    location.state || {};

  const currentEncryptionKey = params?.encryptionKey || otpEncryptedKey || "";

  const [otpVerified, setOtpVerified] = useState(false);
  const [showTokenField, setShowTokenField] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const validateOtpTokenState = useSelector((state) => state.validateOtpToken);
  const { data, loading, error } = validateOtpTokenState;

  useEffect(() => {
    if (data) {
      console.log("Validate OTP & Token Response:", data);

      if (data.requiresTokenValidation) {
        setOtpVerified(true);
        setShowTokenField(true);
      }
      else if ((data.success === true || data.success === "true") && !data.requiresTokenValidation) {
        setModalMessage(data.message || "OTP verified successfully!");
        setShowSuccessModal(true);

        let dashboardRoute = "/labtest/LabtestDashboard";
        if (loginType === "Doctor") {
          dashboardRoute = "/doctor/dashboard";
        } else if (loginType === "Admin") {
          dashboardRoute = "/admin/dashboard";
        }

        setTimeout(() => {
          navigate(dashboardRoute, {
            state: { user: data.user || {}, userType: loginType },
          });
        }, 2000);
      }
      else if (otpVerified && (data.success === true || data.success === "true")) {
        setModalMessage(data.message || "Token verified successfully!");
        setShowSuccessModal(true);

        let dashboardRoute = "/labtest/LabtestDashboard";
        if (loginType === "Doctor") {
          dashboardRoute = "/doctor/dashboard";
        } else if (loginType === "Admin") {
          dashboardRoute = "/admin/dashboard";
        }

        setTimeout(() => {
          navigate(dashboardRoute, {
            state: { user: data.user || {}, userType: loginType },
          });
        }, 2000);
      }
    }

    if (error) {
      console.log("Validation Error:", error);
    }
  }, [data, error, navigate, otpVerified, loginType]);

  const maskEmail = (emailStr) => {
    if (!emailStr) return "";
    const [user, domain] = emailStr.split("@");
    if (!user || !domain) return emailStr;
    const maskedUser = user[0] + "***" + user.slice(-1);
    return `${maskedUser}@${domain}`;
  };

  const getSchema = (tokenRequired) =>
    Yup.object().shape({
      otp: tokenRequired
        ? Yup.string()
        : Yup.string()
          .required("OTP is required")
          .matches(/^\d{4,6}$/, "OTP must be 4–6 digits"),
      token: tokenRequired
        ? Yup.string().required("Token is required")
        : Yup.string(),
    });

  const handleVerify = (values) => {
    if (!otpVerified) {
      const otpBase64 = values.otp ? btoa(values.otp) : "";
      const payload = {
        encryptionKey: currentEncryptionKey,
        code: otpBase64,
        isFirstTimeLogin:
          isFirstTimeLogin === "true" || isFirstTimeLogin === true,
        email,
        loginType,
      };
      console.log("Dispatching OTP verification payload:", payload);
      dispatch(validateOtpTokenRequest(payload));
    } else if (showTokenField) {
      const payload = {
        email,
        token: values.token,
        loginType,
      };
      console.log("Dispatching Token verification payload:", payload);
      dispatch(validateOtpTokenRequest(payload));
    }
  };

  return (
    <Container>
      <Card>
        <CardHeader>
          <HeaderIcon>🛡️</HeaderIcon>
          <HeaderTitle>Security Check</HeaderTitle>
        </CardHeader>

        {showTokenField && (
          <StepRow>
            <div style={{ textAlign: "center" }}>
              <StepDot active={!otpVerified} done={otpVerified}>1</StepDot>
              <StepLabel>OTP</StepLabel>
            </div>
            <StepLine done={otpVerified} />
            <div style={{ textAlign: "center" }}>
              <StepDot active={otpVerified} done={data?.success}>2</StepDot>
              <StepLabel>Token</StepLabel>
            </div>
          </StepRow>
        )}

        <Info>
          Verifying: <strong>{maskEmail(email)}</strong>
        </Info>

        <Formik
          initialValues={{ otp: "", token: "" }}
          validationSchema={getSchema(showTokenField)}
          onSubmit={(values) => handleVerify(values)}
        >
          {({ handleChange, handleBlur, values, errors, touched, isValid, setFieldValue }) => (
            <Form noValidate>
              {!otpVerified && (
                <TextField
                  label="Enter OTP"
                  name="otp"
                  type="text"
                  value={values.otp}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/\D/g, "");
                    if (clean.length <= 6) {
                      setFieldValue("otp", clean);
                    }
                  }}
                  onBlur={handleBlur}
                  placeholder="Enter 6-digit OTP"
                  error={touched.otp && !!errors.otp}
                  helperText={touched.otp && errors.otp}
                  maxLength={6}
                  inputMode="numeric"
                />
              )}

              {showTokenField && (
                <TextField
                  label="Access Token"
                  name="token"
                  type="text"
                  value={values.token}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your security token"
                  error={touched.token && !!errors.token}
                  helperText={touched.token && errors.token}
                />
              )}

              <Button
                type="submit"
                variant="primary"
                disabled={!isValid || loading}
                style={{ marginTop: 20, width: "100%" }}
              >
                {loading
                  ? "Verifying..."
                  : !otpVerified
                    ? "Verify OTP →"
                    : showTokenField
                      ? "Verify Token →"
                      : "Continue"}
              </Button>

              {error && <ErrorText>{error}</ErrorText>}
            </Form>
          )}
        </Formik>
      </Card>

      {showSuccessModal && <SuccessModal message={modalMessage} />}
    </Container>
  );
};

export default OtpAndTokenScreen;
