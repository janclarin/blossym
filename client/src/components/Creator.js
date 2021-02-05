import React, { Component } from "react";
import { Row, Col, Button, Card, Table } from "react-bootstrap";
import { ImCopy, ImTwitter, ImTelegram } from "react-icons/im";
import { TwitterShareButton, TelegramShareButton } from "react-share";
import Web3 from "web3";

class Creator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ETHinUSD: "0",
      aUSDCBalance: "0",
    };
  }

  getLink(hash) {
    return "https://kovan.etherscan.io/tx/" + hash;
  }

  async getBalance() {
    const tokenAddress = "0xe12afec5aa12cf614678f9bfeeb98ca9bb95b5b0";
    const walletAddress = this.props.connectedWallet;
    const fetchURL =
      "https://api-kovan.etherscan.io/api?module=account&action=tokenbalance" +
      "&contractaddress=" +
      tokenAddress +
      "&address=" +
      walletAddress +
      "&tag=latest&apikey=" +
      process.env.ETHERSCAN_KEY;

    fetch(fetchURL)
      .then((response) => response.json())
      .then((balance) => {
        // This gives the correct number of decimal places for the exact dollar value
        balance = (balance.result * Math.pow(10, -6)).toFixed(2);
        this.setState({ aUSDCBalance: balance });
      });
    /*
    if (this.props.provider) {
      const web3 = new Web3(this.props.provider);

      // The minimum ABI to get ERC20 Token balance
      const minABI = [
        // balanceOf
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          type: "function",
        },
        // decimals
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [{ name: "", type: "uint8" }],
          type: "function",
        },
      ];

      // Get ERC20 Token contract instance
      const contract = new web3.eth.Contract(minABI, tokenAddress);
      // Call balanceOf function
      const balance = await contract.methods.balanceOf(walletAddress).call();
      this.setState({ aUSDCBalance: balance });
    
    }
    */
  }

  componentDidMount() {
    this.getBalance();
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum"
    )
      .then((response) => response.json())
      .then((priceUSD) => {
        this.setState({ ETHinUSD: priceUSD[0].current_price });
      });
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
    const fanLink =
      "https://blossym.org/fan?creatorAddress=" + this.props.connectedWallet;

    let page;
    if (!this.props.connectedWallet) {
      page = (
        <div>
          <div class="d-flex justify-content-center mt-5 col-md-12">
            <h3>
              {" "}
              You need to connect your wallet before viewing your balance.{" "}
            </h3>
          </div>
        </div>
      );
    } else {
      page = (
        <div>
          <div class="d-flex justify-content-center mt-5 col-md-12">
            <Button variant="outline-success">Cash Out</Button>
          </div>

          <div class="d-flex justify-content-around mt-5 col-md-12">
            <Card style={{ width: "17rem" }}>
              <Card.Body>
                <Card.Title>Your balance</Card.Title>
                <Card.Text>{balance}</Card.Text>
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
          <div class="d-flex justify-content-around mt-5 col-md-12">
            <h3> Recent Transactions </h3>
          </div>
          <div class="d-flex justify-content-around mt-5 col-md-12">
            <Table striped bordered hover variant="dark">
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
        </div>
      );
    }

    return <div>{page}</div>;
  }
}

export default Creator;
