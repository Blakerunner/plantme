import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Button from 'react-bootstrap/Button'

const Admin = () => {

    const history = useHistory();

    const [stats, setStats] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(
                "http://localhost:8080"
            );
            setStats(data);
        };
        fetchData();
    }, []);

    return (<>
        <table style={{ border: "1px solid black" }}>
            <thead>
                <tr>
                    <th style={{ border: "1px solid black", padding: '5px' }}>Route</th>
                    <th style={{ border: "1px solid black", padding: '5px' }}>Requests</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(stats).map((key) => (
                    <tr key={key}>
                        <td style={{ border: "1px solid black" }}>{key}</td>
                        <td style={{ border: "1px solid black" }}>{stats[key]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <Button
            variant="secondary"
            style={{ margin: '10px' }}
            onClick={() => {
                history.push("/");
            }}
        >
            Back
      </Button>{' '}
    </>)
}

export default Admin;