import React from "react";
import { useHistory } from "react-router-dom";
import styles from "../styles/landing.module.css";

import Button from 'react-bootstrap/Button'

const NotFound = () => {
    const history = useHistory();

    const toMainPage = (e) => {
        e.preventDefault();
        history.push("/");
    };

    return (
        <div>
            <h1 className={styles.title}>Not Found</h1>
            <Button
                variant="secondary"
                style={{ marginLeft: '10px' }}
                onClick={(e) => toMainPage(e)}
            >
                Back to Landing Page
        </Button>

        </div >
    );
};

export default NotFound;