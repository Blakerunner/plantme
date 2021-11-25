import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';

import './auth.css';
import Alert from 'react-bootstrap/Alert';

const Register = () => {
  const history = useHistory();
  const REACT_APP_SERVER_URL =
    process.env.REACT_APP_SERVER_URL || 'https://plantme.blakerunner.com';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [onSuccess, setSuccess] = useState(null);
  const [message, setMessage] = useState('');

  const checkValidity = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      setMessage('Please provide a valid email address');
      setSuccess(false);
      return false;
    }
    if (password.length < 6) {
      setMessage('Password should be at least 6 characters long');
      setSuccess(false);
      return false;
    }
    if (
      email.replace(' ', '') === '' ||
      email === undefined ||
      email === null
    ) {
      setMessage('Please enter email address');
      setSuccess(false);
      return false;
    }
    if (
      password.replace(' ', '') === '' ||
      password === undefined ||
      password === null
    ) {
      setMessage('Please enter password');
      setSuccess(false);
      return false;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      setSuccess(false);
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!checkValidity()) return;

    const data = { email, password };

    try {
      await axios.post(`http://localhost:8080/api/v1/auth/register`, data);
      setSuccess(true);
      redirectToLogin();
    } catch (error) {
      setMessage(error.response.data);
      setSuccess(false);
      removeInputs();
    }
  };

  const registerForm = (
    <form onSubmit={onSubmit}>
      <div className='input-box'>
        <input
          type='text'
          className='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <label htmlFor='email'>Email</label>
      </div>
      <div className='input-box'>
        <input
          type='password'
          className='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
      </div>
      <div className='input-box'>
        <input
          type='password'
          className='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <label htmlFor='password'>Confirm Password</label>
      </div>
      <input type='submit' value='Create Account' />
    </form>
  );

  const successMessage = (
    <Alert variant='success'>Successfully Registered!</Alert>
  );

  const failMessage = <Alert variant='danger'>{message}</Alert>;

  const redirectToLogin = () => {
    setTimeout(() => {
      history.push('/login');
    }, 1300);
  };

  const removeInputs = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');

    setTimeout(() => {
      setSuccess(null);
    }, 2000);
  };

  if (localStorage.getItem('plantme_token')) {
    return <Redirect to='/' />;
  } else {
    return (
      <div>
        {onSuccess === null
          ? null
          : onSuccess === false
          ? failMessage
          : successMessage}
        {registerForm}
      </div>
    );
  }
};

export default Register;
