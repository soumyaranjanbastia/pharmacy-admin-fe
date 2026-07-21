// src/laboratoryManagement/screens/registration/CompanyDetails.jsx
import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getFullNameValidation,
  getPhoneValidation,
  getEmailValidation,
  getRegistrationNumberValidation,
  getDescriptionValidation
} from "../../../utils/validationRules";
import { useNavigate, useLocation } from "react-router-dom";
import { LuBuilding2 as Building2, LuUserCheck as UserCheck, LuMapPin as MapPin, LuInfo as Info, LuChevronRight as ChevronRight, LuSearch as Search, LuMapPinHouse as MapPinHouse, LuGlobe as Globe, LuUsers as Users } from 'react-icons/lu';

import TextField from "../../../components/TextField";
import SearchableDropdown from "../../../components/SearchableDropdown";
import Button from "../../../components/Button";
import SuccessModal from "../../../components/Modal/SuccessModal";
import BackButton from "../../../components/BackButton";

import { addCompanyDetailsRequest } from "../actions/addCompanyDetailsActions";
import { getCompanyTypeRequest } from "../actions/getCompanyTypeActions";

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
  max-width: 900px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
  padding: 40px;
  animation: ${fadeIn} 0.6s ease-out;
  border: 1px solid var(--border, #cbd5e1);

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

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const SectionHeader = styled.div`
  grid-column: span 2;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 16px 0 8px;
  font-size: 14px;
  font-weight: 700;
  color: var(--primary, #007664);
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border, #cbd5e1);
  }

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;

  label {
    margin-bottom: 8px;
    font-weight: 600;
    font-size: 13px;
    color: var(--text-secondary, #344054);
  }
`;

const FullWidthGroup = styled(FormGroup)`
  grid-column: span 2;
  @media (max-width: 768px) { grid-column: span 1; }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${(props) => (props.$error ? "var(--danger, #E53E3E)" : "var(--border, #cbd5e1)")};
  border-radius: 12px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  outline: none;
  font-family: 'Roboto', sans-serif;
  color: var(--text-main, #101828);
  transition: all 0.2s;
  box-sizing: border-box;

  &:hover { border-color: ${(props) => (props.$error ? "var(--danger, #E53E3E)" : "var(--border, #cbd5e1)")}; }
  &:focus {
    border-color: ${(props) => (props.$error ? "var(--danger, #E53E3E)" : "var(--border-focus, #007664)")};
    box-shadow: ${(props) => (props.$error ? "0 0 0 3px rgba(229, 62, 62, 0.1)" : "0 0 0 3px rgba(0, 118, 100, 0.1)")};
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const LocationSearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 12px;
  font-size: 14px;
  outline: none;
  font-family: 'Roboto', sans-serif;
  color: var(--text-main, #101828);
  transition: all 0.2s;
  box-sizing: border-box;

  &:hover { border-color: var(--border, #cbd5e1); }
  &:focus {
    border-color: var(--border-focus, #007664);
    box-shadow: 0 0 0 3px rgba(0, 118, 100, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted, #667085);
  pointer-events: none;
`;

const SuggestionsDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 12px;
  max-height: 250px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
`;

const SuggestionItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 13px;
  border-bottom: 1px solid var(--border, #cbd5e1);
  color: var(--text-secondary, #344054);
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: var(--secondary, #e6f0ee);
    color: var(--primary, #007664);
  }
  &:last-child { border-bottom: none; }
`;

const SelectedLocationCard = styled.div`
  grid-column: span 2;
  padding: 20px;
  background: var(--secondary, #e6f0ee);
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 16px;
  display: flex;
  gap: 16px;
  animation: ${fadeIn} 0.4s ease-out;

  @media (max-width: 768px) { grid-column: span 1; }
`;

const PinIconCircle = styled.div`
  width: 44px;
  height: 44px;
  background: var(--primary, #007664);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const LocationInfo = styled.div`
  h4 {
    margin: 0 0 6px;
    font-size: 15px;
    font-weight: 700;
    color: var(--text-main, #101828);
  }
  p {
    margin: 0;
    font-size: 13px;
    color: var(--text-muted, #667085);
    line-height: 1.5;
  }
`;

const ErrorText = styled.div`
  font-size: 12px;
  color: var(--danger, #E53E3E);
  margin-top: 6px;
  font-weight: 500;
`;

const ApiErrorText = styled.div`
  color: var(--danger, #E53E3E);
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  margin-top: 16px;
`;

const CompanyDetails = () => {
  const location = useLocation();
  const companyId = location.state?.companyId;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, error: apiError } = useSelector((state) => state.companyDetails);
  const { data: companyTypeList } = useSelector((state) => state.companyType);

  const [showSuccess, setShowSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    dispatch(getCompanyTypeRequest());
  }, [dispatch]);

  useEffect(() => {
    if (data?.success) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/certification", {
          state: { companyTypeId: data.companyTypeId, companyId },
        });
      }, 2000);
    }
  }, [data, navigate, companyId]);

  const companyTypesStatic = [
    "Private Limited",
    "Public Limited",
    "Partnership",
    "Sole Proprietorship",
  ];

  const formik = useFormik({
    initialValues: {
      gstNumber: "", panNumber: "", companyRegistrationNumber: "",
      authorisedUserName: "", authorisedPhoneNumber: "", authorisedEmailId: "",
      description: "", numberOfEmployee: "", numberOfCities: "",
      companyType: "", companyTypeId: "",
      country: "", state: "", city: "", pincode: "",
      lat: "", lod: "", area: "",
    },
    validationSchema: Yup.object({
      gstNumber: Yup.string()
        .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GST format (15 characters: e.g. 01ABCDEF1234F1Z6)")
        .required("Required"),
      panNumber: Yup.string()
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format (10 characters: e.g. DLWLL8568M)")
        .required("Required"),
      companyRegistrationNumber: getRegistrationNumberValidation(true, 50),
      authorisedUserName: getFullNameValidation(true, 3, 50),
      authorisedPhoneNumber: getPhoneValidation(true),
      authorisedEmailId: getEmailValidation(true),
      description: getDescriptionValidation(true, 50, 500),

      numberOfEmployee: Yup.string()
        .matches(/^[0-9]+$/, "Must contain digits only")
        .required("Required"),
      numberOfCities: Yup.string()
        .matches(/^[0-9]+$/, "Must contain digits only")
        .required("Required"),
      companyType: Yup.string().required("Required"),
      companyTypeId: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      pincode: Yup.string()
        .matches(/^[1-9][0-9]{5}$/, "Must be a valid 6-digit pincode")
        .required("Required"),
      area: Yup.string().required("Required"),
      lat: Yup.string().required("Required"),
      lod: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(addCompanyDetailsRequest({
        ...values,
        companyId,
        numberOfEmployee: parseInt(values.numberOfEmployee, 10) || 0,
        numberOfCities: parseInt(values.numberOfCities, 10) || 0,
        lat: parseFloat(values.lat),
        lod: parseFloat(values.lod),
      }));
    },
  });

  const searchLocation = async (query) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=8&countrycodes=in`,
        { headers: { "User-Agent": "LabOrderPro/1.0" } }
      );
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      }
    } catch (error) { console.error(error); }
    finally { setIsSearching(false); }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => searchLocation(e.target.value), 500);
  };

  const handleLocationSelect = (place) => {
    const address = place.address || {};
    
    // Fallbacks for city
    const parsedCity = address.city || address.town || address.village || address.municipality || address.county || address.state_district || "";
    
    // Fallbacks for pincode (postcode) from display_name if missing
    let parsedPincode = address.postcode || "";
    if (!parsedPincode && place.display_name) {
      const match = place.display_name.match(/\b[1-9][0-9]{5}\b/);
      if (match) {
        parsedPincode = match[0];
      }
    }

    formik.setFieldValue("country", address.country || "");
    formik.setFieldValue("state", address.state || address.region || "");
    formik.setFieldValue("city", parsedCity);
    formik.setFieldValue("area", address.suburb || address.neighbourhood || place.display_name.split(",")[0]);
    formik.setFieldValue("pincode", parsedPincode);
    formik.setFieldValue("lat", place.lat ? String(place.lat) : "");
    formik.setFieldValue("lod", place.lon ? String(place.lon) : "");

    // Mark location fields as touched to trigger inline errors on empty fields immediately
    formik.setFieldTouched("country", true, true);
    formik.setFieldTouched("state", true, true);
    formik.setFieldTouched("city", true, true);
    formik.setFieldTouched("area", true, true);
    formik.setFieldTouched("pincode", true, true);

    setSearchQuery(place.display_name);
    setShowSuggestions(false);
  };

  return (
    <PageWrapper>
      <Container>
        <HeaderNav>
          <BackButton text="Back" />
        </HeaderNav>

        <Header>
          <IconCircle>
            <Building2 size={32} />
          </IconCircle>
          <Title>Company Profile</Title>
          <Subtitle>Provide your business registration and operations details</Subtitle>
        </Header>

        <form onSubmit={formik.handleSubmit} noValidate>
          <FormGrid>
            <SectionHeader><Info size={16} /> Business Information</SectionHeader>
            <FormGroup>
              <TextField
                label="GST Number"
                name="gstNumber"
                required
                value={formik.values.gstNumber}
                onChange={(e) => {
                  formik.setFieldValue("gstNumber", e.target.value.toUpperCase());
                }}
                placeholder="01ABCDEF1234F1Z6"
                error={formik.touched.gstNumber && formik.errors.gstNumber}
                helperText={formik.touched.gstNumber && formik.errors.gstNumber}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                label="PAN Number"
                name="panNumber"
                required
                value={formik.values.panNumber}
                onChange={(e) => {
                  formik.setFieldValue("panNumber", e.target.value.toUpperCase());
                }}
                placeholder="DLWLL8568M"
                error={formik.touched.panNumber && formik.errors.panNumber}
                helperText={formik.touched.panNumber && formik.errors.panNumber}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                label="Registration Number"
                name="companyRegistrationNumber"
                required
                value={formik.values.companyRegistrationNumber}
                onChange={(e) => {
                  const clean = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
                  formik.setFieldValue("companyRegistrationNumber", clean);
                }}
                placeholder="e.g. U12345MH2023PTC123456"
                error={formik.touched.companyRegistrationNumber && formik.errors.companyRegistrationNumber}
                helperText={formik.touched.companyRegistrationNumber && formik.errors.companyRegistrationNumber}
                maxLength={50}
              />
            </FormGroup>

            <SectionHeader><UserCheck size={16} /> Authorised Representative</SectionHeader>
            <FormGroup>
              <TextField
                label="Full Name"
                name="authorisedUserName"
                required
                value={formik.values.authorisedUserName}
                onChange={(e) => {
                  const clean = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                  formik.setFieldValue("authorisedUserName", clean);
                }}
                placeholder="e.g. John Doe"
                error={formik.touched.authorisedUserName && formik.errors.authorisedUserName}
                helperText={formik.touched.authorisedUserName && formik.errors.authorisedUserName}
                maxLength={50}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                label="Phone Number"
                name="authorisedPhoneNumber"
                required
                value={formik.values.authorisedPhoneNumber}
                onChange={(e) => {
                  const clean = e.target.value.replace(/\D/g, "").slice(0, 10);
                  formik.setFieldValue("authorisedPhoneNumber", clean);
                }}
                placeholder="e.g. 9876543210"
                error={formik.touched.authorisedPhoneNumber && formik.errors.authorisedPhoneNumber}
                helperText={formik.touched.authorisedPhoneNumber && formik.errors.authorisedPhoneNumber}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                label="Email ID"
                name="authorisedEmailId"
                required
                value={formik.values.authorisedEmailId}
                onChange={formik.handleChange}
                placeholder="e.g. representative@company.com"
                error={formik.touched.authorisedEmailId && formik.errors.authorisedEmailId}
                helperText={formik.touched.authorisedEmailId && formik.errors.authorisedEmailId}
              />
            </FormGroup>

            <SectionHeader><Building2 size={16} /> Operations</SectionHeader>
            <FullWidthGroup>
              <label>Description <span style={{ color: '#ef4444' }}>*</span></label>
              <TextArea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                placeholder="Enter company description"
                maxLength={500}
                $error={formik.touched.description && !!formik.errors.description}
              />
              {formik.touched.description && formik.errors.description && <ErrorText>{formik.errors.description}</ErrorText>}
            </FullWidthGroup>

            <FormGroup>
              <TextField
                label="Employees"
                name="numberOfEmployee"
                required
                value={formik.values.numberOfEmployee}
                onChange={(e) => {
                  const clean = e.target.value.replace(/\D/g, "");
                  formik.setFieldValue("numberOfEmployee", clean);
                }}
                placeholder="Enter number of employees"
                error={formik.touched.numberOfEmployee && formik.errors.numberOfEmployee}
                helperText={formik.touched.numberOfEmployee && formik.errors.numberOfEmployee}
              />
            </FormGroup>

            <FormGroup>
              <TextField
                label="Cities"
                name="numberOfCities"
                required
                value={formik.values.numberOfCities}
                onChange={(e) => {
                  const clean = e.target.value.replace(/\D/g, "");
                  formik.setFieldValue("numberOfCities", clean);
                }}
                placeholder="Enter number of cities"
                error={formik.touched.numberOfCities && formik.errors.numberOfCities}
                helperText={formik.touched.numberOfCities && formik.errors.numberOfCities}
              />
            </FormGroup>

            <FormGroup>
              <label>Structure <span style={{ color: '#ef4444' }}>*</span></label>
              <SearchableDropdown
                options={companyTypesStatic}
                placeholder="Select company type"
                value={formik.values.companyType}
                onSelect={(val) => formik.setFieldValue("companyType", val)}
                error={formik.touched.companyType && formik.errors.companyType}
                helperText={formik.touched.companyType && formik.errors.companyType}
              />
            </FormGroup>

            <FormGroup>
              <label>Category <span style={{ color: '#ef4444' }}>*</span></label>
              <SearchableDropdown
                options={companyTypeList?.map((item) => item.companyType) || []}
                placeholder="Select category"
                value={companyTypeList?.find((i) => i.id === formik.values.companyTypeId)?.companyType || ""}
                onSelect={(val) => {
                  const sel = companyTypeList.find((i) => i.companyType === val);
                  formik.setFieldValue("companyTypeId", sel?.id || "");
                }}
                error={formik.touched.companyTypeId && formik.errors.companyTypeId}
                helperText={formik.touched.companyTypeId && formik.errors.companyTypeId}
              />
            </FormGroup>

            <SectionHeader><MapPin size={16} /> Location & Address</SectionHeader>
            <FullWidthGroup>
              <label>Search Physical Location</label>
              <SearchContainer>
                <SearchIcon><Search size={18} /></SearchIcon>
                <LocationSearchInput
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Type location (e.g., Koramangala, Bangalore)"
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                />
                {showSuggestions && (
                  <SuggestionsDropdown>
                    {isSearching ? <div style={{ padding: '16px', textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>Searching...</div> :
                      suggestions.map((p) => (
                        <SuggestionItem key={p.place_id} onClick={() => handleLocationSelect(p)}>
                          <MapPinHouse size={16} /> {p.display_name}
                        </SuggestionItem>
                      ))
                    }
                  </SuggestionsDropdown>
                )}
              </SearchContainer>
            </FullWidthGroup>

            {formik.values.country && (
              <>
                <SelectedLocationCard>
                  <PinIconCircle><MapPinHouse size={20} /></PinIconCircle>
                  <LocationInfo>
                    <h4>Pinned Coordinates</h4>
                    <p>Latitude: {formik.values.lat || "N/A"} | Longitude: {formik.values.lod || "N/A"}</p>
                  </LocationInfo>
                </SelectedLocationCard>

                <FormGroup>
                  <TextField
                    label="Area / Street Address"
                    name="area"
                    required
                    value={formik.values.area}
                    onChange={formik.handleChange}
                    placeholder="e.g., Sector 4, HSR Layout"
                    error={formik.touched.area && formik.errors.area}
                    helperText={formik.touched.area && formik.errors.area}
                  />
                </FormGroup>

                <FormGroup>
                  <TextField
                    label="City"
                    name="city"
                    required
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    placeholder="e.g., Bengaluru"
                    error={formik.touched.city && formik.errors.city}
                    helperText={formik.touched.city && formik.errors.city}
                  />
                </FormGroup>

                <FormGroup>
                  <TextField
                    label="State"
                    name="state"
                    required
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    placeholder="e.g., Karnataka"
                    error={formik.touched.state && formik.errors.state}
                    helperText={formik.touched.state && formik.errors.state}
                  />
                </FormGroup>

                <FormGroup>
                  <TextField
                    label="Pincode"
                    name="pincode"
                    required
                    value={formik.values.pincode}
                    onChange={(e) => {
                      const clean = e.target.value.replace(/\D/g, "").slice(0, 6);
                      formik.setFieldValue("pincode", clean);
                    }}
                    placeholder="e.g., 560102"
                    error={formik.touched.pincode && formik.errors.pincode}
                    helperText={formik.touched.pincode && formik.errors.pincode}
                  />
                </FormGroup>

                <FormGroup>
                  <TextField
                    label="Country"
                    name="country"
                    required
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    placeholder="e.g., India"
                    error={formik.touched.country && formik.errors.country}
                    helperText={formik.touched.country && formik.errors.country}
                  />
                </FormGroup>
              </>
            )}

            {apiError && (
              <FullWidthGroup>
                <ApiErrorText>{apiError}</ApiErrorText>
              </FullWidthGroup>
            )}

            <FullWidthGroup>
              <Button type="submit" disabled={formik.isSubmitting} style={{ width: '100%', height: '52px', marginTop: '16px', fontSize: '16px' }}>
                Complete Registration <ChevronRight size={20} style={{ marginLeft: '8px' }} />
              </Button>
            </FullWidthGroup>
          </FormGrid>
        </form>

        {showSuccess && <SuccessModal message="Company details saved successfully!" />}
      </Container>
    </PageWrapper>
  );
};

export default CompanyDetails;