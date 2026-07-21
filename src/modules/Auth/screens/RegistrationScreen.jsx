// src/laboratoryManagement/screens/registration/RegistrationScreen.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { LuCalendar as Calendar, LuUser as User, LuMail as Mail, LuPhone as Phone, LuMapPin as MapPin, LuBuilding2 as Building2, LuChevronRight as ChevronRight, LuRocket as Rocket } from 'react-icons/lu';

import Button from "../../../components/Button";
import TextField from "../../../components/TextField";
import SearchableDropdown from "../../../components/SearchableDropdown";
import { getCountryRequest } from "../actions/getCountryActions";
import { registerRequest } from "../actions/registerActions";
import { userExistRequest } from "../actions/userExistActions";

import "react-datepicker/dist/react-datepicker.css";
import {
  getFullNameValidation,
  getProfileNameValidation,
  getDobValidation,
  getEmailValidation,
  getPhoneValidation,
  getCompanyNameValidation
} from "../../../utils/validationRules";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
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
  max-width: 580px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  padding: 40px;
  animation: ${fadeIn} 0.6s ease-out;
  border: 1px solid var(--border, #cbd5e1);

  @media (max-width: 480px) {
    padding: 24px 20px;
    border-radius: 16px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  background: var(--secondary, #e6f0ee);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: var(--primary, #007664);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: var(--text-main, #101828);
  margin: 0 0 8px;
`;

const Subtitle = styled.p`
  color: var(--text-muted, #667085);
  font-size: 14px;
  margin: 0;
`;

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 700;
  color: var(--primary, #007664);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 32px 0 20px;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border, #cbd5e1);
  }

  &:first-of-type {
    margin-top: 0;
  }
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 16px;

  & > div {
    min-width: 0;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const StyledLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary, #344054);
  margin-bottom: 6px;

  span {
    color: var(--danger, #E53E3E);
  }
`;

const DatePickerContainer = styled.div`
  position: relative;
  width: 100%;
  
  .react-datepicker-wrapper {
    display: block;
    width: 100%;
  }

  .react-datepicker__input-container {
    display: block;
    width: 100%;
  }

  .react-datepicker__input-container input {
    width: 100%;
    height: 42px;
    padding: 0 12px 0 38px;
    border: 1px solid var(--border, #cbd5e1);
    border-radius: 8px;
    font-size: 14px;
    color: var(--text-main, #101828);
    outline: none;
    transition: all 0.2s;
    box-sizing: border-box;

    &:focus {
      border-color: var(--border-focus, #007664);
      box-shadow: 0 0 0 3px rgba(0, 118, 100, 0.1);
    }
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted, #667085);
  pointer-events: none;
  z-index: 1;
`;

const ErrorMsg = styled.span`
  color: var(--danger, #E53E3E);
  font-size: 12px;
  margin-top: 4px;
  display: block;
`;

const PhoneGroup = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 12px;
`;

const validationSchema = Yup.object({
  fullName: getFullNameValidation(),
  profileName: getProfileNameValidation(),
  dob: getDobValidation(true, "DOB is required", "Age must be at least 18 years"),
  email: getEmailValidation(true),
  altEmail: getEmailValidation(false),
  dialCode: Yup.string().required("Code is required"),
  phone: getPhoneValidation(true),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "City cannot contain numbers or special characters")
    .required("City is required"),
  companyName: getCompanyNameValidation("Company Name", true, 3, 100),
});

const RegistrationScreen = () => {
  const [country, setCountry] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const prefillEmail = location.state?.email || "";
  const { countries } = useSelector((state) => state.country);
  const { data: registerData, loading, error: apiError } = useSelector((state) => state.register);
  const { data: userExistData } = useSelector((state) => state.userExist);

  useEffect(() => {
    dispatch(getCountryRequest());
    const storedUserId = localStorage.getItem("userId");
    dispatch(userExistRequest({ userId: storedUserId }));
  }, [dispatch]);

  useEffect(() => {
    if (userExistData?.success && userExistData?.userExists?.exists) {
      navigate("/OtpVerification");
    }
  }, [userExistData, navigate]);

  useEffect(() => {
    if (registerData?.success) {
      if (registerData.userId) localStorage.setItem("userId", registerData.userId);

      const selectedCountry = countries.find(c => c.countryName === registerData.country);
      navigate("/OtpVerification", {
        state: {
          email: registerData.email,
          phone: registerData.phoneNumber,
          encryptedKey: registerData.otpInfo?.encryptedKey,
          phoneVerification: selectedCountry?.phoneVerification ?? false,
          validationType: "REGISTRATION",
        },
      });
    }
  }, [registerData, countries, navigate]);

  return (
    <PageWrapper>
      <Container>
        <Header>
          <IconWrapper>
            <Rocket size={32} />
          </IconWrapper>
          <Title>Get Started</Title>
          <Subtitle>Create your administrative account to manage your pharmacy</Subtitle>
        </Header>

        <Formik
          initialValues={{
            fullName: "", profileName: "", dob: "",
            country: "", state: "", city: "",
            email: prefillEmail, altEmail: "",
            dialCode: "+91", phone: "", companyName: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const payload = {
              ...values,
              dob: values.dob ? format(new Date(values.dob), "dd/MM/yyyy") : "",
              phoneNumber: `${values.dialCode}${values.phone}`,
            };
            dispatch(registerRequest(payload));
          }}
        >
          {({ values, errors, touched, handleChange, setFieldValue }) => (
            <Form noValidate>
              <SectionTitle><User size={16} /> Personal Details</SectionTitle>
              <FieldRow>
                <TextField
                  label="Full Name"
                  name="fullName"
                  required
                  value={values.fullName}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/\d/g, "");
                    setFieldValue("fullName", clean);
                  }}
                  placeholder="John Doe"
                  error={(touched.fullName || !!values.fullName) && errors.fullName}
                  helperText={(touched.fullName || !!values.fullName) && errors.fullName}
                  maxLength={50}
                />
                <TextField
                  label="Profile Name"
                  name="profileName"
                  required
                  value={values.profileName}
                  onChange={handleChange}
                  placeholder="johndoe_admin"
                  error={(touched.profileName || !!values.profileName) && errors.profileName}
                  helperText={(touched.profileName || !!values.profileName) && errors.profileName}
                />
              </FieldRow>

              <FieldRow>
                <div>
                  <StyledLabel>Date of Birth <span style={{ color: '#ef4444' }}>*</span></StyledLabel>
                  <DatePickerContainer>
                    <InputIcon><Calendar size={16} /></InputIcon>
                    <DatePicker
                      selected={values.dob || null}
                      onChange={(date) => setFieldValue("dob", date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select DOB"
                      maxDate={new Date()}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      onKeyDown={(e) => {
                        e.preventDefault();
                      }}
                    />
                  </DatePickerContainer>
                  {(touched.dob || !!values.dob) && errors.dob && <ErrorMsg>{errors.dob}</ErrorMsg>}
                </div>
                <TextField
                  label="Company Name"
                  name="companyName"
                  required
                  value={values.companyName}
                  onChange={handleChange}
                  placeholder="Pharmacy Name"
                  error={touched.companyName && errors.companyName}
                  helperText={touched.companyName && errors.companyName}
                  maxLength={100}
                />
              </FieldRow>

              <SectionTitle><Mail size={16} /> Contact Info</SectionTitle>
              <TextField
                label="Email Address"
                name="email"
                required
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="email@example.com"
                error={(touched.email || !!values.email) && errors.email}
                helperText={(touched.email || !!values.email) && errors.email}
              />
              <div style={{ marginTop: '16px' }}>
                <TextField
                  label="Alternative Email (Optional)"
                  name="altEmail"
                  type="email"
                  value={values.altEmail}
                  onChange={handleChange}
                  placeholder="alt@example.com"
                  error={(touched.altEmail || !!values.altEmail) && errors.altEmail}
                  helperText={(touched.altEmail || !!values.altEmail) && errors.altEmail}
                />
              </div>

              <div style={{ marginTop: '16px' }}>
                <StyledLabel>Phone Number <span style={{ color: '#ef4444' }}>*</span></StyledLabel>
                <PhoneGroup>
                  <TextField
                    name="dialCode"
                    value={values.dialCode}
                    readOnly
                    style={{ textAlign: 'center' }}
                  />
                  <TextField
                    name="phone"
                    required
                    value={values.phone}
                    onChange={(e) => {
                      const clean = e.target.value.replace(/\D/g, "").slice(0, 10);
                      setFieldValue("phone", clean);
                    }}
                    placeholder="9876543210"
                    error={(touched.phone || !!values.phone) && errors.phone}
                    helperText={(touched.phone || !!values.phone) && errors.phone}
                  />
                </PhoneGroup>
              </div>

              <SectionTitle><MapPin size={16} /> Location</SectionTitle>
              <FieldRow>
                <div>
                  <StyledLabel>Country <span style={{ color: '#ef4444' }}>*</span></StyledLabel>
                  <SearchableDropdown
                    options={countries.map((c) => c.countryName)}
                    placeholder="Select Country"
                    value={values.country}
                    onSelect={(val) => {
                      setCountry(val);
                      setFieldValue("country", val);
                      setFieldValue("state", "");
                      const selected = countries.find((c) => c.countryName === val);
                      if (selected) setFieldValue("dialCode", selected.dialCode);
                    }}
                    error={touched.country && errors.country}
                    helperText={touched.country && errors.country}
                  />
                </div>
                <div>
                  <StyledLabel>State <span style={{ color: '#ef4444' }}>*</span></StyledLabel>
                  <SearchableDropdown
                    options={country ? (countries.find(c => c.countryName === country)?.states || []).map(s => s.name) : []}
                    placeholder="Select State"
                    value={values.state}
                    onSelect={(val) => setFieldValue("state", val)}
                    error={touched.state && errors.state}
                    helperText={touched.state && errors.state}
                  />
                </div>
              </FieldRow>

              <div style={{ marginTop: '16px' }}>
                <TextField
                  label="City"
                  name="city"
                  required
                  value={values.city}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/\d/g, "");
                    setFieldValue("city", clean);
                  }}
                  placeholder="Enter City"
                  error={touched.city && errors.city}
                  helperText={touched.city && errors.city}
                />
              </div>

              {apiError && (
                <ErrorMsg style={{ textAlign: "center", marginBottom: "16px", fontSize: "14px", fontWeight: "500" }}>
                  {apiError}
                </ErrorMsg>
              )}

              <div style={{ marginTop: '32px' }}>
                <Button type="submit" disabled={loading} style={{ width: '100%', height: '48px', fontSize: '15px' }}>
                  {loading ? "Processing..." : "Continue to Verification"} <ChevronRight size={18} style={{ marginLeft: '4px' }} />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </PageWrapper>
  );
};

export default RegistrationScreen;
