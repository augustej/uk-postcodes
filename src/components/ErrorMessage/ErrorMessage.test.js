import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage component", () => {
  it("renders error message correctly", () => {
    const errorMessage = "This is an error message.";
    render(<ErrorMessage message={errorMessage} />);
    const errorMessageElement = screen.getByText(errorMessage);
    expect(errorMessageElement).toBeInTheDocument();
  });
});
