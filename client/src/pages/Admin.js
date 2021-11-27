import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";

const Admin = ({ isAdmin, token }) => {
  const REACT_APP_SERVER_URL =
    process.env.REACT_APP_SERVER_URL || "https://plantme.blakerunner.com";

  const history = useHistory();

  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${REACT_APP_SERVER_URL}/api/v1/admin/endpointStats`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setStats(data.data.stats);
      } catch (err) {
        console.log(err);
      }
    };
    if ( isAdmin ) fetchData();
  }, [token, REACT_APP_SERVER_URL, isAdmin ]);

  const toMainPage = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <>
      { 
        isAdmin ?  
          <>
            <table style={{ border: "1px solid black", padding: "5px" }}>
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
                {stats && stats.map((stat, idx) => (
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
              onClick={(e) => toMainPage(e)}>
              Back
            </Button>{" "}
          </>
        : 'User not authorized to view admin stats' 
      }
    </>
  );
};

export default Admin;
