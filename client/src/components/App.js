import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavHeader from "./NavHeader";
import Creator from "./Creator";
import Example from "./Example";
import Fan from "./Fan";
import Web3 from "web3";
import Web3Modal from "web3modal";
import Fortmatic from "fortmatic";

let provider = null;
let web3Modal = null;
let web3 = null;
let accounts = null;
let mainAddress = "";

const providerOptions = {
  fortmatic: {
    package: Fortmatic, // required
    options: {
      key: process.env.FORTMATIC_KEY, // required
    },
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectedWallet: "",
    };
    this.openWalletConnectModal = this.openWalletConnectModal.bind(this);
  }

  async openWalletConnectModal() {
    if (!provider) {
      web3Modal = new Web3Modal({
        cacheProvider: true, // optional
        providerOptions, // required
      });
      provider = await web3Modal.connect();
      web3 = new Web3(provider);
    }
    if (!accounts) {
      accounts = await web3.eth.getAccounts();
      mainAddress = accounts[0].toLowerCase();
      this.setState({
        connectedWallet: mainAddress,
      });
    }
  }
  async disconnectWallet() {
    provider = null;
    accounts = null;
    web3 = null;
    await web3Modal.clearCachedProvider();
    web3Modal = null;
    mainAddress = "";
    this.setState({
      connectedWallet: "",
    });
  }

  render() {
    return (
      <BrowserRouter>
        <NavHeader
          connectedWallet={this.state.connectedWallet}
          onWalletConnectClick={() => this.openWalletConnectModal()}
          onDisconnectWallet={() => this.disconnectWallet()}
        />
        <Container>
          <Switch>
            <Route exact path="/" component={Example} />
            <Route
              path="/fan"
              render={(routeProps) => (
                <Fan
                  {...routeProps}
                  connectedWallet={this.state.connectedWallet}
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
