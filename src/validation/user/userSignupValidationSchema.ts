import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

export const userSignupValidationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  country: z.string().min(1, 'Country is required'),
  userName: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER'], {
    errorMap: () => ({ message: 'Invalid gender' }),
  }),
  phone: z.string().min(1, 'Phone number is required'), // Add phone validation if needed
});

export const formikValidationSchema = toFormikValidationSchema(userSignupValidationSchema);