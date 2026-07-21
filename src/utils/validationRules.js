// src/utils/validationRules.js
import * as Yup from "yup";

/**
 * Generic name validator.
 */
export const getNameValidation = (fieldName = "Name", required = true, min = 3, max = 50) => {
  let schema = Yup.string()
    .matches(/^[a-zA-Z\s]+$/, `${fieldName} must contain only letters and spaces`)
    .min(min, `${fieldName} must be at least ${min} characters`)
    .max(max, `${fieldName} cannot exceed ${max} characters`);
  
  if (required) {
    schema = schema.required(`${fieldName} is required`);
  }
  return schema;
};

/**
 * Validates full name.
 * Default length limits: min 3, max 50.
 * Enforces letters and spaces only.
 */
export const getFullNameValidation = (required = true, min = 3, max = 50) => {
  return getNameValidation("Full Name", required, min, max);
};

/**
 * Validates profile name.
 * Default length limits: min 3, max 30.
 * Enforces letters, numbers, and underscores only.
 */
export const getProfileNameValidation = (required = true, min = 3, max = 30) => {
  let schema = Yup.string()
    .matches(/^[a-zA-Z0-9_]+$/, "Profile Name can only contain letters, numbers, and underscores")
    .min(min, `Profile Name must be at least ${min} characters`)
    .max(max, `Profile Name cannot exceed ${max} characters`);
  
  if (required) {
    schema = schema.required("Profile Name is required");
  }
  return schema;
};

/**
 * Validates date of birth to check if the age is 18+.
 */
export const getDobValidation = (
  required = true,
  requiredMessage = "DOB is required",
  ageMessage = "Age must be at least 18 years"
) => {
  let schema = Yup.mixed();
  
  if (required) {
    schema = schema.required(requiredMessage);
  } else {
    schema = schema.nullable().transform((value) => (value === "" ? null : value));
  }

  return schema.test("is-18", ageMessage, (value) => {
    if (!value) return !required;
    const date = new Date(value);
    if (isNaN(date.getTime())) return false;
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    const dayDiff = today.getDate() - date.getDate();
    
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age >= 18;
  });
};

/**
 * Validates email format and limits length to max (default 200).
 */
export const getEmailValidation = (required = true, max = 200) => {
  let schema = Yup.string()
    .email("Please enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    )
    .max(max, `Email cannot exceed ${max} characters`);

  if (required) {
    schema = schema.required("Email is required");
  } else {
    schema = schema.nullable().transform((value) => (value === "" ? null : value));
  }
  return schema;
};

/**
 * Validates phone number to contain only digits and be exactly 10 digits.
 */
export const getPhoneValidation = (required = true) => {
  let schema = Yup.string()
    .matches(/^\d+$/, "Phone number must contain digits only")
    .length(10, "Phone number must be exactly 10 digits");

  if (required) {
    schema = schema.required("Phone number is required");
  } else {
    schema = schema.nullable().transform((value) => (value === "" ? null : value));
  }
  return schema;
};

/**
 * Validates username (alphanumeric, min 3, max 30 characters).
 */
export const getUsernameValidation = (required = false, min = 3, max = 30) => {
  let schema = Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Username must contain only letters and numbers")
    .min(min, `Username must be at least ${min} characters`)
    .max(max, `Username cannot exceed ${max} characters`);

  if (required) {
    schema = schema.required("Username is required");
  } else {
    schema = schema.nullable().transform((value) => (value === "" ? null : value));
  }
  return schema;
};

/**
 * Validates company/pharmacy/branch name.
 */
export const getCompanyNameValidation = (fieldName = "Company Name", required = true, min = 3, max = 100) => {
  let schema = Yup.string()
    .min(min, `${fieldName} must be at least ${min} characters`)
    .max(max, `${fieldName} cannot exceed ${max} characters`);

  if (required) {
    schema = schema.required(`${fieldName} is required`);
  } else {
    schema = schema.nullable().transform((value) => (value === "" ? null : value));
  }
  return schema;
};

/**
 * Validates company registration number.
 */
export const getRegistrationNumberValidation = (required = true, max = 50) => {
  let schema = Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Registration Number can only contain letters and numbers")
    .max(max, `Registration Number cannot exceed ${max} characters`);

  if (required) {
    schema = schema.required("Registration Number is required");
  } else {
    schema = schema.nullable().transform((value) => (value === "" ? null : value));
  }
  return schema;
};

/**
 * Validates description.
 */
export const getDescriptionValidation = (required = true, min = 50, max = 500) => {
  let schema = Yup.string()
    .min(min, `Description must be at least ${min} characters long`)
    .max(max, `Description cannot exceed ${max} characters`);

  if (required) {
    schema = schema.required("Description is required");
  } else {
    schema = schema.nullable().transform((value) => (value === "" ? null : value));
  }
  return schema;
};
