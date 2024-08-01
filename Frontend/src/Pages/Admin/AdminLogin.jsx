import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../Features/Admin/adminSlice';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(adminLogin(values)).unwrap();
      toast.success('Login Success');
      navigate('/admin/dashboard');
    } catch (err) {
      const errorMessage = err.message || 'Login error';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="signup-form">
              <h2 className="signup-title">Login</h2>
              {error && (
                <div className="text-red-500 text-sm mb-4">
                  {typeof error === 'string' ? error : error.message}
                </div>
              )}
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
              <button
                type="submit"
                className="signup-button"
                disabled={isSubmitting || loading}
              >
                {loading ? 'Logging In...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
        <div className="signup-image-container">
          <img
            src="https://i.pinimg.com/564x/dd/d0/52/ddd052d8715737ab01bc3d4806ef8d43.jpg"
            alt="Login Illustration"
            className="signup-image"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
