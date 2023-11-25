import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import './SignUpForm.css'; // Import the CSS file for styling
import axios from "axios"; // Import Axios
import {useUserContext} from "./context/useauthcontext";


const SignUpForm = () => {
  const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required(),
  });
  const { setUserlog,setUsername,setUseremail} = useUserContext();

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          // Make an API call to your backend using Axios
          const response = await axios.post("http://localhost:3010/users/signup", values);
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
      <Form className="signup-form">
        <div className="form-group">
          <Field name="name" type="text" placeholder="Name" />
          <ErrorMessage name="name" component="div" className="error" />
        </div>
        <div className="form-group">
          <Field name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" className="error" />
        </div>
        <div className="form-group">
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component="div" className="error" />
        </div>
        <div className="form-group">
          <Field name="confirmPassword" type="password" placeholder="Confirm Password" />
          <ErrorMessage name="confirmPassword" component="div" className="error" />
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </Form>
    </Formik>
  );
}

export default SignUpForm;
