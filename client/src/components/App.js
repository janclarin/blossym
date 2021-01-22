import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavHeader from "./NavHeader";
import Example from "./Example";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavHeader />
        <Container>
          <Switch>
            <Route path="/" component={Example} />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
