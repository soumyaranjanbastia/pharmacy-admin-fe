import { all } from "redux-saga/effects";

import { watchGetCountry } from "../modules/Auth/sagas/getCountrySaga";
import { watchRegister } from "../modules/Auth/sagas/registerSaga";
import { watchUserExist } from "../modules/Auth/sagas/userExistSaga";
import { watchValidate } from "../modules/Auth/sagas/validateSaga";
import { watchSetPin } from "../modules/Auth/sagas/setPinSaga";
import { watchValidatePin } from "../modules/Auth/sagas/validatePinSaga";
import { watchSetAuthType } from "../modules/Auth/sagas/setAuthTypeSaga";
import { watchGetCompanyType } from "../modules/Auth/sagas/getCompanyTypeSaga";
import { watchAddCompanyDetails } from "../modules/Auth/sagas/addCompanyDetailsSaga";
import { watchGetCertification } from "../modules/Auth/sagas/getCertificationSaga";
import { watchAddCertificate } from "../modules/Auth/sagas/addCertificateSaga";
import { watchGetPlans } from "../modules/Auth/sagas/getPlansSaga";
import { watchGetAllCoupons } from "../modules/Auth/sagas/getAllCouponsSaga";
import { watchApplyCoupons } from "../modules/Auth/sagas/applyCouponsSaga";
import { watchPaymentDetails } from "../modules/Auth/sagas/paymentDetailsSaga";
import { watchPayment } from "../modules/Auth/sagas/paymentSaga";
import { watchVerifyPayment } from "../modules/Auth/sagas/verifyPaymentSaga";
import { watchLogout } from "../modules/Auth/sagas/logoutSaga";
import { watchLogin } from "../modules/Auth/sagas/loginSaga";
import { watchGetTransactionHistory } from "../modules/Auth/sagas/getTransactionHistorySaga";
import { watchValidateOtpToken } from "../modules/Auth/sagas/validateOtpAndTokenSaga";

// POS Billing Sagas (Exactly 3 Sagas)
import { watchSearchMedicines } from "../modules/PosBilling/sagas/searchMedicinesSaga";
import { watchPrescriptionOcr } from "../modules/PosBilling/sagas/prescriptionOcrSaga";
import { watchCreatePosSale } from "../modules/PosBilling/sagas/createPosSaleSaga";

// Branch Management Sagas
import { watchGetBranches } from "../modules/BranchManagement/sagas/getBranchesSaga";
import { watchCreateBranch } from "../modules/BranchManagement/sagas/createBranchSaga";
import { watchDeleteBranch } from "../modules/BranchManagement/sagas/deleteBranchSaga";
import { watchGetDistricts } from "../modules/BranchManagement/sagas/getDistrictsSaga";

// User Management Sagas
import { watchCreateUser } from "../modules/UserManagement/sagas/createUserSaga";
import { watchDeleteUser } from "../modules/UserManagement/sagas/deleteUserSaga";
import { watchGetRole } from "../modules/UserManagement/sagas/getRoleSaga";
import { watchGetUserList } from "../modules/UserManagement/sagas/getUserListSaga";

export default function* rootSaga() {
  yield all([
    watchGetCountry(),
    watchRegister(),
    watchUserExist(),
    watchValidate(),
    watchSetPin(),
    watchValidatePin(),
    watchSetAuthType(),
    watchGetCompanyType(),
    watchAddCompanyDetails(),
    watchGetCertification(),
    watchAddCertificate(),
    watchGetPlans(),
    watchGetAllCoupons(),
    watchApplyCoupons(),
    watchPaymentDetails(),
    watchPayment(),
    watchVerifyPayment(),
    watchLogout(),
    watchLogin(),
    watchGetTransactionHistory(),
    watchValidateOtpToken(),

    // POS Billing (Exactly 3 Sagas)
    watchSearchMedicines(),
    watchPrescriptionOcr(),
    watchCreatePosSale(),

    // Branch Management
    watchGetBranches(),
    watchCreateBranch(),
    watchDeleteBranch(),
    watchGetDistricts(),

    // User Management
    watchCreateUser(),
    watchDeleteUser(),
    watchGetRole(),
    watchGetUserList(),
  ]);
}
