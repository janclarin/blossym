import React, { Component } from "react";
import { Button, Card, CardDeck, Container, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";

class Home extends Component {
  getCreatorCard(name, description, address, websiteUrl) {
    const fanLink = "/fan?creatorAddress=" + address;
    return (
      <Card>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Link to={fanLink}>
            <Button className="mr-2 mt-1" variant="info">
              Support
            </Button>
          </Link>
          <Button
            className="mt-1"
            variant="secondary"
            href={websiteUrl}
            target="_blank"
          >
            Website
          </Button>
        </Card.Body>
      </Card>
    );
  }

  render() {
    return (
      <>
        <Jumbotron className="text-center">
          <h1 className="display-4">Welcome to Blossym!</h1>
          <p className="lead">The crypto way to fund the creative economy.</p>
          <div className="mt-4 d-flex justify-content-center">
            <div className="d-flex flex-column align-items-center mr-4">
              <h2 class="h5">Fans</h2>
              <Link to="/fan">
                <Button variant="info" size="lg">
                  Support creators
                </Button>
              </Link>
            </div>
            <div className="d-flex flex-column align-items-center">
              <h2 class="h5">Creators</h2>
              <Link to="/creator">
                <Button variant="success" size="lg">
                  Open dashboard
                </Button>
              </Link>
            </div>
          </div>
        </Jumbotron>
        <Container className="mt-5">
          <CardDeck className="mt-4">
            {this.getCreatorCard(
              "DeFi Dad",
              "Content creator",
              "0x2f71129b240080C638ac8d993BFF52169E3551c3",
              "https://twitter.com/DeFi_Dad"
            )}
            {this.getCreatorCard(
              "Soulja Boy",
              "American rapper",
              "0x0aff41eC56049C9a1ab6d096FEAF8f34a0395E4c",
              "https://twitter.com/souljaboy/status/1357388773596622849"
            )}
            {this.getCreatorCard(
              "Vitalik Buterin",
              "Ethereum co-founder",
              "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
              "https://vitalik.ca"
            )}
          </CardDeck>
        </Container>
      </>
    );
  }
}

export default Home;
