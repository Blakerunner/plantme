import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "./auth.css";
import Alert from "react-bootstrap/Alert";

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    if (
      localStorage.getItem("plantme_token") ||
      sessionStorage.getItem("plantme_token")
    ) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, []);

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

    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!checkValidity()) return;

    const data = { email, password };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/login`,
        data
      );
      const token = response.data.token;

      if (staySignedIn) {
        localStorage.setItem("plantme_token", token);
      } else {
        sessionStorage.setItem("plantme_token", token);
      }
      window.location.reload();
    } catch (error) {
      console.log(error.response.data);
      setLoginError(error.response.data);
      setTimeout(() => {
        setLoginError(null);
      }, 3000);
    }
  };

  return (
    <div>
      {loginError ? <Alert variant="danger">{loginError}</Alert> : null}
      {/* <TopNavLogin /> */}
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
        <input type="submit" value="Login" />
      </form>
      <div className="stay-sign-in">
        <input
          type="checkbox"
          checked={staySignedIn}
          onChange={(e) => setStaySignedIn(e.target.checked)}
        />{" "}
        Stay signed in
      </div>
      <div style={{ textAlign: "center" }}>
        <a href="/register">Create new account</a>
      </div>
    </div>
  );
};

export default Login;
