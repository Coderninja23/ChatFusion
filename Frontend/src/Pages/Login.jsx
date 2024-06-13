import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Assets/SiteIcon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Assets/Login.css";
import axios from "axios";
import { loginRoute } from "../Utils/APIRoutes";
import Form from "react-bootstrap/Form";

export default function Login() {
  const navigate = useNavigate();

  const [enteredLoginDetail, setEnteredLoginDetails] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_HOST_KEY)) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setEnteredLoginDetails({
      ...enteredLoginDetail,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    const { username, password } = enteredLoginDetail;
    if (username.trim().length < 5) {
      toast.error("Email should be atleast 5 characters long", toastOptions);
      return false;
    } else if (password.trim().length === 0) {
      toast.error("Password is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = enteredLoginDetail;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_HOST_KEY,
          JSON.stringify(data.user)
        );
        localStorage.setItem("Hello", "123");
        console.log(process.env.REACT_APP_HOST_KEY);
        console.log("Successfully Logged in");
        navigate("/");
      }
    }
  };
  return (
    <>
      <div className="formContainer">
        <form className="loginForm" action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>ChatFusion</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(event) => handleChange(event)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(event) => handleChange(event)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
