import React, { useState } from "react";
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
  Snackbar,
  SnackbarContent,
  TextField,
} from "@material-ui/core";
import axios from "axios";

function Registration() {
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(false);

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

  const onSubmit = async (values) => {
    const name = values.name;
    const email = values.email;
    const gender = values.gender;
    const phone = values.phone;
    const role = values.role;
    const password = values.password;
    const confirmpassword = values.confirmpassword;
    const checkbox = values.checkbox;

    await axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        email,
        name,
        gender,
        phone,
        role,
        password,
        confirmpassword,
        checkbox,
      })
      .then((response) => {
        console.log(response.data);
        // alert("success")
        setOpen(true);
        setTimeout(function () {
          setOpen(false);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setErr(true);
        setTimeout(function () {
          setErr(false);
        }, 2000);
      });

    //json api = "https://jsonplaceholder.typicode.com/posts"
    // fetch('https://779uecudth.execute-api.ap-south-1.amazonaws.com/register', {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   },
    //   body: JSON.stringify(name,email,gender,phone,role,password,confirmpassword,checkbox),
    // }).then(res =>{
    //   console.log(res);
    // })
  };

  const message = () => {
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var gender = document.getElementById("gender");
    var phone = document.getElementById("phone");
    var role = document.getElementById("role");
    var password = document.getElementById("password");
    var confirmpassword = document.getElementById("confirmpassword");
    var checkbox = document.getElementById("checkbox");

    if (
      name.value === "" ||
      email.value === "" ||
      gender.value === "" ||
      phone.value === "" ||
      role.value === "" ||
      password.value === "" ||
      confirmpassword.value === "" ||
      checkbox.value === ""
    ) {
      setErr(true);
      setTimeout(function () {
        setErr(false);
      }, 2000);
    }
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
                id="name"
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
                id="email"
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
                  id="gender"
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
                id="phone"
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
                  id="demo-simple-select-helper role"
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
                id="password"
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
                id="confirmpassword"
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
                control={<Field as={Checkbox} name="checkbox" id="checkbox" />}
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
              <Button
                onClick={message}
                type="submit"
                variant="contained"
                color="primary"
              >
                Register
              </Button>

              <Snackbar
                anchorOrigin={{
                  horizontal: "center",
                  vertical: "top",
                }}
                open={open}
              >
                <SnackbarContent
                  message="Form Submitted successfully"
                  style={{ backgroundColor: "green" }}
                />
              </Snackbar>

              <Snackbar
                anchorOrigin={{
                  horizontal: "center",
                  vertical: "top",
                }}
                open={err}
              >
                <SnackbarContent
                  message="Form not Submitted"
                  style={{ backgroundColor: "red" }}
                />
              </Snackbar>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Registration;
