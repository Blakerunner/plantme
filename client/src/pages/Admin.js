import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";

const Admin = () => {
  const history = useHistory({});
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/admin/endpointStats`
      );
      setStats(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <table style={{ border: "1px solid black" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "5px" }}>Route</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              Requests
            </th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat, idx) => (
            <tr key={idx}>
              <td style={{ border: "1px solid black" }}>{stat.method}</td>
              <td style={{ border: "1px solid black" }}>{stat.endpoint}</td>
              <td style={{ border: "1px solid black" }}>{stat.requests}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        variant="secondary"
        style={{ margin: "10px" }}
        onClick={() => {
          history.push("/");
        }}>
        Back
      </Button>{" "}
    </>
  );
};

export default Admin;
