import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import {
  getNameValidation,
  getDobValidation,
  getEmailValidation,
  getPhoneValidation,
  getUsernameValidation
} from "../../../../utils/validationRules";
import TextField from "../../../../components/TextField";
import Button from "../../../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import SearchableDropdown from "../../../../components/SearchableDropdown";
import { getCountryRequest } from "../../../Auth/actions/getCountryActions";
import { LuArrowRight as ArrowRight } from 'react-icons/lu';

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

const RadioGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
  flex-wrap: wrap;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  border: 1.5px solid ${(props) => (props.$active ? "var(--primary)" : "var(--border)")};
  background: ${(props) => (props.$active ? "#f0f7ff" : "white")};
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => (props.$active ? "var(--primary)" : "var(--text-secondary)")};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);

  &:hover {
    border-color: var(--primary);
    background: #f0f7ff;
  }

  input {
    display: none;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0;
    margin-bottom: 0;
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

const schema = Yup.object().shape({
  firstname: getNameValidation("First Name", true, 3, 50),
  lastname: getNameValidation("Last Name", true, 3, 50),
  username: getUsernameValidation(false),
  email: getEmailValidation(true),
  phoneNumber: getPhoneValidation(true),
  gender: Yup.string().required("Gender is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  dob: getDobValidation(false, "DOB is required", "Staff must be at least 18 years old"),
  address: Yup.string().required("Address is required"),
});

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // month is 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const getTodayString = () => {
  const d = new Date();
  return d.toISOString().split("T")[0];
};

const PersonalInfoStep = ({ onNext, data = {} }) => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState(data.country || "");
  const { countries } = useSelector((state) => state.country);

  useEffect(() => {
    dispatch(getCountryRequest());
  }, [dispatch]);

  return (
    <Card>
      <Formik
        initialValues={{
          firstname: data.firstname || "",
          lastname: data.lastname || "",
          username: data.username || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          gender: data.gender || "",
          country: data.country || "",
          state: data.state || "",
          dob: data.dob || "",
          address: data.address || "",
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          // ✅ Format DOB before submitting
          const formattedValues = {
            ...values,
            dob: values.dob.includes("/") ? values.dob : formatDate(values.dob),
          };
          console.log("✅ Personal Info Submitted:", formattedValues);
          if (onNext) onNext(formattedValues); // 👉 trigger next step
        }}
      >
        {({ values, errors, touched, setFieldValue, handleChange }) => (
          <Form noValidate>
            <FormSectionTitle>Personal details</FormSectionTitle>
            <Row>
              <TextField
                label="First Name *"
                name="firstname"
                value={values.firstname}
                onChange={(e) => {
                  const clean = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                  setFieldValue("firstname", clean);
                }}
                placeholder="e.g. Rohan"
                error={(touched.firstname || !!values.firstname) && errors.firstname}
                helperText={(touched.firstname || !!values.firstname) && errors.firstname}
                maxLength={50}
              />
              <TextField
                label="Last Name *"
                name="lastname"
                value={values.lastname}
                onChange={(e) => {
                  const clean = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                  setFieldValue("lastname", clean);
                }}
                placeholder="e.g. Sharma"
                error={(touched.lastname || !!values.lastname) && errors.lastname}
                helperText={(touched.lastname || !!values.lastname) && errors.lastname}
                maxLength={50}
              />
            </Row>

            <TextField
              label="Username"
              name="username"
              value={values.username}
              onChange={(e) => {
                const clean = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
                setFieldValue("username", clean);
              }}
              placeholder="e.g. john123"
              error={(touched.username || !!values.username) && errors.username}
              helperText={(touched.username || !!values.username) && errors.username}
              maxLength={30}
            />

            <Row>
              <TextField
                label="Email Address *"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="e.g. rohan@example.com"
                error={(touched.email || !!values.email) && errors.email}
                helperText={(touched.email || !!values.email) && errors.email}
              />
              <TextField
                label="Phone Number *"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={(e) => {
                  const clean = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setFieldValue("phoneNumber", clean);
                }}
                placeholder="9876543210"
                error={(touched.phoneNumber || !!values.phoneNumber) && errors.phoneNumber}
                helperText={(touched.phoneNumber || !!values.phoneNumber) && errors.phoneNumber}
              />
            </Row>

            <Row>
              <TextField
                label="Date of Birth"
                name="dob"
                type="date"
                value={values.dob}
                onChange={handleChange}
                max={getTodayString()}
                error={(touched.dob || !!values.dob) && errors.dob}
                helperText={(touched.dob || !!values.dob) && errors.dob}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '24px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>Gender *</span>
              <RadioGroup>
                <RadioLabel $active={values.gender === "Male"}>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={values.gender === "Male"}
                    onChange={() => setFieldValue("gender", "Male")}
                  />
                  Male
                </RadioLabel>
                <RadioLabel $active={values.gender === "Female"}>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={values.gender === "Female"}
                    onChange={() => setFieldValue("gender", "Female")}
                  />
                  Female
                </RadioLabel>
                <RadioLabel $active={values.gender === "Other"}>
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={values.gender === "Other"}
                    onChange={() => setFieldValue("gender", "Other")}
                  />
                  Other
                </RadioLabel>
              </RadioGroup>
              {touched.gender && errors.gender && (
                <div style={{ color: "#e74c3c", fontSize: "12px", marginTop: "4px" }}>
                  {errors.gender}
                </div>
              )}
            </div>
            </Row>

            <FormSectionTitle style={{ marginTop: '32px' }}>Location & Address</FormSectionTitle>
            <Row style={{ marginBottom: "24px" }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>Country *</span>
                <SearchableDropdown
                  options={countries.map((c) => c.countryName)}
                  placeholder="Select country"
                  value={values.country}
                  error={touched.country && errors.country}
                  helperText={touched.country && errors.country}
                  onSelect={(val) => {
                    setCountry(val);
                    setFieldValue("country", val);
                    setFieldValue("state", "");
                    const selected = countries.find(
                      (c) => c.countryName === val
                    );
                    if (selected) setFieldValue("dialCode", selected.dialCode);
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>State *</span>
                <SearchableDropdown
                  options={
                    country
                      ? (
                        countries.find(
                          (c) => c.countryName === country
                        )?.states || []
                      ).map((s) => s.name)
                      : []
                  }
                  placeholder="Select state"
                  value={values.state}
                  error={touched.state && errors.state}
                  helperText={touched.state && errors.state}
                  onSelect={(val) => setFieldValue("state", val)}
                />
              </div>
            </Row>

            <TextField
              label="Full Address *"
              name="address"
              value={values.address}
              onChange={handleChange}
              placeholder="Enter your address"
              error={touched.address && errors.address}
              helperText={touched.address && errors.address}
            />

            <div style={{ marginTop: '28px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
              <Button type="submit" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                Next Step <ArrowRight size={16} />
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default PersonalInfoStep;
