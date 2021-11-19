import axios from "axios";
import React, { useState, useEffect } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { firebaseConfig } from './firebase.config';
import "../login.css";
import { Redirect, useHistory } from "react-router-dom";

firebase.initializeApp(firebaseConfig);

const endpoint = "http://localhost:8080";

const Login = ({ isAuthenticated: isAuthenticated }) => {

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("plantme_token") || localStorage.getItem("plantme_token")) {
      history.push('/')
    }
  }, [])

  const checkValidity = () => {
    if (!email.includes("@")) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
    if (email.replace(' ', '') === '' || email === undefined) {
      setEmptyEmail(true);
    } else {
      setEmptyEmail(false);
    }
    if (password.replace(' ', '') === '' || password === undefined) {
      setEmptyPassword(true);
    } else {
      setEmptyPassword(false);
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!isEmailValid) {
      window.alert("please provide a valid email address");
    }
    if (emptyEmail) {
      window.alert("please enter email address");
    }

    if (emptyPassword) {
      window.alert("please enter password");
    }

    try {
      // Sign in with email and password
      await firebase.auth().signInWithEmailAndPassword(email, password).then((credential) => {
        const user = credential.user;
        if (!user) {
          window.alert("Account doesn't exist");
        }
        const token = user.getIdToken();

        token.then((result) => {
          if (staySignedIn) {
            localStorage.setItem('plantme_token', result);
          } else {
            sessionStorage.setItem('plantme_token', result);
          }

          // history.push("/");
          window.location.reload();

          // try {
          //   const { data } = axios.post(
          //     endpoint + "/api/v1/auth",
          //     {
          //       email: email,
          //       password: password,
          //     }
          //   );

          //   const { token, isAdmin } = data;
          //   if (localStorage.getItem("plantme_token")) {
          //     localStorage.removeItem("plantme_token");
          //   }

          //   if (localStorage.getItem("isAdmin")) {
          //     localStorage.removeItem("isAdmin");
          //   }
          //   localStorage.setItem("plantme_token", token);
          //   localStorage.setItem("isAdmin", isAdmin);

          //   history.push("/");
          // } catch (error) {
          //   localStorage.removeItem("plantme_token");
          //   localStorage.removeItem("isAdmin");
          //   alert("Credential Invalid");
          // }

        })
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        {/* <TopNavLogin /> */}
        <form onSubmit={onSubmit}>
          <div className="input-box">
            <input
              id="username"
              type="text"
              className="username"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-box">
            <input
              id="password"
              type="password"
              className="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>
          <input
            type="submit"
            value="Login"
            onClick={checkValidity}
          />
        </form>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <input type="checkbox" checked={staySignedIn} onChange={e => setStaySignedIn(e.target.checked)} /> Stay signed in
        </div>
        <div style={{ textAlign: 'center' }}>
          <a href='/register'>Create new account</a></div>
      </div>
    );
  }
};

export default Login;
