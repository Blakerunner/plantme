import React from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

const About = () => {
  const history = useHistory();

  const toMainPage = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <div>
      <h3 style={{ padding: "10px" }}>Author: Blake, Jooney, Takashi, Jieun</h3>
      <Button
        variant="secondary"
        style={{ marginLeft: "10px" }}
        onClick={(e) => toMainPage(e)}>
        Back to Landing Page
      </Button>
    </div>
  );
};

export default About;
