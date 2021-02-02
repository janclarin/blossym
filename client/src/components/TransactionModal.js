import React, { Component } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

export const TransactionModalState = Object.freeze({
  HIDDEN: 0,
  ERROR: 1,
  AWAITING_CONFIRMATION: 2,
  CONFIRMED: 3,
});

const spinnerStyle = { height: "128px", width: "128px" };

class TransactionModal extends Component {
  show = () => {
    return this.props.modalState !== TransactionModalState.HIDDEN;
  };

  getEtherscanUrl = (transactionHash) => {
    // TODO: Support test network chains.
    return `https://etherscan.io/tx/${transactionHash}`;
  };

  render() {
    const spinner =
      this.props.modalState < TransactionModalState.CONFIRMED ? (
        <Spinner animation="border" role="status" style={spinnerStyle}>
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : null;

    let header;
    let buttonVariant;
    switch (this.props.modalState) {
      case TransactionModalState.HIDDEN:
        break;
      case TransactionModalState.ERROR:
        header = "Error";
        buttonVariant = "outline-warning";
        break;
      case TransactionModalState.AWAITING_CONFIRMATION:
        header = "Pending";
        buttonVariant = "outline-info";
        break;
      case TransactionModalState.CONFIRMED:
        header = "Success";
        buttonVariant = "outline-success";
        break;
      default:
    }

    const modalBody =
      this.props.modalState === TransactionModalState.CONFIRMED
        ? "Thank you for supporting the creators you love!"
        : spinner;

    const etherscanButton = this.props.transactionHash ? (
      <Button
        variant={buttonVariant}
        size="lg"
        href={this.getEtherscanUrl(this.props.transactionHash)}
      >
        View on Etherscan
      </Button>
    ) : null;

    return (
      <Modal
        show={this.show()}
        onHide={this.props.onHide}
        backdrop="static"
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center">
          <div className="mt-2 text-center">{modalBody}</div>
          <div className="mb-2 mt-4">{etherscanButton}</div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default TransactionModal;
