/* eslint-disable @typescript-eslint/no-explicit-any */
export const validateUserSignup = (values: any) => {
  const errors: any = {};

  if (!values.firstName) {
    errors.firstName = 'First name is required';
  }

  if (!values.lastName) {
    errors.lastName = 'Last name is required';
  }

  if (!values.country) {
    errors.country = 'Country is required';
  }

  if (!values.userName) {
    errors.userName = 'Username is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.gender) {
    errors.gender = 'Gender is required';
  } else if (!['MALE', 'FEMALE', 'OTHER'].includes(values.gender)) {
    errors.gender = 'Invalid gender';
  }

  if (!values.phone) {
    errors.phone = 'Phone number is required';
  }

  return errors;
};

export const formikValidationSchema = validateUserSignup;