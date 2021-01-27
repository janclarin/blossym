import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Fan from "./Fan";

const fakeValidAddress = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";
const fakeValidAmount = 123.456;
const fakeInvalidAddress = "invalid-address";
const fakeInvalidAmount = "invalid-amount";

describe("connect wallet button", () => {
  test("appears when connectedWallet prop is empty", () => {
    render(<Fan connectedWallet="" />);

    expect(screen.queryByTestId("connect-wallet-button")).toBeInTheDocument();
  });

  test("does not appear when connectedWallet prop is not empty", () => {
    render(<Fan connectedWallet={fakeValidAddress} />);

    expect(
      screen.queryByTestId("connect-wallet-button")
    ).not.toBeInTheDocument();
  });
});

describe("send button", () => {
  test("appears when connectedWallet prop is not empty", () => {
    render(<Fan connectedWallet={fakeValidAddress} />);

    expect(screen.queryByTestId("send-button")).toBeInTheDocument();
  });

  test("does not appear when connectedWallet prop is empty", () => {
    render(<Fan connectedWallet="" />);

    expect(screen.queryByTestId("send-button")).not.toBeInTheDocument();
  });

  test("renders as disabled when creator address and amount are empty", () => {
    render(<Fan connectedWallet={fakeValidAddress} />);

    const button = screen.getByTestId("send-button");
    expect(button).toBeDisabled();
  });

  test("renders as disabled when creator address is invalid", () => {
    render(<Fan connectedWallet={fakeValidAddress} />);

    fireEvent.change(screen.getByTestId("creatorAddress"), {
      target: { value: fakeInvalidAddress },
    });
    fireEvent.change(screen.getByTestId("amountValue"), {
      target: { value: fakeValidAmount },
    });

    const button = screen.getByTestId("send-button");
    expect(button).toBeDisabled();
  });

  test("renders as disabled when amount is invalid", () => {
    render(<Fan connectedWallet={fakeValidAddress} />);

    fireEvent.change(screen.getByTestId("creatorAddress"), {
      target: { value: fakeValidAddress },
    });
    fireEvent.change(screen.getByTestId("amountValue"), {
      target: { value: fakeInvalidAmount },
    });

    const button = screen.getByTestId("send-button");
    expect(button).toBeDisabled();
  });

  test("renders enabled send button when creator address and amount are valid", () => {
    render(<Fan connectedWallet={fakeValidAddress} />);

    fireEvent.change(screen.getByTestId("creatorAddress"), {
      target: { value: fakeValidAddress },
    });
    fireEvent.change(screen.getByTestId("amountValue"), {
      target: { value: fakeValidAmount },
    });

    const button = screen.getByTestId("send-button");
    expect(button).toBeEnabled();
  });
});
