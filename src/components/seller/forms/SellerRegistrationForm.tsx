/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../reduxKit/store';
import { useDispatch, useSelector } from 'react-redux';
import { SellerRegistrationAction } from '../../../reduxKit/actions/seller/seller';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const SellerRegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.seller);

  // Custom validation function
  const validate = (values: any) => {
    const errors: any = {};

    if (!values.address) {
      errors.address = 'Address is required';
    }

    if (!values.city) {
      errors.city = 'City is required';
    }

    if (!values.state) {
      errors.state = 'State is required';
    }

    if (!values.zip) {
      errors.zip = 'Pin code is required';
    } else if (!/^\d{6}$/.test(values.zip)) {
      errors.zip = 'Pin code must be exactly 6 digits';
    }

    if (!values.dob) {
      errors.dob = 'Date of Birth is required';
    } else {
      const today = new Date();
      const birthDate = new Date(values.dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        errors.dob = 'You must be at least 18 years old';
      }
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      address: '',
      addressLine2: '',
      city: '',
      state: '',
      zip: '',
      dob: '',
    },
    validate,
    onSubmit: async (values) => {
      try {
        const response = await dispatch(SellerRegistrationAction(values)).unwrap();
        toast.success(response.message);
        navigate('/');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        Swal.fire({ 
          icon: 'error',
          title: 'Error!',
          text: errorMessage,
          timer: 3000,
          toast: true,
          showConfirmButton: false,
          timerProgressBar: true,
        });
      }
    },
  });

  return (
    <div className="min-h-screen user-background flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="affiliate-section w-full lg:w-3/5 md:w-4/5 sm:w-full p-6 md:p-8 lg:p-10 rounded-[24px] shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6" style={{ fontFamily: 'Unbounded' }}>
          Seller Registration Form
        </h2>
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Address</label>
            <input {...formik.getFieldProps('address')} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500" placeholder="Address 1"  />
            {formik.touched.address && formik.errors.address && <p className="text-red-500 text-sm">{formik.errors.address}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">City</label>
            <input type="text"  {...formik.getFieldProps('city')} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500" placeholder="City" />
            {formik.touched.city && formik.errors.city && <p className="text-red-500 text-sm">{formik.errors.city}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">State</label>
            <input type="text"{...formik.getFieldProps('state')} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500" placeholder="State" />
            {formik.touched.state && formik.errors.state && <p className="text-red-500 text-sm">{formik.errors.state}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Pin Code</label>
            <input type="text"  {...formik.getFieldProps('zip')} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500" placeholder="Zip Code" />
            {formik.touched.zip && formik.errors.zip && <p className="text-red-500 text-sm">{formik.errors.zip}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Date of Birth</label>
            <input type="date"  {...formik.getFieldProps('dob')} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500" />
            {formik.touched.dob && formik.errors.dob && <p className="text-red-500 text-sm">{formik.errors.dob}</p>}
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="w-full primary-background text-white py-3 px-6 rounded-md font-medium hover:bg-indigo-700 transition-all duration-200">
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerRegistrationForm;