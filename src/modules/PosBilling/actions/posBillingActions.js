// Action Types
export const ADD_MEDICINE_TO_CART = 'posBilling/ADD_MEDICINE_TO_CART';
export const REMOVE_MEDICINE_FROM_CART = 'posBilling/REMOVE_MEDICINE_FROM_CART';
export const UPDATE_CART_ITEM_QTY = 'posBilling/UPDATE_CART_ITEM_QTY';
export const UPDATE_PATIENT_DETAILS = 'posBilling/UPDATE_PATIENT_DETAILS';
export const APPLY_COUPON_CODE = 'posBilling/APPLY_COUPON_CODE';
export const SET_PRESCRIPTION_FILE = 'posBilling/SET_PRESCRIPTION_FILE';
export const CLEAR_POS_BILLING_CART = 'posBilling/CLEAR_POS_BILLING_CART';

// Action Creators
export const addMedicineToCart = (medicine) => ({
  type: ADD_MEDICINE_TO_CART,
  payload: medicine,
});

export const removeMedicineFromCart = (medicineId) => ({
  type: REMOVE_MEDICINE_FROM_CART,
  payload: medicineId,
});

export const updateCartItemQty = (medicineId, delta) => ({
  type: UPDATE_CART_ITEM_QTY,
  payload: { medicineId, delta },
});

export const updatePatientDetails = (field, value) => ({
  type: UPDATE_PATIENT_DETAILS,
  payload: { field, value },
});

export const applyCouponCode = (couponCode) => ({
  type: APPLY_COUPON_CODE,
  payload: couponCode,
});

export const setPrescriptionFile = (fileInfo) => ({
  type: SET_PRESCRIPTION_FILE,
  payload: fileInfo,
});

export const clearPosBillingCart = () => ({
  type: CLEAR_POS_BILLING_CART,
});
