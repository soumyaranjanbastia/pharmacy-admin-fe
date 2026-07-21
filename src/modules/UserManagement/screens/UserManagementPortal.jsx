import React, { useEffect, useState } from "react";
import PageHeader from "./PageHeader";
import TabSwitcher from "../../../components/TabSwitcher";
import BackButton from "../../../components/BackButton";
import UserTable from "./UserTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserListRequest } from "../actions/getUserListActions";
import { clearDeleteUser } from "../actions/deleteUserActions";
import styled from "styled-components";
import Loader from "../../../components/common/Loader";

const PortalContainer = styled.div`
  padding: 24px;
  background: #fdfdfd;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

const ContentWrapper = styled.div`
  margin-top: 24px;
`;

const UserManagementPortal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Admin");

  const { loading, data, error } = useSelector((state) => state.userList);
  const deleteUserState = useSelector((state) => state.deleteUser);

  useEffect(() => {
    dispatch(getUserListRequest());
  }, [dispatch]);

  // 🔹 Auto refresh list after delete success
  useEffect(() => {
    if (deleteUserState?.data?.success) {
      dispatch(getUserListRequest());
      dispatch(clearDeleteUser());
    }
  }, [deleteUserState, dispatch]);

  const tabs = ["Admin", "Lab Technician", "Sample Collector", "Doctor"];

  const usersData = {
    Admin: data?.Admin || [],
    "Lab Technician": data?.["Lab Technician"] || [],
    "Sample Collector": data?.["Sample Collector"] || [],
    Doctor: data?.Doctor || [],
  };

  const getTabColor = (tab) => {
    switch (tab) {
      case "Admin": return "#0052FF";
      case "Lab Technician": return "#7F56D9";
      case "Sample Collector": return "#F79009";
      case "Doctor": return "#10B981";
      default: return "#0052FF";
    }
  };

  return (
    <PortalContainer>
      <div style={{ marginTop: 24, marginBottom: 32 }}>
        <PageHeader
          title="Staff Management Portal"
          subtitle="Manage users and access permissions for your pathology lab"
          onCreate={() => navigate("/admin/create-user")}
        />
      </div>

      <TabSwitcher
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {loading && (
        <Loader text="Loading staff data..." />
      )}

      {error && (
        <div style={{ padding: '16px', background: '#FFF1F0', border: '1px solid #FFA39E', borderRadius: '8px', color: '#CF1322', marginBottom: 24 }}>
          {error}
        </div>
      )}

      {!loading && !error && (
        <ContentWrapper>
          <UserTable
            title={`${activeTab} Users`}
            color={getTabColor(activeTab)}
            users={usersData[activeTab]}
          />
        </ContentWrapper>
      )}
    </PortalContainer>
  );
};

export default UserManagementPortal;
