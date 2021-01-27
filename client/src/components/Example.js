import React, { Component } from "react";
/*
import Web3 from "web3";
import Web3Modal from "web3modal";
*/
import { Button, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Example.css";

class Example extends Component {
  render() {
    return (
      <div className="App">
        <Jumbotron>
          <h1>Welcome to Blossym!</h1>
          <p> The ETH way to fund the creative economy. </p>
          <p>
            <div class="d-flex justify-content-around mt-5 col-md-12">
              <Link to="/fan">
                <Button variant="primary">For fans</Button>
              </Link>

              <Link to="/creator">
                <Button variant="success">For creators</Button>
              </Link>
            </div>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default Example;
