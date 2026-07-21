import {
  ADD_MEDICINE_TO_CART,
  REMOVE_MEDICINE_FROM_CART,
  UPDATE_CART_ITEM_QTY,
  UPDATE_PATIENT_DETAILS,
  APPLY_COUPON_CODE,
  SET_PRESCRIPTION_FILE,
  CLEAR_POS_BILLING_CART,
} from '../actions/posBillingActions';
import { mockInitialOrderDetails } from '../../../data/mockPosBilling';

const initialState = {
  orderDetails: { ...mockInitialOrderDetails },
  cartItems: [],
  patientInfo: {
    patientName: '',
    patientAge: '',
    doctorName: '',
    prescriptionDate: '',
    referredBy: '',
  },
  couponCode: 'AXER200',
  discountAmount: 0,
  prescriptionFile: null,
};

const posBillingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEDICINE_TO_CART: {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id || item.name === action.payload.name
      );
      if (existingIndex > -1) {
        const updatedItems = [...state.cartItems];
        updatedItems[existingIndex].qty += action.payload.qty || 1;
        return { ...state, cartItems: updatedItems };
      } else {
        const newItem = {
          ...action.payload,
          qty: action.payload.qty || 1,
        };
        return { ...state, cartItems: [...state.cartItems, newItem] };
      }
    }

    case REMOVE_MEDICINE_FROM_CART: {
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    }

    case UPDATE_CART_ITEM_QTY: {
      const { medicineId, delta } = action.payload;
      const updatedItems = state.cartItems
        .map((item) => {
          if (item.id === medicineId) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
      return { ...state, cartItems: updatedItems };
    }

    case UPDATE_PATIENT_DETAILS: {
      return {
        ...state,
        patientInfo: {
          ...state.patientInfo,
          [action.payload.field]: action.payload.value,
        },
      };
    }

    case APPLY_COUPON_CODE: {
      return {
        ...state,
        couponCode: action.payload,
      };
    }

    case SET_PRESCRIPTION_FILE: {
      return {
        ...state,
        prescriptionFile: action.payload,
      };
    }

    case CLEAR_POS_BILLING_CART: {
      return {
        ...state,
        cartItems: [],
        prescriptionFile: null,
      };
    }

    default:
      return state;
  }
};

export default posBillingReducer;
