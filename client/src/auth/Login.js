import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import '../login.css';
import { Redirect } from 'react-router-dom';
import TopNavLogin from '../components/nav-bars/topNavLogin';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCftxUegvj2S_ZP_N1gWC_I8x6oxXyjBvA',
  authDomain: 'plantme-8f314.firebaseapp.com',
  projectId: 'plantme-8f314',
  storageBucket: 'plantme-8f314.appspot.com',
  messagingSenderId: '945344755550',
  appId: '1:945344755550:web:8c631e56ce6901245f81cf',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFirstLogin, setFirstLogin] = useState({
    isFirstLogin: false,
    user: '',
    userAttr: '',
  });

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [noMatchMsg, setNoMatch] = useState(false);
  const [samePasswordMsg, setSamePassword] = useState(false);

  const [pwdLength, setPwdLength] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log('onSuccess: ', data);
        console.log(data.getAccessToken().payload);
        const accessToken = data.getAccessToken();
        localStorage.setItem('token', accessToken['jwtToken']);
        localStorage.setItem(
          'group',
          accessToken['payload']['cognito:groups'][0]
        );

        window.location.reload();
        window.location.reload(true);
      },
      onFailure: (err) => {
        console.error('onFailure: ', err);
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        setFirstLogin({
          isFirstLogin: true,
          user: user,
          userAttr: userAttributes,
        });
        delete userAttributes.email_verified;

        user.completeNewPasswordChallenge(newPassword, userAttributes, {
          onSuccess: (result) => {},
          newPasswordRequired: (userAttributes, requiredAttributes) => {
            delete userAttributes.email_verified;

            user.completeNewPasswordChallenge(
              newPassword,
              userAttributes,
              this.newPasswordRequired
            );
          },
          onFailure: (err) => {
            throw err;
          },
        });
      },
    });
  };

  const validatePassword = () => {
    if (newPassword !== confirmPassword) {
      setNoMatch(true);
    } else {
      setNoMatch(false);
    }
    if (newPassword === password) {
      setSamePassword(true);
    } else {
      setSamePassword(false);
    }
    if (newPassword.length < 8) {
      setPwdLength(true);
    } else {
      setPwdLength(false);
    }
  };

  const changePassword = (event) => {
    event.preventDefault();
    const cognitoUser = isFirstLogin['user'];
    const userAttr = isFirstLogin['userAttr'];
    console.log(cognitoUser);
    console.log(userAttr);

    cognitoUser.completeNewPasswordChallenge(
      newPassword,
      userAttr,
      {
        onSuccess: (data) => {
          console.log('onSuccess: ', data);
          console.log(data.getAccessToken().payload);
          const accessToken = data.getAccessToken();
          localStorage.setItem('token', accessToken['jwtToken']);
          localStorage.setItem(
            'group',
            accessToken['payload']['cognito:groups'][0]
          );

          window.location.reload();
          window.location.reload(true);
        },
        onFailure: (err) => {
          throw err;
        },
      },
      this
    );
  };

  if (localStorage.getItem('token')) {
    return <Redirect to='/' />;
  } else if (isFirstLogin['isFirstLogin']) {
    return (
      <div>
        <TopNavLogin />
        <form
          onSubmit={(event) =>
            noMatchMsg || samePasswordMsg || pwdLength
              ? event.preventDefault()
              : changePassword(event)
          }
        >
          <div className='input-box'>
            <input
              type='password'
              className='password'
              placeholder='Password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              autoFocus
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
          <input
            type='submit'
            value='Change Password'
            onClick={validatePassword}
          />
          <p
            style={{
              visibility: noMatchMsg ? 'visible' : 'hidden',
              color: 'red',
            }}
          >
            Passwords don't match! Please check again.
          </p>
          <p
            style={{
              visibility: samePasswordMsg ? 'visible' : 'hidden',
              color: 'red',
            }}
          >
            You can't use the same password!
          </p>
          <p
            style={{
              visibility: pwdLength ? 'visible' : 'hidden',
              color: 'red',
            }}
          >
            Passwords must be at least 8 characters long!
          </p>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <TopNavLogin />
        <form onSubmit={onSubmit}>
          <div className='input-box'>
            <input
              id='username'
              type='text'
              className='username'
              placeholder='Username'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <label htmlFor='email'>Username</label>
          </div>
          <div className='input-box'>
            <input
              id='password'
              type='password'
              className='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor='password'>Password</label>
          </div>
          <input type='submit' value='Login' />
        </form>
      </div>
    );
  }
};

export default Login;
