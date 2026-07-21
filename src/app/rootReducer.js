import { combineReducers } from "redux";

import getCountryReducer from "../modules/Auth/reducers/getCountryReducer";
import registerReducer from "../modules/Auth/reducers/registerReducer";
import userExistReducer from "../modules/Auth/reducers/userExistReducer";
import validateReducer from "../modules/Auth/reducers/validateReducer";
import setPinReducer from "../modules/Auth/reducers/setPinReducer";
import validatePinReducer from "../modules/Auth/reducers/validatePinReducer";
import setAuthTypeReducer from "../modules/Auth/reducers/setAuthTypeReducer";
import getCompanyTypeReducer from "../modules/Auth/reducers/getCompanyTypeReducer";
import addCompanyDetailsReducer from "../modules/Auth/reducers/addCompanyDetailsReducer";
import getCertificationReducer from "../modules/Auth/reducers/getCertificationReducer";
import addCertificateReducer from "../modules/Auth/reducers/addCertificateReducer";
import getPlansReducer from "../modules/Auth/reducers/getPlansReducer";
import getAllCouponsReducer from "../modules/Auth/reducers/getAllCouponsReducer";
import applyCouponsReducer from "../modules/Auth/reducers/applyCouponsReducer";
import paymentDetailsReducer from "../modules/Auth/reducers/paymentDetailsReducer";
import paymentReducer from "../modules/Auth/reducers/paymentReducer";
import verifyPaymentReducer from "../modules/Auth/reducers/verifyPaymentReducer";
import logoutReducer from "../modules/Auth/reducers/logoutReducer";
import loginReducer from "../modules/Auth/reducers/loginReducer";
import getTransactionHistoryReducer from "../modules/Auth/reducers/getTransactionHistoryReducer";
import validateOtpTokenReducer from "../modules/Auth/reducers/validateOtpAndTokenReducer";
import posBillingReducer from "../modules/PosBilling/reducers/posBillingReducer";

const rootReducer = combineReducers({
  country: getCountryReducer,
  register: registerReducer,
  userExist: userExistReducer,
  validate: validateReducer,
  setPin: setPinReducer,
  validatePin: validatePinReducer,
  setAuthType: setAuthTypeReducer,
  companyType: getCompanyTypeReducer,
  companyDetails: addCompanyDetailsReducer,
  certifications: getCertificationReducer,
  addCertificate: addCertificateReducer,
  plans: getPlansReducer,
  coupons: getAllCouponsReducer,
  appliedCoupon: applyCouponsReducer,
  paymentDetails: paymentDetailsReducer,
  payment: paymentReducer,
  verifyPayment: verifyPaymentReducer,
  logout: logoutReducer,
  login: loginReducer,
  transactionHistory: getTransactionHistoryReducer,
  validateOtpToken: validateOtpTokenReducer,
  posBilling: posBillingReducer,

  app: (state = {}, action) => state,
});

export default rootReducer;
