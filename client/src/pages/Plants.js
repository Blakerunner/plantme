import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";

const Plants = () => {
  const REACT_APP_SERVER_URL =
    process.env.REACT_APP_SERVER_URL || "https://plantme.blakerunner.com";
  const history = useHistory({});
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${REACT_APP_SERVER_URL}/api/v1/plant`);
      setPlants(data);
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
          {plants.map((plant, idx) => (
            <tr key={idx}>
              <td style={{ border: "1px solid black" }}>{plant.id}</td>
              <td style={{ border: "1px solid black" }}>{plant.name}</td>
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

export default Plants;
