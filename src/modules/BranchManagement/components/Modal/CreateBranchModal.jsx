import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  getNameValidation,
  getEmailValidation,
  getPhoneValidation,
  getCompanyNameValidation
} from "../../../../utils/validationRules";
import { LuX as X, LuMapPin as MapPin, LuBuilding2 as Building2, LuUser as User, LuMail as Mail, LuPhone as Phone, LuSearch as Search, LuCircleCheck as CheckCircle2, LuCircleAlert as AlertCircle } from 'react-icons/lu';
import { useSelector, useDispatch } from "react-redux";

// Actions & Components
import Button from "../../../../components/Button";
import TextField from "../../../../components/TextField";
import SuccessModal from "../../../../components/Modal/SuccessModal";
import Loader from "../../../../components/common/Loader";
import {
  createBranchRequest,
  createBranchClear,
} from "../../actions/createBranchActions";

// ---------------- Styled Components ----------------
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: ${p => (p.open ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  background: rgba(16, 24, 40, 0.7);
  backdrop-filter: blur(4px);
  z-index: 2000;
  padding: 20px;

  @keyframes spin {
    from { transform: translateY(-50%) rotate(0deg); }
    to { transform: translateY(-50%) rotate(360deg); }
  }
  .spin {
    animation: spin 1s linear infinite;
  }
`;

const ModalBox = styled.div`
  width: 100%;
  max-width: 680px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 600px) {
    border-radius: 16px 16px 0 0;
    max-height: 90vh;
    align-self: flex-end;
    margin-bottom: -20px; /* Offset the padding from Overlay */
  }
`;

const ModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #F9FAFB;

  .title-group {
    h3 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: var(--text-main);
      
      @media (max-width: 480px) {
        font-size: 18px;
      }
    }
    p {
      margin: 4px 0 0 0;
      font-size: 13px;
      color: var(--text-muted);
    }
  }
`;

const CloseBtn = styled.button`
  background: white;
  border: 1px solid var(--border);
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: #F9FAFB;
    color: var(--text-main);
    transform: scale(1.05);
  }
`;

const ModalBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 70vh;

  @media (max-width: 600px) {
    padding: 16px;
    max-height: 60vh;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 10px;
  }
`;

const SectionTitle = styled.h4`
  font-size: 13px;
  font-weight: 700;
  color: #0052FF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 24px;
  max-width: 480px;
  width: 100%;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  
  .icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
  }

  input {
    width: 100%;
    padding: 12px 14px 12px 42px;
    border: 1px solid var(--border);
    border-radius: 10px;
    font-size: 14px;
    outline: none;
    transition: all 0.2s;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);

    &:focus {
      border-color: #0052FF;
      box-shadow: 0 0 0 4px rgba(0, 82, 255, 0.1);
    }
  }
`;

const SuggestionsList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid var(--border);
  border-top: none;
  border-radius: 0 0 10px 10px;
  max-height: 240px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
`;

const SuggestionItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 13px;
  color: var(--text-secondary);
  border-bottom: 1px solid #F2F4F7;
  display: flex;
  gap: 12px;

  svg { flex-shrink: 0; color: #98A2B3; }
  &:hover { background: #F9FAFB; font-weight: 500; }
  &:last-child { border-bottom: none; }
`;

const SelectedLocationCard = styled.div`
  background: #F5F8FF;
  border: 1px solid #D1E0FF;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  gap: 16px;
  margin-top: -8px;
  margin-bottom: 24px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .icon-box {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: #0052FF;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .details {
    flex: 1;
    .place-name { font-weight: 700; font-size: 14px; color: var(--text-main); margin-bottom: 2px; }
    .place-meta { font-size: 12px; color: #475467; line-height: 1.4; }
  }
`;

const ModalFooter = styled.div`
  padding: 20px 24px;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: #F9FAFB;

  @media (max-width: 480px) {
    padding: 16px;
    flex-direction: column-reverse;
    button { width: 100%; }
  }
`;

const ErrorBanner = styled.div`
  background: #FEF3F2;
  border: 1px solid #FECDCA;
  border-radius: 10px;
  padding: 12px 16px;
  color: #D92D20;
  font-size: 13px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

// ---------------- Validation Schema ----------------
const schema = Yup.object().shape({
  branchName: getCompanyNameValidation("Branch Name", true, 3, 100),
  contactNumber: getPhoneValidation(true),
  additionalContactNumber: getPhoneValidation(false),
  email: getEmailValidation(true),
  nodalOfficerName: getNameValidation("Nodal Officer Name", true, 3, 50),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  area: Yup.string().required("Area/locality is required"),
  pinCode: Yup.string()
    .matches(/^[1-9][0-9]{5}$/, "Must be a valid 6-digit pincode")
    .required("Pincode is required"),
});

// Time conversion functions removed

const parseAddress = (addressStr) => {
  if (!addressStr) return {};
  const parts = addressStr.split(',').map(p => p.trim()).filter(Boolean);
  
  let country = "";
  let pinCode = "";
  let state = "";
  let city = "";
  let district = "";
  let area = "";

  // Try to find a 6-digit pincode
  let pinIndex = -1;
  for (let i = 0; i < parts.length; i++) {
    if (/^\d{6}$/.test(parts[i]) || /\b\d{6}\b/.test(parts[i])) {
      const match = parts[i].match(/\b\d{6}\b/);
      if (match) {
        pinCode = match[0];
        pinIndex = i;
        break;
      }
    }
  }

  // Country is usually the last part
  let workingParts = [...parts];
  if (workingParts.length > 0) {
    country = workingParts.pop();
  }

  if (pinIndex !== -1) {
    // We found a pincode. Let's get the index in workingParts
    const wpPinIndex = workingParts.findIndex(p => p.includes(pinCode));
    if (wpPinIndex !== -1) {
      // Remove pincode part from workingParts to avoid displaying it in state/city
      workingParts.splice(wpPinIndex, 1);
    }
    
    // Now the remaining parts at the end are usually State, City, District
    if (workingParts.length > 0) {
      state = workingParts.pop();
    }
    if (workingParts.length > 0) {
      city = workingParts.pop();
    }
    if (workingParts.length > 0) {
      district = workingParts.pop();
    }
    area = workingParts.join(", ");
  } else {
    // No pincode found
    if (workingParts.length > 0) {
      state = workingParts.pop();
    }
    if (workingParts.length > 0) {
      city = workingParts.pop();
    }
    if (workingParts.length > 0) {
      district = workingParts.pop();
    }
    area = workingParts.join(", ");
  }

  return { country, state, city, district, area, pinCode };
};

const parseFloatSafely = (val) => {
  if (val === undefined || val === null || val === "") return "";
  const parsed = parseFloat(val);
  return isNaN(parsed) ? "" : parsed;
};

const CreateBranchModal = ({ open, onClose, initialData }) => {
  const isEdit = !!initialData;
  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const { data: branchResponse, loading: branchLoading, error } = useSelector(
    (state) => state.createBranch
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef(null);

  const searchQueryRef = useRef(searchQuery);
  searchQueryRef.current = searchQuery;

  const [coordsFallback, setCoordsFallback] = useState({ lat: "", lon: "" });

  // Parse address if initialData has it but lacks individual fields
  const parsedAddress = React.useMemo(() => {
    if (initialData && initialData.address && !initialData.city) {
      return parseAddress(initialData.address);
    }
    return {};
  }, [initialData]);

  useEffect(() => {
    if (branchResponse && branchResponse.success) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        onClose();
        dispatch(createBranchClear());
        setSearchQuery("");
        setSuggestions([]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [branchResponse, dispatch, onClose]);

  useEffect(() => {
    if (initialData) {
      const address = initialData.address || initialData.city || "";
      setSearchQuery(address);

      const hasLat = initialData.lat || initialData.latitude || initialData.coordinates?.latitude;
      const hasLon = initialData.lon || initialData.longitude || initialData.lod || initialData.coordinates?.longitude || initialData.coordinates?.lod;

      if ((!hasLat || !hasLon) && address) {
        fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
          { headers: { "User-Agent": "LabAdmin/1.0" } }
        )
          .then(res => res.json())
          .then(data => {
            if (data && data.length > 0) {
              setCoordsFallback({
                lat: data[0].lat,
                lon: data[0].lon
              });
            } else {
              const fallbackQuery = initialData.city || initialData.district || "";
              if (fallbackQuery) {
                fetch(
                  `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fallbackQuery)}&limit=1`,
                  { headers: { "User-Agent": "LabAdmin/1.0" } }
                )
                  .then(res => res.json())
                  .then(fallbackData => {
                    if (fallbackData && fallbackData.length > 0) {
                      setCoordsFallback({
                        lat: fallbackData[0].lat,
                        lon: fallbackData[0].lon
                      });
                    }
                  })
                  .catch(err => console.error("Geocoding fallback city error:", err));
              }
            }
          })
          .catch(err => console.error("Geocoding fallback address error:", err));
      } else {
        setCoordsFallback({ lat: "", lon: "" });
      }
    } else {
      setSearchQuery("");
      setCoordsFallback({ lat: "", lon: "" });
    }
  }, [initialData]);

  const searchLocation = async (query) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }
    setIsSearching(true);
    try {
      const resp = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=6&countrycodes=in`,
        { headers: { "User-Agent": "LabAdmin/1.0" } }
      );
      if (resp.ok) {
        const data = await resp.json();
        setSuggestions(data);
        setShowSuggestions(true);
      }
    } catch (err) { console.error(err); } 
    finally { setIsSearching(false); }
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => searchLocation(val), 500);
  };

  const handleSelect = (place, setFieldValue, setFieldTouched) => {
    const a = place.address || {};
    
    // Fallback city
    const parsedCity = a.city || a.town || a.village || a.municipality || a.county || a.state_district || "";
    
    // Fallback pincode from display_name
    let parsedPinCode = a.postcode || "";
    if (!parsedPinCode && place.display_name) {
      const match = place.display_name.match(/\b[1-9][0-9]{5}\b/);
      if (match) {
        parsedPinCode = match[0];
      }
    }

    setFieldValue("country", a.country || "");
    setFieldValue("state", a.state || a.region || "");
    setFieldValue("city", parsedCity);
    setFieldValue("district", a.county || a.district || "");
    setFieldValue("area", a.suburb || place.display_name.split(',')[0]);
    setFieldValue("pinCode", parsedPinCode);
    setFieldValue("lat", place.lat ? String(place.lat) : "");
    setFieldValue("lon", place.lon ? String(place.lon) : "");

    // Mark location fields as touched to trigger inline errors on empty fields immediately
    if (setFieldTouched) {
      setFieldTouched("country", true, true);
      setFieldTouched("state", true, true);
      setFieldTouched("city", true, true);
      setFieldTouched("area", true, true);
      setFieldTouched("pinCode", true, true);
    }

    setSearchQuery(place.display_name);
    setShowSuggestions(false);
  };

  if (!open) return null;

  return (
    <>
      <Overlay open={open}>
        <ModalBox onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <div className="title-group">
              <h3>{isEdit ? "Edit Branch" : "Add New Branch"}</h3>
              <p>{isEdit ? "Update your branch details and configurations." : "Enter branch details and location to expand your network."}</p>
            </div>
            <CloseBtn onClick={onClose} title="Close window"><X size={20} /></CloseBtn>
          </ModalHeader>

          <Formik
            initialValues={{
              branchName: initialData?.branchName || "", 
              nodalOfficerName: initialData?.nodalOfficerName || "", 
              email: initialData?.email || "", 
              contactNumber: initialData?.contactNumber
                ? String(initialData.contactNumber).replace(/\D/g, "").slice(-10)
                : "", 
              additionalContactNumber: initialData?.additionalContactNumber
                ? String(initialData.additionalContactNumber).replace(/\D/g, "").slice(-10)
                : "",
              country: initialData?.country || parsedAddress.country || "", 
              state: initialData?.state || parsedAddress.state || "", 
              city: initialData?.city || parsedAddress.city || "", 
              district: initialData?.district || parsedAddress.district || "", 
              area: initialData?.area || parsedAddress.area || "", 
              pinCode: initialData?.pinCode || initialData?.pincode || parsedAddress.pinCode || "", 
              lat: initialData?.lat || initialData?.latitude || initialData?.coordinates?.latitude || coordsFallback.lat || "", 
              lon: initialData?.lon || initialData?.longitude || initialData?.lod || initialData?.coordinates?.longitude || initialData?.coordinates?.lod || coordsFallback.lon || ""
            }}
            enableReinitialize={true}
            validationSchema={schema}
            onSubmit={(values) => {
              const parsedLat = parseFloatSafely(values.lat);
              const parsedLon = parseFloatSafely(values.lon);

              const { lat: _lat, lon: _lon, lod: _lod, ...restValues } = values;

              const payload = {
                ...restValues,
                latitude: parsedLat,
                longitude: parsedLon,
              };

              if (isEdit) {
                 const branchId = initialData?.id || initialData?.branchId;
                 console.log("Updating branch with ID:", branchId, payload);
                 dispatch(createBranchRequest({ branchId, ...payload }));
              } else {
                 dispatch(createBranchRequest(payload));
              }
            }}
          >
            {({ values, errors, touched, handleChange, setFieldValue, setFieldTouched, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <ModalBody>
                  {error && <ErrorBanner><AlertCircle size={18} /> {error}</ErrorBanner>}

                  <SectionTitle><Building2 size={16} /> Basic Details</SectionTitle>
                  <FormGrid>
                    <TextField
                      label="Branch Name"
                      name="branchName"
                      required
                      placeholder="e.g. Koramangala Center"
                      value={values.branchName}
                      onChange={handleChange}
                      error={(touched.branchName || !!values.branchName) && errors.branchName}
                      helperText={(touched.branchName || !!values.branchName) && errors.branchName}
                      maxLength={100}
                    />
                    <TextField
                      label="Nodal Officer"
                      name="nodalOfficerName"
                      required
                      placeholder="Full Name"
                      value={values.nodalOfficerName}
                      onChange={handleChange}
                      error={(touched.nodalOfficerName || !!values.nodalOfficerName) && errors.nodalOfficerName}
                      helperText={(touched.nodalOfficerName || !!values.nodalOfficerName) && errors.nodalOfficerName}
                    />
                    <TextField
                      label="Email Address"
                      name="email"
                      required
                      placeholder="branch@lab.com"
                      value={values.email}
                      onChange={handleChange}
                      error={(touched.email || !!values.email) && errors.email}
                      helperText={(touched.email || !!values.email) && errors.email}
                    />
                    <TextField
                      label="Contact Number"
                      name="contactNumber"
                      required
                      placeholder="10-digit number"
                      value={values.contactNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setFieldValue("contactNumber", val);
                      }}
                      error={(touched.contactNumber || !!values.contactNumber) && errors.contactNumber}
                      helperText={(touched.contactNumber || !!values.contactNumber) && errors.contactNumber}
                    />
                    <TextField
                      label="Additional Contact Number"
                      name="additionalContactNumber"
                      placeholder="Optional 10-digit number"
                      value={values.additionalContactNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setFieldValue("additionalContactNumber", val);
                      }}
                      error={(touched.additionalContactNumber || !!values.additionalContactNumber) && errors.additionalContactNumber}
                      helperText={(touched.additionalContactNumber || !!values.additionalContactNumber) && errors.additionalContactNumber}
                    />
                    {/* Time fields removed */}
                  </FormGrid>

                  <SectionTitle><MapPin size={16} /> Location Mapping</SectionTitle>
                  <SearchWrapper>
                     <SearchInputWrapper>
                        <Search size={18} className="icon" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => {
                            handleSearchChange(e);
                            setFieldValue("country", "");
                            setFieldValue("state", "");
                            setFieldValue("city", "");
                            setFieldValue("district", "");
                            setFieldValue("area", "");
                            setFieldValue("pinCode", "");
                            setFieldValue("lat", "");
                            setFieldValue("lon", "");
                          }}
                          placeholder="Search for your branch locality/city..."
                          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                        />
                        {isSearching && <Loader text="" size={18} color="var(--primary)" />}
                     </SearchInputWrapper>
                     
                     {showSuggestions && (
                        <SuggestionsList>
                          {suggestions.map((p) => (
                             <SuggestionItem key={p.place_id} onClick={() => handleSelect(p, setFieldValue, setFieldTouched)}>
                              <MapPin size={14} />
                              {p.display_name}
                            </SuggestionItem>
                          ))}
                        </SuggestionsList>
                     )}
                     {touched.city && errors.city && (
                       <div style={{ color: '#D92D20', fontSize: '12px', marginTop: '6px' }}>{errors.city}</div>
                     )}
                  </SearchWrapper>

                   {values.city && (
                     <>
                       <SelectedLocationCard>
                          <div className="icon-box"><MapPin size={24} /></div>
                          <div className="details">
                             <div className="place-name">Pinned Coordinates</div>
                             <div className="place-meta">
                               Latitude: {values.lat || "N/A"} | Longitude: {values.lon || "N/A"}
                             </div>
                          </div>
                          <CheckCircle2 size={24} color="#039855" style={{ marginTop: 2 }} />
                       </SelectedLocationCard>

                       <FormGrid>
                         <TextField
                           label="Area / Street Address"
                           name="area"
                           required
                           value={values.area}
                           onChange={handleChange}
                           placeholder="e.g. Sector 4, Koramangala"
                           error={(touched.area || !!values.area) && errors.area}
                           helperText={(touched.area || !!values.area) && errors.area}
                         />
                         <TextField
                           label="City"
                           name="city"
                           required
                           value={values.city}
                           onChange={handleChange}
                           placeholder="e.g. Bangalore"
                           error={(touched.city || !!values.city) && errors.city}
                           helperText={(touched.city || !!values.city) && errors.city}
                         />
                         <TextField
                           label="State"
                           name="state"
                           required
                           value={values.state}
                           onChange={handleChange}
                           placeholder="e.g. Karnataka"
                           error={(touched.state || !!values.state) && errors.state}
                           helperText={(touched.state || !!values.state) && errors.state}
                         />
                         <TextField
                           label="Pincode"
                           name="pinCode"
                           required
                           value={values.pinCode}
                           onChange={(e) => {
                             const clean = e.target.value.replace(/\D/g, "").slice(0, 6);
                             setFieldValue("pinCode", clean);
                           }}
                           placeholder="e.g. 560034"
                           error={(touched.pinCode || !!values.pinCode) && errors.pinCode}
                           helperText={(touched.pinCode || !!values.pinCode) && errors.pinCode}
                         />
                         <TextField
                           label="Country"
                           name="country"
                           required
                           value={values.country}
                           onChange={handleChange}
                           placeholder="e.g. India"
                           error={(touched.country || !!values.country) && errors.country}
                           helperText={(touched.country || !!values.country) && errors.country}
                         />
                         <TextField
                           label="District"
                           name="district"
                           value={values.district}
                           onChange={handleChange}
                           placeholder="e.g. Bangalore Urban"
                           error={(touched.district || !!values.district) && errors.district}
                           helperText={(touched.district || !!values.district) && errors.district}
                         />
                       </FormGrid>
                     </>
                   )}
                </ModalBody>

                <ModalFooter>
                  <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
                  <Button type="submit" disabled={branchLoading} style={{ padding: '10px 24px', fontWeight: 700 }}>
                    {branchLoading ? "Saving..." : isEdit ? "Update Branch" : "Create Branch"}
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBox>
      </Overlay>

      {showSuccess && <SuccessModal message={isEdit ? "Branch updated successfully!" : "New branch established successfully!"} />}
    </>
  );
};

export default CreateBranchModal;
