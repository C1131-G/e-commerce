export const farmTypes = [
  "Crop farming",
  "Dairy farming",
  "Poultry farming",
  "Organic farming",
  "Mixed farming",
] as const;

export interface EnrollmentData {
  fullName: string;
  email: string;
  phone: string;
  farmName: string;
  farmSize: string;
  farmType: string;
  district: string;
  state: string;
  identityNumber: string;
  termsAccepted: boolean;
}

export type EnrollmentField = keyof EnrollmentData;
export type EnrollmentErrors = Partial<Record<EnrollmentField, string>>;

export const initialEnrollmentData: EnrollmentData = {
  district: "",
  email: "",
  farmName: "",
  farmSize: "",
  farmType: "",
  fullName: "",
  identityNumber: "",
  phone: "",
  state: "",
  termsAccepted: false,
};

const stepFields: EnrollmentField[][] = [
  ["fullName", "email", "phone"],
  ["farmName", "farmSize", "farmType", "district", "state"],
  ["identityNumber", "termsAccepted"],
  [],
];

export function validateEnrollmentStep(
  data: EnrollmentData,
  step: number
): EnrollmentErrors {
  const errors: EnrollmentErrors = {};

  if (step === 0) {
    if (data.fullName.trim().length < 3) {
      errors.fullName = "Enter your full name (at least 3 characters).";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errors.email = "Enter a valid email address.";
    }
    if (!/^\+?[0-9()\-\s]{10,18}$/.test(data.phone.trim())) {
      errors.phone = "Enter a valid phone number.";
    }
  }

  if (step === 1) {
    if (data.farmName.trim().length < 2) {
      errors.farmName = "Enter the name of your farm.";
    }
    if (!data.farmSize || Number(data.farmSize) <= 0) {
      errors.farmSize = "Farm size must be greater than zero.";
    }
    if (!data.farmType) {
      errors.farmType = "Select your primary farming activity.";
    }
    if (data.district.trim().length < 2) {
      errors.district = "Enter your district.";
    }
    if (data.state.trim().length < 2) {
      errors.state = "Enter your state.";
    }
  }

  if (step === 2) {
    if (!/^[A-Za-z0-9-]{6,20}$/.test(data.identityNumber.trim())) {
      errors.identityNumber = "Enter a valid ID number (6-20 characters).";
    }
    if (!data.termsAccepted) {
      errors.termsAccepted = "You must confirm the declaration to continue.";
    }
  }

  return errors;
}

export function getFieldsForStep(step: number) {
  return stepFields[step] ?? [];
}
