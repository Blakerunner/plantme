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
  }, [REACT_APP_SERVER_URL]);

  const toMainPage = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <>
      <table style={{ border: "1px solid black", margin: "5px" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "5px" }}>Id</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>Name</th>
          </tr>
        </thead>
        <tbody>
          {plants.map((plant, idx) => (
            <tr key={idx}>
              <td style={{ border: "1px solid black", padding: "5px" }}>
                {plant.id}
              </td>
              <td style={{ border: "1px solid black", padding: "5px" }}>
                {plant.name}
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
  );
};

export default Plants;
