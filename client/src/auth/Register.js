import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";

import "./auth.css";
import Alert from "react-bootstrap/Alert";

const Register = () => {
  const history = useHistory();
  const REACT_APP_SERVER_URL =
    process.env.REACT_APP_SERVER_URL || "https://plantme.blakerunner.com";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [onSuccess, setSuccess] = useState(null);

  const checkValidity = () => {
    if (!email.includes("@")) {
      window.alert("Please provide a valid email address");
      return false;
    }
    if (password.length < 6) {
      window.alert("Password should be at least 6 characters long");
      return false;
    }
    if (
      email.replace(" ", "") === "" ||
      email === undefined ||
      email === null
    ) {
      window.alert("Please enter email address");
      return false;
    }
    if (
      password.replace(" ", "") === "" ||
      password === undefined ||
      password === null
    ) {
      window.alert("Please enter password");
      return false;
    }
    if (password !== confirmPassword) {
      window.alert("Passwords don't match");
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!checkValidity()) return;

    const data = { email, password };

    try {
      await axios.post(`${REACT_APP_SERVER_URL}/api/v1/auth/register`, data);
      redirectToLogin();
    } catch (error) {
      setSuccess(false);
      removeInputs();
    }
  };

  const registerForm = (
    <form onSubmit={onSubmit}>
      <div className="input-box">
        <input
          type="text"
          className="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <label htmlFor="email">Email</label>
      </div>
      <div className="input-box">
        <input
          type="password"
          className="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password">Password</label>
      </div>
      <div className="input-box">
        <input
          type="password"
          className="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <label htmlFor="password">Confirm Password</label>
      </div>
      <input type="submit" value="Create Account" />
    </form>
  );

  const failMessage = <Alert variant="danger">Something went wrong!</Alert>;

  const redirectToLogin = () => {
    history.push("/login");
  };

  const removeInputs = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      setSuccess(null);
    }, 2000);
  };

  if (localStorage.getItem("plantme_token")) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        {onSuccess === false ? failMessage : null}
        {registerForm}
      </div>
    );
  }
};

export default Register;
