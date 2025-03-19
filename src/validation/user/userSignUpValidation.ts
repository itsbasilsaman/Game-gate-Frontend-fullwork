// validation.ts

export const validateFirstName = (firstName: string): string | null => {
  if (!firstName) return "First Name is required";
  if (firstName.length < 2) return "First Name must be at least 2 characters";
  return null;
};

export const validateLastName = (lastName: string): string | null => {
  if (!lastName) return "Last Name is required";
  if (lastName.length < 2) return "Last Name must be at least 2 characters";
  return null;
};

export const validateUsername = (userName: string): string | null => {
  if (!userName) return "Username is required";
  if (userName.length < 3) return "Username must be at least 3 characters";
  return null;
};

export const validateEmail = (email: string): string | null => {
  if (!email) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Invalid email address";
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone) return "Phone number is required";
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) return "Invalid phone number";
  return null;
};

export const validateCountry = (country: string): string | null => {
  if (!country) return "Country is required";
  return null;
};

export const validateGender = (gender: string): string | null => {
  if (!gender) return "Gender is required";
  return null;
};