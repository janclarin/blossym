import React, { Component } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import "./Fan.css";

class Fan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creatorAddress: "",
      amountValue: 0,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  isValidAddress(address) {
    // TODO: Perform regex address validation.
    return address.length > 0;
  }

  isValidAmount(amount) {
    return amount > 0.0;
  }

  render() {
    let submitButton;
    if (
      this.isValidAddress(this.state.creatorAddress) &&
      this.isValidAmount(this.state.amountValue)
    ) {
      submitButton = (
        <Button variant="success" size="lg" block type="submit">
          Send
        </Button>
      );
    } else {
      // TODO: Check if the wallet is not connected first.
      submitButton = (
        <Button variant="primary" size="lg" block type="submit">
          Connect wallet
        </Button>
      );
    }
    return (
      <div className="fan-container">
        <Card className="support-card">
          <Card.Body>
            <Card.Title>Support</Card.Title>
            <Card.Subtitle>Send crypto to your favorite creator.</Card.Subtitle>
            <Form className="support-form">
              <Form.Group controlId="creatorAddress">
                <Form.Label srOnly>Creator's ETH wallet address</Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Creator's ETH address"
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="amountValue">
                <Form.Label srOnly>Amount in ETH</Form.Label>
                <InputGroup>
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="0.0"
                    onChange={this.handleInputChange}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>ETH</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
              {submitButton}
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Fan;
