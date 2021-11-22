import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";

const Admin = () => {
  const REACT_APP_SERVER_URL =
    process.env.REACT_APP_SERVER_URL || "https://plantme.blakerunner.com";
  const history = useHistory({});
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${REACT_APP_SERVER_URL}/api/v1/admin/endpointStats`
      );
      setStats(data);
    };
    fetchData();
  }, [REACT_APP_SERVER_URL]);

  return (
    <>
      <table style={{ border: "1px solid black", margin: "5px" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "5px" }}>Route</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              Endpoint
            </th>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              Requests
            </th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat, idx) => (
            <tr key={idx}>
              <td style={{ border: "1px solid black", padding: "5px" }}>
                {stat.method}
              </td>
              <td style={{ border: "1px solid black", padding: "5px" }}>
                {stat.endpoint}
              </td>
              <td style={{ border: "1px solid black", padding: "5px" }}>
                {stat.requests}
              </td>
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