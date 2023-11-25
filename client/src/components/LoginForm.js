import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./loginform.css";
import {useUserContext} from "./context/useauthcontext";
import axios from 'axios';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

function LoginForm() {

  const { setUserlog,setUsername,setUseremail} = useUserContext();
  return (
    <div className="login-form-container">
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // Make an API call to your backend using Axios
            const response = await axios.post("http://localhost:3010/users/user/login", values);
            // Store the 'token' from the backend response in session storage
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('Usertoken', response.data.User.Email);
            setUserlog(true);
            setUsername(response.data.User.Username);
            setUseremail(response.data.User.Email)
            // Handle the response from the backend as needed
            console.log("Backend Response:", response.data);
  
            // Reset form after successful submission
            setSubmitting(false);
          } catch (error) {
            // Handle errors here
            console.error("Error:", error);
            setSubmitting(false);
          }
        }}
      >
        <Form className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage name="username" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <button type="submit" className="submit-button">Login</button>
        </Form>
      </Formik>
    </div>
  );
}

export default LoginForm;
