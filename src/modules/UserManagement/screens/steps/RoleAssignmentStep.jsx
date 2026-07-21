import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoleRequest } from "../../actions/getRoleActions";
import styled from "styled-components";
import { LuShield as Shield, LuFlaskConical as FlaskConical, LuCalendarDays as CalendarDays, LuHeartPulse as HeartPulse, LuUserCheck as UserCheck, LuArrowLeft as ArrowLeft, LuArrowRight as ArrowRight, LuCheck as Check } from 'react-icons/lu';
import Button from "../../../../components/Button";
import Loader from "../../../../components/common/Loader";

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

const RoleGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 20px 0;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const RoleCard = styled.div`
  border: 1.5px solid ${(props) => (props.$active ? "var(--primary)" : "var(--border)")};
  background: ${(props) => (props.$active ? "#f0f7ff" : "white")};
  border-radius: 12px;
  padding: 20px;
  cursor: ${(props) => (props.$disabled || props.$isEdit ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.$disabled ? 0.6 : 1)};
  transition: all 0.2s ease-in-out;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: ${(props) => (props.$active ? "0 4px 12px rgba(26, 115, 232, 0.08)" : "0 1px 3px rgba(0,0,0,0.02)")};

  &:hover {
    border-color: ${(props) => (props.$disabled || props.$isEdit ? (props.$active ? "var(--primary)" : "var(--border)") : "var(--primary)")};
    background: ${(props) => (props.$disabled || props.$isEdit ? (props.$active ? "#f0f7ff" : "white") : "#f0f7ff")};
    transform: ${(props) => (props.$disabled || props.$isEdit ? "none" : "translateY(-2px)")};
  }
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${(props) => (props.$active ? "var(--primary)" : "#f1f5f9")};
  color: ${(props) => (props.$active ? "#ffffff" : "var(--text-secondary)")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
`;

const RoleTitle = styled.h4`
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => (props.$active ? "var(--primary)" : "var(--text-main)")};
  margin: 0;
`;

const RoleDescription = styled.p`
  font-size: 13px;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.4;
`;

const CheckIndicator = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 28px;
  border-top: 1px solid #f1f5f9;
  padding-top: 20px;
`;

const getRoleIcon = (roleName, active) => {
  const size = 20;
  const name = (roleName || "").toLowerCase();
  if (name.includes("admin")) {
    return <Shield size={size} />;
  }
  if (name.includes("lab") || name.includes("technician")) {
    return <FlaskConical size={size} />;
  }
  if (name.includes("collector")) {
    return <CalendarDays size={size} />;
  }
  if (name.includes("doctor")) {
    return <HeartPulse size={size} />;
  }
  return <UserCheck size={size} />;
};

const RoleAssignmentStep = ({ data, onChange, onNext, onBack }) => {
  const dispatch = useDispatch();
  const [errorText, setErrorText] = React.useState("");
  const { loading, data: roles, error } = useSelector((state) => state.roles);

  useEffect(() => {
    dispatch(getRoleRequest());
  }, [dispatch]);

  const handleNext = () => {
    if (!data.role) {
      setErrorText("Please select a role to proceed");
      return;
    }
    setErrorText("");
    onNext();
  };

  return (
    <Card>
      <FormSectionTitle>Select Role *</FormSectionTitle>

      {loading && <Loader text="Loading roles..." />}
      {error && <p style={{ color: "#e74c3c", fontSize: "14px" }}>{error}</p>}

      {roles && (
        <RoleGrid>
          {roles.map((role) => {
            const isActive = data.role === role.roleName;
            const isDisabled = data.isEdit && !isActive;
            return (
              <RoleCard
                key={role.id}
                $active={isActive}
                $disabled={isDisabled}
                $isEdit={data.isEdit}
                onClick={() => {
                  if (data.isEdit) return;
                  setErrorText("");
                  onChange({ role: role.roleName, roleId: role.id });
                }}
              >
                {isActive && (
                  <CheckIndicator>
                    <Check size={12} strokeWidth={3} />
                  </CheckIndicator>
                )}
                <IconWrapper $active={isActive}>
                  {getRoleIcon(role.roleName, isActive)}
                </IconWrapper>
                <div>
                  <RoleTitle $active={isActive}>{role.roleName}</RoleTitle>
                  <RoleDescription>{role.description}</RoleDescription>
                </div>
              </RoleCard>
            );
          })}
        </RoleGrid>
      )}

      {errorText && (
        <p style={{ color: "#e74c3c", fontSize: "12px", marginTop: "10px", fontWeight: "600" }}>
          {errorText}
        </p>
      )}

      <ButtonGroup>
        {onBack && (
          <Button variant="outline" onClick={onBack} type="button">
            <ArrowLeft size={16} /> Previous
          </Button>
        )}
        <Button onClick={handleNext} type="button">
          Next Step <ArrowRight size={16} />
        </Button>
      </ButtonGroup>
    </Card>
  );
};

export default RoleAssignmentStep;


