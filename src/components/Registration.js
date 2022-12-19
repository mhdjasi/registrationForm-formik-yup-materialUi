import React from "react";
import "./Registration.css";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import "yup-phone";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import {
  Button,
  Checkbox,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

function Registration() {
  const initialValues = {
    name: "",
    email: "",
    gender: "",
    phone: "",
    role: "",
    password: "",
    confirmpassword: "",
    checkbox: false,
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("required").min(3, "Its too short"),
    email: yup.string().email("Enter Vaild Email").required("required"),
    gender: yup
      .string()
      .oneOf(["male", "female"], "select any one")
      .required("required"),
    phone: yup.string().required("required").phone(),
    role: yup
      .string()
      .required("required")
      .oneOf(["frontendDeveloper", "backendDeveloper"], "choose role"),
    password: yup
      .string()
      .required("required")
      .min(8, "Password Length should be 8"),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password not matched")
      .required("required"),
    checkbox: yup.string().oneOf(["true"], "Accept terms and conditions"),
  });

  const onSubmit = (values) => {
    console.log(values);
    alert("form submitted successfully");
  };

  return (
    <div className="main">
      <h2>Registration Form</h2>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <Field
                as={TextField}
                name="name"
                fullWidth
                label="Full Name"
                helperText={
                  <ErrorMessage name="name">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                }
              />
              <Field
                as={TextField}
                name="email"
                fullWidth
                label="Email"
                helperText={
                  <ErrorMessage name="email">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                }
              />

              <FormControl component="fieldset" style={{ marginTop: "15px" }}>
                <FormLabel component="legend">Gender</FormLabel>
                <Field
                  as={RadioGroup}
                  style={{ display: "initial" }}
                  aria-label="gender"
                  name="gender"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </Field>
              </FormControl>
              <FormHelperText>
                <ErrorMessage name="gender">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </FormHelperText>

              <Field
                as={TextField}
                name="phone"
                fullWidth
                label="Phone Number"
                helperText={
                  <ErrorMessage name="phone">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                }
              />
              <br></br>

              <FormControl fullWidth style={{ marginTop: "10px" }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Role
                </InputLabel>
                <Field
                  as={Select}
                  name="role"
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                >
                  <MenuItem value={"frontendDeveloper"}>
                    Frontend Developer
                  </MenuItem>
                  <MenuItem value={"backendDeveloper"}>
                    Backend Developer
                  </MenuItem>
                </Field>
              </FormControl>
              <FormHelperText>
                <ErrorMessage name="role">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </FormHelperText>

              <Field
                as={TextField}
                name="password"
                fullWidth
                label="Password"
                type="password"
                helperText={
                  <ErrorMessage name="password">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                }
              />
              <Field
                as={TextField}
                name="confirmpassword"
                fullWidth
                label="Confirm Password"
                type="password"
                helperText={
                  <ErrorMessage name="confirmpassword">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                }
              />

              <FormControlLabel
                control={<Field as={Checkbox} name="checkbox" />}
                helperText={
                  <ErrorMessage name="checkbox">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                }
                label="I accept the terms and condition"
              />
              <FormHelperText>
                <ErrorMessage name="checkbox">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </FormHelperText>

              <br></br>
              <Button type="submit" variant="contained" color="primary">
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Registration;
