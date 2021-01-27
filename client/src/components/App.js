import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavHeader from "./NavHeader";
import Creator from "./Creator";
import Example from "./Example";
import Fan from "./Fan";

class App extends Component {
  constructor(props) {
    super(props);
    this.openWalletConnectModal = this.openWalletConnectModal.bind(this);
  }

  openWalletConnectModal() {
    // TODO: Open web3modal and set connectedWallet when rendering Fan.
    console.log("Opened wallet connect");
  }

  render() {
    return (
      <BrowserRouter>
        <NavHeader />
        <Container>
          <Switch>
            <Route exact path="/" component={Example} />
            <Route
              path="/fan"
              render={(routeProps) => (
                <Fan
                  {...routeProps}
                  connectedWallet=""
                  onWalletConnectClick={this.openWalletConnectModal}
                />
              )}
            />
            <Route path="/creator" component={Creator} />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
