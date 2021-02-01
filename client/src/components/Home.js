import React, { Component } from "react";
import { Button, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div className="App">
        <Jumbotron>
          <h1>Welcome to Blossym!</h1>
          <p>The crypto way to fund the creative economy.</p>
          <div className="d-flex justify-content-around mt-5 col-md-12">
            <Link to="/fan">
              <Button variant="primary">For fans</Button>
            </Link>

            <Link to="/creator">
              <Button variant="success">For creators</Button>
            </Link>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default Home;
