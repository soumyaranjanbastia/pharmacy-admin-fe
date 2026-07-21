import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

// Auth Module Screens
import LoginScreen from "../modules/Auth/screens/LoginScreen";
import RegistrationScreen from "../modules/Auth/screens/RegistrationScreen";
import OTPVerification from "../modules/Auth/screens/OTPVerification";
import OtpAndTokenScreen from "../modules/Auth/screens/OtpAndTokenScreen";
import PinSetup from "../modules/Auth/screens/PinSetup";
import ValidatePin from "../modules/Auth/screens/ValidatePin";
import LoginOption from "../modules/Auth/screens/LoginOption";
import CompanyDetails from "../modules/Auth/screens/CompanyDetails";
import CertificationScreen from "../modules/Auth/screens/CertificationScreen";
import SubscriptionScreen from "../modules/Auth/screens/SubscriptionScreen";
import PaymentDetailsScreen from "../modules/Auth/screens/PaymentDetailsScreen";
import PaymentSuccess from "../modules/Auth/screens/PaymentSuccess";

// PosBilling Module Screens
import PosBillingScreen from "../modules/PosBilling/screens/PosBillingScreen";
import AddPrescriptionScreen from "../modules/PosBilling/screens/AddPrescriptionScreen";

// Admin & App Components
import Layout from "../components/Layout/Layout";
import DashboardScreen from "../modules/Dashboard/screens/DashboardScreen";
import BranchDashboard from "../modules/BranchManagement/screens/BranchDashboard";
import UserManagementPortal from "../modules/UserManagement/screens/UserManagementPortal";
import CreateUserWizard from "../modules/UserManagement/screens/mainModule/CreateUserWizard";
import NotFoundScreen from "../components/NotFound/NotFoundScreen";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Public Routes */}
      <Route path="/" element={<LoginScreen />} />
      <Route path="/welcome" element={<LoginScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegistrationScreen />} />
      <Route path="/OtpAndToken" element={<OtpAndTokenScreen />} />
      <Route path="/OtpVerification" element={<OTPVerification />} />
      <Route path="/pin-setup" element={<PinSetup />} />
      <Route path="/validate-pin" element={<ValidatePin />} />
      <Route path="/login-option" element={<LoginOption />} />
      <Route path="/company-details" element={<CompanyDetails />} />
      <Route path="/certification" element={<CertificationScreen />} />
      <Route path="/choose-plan" element={<SubscriptionScreen />} />
      <Route path="/payment-details" element={<PaymentDetailsScreen />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />

      {/* Main App Routes with Sidebar & Header Layout */}
      <Route element={<Layout userRole="super_admin" />}>
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/pos" element={<PosBillingScreen />} />
        <Route path="/pos-billing" element={<PosBillingScreen />} />
        <Route path="/pos/prescription" element={<AddPrescriptionScreen />} />
        <Route path="/pos-billing/add-prescription" element={<AddPrescriptionScreen />} />
        <Route path="/branch-management" element={<BranchDashboard />} />
        <Route path="/users" element={<UserManagementPortal />} />
        <Route path="/create-user" element={<CreateUserWizard />} />
      </Route>

      {/* Admin Nested Routes */}
      <Route path="/admin" element={<Layout userRole="super_admin" />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardScreen />} />
        <Route path="pos" element={<PosBillingScreen />} />
        <Route path="pos-billing" element={<PosBillingScreen />} />
        <Route path="pos/prescription" element={<AddPrescriptionScreen />} />
        <Route path="pos-billing/add-prescription" element={<AddPrescriptionScreen />} />
        <Route path="branch-management" element={<BranchDashboard />} />
        <Route path="users" element={<UserManagementPortal />} />
        <Route path="create-user" element={<CreateUserWizard />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Route>

      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
};

export default AppRoutes;
