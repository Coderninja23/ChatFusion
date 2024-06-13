import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../Assets/SiteIcon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Assets/Login.css';
import { registerRoute } from "../Utils/APIRoutes";

const Register = () =>{
  
  const navigate=useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
});

useEffect(() => {
  if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
    navigate("/");
  }
}, [navigate]);

const handleChange = (event) => {
  setInputValues({ ...inputValues, [event.target.name]: event.target.value });
};

const handleValidation = () => {
  const { password, confirmPassword, username, email } = inputValues;
  if (password !== confirmPassword) {
    toast.error(
      "Password and confirm password should be same.",
      toastOptions
    );
    return false;
  } else if (username.length < 5) {
    toast.error(
      "Username should be greater than 5 characters.",
      toastOptions
    );
    return false;
  } else if (password.length < 8) {
    toast.error(
      "Password should be equal or greater than 8 characters.",
      toastOptions
    );
    return false;
  } else if (email === "") {
    toast.error("Email is required.", toastOptions);
    return false;
  }
  return true;
};

const handleSubmit = async (event) => {
  event.preventDefault();
  if (handleValidation()) {
    const { email, username, password } = inputValues;
    const { data } = await axios.post(registerRoute, {
      username,
      email,
      password,
    });
    console.log(data)

    if (data?.status!==undefined && data?.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data?.status === true) {
      localStorage.setItem(
        process.env.REACT_APP_LOCALHOST_KEY,
        JSON.stringify(data.user)
      );
      navigate("/");
    }
    console.log("Account created Succesfully!");
  }
};

    return  (
        <>
        <div className="formContainer">
          <form className="loginForm" action=""  onSubmit={event => handleSubmit(event)}>
            <div className="brand">
              <img src={Logo} alt="logo" />
              <h1>ChatFusion</h1>
            </div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(event) => handleChange(event)}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(event) => handleChange(event)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(event) => handleChange(event)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(event) => handleChange(event)}
            />
            <button type="submit">Create User</button>
            <span>
              Already have an account ? <Link to="/login">Login.</Link>
            </span>
          </form>
        </div>
        <ToastContainer />
      </>
    );
};

export default Register;