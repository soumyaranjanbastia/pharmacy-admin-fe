import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import { LuArrowLeft as ArrowLeft, LuCheck as Check, LuUser as User, LuMapPin as MapPin, LuShieldCheck as ShieldCheck, LuFileText as FileText } from 'react-icons/lu';
import { createUserRequest, clearCreateUser } from "../../actions/createUserActions";
import SuccessModal from "../../../../components/Modal/SuccessModal";
import styled from "styled-components";
import { useToast } from "../../../../components/Toast/ToastContext";

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

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 24px;
`;

const ReviewSection = styled.div`
  background: #f8fafc;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
`;

const SectionHeader = styled.h5`
  font-size: 14px;
  font-weight: 700;
  color: var(--primary);
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InfoValue = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: var(--text-main);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 28px;
  border-top: 1px solid #f1f5f9;
  padding-top: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const SignatureThumbnail = styled.div`
  margin-top: 12px;
  width: fit-content;
  border: 1.5px dashed var(--border);
  border-radius: 12px;
  padding: 8px;
  background: white;
  transition: all 0.2s;

  &:hover {
    border-color: var(--primary);
  }

  img {
    max-height: 80px;
    max-width: 240px;
    display: block;
    object-fit: contain;
  }
`;

const ReviewStep = ({ data = {}, onBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { loading, data: response, error } = useSelector(
    (state) => state.createUser
  );

  const [showModal, setShowModal] = useState(false);

  // ✅ Username generator based on role
  const generateUsername = (roleName) => {
    if (!roleName) return `User_${Math.floor(Math.random() * 1000)}`;

    let prefix = "";
    switch (roleName) {
      case "Admin":
        prefix = "Ad";
        break;
      case "Lab Technician":
        prefix = "Lab";
        break;
      case "Sample Collector":
        prefix = "Coll";
        break;
      default:
        prefix = roleName.slice(0, 3); // fallback: take first 3 letters
    }
    const randomNum = Math.floor(Math.random() * 90 + 10); // 2 digit random number
    return `${prefix}_${randomNum}`;
  };

  // ✅ Memoize final username so it doesn't change on each render
  const finalUsername = useMemo(() => {
    return data.username?.trim()
      ? data.username
      : generateUsername(data.roleName || data.role);
  }, [data.username, data.roleName, data.role]);

  const branchRaw = data.branchId ?? data.branch;
  const parsedBranchId =
    branchRaw !== undefined &&
    branchRaw !== null &&
    String(branchRaw).trim() !== ""
      ? Number(branchRaw)
      : undefined;

  let targetId = undefined;
  if (data.isEdit) {
    targetId = data.branchUserId || data.adminUserId || data.id;
  }

  const handleConfirm = () => {
    const payload = {
      firstname: data.firstname,
      lastname: data.lastname,
      username: finalUsername,
      email: data.email,
      phoneNumber: data.phoneNumber || data.phone || "",
      roleId: data.roleId,
      country: data.country,
      state: data.state,
      address: data.address,
      id: targetId,
      gender: data.gender,
      dob: data.dob,
      digitalSignature: data.digitalSignature,
    };

    if (parsedBranchId) {
      payload.branchId = parsedBranchId;
    }

    if (data.isEdit) {
      if (data.adminUserId) payload.adminUserId = data.adminUserId;
    }

    console.log("📤 Dispatching Create User API with Payload:", payload);
    dispatch(createUserRequest(payload));
  };

  useEffect(() => {
    if (response) {
      console.log("✅ API Success Response:", response);
      setShowModal(true);

      // Close modal after 2.5s, clear state & navigate
      const timer = setTimeout(() => {
        setShowModal(false);
        dispatch(clearCreateUser());
        navigate("/admin/user-managementportal");
      }, 2500);

      return () => clearTimeout(timer);
    }

    if (error) {
      console.error("❌ API Error:", error);
      toast.error("Error", String(error));
      dispatch(clearCreateUser());
    }
  }, [response, error, dispatch, navigate, toast]);
  return (
    <Card>
      <FormSectionTitle>Review User Details</FormSectionTitle>

      <ReviewGrid>
        {/* Section 1: Personal Profile */}
        <ReviewSection>
          <SectionHeader>
            <User size={16} /> Personal Details
          </SectionHeader>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>First Name</InfoLabel>
              <InfoValue>{data.firstname || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Last Name</InfoLabel>
              <InfoValue>{data.lastname || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Username</InfoLabel>
              <InfoValue>{finalUsername}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Date of Birth</InfoLabel>
              <InfoValue>{data.dob || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Gender</InfoLabel>
              <InfoValue>{data.gender || "N/A"}</InfoValue>
            </InfoItem>
          </InfoGrid>
        </ReviewSection>

        {/* Section 2: Contact & Location */}
        <ReviewSection>
          <SectionHeader>
            <MapPin size={16} /> Contact & Location
          </SectionHeader>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>Email Address</InfoLabel>
              <InfoValue>{data.email || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Phone Number</InfoLabel>
              <InfoValue>{data.phoneNumber || data.phone || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Country</InfoLabel>
              <InfoValue>{data.country || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>State</InfoLabel>
              <InfoValue>{data.state || "N/A"}</InfoValue>
            </InfoItem>
            <InfoItem style={{ gridColumn: "span 2" }}>
              <InfoLabel>Full Address</InfoLabel>
              <InfoValue>{data.address || "N/A"}</InfoValue>
            </InfoItem>
          </InfoGrid>
        </ReviewSection>

        {/* Section 3: Access & Authorization */}
        <ReviewSection>
          <SectionHeader>
            <ShieldCheck size={16} /> System Access
          </SectionHeader>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>Assigned Role</InfoLabel>
              <InfoValue>
                {data.roleName || data.role || "N/A"} (ID: {data.roleId || "N/A"})
              </InfoValue>
            </InfoItem>
            {data.isEdit ? (
              <InfoItem>
                <InfoLabel>User ID</InfoLabel>
                <InfoValue>{targetId || "N/A"}</InfoValue>
              </InfoItem>
            ) : (
              branchRaw && (
                <InfoItem>
                  <InfoLabel>Primary Branch ID</InfoLabel>
                  <InfoValue>{branchRaw}</InfoValue>
                </InfoItem>
              )
            )}
          </InfoGrid>

          {data.digitalSignature && (
            <div style={{ marginTop: "16px", borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
              <InfoLabel>
                <FileText size={12} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
                Doctor Digital Signature
              </InfoLabel>
              <SignatureThumbnail>
                <img src={data.digitalSignature} alt="Digital Signature" />
              </SignatureThumbnail>
            </div>
          )}
        </ReviewSection>
      </ReviewGrid>

      <ButtonGroup>
        {onBack && (
          <Button variant="outline" onClick={onBack} type="button" style={{ flex: "1" }}>
            <ArrowLeft size={16} /> Previous
          </Button>
        )}
        <Button onClick={handleConfirm} disabled={loading} style={{ flex: "2" }} type="button">
          {loading ? (data.isEdit ? "Updating User..." : "Creating User...") : <><Check size={18} /> {data.isEdit ? "Confirm & Update User" : "Confirm & Create User"}</>}
        </Button>
      </ButtonGroup>

      {/* ✅ Success Modal */}
      {showModal && <SuccessModal message={response?.message || (data.isEdit ? "User updated successfully" : "User created successfully")} />}
    </Card>
  );
};

export default ReviewStep;
