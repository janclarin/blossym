import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavHeader from "./NavHeader";
import Creator from "./Creator";
import Example from "./Example";
import Fan from "./Fan";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavHeader />
        <Container>
          <Switch>
            <Route exact path="/" component={Example} />
            <Route path="/fan" component={Fan} />
            <Route path="/creator" component={Creator} />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
