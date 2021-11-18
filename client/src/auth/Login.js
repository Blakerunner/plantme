import React, { useState, useEffect } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { firebaseConfig } from './firebase.config';
import "../login.css";
import { Redirect } from "react-router-dom";
// import TopNavLogin from "../components/nav-bars/topNavLogin";

firebase.initializeApp(firebaseConfig);

const Login = ({ props, isLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      props.history.push('/');
    }
  });

  const checkValidity = () => {
    if (!email.includes("@")) {
      setIsEmailValid(false);
    }
    if (email.replace(' ', '') === '' || email === undefined) {
      setEmptyEmail(true);
    }
    if (password.replace(' ', '') === '' || password === undefined) {
      setEmptyPassword(true);
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

          window.location.reload();
        })
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (localStorage.getItem("plantme_token")) {
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
