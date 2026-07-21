// src/laboratoryManagement/screens/registration/PinSetup.jsx
import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LuLock as Lock, LuShieldCheck as ShieldCheck, LuChevronRight as ChevronRight, LuShieldAlert as ShieldAlert } from 'react-icons/lu';

import PasswordField from "../../../components/PasswordField";
import Button from "../../../components/Button";
import { setPinRequest, clearSetPin } from "../actions/setPinActions";

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
  background: #ffffff;
  border-radius: 24px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
  animation: ${fadeIn} 0.6s ease-out;
  overflow: hidden;
  border: 1px solid var(--border, #cbd5e1);
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

const HintBox = styled.div`
  background: var(--secondary, #e6f0ee);
  border: 1px solid var(--border, #cbd5e1);
  border-left: 4px solid var(--primary, #007664);
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  font-size: 13px;
  color: var(--text-secondary, #344054);
  line-height: 1.5;

  svg {
    flex-shrink: 0;
  }
`;

const ErrorMsg = styled.p`
  color: var(--danger, #E53E3E);
  font-size: 14px;
  font-weight: 500;
  margin-top: 20px;
  text-align: center;
`;

const PinSetup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.setPin);

  useEffect(() => {
    if (data?.success) {
      navigate("/login-option", { state: { companyId: data.companyId } });
      dispatch(clearSetPin());
    }
  }, [data, navigate, dispatch]);

  return (
    <Container>
      <Card>
        <Header>
          <HeaderIcon>
            <Lock size={32} />
          </HeaderIcon>
          <Title>Create Your PIN</Title>
          <Subtitle>Set a secure 6-digit PIN to access your account</Subtitle>
        </Header>

        <Content>
          <HintBox>
            <ShieldCheck size={20} color="var(--primary)" />
            <span>Choose a PIN you'll remember. Never share it with anyone for your account safety.</span>
          </HintBox>

          <Formik
            initialValues={{ pin: "", confirmPin: "" }}
            validationSchema={Yup.object({
              pin: Yup.string()
                .required("PIN is required")
                .matches(/^\d{6}$/, "PIN must be exactly 6 digits"),
              confirmPin: Yup.string()
                .required("Please confirm your PIN")
                .oneOf([Yup.ref("pin")], "PINs do not match"),
            })}
            onSubmit={(values) => {
              const encodedPin = btoa(values.pin);
              dispatch(setPinRequest({ pin: encodedPin }));
            }}
          >
            {({ values, errors, touched, handleChange, setFieldValue }) => (
              <Form noValidate>
                <div style={{ marginBottom: '20px' }}>
                  <PasswordField
                    name="pin"
                    label="Enter PIN"
                    maxLength={6}
                    value={values.pin}
                    onChange={(e) => {
                      const clean = e.target.value.replace(/\D/g, "");
                      setFieldValue("pin", clean);
                    }}
                    error={touched.pin && errors.pin}
                    placeholder="Enter 6-digit PIN"
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <PasswordField
                    name="confirmPin"
                    label="Confirm PIN"
                    maxLength={6}
                    value={values.confirmPin}
                    onChange={(e) => {
                      const clean = e.target.value.replace(/\D/g, "");
                      setFieldValue("confirmPin", clean);
                    }}
                    error={touched.confirmPin && errors.confirmPin}
                    placeholder="Re-enter 6-digit PIN"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  style={{ width: "100%", height: "48px", marginTop: "12px" }}
                >
                  {loading ? "Setting up..." : "Continue"} <ChevronRight size={18} style={{ marginLeft: '4px' }} />
                </Button>
              </Form>
            )}
          </Formik>

          {error && <ErrorMsg>{error}</ErrorMsg>}
        </Content>
      </Card>
    </Container>
  );
};

export default PinSetup;
