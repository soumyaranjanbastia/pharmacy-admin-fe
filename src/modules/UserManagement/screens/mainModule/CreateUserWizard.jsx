// CreateUserWizard.jsx
import React, { useState } from "react";
import styled from "styled-components";
import BackButton from "../../../../components/BackButton";
import PageHeader from "../PageHeader";
import ProgressDots from "../../../../components/ProgressDots";
import PersonalInfoStep from "../steps/PersonalInfoStep";
import RoleAssignmentStep from "../steps/RoleAssignmentStep";
import AdminDetailsStep from "../steps/AdminDetailsStep";
import TechnicianDetailsStep from "../steps/TechnicianDetailsStep";
import CollectorDetailsStep from "../steps/CollectorDetailsStep";
import ReviewStep from "../steps/ReviewStep";
import { useNavigate, useLocation } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 480px) {
    padding: 16px 12px;
  }
`;

import { useToast } from "../../../../components/Toast/ToastContext";

const CreateUserWizard = () => {
  const [step, setStep] = useState(1);
  const location = useLocation();
  const editUser = location.state?.user;
  
  const [formData, setFormData] = useState(() => {
    if (editUser) {
      let firstname = editUser.firstName;
      let lastname = editUser.lastName;
      if (!firstname && editUser.fullName) {
        const parts = editUser.fullName.split(" ");
        firstname = parts[0];
        lastname = parts.slice(1).join(" ");
      }

      let dobFormatted = editUser.dob || "";
      if (dobFormatted && dobFormatted.includes("/")) {
        const parts = dobFormatted.split("/");
        if (parts.length === 3) {
          dobFormatted = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
      }

      return {
        ...editUser,
        firstname: firstname || "",
        lastname: lastname || "",
        username: editUser.userName || editUser.username || "",
        phone: editUser.phoneNumber,
        phoneNumber: editUser.phoneNumber,
        dob: dobFormatted,
        role: editUser.roleName || "",
        roleId: editUser.roleId,
        branchId: editUser.branchId || editUser.parentCompanyId || "",
        digitalSignature: editUser.digitalSignature || "",
        isEdit: true
      };
    }
    return {};
  });
  
  const navigate = useNavigate();
  const toast = useToast();

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const updateForm = (newValues) => {
    setFormData((prev) => ({ ...prev, ...newValues }));
  };

  const handleFinalSubmit = (payload) => {
    // payload is already shaped for API (only roleId & branchId)
    console.log("✅ Final API Payload:", payload);
    // you can dispatch createUser action here or call API
    toast.success("Success", editUser ? "User Updated Successfully" : "User Created Successfully");
    // navigate to listing after success:
    navigate("/admin/users");
  };

  // const roleName = (formData.roleName || formData.role || "").toString();

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PersonalInfoStep
            data={formData}
            onNext={(values) => { updateForm(values); nextStep(); }}
          />
        );
      case 2:
        return (
          <RoleAssignmentStep
            data={formData}
            onNext={nextStep}
            onBack={prevStep}
            onChange={updateForm}
          />
        );
      case 3:
        // Robust matching: handles "Sample Collector", "Sample collector", etc.
        // if (/admin/i.test(roleName)) {
        //   return (
        //     <AdminDetailsStep
        //       data={formData}
        //       onNext={(values) => { updateForm(values); nextStep(); }}
        //       onBack={prevStep}
        //     />
        //   );
        // }
        // if (/lab/i.test(roleName) || /technician/i.test(roleName)) {
        //   return (
        //     <TechnicianDetailsStep
        //       data={formData}
        //       onNext={(values) => { updateForm(values); nextStep(); }}
        //       onBack={prevStep}
        //     />
        //   );
        // }
        // if (/collector/i.test(roleName)) {
        //   return (
        //     <CollectorDetailsStep
        //       data={formData}
        //       onNext={(values) => { updateForm(values); nextStep(); }}
        //       onBack={prevStep}
        //     />
        //   );
        // }
        // // If role not recognized yet, don't render a details step
        // return (
        //   <div>
        //     <p>Please select a role in the previous step to continue.</p>
        //     <div style={{ display: "flex", gap: 10 }}>
        //       <button onClick={prevStep} style={{ padding: 8 }}>← Back</button>
        //     </div>
        //   </div>
        // );

        // 🔥 Always show AdminDetailsStep regardless of role
        return (
          <AdminDetailsStep
            data={formData}
            onNext={(values) => { updateForm(values); nextStep(); }}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <ReviewStep
            data={formData}
            onBack={prevStep}
            onSubmit={(payload) => handleFinalSubmit(payload)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <BackButton text="Back" />
      <PageHeader
        title={editUser ? "Edit User" : "Create New User"}
        subtitle={editUser ? "Update user details and permissions" : "Add a new user to your pathology lab system"}
      />
      <ProgressDots 
        currentStep={step} 
        totalSteps={4} 
        labels={["Personal Details", "Assign Role", "Branch & Signature", "Review Summary"]} 
      />
      {renderStep()}
    </Container>
  );
};

export default CreateUserWizard;
