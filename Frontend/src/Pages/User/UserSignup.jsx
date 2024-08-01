import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { userSignup } from '../../Features/User/authSlice';
import '../../Styles/UserSignup.css';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    try {
      await dispatch(userSignup(values)).unwrap();
      toast.success('User signed successfully');
      navigate('/login');
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="signup-form">
              <h2 className="signup-title">Sign Up</h2>
              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}
              <div className="mb-4">
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className={`signup-input ${
                    errors.name && touched.name ? 'border-red-500' : ''
                  }`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`signup-input ${
                    errors.email && touched.email ? 'border-red-500' : ''
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={`signup-input ${
                    errors.password && touched.password ? 'border-red-500' : ''
                  }`}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className={`signup-input ${
                    errors.confirmPassword && touched.confirmPassword
                      ? 'border-red-500'
                      : ''
                  }`}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                className="signup-button"
                disabled={isSubmitting || loading}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
              <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400 mt-3">
                Already have an account?{' '}
                <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign in
                </a>
              </p>
            </Form>
          )}
        </Formik>
        <div className="signup-image-container">
          <img
            src="https://i.pinimg.com/564x/dd/d0/52/ddd052d8715737ab01bc3d4806ef8d43.jpg"
            alt="Signup Illustration"
            className="signup-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
