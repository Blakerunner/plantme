import React, { useState } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { firebaseConfig } from './firebase.config';
import "../login.css";
import { Redirect, useHistory } from "react-router-dom";
import Alert from 'react-bootstrap/Alert'

firebase.initializeApp(firebaseConfig);

const Register = () => {

    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [noMatchMsg, setNoMatch] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [minLenPwd, setMinLenPwd] = useState(true);
    const [emptyEmail, setEmptyEmail] = useState(false);
    const [emptyPassword, setEmptyPassword] = useState(false);
    console.log(email);
    console.log(password);

    const [onSuccess, setSuccess] = useState(false);

    const checkValidity = () => {
        if (!email.includes("@")) {
            setIsEmailValid(false);
        } else {
            setIsEmailValid(true);
        }
        if (password.length < 6) {
            setMinLenPwd(false);
        } else {
            setMinLenPwd(true);
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
        if (password !== confirmPassword) {
            setNoMatch(true);
        } else {
            setNoMatch(false);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        if (!isEmailValid) {
            window.alert("please provide a valid email address");
        }
        if (!minLenPwd) {
            window.alert("password should be at least 6 characters long");
        }
        if (emptyEmail) {
            window.alert("please enter email address");
        }

        if (emptyPassword) {
            window.alert("please enter password");
        }
        if (noMatchMsg) {
            window.alert("passwords don't match");
            return null;
        }

        try {
            // Create a new user
            await firebase.auth().createUserWithEmailAndPassword(email, password).then((credential) => {
                const user = credential.user;
                console.log(user);
                setSuccess(true);
                timeout();
                // <Alert variant='success'>
                //     Successfully Registered!</Alert>
                // history.push("/login");
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const registerForm =
        (<form onSubmit={onSubmit}>
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
                type="submit"
                value="Create Account"
                onClick={checkValidity}
            />
        </form>)

    const sucessMessage = (
        <Alert variant='success'>
            Successfully Registered!</Alert>)

    const timeout = () => {
        setTimeout(() => {
            history.push("/login")
        }, 2000);
    }


    if (localStorage.getItem("plantme_token")) {
        return <Redirect to="/" />;
    } else {
        return (
            <div>
                {registerForm}
                {onSuccess ? sucessMessage : null}
            </div>
        );
    }
};

export default Register;