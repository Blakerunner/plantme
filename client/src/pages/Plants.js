import React from "react";
import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";

const Plants = () => {
  const history = useHistory();

  const toMainPage = (e) => {
    e.preventDefault();
    history.push("/");
  };
  return (
    <div>
      <p>Plants Page</p>
      <Button
        variant="secondary"
        // style={{ marginLeft: "10px" }}
        onClick={(e) => toMainPage(e)}
      >
        Back to Landing Page
      </Button>
    </div>
  );
};

export default Plants;
