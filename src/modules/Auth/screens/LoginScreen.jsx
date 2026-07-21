import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Pill } from "lucide-react";
import { loginRequest, loginClear } from "../actions/loginActions";

// ================= Animations =================
const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shrink = keyframes`
  from { width: 100%; }
  to   { width: 0%; }
`;

// ================= Styled Components =================
const PageWrapper = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  font-family: 'Roboto', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

// Left Panel (Dark Side)
const LeftPanel = styled.div`
  flex: 1.25;
  background-color: var(--primary-dark, #1A4B4B);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 48px 64px;
  position: relative;
  overflow: hidden;

  @media (max-width: 1024px) {
    padding: 40px;
  }

  @media (max-width: 900px) {
    flex: none;
    padding: 32px 24px;
    min-height: 260px;
  }
`;

// Decorative SVG Rings
const CircleGraphic = styled.svg`
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  width: 850px;
  height: 850px;
  pointer-events: none;
  opacity: 0.12;
`;

const BrandBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: rgba(0, 118, 100, 0.25);
  border: 1px solid rgba(0, 118, 100, 0.4);
  padding: 10px 18px;
  border-radius: 100px;
  width: fit-content;
  z-index: 2;

  .pill-icon {
    width: 20px;
    height: 20px;
    color: var(--secondary, #e6f0ee);
    background: rgba(230, 240, 238, 0.15);
    padding: 4px;
    border-radius: 50%;
  }

  span {
    font-size: 13px;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: 0.2px;
  }
`;

const HeroSection = styled.div`
  margin: auto 0;
  z-index: 2;
  max-width: 520px;

  @media (max-width: 900px) {
    margin: 24px 0;
  }
`;

const CategoryTag = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: var(--secondary, #e6f0ee);
  opacity: 0.8;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  margin-bottom: 24px;
`;

const HeroTitle = styled.h1`
  font-size: 42px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.25;
  letter-spacing: -0.5px;
  margin: 0;

  @media (max-width: 1024px) {
    font-size: 34px;
  }

  @media (max-width: 900px) {
    font-size: 26px;
  }
`;

const LeftFooter = styled.div`
  font-size: 12px;
  color: var(--secondary, #e6f0ee);
  opacity: 0.7;
  z-index: 2;
  letter-spacing: 0.5px;
  font-family: 'Roboto Mono', monospace;

  @media (max-width: 900px) {
    font-size: 11px;
  }
`;

// Right Panel (Form Side)
const RightPanel = styled.div`
  flex: 1;
  background-color: var(--background, #F4F7F6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;

  @media (max-width: 900px) {
    padding: 32px 24px;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-main, #101828);
  margin: 0 0 8px 0;
  letter-spacing: -0.4px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: var(--text-muted, #667085);
  margin: 0 0 32px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FieldLabel = styled.label`
  font-size: 11px;
  font-weight: 700;
  color: var(--text-secondary, #344054);
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.$error ? "var(--danger, #E53E3E)" : "var(--border, #cbd5e1)")};
  background-color: #ffffff;
  color: var(--text-main, #101828);
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    border-color: var(--border-focus, #007664);
    box-shadow: 0 0 0 3px rgba(0, 118, 100, 0.12);
  }

  &::placeholder {
    color: var(--text-muted, #667085);
  }
`;

const ErrorText = styled.span`
  font-size: 12px;
  color: var(--danger, #E53E3E);
  margin-top: 4px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  background-color: var(--primary, #007664);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;

  &:hover {
    background-color: var(--primary-hover, #005a4c);
  }

  &:disabled {
    background-color: var(--text-muted, #667085);
    cursor: not-allowed;
  }
`;

// ---- Toast ----
const ToastWrapper = styled.div`
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  min-width: 300px;
  max-width: 420px;
  animation: ${slideDown} 0.3s ease;

  @media (max-width: 480px) {
    width: 90%;
    min-width: auto;
  }
`;

const ToastBox = styled.div`
  background: #fff8e1;
  border: 1.5px solid #f59e0b;
  border-radius: 14px;
  padding: 14px 18px 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
`;

const ToastHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #92400e;
  margin-bottom: 4px;
`;

const ToastMessage = styled.p`
  font-size: 13px;
  color: #78350f;
  margin: 0 0 10px 26px;
`;

const ProgressBar = styled.div`
  height: 3px;
  background: #f59e0b;
  border-radius: 2px;
  animation: ${shrink} 3s linear forwards;
`;

// ================= Main Component =================
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, loading, error: loginError } = useSelector(
    (state) => state.login
  );

  // Clear server/redux login errors when mounting
  useEffect(() => {
    dispatch(loginClear());
  }, [dispatch]);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (error) {
      setError("");
    }
    if (loginError) {
      dispatch(loginClear());
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email address");
    } else {
      setError("");
      dispatch(loginRequest({ email }));
    }
  };

  useEffect(() => {
    if (data) {
      if (data.success === true) {
        const { authType, email, loginType, otpEncryptedKey, isFirstTimeLogin } = data;

        if (loginType === "Admin") {
          if (authType === "otp") {
            navigate("/OtpVerification", {
              state: {
                email,
                encryptedKey: otpEncryptedKey,
                validationType: "LOGIN",
              },
            });
          } else if (authType === "pin") {
            navigate("/validate-pin");
          }
        } else if (loginType === "LabAssistant" || loginType === "Lab Technician" || loginType === "Doctor" || loginType === "Pharmacist" || loginType === "PharmacyAdmin") {
          navigate("/OtpAndToken", {
            state: {
              email,
              loginType,
              otpEncryptedKey,
              isFirstTimeLogin,
            },
          });
        }
      } else if (data.success === false) {
        setToast(true);
        const timer = setTimeout(() => {
          setToast(false);
          navigate("/register", { state: { email: data.email || email } });
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [data, navigate]);

  return (
    <PageWrapper>
      {/* ---- Toast Popup ---- */}
      {toast && (
        <ToastWrapper>
          <ToastBox>
            <ToastHeader>
              <span>⚠️</span> User Not Found
            </ToastHeader>
            <ToastMessage>
              Please complete the registration. Redirecting in 3 seconds…
            </ToastMessage>
            <ProgressBar />
          </ToastBox>
        </ToastWrapper>
      )}

      {/* ---- Left Dark Panel ---- */}
      <LeftPanel>
        <CircleGraphic viewBox="0 0 800 800" fill="none">
          <circle cx="400" cy="400" r="180" stroke="#007664" strokeWidth="1.5" />
          <circle cx="400" cy="400" r="300" stroke="#007664" strokeWidth="1.5" />
          <circle cx="400" cy="400" r="420" stroke="#007664" strokeWidth="1.5" />
        </CircleGraphic>

        <BrandBadge>
          <Pill className="pill-icon" />
          <span>SPMP(Swastyam Pharmacy Management Platform)</span>
        </BrandBadge>

        <HeroSection>
          <CategoryTag>PHARMACY MANAGEMENT PLATFORM</CategoryTag>
          <HeroTitle>
            Precision at every<br />
            dispensing point.
          </HeroTitle>
        </HeroSection>


      </LeftPanel>

      {/* ---- Right Form Panel ---- */}
      <RightPanel>
        <FormContainer>
          <Title>Welcome back</Title>
          <Subtitle>Sign in to your branch dashboard</Subtitle>

          <Form onSubmit={handleLogin} noValidate>
            <FieldGroup>
              <FieldLabel>EMAIL</FieldLabel>
              <StyledInput
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="admin@swastyam.in"
                $error={!!error || !!loginError}
              />
              {(error || loginError) && (
                <ErrorText>{error || loginError}</ErrorText>
              )}
            </FieldGroup>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </SubmitButton>
          </Form>
        </FormContainer>
      </RightPanel>
    </PageWrapper>
  );
};

export default LoginScreen;
