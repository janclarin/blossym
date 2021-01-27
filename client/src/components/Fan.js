import React, { Component } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import Web3 from "web3";
import "./Fan.css";

class Fan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creatorAddress: "",
      amountValue: 0,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (!this.props.location) {
      return;
    }
    // Populates creator address input field with value from URL query param.
    const queryParams = new URLSearchParams(this.props.location.search);
    const creatorAddress = queryParams.get("creatorAddress");
    this.setState({ creatorAddress: creatorAddress });
  }

  handleInputChange(event) {
    const target = event.target;
    switch (target.name) {
      case "creatorAddress":
        this.setState({ creatorAddress: target.value });
        break;
      case "amountValue":
        this.setState({ amountValue: Number.parseFloat(target.value) });
        break;
      default:
    }
  }

  handleSubmit() {
    // TODO: Create Web3 transaction.
    console.log("Submitted");
  }

  isValidAddress(address) {
    // TODO: Support ENS addresses.
    return Web3.utils.isAddress(address);
  }

  isValidAmount(amount) {
    return Number.isFinite(amount) && amount > 0.0;
  }

  render() {
    let button;

    if (!this.props.connectedWallet) {
      button = (
        <Button
          variant="primary"
          size="lg"
          block
          type="button"
          onClick={this.props.onWalletConnectClick}
          data-testid="connect-wallet-button"
        >
          Connect wallet
        </Button>
      );
    } else {
      const disabled =
        !this.isValidAddress(this.state.creatorAddress) ||
        !this.isValidAmount(this.state.amountValue);
      button = (
        <Button
          variant="success"
          size="lg"
          block
          type="submit"
          disabled={disabled}
          data-testid="send-button"
        >
          Send
        </Button>
      );
    }

    return (
      <div className="fan-container">
        <Card className="support-card">
          <Card.Body>
            <Card.Title>Support</Card.Title>
            <Card.Subtitle>Send crypto to your favorite creator.</Card.Subtitle>
            <Form className="support-form" onSubmit={this.handleSubmit}>
              <Form.Group controlId="creatorAddress">
                <Form.Label srOnly>Creator's ETH wallet address</Form.Label>
                <Form.Control
                  name="creatorAddress"
                  placeholder="Creator's ETH address"
                  type="text"
                  size="lg"
                  defaultValue={this.state.creatorAddress}
                  onChange={this.handleInputChange}
                  data-testid="creatorAddress"
                />
              </Form.Group>
              <Form.Group controlId="amountValue">
                <Form.Label srOnly>Amount in ETH</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="amountValue"
                    size="lg"
                    type="text"
                    placeholder="0.0"
                    onChange={this.handleInputChange}
                    data-testid="amountValue"
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>ETH</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
              {button}
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Fan;
