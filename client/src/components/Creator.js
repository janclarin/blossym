import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import { ImCopy, ImTwitter, ImTelegram } from "react-icons/im";
import { TwitterShareButton, TelegramShareButton } from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Web3 from "web3";

class Creator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ETHinUSD: "0",
      aUSDCBalance: "0",
      sentTransactionHash: "",
      aaveRate: "0",
      estimatedFuture: "0",
      copied: false,
      ethTransactions: [],
    };
  }

  getLink(hash) {
    return "https://kovan.etherscan.io/tx/" + hash;
  }

  cashOut() {
    if (this.state.aUSDCBalance === "0") {
      alert("You don't have any funds to cash out");
    } else {
      alert(
        "You've successfully withdrawn your aUSDC and will show up as USDC in your wallet."
      );
      this.setState({ aUSDCBalance: "0", estimatedFuture: "0" });
    }
  }

  calculateInterest(time) {
    const principle = parseFloat(this.state.aUSDCBalance);
    const rate = parseFloat(this.state.aaveRate);
    const timeYears = parseInt(time) / 12;

    const A = principle * (1 + rate * timeYears);
    return A;
  }

  async getBalance() {
    const tokenAddress = "0xe12afec5aa12cf614678f9bfeeb98ca9bb95b5b0";
    const walletAddress = this.props.connectedWallet;
    const fetchURLEtherscan =
      "https://api-kovan.etherscan.io/api?module=account&action=tokenbalance" +
      "&contractaddress=" +
      tokenAddress +
      "&address=" +
      walletAddress +
      "&tag=latest&apikey=" +
      process.env.ETHERSCAN_KEY;

    const fetchEtherscan = await fetch(fetchURLEtherscan);
    const etherscanResponseJson = await fetchEtherscan.json();
    const balance = (etherscanResponseJson.result * Math.pow(10, -6)).toFixed(
      2
    );
    this.setState({ aUSDCBalance: balance });

    const fetchURLAaveRates = "https://api.aleth.io/v0/defi/snapshot";
    const aaveResponse = await fetch(fetchURLAaveRates);
    const aaveResponseJson = await aaveResponse.json();
    console.log(aaveResponseJson);
    const aaveRate = aaveResponseJson.data[95].value;
    this.setState({ aaveRate: aaveRate });

    const futureRate = this.calculateInterest(1);
    this.setState({ estimatedFuture: futureRate.toFixed(2) });
  }

  async componentDidMount() {
    this.getBalance();
    const fetchURLGecko =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum";
    const fetchEthRates = await fetch(fetchURLGecko);
    const ethRatesJson = await fetchEthRates.json();
    const priceInUSD = ethRatesJson[0].current_price;
    this.setState({ ETHinUSD: priceInUSD });
    if (this.props.ethTransactions) {
      this.setState({ ethTransactions: this.props.ethTransactions });
    }
  }

  getValue(weiVal) {
    const val = Web3.utils.fromWei(weiVal, "ether");

    var USD = parseFloat(val) * parseFloat(this.state.ETHinUSD);
    USD = USD.toFixed(2);
    return val + " ETH ($" + USD + " USD)";
  }

  getRealTime(timestamp) {
    const utcSeconds = parseInt(timestamp);
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(utcSeconds);
    return d.toLocaleString();
  }

  render() {
    const balance = this.state.aUSDCBalance + " aUSDC";
    const fanLink = "https://blossym.org/fan/" + this.props.connectedWallet;
    const rate = this.state.aaveRate + "%";

    let page;
    if (!this.props.connectedWallet) {
      page = (
        <div>
          <div className="d-flex justify-content-center mt-5 col-md-12">
            <h3>
              {" "}
              You need to connect your wallet before viewing your balance.{" "}
            </h3>
          </div>
        </div>
      );
    } else {
      page = (
        <Container>
          <div className="d-flex justify-content-center mt-5 col-md-12">
            <Button variant="success" size="lg">
              Cash Out
            </Button>
          </div>

          <div className="d-flex justify-content-sm-center mt-5">
            <Card className="mr-4" style={{ width: "17rem" }}>
              <Card.Body>
                <Card.Title>Your balance</Card.Title>
                <Card.Subtitle className="mt-2">
                  <p className="lead">{balance}</p>
                </Card.Subtitle>
              </Card.Body>
            </Card>
            <Card style={{ width: "17rem" }}>
              <Card.Body>
                <Card.Title>Share your fan link!</Card.Title>
                <Row>
                  <Col sm>
                    <Button variant="outline-secondary">
                      <ImCopy />
                    </Button>
                  </Col>
                  <Col sm>
                    <TwitterShareButton
                      url={fanLink}
                      title={
                        "Support your favorite influencers with ETH on Blossym."
                      }
                    >
                      <Button variant="outline-primary">
                        <ImTwitter />
                      </Button>
                    </TwitterShareButton>
                  </Col>
                  <Col sm>
                    <TelegramShareButton
                      url={fanLink}
                      title={
                        "Support your favorite influencers with ETH on Blossym."
                      }
                    >
                      <Button variant="outline-primary">
                        <ImTelegram />
                      </Button>
                    </TelegramShareButton>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
          <div class="d-flex justify-content-center mt-5">
            <Card className="mr-4" style={{ width: "17rem" }}>
              <Card.Body>
                <Card.Title>Interest rate</Card.Title>
                <Card.Subtitle className="mt-2">
                  <p className="lead">{rate}</p>
                </Card.Subtitle>
              </Card.Body>
            </Card>
            <Card style={{ width: "17rem" }}>
              <Card.Body>
                <Card.Title>Est. future earnings</Card.Title>
                <Card.Subtitle className="mt-2">
                  <p className="lead">
                    {this.state.estimatedFuture + " aUSDC"}
                  </p>
                </Card.Subtitle>
                <ButtonGroup size="sm" onClick={this.changeEstValue}>
                  <Button value="1">1mo</Button>
                  <Button value="6">6mo</Button>
                  <Button value="12">1yr</Button>
                </ButtonGroup>
              </Card.Body>
            </Card>
          </div>
          <div class="d-flex justify-content-around mt-5 col-md-12">
            <h3> Recent Transactions </h3>
          </div>
          <div className="d-flex justify-content-around mt-5 col-md-12">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>From</th>
                  <th>Value</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {this.props.ethTransactions.map((tx) => (
                  <tr>
                    <td>
                      <a
                        href={this.getLink(tx.hash)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {tx.from}
                      </a>
                    </td>
                    <td>{this.getValue(tx.value)}</td>
                    <td>{this.getRealTime(tx.timeStamp)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
      );
    }

    return <div>{page}</div>;
  }
}

export default Creator;
